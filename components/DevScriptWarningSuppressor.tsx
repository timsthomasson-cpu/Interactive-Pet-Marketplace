"use client";

/**
 * Silences a known-safe React 19 / Next.js dev-console warning:
 *
 *   "Encountered a script tag while rendering React component. Scripts
 *   inside React components are never executed when rendering on the client."
 *
 * We intentionally render raw <script> tags in a few places (JsonLd in
 * components/json-ld.tsx, ImpactVerification.tsx) because that's Next.js's
 * own documented pattern for JSON-LD structured data and for tags that must
 * be present in the raw server HTML (see ImpactVerification.tsx for why).
 * React 19 warns about this pattern regardless of whether the script is a
 * Server Component or intentional, so the warning is a false positive here
 * — see https://nextjs.org/docs/app/guides/json-ld, which still recommends
 * this exact pattern as of Next.js 16.
 *
 * This runs at module-evaluation time (not inside an effect) so it's in
 * place before React starts hydrating and can emit the warning. Dev only —
 * has no effect in production builds.
 */
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError(...args);
  };
}

export default function DevScriptWarningSuppressor() {
  return null;
}
