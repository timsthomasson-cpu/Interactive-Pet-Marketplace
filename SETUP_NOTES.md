# Outbound Click Tracking (D1) — Setup Notes

## What's in this batch

New:
- `schema.sql` — D1 table definition for `outbound_clicks`
- `lib/admin-auth.ts` — session/cookie helpers for the admin area
- `proxy.ts` — gates everything under `/admin` behind a password
  (this is Next.js 16's renamed `middleware.ts` — see note below)
- `app/api/track-click/route.ts` — logs each outbound click to D1
- `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`
- `app/admin/login/page.tsx`, `app/admin/clicks/page.tsx`, `app/admin/page.tsx`
  (bare `/admin` just redirects to `/admin/clicks`)
- `components/click-tracking.ts` — client helper, fires alongside the
  existing Meta Pixel tracking

Modified:
- `wrangler.jsonc` — added a `d1_databases` binding (`CLICKS_DB`) with a
  placeholder database ID you need to fill in (see step 1 below)
- `components/view-details-link.tsx` — now also calls `trackOutboundClick`
- `components/top-picks-rotator.tsx` — same; this component has two
  outbound links of its own that don't go through `ViewDetailsLink`, so I
  added the call directly in both spots
- `app/robots.ts` — added `/admin` to disallow, so it's never crawled/indexed

## Setup steps, in order

**1. Create the D1 database and wire up the ID**

```
wrangler d1 create interactive-pet-marketplace-clicks
```

This prints a `database_id`. Paste it into `wrangler.jsonc`, replacing
`REPLACE_WITH_DATABASE_ID`.

**2. Apply the schema**

```
wrangler d1 execute interactive-pet-marketplace-clicks --remote --file=./schema.sql
```

For local dev testing too:
```
wrangler d1 execute interactive-pet-marketplace-clicks --local --file=./schema.sql
```

**3. Set the admin password**

Production (this is a real secret, don't put it in wrangler.jsonc):
```
wrangler secret put ADMIN_PASSWORD
```
It'll prompt you to type the password.

Local dev — create a file named `.dev.vars` in the project root (already
gitignored) with:
```
ADMIN_PASSWORD=whatever-you-want-locally
```

**4. Regenerate Cloudflare types**

```
npm run cf-typegen
```
This regenerates `cloudflare-env.d.ts` (gitignored, local-only) so
TypeScript knows about the `CLICKS_DB` binding.

**5. Build sequence is unchanged**

```
npm run build --webpack
npx opennextjs-cloudflare build
npx wrangler deploy
```

## Using it

- Visit `/admin/clicks` — you'll be redirected to `/admin/login` if not
  signed in. Enter the password from step 3.
- Filter by product slug, affiliate program (`amazon`, `goaffpro-chongker`,
  `goaffpro-enabot`, `other`), and a date range (7/30/90 days).
- "Sign out" clears the session cookie.

## Notes / things I couldn't verify in the sandbox

- **I don't have Cloudflare account access**, so I can't actually create
  the D1 database, run `wrangler secret put`, or deploy. Everything above
  is written correctly against the docs and your existing OpenNext setup,
  but the D1 binding + admin auth flow have not been tested end-to-end
  against a real Cloudflare deployment. Please test `/admin/clicks` and a
  couple of real outbound clicks right after your first deploy.
- **Retention**: rather than a Cron Trigger (which would mean adding a
  scheduled handler to the OpenNext-generated Worker — more fragile to get
  right without being able to test it here), I went with opportunistic
  cleanup: on ~2% of click-log writes, it also deletes rows older than 90
  days. Fine for a low-volume internal log. If you want a real Cron
  Trigger later, that's a separate, larger change — just flag it.
- **Next.js 16 renamed `middleware.ts` to `proxy.ts`.** I built this
  fresh as `proxy.ts` (not the deprecated name) since your project is
  already on Next 16.2.6. If you ever see a warning in your build output
  about a "middleware" file convention, that's unrelated to this — it'd
  mean something else in the app is using the old name.
- Local `next dev` has no Wrangler runtime, so `CLICKS_DB` won't exist
  there — the API route no-ops safely (see the `if (!db)` check) rather
  than throwing. To fully test this locally you'd want
  `wrangler dev`/`opennextjs-cloudflare preview` instead of plain `npm run dev`.
