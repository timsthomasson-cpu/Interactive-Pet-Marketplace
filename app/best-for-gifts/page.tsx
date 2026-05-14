import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { CompareTable, TrustBoxesRow } from "@/components/sections";
import { CategoryIntro } from "@/components/category-intro";
import { GiftWizard } from "@/components/gift-wizard";
import { Suspense } from "react";

export const metadata = {
  title: "Best Interactive Pets for Gifts — Curated holiday and birthday picks",
  description: "Friendly, memorable interactive pets that make great gifts for parents, grandparents, kids, and pet lovers. Use our gift finder to narrow by audience."
};

export default function GiftsPage() {
  const picks = products.filter((p) => p.flags?.gifts);
  return (
    <PageShell>
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Best for gifts"
            title="Friendly, memorable interactive pets for any occasion."
            text="Curated picks that make great gifts for parents, grandparents, kids, and pet lovers."
          />
        </div>
      </section>

      <CategoryIntro
        body={[
          <>
            <strong className="text-slate-900">Why interactive pets make memorable gifts.</strong>{" "}
            Gifts that get used tend to be the ones recipients reach for in unstructured moments — quiet evenings, anxious afternoons, downtime between activities. Interactive pets fit that profile better than most categories: they&rsquo;re tactile, they respond when handled, and they don&rsquo;t require ongoing care from the giver or the recipient. They also signal something that more generic gifts can&rsquo;t — that you noticed someone&rsquo;s situation and chose a present that addresses it specifically. A robotic cat for a grandparent who lost theirs, a plush therapy dog for a friend going through a hard year, an AI companion for a child who&rsquo;s curious about how things work.
          </>,
          <>
            <strong className="text-slate-900">Who they tend to suit.</strong>{" "}
            The most successful gift recipients in this category are people who would benefit from a pet but can&rsquo;t have one (or another one): older adults living alone, people in assisted living, children whose families aren&rsquo;t ready for a live pet, adults in apartments or with allergies. They also work for gift-giving moments that feel weighty — birthdays for grandparents, the holidays after someone has lost a beloved pet, milestone birthdays for kids. Less ideal for casual gift exchanges where the recipient won&rsquo;t feel comfortable opening something visibly personal in front of a group.
          </>
        ]}
        checklist={{
          title: "What to look for when choosing as a gift",
          items: [
            ["Match the recipient's tech comfort", "If they don't use a smartphone, skip the app-required models — even if the AI features sound impressive."],
            ["Skip the setup burden", "Plush companions and battery-powered robotic pets are the safest choice; complex setup undermines the gift."],
            ["Consider packaging", "Some manufacturers ship in plain brown boxes; others have gift-ready packaging that doesn't require rewrapping."],
            ["Don't assume gender", "Cat shapes, dog shapes, and abstract designs all work across genders and ages — choose based on personality, not stereotype."],
            ["Check return policy", "Reasonable gift-buying hygiene; recipient preferences vary."]
          ]
        }}
      />

      <Suspense fallback={null}>
        <GiftWizard />
      </Suspense>
      <TrustBoxesRow variant="gifts" />
      <CompareTable items={picks} title="Gift picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
