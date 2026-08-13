// Fires a request to /api/track-click, logging outbound product/affiliate
// clicks into Cloudflare D1 (table: outbound_clicks) as an internal audit
// trail, AND (server-side, see app/api/track-click/route.ts) forwarding a
// matching event to Meta's Conversions API. This runs ALONGSIDE
// trackViewContent() (Meta Pixel, see meta-pixel.ts) and GA4 — it doesn't
// replace either.

const SESSION_STORAGE_KEY = "ipm_click_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    // sessionStorage can throw in some private-browsing modes — degrade
    // gracefully rather than breaking the outbound click.
    return "";
  }
}

// Reads a cookie by name from document.cookie. Used for Meta's own _fbp
// (browser ID, set by the Pixel on every visit) and _fbc (click ID, set
// when the visitor arrived via a Facebook/Instagram ad click) cookies —
// passing these to the Conversions API meaningfully improves Meta's Event
// Match Quality score.
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Call this from the onClick of every outbound "View Details" style link,
// right alongside trackViewContent(). Pass the SAME eventId to both calls
// so Meta can deduplicate the Pixel (browser) and Conversions API (server)
// copies of this event into one.
export function trackOutboundClick(
  productSlug: string,
  destinationUrl: string,
  eventId: string,
  value?: number
): void {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    productSlug,
    destinationUrl,
    sourcePage: window.location.pathname,
    pageUrl: window.location.href,
    referrer: document.referrer || undefined,
    sessionId: getSessionId() || undefined,
    eventId,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    // Forwarded to the server-side Conversions API ViewContent event (see
    // app/api/track-click/route.ts) so it carries the same value/currency
    // as the browser-side Pixel event — Meta's diagnostics flag
    // ViewContent events missing these as a high-priority issue.
    value,
    currency: value !== undefined ? "USD" : undefined,
  });

  // Fire-and-forget — never block or delay the outbound navigation.
  // `keepalive` lets the request complete even as the browser navigates away.
  fetch("/api/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Swallow errors — logging must never break the outbound link.
  });
}
