"use client";

import { useMemo, useState, ReactNode } from "react";
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

export function CustomizeRankings({ children }: { children?: ReactNode }) {
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
      .sort((a, b) => {
        // Tiebreaker chain per our published rule:
        // Score → Rating → Visual Contrast → Review Count (all descending).
        if (b.score !== a.score) return b.score - a.score;
        const pa = products.find((p) => p.slug === a.slug);
        const pb = products.find((p) => p.slug === b.slug);
        const ratingA = pa?.rating ?? 0;
        const ratingB = pb?.rating ?? 0;
        if (ratingB !== ratingA) return ratingB - ratingA;
        if (b.visualContrast !== a.visualContrast) return b.visualContrast - a.visualContrast;
        const reviewsA = pa?.reviewCount ?? 0;
        const reviewsB = pb?.reviewCount ?? 0;
        return reviewsB - reviewsA;
      })
      .slice(0, 5);
  }, [budget, animals, types, movements, noise]);

  const resultProducts = results
    .map((row) => ({ row, product: products.find((p) => p.slug === row.slug) }))
    .filter((r): r is { row: MemoryCareScoreRow; product: NonNullable<(typeof products)[number]> } => !!r.product);

  return (
    <section className="pt-4 sm:pt-5 bg-white">
      <div className="container-shell">
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
                  Adjust the results to match your facility&rsquo;s needs.{" "}
                  <span className="text-purple-600">Re-ranks across all 29 evaluated products.</span>
                </p>
              </div>
            </div>

            {/* Right: filter columns */}
            <div>
              <div className="grid gap-2 grid-cols-2 lg:grid-cols-5">
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
                  ["calm", "Calm / Minimal"],
                  ["some", "Some Movement"],
                  ["active", "Walks / Active"],
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

            {/* Noise Level */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Noise Level</p>
              <div className="mt-1 space-y-1 text-sm">
                {([
                  ["any", "Any"],
                  ["quiet", "Quiet Only"],
                ] as [Noise, string][]).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-1 cursor-pointer">
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

          <p className="mt-2 text-sm text-slate-700">
            <span className="font-semibold text-purple-600">{results.length}</span> of 29 products match these preferences
            {results.length > 5 ? "" : results.length === 0 ? " — try widening your filters." : ""}
          </p>
            </div>
          </div>
        </div>

        {/* Also Ranked section (passed as children) renders here — directly below filter panel */}
        {children}

        {/* Customize results */}
        {resultProducts.length > 0 ? (
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-5">
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
          <p className="mt-3 text-sm text-slate-500 italic">
            No products match this combination of filters. Try widening your selections above.
          </p>
        )}
      </div>
    </section>
  );
}
