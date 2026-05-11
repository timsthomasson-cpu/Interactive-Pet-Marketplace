import Link from "next/link";
import { Product } from "./site-data";
import { Badge, PlaceholderVisual } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card flex flex-col overflow-hidden relative">
      {product.flags?.topPick && (
        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-trust-500 px-3 py-1.5 text-xs font-bold text-white shadow-soft">
          ★ Top Pick
        </div>
      )}
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
          {product.type === "AI & Robotic" ? (
            <span className="inline-flex rounded-full bg-trust-100 px-3 py-1 text-xs font-semibold text-trust-700">{product.type}</span>
          ) : (
            <Badge>{product.type}</Badge>
          )}
          {product.bestFor.map((tag) => (
            <Badge key={tag}>Best for {tag}</Badge>
          ))}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{product.manufacturer}</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{product.name}</p>
          {product.rating !== undefined && (
            <div className="mt-2">
              {(() => {
                const tooltipParts: string[] = [];
                if (product.ratingSource) tooltipParts.push(`Rating from ${product.ratingSource}`);
                if (product.ratingLastChecked) tooltipParts.push(`last verified ${product.ratingLastChecked}`);
                const tooltip = tooltipParts.join(", ");
                const ratingText = (
                  <span className="inline-flex items-baseline gap-1 text-sm font-semibold">
                    <span className="text-red-600">★</span>
                    <span className="text-slate-900">{product.rating.toFixed(1)}</span>
                    {product.reviewCount !== undefined && (
                      <span className="text-slate-600 font-normal">({product.reviewCount.toLocaleString()} {product.reviewCount === 1 ? "review" : "reviews"})</span>
                    )}
                  </span>
                );
                return product.ratingUrl ? (
                  <a href={product.ratingUrl} target="_blank" rel="noopener noreferrer" title={tooltip || undefined} className="hover:underline">
                    {ratingText}
                  </a>
                ) : (
                  <span title={tooltip || undefined}>{ratingText}</span>
                );
              })()}
            </div>
          )}
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.blurb}</p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {product.features.map((feature) => (
            <div key={feature} className="rounded-2xl bg-cream-100 border border-coral-200 px-1.5 py-2 text-center text-[10px] leading-tight font-medium text-brand-900 min-w-0">
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between">
          {(() => {
            const priceTooltipParts: string[] = [];
            if (product.priceSource) priceTooltipParts.push(`Price from ${product.priceSource}`);
            if (product.priceLastChecked) priceTooltipParts.push(`last verified ${product.priceLastChecked}`);
            const priceTooltip = priceTooltipParts.join(", ");
            return (
              <div title={priceTooltip || undefined}>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Price</p>
                <p className="text-lg font-bold text-slate-900">{product.price}</p>
              </div>
            );
          })()}
          <Link href={product.productUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
