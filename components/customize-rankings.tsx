"use client";

import { useMemo, useState } from "react";
import { products } from "./site-data";
import { BestForCard } from "./best-for-card";
import { MEMORY_CARE_SCORES, MemoryCareScoreRow, TOP_SCORE_IN_GROUP } from "./memory-care-scores";

// Movement level buckets, sourced from the locked Movement level rubric score:
//   Stationary (1–2): breathing/vibration only — no locomotion
//   Some Movement (3): tail/head/paw movement — no self-propulsion
//   Walks / Active (4–5): rolls, walks, spins, or dances under own power
type Budget   = "any" | "100" | "200" | "300";
type Movement = "stationary" | "some" | "active";

const ANIMAL_OPTIONS: MemoryCareScoreRow["animalCategory"][] = ["Cat", "Dog", "Panda", "Robot"];
const TYPE_OPTIONS: { value: MemoryCareScoreRow["type"]; label: string }[] = [
  { value: "Fluffy Companion", label: "Fluffy Companion" },
  { value: "Ai & Robotic Pets", label: "AI & Robotic Pets" },
];

// Defaults reflect the original list criteria — all options selected means
// no pre-filtering; the weighted score determines ranking, same as the
// published list.
const DEFAULT_BUDGET: Budget = "any";
const DEFAULT_ANIMALS = new Set<string>(ANIMAL_OPTIONS);
const DEFAULT_TYPES   = new Set<string>(TYPE_OPTIONS.map((t) => t.value));
const DEFAULT_MOVEMENTS = new Set<Movement>(["stationary", "some", "active"]);

function movementBucket(level: number): Movement {
  if (level <= 2) return "stationary";
  if (level === 3) return "some";
  return "active";
}

function rankFiltered(
  budget: Budget,
  animals: Set<string>,
  types: Set<string>,
  movements: Set<Movement>
) {
  const budgetMax = budget === "any" ? Infinity : Number(budget);
  return MEMORY_CARE_SCORES
    .filter((row) => row.price <= budgetMax)
    .filter((row) => animals.has(row.animalCategory))
    .filter((row) => types.has(row.type))
    .filter((row) => movements.has(movementBucket(row.movementLevel)))
    .sort((a, b) => {
      // Tiebreaker: Score → Rating → Visual Contrast → Review Count (all desc)
      if (b.score !== a.score) return b.score - a.score;
      const pa = products.find((p) => p.slug === a.slug);
      const pb = products.find((p) => p.slug === b.slug);
      if ((pb?.rating ?? 0) !== (pa?.rating ?? 0)) return (pb?.rating ?? 0) - (pa?.rating ?? 0);
      if (b.visualContrast !== a.visualContrast) return b.visualContrast - a.visualContrast;
      return (pb?.reviewCount ?? 0) - (pa?.reviewCount ?? 0);
    })
    .slice(0, 5);
}

export function CustomizeRankings() {
  // ── Editing state (live, updates immediately for count feedback) ──
  const [budget,    setBudget]    = useState<Budget>(DEFAULT_BUDGET);
  const [animals,   setAnimals]   = useState<Set<string>>(new Set(DEFAULT_ANIMALS));
  const [types,     setTypes]     = useState<Set<string>>(new Set(DEFAULT_TYPES));
  const [movements, setMovements] = useState<Set<Movement>>(new Set(DEFAULT_MOVEMENTS));

  // ── Committed results — null until "Generate New List" is pressed ──
  const [customResults, setCustomResults] = useState<ReturnType<typeof rankFiltered> | null>(null);

  function toggleSet<T>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  // Live count — updates as user changes filters, before pressing button
  const liveCount = useMemo(
    () => rankFiltered(budget, animals, types, movements).length,
    [budget, animals, types, movements]
  );

  function handleGenerate() {
    setCustomResults(rankFiltered(budget, animals, types, movements));
  }

  const customResultProducts = (customResults ?? [])
    .map((row) => ({ row, product: products.find((p) => p.slug === row.slug) }))
    .filter((r): r is { row: MemoryCareScoreRow; product: NonNullable<(typeof products)[number]> } => !!r.product);

  return (
    <section className="pt-4 sm:pt-5 pb-4 sm:pb-5 bg-white">
      <div className="container-shell">

        {/* ── Filter panel ── */}
        <div className="rounded-2xl border-2 border-purple-200 bg-white p-2.5 sm:p-3">
          <div className="grid gap-2.5 lg:grid-cols-[1fr_2.5fr] lg:items-start">

            {/* Left: icon + title + description */}
            <div className="flex items-start gap-1.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xl">
                ⚙
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Customize These Rankings</h2>
                <p className="mt-0.5 text-sm text-slate-700">
                  Adjust the filters and press <strong>Generate New List</strong> to re-rank
                  across all 29 evaluated products.
                </p>
              </div>
            </div>

            {/* Right: 4 filter columns + button row */}
            <div>
              <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">

                {/* Budget */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Budget</p>
                  <div className="mt-1 space-y-1 text-sm">
                    {([
                      ["any", "Any Budget"],
                      ["100", "Under $100"],
                      ["200", "Under $200"],
                      ["300", "Under $300"],
                    ] as [Budget, string][]).map(([val, label]) => (
                      <label key={val} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          checked={budget === val}
                          onChange={() => setBudget(val)}
                          className="accent-purple-600"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pet Type */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pet Type</p>
                  <div className="mt-1 space-y-1 text-sm">
                    {ANIMAL_OPTIONS.map((a) => (
                      <label key={a} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={animals.has(a)}
                          onChange={() => toggleSet(animals, a, setAnimals)}
                          className="accent-purple-600"
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technology */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Technology</p>
                  <div className="mt-1 space-y-1 text-sm">
                    {TYPE_OPTIONS.map((t) => (
                      <label key={t.value} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={types.has(t.value)}
                          onChange={() => toggleSet(types, t.value, setTypes)}
                          className="accent-purple-600"
                        />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Movement Level */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Movement Level</p>
                  <div className="mt-1 space-y-1 text-sm">
                    {([
                      ["stationary", "Stationary"],
                      ["some",       "Some Movement"],
                      ["active",     "Walks / Active"],
                    ] as [Movement, string][]).map(([val, label]) => (
                      <label key={val} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={movements.has(val)}
                          onChange={() => toggleSet(movements, val, setMovements)}
                          className="accent-purple-600"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Button + live count */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={liveCount === 0}
                  className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate New List
                </button>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-purple-600">{liveCount}</span> of 29 products match these filters
                  {liveCount === 0 ? " — try widening your selections." : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Custom results — only shown after button press ── */}
        {customResults !== null && (
          <div className="mt-4">
            {customResultProducts.length > 0 ? (
              <>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  Your Custom List
                </h2>
                <p className="mt-0.5 text-sm text-slate-700">
                  Top {customResultProducts.length} result{customResultProducts.length !== 1 ? "s" : ""} based on
                  your selections, ranked by the same criteria as the published list.
                </p>
                <div className="mt-2 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-5">
                  {customResultProducts.map(({ row, product }, i) => (
                    <div key={product.slug} className="flex flex-col">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                        #{i + 1}{i === 0 ? " — Top Pick" : " Ranked"}
                      </p>
                      <BestForCard
                        product={product}
                        note={i === 0 ? "★ Top Match" : undefined}
                        className="flex-1"
                        scorePercent={Math.round((row.score / TOP_SCORE_IN_GROUP) * 100)}
                        accentColor="text-purple-600"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-500 italic">
                No products match this combination of filters. Try widening your selections above.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
