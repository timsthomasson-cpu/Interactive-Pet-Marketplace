import Link from "next/link";
import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { CategoryHeader } from "@/components/category-header";
import { JsonLd, productSchema, breadcrumbListSchema } from "@/components/json-ld";
import { BeehiivEmbed } from "@/components/beehiiv-embed";

export const metadata = {
  title: "Best Interactive Pets for Seniors and Senior Loved Ones",
  description: "Senior-friendly interactive pets and robotic companions. Calm, low-maintenance choices for older adults, with research-backed benefits for loneliness and dementia."
};

export default function SeniorsPage() {
  const picks = products.filter((p) =>
    p.bestFor.some((tag) => ["Seniors", "Senior loved ones", "Gift buyers"].includes(tag))
  );
  const topPicks = picks.filter((p) => p.flags?.topPick && p.imageUrl);
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
            <div className="order-first lg:order-last lg:w-80 xl:w-96 shrink-0 rounded-2xl border-[3px] border-trust-600 bg-trust-50 p-4 mb-8 lg:mb-0 flex flex-col" id="research-digest">

              {/* Header row */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-[12px] font-bold tracking-tight text-trust-900 uppercase">
                  Senior Companion Digest — What&rsquo;s new?
                </h2>
                <Link
                  href="https://interactivepetmarketplace.beehiiv.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold text-trust-600 hover:text-trust-800 underline whitespace-nowrap"
                >
                  See all Digests →
                </Link>
              </div>

              {/* Article */}
              <div className="grow">
                <Link
                  href="https://alz-journals.onlinelibrary.wiley.com/doi/full/10.1002/dad2.70149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-trust-700 hover:text-trust-900 underline leading-snug"
                >
                  Loneliness, Social Isolation, and Effects on Cognitive Decline
                </Link>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  A 2025 study of 34,469 adults found that loneliness and social isolation independently accelerate cognitive decline — with combined exposure nearly doubling the risk of dementia.
                </p>
                <p className="mt-1 text-[9px] text-slate-400">Alzheimer's Association · 2025</p>
              </div>

              {/* Divider + Beehiiv form */}
              <div className="border-t border-trust-200 mt-3 pt-2">
                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wide mb-1">Get the digest free</p>
                {/* Negative margin clips Beehiiv iframe's internal padding; overflow-hidden keeps rounded corners clean */}
                <div className="w-full overflow-hidden -mx-1">
                  <BeehiivEmbed />
                </div>
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
      <GroupedProducts items={picks} pageName="Seniors" />
      <CompareTable items={picks} title="Senior picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
