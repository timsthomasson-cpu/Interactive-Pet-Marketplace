import { PageShell } from "@/components/layout";
import { CompareTable, FeaturedProducts, ReviewMethod, TrustBlocks } from "@/components/sections";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
export default function Page() {
  const items = products.filter((p) => p.type === "Interactive");
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Comfort-first options" title="Plushy Companions" text="Explore companion-style plushy companions designed for touch response, simple engagement, and lower maintenance." /></div></section><FeaturedProducts filter="Interactive" /><CompareTable items={items} title="Plushy Companions at a glance" text="Quickly scan type, audience, highlight, rating, and price." /><TrustBlocks /><ReviewMethod /></PageShell>;
}
