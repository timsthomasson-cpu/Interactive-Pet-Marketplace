import { PageShell } from "@/components/layout";
import { BestForCard } from "@/components/best-for-card";
import { IllustrativeImagesNote } from "@/components/illustrative-images-note";
import { products } from "@/components/site-data";
import Link from "next/link";

// Top 5 ranked products for Seniors in Memory Care Facilities.
// Source: Documentation/Best For Lists/Best for Seniors in Memory Care Facilities List.xlsx
// Generated: 2026-06-27 — update this list if the spreadsheet is re-run.
const RANKED_SLUGS = [
  "percy-robot-cat",                       // Rank 1 — Score 3.95
  "breathing-calico-percy-2-0",            // Rank 2 — Score 3.95
  "percy-1-1-robotic-companion-dog",       // Rank 3 — Score 3.95
  "original-black-and-white-shorthair-cat",// Rank 4 — Score 3.90
  "original-beagle",                       // Rank 5 — Score 3.90
];

// Criteria weights for this Best For list.
const CRITERIA = [
  { label: "Cleanability", weight: "20%", desc: "How easy the product is to wipe, spot-clean, or sanitize between residents." },
  { label: "Durability", weight: "20%", desc: "Whether it tolerates frequent handling, drops, or heavy use in a facility." },
  { label: "Caregiver Burden", weight: "15%", desc: "How much ongoing work the product creates for staff or family. Higher = less burden." },
  { label: "Safety Risk", weight: "15%", desc: "Physical hazards including sharp parts, locomotion risks, and overheating. Higher = safer." },
  { label: "Charging Convenience", weight: "10%", desc: "Battery life, ease of charging, and self-charging capability." },
  { label: "Privacy Risk", weight: "10%", desc: "Camera, microphone, Wi-Fi, or cloud processing. Higher = lower privacy risk." },
  { label: "Dementia Suitability", weight: "10%", desc: "Simplicity, familiar animal form, calm non-startling behavior." },
];

export default function MemoryCarePage() {
  const ranked = RANKED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as NonNullable<(typeof products)[number]>[];

  const topPick = ranked[0];
  const runners = ranked.slice(1);

  return (
    <PageShell>
      {/* ── Section 1: Criteria (left) + #1 ranked product (right) ── */}
      <section className="section-pad bg-gradient-to-br from-cream-100 via-brand-100 to-brand-200">
        <div className="container-shell">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left: how we scored */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="eyebrow">Best For Rankings</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Best Pets for Seniors in Memory Care Facilities
                </h1>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  We evaluated 29 products across 7 criteria weighted specifically for memory care environments. These rankings prioritize the practical needs of caregivers, facility staff, and residents — not just general appeal.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">How we scored each pet</h2>
                <ul className="mt-3 space-y-3">
                  {CRITERIA.map(({ label, weight, desc }) => (
                    <li key={label} className="flex gap-3 text-sm leading-6">
                      <span className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full bg-trust-500" />
                      <span>
                        <strong className="text-slate-900">{label} ({weight})</strong>
                        {" — "}
                        <span className="text-slate-600">{desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-500">
                Rankings generated 2026-06-27. Scoring anchors locked. Ratings and prices sourced from the Product Matrix; last verified per individual product listing.
              </p>

              <Link
                href="/best-for-memory-care/scoring"
                className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-trust-600 underline underline-offset-4 hover:text-trust-800"
              >
                Show detailed scoring results →
              </Link>
            </div>

            {/* Right: #1 ranked product */}
            {topPick && (
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wide text-trust-600">
                  ★ Best Pet for Seniors in Memory Care Facilities
                </p>
                <IllustrativeImagesNote />
                <div className="mt-3">
                  <BestForCard
                    product={topPick}
                    note={topPick.priceCategory}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 2: Ranks 2–5 side by side ── */}
      <section className="section-pad bg-white">
        <div className="container-shell">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Also Ranked — Top 5 Picks
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Four more strong choices, ranked by the same criteria.
          </p>
          <IllustrativeImagesNote />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {runners.map((product, i) => (
              <div key={product.slug}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  #{i + 2} Ranked
                </p>
                <BestForCard
                  product={product}
                  note={product.priceCategory}
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
