import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
export default function GiftsPage() {
  const picks = products.filter((p) => p.flags?.gifts);
  return <PageShell><section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10"><div className="container-shell"><SectionHeading eyebrow="Best for gifts" title="Friendly, memorable smart pets for any occasion." text="Curated picks that make great gifts for parents, grandparents, kids, and pet lovers." /></div></section><TrustBoxesRow /><GroupedProducts items={picks} /><CompareTable items={picks} title="Gift picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." /></PageShell>;
}
