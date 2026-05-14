import Link from "next/link";
import { Product } from "./site-data";
import { Badge, PlaceholderVisual } from "./ui";
import { PRODUCT_LINK_REL, RATING_LINK_REL } from "./link-rel";

export function ProductCard({ product }: { product: Product }) {
  // Only show a rating if we actually have a meaningful one. A product with
  // rating === 0 or reviewCount === 0 means we haven't verified one yet —
  // showing "★ 0.0 (0 reviews)" would actively hurt the listing.
  const hasRating =
    product.rating !== undefined &&
    product.rating > 0 &&
    product.reviewCount !== undefined &&
    product.reviewCount > 0;

  return (
    <div className="card flex flex-col overflow-hidden relative">
      {product.flags?.topPick && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 inline-flex items-center gap-1 rounded-full bg-trust-500 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white shadow-soft">
          ★ Top Pick
        </div>
      )}
      <div className="p-2 sm:p-4">
        {product.imageUrl ? (
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-coral-200 bg-cream-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="block h-44 sm:h-56 w-full object-contain sm:object-cover"
            />
          </div>
        ) : (
          <PlaceholderVisual label={product.name} />
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-3 sm:space-y-4 p-3 pt-1 sm:p-6 sm:pt-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {product.type === "AI & Robotic" ? (
            <span className="inline-flex rounded-full bg-trust-100 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-trust-700">{product.type}</span>
          ) : (
            <Badge>{product.type}</Badge>
          )}
          {product.bestFor.map((tag) => (
            <Badge key={tag}>Best for {tag}</Badge>
          ))}
          {product.flags?.camera && (
            <Link
              href="/questions#privacy"
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-slate-700 hover:border-trust-400 hover:text-trust-700"
              title="This product includes a camera. View our privacy & security checklist."
              aria-label="Has camera — view privacy & security checklist"
            >
              <span aria-hidden>📷</span>
              <span>Camera</span>
            </Link>
          )}
        </div>
        <div>
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-brand-700">{product.manufacturer}</p>
          <p className="mt-1 text-base sm:text-xl font-semibold text-slate-900 leading-tight">{product.name}</p>
          {hasRating && (
            <div className="mt-1.5 sm:mt-2">
              {(() => {
                const tooltipParts: string[] = [];
                if (product.ratingSource) tooltipParts.push(`Rating from ${product.ratingSource}`);
                if (product.ratingLastChecked) tooltipParts.push(`last verified ${product.ratingLastChecked}`);
                const tooltip = tooltipParts.join(", ");
                const ratingText = (
                  <span className="inline-flex items-baseline gap-1 text-xs sm:text-sm font-semibold">
                    <span className="text-red-600">★</span>
                    <span className="text-slate-900">{product.rating!.toFixed(1)}</span>
                    <span className="text-slate-600 font-normal">({product.reviewCount!.toLocaleString()} {product.reviewCount === 1 ? "review" : "reviews"})</span>
                  </span>
                );
                return product.ratingUrl ? (
                  <a href={product.ratingUrl} target="_blank" rel={RATING_LINK_REL} title={tooltip || undefined} className="hover:underline">
                    {ratingText}
                  </a>
                ) : (
                  <span title={tooltip || undefined}>{ratingText}</span>
                );
              })()}
            </div>
          )}
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">{product.blurb}</p>
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:gap-2 sm:grid-cols-3">
          {product.features.map((feature) => (
            <div key={feature} className="rounded-xl sm:rounded-2xl bg-cream-100 border border-coral-200 px-1.5 py-1.5 sm:py-2 text-center text-[10px] leading-tight font-medium text-brand-900 min-w-0">
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          {(() => {
            const priceTooltipParts: string[] = [];
            if (product.priceSource) priceTooltipParts.push(`Price from ${product.priceSource}`);
            if (product.priceLastChecked) priceTooltipParts.push(`last verified ${product.priceLastChecked}`);
            const priceTooltip = priceTooltipParts.join(", ");
            return (
              <div title={priceTooltip || undefined}>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-brand-700">Price</p>
                <p className="text-sm sm:text-lg font-bold text-slate-900">{product.price}</p>
              </div>
            );
          })()}
          <Link href={product.productUrl} target="_blank" rel={PRODUCT_LINK_REL} className="inline-flex items-center justify-center rounded-full bg-trust-500 px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
