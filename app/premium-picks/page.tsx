import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
export default function PremiumPage() {
  const picks = products.filter((p)=>p.type==="AI & Robotic");
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Premium picks" title="Higher-end robotic pets with advanced features." text="More sophisticated movement, sensors, and AI behavior for buyers seeking the most advanced smart pet experience." /></div></section><section className="section-pad pt-0"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{picks.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section></PageShell>;
}
