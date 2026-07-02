import { PageShell } from "@/components/layout";
import { IconBrain } from "@/components/best-for-icons";
import Link from "next/link";

// Methodology explainer for the "Dementia Suitability" score.
// Source of truth: Documentation/Feature Scoring Rubric/Feature_Scoring_Rubric.xlsx
// Last updated: 2026-07-02

const SUB_CRITERIA = [
  {
    name: "Simplicity",
    detail:
      "Can it be used without memorized commands or phrases, app pairing, menus, or interpreting status lights? We reuse the product's existing Simplicity of Use score for this.",
  },
  {
    name: "Familiar Form",
    detail:
      "How closely the product resembles a familiar household pet, since an unfamiliar or abstract shape can cause confusion rather than comfort. We reuse the product's existing Recognizable Pet Appearance score for this.",
  },
  {
    name: "Calmness",
    detail:
      "Whether the product's sound and behavior are predictable and non-jarring rather than sudden or startling. We derive this from the product's Sound Quality score averaged with its Behavioral Realism score (a silent product is treated as calm on this measure).",
  },
  {
    name: "Safety",
    detail:
      "Physical hazards such as choking parts, sharp edges, overheating, or tripping risk from locomotion. We reuse the product's existing Safety Risk score for this.",
  },
];

const EVIDENCE_TIERS = [
  {
    tier: "A",
    name: "Independent peer-reviewed research",
    detail:
      "A published, peer-reviewed study specific to this product. No cap — the full 1–5 range is available.",
    cap: "No cap",
  },
  {
    tier: "B",
    name: "Independent caregiver / facility evidence",
    detail:
      "Verified reviews, news coverage, or facility pilot reports that are not published by the manufacturer.",
    cap: "Capped at 4",
  },
  {
    tier: "C",
    name: "Manufacturer marketing claims only",
    detail:
      "The manufacturer markets the product for dementia or memory care, but we found no independent verification of those claims.",
    cap: "Capped at 4",
  },
  {
    tier: "D",
    name: "No dementia-specific evidence",
    detail:
      "No dementia-specific research or marketing claims exist either way. The score reflects the four sub-criteria alone.",
    cap: "Capped at 3",
  },
];

export default function DementiaSuitabilityMethodology() {
  return (
    <PageShell>
      <section className="section-pad">
        <div className="container-shell max-w-3xl">
          <div className="mb-8">
            <Link
              href="/best-for-memory-care/scoring"
              className="text-sm font-semibold text-trust-600 hover:underline"
            >
              ← Back to detailed scoring
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <IconBrain className="h-6 w-6" />
            </div>
            <div>
              <p className="eyebrow">Scoring Methodology</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                How We Calculate Dementia Suitability
              </h1>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">
            Dementia Suitability measures how well a product fits the practical needs of memory
            care — not just whether it looks appealing, but whether it is simple enough, familiar
            enough, calm enough, and safe enough for someone living with dementia. We calculate it
            in two steps: a sub-criteria score, and an evidence-based cap.
          </p>

          <h2 className="mt-10 text-lg font-bold text-slate-900">Step 1 — Four Sub-Criteria</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Each product is scored 1–5 on four sub-criteria, which are then averaged and rounded
            to the nearest whole number.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SUB_CRITERIA.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-coral-200 bg-cream-50 p-4"
              >
                <p className="text-sm font-bold text-slate-900">{c.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{c.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-lg font-bold text-slate-900">Step 2 — Evidence Tier Cap</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            A high sub-criteria average alone isn&rsquo;t enough to earn a top score. We also
            weigh how strong the evidence is that a product actually helps in dementia or memory
            care, and cap the score accordingly — so manufacturer marketing claims can&rsquo;t
            outscore genuine independent research.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-coral-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-trust-50">
                  <th className="border border-trust-200 px-3 py-2 text-left font-semibold text-slate-900">
                    Tier
                  </th>
                  <th className="border border-trust-200 px-3 py-2 text-left font-semibold text-slate-900">
                    What it means
                  </th>
                  <th className="border border-trust-200 px-3 py-2 text-left font-semibold text-slate-900 whitespace-nowrap">
                    Max score
                  </th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_TIERS.map((t, i) => (
                  <tr key={t.tier} className={i % 2 === 0 ? "bg-white" : "bg-cream-50"}>
                    <td className="border border-trust-200 px-3 py-3 align-top font-bold text-purple-600">
                      {t.tier}
                    </td>
                    <td className="border border-trust-200 px-3 py-3 align-top text-slate-700">
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{t.detail}</p>
                    </td>
                    <td className="border border-trust-200 px-3 py-3 align-top font-semibold text-slate-900 whitespace-nowrap">
                      {t.cap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-lg font-bold text-slate-900">A Note on Product Type</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Some products rely heavily on smartphone apps, WiFi connectivity, or camera-based
            monitoring. Because that kind of complexity is a known concern in memory care
            regardless of how a product scores on the criteria above, products categorized as{" "}
            <span className="font-semibold text-slate-800">AI &amp; Robotic Pets</span> are
            filtered out of memory-care-relevant rankings separately, rather than through this
            score alone.
          </p>

          <div className="mt-10 rounded-2xl border border-trust-200 bg-trust-50 p-5">
            <p className="text-sm font-semibold text-trust-800">Where we are today</p>
            <p className="mt-1 text-xs leading-5 text-trust-700">
              These are our best first-pass scores using the methodology above. We are in the
              process of finding a dementia care consultant to review and refine them further.
              Scores may be adjusted as that review happens.
            </p>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Full scoring methodology and locked rubric anchors:
            Documentation/Feature_Scoring_Rubric.xlsx.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
