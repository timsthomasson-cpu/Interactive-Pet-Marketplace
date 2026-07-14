import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import Link from "next/link";

// ── All Best For categories — one entry per weighting table ───────────────────
// topPickSlug sourced from each page's page-data.ts RANKED_SLUGS[0]

function Icon({ path, path2, circle }: { path?: string; path2?: string; circle?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-white">
      {circle && <circle cx={circle.split(',')[0]} cy={circle.split(',')[1]} r={circle.split(',')[2]} />}
      {path && <path d={path} />}
      {path2 && <path d={path2} />}
    </svg>
  );
}

const ALL_CATEGORIES = [
  // ── Seniors ──────────────────────────────────────────────────────────────
  {
    title: "Best Pets for Seniors Living Alone",
    desc: "Calming choices with simple interaction and lower learning curve.",
    href: "/best-pets-for-seniors-living-alone",
    bg: "bg-purple-500",
    topPickSlug: "matecat-pro",
    iconPath: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
    iconCircle: "12,7,4",
  },
  {
    title: "Best Pets for Seniors in Memory Care Facilities",
    desc: "Gentle, familiar companions for seniors with memory challenges.",
    href: "/best-pets-for-seniors-in-memory-care-facilities",
    bg: "bg-teal-500",
    topPickSlug: "percy-robot-cat",
    iconPath: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z",
    iconPath2: "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z",
  },
  {
    title: "Best Pets for Seniors with Dementia",
    desc: "Safe, soothing companions chosen specifically for dementia care needs.",
    href: "/best-pets-for-seniors-with-dementia",
    bg: "bg-cyan-500",
    topPickSlug: "companion-pet-cat-orange-tabby",
    iconPath: "M20.8 4.6a4.5 4.5 0 0 0-6.4 0L12 7l-2.4-2.4a4.5 4.5 0 0 0-6.4 6.4l2.4 2.4L12 20l6.4-6.6 2.4-2.4a4.5 4.5 0 0 0 0-6.4Z",
  },
  {
    title: "Best Pets for Seniors with Vision Challenges",
    desc: "High-contrast, audio-rich companions designed for low or impaired vision.",
    href: "/best-pets-for-seniors-with-vision-challenges",
    bg: "bg-blue-500",
    topPickSlug: "dj-furby",
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
    iconCircle: "12,12,3",
  },
  {
    title: "Best Pets for Tech Savvy Seniors",
    desc: "AI-powered companions for seniors who love staying connected with technology.",
    href: "/best-pets-for-tech-savvy-seniors",
    bg: "bg-purple-500",
    topPickSlug: "robot-pet-dog",
    iconPath: "M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z",
  },
  // ── Emotional needs ────────────────────────────────────────────────────────
  {
    title: "Best Pets for Anxiety",
    desc: "Calming, responsive companions that ease anxious moments through gentle interaction.",
    href: "/best-pets-for-anxiety",
    bg: "bg-rose-500",
    topPickSlug: "matecat-pro",
    iconPath: "M20.8 4.6a4.5 4.5 0 0 0-6.4 0L12 7l-2.4-2.4a4.5 4.5 0 0 0-6.4 6.4l2.4 2.4L12 20l6.4-6.6 2.4-2.4a4.5 4.5 0 0 0 0-6.4Z",
  },
  {
    title: "Best Pets for Loneliness",
    desc: "Warm, emotionally engaging companions that provide consistent, non-judgmental presence.",
    href: "/best-pets-for-loneliness",
    bg: "bg-sky-500",
    topPickSlug: "matecat-pro",
    iconPath: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
    iconCircle: "9,7,4",
    iconPath2: "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    title: "Best Pets for Autism",
    desc: "Gentle, predictable companions that build emotional connection and sensory comfort.",
    href: "/best-pets-for-autism",
    bg: "bg-violet-500",
    topPickSlug: "matecat-pro",
    iconPath: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z",
    iconPath2: "M12 8v4l3 3",
  },
  // ── Pet type preferences ───────────────────────────────────────────────────
  {
    title: "Best Pets for Former Cat Owners",
    desc: "True-to-life feline companions for those who know and love cats.",
    href: "/best-pets-for-former-cat-owners",
    bg: "bg-orange-500",
    topPickSlug: "matecat-pro",
    iconPath: "M5 9 7 4l3 3.2h4L17 4l2 5",
    iconCircle: "12,14,6",
  },
  {
    title: "Best Pets for Former Dog Owners",
    desc: "Lifelike robotic dogs that recreate the bond only a canine companion can provide.",
    href: "/best-pets-for-former-dog-owners",
    bg: "bg-amber-500",
    topPickSlug: "percy-1-1-robotic-companion-dog",
    iconPath: "M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5",
    iconPath2: "M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75z M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306",
  },
  // ── Family ────────────────────────────────────────────────────────────────
  {
    title: "Best Pets for Children and Families",
    desc: "Playful, safe companions for kids and the whole family to enjoy.",
    href: "/best-pets-for-children-and-families",
    bg: "bg-orange-500",
    topPickSlug: "percy-1-1-robotic-companion-dog",
    iconPath: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
    iconCircle: "9,7,4",
    iconPath2: "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    title: "Best Pets for Privacy Conscious Families",
    desc: "Companion pets with minimal data footprint — no camera, no cloud, no trade-offs.",
    href: "/best-pets-for-privacy-conscious-families",
    bg: "bg-emerald-500",
    topPickSlug: "percy-robot-cat",
    iconPath: "M12 3 4.5 6v5.5c0 4.4 3 7.7 7.5 9.5 4.5-1.8 7.5-5.1 7.5-9.5V6L12 3Z",
    iconPath2: "M9 12l2 2 4-4",
  },
  // ── Remote & Tech ─────────────────────────────────────────────────────────
  {
    title: "Best Pets for Remote Monitoring",
    desc: "Camera-equipped pets that let families stay connected from anywhere.",
    href: "/best-pets-for-remote-monitoring",
    bg: "bg-sky-500",
    topPickSlug: "robot-pet-dog",
    iconPath: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
    iconCircle: "12,13,4",
  },
  // ── Price tier ────────────────────────────────────────────────────────────
  {
    title: "Best Budget Friendly Pets",
    desc: "Top-rated companions that deliver genuine value at an affordable price.",
    href: "/best-budget-friendly-pets",
    bg: "bg-green-500",
    topPickSlug: "percy-robot-cat",
    iconPath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2.5-5 2.5-5 5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5",
  },
  {
    title: "Best Premium Robotic Pets",
    desc: "The most advanced robotic companions ranked for AI, movement, and build quality.",
    href: "/best-premium-robotic-pets",
    bg: "bg-indigo-500",
    topPickSlug: "robot-pet-dog",
    iconPath: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1L12 2Z",
  },
] as const;

