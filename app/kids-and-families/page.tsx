import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
export default function FamiliesPage() {
  const picks = products.filter((p)=>p.bestFor.some((tag)=>["Children","Families"].includes(tag)));
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="For kids and families" title="Playful smart pets for novelty and everyday fun." text="Engaging companions designed to entertain children and bring families together." /></div></section><section className="section-pad pt-0"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{picks.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section></PageShell>;
}
