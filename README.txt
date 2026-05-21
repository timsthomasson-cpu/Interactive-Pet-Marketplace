# GA4 Install — Read This First

## What's in this zip

- `GoogleAnalytics.tsx` — the GA4 loader component
- `layout.tsx` — your edited app/layout.tsx with GoogleAnalytics added
- `gitignore.txt` — patched .gitignore (note: renamed to .gitignore on install)
- `install.ps1` — PowerShell script that copies everything to the right places
- `README.txt` — this file

## How to install (the easy way)

1. Extract the zip somewhere — Downloads is fine
2. Open the extracted folder in File Explorer
3. Right-click `install.ps1` → "Run with PowerShell"
4. A PowerShell window opens, runs the install, and shows results

If Windows blocks the script with an execution-policy warning:
- Open PowerShell (search "PowerShell" in Start menu)
- Run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- Type Y when prompted
- Try double-clicking install.ps1 again

If you'd rather run from PowerShell directly:
- Open PowerShell
- cd to the extracted folder, e.g.: `cd "C:\Users\Tim Thomasson\Downloads\changes-extracted"`
- Run: `.\install.ps1`

## What the script does

1. Copies `GoogleAnalytics.tsx` to `Interactive-Pet-Marketplace\components\`
2. Copies `layout.tsx` to `Interactive-Pet-Marketplace\app\` (REPLACES existing)
3. Copies `gitignore.txt` to `Interactive-Pet-Marketplace\.gitignore` (REPLACES existing)
4. Verifies each copy worked and prints [OK] or [FAIL] for each
5. Verifies `.env.local` exists with the Measurement ID, warns if not

## Manual install (if PowerShell isn't working)

If you'd rather drag and drop:
- `GoogleAnalytics.tsx` → `C:\Users\Tim Thomasson\Interactive-Pet-Marketplace\components\`
- `layout.tsx` → `C:\Users\Tim Thomasson\Interactive-Pet-Marketplace\app\` (replace existing)
- Rename `gitignore.txt` to `.gitignore`, then put it in `C:\Users\Tim Thomasson\Interactive-Pet-Marketplace\` (replace existing)

## After install — what to do

1. Make sure `.env.local` is in the project root with this line:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-R9QJCBP0RV
   ```
2. Stop the dev server if it's running: Ctrl+C in the npm run dev window
3. Restart: `npm run dev`
4. Hard reload the page in Edge: Ctrl+Shift+R
5. Open DevTools (F12), go to Elements tab, Ctrl+F search for "googletagmanager"
6. If found — GA is loading. Move to the Network tab and look for `gtag` and `collect` requests.
