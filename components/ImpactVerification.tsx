'use client';

import Script from 'next/script';

/**
 * impact.com site-verification / universal tracking tag.
 *
 * Per impact.com's setup instructions, this belongs on the homepage only
 * (not site-wide like GoogleAnalytics/FacebookPixel) — it's how they verify
 * ownership of the site and track impressions for the affiliate program.
 */
export default function ImpactVerification() {
  return (
    <Script id="impact-verification" strategy="afterInteractive">
      {`(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7508034-744b-4cb2-88de-47b39dbcf8d61.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`}
    </Script>
  );
}
