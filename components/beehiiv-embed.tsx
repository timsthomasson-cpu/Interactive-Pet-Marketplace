'use client';

import { useEffect, useRef } from 'react';

/**
 * Beehiiv newsletter signup embed.
 * Appends the loader script directly into a container div so Beehiiv's
 * script can find a local DOM target and inject the form inline.
 * The container is full-width so the form input stretches edge to edge.
 */
export function BeehiivEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Avoid double-loading if component re-renders
    if (container.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
    script.async = true;
    script.setAttribute('data-beehiiv-form', '0a73b754-eb8e-49c8-bb4e-eb900d9fa0c0');
    container.appendChild(script);
  }, []);

  return <div ref={containerRef} style={{ width: '100%' }} />;
}
