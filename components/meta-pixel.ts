// Meta Pixel "ViewContent" tracking on outbound product/affiliate links
// (the "View Details" buttons on product cards).

import type { Product } from "./site-data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Accepts the full Product type or any narrower shape that at least has a
// slug (some components, like digest-layout's ArticleProductCard, use a
// trimmed-down local product type rather than the full site-data Product).
export type TrackableProduct = Pick<Product, "slug"> & { productUrl?: string };

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
// reaches Meta reliably and is enough to identify the product, so this
// event is intentionally minimal rather than sending fields that get
// silently dropped anyway.
export function trackViewContent(product: TrackableProduct, eventId?: string): void {
  if (typeof window === "undefined" || !window.fbq) return;

  window.fbq(
    "track",
    "ViewContent",
    {
      content_ids: [product.slug],
      content_type: "product",
    },
    eventId ? { eventID: eventId } : undefined
  );
}
