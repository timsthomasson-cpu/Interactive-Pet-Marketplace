import { PageShell } from "@/components/layout";
import Link from "next/link";
// AUTO-GENERATED data
import { WEIGHTS, ROWS, GENERATED_DATE, type ScoreKey } from "./scoring-data";

function ScoreCell({ value, reversed }: { value: number; reversed: boolean }) {
  const isTop = value === 5;
  const isLow = value <= 2;
  return (
    <td className={`border border-trust-200 px-3 py-2 text-center text-sm font-semibold ${
      isTop ? "bg-trust-50 text-trust-700" : isLow ? "text-slate-400" : "text-slate-700"
    }`}>{value}</td>
  );
}

export default function BestForScoring() {
  return (
    <PageShell>
      <section className="section-pad">
        <div className="container-shell">
          <div className="mb-8"><Link href="/best-pets-for-loneliness" className="text-sm font-semibold text-trust-600 hover:underline">← Back to rankings</Link></div>
          <p className="eyebrow">Detailed Scoring</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Best Pets for Loneliness — Top 5 Results</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
            All scores are 1–5. Criteria marked <span className="font-semibold">(↑ higher = better outcome)</span> show 5 as lowest risk/burden.
            Generated {GENERATED_DATE}. Tiebreaker: Score → Rating → Visual Contrast → Review Count.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-trust-200 shadow-soft">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="bg-trust-50">
                <th className="border border-trust-200 px-3 py-3 text-left font-semibold text-slate-900">Rank</th>
                <th className="border border-trust-200 px-3 py-3 text-left font-semibold text-slate-900">Product</th>
                <th className="border border-trust-200 px-3 py-3 text-right font-semibold text-slate-900">Price</th>
                <th className="border border-trust-200 px-3 py-3 text-right font-semibold text-slate-900">Rating</th>
                <th className="border border-trust-200 px-3 py-3 text-center font-bold text-trust-900">Overall</th>
                {WEIGHTS.map((w) => (
                  <th key={w.key} className="border border-trust-200 px-3 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">
                    {w.label}<br/><span className="text-xs font-normal text-slate-500">{w.weight}</span>
                    {w.reversed && <><br/><span className="text-[10px] font-normal text-trust-600">↑ higher = better</span></>}
                  </th>
                ))}
              </tr></thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.rank} className={i % 2 === 0 ? "bg-white" : "bg-cream-50"}>
                    <td className="border border-trust-200 px-3 py-3 font-bold text-trust-700">#{row.rank}</td>
                    <td className="border border-trust-200 px-3 py-3"><p className="font-semibold text-slate-900">{row.product}</p><p className="text-xs text-slate-500">{row.manufacturer} · {row.animal} · {row.priceCategory}</p></td>
                    <td className="border border-trust-200 px-3 py-3 text-right text-slate-700">{row.price}</td>
                    <td className="border border-trust-200 px-3 py-3 text-right text-slate-700">★ {row.rating}<br/><span className="text-xs text-slate-500">({row.reviews} reviews)</span></td>
                    <td className="border border-trust-200 px-3 py-3 text-center font-bold text-trust-900">{row.overall}</td>
                    {WEIGHTS.map((w) => <ScoreCell key={w.key} value={row.scores[w.key]} reversed={w.reversed} />)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-slate-500">Full scoring methodology: Documentation/Feature_Scoring_Rubric.xlsx. Product data: Documentation/Product Matrix.xlsx.</p>
        </div>
      </section>
    </PageShell>
  );
}
