import { Product } from "./site-data";

// Update once you have a live domain. Used as the absolute-URL base for all
// schema URL fields. Search engines de-duplicate by URL, so this needs to
// match metadataBase in app/layout.tsx (and ultimately match your live
// production domain).
export const SITE_URL = "https://interactivepetmarketplace.com";
export const SITE_NAME = "Interactive Pet Marketplace";

// Whether to include rating/review data in Product schema.
//
// Google's Product schema guidance has tightened in recent years: aggregate
// ratings should reflect direct customer feedback to your site, not data
// from third parties (Amazon, manufacturers). Including third-party-sourced
// ratings is a low but real risk — Google may downrank rich results or, in
// strict cases, flag a manual action.
//
// We include the data anyway with an honest "review source" attribution
// (publisher field), which signals to AI assistants (Perplexity, ChatGPT
// search, Claude) where the rating came from. If Google ever sends a manual
// action over this, flip this flag to false and run generate:products again
// — every Product schema across the site will stop emitting ratings.
const INCLUDE_RATINGS = true;

// ────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────

function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!path.startsWith("/")) path = "/" + path;
  return SITE_URL + path;
}

// Parse "$789.00" / "$159" / "$1,299.00" → "789.00" (Schema.org expects
// a numeric string without currency symbols).
function parsePriceForSchema(price: string): { value: string; currency: string } | null {
  if (!price) return null;
  const match = price.match(/\$\s*([\d,]+(?:\.\d{1,2})?)/);
  if (!match) return null;
  return {
    value: match[1].replace(/,/g, ""),
    currency: "USD"
  };
}

// ────────────────────────────────────────────────────────────────────
// Product schema
// ────────────────────────────────────────────────────────────────────

export function productSchema(product: Product) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.blurb,
    "url": product.productUrl || undefined,
    "sku": product.slug,
    "brand": {
      "@type": "Brand",
      "name": product.manufacturer
    }
  };

  if (product.imageUrl) {
    schema.image = absoluteUrl(product.imageUrl);
  }

  // Offer (price + availability). Schema.org requires "Offer" if you want
  // price-related rich results.
  const parsed = parsePriceForSchema(product.price);
  if (parsed && product.productUrl) {
    schema.offers = {
      "@type": "Offer",
      "price": parsed.value,
      "priceCurrency": parsed.currency,
      "availability": "https://schema.org/InStock",
      "url": product.productUrl,
      // Surface the source so AI assistants know where the price came from.
      ...(product.priceSource && {
        "seller": { "@type": "Organization", "name": product.priceSource }
      }),
      ...(product.priceLastChecked && {
        "priceValidUntil": product.priceLastChecked
      })
    };
  }

  // Aggregate rating. See INCLUDE_RATINGS comment above for caveats.
  if (
    INCLUDE_RATINGS &&
    product.rating !== undefined &&
    product.rating > 0 &&
    product.reviewCount !== undefined &&
    product.reviewCount > 0
  ) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toFixed(1),
      "reviewCount": product.reviewCount,
      "bestRating": "5",
      "worstRating": "1",
      // Honest attribution to the rating source. Per Schema.org, publisher
      // is the entity that published the rating data.
      ...(product.ratingSource && {
        "publisher": { "@type": "Organization", "name": product.ratingSource }
      })
    };
  }

  return schema;
}

// ────────────────────────────────────────────────────────────────────
// FAQPage schema
// ────────────────────────────────────────────────────────────────────

export type FaqItem = { question: string; answer: string };

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

// ────────────────────────────────────────────────────────────────────
// BreadcrumbList schema
// ────────────────────────────────────────────────────────────────────

export type BreadcrumbCrumb = { name: string; path: string };

export function breadcrumbListSchema(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": absoluteUrl(c.path)
    }))
  };
}

// ────────────────────────────────────────────────────────────────────
// Organization schema (home page only)
// ────────────────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": absoluteUrl("/logo-mark.svg"),
    // If/when you add social media accounts, list their URLs here.
    // "sameAs": [
    //   "https://twitter.com/your-handle",
    //   "https://www.facebook.com/your-page"
    // ]
    "description":
      "Honest comparisons of interactive pets, plushy companions, and AI & robotic pets for seniors, families, and gift buyers."
  };
}

// ────────────────────────────────────────────────────────────────────
// WebSite schema (home page) — gives Google an authoritative site name
// and enables sitelink search box.
// ────────────────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL
  };
}
