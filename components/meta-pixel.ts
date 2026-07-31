// Single source of truth for Meta Pixel "ViewContent" tracking on outbound
// product/affiliate links (the "View Details" / "Learn more at Amazon" /
// etc. buttons on product cards).
//
// Design goal: the button LABEL can change freely (Amazon, Chongker, Enabot,
// or any future affiliate) without ever touching pixel code. The affiliate
// name sent to Meta is derived automatically from the product's outbound
// URL domain, not from the button text.
//
// To add a new affiliate: add its domain -> display name below. If you
// forget, trackViewContent() still fires with a reasonable auto-generated
// name (the domain, title-cased) — it never silently fails to track.

import type { Product } from "./site-data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Known affiliate domains -> the name Meta should report them as.
// amzn.to is Amazon's link shortener; add full amazon.com too in case
// full links are ever used instead of shortened ones.
const AFFILIATE_DOMAIN_NAMES: Record<string, string> = {
  "amzn.to": "Amazon",
  "amazon.com": "Amazon",
  "enabot.com": "Enabot",
  "chongker.com": "Chongker",
};

/**
 * Resolve a display name for the affiliate/site a product URL points to.
 * Falls back to a title-cased version of the domain's root name if it
 * isn't in the known-domains map above, so new affiliates are never
 * silently untracked.
 */
export function getAffiliateName(productUrl: string): string {
  if (!productUrl) return "Unknown";

  try {
    const hostname = new URL(productUrl).hostname.replace(/^www\./, "");
    if (AFFILIATE_DOMAIN_NAMES[hostname]) {
      return AFFILIATE_DOMAIN_NAMES[hostname];
    }
    // Fallback: take the root label of the domain (e.g. "example" from
    // "example.com" or "shop.example.co.uk") and title-case it.
    const parts = hostname.split(".");
    const root = parts.length > 2 ? parts[parts.length - 2] : parts[0];
    return root.charAt(0).toUpperCase() + root.slice(1);
  } catch {
    return "Unknown";
  }
}

/**
 * Fire Meta's standard ViewContent event when a visitor clicks through to
 * an affiliate/manufacturer product page. Call this from the onClick of
 * every outbound "View Details" style button.
 */
export function trackViewContent(product: Product): void {
  if (typeof window === "undefined" || !window.fbq) return;

  window.fbq("track", "ViewContent", {
    content_name: product.name,
    content_category: getAffiliateName(product.productUrl),
    content_ids: [product.slug],
    content_type: "product",
    // Not a Meta standard parameter, but passing it through makes the
    // exact outbound destination visible in Events Manager / Test Events
    // for each event, without having to cross-reference content_ids.
    destination_url: product.productUrl,
  });
}
