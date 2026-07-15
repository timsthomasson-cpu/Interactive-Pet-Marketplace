import Link from "next/link";
import { PageShell } from "./layout";

export type ArticleMeta = {
  tag: "Guide" | "Review" | "Research";
  title: string;
  deck: string;
  date: string;
  readTime: string;
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
        <div className="container-shell max-w-3xl">
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

      {/* Article body */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="container-shell max-w-3xl">
          <div className="prose prose-slate prose-lg max-w-none
            prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-slate-900
            prose-h3:mt-6 prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800
            prose-p:leading-8 prose-p:text-slate-700
            prose-ul:text-slate-700 prose-li:leading-7
            prose-strong:text-slate-900
            prose-a:text-trust-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-amber-400
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600">
            {children}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/** Inline product card for use inside articles */
export function ArticleProductCard({
  slug,
  reason,
  products,
}: {
  slug: string;
  reason: string;
  products: { slug: string; name: string; manufacturer: string; price: string; rating?: number; reviewCount?: number; imageUrl?: string; productUrl?: string }[];
}) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  return (
    <div className="not-prose my-8 flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-soft">
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
          <p className="text-lg font-bold text-slate-900">{p.price}</p>
          <a href={p.productUrl ?? "#"} target="_blank" rel="noopener noreferrer nofollow sponsored"
             className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-2 text-sm font-semibold text-white hover:bg-trust-600">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}
