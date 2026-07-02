import { PageShell } from "@/components/layout";
import { BestForCard } from "@/components/best-for-card";
import { ScoreGauge, ScoreBar } from "@/components/score-gauge";
import {
  IconSparkleClean,
  IconDurability,
  IconUsers,
  IconShieldCheck,
  IconBattery,
  IconPrivacy,
  IconBrain,
  IconHeartHands,
  IconChat,
  IconAward,
  featureIcon,
  StarRating,
} from "@/components/best-for-icons";
import { products } from "@/components/site-data";
import { CustomizeRankings } from "@/components/customize-rankings";
import Link from "next/link";

const SPREADSHEET_UPDATED = "June 27, 2026";

const RANKED_SLUGS = [
  "percy-robot-cat",
  "breathing-calico-percy-2-0",
  "percy-1-1-robotic-companion-dog",
  "original-black-and-white-shorthair-cat",
  "original-beagle",
];

const SCORE_PERCENT: Record<string, number> = {
  "percy-robot-cat": 79,
  "breathing-calico-percy-2-0": 79,
  "percy-1-1-robotic-companion-dog": 79,
  "original-black-and-white-shorthair-cat": 78,
  "original-beagle": 78,
};

const RUNNER_NOTES: Record<string, string> = {
  "breathing-calico-percy-2-0":             "Best Value",
  "original-black-and-white-shorthair-cat": "Most Reviewed",
};

const TOP_PICK_CRITERIA = [
  { label: "Cleanability",         weight: "20%", score: 3, Icon: IconSparkleClean },
  { label: "Durability",           weight: "20%", score: 4, Icon: IconDurability },
  { label: "Caregiver Burden",     weight: "15%", score: 4, Icon: IconUsers },
  { label: "Safety Risk",          weight: "15%", score: 5, Icon: IconShieldCheck },
  { label: "Charging Convenience", weight: "10%", score: 3, Icon: IconBattery },
  { label: "Privacy Risk",         weight: "10%", score: 5, Icon: IconPrivacy },
  { label: "Dementia Suitability", weight: "10%", score: 4, Icon: IconBrain },
];

const TOP_PICK_RAW_SCORE = 3.95;
const TOP_PICK_PERCENT = Math.round((TOP_PICK_RAW_SCORE / 5) * 100); // 79%

// "Why Percy Robot Cat is Our Top Pick": top 6 scored criteria by score.
// Bullet copy grounded in locked rubric anchor definitions — not invented claims.
const WHY_TOP_PICK_BULLETS = [
  { label: "Safety Risk",        note: "Lowest safety risk rating — no choking hazards, sharp parts, or tip-over risk." },
  { label: "Privacy Risk",       note: "No camera, microphone, or WiFi — zero data privacy risk." },
  { label: "Durability",         note: "Built to tolerate frequent daily handling without mechanical issues." },
  { label: "Caregiver Burden",   note: "Low ongoing burden — no subscriptions, accounts, or app setup required." },
  { label: "Dementia Suitability", note: "Familiar cat form and simple, calming design suited for memory care." },
  { label: "Cleanability",       note: "Fabric exterior — easy to spot-clean with a damp cloth." },
];

