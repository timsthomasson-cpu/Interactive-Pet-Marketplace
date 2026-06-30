import { PageShell } from "@/components/layout";
import { BestForCard } from "@/components/best-for-card";
import { ScoreGauge, ScoreBar } from "@/components/score-gauge";
import { products } from "@/components/site-data";
import Link from "next/link";

// Top 5 ranked products for Seniors in Memory Care Facilities.
// Source: Documentation/Best For Lists/Best for Seniors in Memory Care Facilities List.xlsx
// Spreadsheet last modified: 2026-06-27 (from file metadata) — update this date
// and the ranked list below if the spreadsheet is re-run.
const SPREADSHEET_UPDATED = "June 27, 2026";

const RANKED_SLUGS = [
  "percy-robot-cat",                        // Rank 1 — Score 3.95
  "breathing-calico-percy-2-0",             // Rank 2 — Score 3.95
  "percy-1-1-robotic-companion-dog",        // Rank 3 — Score 3.95
  "original-black-and-white-shorthair-cat", // Rank 4 — Score 3.90
  "original-beagle",                        // Rank 5 — Score 3.90
];

// Unique feature notes for runner-up cards.
const RUNNER_NOTES: Record<string, string> = {
  "breathing-calico-percy-2-0":             "Best Value",
  "original-black-and-white-shorthair-cat": "Most Reviewed",
};

// Our locked rubric: real categories, real weights (Feature_Scoring_Rubric.xlsx).
// Scores below are the #1 product's (Percy Robot Cat) actual per-criterion
// scores, 1–5, sourced from the scoring spreadsheet — same values used on
// the /scoring detail page. Reversed criteria (Caregiver Burden, Safety Risk,
// Privacy Risk) already have 5 = best outcome baked in.
const TOP_PICK_CRITERIA = [
  { label: "Cleanability",         weight: "20%", score: 3 },
  { label: "Durability",           weight: "20%", score: 4 },
  { label: "Caregiver Burden",     weight: "15%", score: 4 },
  { label: "Safety Risk",          weight: "15%", score: 5 },
  { label: "Charging Convenience", weight: "10%", score: 3 },
  { label: "Privacy Risk",         weight: "10%", score: 5 },
  { label: "Dementia Suitability", weight: "10%", score: 4 },
];

// Composite verified: 0.20(3)+0.20(4)+0.15(4)+0.15(5)+0.10(3)+0.10(5)+0.10(4) = 3.95
const TOP_PICK_RAW_SCORE = 3.95;
const TOP_PICK_PERCENT = Math.round((TOP_PICK_RAW_SCORE / 5) * 100); // 79%

