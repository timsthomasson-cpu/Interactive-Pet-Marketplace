import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Logs every outbound affiliate/product click to D1 (table: outbound_clicks)
// as an internal audit trail, AND forwards a matching event to Meta's
// Conversions API (server-side) — separate from GA4 / the client-side Meta
// Pixel (see components/meta-pixel.ts and components/click-tracking.ts).
// This endpoint only ever writes/sends click metadata, never product data
// — see Documentation/Product_Data_Rules.md and README.md for site data
// rules.
//
// Called fire-and-forget from the client, so a logging failure here must
// never surface as an error to the visitor or block their outbound
// navigation — every branch below resolves quickly and swallows errors.

// Same Pixel ID as components/FacebookPixel.tsx — this is a public
// identifier (it's visible in every page's client-side script), not a
// secret. The access token that authorizes sending events IS a secret —
// see META_CAPI_ACCESS_TOKEN below, set via `wrangler secret put`.
const META_PIXEL_ID = "27196529296663414";
const META_GRAPH_API_VERSION = "v21.0";

function detectAffiliateProgram(url: string): string {
  try {
    const host = new URL(url).hostname;
    if (host.includes("amzn.to") || host.includes("amazon.")) return "amazon";
    if (host.includes("chongker.com")) return "goaffpro-chongker";
    if (host.includes("enabot.com")) return "goaffpro-enabot";
    return "other";
  } catch {
    return "unknown";
  }
}

// Sends the server-side half of the ViewContent event to Meta's
// Conversions API, matched to the browser-side Pixel event via eventId
// (see components/meta-pixel.ts / click-tracking.ts — both are given the
// same id so Meta deduplicates them into one event instead of counting
// twice).
//
// Never throws — a Meta API failure must never break click logging or
// surface to the visitor. Errors are logged server-side only.
async function sendMetaCapiEvent(params: {
  eventId: string;
  productSlug: string;
  pageUrl: string;
  clientIp: string | null;
  userAgent: string | null;
  fbp: string | null;
  fbc: string | null;
}): Promise<void> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    // Not configured yet — no-op rather than throwing.
    return;
  }

  const userData: Record<string, string> = {};
  if (params.clientIp) userData.client_ip_address = params.clientIp;
  if (params.userAgent) userData.client_user_agent = params.userAgent;
  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;

  const eventPayload: Record<string, unknown> = {
    event_name: "ViewContent",
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.eventId,
    event_source_url: params.pageUrl,
    action_source: "website",
    user_data: userData,
    custom_data: {
      content_ids: [params.productSlug],
      content_type: "product",
    },
  };

  const body: Record<string, unknown> = {
    data: [eventPayload],
  };

  // TEMPORARY: routes events into Meta's Test Events tool instead of
  // production reporting. Remove the META_CAPI_TEST_EVENT_CODE var in
  // wrangler.jsonc (and redeploy) once test events are confirmed showing
  // up correctly in Events Manager.
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Meta CAPI error", res.status, text);
    }
  } catch (err) {
    console.error("Meta CAPI request failed", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      productSlug?: unknown;
      destinationUrl?: unknown;
      sourcePage?: unknown;
      pageUrl?: unknown;
      referrer?: unknown;
      sessionId?: unknown;
      eventId?: unknown;
      fbp?: unknown;
      fbc?: unknown;
    };
    const { productSlug, destinationUrl, sourcePage, pageUrl, referrer, sessionId, eventId, fbp, fbc } =
      body;

    if (typeof productSlug !== "string" || typeof destinationUrl !== "string") {
      return NextResponse.json(
        { ok: false, error: "productSlug and destinationUrl are required" },
        { status: 400 }
      );
    }

    const { env, cf } = getCloudflareContext();
    const db = env.CLICKS_DB;

    if (!db) {
      // Local `next dev` (no wrangler runtime) or the D1 binding hasn't
      // been configured yet — no-op rather than throwing so this never
      // breaks the outbound link itself.
      return NextResponse.json({ ok: false, note: "D1 binding unavailable in this environment" });
    }

    // Cloudflare attaches this geo data to every request for free — no
    // external IP lookup needed. Lets Tim filter out his own testing
    // clicks (e.g. everything from Coppell, TX) on the admin page.
    const city = typeof cf?.city === "string" ? cf.city : null;
    const region = typeof cf?.region === "string" ? cf.region : null;
    const country = typeof cf?.country === "string" ? cf.country : null;

    await db
      .prepare(
        `INSERT INTO outbound_clicks
           (timestamp, product_slug, affiliate_program, destination_url, source_page, referrer, session_id, city, region, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        new Date().toISOString(),
        productSlug,
        detectAffiliateProgram(destinationUrl),
        destinationUrl,
        typeof sourcePage === "string" ? sourcePage : null,
        typeof referrer === "string" ? referrer : null,
        typeof sessionId === "string" ? sessionId : null,
        city,
        region,
        country
      )
      .run();

    // Rolling 90-day retention, trimmed opportunistically on a small
    // fraction of writes rather than via a separate Cron Trigger — avoids
    // adding a scheduled handler to the OpenNext/Cloudflare Worker build,
    // which is more fragile to wire up correctly. Fine for a low-volume
    // internal log; can move to a real Cron Trigger later if needed.
    if (Math.random() < 0.02) {
      const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
      await db.prepare(`DELETE FROM outbound_clicks WHERE timestamp < ?`).bind(cutoff).run();
    }

    // Fire the Conversions API event (server-side ViewContent, matched to
    // the client-side Pixel event via eventId). Awaited so errors are
    // caught here rather than becoming an unhandled rejection in the
    // Worker, but its own failures never affect the response below — the
    // D1 write above already succeeded regardless of what Meta does.
    if (typeof eventId === "string") {
      await sendMetaCapiEvent({
        eventId,
        productSlug,
        pageUrl: typeof pageUrl === "string" ? pageUrl : destinationUrl,
        clientIp: request.headers.get("cf-connecting-ip"),
        userAgent: request.headers.get("user-agent"),
        fbp: typeof fbp === "string" ? fbp : null,
        fbc: typeof fbc === "string" ? fbc : null,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-click error", err);
    return NextResponse.json({ ok: false, error: "internal error" }, { status: 500 });
  }
}
