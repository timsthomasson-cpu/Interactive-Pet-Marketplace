#!/usr/bin/env python3
"""
generate_ranked_list.py  —  Interactive Pet Marketplace

Generates a filtered "Best for" ranked list spreadsheet.

Usage (run from repo root):
    python Documentation/generate_ranked_list.py "Best for Seniors Living Alone"
    python Documentation/generate_ranked_list.py "Best Budget Friendly Pets"

The argument is the name of the weighting table file (with or without .xlsx).
The file must exist in:  Documentation/Best For Weighting Tables/

Output spreadsheet saved to:  Documentation/Best for Lists/<name> List.xlsx

Weighting table structure:
    Sheet 1 (any name) — Feature weights: Feature | Suggested Weight
    Sheet "Filters"    — Optional pre-filters: Filter | Operator | Value
                         Operator: equal | not equal | greater than | less than
                         e.g. Price Category | equal | Budget Friendly
                              Rating          | greater than | 4.0
                         Operator column is optional — defaults to 'equal' if blank.
                         If this sheet is absent, no pre-filter is applied.

Filter rule (per Product_Data_Rules.md §4):
    One product per Manufacturer x Price Category x Animal Category.
    Tiebreaker: Score -> Rating -> Visual Contrast -> Review Count.
"""

import sys
import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from datetime import date

# ── Paths (relative to this script's Documentation/ folder) ───────────────
DOC         = os.path.dirname(os.path.abspath(__file__))
PM_FILE     = os.path.join(DOC, "Product Matrix.xlsx")
SCORES_FILE = os.path.join(DOC, "Product Features Scores", "Product_Feature_Scores.xlsx")
RUBRIC_FILE = os.path.join(DOC, "Feature Scoring Rubric", "Feature_Scoring_Rubric.xlsx")
RULES_FILE  = os.path.join(DOC, "Product_Data_Rules.md")
WT_DIR      = os.path.join(DOC, "Best For Weighting Tables")
OUT_DIR     = os.path.join(DOC, "Best for Lists")

# Feature name aliases: weighting-file name -> scores-file column name (lowercase)
WEIGHT_ALIASES = {
    "behavioral realism level": "realism level",
}

def normalise(name):
    n = name.strip().lower()
    return WEIGHT_ALIASES.get(n, n)

# ── Loaders ────────────────────────────────────────────────────────────────
def resolve_weights_path(table_name):
    name = table_name.strip()
    if not name.lower().endswith(".xlsx"):
        name += ".xlsx"
    path = os.path.join(WT_DIR, name)
    if not os.path.exists(path):
        available = [f for f in os.listdir(WT_DIR) if f.endswith(".xlsx")]
        raise FileNotFoundError(
            f"Weighting table not found: {path}\n"
            f"Available tables:\n" + "\n".join(f"  {f}" for f in available)
        )
    return path, os.path.splitext(table_name.strip())[0]

def load_weights_and_filters(path):
    """
    Returns (weights dict, filters dict).
    Reads the first sheet for weights and the 'Filters' sheet (if present)
    for pre-filters. Filter keys and values are stripped and lowercased for
    comparison, but the original values are kept for display.
    """
    wb = openpyxl.load_workbook(path, data_only=True)

    # ── Weights (first sheet) ──────────────────────────────────────────────
    ws_w = wb.worksheets[0]
    weights = {}
    for row in ws_w.iter_rows(min_row=2, values_only=True):
        feat, wt = row[0], row[1]
        if feat and wt and isinstance(wt, (int, float)) and wt > 0:
            key = normalise(feat)
            if key != "total":
                weights[key] = float(wt)

    # ── Filters (optional sheet named "Filters") ───────────────────────────
    filters = []   # list of (field, operator, value) tuples
    if "Filters" in wb.sheetnames:
        ws_f = wb["Filters"]
        for row in ws_f.iter_rows(min_row=2, values_only=True):
            if not row[0]:
                continue
            field    = str(row[0]).strip()
            # Column B is operator (new), column C is value — or column B is value (legacy 2-col)
            if len(row) >= 3 and row[1] and row[2] is not None:
                operator = str(row[1]).strip().lower()
                value    = str(row[2]).strip()
            else:
                # Legacy 2-column format: default operator to 'equal'
                operator = "equal"
                value    = str(row[1]).strip() if row[1] is not None else ""
            if field and value:
                filters.append((field, operator, value))

    return weights, filters

