import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
export default function TopPicksPage() {
  const picks = products.filter((p) => p.flags?.topPick);
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Top picks" title="Interactive Pets Marketplace's Top Picks." text="Pets with the best features, ratings, and value." /></div></section><section className="section-pad pt-0"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{picks.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section></PageShell>;
}
