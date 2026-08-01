// Fires a request to /api/track-click, logging outbound product/affiliate
// clicks into Cloudflare D1 (table: outbound_clicks) as an internal audit
// trail. This runs ALONGSIDE trackViewContent() (Meta Pixel, see
// meta-pixel.ts) and GA4 — it doesn't replace either.

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

// Call this from the onClick of every outbound "View Details" style link,
// right alongside trackViewContent().
export function trackOutboundClick(productSlug: string, destinationUrl: string): void {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    productSlug,
    destinationUrl,
    sourcePage: window.location.pathname,
    referrer: document.referrer || undefined,
    sessionId: getSessionId() || undefined,
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
