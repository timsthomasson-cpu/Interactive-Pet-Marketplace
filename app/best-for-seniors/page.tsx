import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
import { TrustBlocks } from "@/components/sections";
export default function SeniorsPage() {
  const picks = products.filter((p)=>["Seniors","Senior loved ones","Gift buyers"].includes(p.bestFor));
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Senior-friendly picks" title="Best smart pets for seniors and senior loved ones." text="This page is structured for adult children shopping for parents, as well as older buyers who want companionship with minimal complexity." /></div></section><TrustBlocks /><section className="section-pad pt-0"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{picks.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section></PageShell>;
}
