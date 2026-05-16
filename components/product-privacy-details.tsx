import { Product, ProductPrivacy, ProductPrivacyField, ThirdPartyFinding } from "./site-data";

// Expandable privacy-details panel for camera-equipped product cards.
// Renders nothing when product.privacy is not present.
//
// Two zones:
//   1. "From the manufacturer" — facts directly stated on the manufacturer's
//      product page or privacy policy. Values that aren't documented show
//      as "Not specified." Source URLs link to the manufacturer's pages.
//   2. "From independent reviews" — findings from Tier 1/Tier 2 sources
//      (Mozilla Privacy Not Included, Consumer Reports, FTC, established
//      tech publications). Each finding shows attribution and date.
//
// Designed to be compact when collapsed, scannable when expanded. Visitors
// who don't care can ignore it. Visitors who do get a complete picture in
// one click without leaving the page.

export function ProductPrivacyDetails({ product }: { product: Product }) {
  if (!product.privacy) return null;
  const p = product.privacy;

  return (
    <details className="group mt-4 rounded-2xl border border-slate-200 bg-cream-50">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
          <span aria-hidden>📷</span>
          Privacy details
        </span>
        <span
          aria-hidden
          className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <div className="space-y-4 px-4 pb-4 pt-1 text-sm leading-7 text-slate-700">
        {/* Summary line — neutral restatement of manufacturer's documented behavior */}
        <p className="text-slate-800">{p.summary}</p>

        {/* Manufacturer zone */}
        <ManufacturerZone privacy={p} />

        {/* Third-party zone — only render if findings exist */}
        {p.fromThirdParty.length > 0 && (
          <ThirdPartyZone findings={p.fromThirdParty} />
        )}

        {/* Footer: research date */}
        <p className="text-xs text-slate-500">
          Last researched: {p.lastResearched}
        </p>
      </div>
    </details>
  );
}

// ────────────────────────────────────────────────────────────────────
// Manufacturer zone
// ────────────────────────────────────────────────────────────────────

function ManufacturerZone({ privacy }: { privacy: ProductPrivacy }) {
  const m = privacy.fromManufacturer;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
        From the manufacturer
      </p>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[max-content_1fr]">
        <FieldRow label="Physical privacy shutter" field={m.physicalShutter} valueMap={yesNoMap} />
        <FieldRow label="Software privacy mode" field={m.softwarePrivacyMode} valueMap={yesNoMap} />
        <FieldRow label="Camera indicator light" field={m.indicatorLED} valueMap={yesNoMap} />
        <FieldRow label="Two-factor authentication" field={m.twoFactorAuth} valueMap={yesNoMap} />
        <FieldRow label="Storage" field={m.storageLocation} valueMap={storageMap} />
        <FieldRow label="Privacy policy" field={m.privacyPolicyAvailable} valueMap={policyMap} />
        <FieldRow
          label="Manufacturer-disclosed incidents"
          field={m.manufacturerDisclosedIncidents}
          valueMap={incidentsMap}
        />
      </dl>

      {privacy.manufacturerSources.length > 0 && (
        <div className="mt-3 border-t border-slate-100 pt-2 text-xs text-slate-600">
          <span className="font-semibold">Manufacturer sources:</span>{" "}
          {privacy.manufacturerSources.map((url, i) => (
            <span key={url}>
              {i > 0 && ", "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-trust-700 hover:text-trust-900 break-all"
              >
                {prettyHost(url)}
              </a>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Third-party zone
// ────────────────────────────────────────────────────────────────────

function ThirdPartyZone({ findings }: { findings: ThirdPartyFinding[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
        From independent reviews
      </p>
      <ul className="space-y-3">
        {findings.map((f, i) => (
          <li key={i} className="text-sm leading-6 text-slate-700">
            <p>{f.finding}</p>
            <p className="mt-1 text-xs text-slate-500">
              Source:{" "}
              <a
                href={f.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-trust-700 hover:text-trust-900"
              >
                {f.sourceName}
              </a>
              , {f.sourceDate}
            </p>
            {f.note && <p className="mt-1 text-xs italic text-slate-500">{f.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// FieldRow + value maps
// ────────────────────────────────────────────────────────────────────

type ValueMap = Record<string, { label: string; tone: "positive" | "neutral" | "negative" | "unknown" }>;

function FieldRow<T extends string>({
  label,
  field,
  valueMap
}: {
  label: string;
  field: ProductPrivacyField<T> | undefined;
  valueMap: ValueMap;
}) {
  if (!field) return null;
  const entry = valueMap[field.value] ?? { label: field.value, tone: "unknown" as const };
  const toneClass = {
    positive: "text-trust-700",
    neutral: "text-slate-700",
    negative: "text-coral-700",
    unknown: "text-slate-500"
  }[entry.tone];
  return (
    <>
      <dt className="text-slate-600 sm:pr-2">{label}:</dt>
      <dd className={`font-medium ${toneClass}`}>
        {entry.label}
        {field.note && (
          <span className="mt-0.5 block text-xs font-normal italic text-slate-500">
            {field.note}
          </span>
        )}
      </dd>
    </>
  );
}

const yesNoMap: ValueMap = {
  "yes": { label: "Yes", tone: "positive" },
  "no": { label: "No", tone: "negative" },
  "not-specified": { label: "Not specified", tone: "unknown" }
};

const storageMap: ValueMap = {
  "local-only": { label: "Local only", tone: "positive" },
  "local-first": { label: "Local-first", tone: "positive" },
  "cloud-first": { label: "Cloud-first", tone: "neutral" },
  "hybrid": { label: "Hybrid (local + cloud)", tone: "neutral" },
  "not-specified": { label: "Not specified", tone: "unknown" }
};

const policyMap: ValueMap = {
  "yes": { label: "Published", tone: "positive" },
  "no": { label: "Not published", tone: "negative" },
  "not-specified": { label: "Not specified", tone: "unknown" }
};

const incidentsMap: ValueMap = {
  "none-disclosed": { label: "None disclosed", tone: "neutral" },
  "disclosed": { label: "Disclosed (see note)", tone: "negative" },
  "not-specified": { label: "Not specified", tone: "unknown" }
};

// Pretty-print a URL host as the display label (e.g. "ropetai.com" instead of
// "https://ropetai.com/products/ropet™-ai-comfort-companion-plush-robot").
function prettyHost(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
