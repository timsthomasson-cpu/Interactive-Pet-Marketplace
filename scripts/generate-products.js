/**
 * generate-products.js
 *
 * Reads:
 *   - Documentation/Product Matrix.xlsx (single source of truth for product
 *     data: name, blurb, price, rating, flags, etc.)
 *   - Documentation/product-privacy.json (privacy/security research for
 *     products with cameras or internet access; hand-curated, keyed by slug)
 *
 * Writes:
 *   - components/site-data.ts (auto-generated; do NOT edit by hand)
 *
 * Usage:
 *   npm run generate:products
 *
 * Note: product-details.json is being phased out. The spreadsheet is now
 * the source of truth for product data, with product-privacy.json holding
 * supplementary privacy research. See README.md and Documentation/PRODUCT_DATA_RULES.md.
 */

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const XLSX_PATH = path.join(ROOT, "Documentation", "Product Matrix.xlsx");
const PRIVACY_PATH = path.join(ROOT, "Documentation", "product-privacy.json");
const OUT_PATH = path.join(ROOT, "components", "site-data.ts");

// ── Helpers ─────────────────────────────────────────────────────────────────

function toSlug(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeType(raw) {
  if (!raw) return "";
  const t = String(raw).trim().toLowerCase();
  if (t.includes("ai") || t.includes("robotic") || t.includes("pocket")) return "AI & Robotic";
  if (t.includes("fluffy") || t.includes("interactive") || t.includes("plushy") || t.includes("companion")) return "Interactive";
  return raw.trim();
}

function isYes(val) {
  if (val === null || val === undefined) return false;
  return String(val).trim().toLowerCase() === "yes";
}

function clean(val) {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

function toNumber(val) {
  if (val === null || val === undefined || val === "") return undefined;
  const n = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? undefined : n;
}

function toInt(val) {
  const n = toNumber(val);
  return n === undefined ? undefined : Math.round(n);
}

// Format a date value (could be Date, string, or number) → YYYY-MM-DD string
function toDateString(val) {
  if (!val) return "";
  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, "0");
    const d = String(val.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  // Excel may pass dates as strings already
  return clean(val);
}

// Format a numeric price → "$789.00" or "$159.99"
function formatPrice(val) {
  const n = toNumber(val);
  if (n === undefined) return clean(val);
  // Show .00 for whole numbers, otherwise keep two decimals
  return "$" + n.toFixed(2).replace(/\.00$/, ".00");
}

// Normalize Price Category values
function normalizePriceCategory(raw) {
  if (!raw) return "";
  const t = String(raw).trim().toLowerCase();
  if (t.includes("premium")) return "Premium";
  if (t.includes("best")) return "Best Value";
  if (t.includes("budget")) return "Budget Friendly";
  return clean(raw);
}

// ── Read source ─────────────────────────────────────────────────────────────

if (!fs.existsSync(XLSX_PATH)) {
  console.error(`ERROR: Spreadsheet not found at ${XLSX_PATH}`);
  process.exit(1);
}

const workbook = XLSX.readFile(XLSX_PATH, { cellDates: true });
const SHEET_NAME = "Product Matrix";
if (!workbook.Sheets[SHEET_NAME]) {
  console.error(`ERROR: Sheet "${SHEET_NAME}" not found in ${XLSX_PATH}`);
  console.error(`  Available sheets: ${workbook.SheetNames.join(", ")}`);
  process.exit(1);
}
const sheet = workbook.Sheets[SHEET_NAME];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

// ── Read privacy research ───────────────────────────────────────────────────
// The privacy file is optional — if missing, products simply won't have a
// `privacy` field. If present and a product is flagged Camera=yes but has no
// privacy entry, we warn so the discrepancy gets caught early.
//
// File shape: top-level keys are product slugs; entries are PrivacyEntry
// objects. A "_meta" key holds documentation and is skipped at merge time.

let privacyData = {};
if (fs.existsSync(PRIVACY_PATH)) {
  try {
    const raw = fs.readFileSync(PRIVACY_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      // Strip _meta (documentation block) and any other underscore-prefixed
      // keys — the rest are slug-keyed entries.
      for (const [key, value] of Object.entries(parsed)) {
        if (key.startsWith("_")) continue;
        privacyData[key] = value;
      }
    }
  } catch (err) {
    console.error(`WARNING: Failed to parse ${PRIVACY_PATH}: ${err.message}`);
    console.error(`  Continuing without privacy data.`);
  }
} else {
  console.error(`WARNING: ${PRIVACY_PATH} not found. Continuing without privacy data.`);
}

// ── Build product list ──────────────────────────────────────────────────────

const skipped = [];
const products = [];

for (const row of rows) {
  const name = clean(row["Product"]);
  if (!name) continue;

  const slug = toSlug(name);
  const blurb = clean(row["Blurb"]);

  // A product needs at least a blurb to be shown
  if (!blurb) {
    skipped.push({ name, slug, reason: "missing Blurb in spreadsheet" });
    continue;
  }

  const bestFor = [clean(row["Best For 1"]), clean(row["Best For 2"])].filter(Boolean);

  const features = [
    clean(row["Feature 1"]),
    clean(row["Feature 2"]),
    clean(row["Feature 3"])
  ].filter(Boolean);

  const product = {
    slug,
    name,
    manufacturer: clean(row["Manufacturer"]),
    manufacturerAndProduct: clean(row["Manufacturer and Product"]),
    type: normalizeType(row["Type"]),
    category: clean(row["Category"]),
    bestFor,
    blurb,
    features,
    highlight: clean(row["Highlight"]),
    rating: toNumber(row["Rating"]),
    reviewCount: toInt(row["Review Count"]),
    ratingSource: clean(row["Rating Source"]),
    ratingLastChecked: toDateString(row["Rating Last-Checked"]),
    ratingUrl: clean(row["Rating URL"]),
    price: formatPrice(row["Price"]),
    priceSource: clean(row["Price Source"]),
    priceLastChecked: toDateString(row["Price Last Checked"]),
    priceCategory: normalizePriceCategory(row["Price Category"]),
    productUrl: (() => { const u = clean(row["Product URL"]); return /^https?:\/\//i.test(u) ? u : ""; })(),
    imageUrl: clean(row["Image URL"]) || undefined,
    flags: {
      gifts: isYes(row["Gifts"]),
      topPick: isYes(row["Top Pick"]),
      camera: isYes(row["Camera"]),
      internetAccess: isYes(row["Internet Access"]),
      affiliateAgreement: isYes(row["Affiliate Agreement"])
    },
    stationary:        clean(row["Stationary/Mobile"]) || undefined,
    soundLevelControl: toNumber(row["Sound Level Control"]),
    minimumAge:        clean(row["Suggested Age Range"]) || undefined,
  };

  // Attach privacy research if present for this slug.
  if (privacyData[slug]) {
    product.privacy = privacyData[slug];
  }

  products.push(product);
}

// ── Write site-data.ts ──────────────────────────────────────────────────────

const banner = `// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Run \`npm run generate:products\` to regenerate.
// Source: Documentation/Product Matrix.xlsx (single source of truth)
//
// Generated: ${new Date().toISOString()}
`;

const tsContent = `${banner}
export type ProductFlags = {
  gifts: boolean;
  topPick: boolean;
  camera: boolean;
  internetAccess: boolean;
  affiliateAgreement: boolean;
};

// Privacy and security research for products with cameras or internet access.
// Hand-curated in Documentation/product-privacy.json and merged in at build
// time. Optional — only camera/connected products carry this field.
//
// Data discipline:
//   - fromManufacturer.* values come from direct manufacturer statements
//     on product pages or in privacy policies. If the manufacturer does
//     not explicitly state a fact, the value is "not-specified".
//   - fromThirdParty findings come from Tier 1 sources (Mozilla Privacy
//     Not Included, Consumer Reports, FTC) or Tier 2 sources (established
//     tech/security publications). Each finding includes the source name,
//     URL, and date.
//   - summary is a neutral one-line restatement of documented behavior.

export type ProductPrivacyField<T extends string> = {
  value: T;
  note?: string;
};

export type ThirdPartyFinding = {
  finding: string;
  sourceName: string;
  sourceUrl: string;
  sourceDate: string;
  note?: string;
};

export type ProductPrivacy = {
  lastResearched: string;
  manufacturerSources: string[];
  thirdPartySources: { name: string; url: string; date: string }[];
  fromManufacturer: {
    physicalShutter?: ProductPrivacyField<"yes" | "no" | "not-specified">;
    softwarePrivacyMode?: ProductPrivacyField<"yes" | "no" | "not-specified">;
    indicatorLED?: ProductPrivacyField<"yes" | "no" | "not-specified">;
    twoFactorAuth?: ProductPrivacyField<"yes" | "no" | "not-specified">;
    storageLocation?: ProductPrivacyField<"local-only" | "local-first" | "cloud-first" | "hybrid" | "not-specified">;
    privacyPolicyAvailable?: ProductPrivacyField<"yes" | "no" | "not-specified">;
    manufacturerDisclosedIncidents?: ProductPrivacyField<"none-disclosed" | "disclosed" | "not-specified">;
  };
  fromThirdParty: ThirdPartyFinding[];
  summary: string;
};

export type Product = {
  slug: string;
  name: string;
  manufacturer: string;
  manufacturerAndProduct: string;
  type: "Interactive" | "AI & Robotic" | string;
  category: string;
  bestFor: string[];
  blurb: string;
  features: string[];
  highlight: string;
  rating?: number;
  reviewCount?: number;
  ratingSource: string;
  ratingLastChecked: string;
  ratingUrl: string;
  price: string;
  priceSource: string;
  priceLastChecked: string;
  priceCategory: "Premium" | "Best Value" | "Budget Friendly" | string;
  productUrl: string;
  imageUrl?: string;
  flags: ProductFlags;
  privacy?: ProductPrivacy;
  stationary?: string;
  soundLevelControl?: number;
  minimumAge?: string;
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const faqs = [
  { q: "What is the difference between interactive pets and AI & robotic pets?", a: "Interactive pets usually focus on comfort, touch response, and simple engagement. AI & robotic pets generally add movement, sensors, or more advanced behavior." },
  { q: "Are interactive pets good for seniors?", a: "A growing body of research suggests that interactive and robotic pets can meaningfully improve the lives of seniors — especially those facing loneliness, isolation, dementia, depression, or anxiety.", link: { href: "/senior-research", text: "Click here for a list of related publications." } },
  { q: "Are Interactive Pets good for Children?", a: "Engaging companions designed to entertain children and bring families together. Research has shown that Interactive Pets can improve the lives of children by improving Interactive Learning, Personalized Engagement, Empathy, Technology Skills, and many other areas.", link: { href: "/kids-research", text: "See a list of articles." } },
  { q: "Do these products need Wi-Fi?", a: "Some advanced models may use apps or connectivity, but many simpler interactive companion products do not." },
  { q: "Are these a good gift?", a: "Yes. Buyers often choose them for holidays, birthdays, or thoughtful gifts for parents and grandparents." }
];
`;

fs.writeFileSync(OUT_PATH, tsContent, "utf8");

// ── Report ──────────────────────────────────────────────────────────────────

console.log(`✓ Generated ${OUT_PATH}`);
console.log(`  Included: ${products.length} product(s)`);
products.forEach(p => console.log(`    - ${p.name}  [${p.type}] [${p.priceCategory}]`));

if (skipped.length > 0) {
  console.log(`\n  Skipped: ${skipped.length} product(s):`);
  skipped.forEach(s => console.log(`    - ${s.name}  (${s.reason})`));
}

// Camera/privacy consistency check. Helps catch mismatches when one is
// updated without the other.
const cameraNoPrivacy = products.filter(p => p.flags.camera && !p.privacy);
const privacyNoCamera = products.filter(p => p.privacy && !p.flags.camera);
if (cameraNoPrivacy.length > 0) {
  console.log(`\n  ⚠️  Camera=yes but no entry in product-privacy.json:`);
  cameraNoPrivacy.forEach(p => console.log(`    - ${p.name} (slug: ${p.slug})`));
}
if (privacyNoCamera.length > 0) {
  console.log(`\n  ℹ️  Has privacy entry but Camera=no in spreadsheet (may be intentional for internet-only products):`);
  privacyNoCamera.forEach(p => console.log(`    - ${p.name} (slug: ${p.slug})`));
}
const withPrivacy = products.filter(p => p.privacy).length;
console.log(`\n  Privacy data attached: ${withPrivacy} product(s)`);