export default function MemoryCarePage() {
  const ranked = RANKED_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as NonNullable<(typeof products)[number]>[];

  const topPick = ranked[0];
  const runners = ranked.slice(1);

  return (
    <PageShell>
      {/* ── Hero band ── */}
      <section className="bg-purple-100 py-8 sm:py-10">
        <div className="container-shell">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-purple-600 shadow-soft">
              <IconHeartHands className="h-10 w-10" />
            </div>
            <div>
              <p className="eyebrow">Best For Rankings</p>
              <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Best Pets for Seniors in Memory Care Facilities
              </h1>
              <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-slate-700">
                We evaluated 29 products across 7 criteria weighted specifically for memory care
                environments. These rankings prioritize the practical needs of caregivers, facility
                staff, and residents — not just general appeal.
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-trust-700">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-trust-500 text-white text-[10px]">✓</span>
                Ratings from Verified Sources · Updated {SPREADSHEET_UPDATED}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Pick: image / details / score panel ── */}
      {topPick && (
        <section className="py-4 sm:py-5 bg-white">
          <div className="container-shell">
            <div className="overflow-hidden rounded-3xl border-2 border-purple-200 shadow-soft">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr_0.9fr]">

                {/* Image with ribbon badge */}
                <div className="relative bg-purple-50">
                  <div className="absolute top-0 left-5 z-10 w-14 sm:w-16">
                    <div
                      className="bg-trust-500 text-white text-center font-bold pt-3 pb-5 sm:pt-4 sm:pb-6 shadow-soft"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
                    >
                      <span className="block text-sm sm:text-base leading-none">#1</span>
                      <span className="mt-1 block text-[8px] sm:text-[9px] leading-tight tracking-wide">
                        TOP<br />PICK
                      </span>
                    </div>
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
                <div className="flex flex-col justify-center gap-1.5 p-2.5 sm:p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {topPick.manufacturer}
                  </p>
                  <h2 className="text-4xl font-extrabold text-slate-900">{topPick.name}</h2>
                  {topPick.rating !== undefined && topPick.reviewCount !== undefined && (
                    <div className="flex flex-wrap items-baseline gap-1.5 text-sm">
                      <StarRating rating={topPick.rating} className="text-2xl" />
                      <span className="font-semibold text-slate-900">{topPick.rating.toFixed(1)}</span>
                      <span className="text-slate-700">({topPick.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  )}
                  <p className="text-sm leading-6 text-slate-700">{topPick.blurb}</p>
                  <div className="grid grid-cols-3 gap-1 pt-0.5">
                    {topPick.features.map((f) => (
                      <div
                        key={f}
                        className="flex flex-row items-center gap-1.5 rounded-xl bg-white border border-purple-200 px-2 py-1.5 text-xs font-medium text-brand-900"
                      >
                        {featureIcon(f, "h-8 w-8 shrink-0 text-purple-600")}
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-1 pt-1">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Price</p>
                      <p className="text-xl font-bold text-slate-900">{topPick.price}</p>
                    </div>
                    <Link
                      href={topPick.productUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="inline-flex items-center justify-center rounded-full bg-trust-500 px-12 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Score panel — white background, green gauge ring */}
                <div className="flex flex-col items-center gap-2 border-t-2 border-purple-200 bg-white p-2.5 sm:p-3 lg:border-l-2 lg:border-t-0">
                  <ScoreGauge
                    percent={TOP_PICK_PERCENT}
                    rawScore={TOP_PICK_RAW_SCORE}
                    accentColor="text-green-700"
                  />
                  <div className="w-full space-y-1">
                    {TOP_PICK_CRITERIA.map((c) => (
                      <ScoreBar key={c.label} label={c.label} weight={c.weight} score={c.score} barColor="bg-purple-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500 italic">
              Images shown are illustrative until manufacturer photos are available.
            </p>
            <div className="mt-1">
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

      {/* ── Why Percy Robot Cat is Our Top Pick ── */}
      {topPick && (
        <section className="pb-4 sm:pb-5 bg-white">
          <div className="container-shell">
            <div className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-2.5 sm:p-3">
              <div className="grid gap-2.5 lg:grid-cols-[1fr_2.5fr] lg:items-start">
                {/* Left: icon + title */}
                <div className="flex items-start gap-2.5">
                  <IconAward className="h-16 w-16 shrink-0 text-purple-600" />
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
                    Why {topPick.name} is Our Top Pick
                  </h2>
                </div>
                {/* Right: 2-col bullet grid */}
                <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {WHY_TOP_PICK_BULLETS.map((b) => (
                    <div key={b.label} className="flex items-start gap-1.5 text-sm leading-5">
                      <span className="mt-0.5 shrink-0 font-bold text-purple-600">✓</span>
                      <span className="text-slate-700">{b.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── How We Ranked These Pets ── */}
      <section className="py-4 sm:py-5 bg-white">
        <div className="container-shell">
          <div className="grid gap-3 lg:grid-cols-[1fr_2.5fr] lg:items-start">
            {/* Left: description */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">How We Ranked These Pets</h2>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                Our rankings are based on 7 criteria weighted for what matters most in memory care environments.
              </p>
              <Link href="/best-for-memory-care/scoring" className="mt-1 inline-block text-sm font-semibold text-trust-600 underline underline-offset-4 hover:text-trust-800">
                See the full scoring breakdown →
              </Link>
            </div>
            {/* Right: 7 criteria boxes */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-7">
              {TOP_PICK_CRITERIA.map(({ label, weight, Icon }) => (
                <div key={label} className="flex flex-col items-center gap-1 rounded-2xl border-2 border-purple-200 bg-white p-1.5 text-center">
                  <Icon className="h-16 w-16 text-purple-600" />
                  <p className="text-xl font-bold text-purple-600">{weight}</p>
                  <p className="text-xs leading-tight text-slate-700">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customize These Rankings → Also Ranked directly below filter ── */}
      <CustomizeRankings>
        <section className="pb-4 sm:pb-5 bg-white">
          <div className="container-shell">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Also Ranked — Top 5 Picks
            </h2>
            <p className="mt-0.5 text-sm text-slate-700">
              Four more strong choices, ranked by the same criteria.
            </p>
            <div className="mt-2 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {runners.map((product, i) => (
                <div key={product.slug} className="flex flex-col">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                    #{i + 2} Ranked
                  </p>
                  <BestForCard
                    product={product}
                    note={RUNNER_NOTES[product.slug]}
                    className="flex-1"
                    scorePercent={SCORE_PERCENT[product.slug]}
                    accentColor="text-purple-600"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-purple-200 pt-3 text-center">
              <Link
                href="/best-for-memory-care/scoring"
                className="inline-flex items-center gap-1 text-sm font-semibold text-trust-600 underline underline-offset-4 hover:text-trust-800"
              >
                Show detailed scoring results →
              </Link>
            </div>
          </div>
        </section>
      </CustomizeRankings>

      {/* ── Bottom CTA banner ── */}
      <section className="pb-6 sm:pb-8">
        <div className="container-shell">
          <div className="grid gap-2.5 rounded-2xl border-2 border-purple-200 bg-purple-50 p-2.5 sm:grid-cols-2 sm:p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-trust-100 text-trust-600">
                <IconHeartHands className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Companionship That Makes a Difference</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-700">
                  Interactive pets can offer comfort, encourage engagement, and bring moments of
                  connection to residents in memory care. The right companion can make a real difference.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-trust-100 text-trust-600">
                <IconChat className="h-8 w-8" />
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2.5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Need help choosing the right pet?</p>
                  <p className="mt-0.5 text-sm leading-6 text-slate-700">
                    Our recommendations are based on verified product data and caregiver needs.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600 whitespace-nowrap"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
