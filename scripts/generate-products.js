/**
 * generate-products.js
 *
 * Reads:
 *   - Documentation/Product Matrix.xlsx  (structured data: brand, type, flags, URLs)
 *   - Documentation/product-details.json (web-researched details: price, blurb, rating, features)
 *
 * Writes:
 *   - components/site-data.ts (auto-generated; do NOT edit by hand)
 *
 * Usage:
 *   npm run generate:products
 */

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const XLSX_PATH = path.join(ROOT, "Documentation", "Product Matrix.xlsx");
const JSON_PATH = path.join(ROOT, "Documentation", "product-details.json");
const OUT_PATH = path.join(ROOT, "components", "site-data.ts");

// Convert "Companion Pet Pup" → "companion-pet-pup"
function toSlug(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Normalize spreadsheet "Type" cell to canonical site values
function normalizeType(raw) {
  if (!raw) return "";
  const t = String(raw).trim().toLowerCase();
  if (t.includes("ai") || t.includes("robotic")) return "AI & Robotic";
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

// ── Read sources ────────────────────────────────────────────────────────────

if (!fs.existsSync(XLSX_PATH)) {
  console.error(`ERROR: Spreadsheet not found at ${XLSX_PATH}`);
  process.exit(1);
}
if (!fs.existsSync(JSON_PATH)) {
  console.error(`ERROR: product-details.json not found at ${JSON_PATH}`);
  process.exit(1);
}

const workbook = XLSX.readFile(XLSX_PATH);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

const details = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

// ── Build product list ──────────────────────────────────────────────────────

const skipped = [];
const products = [];

for (const row of rows) {
  const name = clean(row["Product"]);
  if (!name) continue;

  const slug = toSlug(name);
  const detail = details[slug];

  // Skip products without web-researched details
  if (!detail || typeof detail !== "object" || !detail.blurb) {
    skipped.push({ name, slug, reason: "no entry in product-details.json" });
    continue;
  }

  const bestFor = [clean(row["Best For 1"]), clean(row["Best For 2"])].filter(Boolean);

  products.push({
    slug,
    name,
    manufacturer: clean(row["Manufacturer"]),
    type: normalizeType(row["Type"]),
    bestFor,
    blurb: detail.blurb,
    price: detail.price || "",
    rating: typeof detail.rating === "number" ? detail.rating : undefined,
    features: Array.isArray(detail.features) ? detail.features : [],
    highlight: detail.highlight || "",
    productUrl: clean(row["Product URL"]),
    imageUrl: clean(row["Image URL"]) || undefined,
    flags: {
      gifts: isYes(row["Gifts"]),
      premium: isYes(row["Premium"]),
      camera: isYes(row["Camera"]),
      internetAccess: isYes(row["Internet Access"]),
      affiliateAgreement: isYes(row["Affiliate Agreement"])
    }
  });
}

// ── Write site-data.ts ──────────────────────────────────────────────────────

const banner = `// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Run \`npm run generate:products\` to regenerate.
// Source: Documentation/Product Matrix.xlsx + Documentation/product-details.json
//
// Generated: ${new Date().toISOString()}
`;

const tsContent = `${banner}
export type ProductFlags = {
  gifts: boolean;
  premium: boolean;
  camera: boolean;
  internetAccess: boolean;
  affiliateAgreement: boolean;
};

export type Product = {
  slug: string;
  name: string;
  manufacturer: string;
  type: "Interactive" | "AI & Robotic" | string;
  bestFor: string[];
  blurb: string;
  price: string;
  rating?: number;
  features: string[];
  highlight: string;
  productUrl: string;
  imageUrl?: string;
  flags: ProductFlags;
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const faqs = [
  { q: "What is the difference between interactive pets and AI & robotic pets?", a: "Interactive pets usually focus on comfort, touch response, and simple engagement. AI & robotic pets generally add movement, sensors, or more advanced behavior." },
  { q: "Are smart pets good for seniors?", a: "Many buyers choose them for companionship and low maintenance. The best fit depends on comfort needs, ease of use, and how much technology the user wants." },
  { q: "Do these products need Wi-Fi?", a: "Some advanced models may use apps or connectivity, but many simpler interactive companion products do not." },
  { q: "Are these a good gift?", a: "Yes. Buyers often choose them for holidays, birthdays, or thoughtful gifts for parents and grandparents." }
];
`;

fs.writeFileSync(OUT_PATH, tsContent, "utf8");

// ── Report ──────────────────────────────────────────────────────────────────

console.log(`✓ Generated ${OUT_PATH}`);
console.log(`  Included: ${products.length} product(s)`);
products.forEach(p => console.log(`    - ${p.name}  [${p.type}]`));

if (skipped.length > 0) {
  console.log(`\n  Skipped: ${skipped.length} product(s) without entries in product-details.json:`);
  skipped.forEach(s => console.log(`    - ${s.name}  (slug: ${s.slug})`));
  console.log(`\n  → To include them, add their entries to Documentation/product-details.json.`);
}
