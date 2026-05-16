import { ReactNode } from "react";
import { Product } from "./site-data";
import { CategoryTopPicksRotator } from "./category-top-picks-rotator";

// Combined header for category pages. Arranges:
//   - On lg+ (≥1024px): rotator on the left half, intro paragraphs on the
//     right half. Both columns top-aligned so the rotator anchors the row
//     height; whichever column is shorter sits with whitespace below it.
//   - On sm/md (<lg): rotator on top, then intro paragraphs, then checklist.
//
// The "What to look for" checklist always renders full-width below the
// two-column row. Splitting it off keeps the right-column reading area
// uncluttered and lets the checklist breathe at a larger width where the
// shorter bullets are easier to scan.
//
// When `topPicks` is empty (no category top picks), the rotator column is
// omitted and the intro paragraphs take the full content width — preserving
// the previous one-column behavior for that case.

export type CategoryHeaderProps = {
  topPicks: Product[];
  // Section-heading label used for the rotator's aria-label only (not shown).
  rotatorTitle?: string;
  // Body paragraphs for the intro. Same shape as CategoryIntro.
  body: ReactNode[];
  // Optional "What to look for" checklist, rendered full-width below.
  checklist?: {
    title: string;
    items: [string, string][];
  };
};

export function CategoryHeader({
  topPicks,
  rotatorTitle = "Top Picks",
  body,
  checklist
}: CategoryHeaderProps) {
  const hasRotator = topPicks.length > 0;

  return (
    <section className="pt-1 sm:pt-2 pb-6 sm:pb-10">
      <div className="container-shell">
        <div
          className={
            hasRotator
              ? "lg:grid lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-8 lg:items-start"
              : ""
          }
        >
          {hasRotator && (
            <div className="mb-8 lg:mb-0">
              <CategoryTopPicksRotator
                items={topPicks}
                title={rotatorTitle}
              />
            </div>
          )}
          <div className="max-w-3xl space-y-5 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            {body.map((p, i) => (
              <div key={i}>{p}</div>
            ))}
          </div>
        </div>

        {checklist && (
          <div className="mt-10 max-w-3xl rounded-3xl border border-trust-200 bg-trust-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-trust-900 sm:text-2xl">
              {checklist.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {checklist.items.map(([label, text]) => (
                <li
                  key={label}
                  className="text-sm leading-7 text-slate-700 sm:text-base sm:leading-8"
                >
                  <span className="font-semibold text-slate-900">{label}.</span>{" "}
                  {text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
