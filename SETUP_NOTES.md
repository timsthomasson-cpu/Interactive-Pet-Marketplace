# Geo Tracking (City/Region/Country) — Setup Notes

## What's in this batch

- `migrations/002_add_geo_columns.sql` — **run this against your live
  database**, it adds three columns to the existing table:
  ```
  npx wrangler d1 execute interactive-pet-marketplace-clicks --remote --file=./migrations/002_add_geo_columns.sql
  ```
  Existing rows will just show blank/"—" for location (they were logged
  before this change) — that's expected, not an error.
- `schema.sql` — updated too, so a brand-new setup gets the geo columns
  from the start. You don't need to re-run this one; it's for reference /
  fresh installs only.
- `app/api/track-click/route.ts` — now also captures `city`, `region`,
  `country` from Cloudflare's request data (no external IP lookup — this
  comes free with every request Cloudflare routes to you).
- `app/admin/clicks/page.tsx` — adds a "Location" column, plus a **"Hide
  my clicks (Coppell, TX)"** checkbox next to the Filter button. Check it
  and hit Filter to exclude anything logged from Coppell — rows without
  location data (older clicks, or if geo ever fails to resolve) are kept,
  not accidentally hidden.

## Nothing else changes

No new secrets, no new bindings — this reuses the same `CLICKS_DB` D1
binding already in place. Just the migration + redeploy.

## Verified before sending

I tested this end-to-end against a real local Cloudflare Workers runtime
(not just `next dev`): inserted a test click, confirmed `city`/`region`/
`country` were captured and stored correctly, and confirmed the admin
page renders the new column and the "Hide my clicks" filter without
errors. I can't test against your actual production IP/location data from
here, but the mechanism itself (reading from Cloudflare's request
context) is the same in local and production — it's just fed different
values depending on where the real request originates.
