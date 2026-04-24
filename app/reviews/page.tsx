import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { SectionHeading, Badge } from "@/components/ui";
export default function ReviewsPage() {
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Review hub" title="Reviews designed to feel cleaner, more premium, and easier to scan." text="Use this page as your editorial hub for long-form buying guides, individual reviews, and product roundups." /><div className="mt-10 space-y-5">{products.map((product)=><article key={product.slug} className="card p-8"><div className="flex flex-wrap items-center gap-2"><Badge>{product.type}</Badge><Badge>{product.highlight}</Badge></div><h2 className="mt-4 text-2xl font-semibold text-slate-900">{product.name}</h2><p className="mt-3 max-w-3xl text-slate-600">{product.blurb}</p><div className="mt-5 grid gap-4 md:grid-cols-3">{product.features.map((feature)=><div key={feature} className="rounded-2xl bg-cream-100 px-4 py-3 text-sm text-slate-700">{feature}</div>)}</div></article>)}</div></div></section></PageShell>;
}
