import Link from "next/link";
import { Product } from "./site-data";
import { Badge, PlaceholderVisual } from "./ui";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amber-400">
        {"★".repeat(full)}{half ? "☆" : ""}{"☆".repeat(empty).replace(/☆/g, "")}
        <span className="text-slate-300">{"★".repeat(empty)}</span>
      </div>
      <span className="text-xs font-medium text-slate-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="p-4">
        {product.imageUrl ? (
          <div className="overflow-hidden rounded-3xl border border-coral-200 bg-cream-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="block h-56 w-full object-cover"
            />
          </div>
        ) : (
          <PlaceholderVisual label={product.name} />
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-6 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{product.type}</Badge>
          {product.bestFor.map((tag) => (
            <Badge key={tag}>Best for {tag}</Badge>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{product.manufacturer}</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{product.name}</p>
          {product.rating !== undefined && (
            <div className="mt-2"><StarRating rating={product.rating} /></div>
          )}
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.blurb}</p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {product.features.map((feature) => (
            <div key={feature} className="rounded-2xl bg-cream-100 border border-coral-200 px-3 py-2 text-center text-xs font-medium text-brand-900">
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Price</p>
            <p className="text-lg font-bold text-slate-900">{product.price}</p>
          </div>
          <Link href={product.productUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
