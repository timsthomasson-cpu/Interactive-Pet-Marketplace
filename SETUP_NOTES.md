# Meta Conversions API — Setup Notes

## What's in this batch

- `wrangler.jsonc` — added a `vars` block with `META_CAPI_TEST_EVENT_CODE`
  set to `TEST52849`. **Delete this once you've confirmed test events are
  showing up in Events Manager** (Events Manager → your Pixel → Test
  Events tab) — see step 2 below.
- `app/api/track-click/route.ts` — now also sends a server-side
  `ViewContent` event to Meta's Conversions API, using the
  `META_CAPI_ACCESS_TOKEN` secret you already set. Uses your IP/user-agent
  (from Cloudflare's request data) plus the `_fbp`/`_fbc` cookies for
  match quality. Never blocks or breaks click logging if Meta's API is
  down or the token is wrong — errors are caught and logged, not thrown.
- `components/meta-pixel.ts` — `trackViewContent()` now accepts an
  optional `eventId`, passed to `fbq()` as `eventID`.
- `components/click-tracking.ts` — `trackOutboundClick()` now takes an
  `eventId` param, reads the `_fbp`/`_fbc` cookies, and sends the full
  page URL along with the rest of the click data.
- `components/view-details-link.tsx`, `components/top-picks-rotator.tsx`
  — both now generate one `crypto.randomUUID()` per click and pass the
  same id to both `trackViewContent()` (Pixel) and `trackOutboundClick()`
  (D1 + CAPI), so Meta can deduplicate the browser and server copies of
  the same event into one.

## Nothing new to set up

You already did the one-time setup last message:
- `META_CAPI_ACCESS_TOKEN` — set via `wrangler secret put`
- Test event code `TEST52849` — now wired in via `wrangler.jsonc`

Just extract this zip and redeploy as usual.

## After deploying: verify, then go live

1. Click through a "View Details" button on the live site.
2. In Meta Events Manager → your Pixel → **Test Events** tab, you should
   see a `ViewContent` event show up within a few seconds, with the
   `content_ids` matching the product slug you clicked. It should show
   **"1 event from 2 sources"** (Pixel + Conversions API) if dedup is
   working — if you see "1 event from 1 source" twice instead, let me
   know and we'll dig into it.
3. Once confirmed, remove the `"vars"` block (or just the
   `META_CAPI_TEST_EVENT_CODE` line) from `wrangler.jsonc` and redeploy —
   that's what switches events from test-only to live reporting.

## What I could and couldn't verify from my side

I ran this against a real local Cloudflare Workers runtime (not just
`next dev`) with a placeholder token, and confirmed:
- The D1 click log still writes correctly regardless of what happens with
  Meta's API
- The Conversions API call is built and sent with the right shape
  (event_id, event_source_url, user_data with IP/UA/fbp/fbc, custom_data
  with content_ids)
- A failed/blocked call to Meta is caught and logged, never breaks the
  response

I could **not** test an actual successful call to Meta's API end-to-end —
my sandbox doesn't have network access to `graph.facebook.com`, and I
never had your real access token (you set that directly via `wrangler
secret put`, which is exactly right). So step 2 above (checking Test
Events in Meta's dashboard) is the real end-to-end confirmation — please
let me know what you see there.
