import Link from "next/link";
import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { TrustBoxesRow } from "@/components/sections";
import { CategoryHeader } from "@/components/category-header";
import { JsonLd, productSchema, breadcrumbListSchema } from "@/components/json-ld";
import { BeehiivEmbed } from "@/components/beehiiv-embed";

export const metadata = {
  title: "Best Interactive Pets for Seniors and Senior Loved Ones",
  description: "Senior-friendly interactive pets and robotic companions. Calm, low-maintenance choices for older adults, with research-backed benefits for loneliness and dementia."
};


const SENIOR_CATEGORIES = [
  {
    title: "Best Pets for Seniors Living Alone",
    desc: "Calming choices with simple interaction and a low learning curve.",
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
    desc: "Safe, soothing companions chosen specifically for dementia care.",
    href: "/best-pets-for-seniors-with-dementia",
    bg: "bg-cyan-500",
    topPickSlug: "companion-pet-cat-orange-tabby",
    iconPath: "M20.8 4.6a4.5 4.5 0 0 0-6.4 0L12 7l-2.4-2.4a4.5 4.5 0 0 0-6.4 6.4l2.4 2.4L12 20l6.4-6.6 2.4-2.4a4.5 4.5 0 0 0 0-6.4Z",
  },
  {
    title: "Best Pets for Seniors with Vision Challenges",
    desc: "High-contrast, audio-rich companions for low or impaired vision.",
    href: "/best-pets-for-seniors-with-vision-challenges",
    bg: "bg-blue-500",
    topPickSlug: "dj-furby",
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
    iconCircle: "12,12,3",
  },
  {
    title: "Best Pets for Tech Savvy Seniors",
    desc: "AI-powered companions for seniors who love technology.",
    href: "/best-pets-for-tech-savvy-seniors",
    bg: "bg-indigo-500",
    topPickSlug: "robot-pet-dog",
    iconPath: "M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4.22 19.78a10 10 0 0 1 0-14.14M19.78 19.78a10 10 0 0 0 0-14.14",
  },
] as const;

