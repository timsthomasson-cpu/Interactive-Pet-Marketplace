"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_DWELL_MS = 4000;
// Per-card dwell overrides (index in the original 4-item array)
const DWELL_OVERRIDES: Record<number, number> = {};

const items: [string, string][] = [
  ["Comfort & Companionship", "Smart pets can provide gentle interaction and emotional comfort without the demands of a live pet."],
  ["Low Maintenance", "No feeding, walking, litter, or vet visits — a key reason many families start here."],
  ["Easy for Families", "A simple way to add novelty, comfort, or companionship without ongoing care complexity."],
  ["Great Gift Option", "A thoughtful present for parents, grandparents, kids, and pet lovers who want something memorable."]
];

// Doubled list for seamless circular scrolling
const loopItems = [...items, ...items];
const N = items.length;

function dwellFor(idx: number) {
  return DWELL_OVERRIDES[idx % N] ?? DEFAULT_DWELL_MS;
}

export function TrustBoxesRow() {
  // displayIndex: 0..(2N-1), which DOM card is centered
  const [displayIndex, setDisplayIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const autoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userScrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
  // True when we're programmatically scrolling (auto-advance or silent jump);
  // suppresses the user-scroll handler from reacting.
  const programmaticScrollRef = useRef(false);
  const programmaticScrollResetRef = useRef<NodeJS.Timeout | null>(null);
  // Set when a silent wrap has just instant-jumped us to a new position.
  // The next run of the displayIndex effect skips its smooth-scroll so we
  // don't animate a sub-pixel delta over the wrapped position (which snap
  // would then re-correct, producing a visible nudge).
  const justWrappedRef = useRef(false);

  const activeIndex = displayIndex % N;

  // Honor prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll to a given displayIndex with chosen behavior.
  // Does NOT auto-clear programmaticScrollRef — callers manage it via
  // clearProgrammaticAfter() so we can hold the flag across smooth scroll +
  // silent wrap as one atomic sequence.
  const scrollToIndex = useCallback((idx: number, behavior: ScrollBehavior = "smooth") => {
    const container = scrollRef.current;
    if (!container) return;
    const slide = container.children[idx] as HTMLElement | undefined;
    if (!slide) return;
    programmaticScrollRef.current = true;
    // Browser-native centering. Plays correctly with scroll-snap-mandatory,
    // avoiding sub-pixel rounding errors that caused snap to re-correct after
    // our scrollTo and produce a visible wobble.
    slide.scrollIntoView({ behavior, inline: "center", block: "nearest" });
  }, []);

  // Schedule clearing the programmatic flag after a delay
  const clearProgrammaticAfter = useCallback((ms: number) => {
    if (programmaticScrollResetRef.current) clearTimeout(programmaticScrollResetRef.current);
    programmaticScrollResetRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
    }, ms);
  }, []);

  // After mount, position at displayIndex 0 instantly so the first card is centered
  useEffect(() => {
    scrollToIndex(0, "auto");
    clearProgrammaticAfter(50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When displayIndex changes (auto-advance), smooth-scroll to it.
  // If we've moved into the duplicated half (idx >= N), wrap silently AFTER
  // the smooth scroll truly finishes — detected via the `scrollend` event
  // when available, falling back to a generous timeout for older browsers.
  // We hold the programmatic flag across the entire sequence so the user-
  // scroll handler stays inert and can't race the wrap.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // If we just silently jumped here via wrap, don't re-animate to the same
    // position — that would cause a sub-pixel smooth-scroll which snap would
    // re-correct, producing a visible nudge.
    if (justWrappedRef.current) {
      justWrappedRef.current = false;
      // Programmatic flag was held by the wrap; release it now that React
      // has settled at the wrapped index.
      clearProgrammaticAfter(50);
      return;
    }

    scrollToIndex(displayIndex, "smooth");

    if (displayIndex >= N) {
      // Wrap silently once the smooth scroll truly finishes.
      let timeoutHandle: NodeJS.Timeout | null = null;
      let scrollendHandle: (() => void) | null = null;

      const doWrap = () => {
        if (timeoutHandle) clearTimeout(timeoutHandle);
        if (scrollendHandle) container.removeEventListener("scrollend", scrollendHandle);
        const wrappedIdx = displayIndex - N;
        // Mark before we instant-jump so the next effect run skips its scroll.
        justWrappedRef.current = true;
        scrollToIndex(wrappedIdx, "auto");
        setDisplayIndex(wrappedIdx);
      };

      // Prefer the native scrollend event — fires when scroll + snap have
      // both finished. Use a fallback timeout for older browsers.
      if ("onscrollend" in container) {
        scrollendHandle = () => doWrap();
        container.addEventListener("scrollend", scrollendHandle, { once: true });
        // Safety fallback in case scrollend somehow doesn't fire
        timeoutHandle = setTimeout(doWrap, 1200);
      } else {
        timeoutHandle = setTimeout(doWrap, 900);
      }

      return () => {
        if (timeoutHandle) clearTimeout(timeoutHandle);
        if (scrollendHandle) container.removeEventListener("scrollend", scrollendHandle);
      };
    } else {
      // Normal advance — release the flag after the smooth scroll settles.
      clearProgrammaticAfter(900);
    }
  }, [displayIndex, scrollToIndex, clearProgrammaticAfter]);

  // Auto-advance with per-card dwell
  useEffect(() => {
    if (paused || reducedMotion) return;
    const dwell = dwellFor(activeIndex);
    autoTimeoutRef.current = setTimeout(() => {
      setDisplayIndex((i) => i + 1);
    }, dwell);
    return () => {
      if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current);
    };
  }, [displayIndex, paused, reducedMotion, activeIndex]);

  // User scroll handler: when user manually swipes, find the centered card
  // and sync state. If they land in the duplicated half, silently wrap.
  function handleScroll() {
    if (programmaticScrollRef.current) return;
    if (userScrollDebounceRef.current) clearTimeout(userScrollDebounceRef.current);
    userScrollDebounceRef.current = setTimeout(() => {
      const container = scrollRef.current;
      if (!container) return;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const cardCenter = el.offsetLeft - container.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });
      if (nearestIdx !== displayIndex) {
        if (nearestIdx >= N) {
          // User landed in the duplicate half — silently jump back
          const wrappedIdx = nearestIdx - N;
          scrollToIndex(wrappedIdx, "auto");
          clearProgrammaticAfter(50);
          setDisplayIndex(wrappedIdx);
        } else {
          setDisplayIndex(nearestIdx);
        }
      }
    }, 150);
  }

  return (
    <section className="pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pt-8 lg:pb-4 bg-white">
      {/* MOBILE: circular auto-scrolling row with centered "zoom" card */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setPaused(false), 3000);
          }}
          className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory px-[14%] py-4"
          aria-label="Why people choose smart pets"
        >
          {loopItems.map(([title, text], i) => {
            const active = i === displayIndex;
            return (
              <div
                key={`${title}-${i}`}
                className={`snap-center shrink-0 w-[72%] rounded-2xl border bg-trust-50 p-5 transition-all duration-300 ease-out ${
                  active
                    ? "border-trust-400 scale-[1.05] shadow-soft z-10"
                    : "border-trust-200 scale-95 opacity-80"
                }`}
                aria-hidden={i >= N ? "true" : undefined}
                aria-current={active && i < N ? "true" : undefined}
              >
                <h4
                  className={`transition-all duration-300 ${
                    active
                      ? "text-lg font-bold text-trust-900"
                      : "text-base font-semibold text-trust-900"
                  }`}
                >
                  {title}
                </h4>
                <p
                  className={`mt-2 leading-6 transition-all duration-300 ${
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