export default function AllBestForRankings() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-trust-50 py-8 sm:py-10 border-b border-trust-100">
        <div className="container-shell">
          <p className="eyebrow">Rankings</p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            All &ldquo;Best For&rdquo; Rankings
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-slate-700">
            Every Best For list we&rsquo;ve ranked — covering seniors, families, emotional needs,
            pet preferences, tech levels, and budget. Find the right fit for any situation.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {ALL_CATEGORIES.map(({ title, desc, href, bg, topPickSlug, iconPath, iconPath2, iconCircle }) => {
              const topPick = products.find((p) => p.slug === topPickSlug);
              return (
                <div key={href} className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200">
                  {/* Full-card link — sits under content but covers the whole card */}
                  <Link href={href} className="absolute inset-0 z-0 rounded-3xl" aria-label={`View ${title} rankings`} />

                  {/* Header */}
                  <div className="relative z-10 flex items-start gap-3">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${bg}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                           strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-white">
                        {iconCircle && <circle cx={iconCircle.split(',')[0]} cy={iconCircle.split(',')[1]} r={iconCircle.split(',')[2]} />}
                        {iconPath && <path d={iconPath} />}
                        {iconPath2 && <path d={iconPath2} />}
                      </svg>
                    </div>
                    <p className="text-xl font-bold leading-tight text-slate-900">{title}</p>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 mt-3 text-sm leading-6 text-slate-600">{desc}</p>

                  {/* Top Pick mini-card */}
                  <div className="relative z-10 mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    {topPick ? (
                      <div className="flex h-full flex-col p-3">
                        <div className="flex items-center gap-1.5 text-xl font-bold uppercase tracking-wide text-trust-500">
                          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-5 w-5 shrink-0">
                            <circle cx="12" cy="8.5" r="5" />
                            <path d="M9 13.5L6 21l6-3 6 3-3-7.5Z" />
                          </svg>
                          Top Pick
                        </div>
                        {topPick.imageUrl && (
                          <div className="mt-1.5 overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                            <img src={topPick.imageUrl} alt={topPick.name} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{topPick.manufacturer}</p>
                        <p className="text-sm font-bold leading-tight text-slate-900">{topPick.name}</p>
                        {topPick.rating && (
                          <p className="mt-0.5 text-[10px] text-amber-400">
                            {"★".repeat(Math.round(topPick.rating))}{" "}
                            <span className="text-slate-500">{topPick.rating.toFixed(1)}</span>
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <p className="text-sm font-bold text-slate-900">{topPick.price}</p>
                          <a href={topPick.productUrl ?? "#"} target="_blank" rel="noopener noreferrer nofollow sponsored"
                             className="relative z-20 inline-flex items-center justify-center rounded-full bg-trust-500 px-3 py-1 text-xs font-semibold text-white hover:bg-trust-600">
                            View Details
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center text-slate-300 text-xs">No data</div>
                    )}
                  </div>

                  {/* Link */}
                  <span className="relative z-10 mt-4 inline-flex items-center gap-1 text-2xl font-semibold text-blue-600">
                    View Rankings →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
