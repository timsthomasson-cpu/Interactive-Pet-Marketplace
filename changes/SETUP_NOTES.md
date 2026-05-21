# GA4 Setup — Detailed Walkthrough

This zip contains everything you need to add Google Analytics 4 to
Interactive Pet Marketplace with automatic outbound click tracking
for your affiliate links.

## Files in this zip

| File in zip | Where it goes | What it does |
|---|---|---|
| `components/GoogleAnalytics.tsx` | `components/` (new file) | The GA4 loader |
| `app/layout.tsx` | `app/layout.tsx` (REPLACE existing) | Adds GA4 to every page |
| `.env.local.example` | project root (new file) | Template for your env var |
| `.gitignore` | project root (REPLACE existing) | Adds `.env*.local` to ignore list |

---

## Step 1 — Extract the zip

In PowerShell:

```powershell
cd "C:\Users\Tim Thomasson\Downloads"
Expand-Archive -Path .\changes.zip -DestinationPath .\changes-extracted -Force
```

You should now have a folder `Downloads\changes-extracted\changes\` with
the four files listed above.

---

## Step 2 — Copy files into the project

The easiest way: open File Explorer, drag each file from the extracted
folder to its destination in `C:\Users\Tim Thomasson\Interactive-Pet-Marketplace\`.

Or PowerShell (one command does everything):

```powershell
$src = "C:\Users\Tim Thomasson\Downloads\changes-extracted\changes"
$dst = "C:\Users\Tim Thomasson\Interactive-Pet-Marketplace"

Copy-Item "$src\components\GoogleAnalytics.tsx" "$dst\components\" -Force
Copy-Item "$src\app\layout.tsx" "$dst\app\" -Force
Copy-Item "$src\.env.local.example" "$dst\" -Force
Copy-Item "$src\.gitignore" "$dst\" -Force
```

**Verify** in VS Code (or File Explorer) that:
- `components\GoogleAnalytics.tsx` exists
- `app\layout.tsx` now has `import GoogleAnalytics` near the top and
  `<GoogleAnalytics />` inside the `<body>` tag
- Project root has `.env.local.example` and updated `.gitignore`

---

## Step 3 — Create the GA4 property (in browser, not code)

1. Go to https://analytics.google.com
2. Bottom left, click the gear icon (Admin)
3. Click **Create** → **Property**
4. Property name: `Interactive Pet Marketplace`
5. Reporting time zone: `United States — Central Time`
6. Currency: `US Dollar (USD)`
7. Click **Next**
8. Industry: `Shopping` (or whatever fits — doesn't affect data)
9. Business size: pick whatever
10. Click **Next**, then pick any of the objectives, then **Create**
11. Accept the terms of service
12. Choose platform: **Web**
13. Website URL: `https://interactivepetmarketplace.com`
14. Stream name: `Interactive Pet Marketplace Web`
15. Click **Create stream**

You're now on the stream details page. Two things to grab/check:

**A) Copy the Measurement ID.** Top right of that page. It looks like
`G-XXXXXXXXXX` (10 characters after `G-`). Save it — you'll need it
in Step 4.

**B) Confirm Enhanced Measurement is ON.** Scroll down to the
"Enhanced measurement" section. The toggle should be blue/on. Click
the gear icon next to it to open settings, and confirm **Outbound
clicks** is checked. This is the key toggle — it's what makes GA4
automatically log clicks to external domains (i.e., your affiliate
links). Save if you changed anything.

---

## Step 4 — Create .env.local with your Measurement ID

This file holds your Measurement ID locally and is gitignored so it
never gets committed to GitHub.

**Where:** Project root (`C:\Users\Tim Thomasson\Interactive-Pet-Marketplace\.env.local`)
— same folder as `package.json`. NOT inside `app/` or `components/`.

**How to create it (VS Code method, easiest):**

1. Open VS Code on the project folder
2. In the file tree on the left, click anywhere in the root (not inside
   a subfolder)
3. Click the "New File" icon at the top of the explorer panel (looks
   like a piece of paper with a +)
4. Type exactly: `.env.local` and press Enter
5. Paste this into the file (one line):
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
6. Replace `G-XXXXXXXXXX` with the real Measurement ID you copied in Step 3
7. Save (Ctrl+S)

**How to create it (PowerShell alternative):**

```powershell
cd "C:\Users\Tim Thomasson\Interactive-Pet-Marketplace"
"NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX" | Out-File -FilePath .env.local -Encoding utf8
```

Then open `.env.local` in VS Code and replace `G-XXXXXXXXXX` with your
real ID, save.

**Verify it's gitignored:** run `git status` from the project root.
`.env.local` should NOT appear in the list of modified/untracked files.
If it does appear, the updated `.gitignore` from this zip didn't get
copied correctly — re-do Step 2.

---

## Step 5 — Add the env var to Cloudflare (production)

Your site runs on Cloudflare Workers via OpenNext (worker name:
`interactive-pet-marketplace`). The Workers dashboard is where
production env vars live.

