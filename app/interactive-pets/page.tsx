import { PageShell } from "@/components/layout";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
export default function Page() {
  const items = products.filter((p) => p.type === "Interactive");
  return <PageShell><section className="section-pad pb-2 sm:pb-3"><div className="container-shell"><SectionHeading eyebrow="Comfort-first options" title="Plushy Companions" text="Explore companion-style plushy companions designed for touch response, simple engagement, and lower maintenance." /></div></section><TrustBoxesRow /><GroupedProducts items={items} /><CompareTable items={items} title="Plushy Companions at a glance" text="Quickly scan type, audience, highlight, rating, and price." /></PageShell>;
}
