"use client";
import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";

const DEFAULT_DWELL_MS = 4000;
const TRANSITION_MS = 500;
const GAP_PX = 12; // tailwind gap-3

// Per-card dwell overrides (rarely used; index is in the original items array)
const DWELL_OVERRIDES: Record<number, number> = {};

type TrustItem = [string, string]; // [title, body]

// Preset variants so each page can show distinct trust messages.
// This avoids Google's duplicate-content signal that comes from rendering
// the same four trust boxes on every category page.
const DEFAULT_ITEMS: TrustItem[] = [
  ["Comfort & Companionship", "Interactive pets can provide gentle interaction and emotional comfort without the demands of a live pet."],
  ["Low Maintenance", "No feeding, walking, litter, or vet visits — a key reason many families start here."],
  ["Easy for Families", "A simple way to add novelty, comfort, or companionship without ongoing care complexity."],
  ["Great Gift Option", "A thoughtful present for parents, grandparents, kids, and pet lovers who want something memorable."]
];

const PLUSHY_ITEMS: TrustItem[] = [
  ["Soft & Soothing", "Plush companions offer gentle tactile comfort — a calming presence for quiet moments and bedtime."],
  ["No Setup Required", "Most plushy companions are ready out of the box. No apps, no Wi-Fi, no learning curve."],
  ["Allergy-Friendly", "No fur shedding, no dander, no fleas. A practical option for sensitive households."],
  ["Affordable Comfort", "Plushy companions are often the most budget-friendly entry point into the category."]
];

const AI_ROBOTIC_ITEMS: TrustItem[] = [
  ["Lifelike Interaction", "AI and robotic pets respond to touch, sound, and presence with movement and personality."],
  ["Advanced Features", "Sensors, app integration, and adaptive behavior give a richer interactive experience over time."],
  ["Conversation & Play", "Some models hold simple conversations, play games, or respond to voice commands."],
  ["Modern Companion", "A good fit for tech-curious buyers and anyone who wants more than a static plush toy."]
];

const SENIORS_ITEMS: TrustItem[] = [
  ["Reduces Loneliness", "Research suggests companion pets can help reduce social isolation in older adults living alone or in care."],
  ["Calm for Dementia Care", "Studies show animatronic pets can ease agitation and bring comfort to people with dementia."],
  ["No Caregiving Burden", "No feeding, walking, or vet visits — and no fall risk from a leash or excited live pet."],
  ["Easy to Use", "Senior-friendly designs prioritize simple touch and sound interactions over complex tech."]
];

const FAMILIES_ITEMS: TrustItem[] = [
  ["Playful Companions", "Engaging companions designed to entertain kids and bring families together."],
  ["Builds Nurturing Habits", "A safe way for children to practice caring for something — without live-pet responsibilities."],
  ["Safer Than Live Pets", "No bites, no scratches, no allergies. A first-pet experience without the risk."],
  ["Sparks Imagination", "Open-ended play that supports curiosity, empathy, and emotional learning."]
];

const GIFTS_ITEMS: TrustItem[] = [
  ["Memorable Gifts", "Interactive pets stand out from typical presents — recipients tend to remember who gave them."],
  ["Broad Age Appeal", "Choices for grandparents, parents, kids, and pet lovers — many models work across generations."],
  ["Ready Out of the Box", "Most arrive with batteries included and start working the moment they're unwrapped."],
  ["Thoughtful Touch", "A gift that acknowledges someone's situation — loneliness, allergies, housing limits — with warmth."]
];

const PREMIUM_ITEMS: TrustItem[] = [
  ["Most Advanced Tech", "Premium models offer the most sophisticated movement, sensors, and AI-driven behavior available."],
  ["Designed to Last", "Higher build quality, better materials, and more comprehensive warranties than entry-level options."],
  ["Richer Interaction", "Multi-modal AI, camera features, and adaptive learning — closest you'll get to a real pet experience."],
  ["For Discerning Buyers", "When budget isn't the deciding factor and you want the best of what the category offers."]
];

export type TrustBoxesVariant =
  | "default"
  | "plushy"
  | "ai-robotic"
  | "seniors"
  | "families"
  | "gifts"
  | "premium";

const VARIANTS: Record<TrustBoxesVariant, TrustItem[]> = {
  "default": DEFAULT_ITEMS,
  "plushy": PLUSHY_ITEMS,
  "ai-robotic": AI_ROBOTIC_ITEMS,
  "seniors": SENIORS_ITEMS,
  "families": FAMILIES_ITEMS,
  "gifts": GIFTS_ITEMS,
  "premium": PREMIUM_ITEMS
};

function dwellFor(idx: number, n: number) {
  return DWELL_OVERRIDES[idx % n] ?? DEFAULT_DWELL_MS;
}

export function TrustBoxesRow({ variant = "default" }: { variant?: TrustBoxesVariant }) {
  const items = useMemo(() => VARIANTS[variant] ?? DEFAULT_ITEMS, [variant]);
  const N = items.length;
  // Render two copies. When step reaches N, we silently reset to 0: drop the
  // transition, snap translate back to the visually identical first-copy
  // position, then re-enable the transition. No native scroll, no scroll-snap,
  // no race conditions — just transform math.
  const loopItems = useMemo(() => [...items, ...items], [items]);

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
    const dwell = dwellFor(activeIndex, N);
    autoTimeoutRef.current = setTimeout(() => {
      setStep((s) => s + 1);
    }, dwell);
    return () => {
      if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current);
    };
  }, [step, paused, reducedMotion, activeIndex, cardWidth, N]);

  // When step reaches N (the duplicate first card), wait for the transition
  // to finish, then silently jump back to step 0 with the transition disabled.
  useEffect(() => {
    if (step !== N) return;
    const t = setTimeout(() => {
      setTransitioning(false);
      setStep(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(true));
      });
    }, TRANSITION_MS + 30);
    return () => clearTimeout(t);
  }, [step, N]);

  const translateX =
    viewportWidth > 0 && cardWidth > 0
      ? Math.round((viewportWidth - cardWidth) / 2 - step * (cardWidth + GAP_PX))
      : 0;

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
