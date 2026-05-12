import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
import { CompareTable, TrustBoxesRow } from "@/components/sections";
export default function PremiumPage() {
  const picks = products.filter((p) => p.priceCategory === "Premium");
  return <PageShell><section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10"><div className="container-shell"><SectionHeading eyebrow="Premium picks" title="Higher-end robotic pets with advanced features." text="More sophisticated movement, sensors, and AI behavior for buyers seeking the most advanced interactive pet experience." /></div></section><TrustBoxesRow /><section className="section-pad pt-0"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{picks.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section><CompareTable items={picks} title="Premium picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." /></PageShell>;
}
