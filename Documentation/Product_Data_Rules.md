# Product Data Rules

## Spreadsheet column conventions

Required columns for every product:
- `Manufacturer` — official brand name
- `Product` — product name as the manufacturer writes it
- `Type` — one of: "AI & Robotic Pets", "Fluffy Companion", "Pocket Pet"
- `Category` — animal category: Cat, Dog, Robot, Panda, etc.
- `Best For 1`, `Best For 2` — audience tags (Seniors, Children, Families,
  Senior loved ones, Gift buyers)
- `Gifts`, `Premium`, `Top Pick` — yes/blank flags
- `Product URL` — direct manufacturer or retailer link
- `Image URL` — direct image URL
- `Comments` — internal notes, not displayed
- `Camera`, `Internet Access`, `Affiliate Agreement` — yes/blank flags

For verified product data:
- `Blurb` — 1-3 sentence product description, paraphrased from
  manufacturer copy or Claude-drafted then user-approved
- `Feature 1`, `Feature 2`, `Feature 3` — short verifiable specs
- `Highlight` — short editorial differentiator written by user
- `Price` — current price as displayed on Product URL
- `Price Source` — where the price was checked (Amazon, Manufacturer)
- `Price Last Checked` — date in YYYY-MM-DD format
- `Price Category` — Budget Friendly | Best Value | Premium
  (**always** `Price Category` — never `Price Tier`, `Price tier`, or any
  other variation; inconsistent naming breaks filters and joins)
- `Rating` — 0.0 to 5.0
- `Review Count` — integer
- `Rating Source` — Amazon | Manufacturer | (other named source)
- `Rating Last Checked` — date in YYYY-MM-DD format

## What goes where

| Content | Allowed source | Where it lives |
|---|---|---|
| Product specs/features | Manufacturer site, manual lookup | Product Matrix |
| Ratings + counts | Tim maintains in Product Matrix | Product Matrix |
| Prices | Tim maintains in Product Matrix | Product Matrix |
| Product blurbs | Paraphrased manufacturer copy | Product Matrix |
| Editorial highlights | User opinion / editorial voice | Product Matrix |
| Page taglines / homepage copy | Claude-generated, user-approved | Code |
| Research article links | Verified web sources | Code |
| Customer review text | ❌ Never used on this site | — |

## Refresh cadence

Even verified data goes stale. Keep these refreshed:
- Hot-tier products (>$200): every 7 days
- Regular-tier products: every 30 days
- Long-tail products: every 90 days

## Scoring workflow

Rules that apply whenever `Documentation/Product_Feature_Scores.xlsx` is
created or updated.

### 1. Always use the repo Product Matrix as the source of truth

When updating `Product_Feature_Scores.xlsx`, the product list, manufacturer
and product names, and `Price Category` values must be pulled from
`Documentation/Product Matrix.xlsx` **in the GitHub repo**, not from any
local or project-folder copy of the file.

The repo file is the join key between the two spreadsheets. If a product's
`Manufacturer` + `Product` values in the scores file do not match the repo
exactly (including spacing), the row is misaligned and will not join
correctly. Always clone fresh or fetch the file directly from the repo before
starting any scoring update.

### 2. Product Matrix is the single source of truth for pricing and ratings

`Documentation/Product Matrix.xlsx` in the repo is the single source of
truth for all pricing and rating data. Tim is solely responsible for keeping
the following fields current in the Product Matrix:

- `Price` and `Price Source` and `Price Last Checked`
- `Rating`, `Review Count`, `Rating Source`, and `Rating Last Checked`
- `Price Category`

When updating `Product_Feature_Scores.xlsx` or generating any ranked list,
Claude pulls pricing and rating data directly from the Product Matrix as-is.
Claude does not independently source, verify, or override pricing or rating
data from Amazon, manufacturer sites, or any other external source unless
Tim explicitly requests a one-off spot-check in a session.

If a pricing or rating field in the Product Matrix is blank, Claude flags it
in the `Notes / Flags` column of the scores file and does not guess or fill
it in.

### 3. Forced scores — when Tim overrides an unverified or inferred value

