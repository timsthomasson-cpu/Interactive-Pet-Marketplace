import Link from "next/link";
import { Product } from "./site-data";
import { PlaceholderVisual } from "./ui";
import { PRODUCT_LINK_REL, RATING_LINK_REL } from "./link-rel";
import { featureIcon } from "./best-for-icons";

// Variant of ProductCard used on Best For ranking pages.
// Differences from the standard card:
//   1. Type / Best For / Camera pills are removed.
//   2. The "Top Pick" pill is replaced by a custom note (e.g. "★ Top Pick", "Best Value").
//   3. "Customer Ratings:" label is prepended to the star rating line.
//   4. Optional `featured` prop renders a square 1:1 image (matching the home page
//      TopPicksRotator) with proportionally larger padding and text throughout.
export function BestForCard({
  product,
  note,
  className,
  featured,
  scorePercent,
  accentColor = "text-trust-600",
}: {
  product: Product;
  note?: string;
  className?: string;
  featured?: boolean;
  scorePercent?: number; // real weighted composite as % — shown as a small ring badge
  accentColor?: string;
}) {
  const hasRating =
    product.rating !== undefined &&
    product.rating > 0 &&
    product.reviewCount !== undefined &&
    product.reviewCount > 0;

  return (
    <div className={`card flex flex-col overflow-hidden relative${className ? ` ${className}` : ""}`}>
      {/* Note pill */}
      {note && (
        <div className={`absolute z-10 inline-flex items-center rounded-full bg-trust-500 font-bold text-white shadow-soft
          ${featured
            ? "top-3 right-3 sm:top-4 sm:right-4 px-3 py-1.5 text-xs sm:text-sm"
            : "top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs"
          }`}>
          {note}
        </div>
      )}

      {/* Image */}
      <div className={`relative ${featured ? "p-3 sm:p-5" : "p-2 sm:p-4"}`}>
        {scorePercent !== undefined && (
          <div className="absolute z-10 left-4 bottom-1 sm:left-6 sm:bottom-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-white bg-white shadow-soft">
            <span className={`text-xs sm:text-sm font-bold ${accentColor}`}>{scorePercent}</span>
          </div>
        )}
        {product.imageUrl ? (
          <div
            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-coral-200 bg-cream-100"
            style={featured ? { aspectRatio: "1 / 1" } : undefined}
          >
            {/* TODO: replace with licensed manufacturer image before publishing */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className={featured
                ? "block h-full w-full object-cover"
                : "block h-44 sm:h-56 w-full object-contain"}
            />
          </div>
        ) : (
          <PlaceholderVisual label={product.name} />
        )}
      </div>

      {/* Text body */}
      <div className={`flex flex-1 flex-col ${featured ? "space-y-4 p-5 pt-2 sm:p-8 sm:pt-3" : "space-y-3 sm:space-y-4 p-3 pt-1 sm:p-6 sm:pt-1"}`}>
        {/* Pills (type / bestFor / camera) intentionally omitted on Best For cards */}
        <div>
          <p className={`font-semibold uppercase tracking-wide text-brand-700 ${featured ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}>
            {product.manufacturer}
          </p>
          <p className={`mt-1 font-semibold text-slate-900 leading-tight ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-xl"}`}>
            {product.name}
          </p>
          {hasRating && (
            <div className={featured ? "mt-2 sm:mt-3" : "mt-1.5 sm:mt-2"}>
              {(() => {
                const tooltipParts: string[] = [];
                if (product.ratingSource) tooltipParts.push(`Rating from ${product.ratingSource}`);
                if (product.ratingLastChecked) tooltipParts.push(`last verified ${product.ratingLastChecked}`);
                const tooltip = tooltipParts.join(", ");
                const ratingText = (
                  <span className={`inline-flex flex-wrap items-baseline gap-1 ${featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
                    <span className="font-normal text-slate-600">Customer Ratings:</span>
                    <span className="font-semibold text-red-600">★</span>
                    <span className="font-semibold text-slate-900">{product.rating!.toFixed(1)}</span>
                    <span className="font-normal text-slate-600">
                      ({product.reviewCount!.toLocaleString()}{" "}
                      {product.reviewCount === 1 ? "review" : "reviews"})
                    </span>
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
          <p className={`text-slate-600 ${featured ? "mt-3 text-sm sm:text-base leading-6 sm:leading-7" : "mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6"}`}>
            {product.blurb}
          </p>
        </div>

        {/* Feature chips */}
        <div className={`grid grid-cols-1 gap-2 sm:grid-cols-3 ${featured ? "sm:gap-3" : "gap-1.5"}`}>
          {product.features.map((feature) => (
            <div
              key={feature}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl sm:rounded-2xl bg-cream-100 border border-coral-200 text-center font-medium text-brand-900 min-w-0
                ${featured ? "px-2 py-2.5 sm:py-3 text-xs sm:text-sm leading-tight" : "px-1.5 py-2 sm:py-2.5 text-[10px] leading-tight"}`}
            >
              {featureIcon(feature, `${featured ? "h-5 w-5 sm:h-6 sm:w-6" : "h-4 w-4"} text-brand-700`)}
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2">
          {(() => {
            const parts: string[] = [];
            if (product.priceSource) parts.push(`Price from ${product.priceSource}`);
            if (product.priceLastChecked) parts.push(`last verified ${product.priceLastChecked}`);
            const tooltip = parts.join(", ");
            return (
              <div title={tooltip || undefined}>
                <p className={`font-semibold uppercase tracking-wide text-brand-700 ${featured ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}>
                  Price
                </p>
                <p className={`font-bold text-slate-900 ${featured ? "text-lg sm:text-2xl" : "text-sm sm:text-lg"}`}>
                  {product.price}
                </p>
              </div>
            );
          })()}
          <Link
            href={product.productUrl}
            target="_blank"
            rel={PRODUCT_LINK_REL}
            className={`inline-flex items-center justify-center rounded-full bg-trust-500 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600
              ${featured ? "px-5 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base" : "px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm"}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
