import { ReactNode } from "react";

// A longer, content-rich intro for category pages. Replaces the bare
// SectionHeading on the six category pages with paragraphs and an optional
// "What to look for" checklist. Designed for SEO/AEO depth: each page has
// substantive topic coverage rather than a single line of marketing copy.

export type CategoryIntroProps = {
  // Body paragraphs. Pass React nodes so they can include inline links.
  body: ReactNode[];
  // Optional "What to look for" checklist. Each bullet is a [label, body] pair
  // where the label is bolded inline at the start of the body text.
  checklist?: {
    title: string;
    items: [string, string][];
  };
};

export function CategoryIntro({ body, checklist }: CategoryIntroProps) {
  return (
    <section className="pb-6 sm:pb-10">
      <div className="container-shell">
        <div className="max-w-3xl space-y-5 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
          {body.map((p, i) => (
            <div key={i}>{p}</div>
          ))}
        </div>
        {checklist && (
          <div className="mt-8 max-w-3xl rounded-3xl border border-trust-200 bg-trust-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-trust-900 sm:text-2xl">
              {checklist.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {checklist.items.map(([label, text]) => (
                <li key={label} className="text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
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
