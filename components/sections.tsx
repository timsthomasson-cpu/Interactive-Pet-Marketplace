import Link from "next/link";
import { products } from "./site-data";
import { ProductCard } from "./product-card";
import { CTAButtons, PlaceholderVisual, SectionHeading, Badge } from "./ui";

export function HeroSection() {
  return <section className="section-pad overflow-hidden"><div className="container-shell"><div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="eyebrow">Companionship, comfort, and comparison</p><h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">Find the right smart pet for comfort, companionship, and fun.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Compare the best interactive pets and AI & robotic pets for seniors, families, gift buyers, and premium shoppers — without a cluttered buying experience.</p></div><div className="card p-5"><PlaceholderVisual label="Premium homepage hero preview" /></div></div></div></section>;
}
export function TwoCategoryCards() {
  const cards = [
    { title:"Plushy Companions", text:"Soft, engaging companion pets with touch response, sounds, and comforting interaction.", href:"/interactive-pets" },
    { title:"AI & Robotic Pets", text:"Advanced smart pets with movement, sensors, app features, and more lifelike behavior.", href:"/ai-robotic-pets" }
  ];
  return <section className="section-pad pt-0"><div className="container-shell"><SectionHeading eyebrow="Start here" title="Choose your shopping path in one click." text="Keep the homepage simple and let product complexity appear later." /><div className="mt-10 grid gap-6 md:grid-cols-2">{cards.map((card)=><div key={card.title} className="card p-8"><p className="eyebrow">{card.title}</p><h3 className="mt-4 text-2xl font-semibold text-slate-900">{card.title}</h3><p className="mt-3 max-w-lg text-slate-600">{card.text}</p><Link href={card.href} className="btn-primary mt-6">Explore {card.title}</Link></div>)}</div></div></section>;
}
export function ShopByNeed() {
  const items = [
    ["Best for Seniors", "Calming choices with simple interaction and lower learning curve."],
    ["Best for Gifts", "Friendly, memorable picks with broad appeal and easy setup."],
    ["Best for Kids & Families", "Playful options built for novelty and everyday entertainment."],
    ["Best Premium Picks", "Higher-end robotic pets with more advanced movement and sensors."]
  ];
  return <section className="section-pad bg-white"><div className="container-shell"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(([title, text])=><div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6"><h3 className="text-lg font-semibold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>;
}
export function FeaturedProducts({ filter }: { filter?: "Interactive" | "AI & Robotic" }) {
  const filtered = filter ? products.filter((p)=>p.type===filter) : products.slice(0,4);
  return <section className="section-pad"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">{filtered.map((product)=><ProductCard key={product.slug} product={product} />)}</div></div></section>;
}
export function ComparePreview() {
  const top = products.slice(0,4);
  return <section className="section-pad bg-white"><div className="container-shell"><SectionHeading eyebrow="Compare faster" title="Not sure which smart pet is right?" text="A table like this helps buyers compare type, comfort level, and price without jumping between tabs." /><div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50"><tr>{["Product","Type","Best For","Highlight","Price"].map((h)=><th key={h} className="px-5 py-4 font-semibold text-slate-900">{h}</th>)}</tr></thead><tbody>{top.map((product)=><tr key={product.slug} className="border-t border-slate-200"><td className="px-5 py-4 font-semibold text-slate-900">{product.name}</td><td className="px-5 py-4 text-slate-600">{product.type}</td><td className="px-5 py-4 text-slate-600">{product.bestFor}</td><td className="px-5 py-4 text-slate-600">{product.highlight}</td><td className="px-5 py-4 text-slate-900">{product.price}</td></tr>)}</tbody></table></div></div><Link href="/compare" className="btn-primary mt-8">Compare Top Models</Link></div></section>;
}
export function TrustBlocks() {
  const items = [
    ["Comfort & Companionship", "Smart pets can provide gentle interaction and emotional comfort without the demands of a live pet."],
    ["Low Maintenance", "No feeding, walking, litter, or vet visits — a key reason many families start here."],
    ["Easy for Families", "A simple way to add novelty, comfort, or companionship without ongoing care complexity."],
    ["Great Gift Option", "A thoughtful present for parents, grandparents, kids, and pet lovers who want something memorable."]
  ];
  return <section className="section-pad"><div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div className="card p-8"><p className="eyebrow">For families shopping for seniors</p><h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">A helpful resource for comfort-first buying decisions.</h3><p className="mt-4 text-lg leading-8 text-slate-600">Whether you want calm companionship, easy interaction, or a lower-maintenance pet alternative, this site is designed to guide shoppers with clarity and trust.</p><Link href="/best-for-seniors" className="btn-primary mt-6">Explore Best for Seniors</Link></div><div className="grid gap-4 sm:grid-cols-2">{items.map(([title,text])=><div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"><h4 className="text-lg font-semibold text-slate-900">{title}</h4><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>;
}
export function ReviewMethod() {
  return <section className="section-pad bg-white"><div className="container-shell"><SectionHeading eyebrow="How we review" title="A premium review-site structure, adapted for smart pets." text="This section is designed to build trust before buyers click an affiliate link." /><div className="mt-10 grid gap-5 md:grid-cols-4">{["Ease of use","Interaction quality","Comfort and reassurance","Value for price"].map((item)=><div key={item} className="rounded-3xl border border-slate-200 p-6"><p className="font-semibold text-slate-900">{item}</p><p className="mt-2 text-sm text-slate-600">Keep this language simple, readable, and senior-friendly.</p></div>)}</div></div></section>;
}
