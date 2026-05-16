import Link from "next/link";
import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { CategoryHeader } from "@/components/category-header";
import { JsonLd, productSchema, breadcrumbListSchema } from "@/components/json-ld";

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
          <div className="max-w-3xl">
            <p className="eyebrow">Senior-friendly picks</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Best interactive pets for seniors and senior loved ones.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              This page is structured for adult children shopping for parents, as well as older buyers who want companionship with minimal complexity.
            </p>
          </div>
        </div>
      </section>

      <CategoryHeader
        topPicks={topPicks}
        rotatorTitle="Our Top Picks for Seniors"
        body={[
          <>
            Research has shown that interactive pets can improve the lives of seniors by reducing loneliness and social isolation, as well as decreasing agitation and anxiety. (
            <Link href="/senior-research" className="underline text-trust-700 hover:text-trust-900">
              See a list of articles
            </Link>
            .)
          </>,
          <>
            <strong className="text-slate-900">Why this matters for older adults.</strong>{" "}
            The research linked on this site consistently points to a few specific benefits of companion pets and robotic companions for older adults: reduced loneliness in people living alone, calmer behavior and less agitation in dementia care, and small but measurable improvements in mood for residents of memory care facilities. The mechanism is straightforward — gentle, predictable interaction with something that feels alive provides comfort without requiring the cognitive effort of a conversation. None of this is a substitute for human connection or professional care, but as a supplemental presence in someone&rsquo;s day, the evidence is encouraging enough that many assisted-living facilities now use these products as part of their resident care toolkit.
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