A **forced score** is a feature score that Tim explicitly assigns in the
absence of verified source data, typically on the basis of product family
consistency, editorial judgment, or direct product observation. Forced scores
are valid and final; they are not placeholders.

When Tim directs a forced score, Claude must:

1. Set the score to the directed value in `Product_Feature_Scores.xlsx`.
2. Remove any "Needs verification" or flag language from the Notes column
   for that field, and add a note in the format:
   > Score forced to [value] by Tim ([date]) — [one-line rationale].
3. Update the corresponding row in `Product_Feature_Score_Details.xlsx`:
   - Score Basis: `Forced Score — [brief reason, e.g. Product Family Inference]`
   - Evidence: full rationale including why verification wasn't available
     and what basis Tim used instead
   - Confidence: `Medium` (not High, since the underlying data point is
     unverified even if the editorial decision is deliberate)
   - Flag for Review: clear (blank) — a forced score is resolved, not open

Forced scores are **not** the same as inferred scores (which Claude applies
independently from product category patterns). A forced score requires Tim's
explicit direction in the session.

### 3. Produce an updated Scoring Criteria spreadsheet whenever scoring criteria changes

`Documentation/Scoring_Criteria.xlsx` is the human-readable reference for
all feature definitions, scoring guidelines, and locked score=1 / score=5
anchors. It must be kept in sync with `Documentation/Feature_Scoring_Rubric.xlsx`.

**Trigger this rule whenever any of the following change:**
- A feature's definition or "What It Measures" description
- The scoring guidelines or scope of a feature (e.g. a dimension added to or
  removed from a feature's definition)
- A locked score=1 or score=5 anchor product
- A new feature is added or an existing feature is retired
- A categorical field (Price tier, Animal type) changes its source

**When triggered:**
1. Update `Documentation/Feature_Scoring_Rubric.xlsx` with the agreed change.
2. Produce a fresh `Documentation/Scoring_Criteria.xlsx` reflecting the
   current state of all 33 features — definitions, guidelines, and anchors.
3. Commit both files to the repo in the same commit so they are always in sync.

The file is always named `Scoring_Criteria.xlsx` with no date suffix.
The `Last updated` date inside the file and git commit history together
provide the full version trail. Do not maintain multiple dated copies in the
repo — one current file only.

### 4. Ranked list filtering — one product per Manufacturer × Price Category × Animal Category

When generating any "Best for [audience]" ranked list, apply this filter
**after** scoring all products and **before** presenting the final list.

**The filter rule:**
Keep at most one product per unique combination of:
- Manufacturer (from `Product Matrix.xlsx`)
- Price Category (from `Product Matrix.xlsx` — Budget Friendly / Best Value / Premium)
- Animal Category (from `Product Matrix.xlsx` Category column — Cat, Dog, Panda, Robot, etc.)

Multiple animal categories from the same manufacturer and price tier are each
eligible for their own slot. The filter eliminates colour variants, pattern
variants, and near-identical products within the same tier — not genuine
product diversity.

**Tiebreaker order** (when two or more products compete for the same slot):
1. Highest weighted score
2. Highest Amazon/verified rating (from `Product Matrix.xlsx`)
3. Highest Visual Contrast / Visibility score (from `Product_Feature_Scores.xlsx`)
4. Highest review count (from `Product Matrix.xlsx`)

**Implementation:**
`Documentation/generate_ranked_list.py` in the repo applies this filter
automatically. Run it at the start of any session that requires a ranked list:

```
python Documentation/generate_ranked_list.py
```

The script reads `Product_Feature_Scores.xlsx`, the relevant weighting file
from `Documentation/`, and `Product Matrix.xlsx` from the repo. It outputs
the full filtered ranked list with eliminated products and tiebreaker reasons.

**Weighting files** live in `Documentation/` — one per use case:
- `Best_for_Living_Alone.xlsx`
- Add new files for each additional audience as they are developed.

This rule applies to **all** "Best for" lists on the site. Never present a
list that includes multiple colour or pattern variants of the same product, or
multiple products from the same manufacturer in the same price tier and animal
category.
