import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// DEV-ONLY debug endpoint. Captures the exact payload our code attempts to
// send to Meta's Pixel (window.fbq) so it can be diffed against what
// actually shows up in Meta Events Manager / Test Events. This is purely
// for debugging the ViewContent tracking issue — not part of the site's
// real analytics pipeline.
//
// Writes to Data/view-content-events.jsonl using Node's filesystem, which
// only exists in local dev (`npm run dev`). Cloudflare Workers (production)
// has no writable filesystem, so this route intentionally no-ops there
// instead of throwing — see the try/catch below.

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const entry = {
      capturedAt: new Date().toISOString(),
      ...body,
    };

    const dataDir = path.join(process.cwd(), "Data");
    const filePath = path.join(dataDir, "view-content-events.jsonl");

    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(filePath, JSON.stringify(entry) + "\n", "utf-8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    // In production (Cloudflare Workers) fs is unavailable — fail silently
    // so this debug helper never breaks the real site or real tracking.
    return NextResponse.json({ ok: false, note: "debug logging unavailable in this environment" });
  }
}
