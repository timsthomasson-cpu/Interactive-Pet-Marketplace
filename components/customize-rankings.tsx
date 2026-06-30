"use client";

import { useMemo, useState } from "react";
import { products } from "./site-data";
import { BestForCard } from "./best-for-card";
import { MEMORY_CARE_SCORES, MemoryCareScoreRow } from "./memory-care-scores";

type Budget = "any" | "100" | "200" | "300";
type Movement = "calm" | "some" | "active"; // 1-2 / 3 / 4-5
type Noise = "any" | "quiet"; // quiet = noiseSensitivityFit >= 4

const ANIMAL_OPTIONS: MemoryCareScoreRow["animalCategory"][] = ["Cat", "Dog", "Panda", "Robot"];
const TYPE_OPTIONS: { value: MemoryCareScoreRow["type"]; label: string }[] = [
  { value: "Fluffy Companion", label: "Fluffy Companion" },
  { value: "Ai & Robotic Pets", label: "AI & Robotic Pets" },
];

function movementBucket(level: number): Movement {
  if (level <= 2) return "calm";
  if (level === 3) return "some";
  return "active";
}

export function CustomizeRankings() {
  const [budget, setBudget] = useState<Budget>("any");
  const [animals, setAnimals] = useState<Set<string>>(new Set(ANIMAL_OPTIONS));
  const [types, setTypes] = useState<Set<string>>(new Set(TYPE_OPTIONS.map((t) => t.value)));
  const [movements, setMovements] = useState<Set<Movement>>(new Set(["calm", "some", "active"]));
  const [noise, setNoise] = useState<Noise>("any");

  function toggleSet<T>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  const results = useMemo(() => {
    const budgetMax = budget === "any" ? Infinity : Number(budget);
    return MEMORY_CARE_SCORES
      .filter((row) => row.price <= budgetMax)
      .filter((row) => animals.has(row.animalCategory))
      .filter((row) => types.has(row.type))
      .filter((row) => movements.has(movementBucket(row.movementLevel)))
      .filter((row) => (noise === "quiet" ? row.noiseSensitivityFit >= 4 : true))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [budget, animals, types, movements, noise]);

  const resultProducts = results
    .map((row) => ({ row, product: products.find((p) => p.slug === row.slug) }))
    .filter((r): r is { row: MemoryCareScoreRow; product: NonNullable<(typeof products)[number]> } => !!r.product);

  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <div className="rounded-3xl border border-coral-200 bg-cream-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Customize These Rankings</h2>
          <p className="mt-1 text-sm text-slate-600">
            Adjust the results to match your facility&rsquo;s needs. Re-ranks across all 29 evaluated products.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {/* Budget */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Budget</p>
              <div className="mt-2 space-y-2 text-sm">
                {([
                  ["any", "Any Budget"],
                  ["100", "Under $100"],
                  ["200", "Under $200"],
                  ["300", "Under $300"],
                ] as [Budget, string][]).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer">
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
              <div className="mt-2 space-y-2 text-sm">
                {ANIMAL_OPTIONS.map((a) => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer">
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
              <div className="mt-2 space-y-2 text-sm">
                {TYPE_OPTIONS.map((t) => (
                  <label key={t.value} className="flex items-center gap-2 cursor-pointer">
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
              <div className="mt-2 space-y-2 text-sm">
                {([
                  ["calm", "Calm / Minimal"],
                  ["some", "Some Movement"],
                  ["active", "Walks / Active"],
                ] as [Movement, string][]).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer">
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

            {/* Noise Level */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Noise Level</p>
              <div className="mt-2 space-y-2 text-sm">
                {([
                  ["any", "Any"],
                  ["quiet", "Quiet Only"],
                ] as [Noise, string][]).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="noise"
                      checked={noise === val}
                      onChange={() => setNoise(val)}
                      className="accent-purple-600"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-600">
            <span className="font-semibold text-purple-600">{results.length}</span> of 29 products match these preferences
            {results.length > 5 ? "" : results.length === 0 ? " — try widening your filters." : ""}
          </p>
        </div>

        {/* Results */}
        {resultProducts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {resultProducts.map(({ row, product }) => (
              <BestForCard
                key={product.slug}
                product={product}
                scorePercent={Math.round((row.score / 5) * 100)}
                accentColor="text-purple-600"
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-500 italic">
            No products match this combination of filters. Try widening your selections above.
          </p>
        )}
      </div>
    </section>
  );
}
