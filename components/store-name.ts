// Derives a short, human-readable store/retailer name from a product's
// outbound Product URL — used for "View at [Store]" button labels.
//
// Per Tim's direction: the label reflects where the link actually goes
// (the domain in the Product Matrix "Product URL" column), NOT the
// Manufacturer field. A product can be manufactured by one company but
// sold/linked through another (e.g. via Amazon), and the button should
// say where the click will land.
//
// Amazon uses several domains/short-link hosts (amazon.com, amzn.to,
// smile.amazon.com, etc.) that don't read as "Amazon" if you just strip
// the TLD, so those are special-cased. Everything else falls back to
// stripping "www.", dropping the TLD, and capitalizing what's left.

const AMAZON_HOST_PATTERNS = [/(^|\.)amazon\./i, /(^|\.)amzn\.to$/i, /(^|\.)a\.co$/i];

export function getStoreName(url?: string): string {
  if (!url) return "Retailer";

  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return "Retailer";
  }

  if (AMAZON_HOST_PATTERNS.some((pattern) => pattern.test(hostname))) {
    return "Amazon";
  }

  const labels = hostname.split(".").filter((label) => label && label !== "www");
  // Drop the TLD (last remaining label) if there's more than one label left.
  const nameLabels = labels.length > 1 ? labels.slice(0, -1) : labels;
  const name = nameLabels.join(" ");

  if (!name) return "Retailer";

  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