export default function MemoryCarePage() {
  const ranked = RANKED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as NonNullable<(typeof products)[number]>[];

  const topPick = ranked[0];
  const runners = ranked.slice(1);

  return (
    <PageShell>
      {/* ── Hero band ── */}
      <section className="bg-gradient-to-br from-cream-100 via-brand-100 to-brand-200 py-12 sm:py-16">
        <div className="container-shell">
          <div className="flex items-start gap-5">
            <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-100 text-2xl text-purple-600">
              ♥
            </div>
            <div>
              <p className="eyebrow">Best For Rankings</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Best Pets for Seniors in Memory Care Facilities
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                We evaluated 29 products across 7 criteria weighted specifically for memory care
                environments. These rankings prioritize the practical needs of caregivers, facility
                staff, and residents — not just general appeal.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-trust-700">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-trust-500 text-white text-[10px]">✓</span>
                Ratings from Verified Sources · Updated {SPREADSHEET_UPDATED}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Pick: image / details / score panel ── */}
      {topPick && (
        <section className="section-pad bg-white">
          <div className="container-shell">
            <div className="overflow-hidden rounded-3xl border border-coral-200 shadow-soft">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr_0.9fr]">

                {/* Image with ribbon */}
                <div className="relative bg-cream-100">
                  <div className="absolute top-4 left-0 z-10 bg-trust-500 text-white text-xs font-bold px-3 py-2 rounded-r-full shadow-soft">
                    #1 Top Pick
                  </div>
                  {topPick.imageUrl ? (
                    <div className="h-full w-full" style={{ aspectRatio: "1 / 1" }}>
                      {/* TODO: replace with licensed manufacturer image before publishing */}
                      <img
                        src={topPick.imageUrl}
                        alt={topPick.name}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[280px] items-center justify-center text-slate-400">
                      {topPick.name}
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {topPick.manufacturer}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">{topPick.name}</h2>
                  {topPick.rating !== undefined && topPick.reviewCount !== undefined && (
                    <p className="text-sm">
                      <span className="text-slate-600">Customer Ratings: </span>
                      <span className="font-semibold text-red-600">★</span>{" "}
                      <span className="font-semibold text-slate-900">{topPick.rating.toFixed(1)}</span>{" "}
                      <span className="text-slate-600">
                        ({topPick.reviewCount.toLocaleString()} reviews)
                      </span>
                    </p>
                  )}
                  <p className="text-sm leading-6 text-slate-600">{topPick.blurb}</p>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {topPick.features.map((f) => (
                      <div
                        key={f}
                        className="rounded-xl bg-cream-100 border border-coral-200 px-2 py-2 text-center text-[10px] font-medium leading-tight text-brand-900"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end justify-between gap-2 pt-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Price</p>
                      <p className="text-xl font-bold text-slate-900">{topPick.price}</p>
                    </div>
                    <Link
                      href={topPick.productUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Score panel */}
                <div className="flex flex-col items-center gap-5 border-t border-coral-200 bg-cream-50 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <ScoreGauge
                    percent={TOP_PICK_PERCENT}
                    rawScore={TOP_PICK_RAW_SCORE}
                    accentColor="text-purple-600"
                  />
                  <div className="w-full space-y-3">
                    {TOP_PICK_CRITERIA.map((c) => (
                      <ScoreBar key={c.label} label={c.label} weight={c.weight} score={c.score} barColor="bg-purple-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500 italic">
              Images shown are illustrative until manufacturer photos are available.
            </p>

            <div className="mt-4">
              <Link
                href="/best-for-memory-care/scoring"
                className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-trust-600 underline underline-offset-4 hover:text-trust-800"
              >
                Show detailed scoring results →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── How We Ranked These Pets: real weights, real categories ── */}
      <section className="section-pad bg-cream-50">
        <div className="container-shell">
          <h2 className="text-lg font-bold text-slate-900">How We Ranked These Pets</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Our rankings are based on 7 criteria weighted for what matters most in memory care
            environments.{" "}
            <Link href="/best-for-memory-care/scoring" className="text-trust-600 underline underline-offset-4 hover:text-trust-800">
              See the full scoring breakdown →
            </Link>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {TOP_PICK_CRITERIA.map((c) => (
              <div key={c.label} className="rounded-2xl border border-coral-200 bg-white p-4 text-center">
                <p className="text-xl font-bold text-purple-600">{c.weight}</p>
                <p className="mt-1 text-xs leading-tight text-slate-600">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ranks 2–5 side by side ── */}
      <section className="section-pad bg-white">
        <div className="container-shell">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Also Ranked — Top 5 Picks
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Four more strong choices, ranked by the same criteria.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {runners.map((product, i) => (
              <div key={product.slug} className="flex flex-col">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  #{i + 2} Ranked
                </p>
                <BestForCard
                  product={product}
                  note={RUNNER_NOTES[product.slug]}
                  className="flex-1"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-coral-200 pt-8 text-center">
            <Link
              href="/best-for-memory-care/scoring"
              className="inline-flex items-center gap-2 text-sm font-semibold text-trust-600 underline underline-offset-4 hover:text-trust-800"
            >
              Show detailed scoring results →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
