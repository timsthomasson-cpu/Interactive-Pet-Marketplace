"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "./site-data";

const ROTATION_MS = 5000;

export function TopPicksRotator() {
  const topPicks = products.filter((p) => p.flags?.topPick && p.imageUrl);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (topPicks.length <= 1) return;
    if (paused || reducedMotion) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % topPicks.length);
    }, ROTATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, reducedMotion, topPicks.length]);

  if (topPicks.length === 0) {
    return null;
  }

  const current = topPicks[index];

  return (
    <div
      className="card p-5 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Featured top picks"
    >
      <div className="relative overflow-hidden rounded-3xl border border-coral-200 bg-cream-100" style={{ aspectRatio: "1 / 1" }}>
        {topPicks.map((product, i) => (
          <Link
            key={product.slug}
            href={product.productUrl || "#"}
            target={product.productUrl ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="block h-full w-full object-cover"
            />
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-trust-500 px-3 py-1.5 text-xs font-bold text-white shadow-soft">
              ★ Top Pick
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-90">{product.manufacturer}</p>
              <p className="text-xl font-semibold">{product.name}</p>
              {product.price && <p className="text-sm opacity-90 mt-0.5">{product.price}</p>}
            </div>
          </Link>
        ))}
      </div>
      {topPicks.length > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Choose featured product">
          {topPicks.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${p.name}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-trust-500" : "w-2.5 bg-coral-200 hover:bg-coral-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