**In the Cloudflare dashboard:**

1. Go to https://dash.cloudflare.com
2. Left sidebar: **Workers & Pages**
3. Click on the worker named `interactive-pet-marketplace`
4. Top tabs: **Settings**
5. Scroll to **Variables and Secrets** section
6. Click **Add variable**
7. Variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
8. Value: paste your real Measurement ID (`G-XXXXXXXXXX`)
9. Type: leave as **Text** (it's not secret — it ends up in browser
   code anyway, anyone who views the page source can see it)
10. Click **Deploy** / **Save**

**Important: the env var only takes effect on the NEXT build.** Next.js
inlines `NEXT_PUBLIC_*` variables into the JavaScript bundle at build
time, not at runtime. So you need to trigger a new build:
- If your repo is wired to auto-deploy on push, just commit any change
  and push
- Otherwise, run your usual deploy command (likely `npm run deploy` or
  `npx wrangler deploy` — check your `package.json` scripts)

---

## Step 6 — Test locally

```powershell
cd "C:\Users\Tim Thomasson\Interactive-Pet-Marketplace"
npm run dev
```

1. Open http://localhost:3000 in Chrome
2. Open DevTools (F12) → **Network** tab
3. In the filter box, type: `google`
4. Reload the page
5. You should see two requests:
   - `gtag/js?id=G-XXXXXXXXXX` (loading the GA library)
   - `g/collect?...` (sending your pageview to GA)
6. Now click an affiliate link (Amazon, manufacturer, anywhere external).
   It opens in a new tab — that's expected. In the Network tab, you
   should see another `collect` request fire with `en=click` and
   `link_url=https://...` in the query string. That's your outbound
   click event.

**Real-time verification in GA4:**

1. Go back to https://analytics.google.com
2. Left sidebar: **Reports** → **Realtime**
3. You should see yourself as an active user within 30 seconds
4. Scroll down to the events panel — `page_view` and (after clicking
   an affiliate link) `click` events should appear

---

## Step 7 — Commit and push

Once local test works:

```powershell
cd "C:\Users\Tim Thomasson\Interactive-Pet-Marketplace"
git add app/layout.tsx components/GoogleAnalytics.tsx .env.local.example .gitignore
git status
```

`git status` should show those four files staged, and `.env.local`
should NOT be listed (it's gitignored). If `.env.local` shows up in
red as untracked, that's fine — it just means it's not being committed.
If it shows up in green as staged, STOP — your `.gitignore` didn't
update. Don't push.

```powershell
git commit -m "Add Google Analytics 4 with outbound click tracking"
git push
```

If you have auto-deploy set up, this triggers the production build.
The new build picks up the env var from Step 5 and GA goes live on
your real site.

---

## Step 8 — Verify in production (after deploy)

1. Visit https://interactivepetmarketplace.com
2. View page source (right-click → View page source)
3. Search for `googletagmanager` — you should find the script tag
4. Search for `G-` followed by your Measurement ID — should be there
5. In GA4 → Reports → Realtime, you should see real visitors

If you visit the production site and don't see GA scripts in the page
source, the env var didn't make it into the build. Re-check Step 5
and re-deploy.

---

## Where to find outbound click data

GA4 needs ~24-48 hours to populate the standard reports (Realtime works
immediately).

**Quick view:**
- Reports → Engagement → Events
- Look for the `click` event row
- Click into it to see breakdown by `link_url` and `link_domain`

**Better view (Exploration):**
- Left sidebar: **Explore**
- Click "Free form" template
- Dimensions: drag **Link URL** and **Link domain** into the dimensions panel
- Metrics: drag **Event count** into metrics
- In the variables panel, add a filter: `Event name` exactly matches `click`
- Drag dimensions into Rows, metric into Values
- You now have a table of clicks-per-affiliate-link, sortable by count

This is the report that tells you which products are actually driving
clicks to Amazon / manufacturer sites — your conversion signal.

---

## Troubleshooting

**GA scripts don't show up in DevTools Network tab during `npm run dev`:**
- Check `.env.local` exists in project root and has the right line
- Restart the dev server (Ctrl+C, then `npm run dev` again) — Next.js
  only reads `.env.local` at startup
- Check the Measurement ID has no typos (must start with `G-`)

**Scripts load but no `collect` request fires:**
- An ad blocker is probably blocking it. Try in an incognito window
  with extensions disabled, or test in a different browser.

**Outbound click event doesn't fire:**
- Check Enhanced Measurement → Outbound clicks is enabled in GA4
  (Step 3 part B)
- The link must point to a different domain than the current page —
  clicks within `interactivepetmarketplace.com` don't count as outbound

**Production site loads but no GA in page source:**
- The Cloudflare env var didn't make it into the build
- Verify in dash.cloudflare.com → Workers & Pages →
  interactive-pet-marketplace → Settings → Variables and Secrets
- Re-deploy after confirming the variable is there
