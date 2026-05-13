import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { CompareTable, TrustBoxesRow } from "@/components/sections";
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
      <Suspense fallback={null}>
        <GiftWizard />
      </Suspense>
      <TrustBoxesRow />
      <CompareTable items={picks} title="Gift picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
