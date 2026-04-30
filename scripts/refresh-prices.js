#!/usr/bin/env node
/**
 * refresh-prices.js
 *
 * Interactive helper to update product prices and ratings in
 * Documentation/product-details.json.
 *
 * Workflow:
 *   1. Picks products needing review based on priceTier and priceLastChecked
 *   2. For each product, opens the product URL in the default browser
 *   3. Prompts you to enter new price / rating (Enter to skip / keep current)
 *   4. Updates JSON and stamps priceLastChecked
 *
 * Tiers (priceTier in JSON):
 *   "hot"      → check weekly  (every 7 days)
 *   "regular"  → check monthly (every 30 days)
 *   "longtail" → check quarterly (every 90 days)
 *
 * Usage:
 *   npm run refresh:prices              → review products that are stale
 *   npm run refresh:prices -- --all     → review every product, ignoring schedule
 *   npm run refresh:prices -- --slug X  → review a specific product by slug
 *   npm run refresh:prices -- --limit 5 → cap how many products to review
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { spawn } = require("child_process");
const XLSX = require("xlsx");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "Documentation", "product-details.json");
const XLSX_PATH = path.join(ROOT, "Documentation", "Product Matrix.xlsx");

const TIER_DAYS = { hot: 7, regular: 30, longtail: 90 };
const DEFAULT_TIER = "regular";
const DEFAULT_LIMIT = 10;

// ── parse CLI flags ────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flags = {
  all: argv.includes("--all"),
  slug: null,
  limit: DEFAULT_LIMIT
};
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--slug" && argv[i + 1]) flags.slug = argv[++i];
  if (argv[i] === "--limit" && argv[i + 1]) flags.limit = parseInt(argv[++i], 10) || DEFAULT_LIMIT;
}

// ── helpers ────────────────────────────────────────────────────────────────
function daysSince(isoDate) {
  if (!isoDate) return Infinity;
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return Infinity;
  return Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function openInBrowser(url) {
  if (!url) return;
  const platform = process.platform;
  try {
    if (platform === "win32") {
      spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" }).unref();
    } else if (platform === "darwin") {
      spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
    } else {
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
    }
  } catch {
    // silently ignore — user can copy the URL from terminal output
  }
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ── load product URLs from spreadsheet ─────────────────────────────────────
function toSlug(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadSpreadsheetUrls() {
  if (!fs.existsSync(XLSX_PATH)) return {};
  const wb = XLSX.readFile(XLSX_PATH);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });
  const urls = {};
  for (const row of rows) {
    const name = row["Product"];
    if (!name) continue;
    urls[toSlug(name)] = {
      name: String(name).trim(),
      manufacturer: row["Manufacturer"] ? String(row["Manufacturer"]).trim() : "",
      productUrl: row["Product URL"] ? String(row["Product URL"]).trim() : ""
    };
  }
  return urls;
}

// ── main ──────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error(`ERROR: ${JSON_PATH} not found.`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  const urls = loadSpreadsheetUrls();

  // collect product slugs (skip metadata keys starting with _)
  const slugs = Object.keys(data).filter((k) => !k.startsWith("_"));

  // build review list
  let queue = slugs.map((slug) => {
    const detail = data[slug];
    const tier = detail.priceTier || DEFAULT_TIER;
    const cadence = TIER_DAYS[tier] || TIER_DAYS[DEFAULT_TIER];
    const ageDays = daysSince(detail.priceLastChecked);
    return { slug, detail, tier, cadence, ageDays, due: ageDays >= cadence };
  });

  if (flags.slug) {
    queue = queue.filter((q) => q.slug === flags.slug);
    if (queue.length === 0) {
      console.error(`ERROR: slug "${flags.slug}" not found in product-details.json`);
      process.exit(1);
    }
  } else if (!flags.all) {
    // only stale ones
    queue = queue.filter((q) => q.due);
  }

  // sort: most overdue first
  queue.sort((a, b) => b.ageDays - a.ageDays);

  // cap to limit
  queue = queue.slice(0, flags.limit);

  if (queue.length === 0) {
    console.log("✓ All product prices are fresh. Nothing to refresh!");
    console.log("\nTip: use --all to force-review every product, or --slug NAME for a specific product.");
    return;
  }

  console.log(`\n${queue.length} product(s) to review:\n`);
  queue.forEach((q, i) => {
    const ageLabel = q.ageDays === Infinity ? "never checked" : `${q.ageDays} days old`;
    console.log(`  ${i + 1}. ${q.slug.padEnd(34)} [${q.tier.padEnd(8)}] ${ageLabel}`);
  });
  console.log();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let updatedCount = 0;
  for (const item of queue) {
    const meta = urls[item.slug] || {};
    const detail = item.detail;
    const url = meta.productUrl || detail.productUrl || "";

    console.log("─".repeat(70));
    console.log(`\n📦 ${meta.name || item.slug}`);
    if (meta.manufacturer) console.log(`   ${meta.manufacturer}`);
    console.log(`   Slug:    ${item.slug}`);
    console.log(`   Tier:    ${item.tier}`);
    console.log(`   Last:    ${detail.priceLastChecked || "never"}`);
    console.log(`   Price:   ${detail.price || "—"}`);
    console.log(`   Rating:  ${detail.rating ?? "—"}`);
    if (url) {
      console.log(`   URL:     ${url}`);
      openInBrowser(url);
    } else {
      console.log(`   URL:     (none — fill in spreadsheet "Product URL" column)`);
    }
    console.log();

    const action = (await ask(rl, `   [u]pdate, [s]kip, [t]ier change, [q]uit?  (default: skip)  `)).trim().toLowerCase();

    if (action === "q" || action === "quit") break;
    if (action === "t" || action === "tier") {
      const newTier = (await ask(rl, `   New tier (hot/regular/longtail) [${item.tier}]: `)).trim().toLowerCase();
      if (["hot", "regular", "longtail"].includes(newTier)) {
        detail.priceTier = newTier;
        console.log(`   ✓ Tier updated to ${newTier}`);
        updatedCount++;
      } else if (newTier) {
        console.log(`   (invalid tier; left as ${item.tier})`);
      }
      continue;
    }
    if (action !== "u" && action !== "update") {
      console.log(`   ↪ skipped`);
      continue;
    }

    const newPrice = (await ask(rl, `   New price (Enter to keep "${detail.price || "—"}"): `)).trim();
    if (newPrice) detail.price = newPrice;

    const newRatingRaw = (await ask(rl, `   New rating (Enter to keep "${detail.rating ?? "—"}"): `)).trim();
    if (newRatingRaw) {
      const r = parseFloat(newRatingRaw);
      if (!Number.isNaN(r) && r >= 0 && r <= 5) detail.rating = r;
      else console.log(`   (invalid rating; kept ${detail.rating})`);
    }

    detail.priceLastChecked = todayStamp();
    updatedCount++;
    console.log(`   ✓ Saved (${detail.price}, ${detail.rating ?? "—"}, checked ${detail.priceLastChecked})`);
  }

  rl.close();

  if (updatedCount > 0) {
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log("\n─".repeat(70));
    console.log(`✓ Updated ${updatedCount} product(s) in product-details.json`);
    console.log(`\nNow run:  npm run generate:products`);
    console.log(`Then:     git add -A && git commit -m "Refresh prices" && git push`);
  } else {
    console.log("\n(no updates saved)");
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
