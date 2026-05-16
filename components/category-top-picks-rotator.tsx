"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Product } from "./site-data";
import { ProductCard } from "./product-card";

const ROTATION_MS = 6000;
const FADE_MS = 700;

// Category-aware Top Picks rotator. Crossfades between full ProductCards.
// Used on category pages (Plushy, AI & Robotic, Seniors, Families, Gifts,
// Premium) to highlight the top picks within that category.
//
// Unlike the home-page TopPicksRotator (which shows a stylized image overlay),
// this component renders the actual ProductCard so visitors see the same
// blurb, rating, features, and price they'd see in the product grid below.
//
// The container is sized to the tallest card's height to prevent layout
// jitter when the active card changes. This is measured on mount and on
// window resize.

export function CategoryTopPicksRotator({
  items,
  title = "Top Picks",
  subtitle
}: {
  items: Product[];
  title?: string;
  subtitle?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // prefers-reduced-motion: skip auto-rotation entirely
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Measure the tallest card so the container reserves enough height for
  // any card to render without clipping. Re-measure on resize since
  // ProductCard is responsive.
  useLayoutEffect(() => {
    function measure() {
      const heights = cardRefs.current
        .filter((r): r is HTMLDivElement => r !== null)
        .map((r) => r.offsetHeight);
      if (heights.length > 0) {
        setMaxHeight(Math.max(...heights));
      }
    }
    // Two-frame delay so layout settles before measurement
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(measure);
      return () => cancelAnimationFrame(raf2);
    });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  // Auto-advance
  useEffect(() => {
    if (items.length <= 1) return;
    if (paused || reducedMotion) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, reducedMotion, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="section-pad pt-6 sm:pt-8 pb-6 sm:pb-8"
      aria-label={`${title} for this category`}
    >
      <div className="container-shell">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-600 sm:text-base">{subtitle}</p>
          )}
        </div>

        <div
          ref={containerRef}
          className="relative max-w-lg mx-auto"
          style={maxHeight ? { height: maxHeight } : undefined}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
        >
          {items.map((product, i) => {
            const measured = maxHeight !== null;
            const isActive = i === index;
            // Before measurement, render only the active card in normal flow
            // (so the container gets a natural height to measure from), and
            // render the others absolute-positioned and invisible so they're
            // measurable but don't take layout space.
            const className = measured
              ? "absolute inset-0 transition-opacity ease-in-out"
              : isActive
              ? "transition-opacity ease-in-out"
              : "absolute inset-x-0 top-0 invisible";
            return (
              <div
                key={product.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={className}
                style={{
                  transitionDuration: `${FADE_MS}ms`,
                  opacity: measured ? (isActive ? 1 : 0) : 1,
                  pointerEvents: measured && !isActive ? "none" : "auto",
                  zIndex: isActive ? 10 : 0
                }}
                aria-hidden={measured ? !isActive : undefined}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>

        {items.length > 1 && (
          <div
            className="mt-4 flex justify-center gap-2"
            role="tablist"
            aria-label="Choose top pick"
          >
            {items.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => setIndex(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.name}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-trust-500"
                    : "w-2.5 bg-coral-200 hover:bg-coral-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
