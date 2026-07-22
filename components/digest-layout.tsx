import Link from "next/link";
import { PageShell } from "./layout";

export type ArticleMeta = {
  tag: "Guide" | "Review" | "Research";
  title: string;
  deck: string;
  date: string;
  readTime: string;
  /** Optional hero photo shown below the deck/byline, above the article body. */
  heroImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

function TagPill({ tag }: { tag: ArticleMeta["tag"] }) {
  const styles = {
    Guide:    "bg-amber-50 text-amber-600",
    Review:   "bg-trust-50 text-trust-600",
    Research: "bg-purple-50 text-purple-600",
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${styles[tag]}`}>
      {tag}
    </span>
  );
}

export function DigestArticle({
  meta,
  children,
}: {
  meta: ArticleMeta;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      {/* Back link */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container-shell py-3">
          <Link href="/digest" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-trust-600">
            ← Interactive Companion Digest
          </Link>
        </div>
      </div>

      {/* Article hero */}
      <section className="bg-white pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="container-shell max-w-2xl">
          <TagPill tag={meta.tag} />
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{meta.deck}</p>
          <p className="mt-4 text-sm text-slate-400">
            {meta.date} · {meta.readTime} read · Interactive Companion Digest
          </p>
        </div>
      </section>

      {/* Hero image */}
      {meta.heroImage && (
        <section className="bg-white pb-6 sm:pb-8">
          <div className="container-shell max-w-2xl">
            <figure>
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.heroImage.src}
                  alt={meta.heroImage.alt}
                  className="h-auto w-full object-cover"
                />
              </div>
              {meta.heroImage.caption && (
                <figcaption className="mt-2 text-sm text-slate-500">
                  {meta.heroImage.caption}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      {/* Article body */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="container-shell max-w-2xl">
          <div className="prose prose-slate prose-lg max-w-none
            prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-slate-900
            prose-h3:mt-6 prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800
            prose-p:leading-8 prose-p:mb-8 prose-p:text-slate-700
            prose-ul:text-slate-700 prose-li:leading-7
            prose-strong:text-slate-900
            prose-a:text-trust-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-amber-400
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
            prose-hr:my-10 prose-hr:border-slate-200">
            {children}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/** FAQ block for articles — bold question, answer below, full blank-line gap
 * between each pair. Use for any "Frequently asked questions" section. */
export function ArticleFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="not-prose space-y-6">
      {items.map((f) => (
        <div key={f.q}>
          <p className="font-bold text-lg text-slate-900">{f.q}</p>
          <p className="mt-2 text-base leading-7 text-slate-700">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

/** "See our related rankings" link list — royal-blue (#4169E1), bold,
 * underlined. Use for any article's related-rankings callout. */
export function RelatedRankings({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul>
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="font-semibold text-[#4169E1] underline hover:text-[#3457c4]">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Inline product card for use inside articles */
export function ArticleProductCard({
  slug,
  reason,
  products,
  tint = "slate",
}: {
  slug: string;
  reason: string;
  products: { slug: string; name: string; manufacturer: string; price: string; rating?: number; reviewCount?: number; imageUrl?: string; productUrl?: string; priceLastChecked?: string; ratingLastChecked?: string }[];
  /** "slate" (default) or "blue" — matches the docx's "light-blue product card" suggestion */
  tint?: "slate" | "blue";
}) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  const wrap = tint === "blue" ? "border-trust-200 bg-trust-50" : "border-slate-100 bg-slate-50";
  return (
    <div className={`not-prose my-8 flex gap-4 rounded-2xl border p-4 shadow-soft ${wrap}`}>
      {p.imageUrl && (
        <div className="hidden sm:block w-32 flex-shrink-0 overflow-hidden rounded-xl">
          <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{p.manufacturer}</p>
          <p className="text-lg font-bold text-slate-900">{p.name}</p>
          {p.rating && (
            <p className="text-sm text-amber-400">{"★".repeat(Math.round(p.rating))}
              <span className="ml-1 text-slate-500">{p.rating.toFixed(1)} {p.reviewCount && `(${p.reviewCount.toLocaleString()} reviews)`}</span>
            </p>
          )}
          <p className="mt-1 text-sm italic text-slate-600">{reason}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">{p.price}</p>
            {/* Pulled from the Product Matrix, not hand-typed — keeps this from
                going stale the way a hardcoded price/rating in prose would. */}
            {(p.priceLastChecked || p.ratingLastChecked) && (
              <p className="text-[11px] text-slate-400">
                {p.priceLastChecked && `Price checked ${p.priceLastChecked}`}
                {p.priceLastChecked && p.ratingLastChecked && " · "}
                {p.ratingLastChecked && `Rating checked ${p.ratingLastChecked}`}
              </p>
            )}
          </div>
          <a href={p.productUrl ?? "#"} target="_blank" rel="noopener noreferrer nofollow sponsored"
             className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-2 text-sm font-semibold text-white hover:bg-trust-600">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

/** JSON-LD Product block for an in-article product recommendation — makes
 * price/rating machine-readable to search engines instead of relying on
 * prose text, which is the fix for "hardcoded price & rating" staleness. */
export function ArticleProductJsonLd({
  slug,
  products,
}: {
  slug: string;
  products: { slug: string; name: string; manufacturer: string; price: string; rating?: number; reviewCount?: number; productUrl?: string; priceLastChecked?: string }[];
}) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  const price = p.price.replace(/[^0-9.]/g, "");
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: p.manufacturer },
    ...(p.productUrl ? { url: p.productUrl } : {}),
    ...(price ? {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        // Not setting priceValidUntil: that field means "valid until this
        // future date," and we only have a last-checked (past) date. Using
        // it here would misstate what we actually know.
      },
    } : {}),
    ...(p.rating ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(p.rating),
        reviewCount: String(p.reviewCount ?? 1),
        bestRating: "5",
        worstRating: "1",
      },
    } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
