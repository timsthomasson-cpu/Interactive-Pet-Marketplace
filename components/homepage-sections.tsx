import Link from "next/link";
import { products } from "./site-data";
import { BestForCard } from "./best-for-card";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 4.5 6v5.5c0 4.4 3 7.7 7.5 9.5 4.5-1.8 7.5-5.1 7.5-9.5V6L12 3Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z" fill="currentColor" fillOpacity="0.18" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1L12 2Z" />
    </svg>
  );
}
function IconUser({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function IconGear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}
function IconPeople({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="8" r="3" /><circle cx="17" cy="8" r="2.5" />
      <path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" /><path d="M17 14c2.2.4 4 2 4 4" />
    </svg>
  );
}
function IconHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.8 4.6a4.5 4.5 0 0 0-6.4 0L12 7l-2.4-2.4a4.5 4.5 0 0 0-6.4 6.4l2.4 2.4L12 20l6.4-6.6 2.4-2.4a4.5 4.5 0 0 0 0-6.4Z" />
    </svg>
  );
}
function IconBrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
function IconCamera({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function IconHome({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconWalk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13" cy="4" r="1.5" />
      <path d="M7.5 22l2-7 2.5 3 3-6 1 4" /><path d="M16 22l-1-4.5" />
      <path d="M9.5 8.5L7 14l4 1" /><path d="M11 8.5l3.5.5-2 3" />
    </svg>
  );
}
function IconCat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 9 7 4l3 3.2h4L17 4l2 5" />
      <circle cx="12" cy="14" r="6" />
      <circle cx="9.5" cy="13" r="0.8" className="fill-current stroke-none" />
      <circle cx="14.5" cy="13" r="0.8" className="fill-current stroke-none" />
      <path d="M10 17c.5.5 1.5.8 2 0" />
    </svg>
  );
}
function IconRobot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="8" width="18" height="10" rx="2" />
      <circle cx="9" cy="13" r="1.5" /><circle cx="15" cy="13" r="1.5" />
      <path d="M12 8V5" /><circle cx="12" cy="4" r="1" />
      <path d="M3 13H1m22 0h-2" />
    </svg>
  );
}
function IconDollar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2.5-5 2.5-5 5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5" />
    </svg>
  );
}
function IconGrid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="5" cy="5" r="2" opacity=".8" /><circle cx="12" cy="5" r="2" opacity=".8" /><circle cx="19" cy="5" r="2" opacity=".8" />
      <circle cx="5" cy="12" r="2" opacity=".8" /><circle cx="12" cy="12" r="2" opacity=".8" /><circle cx="19" cy="12" r="2" opacity=".8" />
      <circle cx="5" cy="19" r="2" opacity=".8" /><circle cx="12" cy="19" r="2" opacity=".8" /><circle cx="19" cy="19" r="2" opacity=".8" />
    </svg>
  );
}
function IconEye({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconSearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

export function HomepageHero() {
  // MateCat Pro — pinned by slug, verified data from Product Matrix via site-data.ts
  const featured = products.find((p) => p.slug === "percy-robot-cat");

  return (
    /*
     * The full-width wrapper provides the cream background beyond the max-width.
     * max-w-[1440px] on the section ensures the background image crop is
     * identical at every browser zoom level — without it, cover scales to the
     * full CSS viewport width (which doubles at 50% zoom), making the crop
     * completely different between zoom levels.
     */
    <div className="bg-[#f0ebe3]">
    <section
      className="relative mx-auto max-w-[1440px]"
      style={{ backgroundColor: "#f0ebe3" }}
    >
      {/* Background image: hidden on mobile so pets don't overlap text;
          on lg+ the image fills the section with a cream gradient on the left */}
      <div
        className="absolute inset-0 hidden lg:block"
        aria-hidden="true"
        style={{
          backgroundImage: [
            "linear-gradient(to right,",
            "  rgba(255,255,255,0.55) 0%,",
            "  rgba(255,255,255,0.55) 14%,",
            "  rgba(255,255,255,0.20) 30%,",
            "  rgba(255,255,255,0.00) 46%",
            "),",
            "url('/hero-pets-clean.png')",
          ].join(" "),
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 container-shell">
        <div className="grid min-h-[420px] lg:grid-cols-[1fr_1fr]">

          {/* LEFT — text, buttons, trust badges */}
          <div className="flex flex-col justify-center py-10 sm:py-14 lg:py-16 lg:pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Companionship Comfort Connection
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Find the right interactive pet for<br className="hidden sm:block" />
              {" "}companionship, comfort,<br className="hidden sm:block" />
              {" "}and fun.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Compare the best interactive pets and AI &amp; robotic pets for seniors, families,
              gift buyers, and premium shoppers — without a cluttered buying experience.
            </p>

            <div className="mt-7 flex flex-col gap-4">
              {/* Shop Our Top Picks — same size, outlined style */}
              <Link
                href="#"
                className="inline-flex w-full lg:w-[500px] min-h-[60px] lg:h-[120px] shrink-0 items-center gap-3 lg:gap-5 rounded-xl border-2 border-trust-500 bg-white px-5 lg:px-8 py-4 lg:py-0 text-2xl lg:text-4xl font-bold text-trust-500 shadow-soft transition hover:-translate-y-0.5 hover:bg-trust-50"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-8 w-8 lg:h-12 lg:w-12 shrink-0">
                  <circle cx="12" cy="8.5" r="5" />
                  <path d="M9 13.5L6 21l6-3 6 3-3-7.5Z" />
                </svg>
                <span>Shop Our Top Picks</span>
              </Link>

              {/* or divider */}
              <div className="flex items-center gap-3 w-full lg:w-[500px]">
                <div className="flex-1 h-px bg-slate-300" />
                <span className="text-sm font-medium text-slate-500">or</span>
                <div className="flex-1 h-px bg-slate-300" />
              </div>

              {/* Let Us Help CTA */}
              <Link
                href="#"
                className="inline-flex w-full lg:w-[500px] min-h-[60px] lg:h-[120px] shrink-0 items-center gap-3 lg:gap-5 rounded-xl bg-trust-500 px-5 lg:px-8 py-4 lg:py-0 text-base lg:text-xl font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-trust-600"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 lg:h-12 lg:w-12 shrink-0">
                  <path d="M12 3v18M8 21h8" />
                  <path d="M3 6h18" />
                  <path d="M5 6L2 13h6L5 6Z" />
                  <path d="M19 6l-3 7h6l-3-7Z" />
                </svg>
                <span>Let Us Help You find the Right Pet for You or Your Loved One</span>
              </Link>
            </div>

            {/* Trust badges — dark text matching mockup */}
            <div className="mt-8 flex items-center justify-center sm:justify-start gap-3 sm:gap-8 text-[9px] sm:text-xs font-medium text-slate-800">
              <div className="flex items-center gap-1 sm:gap-2">
                <IconShield className="h-5 w-5 sm:h-8 sm:w-8 shrink-0 text-green-600" />
                <span className="leading-tight">Expert Reviews<br />You Can Trust</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <IconCheck className="h-5 w-5 sm:h-8 sm:w-8 shrink-0 text-purple-600" />
                <span className="leading-tight">Unbiased<br />Recommendations</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <IconStar className="h-5 w-5 sm:h-8 sm:w-8 shrink-0 text-amber-400" />
                <span className="leading-tight">Ratings from<br />Verified Sources</span>
              </div>
            </div>
          </div>

          {/*
           * RIGHT — positioning context for the floating card.
           *
           * Card positioning intent:
           *   top: ~250px   → card top aligns with where the Perfect Petzzz card
           *                    top appeared in the mockup (≈55% down a 420px hero)
           *   bottom bleeds → section has no overflow-hidden so the card extends
           *                    naturally below the hero background into the next section
           *   z-50          → floats above Popular Categories white background
           *   w-80 (320px)  → wide enough for feature chip text to wrap cleanly
           *   centered       → left:50% + translateX(-50%) centres within column
           *
           * Visual separation: layered shadow gives clear z-depth so the card reads
           * as interface chrome, not a label for the animals in the background.
           */}
          {featured && (
            <div className="relative hidden lg:block">
              <div
                className="absolute w-80"
                style={{
                  top: "460px",
                  right: "80px",
                  zIndex: 50,
                  // Layered shadow: subtle ambient + deeper drop for UI-element feel
                  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.07)) drop-shadow(0 14px 44px rgba(0,0,0,0.17))",
                }}
              >
                <BestForCard
                  product={featured}
                  note="★ Top Pick"
                  accentColor="text-trust-600"
                  hideBlurb
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
    </div>
  );
}


// ── Popular Categories ────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title: "Best Pets for Seniors Living Alone",
    desc: "Calming choices with simple interaction and lower learning curve.",
    href: "/best-pets-for-seniors-living-alone",
    iconColor: "bg-purple-500 text-white",
    Icon: IconUser,
    topPickSlug: "matecat-pro",
  },
  {
    title: "Best Pets for Seniors in Memory Care Facilities",
    desc: "Gentle, familiar companions for seniors with memory challenges.",
    href: "/best-pets-for-seniors-in-memory-care-facilities",
    iconColor: "bg-teal-500 text-white",
    Icon: IconBrain,
    topPickSlug: "percy-robot-cat",
  },
  {
    title: "Best Pets for Remote Monitoring",
    desc: "Camera-equipped pets that let families stay connected from anywhere.",
    href: "/best-pets-for-remote-monitoring",
    iconColor: "bg-sky-500 text-white",
    Icon: IconCamera,
    topPickSlug: "robot-pet-dog",
  },
  {
    title: "Best Pets for Children and Families",
    desc: "Playful, safe companions for kids and the whole family to enjoy.",
    href: "/best-pets-for-children-and-families",
    iconColor: "bg-orange-500 text-white",
    Icon: IconPeople,
    topPickSlug: "percy-1-1-robotic-companion-dog",
  },
];

export function PopularCategories() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-shell">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          Popular Categories
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map(({ title, desc, href, iconColor, Icon, topPickSlug }) => {
            const topPick = products.find((p) => p.slug === topPickSlug);
            return (
            <div
              key={title}
              className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Icon + title */}
              <div className="flex items-start gap-3">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-xl font-bold leading-tight text-slate-900">{title}</p>
              </div>
              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              {/* Top Pick card */}
              <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
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
                      <p className="mt-0.5 text-[10px] text-amber-400">{"★".repeat(Math.round(topPick.rating))} <span className="text-slate-500">{topPick.rating.toFixed(1)}</span></p>
                    )}
                    <p className="mt-auto pt-1 text-sm font-bold text-slate-900">{topPick.price}</p>
                    <a
                      href={topPick.productUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-trust-500 py-1.5 text-xs font-semibold text-white transition hover:bg-trust-600"
                    >
                      View Details
                    </a>
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center text-slate-300 text-xs">No data</div>
                )}
              </div>
              {/* Link */}
              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-1 text-2xl font-semibold text-blue-600 hover:text-blue-700"
              >
                View Rankings →
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Best For Finder ───────────────────────────────────────────────────────────

const FINDER_ICONS = [
  { label: "Best Budget\nFriendly Pets",             Icon: IconDollar, bg: "bg-green-500",   href: "/best-budget-friendly-pets" },
  { label: "Seniors with\nVision Challenges",        Icon: IconEye,    bg: "bg-blue-500",    href: "/best-pets-for-seniors-with-vision-challenges" },
  { label: "Former Cat\nOwners",                     Icon: IconCat,    bg: "bg-orange-500",  href: "/best-pets-for-former-cat-owners" },
  { label: "Tech Savvy\nSeniors",                    Icon: IconGear,   bg: "bg-purple-500",  href: "/best-pets-for-tech-savvy-seniors" },
  { label: "Best Premium\nRobotic Pets",             Icon: IconRobot,  bg: "bg-indigo-500",  href: "/best-premium-robotic-pets" },
];

export function BestForFinder() {
  return (
    <section className="bg-slate-50 py-10 sm:py-12">
      <div className="container-shell">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Left: search icon + headline */}
          <div className="flex items-start gap-4 lg:w-64 lg:shrink-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-slate-200">
              <IconSearch className="h-6 w-6 text-slate-500" />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-tight text-slate-900">
                Looking for something specific?
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Explore our complete Best For Rankings for every need, lifestyle, and budget.
              </p>
            </div>
          </div>

          {/* Center: icon grid */}
          <div className="flex flex-1 flex-wrap justify-center gap-5 lg:justify-start">
            {FINDER_ICONS.map(({ label, Icon, bg, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-1.5 text-center transition hover:-translate-y-0.5"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${bg}`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span className="whitespace-pre-line text-[10px] font-semibold leading-tight text-slate-600 sm:text-[11px]">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col items-start gap-2 lg:w-52 lg:shrink-0 lg:items-end">
            <Link
              href="/all-best-for-rankings"
              className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600 whitespace-nowrap"
            >
              Explore All &ldquo;Best For&rdquo; Rankings →
            </Link>
            <p className="text-xs text-slate-500">Find the perfect pet for your situation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Latest Reviews & Guides ───────────────────────────────────────────────────

const ARTICLES = [
  {
    tag: "Research",
    tagColor: "text-purple-600 bg-purple-50",
    title: "Do Robotic Pets Actually Help with Loneliness?",
    desc: "New 2024 research shows measurable reductions in depression and loneliness.",
    href: "/digest/do-robotic-pets-help-with-loneliness",
    imageNote: "Senior with pet",
    imageBg: "from-purple-50 to-cream-100",
  },
  {
    tag: "Guide",
    tagColor: "text-amber-600 bg-amber-50",
    title: "Why Interactive Pets Are Good for Kids",
    desc: "Research on empathy, emotional intelligence, and what to look for.",
    href: "/digest/interactive-pets-for-kids",
    imageNote: "Child with pet",
    imageBg: "from-amber-50 to-cream-100",
  },
  {
    tag: "Guide",
    tagColor: "text-amber-600 bg-amber-50",
    title: "Real Pet vs. Robotic Pet",
    desc: "An honest decision framework for 5 situations where robotic pets make sense.",
    href: "/digest/real-pet-vs-robotic-pet",
    imageNote: "Robotic pet",
    imageBg: "from-emerald-50 to-cream-50",
  },
  {
    tag: "Review",
    tagColor: "text-trust-600 bg-trust-50",
    title: "Enabot EBO Air 2S Review",
    desc: "AI home companion with camera, tracking, and family connectivity.",
    href: "/digest",
    imageNote: "Enabot EBO Air 2S",
    imageBg: "from-slate-50 to-blue-50",
  },
];

export function LatestArticles() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-shell">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Latest Reviews &amp; Guides
          </h2>
          <Link href="#" className="text-sm font-semibold text-trust-600 hover:underline">
            View all articles →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {ARTICLES.map(({ tag, tagColor, title, desc, href, imageNote, imageBg }) => (
            <Link
              key={title}
              href={href}
              className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Article image */}
              <div className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${imageBg}`}>
                {/* TODO: replace with real article thumbnail */}
                <div className="flex h-full w-full items-center justify-center text-[9px] text-slate-400 text-center px-1 leading-tight">
                  {imageNote}
                </div>
              </div>
              {/* Text */}
              <div className="min-w-0">
                <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagColor}`}>
                  {tag}
                </span>
                <p className="mt-1 text-sm font-bold leading-tight text-slate-900">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
