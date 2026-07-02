import Link from "next/link";
import { Product } from "./site-data";
import { PlaceholderVisual } from "./ui";
import { PRODUCT_LINK_REL, RATING_LINK_REL } from "./link-rel";
import { featureIcon, StarRating } from "./best-for-icons";

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
    <div className={`rounded-3xl border-2 border-purple-200 bg-white shadow-soft flex flex-col overflow-hidden relative${className ? ` ${className}` : ""}`}>
      {/* Note pill */}
      {note && (
        <div className={`absolute z-10 inline-flex items-center rounded-full bg-trust-500 font-bold text-white shadow-soft
          ${featured
            ? "top-3 right-3 sm:top-4 sm:right-4 px-3 py-1 text-xs sm:text-sm"
            : "top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs"
          }`}>
          {note}
        </div>
      )}

      {/* Image */}
      <div className={`relative ${featured ? "p-1.5 sm:p-2.5" : "p-1 sm:p-2"}`}>
        {scorePercent !== undefined && (
          <div className="absolute z-10 left-4 bottom-1 sm:left-6 sm:bottom-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-white bg-white shadow-soft">
            <span className={`text-xs sm:text-sm font-bold ${accentColor}`}>{scorePercent}</span>
          </div>
        )}
        {product.imageUrl ? (
          <div
            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-200 bg-purple-50"
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
      <div className={`flex flex-1 flex-col ${featured ? "space-y-2 p-2.5 pt-1 sm:p-4 sm:pt-1.5" : "space-y-1.5 sm:space-y-2 p-1.5 pt-0.5 sm:p-3 sm:pt-0.5"}`}>
        {/* Pills (type / bestFor / camera) intentionally omitted on Best For cards */}
        <div>
          <p className={`font-semibold uppercase tracking-wide text-brand-700 ${featured ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}>
            {product.manufacturer}
          </p>
          <p className={`mt-0.5 font-semibold text-slate-900 leading-tight ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-xl"}`}>
            {product.name}
          </p>
          {hasRating && (
            <div className={featured ? "mt-1 sm:mt-1.5" : "mt-1 sm:mt-1"}>
              {(() => {
                const tooltipParts: string[] = [];
                if (product.ratingSource) tooltipParts.push(`Rating from ${product.ratingSource}`);
                if (product.ratingLastChecked) tooltipParts.push(`last verified ${product.ratingLastChecked}`);
                const tooltip = tooltipParts.join(", ");
                const ratingText = (
                  <span className={`inline-flex flex-wrap items-baseline gap-1 ${featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
                    <StarRating rating={product.rating!} className={featured ? "text-2xl" : "text-xl"} />
                    <span className="font-semibold text-slate-900">{product.rating!.toFixed(1)}</span>
                    <span className="font-normal text-slate-500">
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
          <p className={`text-slate-700 ${featured ? "mt-1.5 text-sm sm:text-base leading-6 sm:leading-7" : "mt-1 sm:mt-1.5 text-xs sm:text-sm leading-5 sm:leading-6"}`}>
            {product.blurb}
          </p>
        </div>

        {/* Feature chips */}
        <div className={`grid grid-cols-1 gap-1 sm:grid-cols-3 ${featured ? "sm:gap-1.5" : "gap-1"}`}>
          {product.features.map((feature) => (
            <div
              key={feature}
              className={`flex flex-row items-center gap-1 rounded-xl sm:rounded-2xl bg-white border border-purple-200 font-medium text-brand-900 min-w-0
                ${featured ? "px-3 py-1.5 sm:py-1.5 text-xs sm:text-sm" : "px-2 py-1 text-[10px]"}`}
            >
              {featureIcon(feature, `${featured ? "h-8 w-8 sm:h-9 sm:w-9" : "h-6 w-6"} shrink-0 text-purple-600`)}
              <span className="leading-tight">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-1">
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
              ${featured ? "px-10 py-3 sm:px-12 sm:py-4 text-base sm:text-xl" : "px-3 py-1 sm:px-5 sm:py-1.5 text-xs sm:text-sm"}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