function FindTheRightFit({ topPicks }: { topPicks: typeof products }) {
  void topPicks; // available if needed for future use
  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="container-shell">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Find the right fit
        </h2>
        <p className="mt-2 max-w-2xl text-base text-slate-600">
          Each senior situation is different. Choose the ranking that matches your specific needs for a shortlist of the most relevant products.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {SENIOR_CATEGORIES.map(({ title, desc, href, bg, topPickSlug, iconPath, iconPath2, iconCircle }) => {
            const topPick = products.find((p) => p.slug === topPickSlug);
            return (
              <div key={href} className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md hover:border-slate-200">
                <Link href={href} className="absolute inset-0 z-10 rounded-3xl" aria-label={`View ${title} rankings`} />
                <div className="flex items-start gap-3">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${bg}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                         strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-white">
                      {iconCircle && <circle cx={iconCircle.split(",")[0]} cy={iconCircle.split(",")[1]} r={iconCircle.split(",")[2]} />}
                      {iconPath && <path d={iconPath} />}
                      {iconPath2 && <path d={iconPath2} />}
                    </svg>
                  </div>
                  <p className="text-xl font-bold leading-tight text-slate-900">{title}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
                {topPick && (
                  <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-trust-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-4 w-4 shrink-0">
                        <circle cx="12" cy="8.5" r="5" /><path d="M9 13.5L6 21l6-3 6 3-3-7.5Z" />
                      </svg>
                      Top Pick
                    </div>
                    {topPick.imageUrl && (
                      <div className="mt-2 overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                        <img src={topPick.imageUrl} alt={topPick.name} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{topPick.manufacturer}</p>
                    <p className="text-sm font-bold leading-tight text-slate-900">{topPick.name}</p>
                    {topPick.rating && (
                      <p className="mt-0.5 text-[10px] text-amber-400">{"★".repeat(Math.round(topPick.rating))} <span className="text-slate-600">{topPick.rating.toFixed(1)}</span></p>
                    )}
                    <p className="mt-1 text-sm font-bold text-slate-900">{topPick.price}</p>
                  </div>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-lg font-semibold text-blue-600">
                  See rankings →
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function SeniorsPage() {
  const topPicks = products.filter((p) =>
    p.bestFor.some((tag) => ["Seniors", "Senior loved ones", "Gift buyers"].includes(tag))
    && p.flags?.topPick && p.imageUrl
  );
  return (
    <PageShell>
      <JsonLd
        schema={[
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Best for Seniors", path: "/best-for-seniors" }
          ]),
          ...picks.map(productSchema)
        ]}
      />
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">

            {/* Digest box — first on mobile, second on desktop */}
            <div className="order-first lg:order-last lg:w-96 xl:w-[440px] shrink-0 rounded-2xl border-[3px] border-[#20568D] bg-trust-500 p-4 mb-8 lg:mb-0 flex flex-col" id="research-digest">

              {/* Header row */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-[15px] font-extrabold tracking-wide text-white uppercase">
                  Senior Companion Digest — What&rsquo;s new?
                </h2>

              </div>

              {/* Article */}
              <div className="grow">
                <Link
                  href="https://interactivepetmarketplace.beehiiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-white hover:text-[#D0DFEE] underline leading-snug"
                >
                  Senior Companion Digest - June 3, 2026
                </Link>
                <p className="mt-1 text-[13px] leading-relaxed text-[#D0DFEE]">
                  This week: the science of loneliness, a companion cat worth knowing about, and questions worth asking before considering an Interactive Pet.
                </p>
              </div>

              {/* Divider + Beehiiv form */}
              <div className="border-t border-[#74A1CE] mt-3 pt-2">
                <p className="text-[11px] font-bold text-white uppercase tracking-wide mb-1">Get the digest free</p>
                {/* Negative margin clips Beehiiv iframe's internal padding; overflow-hidden keeps rounded corners clean */}
                <div className="w-full overflow-hidden -mx-1">
                  <BeehiivEmbed />
                </div>
                <p className="mt-2 text-[9px] text-[#B4CCE5] leading-relaxed">
                  We respect your privacy. No spam, ever. Unsubscribe anytime. See our{" "}
                  <Link href="/privacy" className="underline hover:text-white">privacy policy</Link>.
                </p>
              </div>

            </div>

            {/* Heading — second on mobile, first on desktop */}
            <div className="order-last lg:order-first max-w-2xl">
              <p className="eyebrow">Senior-friendly picks</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Best interactive pets for seniors and senior loved ones.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                This page is for adult children shopping for parents, as well as older buyers who want companionship with minimal responsibilities.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Research has shown that interactive pets can improve the lives of seniors by reducing loneliness and social isolation, as well as decreasing agitation and anxiety.
              </p>
            </div>

          </div>
        </div>
      </section>

      <CategoryHeader
        topPicks={topPicks}
        rotatorTitle="Our Top Picks for Seniors"
        body={[
          <>
            <strong className="text-slate-900">Why do interactive pets help older adults?</strong>{" "}
            The research linked on this site (see <a href="/senior-research" className="underline text-trust-700 hover:text-trust-900">articles</a>) consistently points to a few specific benefits of companion pets and robotic companions for older adults: reduced loneliness in people living alone, calmer behavior and less agitation in dementia care, and small but measurable improvements in mood for residents of memory care facilities. The mechanism is straightforward — gentle, predictable interaction with something that feels alive provides comfort without requiring the cognitive effort of a conversation. None of this is a substitute for human connection or professional care, but as a supplemental presence in someone&rsquo;s day, the evidence is encouraging enough that many assisted-living facilities now use these products as part of their resident care toolkit.
          </>
        ]}
        checklist={{
          title: "What to look for when choosing for an older adult",
          items: [
            ["Ease of use", "Touch-and-sound interaction is universally easier than app-based or voice-controlled features. The fewer buttons, the better."],
            ["Recognizable form", "Cat and dog shapes feel familiar; abstract robotic designs can be confusing in dementia care."],
            ["Quiet sounds", "Loud purring or barking can startle. Look for models with adjustable or muted audio."],
            ["No fall risks", "Smaller, lighter products that can sit on a lap or bed avoid the trip hazard of a moving robotic pet on the floor."],
            ["Battery, not plug", "Battery-powered models are safer (no cord across the floor) and let the pet move around with the person."]
          ]
        }}
      />

      <TrustBoxesRow variant="seniors" />

      {/* ── Find the Right Fit ── */}
      <FindTheRightFit topPicks={topPicks} />
    </PageShell>
  );
}
