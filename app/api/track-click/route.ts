import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Logs every outbound affiliate/product click to D1 (table: outbound_clicks)
// as an internal audit trail — separate from GA4 / Meta Pixel (see
// components/meta-pixel.ts and components/click-tracking.ts). This
// endpoint only ever writes click metadata, never product data — see
// Documentation/Product_Data_Rules.md and README.md for site data rules.
//
// Called fire-and-forget from the client, so a logging failure here must
// never surface as an error to the visitor or block their outbound
// navigation — every branch below resolves quickly and swallows errors.

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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      productSlug?: unknown;
      destinationUrl?: unknown;
      sourcePage?: unknown;
      referrer?: unknown;
      sessionId?: unknown;
    };
    const { productSlug, destinationUrl, sourcePage, referrer, sessionId } = body;

    if (typeof productSlug !== "string" || typeof destinationUrl !== "string") {
      return NextResponse.json(
        { ok: false, error: "productSlug and destinationUrl are required" },
        { status: 400 }
      );
    }

    const { env } = getCloudflareContext();
    const db = env.CLICKS_DB;

    if (!db) {
      // Local `next dev` (no wrangler runtime) or the D1 binding hasn't
      // been configured yet — no-op rather than throwing so this never
      // breaks the outbound link itself.
      return NextResponse.json({ ok: false, note: "D1 binding unavailable in this environment" });
    }

    await db
      .prepare(
        `INSERT INTO outbound_clicks
           (timestamp, product_slug, affiliate_program, destination_url, source_page, referrer, session_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        new Date().toISOString(),
        productSlug,
        detectAffiliateProgram(destinationUrl),
        destinationUrl,
        typeof sourcePage === "string" ? sourcePage : null,
        typeof referrer === "string" ? referrer : null,
        typeof sessionId === "string" ? sessionId : null
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-click error", err);
    return NextResponse.json({ ok: false, error: "internal error" }, { status: 500 });
  }
}