def load_scores(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb.active
    headers = [c.value for c in ws[2]]
    rows = {}
    for r in range(3, ws.max_row + 1):
        row  = [ws.cell(row=r, column=c + 1).value for c in range(len(headers))]
        mfr  = str(row[0]).strip().lstrip() if row[0] else ""
        prod = str(row[1]).strip()          if row[1] else ""
        if mfr or prod:
            rows[(mfr.lower(), prod.lower())] = {
                headers[i]: row[i] for i in range(len(headers))
            }
    return headers, rows

def load_product_matrix(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb["Product Matrix"]
    h = [c.value for c in ws[1]]
    pm = {}
    for r in range(2, ws.max_row + 1):
        row  = [ws.cell(row=r, column=c + 1).value for c in range(len(h))]
        mfr  = str(row[1]).strip() if row[1] else ""
        prod = str(row[2]).strip() if row[2] else ""
        if mfr or prod:
            pm[(mfr.lower(), prod.lower())] = {
                "category":  row[3],   # Animal Category
                "price_cat": row[20],  # Price Category
                "rating":    row[12],  # Rating
                "reviews":   row[13],  # Review Count
                "price":     row[17],  # Price
            }
    return pm

def load_rubric(path):
    if not os.path.exists(path):
        return {}
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb.active
    rubric = {}
    for r in range(4, ws.max_row + 1):
        feat  = ws.cell(row=r, column=1).value
        desc  = ws.cell(row=r, column=2).value
        stype = ws.cell(row=r, column=3).value
        if feat:
            rubric[normalise(feat)] = {
                "description": desc  or "",
                "score_type":  stype or "1-5",
            }
    return rubric

# ── Pre-filter ─────────────────────────────────────────────────────────────
# Supported field names (case-insensitive) → pm_data key
FILTER_FIELD_MAP = {
    "price category":  "price_cat",
    "animal category": "category",
    "rating":          "rating",
    "reviews":         "reviews",
    "price":           "price",
}

def _compare(actual, operator, target):
    """
    Compare actual vs target using the given operator.
    Tries numeric comparison first; falls back to case-insensitive string.
    Operators: equal | not equal | greater than | less than
    """
    # Attempt numeric
    try:
        a = float(str(actual).replace("$","").replace(",","").strip())
        t = float(str(target).replace("$","").replace(",","").strip())
        if operator == "equal":        return a == t
        if operator == "not equal":    return a != t
        if operator == "greater than": return a >  t
        if operator == "less than":    return a <  t
    except (ValueError, TypeError):
        pass
    # String comparison (case-insensitive)
    a = str(actual).strip().lower()
    t = str(target).strip().lower()
    if operator == "equal":     return a == t
    if operator == "not equal": return a != t
    # gt/lt on strings: alphabetical — valid but flag to user if unexpected
    if operator == "greater than": return a > t
    if operator == "less than":    return a < t
    return True   # unknown operator: pass through

def passes_filters(pm_data, filters):
    """
    Returns True if the product passes all filter rules.
    filters is a list of (field, operator, value) tuples.
    """
    for field, operator, value in filters:
        pm_key = FILTER_FIELD_MAP.get(field.lower())
        if pm_key is None:
            continue   # unknown field — skip silently
        actual = pm_data.get(pm_key)
        if not _compare(actual, operator, value):
            return False
    return True

# ── Scoring ────────────────────────────────────────────────────────────────
def calc_score(score_row, feat_headers, weights):
    total = 0.0
    for feat_norm, wt in weights.items():
        for h in feat_headers:
            if h and normalise(h) == feat_norm:
                val = score_row.get(h)
                if isinstance(val, (int, float)):
                    total += val * wt
                break
    return round(total, 4)

# ── Manufacturer x Price x Animal filter ──────────────────────────────────
def apply_filter(candidates):
    groups = {}
    for c in candidates:
        key = (c["mfr_clean"], c["price_cat"], c["animal_cat"])
        groups.setdefault(key, []).append(c)

    winners, eliminated = [], []
    for key, group in groups.items():
        group.sort(key=lambda x: (
            x["score"],
            x["rating"]       or 0,
            x["vis_contrast"] or 0,
            x["reviews"]      or 0,
        ), reverse=True)
        winners.append(group[0])
        for g in group[1:]:
            g["eliminated_by"] = group[0]["prod_clean"]
            eliminated.append(g)
    return winners, eliminated

# ── Output spreadsheet ─────────────────────────────────────────────────────
def write_output(winners, eliminated, pre_filtered, weights, filters,
                 rubric, list_name, out_path):
    wb = openpyxl.Workbook()

    hdr_font   = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    title_font = Font(name="Calibri", size=14, bold=True, color="1F4E79")
    meta_font  = Font(name="Calibri", size=10, italic=True, color="595959")
    body_font  = Font(name="Calibri", size=10)
    bold_font  = Font(name="Calibri", size=10, bold=True, color="1F4E79")
    elim_font  = Font(name="Calibri", size=10, color="999999")
    hdr_fill   = PatternFill("solid", fgColor="1F4E79")
    alt_fill   = PatternFill("solid", fgColor="EBF3FB")
    wt_fill    = PatternFill("solid", fgColor="E2EFDA")
    flt_fill   = PatternFill("solid", fgColor="FFF2CC")
    elim_fill  = PatternFill("solid", fgColor="F5F5F5")
    wrap       = Alignment(wrap_text=True, vertical="top")
    center     = Alignment(horizontal="center", vertical="center", wrap_text=True)
    thin       = Side(style="thin", color="BFBFBF")
    bdr        = Border(top=thin, bottom=thin, left=thin, right=thin)

    feat_cols = [(fn, rubric.get(fn, {}).get("description", fn)[:28], 10)
                 for fn in weights]

    # ── Sheet 1: Ranked List ───────────────────────────────────────────────
    ws = wb.active
    ws.title = "Ranked List"
    ws.sheet_view.showGridLines = False

    # Title
    total_cols = 9 + len(feat_cols) + 1
    ws.merge_cells(f"A1:{get_column_letter(total_cols)}1")
    ws["A1"] = f"{list_name} — Ranked Product List"
    ws["A1"].font = title_font
    ws["A1"].alignment = Alignment(vertical="center")
    ws.row_dimensions[1].height = 26

    # Meta row
    filter_note = (f"  |  Pre-filter: {', '.join(f'{f} {op} {v}' for f,op,v in filters)}"
                   f"  ({pre_filtered} products removed)" if filters else "")
    ws.merge_cells(f"A2:{get_column_letter(total_cols)}2")
    ws["A2"] = (f"Generated: {date.today().isoformat()}"
                f"  |  Products shown: {len(winners)}"
                f"  |  Eliminated by dedup rule: {len(eliminated)}"
                f"{filter_note}")
    ws["A2"].font = meta_font
    ws["A2"].alignment = Alignment(wrap_text=True, vertical="top")
    ws.row_dimensions[2].height = 20

    # Pre-filter row (only if filters were applied)
    data_start_row = 3
    if filters:
        ws.merge_cells(f"A3:{get_column_letter(total_cols)}3")
        filter_str = "  |  ".join(f"{f} {op} {v}" for f, op, v in filters)
        ws["A3"] = f"Pre-filter applied (before scoring): {filter_str}"
        ws["A3"].font = Font(name="Calibri", size=10, bold=True, color="7B6000")
        ws["A3"].fill = flt_fill
        ws["A3"].alignment = Alignment(vertical="center")
        ws.row_dimensions[3].height = 18
        data_start_row = 4

    # Weights row
    ws.merge_cells(f"A{data_start_row}:{get_column_letter(min(3, total_cols))}{data_start_row}")
    ws[f"A{data_start_row}"] = "Weights:"
    ws[f"A{data_start_row}"].font = Font(name="Calibri", size=10, bold=True)
    ws[f"A{data_start_row}"].fill = wt_fill
    ws[f"A{data_start_row}"].alignment = Alignment(vertical="center")
    col = 4
    for fn, wt in weights.items():
        c = ws.cell(row=data_start_row, column=col,
                    value=f"{fn}: {wt:.0%}")
        c.font = Font(name="Calibri", size=10)
        c.fill = wt_fill
        col += 1
    ws.row_dimensions[data_start_row].height = 16

    # Column headers
    hdr_row = data_start_row + 1
    fixed_cols = [
        ("Rank", 5), ("Manufacturer", 20), ("Product", 32),
        ("Price\nCategory", 12), ("Animal\nType", 10), ("Price", 9),
        ("Rating", 8), ("Reviews", 9), ("Overall\nScore", 10),
    ]
    notes_col_def = [("Notes / Flags", 40)]
    all_col_defs  = fixed_cols + [(fc[0], fc[2]) for fc in feat_cols] + notes_col_def

    for ci, (hdr, width) in enumerate(all_col_defs, 1):
        c = ws.cell(row=hdr_row, column=ci, value=hdr)
        c.font = hdr_font; c.fill = hdr_fill
        c.alignment = center; c.border = bdr
        ws.column_dimensions[get_column_letter(ci)].width = width
    ws.row_dimensions[hdr_row].height = 30
    ws.freeze_panes = f"A{hdr_row + 1}"

    # Data rows
    for ri, w in enumerate(winners, hdr_row + 1):
        bg = alt_fill if ri % 2 == 0 else None

        def set_cell(col, val, fnt=body_font, aln=None):
            c = ws.cell(row=ri, column=col, value=val)
            c.font = fnt; c.border = bdr
            c.alignment = aln or wrap
            if bg: c.fill = bg

        set_cell(1, ri - hdr_row, bold_font, center)
        set_cell(2, w["mfr_clean"])
        set_cell(3, w["prod_clean"])
        set_cell(4, w["price_cat"],  aln=center)
        set_cell(5, w["animal_cat"], aln=center)
        set_cell(6, w["price"],      aln=center)
        set_cell(7, w["rating"],     aln=center)
        set_cell(8, w["reviews"],    aln=center)

        sc = ws.cell(row=ri, column=9, value=round(w["score"], 2))
        sc.font = Font(name="Calibri", size=11, bold=True,
                       color="1D7044" if w["score"] >= 4.0 else
                             "185FA5" if w["score"] >= 3.0 else "595959")
        sc.border = bdr; sc.alignment = center
        if bg: sc.fill = bg

        for fi, (fn, _, _) in enumerate(feat_cols, 10):
            c = ws.cell(row=ri, column=fi,
                        value=w.get("feat_scores", {}).get(fn))
            c.font = body_font; c.border = bdr; c.alignment = center
            if bg: c.fill = bg

        notes_ci = 10 + len(feat_cols)
        set_cell(notes_ci, w.get("notes", ""))
        ws.row_dimensions[ri].height = 45

    # ── Sheet 2: Eliminated ────────────────────────────────────────────────
    ws2 = wb.create_sheet("Eliminated")
    ws2.sheet_view.showGridLines = False
    ws2.merge_cells("A1:H1")
    ws2["A1"] = (f"Eliminated by dedup rule — {list_name}  "
                 "(same Manufacturer x Price Category x Animal Category "
                 "as a higher-scoring product)")
    ws2["A1"].font = Font(name="Calibri", size=11, bold=True, color="999999")
    ws2["A1"].alignment = Alignment(wrap_text=True, vertical="top")
    ws2.row_dimensions[1].height = 22

    e_hdrs = [("Manufacturer",18),("Product",32),("Price Category",14),
              ("Animal",10),("Score",9),("Rating",8),("Kept Instead",32),("Reason",30)]
    for ci, (h, w) in enumerate(e_hdrs, 1):
        c = ws2.cell(row=2, column=ci, value=h)
        c.font = hdr_font; c.fill = hdr_fill
        c.alignment = center; c.border = bdr
        ws2.column_dimensions[get_column_letter(ci)].width = w
    ws2.row_dimensions[2].height = 22

    for ri, e in enumerate(sorted(eliminated, key=lambda x: x["score"], reverse=True), 3):
        vals = [e["mfr_clean"], e["prod_clean"], e["price_cat"], e["animal_cat"],
                round(e["score"], 2), e["rating"], e.get("eliminated_by", ""),
                f"score={e['score']:.2f} rating={e['rating']}"]
        for ci, val in enumerate(vals, 1):
            c = ws2.cell(row=ri, column=ci, value=val)
            c.font = elim_font; c.border = bdr
            c.alignment = Alignment(vertical="top", wrap_text=True)
            if ri % 2 == 0: c.fill = elim_fill
        ws2.row_dimensions[ri].height = 18

    # ── Sheet 3: Weights Used ──────────────────────────────────────────────
    ws3 = wb.create_sheet("Weights Used")
    ws3.sheet_view.showGridLines = False
    ws3.merge_cells("A1:D1")
    ws3["A1"] = f"Weights applied — {list_name}"
    ws3["A1"].font = Font(name="Calibri", size=12, bold=True, color="1F4E79")
    ws3["A1"].alignment = Alignment(vertical="center")
    ws3.row_dimensions[1].height = 20

    if filters:
        ws3.merge_cells("A2:D2")
        ws3["A2"] = "Pre-filter: " + "  |  ".join(f"{f} {op} {v}" for f, op, v in filters)
        ws3["A2"].font = Font(name="Calibri", size=10, bold=True, color="7B6000")
        ws3["A2"].fill = flt_fill
        ws3["A2"].alignment = Alignment(vertical="center")
        ws3.row_dimensions[2].height = 16
        wt_hdr_row = 3
    else:
        wt_hdr_row = 2

    for ci, (h, w) in enumerate([("Feature (scores-file column)",32),
                                   ("Weight",10),("What It Measures",50),
                                   ("Score Type",14)], 1):
        c = ws3.cell(row=wt_hdr_row, column=ci, value=h)
        c.font = hdr_font; c.fill = hdr_fill; c.alignment = center
        ws3.column_dimensions[get_column_letter(ci)].width = w
    ws3.row_dimensions[wt_hdr_row].height = 18

    total_wt = 0.0
    for ri, (fn, wt) in enumerate(weights.items(), wt_hdr_row + 1):
        rb = rubric.get(fn, {})
        for ci, val in enumerate([fn, f"{wt:.0%}",
                                   rb.get("description",""),
                                   rb.get("score_type","")], 1):
            c = ws3.cell(row=ri, column=ci, value=val)
            c.font = body_font
            c.alignment = Alignment(wrap_text=True, vertical="top")
            if ri % 2 == 0: c.fill = alt_fill
        ws3.row_dimensions[ri].height = 20
        total_wt += wt

    tr = wt_hdr_row + 1 + len(weights)
    ws3.cell(row=tr, column=1, value="TOTAL").font = Font(name="Calibri", size=10, bold=True)
    ws3.cell(row=tr, column=2, value=f"{total_wt:.0%}").font = Font(name="Calibri", size=10, bold=True)

    os.makedirs(OUT_DIR, exist_ok=True)
    wb.save(out_path)

# ── Main ───────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        print(__doc__)
        print('ERROR: provide the weighting table name.')
        print('Example: python Documentation\\generate_ranked_list.py "Best for Seniors Living Alone"')
        sys.exit(1)

    table_name = " ".join(sys.argv[1:])

    for label, path in [("Product Matrix",        PM_FILE),
                         ("Product Feature Scores", SCORES_FILE),
                         ("Feature Scoring Rubric", RUBRIC_FILE)]:
        if not os.path.exists(path):
            print(f"ERROR: {label} not found:\n  {path}")
            sys.exit(1)

    weights_path, list_name = resolve_weights_path(table_name)
    out_path = os.path.join(OUT_DIR, f"{list_name} List.xlsx")

    print(f"\n  Weighting table : {weights_path}")
    print(f"  Scores file     : {SCORES_FILE}")
    print(f"  Product Matrix  : {PM_FILE}")
    print(f"  Output          : {out_path}\n")

    weights, filters   = load_weights_and_filters(weights_path)
    feat_hdrs, srows   = load_scores(SCORES_FILE)
    pm                 = load_product_matrix(PM_FILE)
    rubric             = load_rubric(RUBRIC_FILE)
    vis_col            = next((h for h in feat_hdrs if h and "visual" in h.lower()), None)
    notes_col          = next((h for h in feat_hdrs if h and "notes"  in h.lower()), None)

    if filters:
        print(f"Pre-filters (applied before scoring):")
        for field, operator, value in filters:
            print(f"  {field} {operator} {value}")
    print(f"\nWeights ({sum(weights.values()):.0%} total):")
    for fn, wt in weights.items():
        print(f"  {fn}: {wt:.0%}")

    # Build candidates — apply pre-filter first
    candidates = []
    pre_filtered_count = 0
    for (mfr_l, prod_l), srow in srows.items():
        pm_data = pm.get((mfr_l, prod_l), {})
        if filters and not passes_filters(pm_data, filters):
            pre_filtered_count += 1
            continue

        score = calc_score(srow, feat_hdrs, weights)
        vis   = srow.get(vis_col) if vis_col else None
        feat_scores = {}
        for fn in weights:
            for h in feat_hdrs:
                if h and normalise(h) == fn:
                    feat_scores[fn] = srow.get(h)
                    break

        candidates.append({
            "mfr":          srow[feat_hdrs[0]],
            "prod":         srow[feat_hdrs[1]],
            "mfr_clean":    str(srow[feat_hdrs[0]] or "").strip().lstrip(),
            "prod_clean":   str(srow[feat_hdrs[1]] or "").strip(),
            "score":        score,
            "feat_scores":  feat_scores,
            "animal_cat":   pm_data.get("category")  or "Unknown",
            "price_cat":    pm_data.get("price_cat") or "Unknown",
            "rating":       pm_data.get("rating")    or 0,
            "reviews":      pm_data.get("reviews")   or 0,
            "price":        pm_data.get("price"),
            "vis_contrast": vis if isinstance(vis, (int, float)) else 0,
            "notes":        srow.get(notes_col, "") or "",
        })

    if filters:
        print(f"\n  {pre_filtered_count} products removed by pre-filter")
        print(f"  {len(candidates)} products remaining for scoring")

    winners, eliminated = apply_filter(candidates)
    winners.sort(key=lambda x: (x["score"], x["rating"], x["vis_contrast"], x["reviews"]),
                 reverse=True)

    # Console output
    print(f"\n{'='*80}")
    print(f"  {list_name}")
    print(f"  {len(winners)} products in list  |  {len(eliminated)} eliminated by dedup rule")
    print(f"{'='*80}")
    print(f"{'#':<4}{'Score':<7}{'Price Cat':<16}{'Animal':<8}{'Rating':<7}{'Manufacturer':<18}Product")
    print("-" * 95)
    for i, w in enumerate(winners, 1):
        print(f"{i:<4}{w['score']:<7.2f}{str(w['price_cat']):<16}{str(w['animal_cat']):<8}"
              f"{str(w['rating']):<7}{w['mfr_clean']:<18}{w['prod_clean']}")

    if eliminated:
        print(f"\n--- Eliminated by dedup rule ({len(eliminated)}) ---")
        for e in sorted(eliminated, key=lambda x: x["score"], reverse=True):
            print(f"  {e['prod_clean']:<44} [{e['animal_cat']}/{e['price_cat']}] "
                  f"score={e['score']:.2f} -> kept: {e.get('eliminated_by','')}")

    write_output(winners, eliminated, pre_filtered_count, weights, filters,
                 rubric, list_name, out_path)
    print(f"\n  Saved: {out_path}")

if __name__ == "__main__":
    main()
