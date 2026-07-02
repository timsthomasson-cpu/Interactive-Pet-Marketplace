import { PageShell } from "@/components/layout";
import Link from "next/link";

// Scoring data for top 5 — sourced directly from:
// Documentation/Best For Lists/Best for Seniors in Memory Care Facilities List.xlsx
// Generated: 2026-06-27
// All scores are 1–5. For reversed criteria (Caregiver Burden, Privacy Risk, Safety Risk)
// a score of 5 means lowest burden / lowest risk.

const WEIGHTS = [
  { key: "charging",  label: "Charging Conv.",   weight: "10%", reversed: false },
  { key: "caregiver", label: "Caregiver Burden",  weight: "15%", reversed: true  },
  { key: "clean",     label: "Cleanability",      weight: "20%", reversed: false },
  { key: "dementia",  label: "Dementia Suitability", weight: "10%", reversed: false },
  { key: "durability",label: "Durability",         weight: "20%", reversed: false },
  { key: "privacy",   label: "Privacy Risk",      weight: "10%", reversed: true  },
  { key: "safety",    label: "Safety Risk",       weight: "15%", reversed: true  },
] as const;

type ScoreKey = typeof WEIGHTS[number]["key"];

type RankedRow = {
  rank: number;
  manufacturer: string;
  product: string;
  priceCategory: string;
  animal: string;
  price: string;
  rating: string;
  reviews: string;
  overall: string;
  scores: Record<ScoreKey, number>;
};

const ROWS: RankedRow[] = [
  {
    rank: 1,
    manufacturer: "Chongker",
    product: "Percy Robot Cat",
    priceCategory: "Budget Friendly",
    animal: "Cat",
    price: "$89",
    rating: "5.0",
    reviews: "16",
    overall: "3.95",
    scores: { charging: 3, caregiver: 4, clean: 3, dementia: 4, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 2,
    manufacturer: "Chongker",
    product: "Breathing Calico Percy 2.0",
    priceCategory: "Best Value",
    animal: "Cat",
    price: "$109",
    rating: "5.0",
    reviews: "10",
    overall: "3.95",
    scores: { charging: 3, caregiver: 4, clean: 3, dementia: 4, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 3,
    manufacturer: "Chongker",
    product: "Percy 1.1 Robotic Companion Dog",
    priceCategory: "Budget Friendly",
    animal: "Dog",
    price: "$89",
    rating: "5.0",
    reviews: "5",
    overall: "3.95",
    scores: { charging: 3, caregiver: 4, clean: 3, dementia: 4, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 4,
    manufacturer: "Perfect Petzzz",
    product: "Original Black and White Shorthair Cat",
    priceCategory: "Budget Friendly",
    animal: "Cat",
    price: "$44.45",
    rating: "4.4",
    reviews: "1,200",
    overall: "3.90",
    scores: { charging: 2, caregiver: 5, clean: 3, dementia: 3, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 5,
    manufacturer: "Perfect Petzzz",
    product: "Original Beagle",
    priceCategory: "Budget Friendly",
    animal: "Dog",
    price: "$44.45",
    rating: "4.4",
    reviews: "466",
    overall: "3.90",
    scores: { charging: 2, caregiver: 5, clean: 3, dementia: 3, durability: 4, privacy: 5, safety: 5 },
  },
];

function ScoreCell({ value, reversed }: { value: number; reversed: boolean }) {
  // Colour-code: 5 = best (green tint), 1 = worst (neutral), mid = default.
  const isTop = value === 5;
  const isLow = value <= 2;
  return (
    <td
      className={`border border-trust-200 px-3 py-2 text-center text-sm font-semibold ${
        isTop ? "bg-trust-50 text-trust-700" : isLow ? "text-slate-400" : "text-slate-700"
      }`}
    >
      {value}
    </td>
  );
}

export default function MemoryCareScoring() {
  return (
    <PageShell>
      <section className="section-pad">
        <div className="container-shell">
          <div className="mb-8">
            <Link
              href="/best-for-memory-care"
              className="text-sm font-semibold text-trust-600 hover:underline"
            >
              ← Back to rankings
            </Link>
          </div>

          <p className="eyebrow">Detailed Scoring</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Best for Seniors in Memory Care Facilities — Top 5 Results
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            All scores are 1–5. For criteria marked{" "}
            <span className="font-semibold text-slate-800">(↑ higher = better outcome)</span> a score of 5
            means the lowest caregiver burden, lowest privacy risk, or lowest safety risk respectively.
            Generated 2026-06-27. Tiebreaker order: Score → Customer Rating → Visual Contrast → Review Count.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-trust-200 shadow-soft">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-trust-50">
                  <th className="border border-trust-200 px-3 py-3 text-left font-semibold text-slate-900 whitespace-nowrap">
                    Rank
                  </th>
                  <th className="border border-trust-200 px-3 py-3 text-left font-semibold text-slate-900">
                    Product
                  </th>
                  <th className="border border-trust-200 px-3 py-3 text-right font-semibold text-slate-900 whitespace-nowrap">
                    Price
                  </th>
                  <th className="border border-trust-200 px-3 py-3 text-right font-semibold text-slate-900 whitespace-nowrap">
                    Rating
                  </th>
                  <th className="border border-trust-200 px-3 py-3 text-center font-bold text-trust-900 whitespace-nowrap">
                    Overall
                  </th>
                  {WEIGHTS.map((w) => (
                    <th
                      key={w.key}
                      className="border border-trust-200 px-3 py-3 text-center font-semibold text-slate-700 whitespace-nowrap"
                    >
                      {w.key === "dementia" ? (
                        <Link
                          href="/best-for-memory-care/scoring/dementia-suitability"
                          className="underline underline-offset-2 hover:text-trust-700"
                        >
                          {w.label}
                        </Link>
                      ) : (
                        w.label
                      )}
                      <br />
                      <span className="text-xs font-normal text-slate-500">{w.weight}</span>
                      {w.reversed && (
                        <>
                          <br />
                          <span className="text-[10px] font-normal text-trust-600">↑ higher = better</span>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.rank} className={i % 2 === 0 ? "bg-white" : "bg-cream-50"}>
                    <td className="border border-trust-200 px-3 py-3 font-bold text-trust-700 whitespace-nowrap">
                      #{row.rank}
                    </td>
                    <td className="border border-trust-200 px-3 py-3">
                      <p className="font-semibold text-slate-900">{row.product}</p>
                      <p className="text-xs text-slate-500">
                        {row.manufacturer} · {row.animal} · {row.priceCategory}
                      </p>
                    </td>
                    <td className="border border-trust-200 px-3 py-3 text-right text-slate-700 whitespace-nowrap">
                      {row.price}
                    </td>
                    <td className="border border-trust-200 px-3 py-3 text-right text-slate-700 whitespace-nowrap">
                      ★ {row.rating}
                      <br />
                      <span className="text-xs text-slate-500">({row.reviews} reviews)</span>
                    </td>
                    <td className="border border-trust-200 px-3 py-3 text-center font-bold text-trust-900">
                      {row.overall}
                    </td>
                    {WEIGHTS.map((w) => (
                      <ScoreCell
                        key={w.key}
                        value={row.scores[w.key]}
                        reversed={w.reversed}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Full scoring methodology and locked rubric anchors: Documentation/Feature_Scoring_Rubric.xlsx.
            Product data sourced from Documentation/Product Matrix.xlsx.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
