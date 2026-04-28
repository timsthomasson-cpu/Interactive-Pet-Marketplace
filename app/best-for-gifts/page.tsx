import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
export default function GiftsPage() {
  const picks = products.filter((p)=>p.bestFor.some((tag)=>["Gift buyers","Seniors","Children","Families"].includes(tag)));
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Best for gifts" title="Friendly, memorable smart pets for any occasion." text="Curated picks that make great gifts for parents, grandparents, kids, and pet lovers." /></div></section><section className="section-pad pt-0"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{picks.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section></PageShell>;
}
