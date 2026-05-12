"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import { products, Product } from "./site-data";
import { GroupedProducts } from "./sections";

// Wizard answer types
type Audience = "senior" | "child" | "family" | "any";
type Style = "fluffy" | "robotic" | "either";

const AUDIENCE_OPTIONS: { value: Audience; label: string; sublabel: string }[] = [
  { value: "senior", label: "A senior loved one",  sublabel: "Grandparents, parents, older relatives" },
  { value: "child",  label: "A child",             sublabel: "Kids, grandkids, nieces, nephews" },
  { value: "family", label: "A whole family",      sublabel: "Something to enjoy together" },
  { value: "any",    label: "I'm shopping around", sublabel: "Show me everything" }
];

const STYLE_OPTIONS: { value: Style; label: string; sublabel: string }[] = [
  { value: "fluffy",  label: "Cuddly & soft",      sublabel: "Plushy companion pets — gentle touch and sounds" },
  { value: "robotic", label: "Interactive robot",  sublabel: "Movement, sensors, app features, more high-tech" },
  { value: "either",  label: "Either one",         sublabel: "Show me both" }
];

// Helper: parse price string (e.g., "$199.99") to number, or null if unparseable.
function parsePriceNum(p: string): number | null {
  if (!p) return null;
  const cleaned = p.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

// Sort: top picks first, then by price descending, then unpriced products last.
function sortGiftProducts(items: Product[]): Product[] {
  return items.slice().sort((a, b) => {
    const aTop = a.flags?.topPick ? 1 : 0;
    const bTop = b.flags?.topPick ? 1 : 0;
    if (aTop !== bTop) return bTop - aTop;
    const aPrice = parsePriceNum(a.price);
    const bPrice = parsePriceNum(b.price);
    if (aPrice === null && bPrice === null) return 0;
    if (aPrice === null) return 1;
    if (bPrice === null) return -1;
    return bPrice - aPrice;
  });
}

// Q2 only appears for child / family
function audienceNeedsStyle(a: Audience | null): boolean {
  return a === "child" || a === "family";
}

export function GiftWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read state from URL
  const audience = useMemo<Audience | null>(() => {
    const v = searchParams.get("for");
    return v === "senior" || v === "child" || v === "family" || v === "any" ? v : null;
  }, [searchParams]);

  const style = useMemo<Style | null>(() => {
    const v = searchParams.get("style");
    return v === "fluffy" || v === "robotic" || v === "either" ? v : null;
  }, [searchParams]);

  // Update URL when wizard state changes. Use replace so back-button cycles
  // through wizard steps cleanly. shallow=false isn't supported in app router;
  // pushing a query-only URL doesn't refetch server data here since the page
  // is static — this is just a query-string update.
  const updateParams = useCallback(
    (next: { for?: Audience | null; style?: Style | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      if ("for" in next) {
        if (next.for) params.set("for", next.for);
        else params.delete("for");
      }
      if ("style" in next) {
        if (next.style) params.set("style", next.style);
        else params.delete("style");
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  function pickAudience(a: Audience) {
    // Picking audience resets style — Senior/Any paths don't use style,
    // and Child/Family should re-prompt rather than reuse a stale choice.
    updateParams({ for: a, style: null });
  }

  function pickStyle(s: Style) {
    updateParams({ style: s });
  }

  function startOver() {
    updateParams({ for: null, style: null });
  }

  // Compute filtered + sorted products
  const filtered = useMemo(() => {
    let items = products.filter((p) => p.flags?.gifts);

    if (audience === "senior") {
      items = items.filter((p) => p.bestFor.includes("Seniors"));
    } else if (audience === "child") {
      items = items.filter((p) => p.bestFor.includes("Children"));
    } else if (audience === "family") {
      items = items.filter((p) => p.bestFor.includes("Families"));
    }
    // audience === "any" or null: no audience filter

    if (audienceNeedsStyle(audience) && style && style !== "either") {
      const targetType = style === "fluffy" ? "Interactive" : "AI & Robotic";
      items = items.filter((p) => p.type === targetType);
    }

    return sortGiftProducts(items);
  }, [audience, style]);

  const showQ2 = audienceNeedsStyle(audience);
  const q2NotAnswered = showQ2 && !style;

  // Short label describing the current filter for the results header
  const resultsLabel = useMemo(() => {
    if (!audience) return "All gifts";
    const parts: string[] = [];
    if (audience === "senior") parts.push("Senior gifts");
    else if (audience === "child") parts.push("Gifts for children");
    else if (audience === "family") parts.push("Family gifts");
    else if (audience === "any") parts.push("All gifts");
    if (showQ2 && style && style !== "either") {
      parts.push(style === "fluffy" ? "Cuddly & soft" : "Interactive robots");
    }
    return parts.join(" · ");
  }, [audience, style, showQ2]);

  return (
    <>
      {/* Wizard panel */}
      <section className="pt-2 pb-6 sm:pt-4 sm:pb-8">
        <div className="container-shell">
          <div className="rounded-3xl border border-coral-200 bg-cream-50 p-5 sm:p-8 shadow-soft">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="eyebrow">Gift wizard</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Find the right gift in a couple of taps
                </h2>
              </div>
              {(audience || style) && (
                <button
                  onClick={startOver}
                  className="text-sm font-semibold text-trust-700 underline hover:text-trust-900"
                >
                  Start over
                </button>
              )}
            </div>

            {/* Q1 */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-brand-700">Step 1 · Who's the gift for?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {AUDIENCE_OPTIONS.map((opt) => {
                  const active = audience === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => pickAudience(opt.value)}
                      aria-pressed={active}
                      className={`text-left rounded-2xl border p-4 transition ${
                        active
                          ? "border-trust-500 bg-trust-50 ring-2 ring-trust-500"
                          : "border-coral-200 bg-white hover:border-trust-300 hover:bg-trust-50/40"
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                      <div className="mt-1 text-xs text-slate-600">{opt.sublabel}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q2 — only after Q1 answered, only for child/family */}
            {showQ2 && (
              <div className="mt-6 border-t border-coral-200 pt-6">
                <p className="text-sm font-semibold text-brand-700">
                  Step 2 · {audience === "child" ? "What's the vibe?" : "Robot or companion?"}
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {STYLE_OPTIONS.map((opt) => {
                    const active = style === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => pickStyle(opt.value)}
                        aria-pressed={active}
                        className={`text-left rounded-2xl border p-4 transition ${
                          active
                            ? "border-trust-500 bg-trust-50 ring-2 ring-trust-500"
                            : "border-coral-200 bg-white hover:border-trust-300 hover:bg-trust-50/40"
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                        <div className="mt-1 text-xs text-slate-600">{opt.sublabel}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live result count */}
            <p className="mt-6 text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "match" : "matches"}
              {audience ? ` · ${resultsLabel}` : ""}
              {q2NotAnswered ? " · pick a style above to narrow further" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      {filtered.length > 0 ? (
        <GroupedProducts items={filtered} pageName="Gifts" />
      ) : (
        <section className="section-pad pt-10">
          <div className="container-shell">
            <div className="rounded-3xl border border-coral-200 bg-white p-10 text-center shadow-soft">
              <p className="text-lg font-semibold text-slate-900">
                No gifts match this combination yet.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Try a different style, or{" "}
                <button onClick={startOver} className="font-semibold text-trust-700 underline hover:text-trust-900">
                  start over
                </button>.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
