import { ProductPrivacy, ProductPrivacyField, ThirdPartyFinding } from "./site-data";

// Presentational helpers for the dedicated per-product privacy page.
// Originally these lived inside a card-level accordion; that has been
// retired in favor of dedicated /privacy/[slug] pages. The two zone
// components (ManufacturerZone, ThirdPartyZone) are now used by
// app/privacy/[slug]/page.tsx to compose the page.

// ────────────────────────────────────────────────────────────────────
// Manufacturer zone
// ────────────────────────────────────────────────────────────────────

export function ManufacturerZone({ privacy }: { privacy: ProductPrivacy }) {
  const m = privacy.fromManufacturer;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        From the manufacturer
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Facts directly stated on the manufacturer&rsquo;s product page or in
        their privacy policy. Where the manufacturer doesn&rsquo;t document a
        criterion, the value is shown as &ldquo;Not specified.&rdquo;
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 text-sm leading-7 sm:grid-cols-[max-content_1fr] sm:text-base">
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
        <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-700">Manufacturer sources:</p>
          <ul className="mt-2 space-y-1.5">
            {privacy.manufacturerSources.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-trust-700 hover:text-trust-900 break-all"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// Third-party zone
// ────────────────────────────────────────────────────────────────────

export function ThirdPartyZone({ findings }: { findings: ThirdPartyFinding[] }) {
  if (findings.length === 0) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        From independent reviews
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Findings reported by Tier 1 sources (Mozilla Privacy Not Included,
        Consumer Reports, FTC) or established tech and security publications.
      </p>

      <ul className="mt-5 space-y-5">
        {findings.map((f, i) => (
          <li key={i} className="text-sm leading-7 text-slate-700 sm:text-base">
            <p>{f.finding}</p>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
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
            {f.note && (
              <p className="mt-2 text-xs italic text-slate-500 sm:text-sm">
                {f.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
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
      <dt className="font-medium text-slate-600 sm:pr-2">{label}:</dt>
      <dd className={`font-semibold ${toneClass}`}>
        {entry.label}
        {field.note && (
          <span className="mt-1 block text-xs font-normal italic text-slate-500 sm:text-sm">
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
