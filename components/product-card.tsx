import Link from "next/link";
import { Product } from "./site-data";
import { Badge, PlaceholderVisual } from "./ui";
export function ProductCard({ product }: { product: Product }) {
  return <div className="card overflow-hidden"><div className="p-4"><PlaceholderVisual label={product.name} /></div><div className="space-y-4 p-6 pt-1"><div className="flex flex-wrap items-center gap-2"><Badge>{product.type}</Badge><Badge>Best for {product.bestFor}</Badge></div><div><p className="text-xl font-semibold text-slate-900">{product.name}</p><p className="mt-2 text-sm text-slate-600">{product.blurb}</p></div><div className="grid grid-cols-3 gap-2">{product.features.map((feature)=><div key={feature} className="rounded-2xl bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-700">{feature}</div>)}</div><div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Price range</p><p className="text-lg font-bold text-slate-900">{product.price}</p></div><Link href="#" className="btn-primary">View Details</Link></div></div></div>;
}
