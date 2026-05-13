"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const DEFAULT_DWELL_MS = 4000;
const TRANSITION_MS = 500;

// Per-card dwell overrides (index in the original items array)
const DWELL_OVERRIDES: Record<number, number> = {};

const items: [string, string][] = [
  ["Comfort & Companionship", "Interactive pets can provide gentle interaction and emotional comfort without the demands of a live pet."],
  ["Low Maintenance", "No feeding, walking, litter, or vet visits — a key reason many families start here."],
  ["Easy for Families", "A simple way to add novelty, comfort, or companionship without ongoing care complexity."],
  ["Great Gift Option", "A thoughtful present for parents, grandparents, kids, and pet lovers who want something memorable."]
];

const N = items.length;
// Render two copies. When step reaches N, we silently reset to 0: drop the
// transition, snap translate back to the visually identical first-copy
// position, then re-enable the transition. No native scroll, no scroll-snap,
// no race conditions — just transform math.
const loopItems = [...items, ...items];

const GAP_PX = 12; // tailwind gap-3

function dwellFor(idx: number) {
  return DWELL_OVERRIDES[idx % N] ?? DEFAULT_DWELL_MS;
}

export function TrustBoxesRow() {
  // Logical position 0..N. When it hits N, an effect silently resets it to 0.
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transitioning, setTransitioning] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = step % N;

  // Honor prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Measure viewport and card widths. Both are responsive (% of parent).
  useLayoutEffect(() => {
    function measure() {
      if (viewportRef.current) setViewportWidth(viewportRef.current.offsetWidth);
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance with per-card dwell
  useEffect(() => {
    if (paused || reducedMotion) return;
    if (cardWidth === 0) return; // wait until measured
    const dwell = dwellFor(activeIndex);
    autoTimeoutRef.current = setTimeout(() => {
      setStep((s) => s + 1);
    }, dwell);
    return () => {
      if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current);
    };
  }, [step, paused, reducedMotion, activeIndex, cardWidth]);

  // When step reaches N (the duplicate first card), wait for the transition
  // to finish, then silently jump back to step 0 with the transition disabled.
  // The visual at step=0 is identical to the visual at step=N (it's the same
  // card art in both positions), so the reset is invisible.
  useEffect(() => {
    if (step !== N) return;
    const t = setTimeout(() => {
      setTransitioning(false);
      setStep(0);
      // Re-enable the transition AFTER the browser has applied the reset.
      // Two rAFs are needed so the no-transition style is committed before
      // we re-enable, otherwise the transition would animate the reset.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(true));
      });
    }, TRANSITION_MS + 30);
    return () => clearTimeout(t);
  }, [step]);

  // Compute the track translate. We want the card at index `step` centered in
  // the viewport, so:
  //   translateX = (viewportWidth - cardWidth) / 2 - step * (cardWidth + GAP_PX)
  // The first term centers card 0 at step=0; the second term scrolls left as
  // step increases. We round to whole pixels to avoid sub-pixel rendering
  // artifacts (the original source of the jitter on the previous approach).
  const translateX =
    viewportWidth > 0 && cardWidth > 0
      ? Math.round((viewportWidth - cardWidth) / 2 - step * (cardWidth + GAP_PX))
      : 0;

  // A card counts as "active" if its position in loopItems matches `step`
  // OR if it's the original (index < N) counterpart of the duplicate first
  // card we're currently showing (step === N). Marking both as active during
  // the reset frame means the card at index 0 is ALREADY scaled up when the
  // silent jump from step=N to step=0 happens — no second zoom animation.
  function isActive(i: number) {
    if (i === step) return true;
    if (step === N && i === 0) return true;
    return false;
  }

  return (
    <section className="pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pt-8 lg:pb-4 bg-white">
      {/* MOBILE: transform-based carousel — no native scroll, no snap */}
      <div className="md:hidden">
        <div
          ref={viewportRef}
          className="relative overflow-hidden py-4"
          aria-label="Why people choose interactive pets"
        >
          <div
            className="flex gap-3"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: transitioning ? `transform ${TRANSITION_MS}ms ease-in-out` : "none",
              willChange: "transform",
              visibility: viewportWidth > 0 && cardWidth > 0 ? "visible" : "hidden",
            }}
          >
            {loopItems.map(([title, text], i) => {
              const active = isActive(i);
              // Disable the card's own scale/opacity transition while the
              // track transition is disabled (i.e. during the silent reset).
              // Otherwise the duplicate at index N and the original at index 0
              // visibly hand off the active state, restarting the zoom.
              const cardTransition = transitioning ? "transition-all duration-300 ease-out" : "";
              const headingTransition = transitioning ? "transition-all duration-300" : "";
              return (
                <div
                  key={`${title}-${i}`}
                  ref={i === 0 ? cardRef : undefined}
                  className={`shrink-0 w-[72vw] rounded-2xl border bg-trust-50 p-5 ${cardTransition} ${
                    active
                      ? "border-trust-400 scale-[1.05] shadow-soft z-10"
                      : "border-trust-200 scale-95 opacity-80"
                  }`}
                  aria-hidden={i >= N ? "true" : undefined}
                  aria-current={active && i < N ? "true" : undefined}
                >
                  <h4
                    className={`${headingTransition} ${
                      active
                        ? "text-lg font-bold text-trust-900"
                        : "text-base font-semibold text-trust-900"
                    }`}
                  >
                    {title}
                  </h4>
                  <p
                    className={`mt-2 leading-6 ${headingTransition} ${
                      active
                        ? "text-base font-medium text-slate-700"
                        : "text-sm font-normal text-slate-600"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* DESKTOP: original grid */}
      <div className="hidden md:block container-shell">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-trust-200 bg-trust-50 p-6">
              <h4 className="text-lg font-semibold text-trust-900">{title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
