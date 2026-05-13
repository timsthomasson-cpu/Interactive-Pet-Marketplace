import Link from "next/link";
import { products } from "./site-data";
import { ProductCard } from "./product-card";
import { CTAButtons, PlaceholderVisual, SectionHeading, Badge } from "./ui";
import { TopPicksRotator } from "./top-picks-rotator";

export function HeroSection() {
  return <section className="section-pad pt-4 pb-6 overflow-hidden sm:pt-8 sm:pb-12 lg:pt-10 bg-gradient-to-br from-cream-100 via-brand-100 to-brand-200"><div className="container-shell"><div className="grid items-center gap-6 sm:gap-10 lg:gap-12 lg:grid-cols-[1fr_1.4fr]"><div><p className="eyebrow">Companionship, comfort, and comparison</p><h1 className="mt-2 sm:mt-4 max-w-3xl text-[1.5rem] leading-[1.15] font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-6xl">Find the right interactive pet for comfort, companionship, and fun.</h1><p className="mt-3 sm:mt-6 max-w-2xl text-sm sm:text-lg leading-6 sm:leading-8 text-slate-700">Compare the best interactive pets and AI & robotic pets for seniors, families, gift buyers, and premium shoppers — without a cluttered buying experience.</p></div><TopPicksRotator /></div></div></section>;
}
export function TwoCategoryCards() {
  const cards = [
    { title:"Plushy Companions", text:"Soft, engaging companion pets with touch response, sounds, and comforting interaction.", href:"/interactive-pets" },
    { title:"AI & Robotic Pets", text:"Advanced interactive pets with movement, sensors, app features, and more lifelike behavior.", href:"/ai-robotic-pets" }
  ];
  return <section className="section-pad pt-0"><div className="container-shell"><SectionHeading eyebrow="Start here" title="Choose your shopping path in one click." text="Keep the homepage simple and let product complexity appear later." /><div className="mt-10 grid gap-6 md:grid-cols-2">{cards.map((card)=><div key={card.title} className="card p-8"><p className="eyebrow">{card.title}</p><h3 className="mt-4 text-2xl font-semibold text-slate-900">{card.title}</h3><p className="mt-3 max-w-lg text-slate-600">{card.text}</p><Link href={card.href} className="btn-primary mt-6">Explore {card.title}</Link></div>)}</div></div></section>;
}
export function ShopByNeed() {
  const items: [string, string, string][] = [
    ["Best for Seniors", "Calming choices with simple interaction and lower learning curve.", "/best-for-seniors"],
    ["Best for Gifts", "Friendly, memorable picks with broad appeal and easy setup.", "/best-for-gifts"],
    ["Best for Kids & Families", "Playful options built for novelty and everyday entertainment.", "/kids-and-families"],
    ["Best Premium Picks", "Higher-end robotic pets with more advanced movement and sensors.", "/premium-picks"]
  ];
  return <section className="hidden md:block section-pad pt-4 bg-white sm:pt-6 lg:pt-8"><div className="container-shell"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(([title, text, href])=><Link key={title} href={href} className="block rounded-3xl border border-trust-200 bg-trust-50 p-6 transition hover:-translate-y-0.5 hover:border-trust-400 hover:shadow-soft"><h3 className="text-lg font-semibold text-trust-900">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></Link>)}</div></div></section>;
}
export function MobileShopPills() {
  const items: [string, string][] = [
    ["Plushy Companions", "/interactive-pets"],
    ["AI & Robotic Pets", "/ai-robotic-pets"],
    ["Best for Seniors", "/best-for-seniors"],
    ["Best for Gifts", "/best-for-gifts"],
    ["Best for Kids & Families", "/kids-and-families"],
    ["Best Premium Picks", "/premium-picks"]
  ];
  return (
    <section className="md:hidden bg-white py-4">
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
        {items.map(([title, href]) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-2xl border border-trust-200 bg-trust-50 px-4 py-3 text-sm font-semibold text-trust-900 transition hover:border-trust-400 hover:bg-trust-100"
          >
            {title}
          </Link>
        ))}
      </div>
    </section>
  );
}
export function GroupedProducts({ items, pageName }: { items: typeof products; pageName?: string }) {
  if (items.length === 0) return null;
  const sections: { title: string; products: typeof items }[] = [
    { title: "Top Picks", products: items.filter((p) => p.flags?.topPick) },
    { title: "Premium", products: items.filter((p) => p.priceCategory === "Premium") },
    { title: "Best Value", products: items.filter((p) => p.priceCategory === "Best Value") },
    { title: "Budget Friendly", products: items.filter((p) => p.priceCategory === "Budget Friendly") }
  ];
  const nonEmpty = sections.filter((s) => s.products.length > 0);
  return <section className="section-pad pt-10 sm:pt-12"><div className="container-shell space-y-14">{nonEmpty.map((section) => <div key={section.title}>
    {/* MOBILE: heading sticks below the pills nav while its cards scroll past.
        Next heading pushes this one out of view when it enters the same zone. */}
    <h3
      className="text-center sm:text-left text-xl leading-tight font-bold tracking-tight text-slate-900 sm:text-3xl sticky z-30 bg-white/95 backdrop-blur py-2 -mx-4 px-4 border-b border-coral-100 sm:static sm:bg-transparent sm:backdrop-blur-none sm:py-0 sm:mx-0 sm:px-0 sm:border-0"
      style={{ top: "var(--header-height, 124px)" }}
    >
      {pageName ? `${section.title} - ${pageName}` : section.title}
    </h3>
    {/* MOBILE: horizontal scroll, one row per category */}
    <div className="mt-6 sm:hidden -mx-4">
      <div className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-2">
        {section.products.map((product) => (
          <div key={product.slug} className="snap-start shrink-0 w-[72%]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
    {/* DESKTOP: original grid */}
    <div className="mt-6 hidden sm:grid gap-6 lg:grid-cols-2 xl:grid-cols-4">{section.products.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
  </div>)}</div></section>;
}
export function FeaturedProducts({ filter }: { filter?: "Interactive" | "AI & Robotic" }) {
  const filtered = filter ? products.filter((p)=>p.type===filter) : products;
  return <section className="section-pad pt-10 sm:pt-12"><div className="container-shell"><div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">{filtered.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section>;
}
export { CompareTable } from "./compare-table";
export { TrustBoxesRow } from "./trust-boxes-row";

export function TrustBlocks() {
  const items = [
    ["Comfort & Companionship", "Interactive pets can provide gentle interaction and emotional comfort without the demands of a live pet."],
    ["Low Maintenance", "No feeding, walking, litter, or vet visits — a key reason many families start here."],
    ["Easy for Families", "A simple way to add novelty, comfort, or companionship without ongoing care complexity."],
    ["Great Gift Option", "A thoughtful present for parents, grandparents, kids, and pet lovers who want something memorable."]
  ];
  return <section className="section-pad"><div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div className="card p-8"><p className="eyebrow">For families shopping for seniors</p><h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">A helpful resource for comfort-first buying decisions.</h3><p className="mt-4 text-lg leading-8 text-slate-600">Whether you want calm companionship, easy interaction, or a lower-maintenance pet alternative, this site is designed to guide shoppers with clarity and trust.</p></div><div className="grid gap-4 sm:grid-cols-2">{items.map(([title,text])=><div key={title} className="rounded-3xl border border-coral-200 bg-white p-6 shadow-soft"><h4 className="text-lg font-semibold text-slate-900">{title}</h4><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>;
}
export function ReviewMethod() {
  return <section className="section-pad bg-white"><div className="container-shell"><SectionHeading eyebrow="How we review" title="A premium review-site structure, adapted for interactive pets." text="This section is designed to build trust before buyers click an affiliate link." /><div className="mt-10 grid gap-5 md:grid-cols-4">{["Ease of use","Interaction quality","Comfort and reassurance","Value for price"].map((item)=><div key={item} className="rounded-3xl border border-coral-200 p-6"><p className="font-semibold text-slate-900">{item}</p><p className="mt-2 text-sm text-slate-600">Keep this language simple, readable, and senior-friendly.</p></div>)}</div></div></section>;
}
