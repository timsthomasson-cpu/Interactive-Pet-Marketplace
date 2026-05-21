'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 loader.
 *
 * Reads the Measurement ID from NEXT_PUBLIC_GA_MEASUREMENT_ID.
 * If the env var is missing (e.g., local dev without GA configured),
 * this component renders nothing and GA does not load.
 *
 * Enhanced Measurement (configured in the GA4 dashboard) automatically
 * tracks outbound clicks to external domains — including affiliate links
 * to Amazon, manufacturer sites, etc. No per-link instrumentation needed.
 */
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
