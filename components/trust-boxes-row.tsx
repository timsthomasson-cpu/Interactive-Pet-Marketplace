"use client";
import { useState, useEffect, useRef } from "react";

const ROTATION_MS = 4000;

const items: [string, string][] = [
  ["Comfort & Companionship", "Smart pets can provide gentle interaction and emotional comfort without the demands of a live pet."],
  ["Low Maintenance", "No feeding, walking, litter, or vet visits — a key reason many families start here."],
  ["Easy for Families", "A simple way to add novelty, comfort, or companionship without ongoing care complexity."],
  ["Great Gift Option", "A thoughtful present for parents, grandparents, kids, and pet lovers who want something memorable."]
];

export function TrustBoxesRow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Honor prefers-reduced-motion
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
    if (paused || reducedMotion) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, reducedMotion]);

  // Sync scroll position to index when it changes from auto-advance
  useEffect(() => {
    if (!scrollRef.current) return;
    if (userScrollingRef.current) return;
    const slide = scrollRef.current.children[index] as HTMLElement | undefined;
    if (slide) {
      scrollRef.current.scrollTo({ left: slide.offsetLeft - scrollRef.current.offsetLeft, behavior: "smooth" });
    }
  }, [index]);

  // Track user manual scroll, derive active index from scroll position
  function handleScroll() {
    if (!scrollRef.current) return;
    userScrollingRef.current = true;
    if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
    userScrollTimeoutRef.current = setTimeout(() => {
      userScrollingRef.current = false;
      if (!scrollRef.current) return;
      // Find which child is most centered in the viewport
      const containerCenter = scrollRef.current.scrollLeft + scrollRef.current.clientWidth / 2;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      Array.from(scrollRef.current.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const cardCenter = el.offsetLeft - scrollRef.current!.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      });
      if (nearestIdx !== index) setIndex(nearestIdx);
    }, 150);
  }

  return (
    <section className="pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pt-8 lg:pb-4 bg-white">
      {/* MOBILE: auto-scrolling row with centered "zoom" card */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            // Resume auto-advance after a short delay so the user can read
            setTimeout(() => setPaused(false), 3000);
          }}
          className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory px-[14%] py-4"
          aria-label="Why people choose smart pets"
        >
          {items.map(([title, text], i) => {
            const active = i === index;
            return (
              <div
                key={title}
                className={`snap-center shrink-0 w-[72%] rounded-2xl border bg-trust-50 p-5 transition-all duration-300 ease-out ${
                  active
                    ? "border-trust-400 scale-[1.05] shadow-soft z-10"
                    : "border-trust-200 scale-95 opacity-80"
                }`}
                aria-current={active ? "true" : undefined}
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
