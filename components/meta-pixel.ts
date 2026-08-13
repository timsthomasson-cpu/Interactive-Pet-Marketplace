// Meta Pixel "ViewContent" tracking on outbound product/affiliate links
// (the "View Details" buttons on product cards).

import type { Product } from "./site-data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Accepts the full Product type or any narrower shape that at least has a
// slug and price (some components, like digest-layout's
// ArticleProductCard, use a trimmed-down local product type rather than
// the full site-data Product).
export type TrackableProduct = Pick<Product, "slug" | "price"> & { productUrl?: string };

// Parses a site-data price string like "$139.00" / "$1,299" into a plain
// number for Meta's `value` field. Mirrors parsePriceForSchema in
// components/json-ld.tsx — same "$X,XXX.XX" site data format. Returns
// undefined for anything that doesn't look like a valid, positive price
// (Meta rejects missing/zero/negative values), so callers can omit the
// field entirely rather than send "" or 0.
export function parseProductPrice(price: string | undefined): number | undefined {
  if (!price) return undefined;
  const match = price.match(/\$\s*([\d,]+(?:\.\d{1,2})?)/);
  if (!match) return undefined;
  const n = parseFloat(match[1].replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

// Fires Meta's standard ViewContent event when a visitor clicks through to
// an affiliate/manufacturer product page. Call this from the onClick of
// every outbound "View Details" style button.
//
// eventId, if provided, is passed as fbq's eventID so this browser-side
// Pixel event can be deduplicated against the matching server-side
// Conversions API event fired from /api/track-click (see
// components/click-tracking.ts) — both should be given the same id.
//
// Note: content_name / content_category / a custom destination_url field
// were tried and confirmed (via local debug logging + a parallel custom
// event test) to reach fbq() correctly but get stripped by Meta before
// they show up in Events Manager — most likely a Catalog/Product-matching
// plugin on Meta's side intercepting standard commerce events. content_ids
// reaches Meta reliably and is enough to identify the product.
//
// value/currency ARE sent (unlike the fields above) because Events
// Manager's diagnostics flag ViewContent events missing them as a
// high-priority issue affecting ROAS calculation. Omitted (rather than
// sent as "" / 0) when the product's price string doesn't parse, since
// Meta rejects those as formatting errors too.
export function trackViewContent(product: TrackableProduct, eventId?: string): void {
  if (typeof window === "undefined" || !window.fbq) return;

  const value = parseProductPrice(product.price);

  window.fbq(
    "track",
    "ViewContent",
    {
      content_ids: [product.slug],
      content_type: "product",
      ...(value !== undefined ? { value, currency: "USD" } : {}),
    },
    eventId ? { eventID: eventId } : undefined
  );
}
