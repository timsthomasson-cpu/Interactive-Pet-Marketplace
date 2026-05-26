'use client';

import Script from 'next/script';

/**
 * Beehiiv newsletter signup embed.
 * Uses next/script with strategy="afterInteractive" so it loads
 * after the page is interactive without blocking render.
 */
export function BeehiivEmbed() {
  return (
    <Script
      src="https://subscribe-forms.beehiiv.com/v3/loader.js"
      data-beehiiv-form="0a73b754-eb8e-49c8-bb4e-eb900d9fa0c0"
      strategy="afterInteractive"
    />
  );
}
