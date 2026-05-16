import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ManufacturerZone, ThirdPartyZone } from "@/components/product-privacy-details";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";

// One static page per camera-equipped product. Only products with
// product.privacy data get a page; everything else 404s. Generated at build
// time via generateStaticParams.

type Params = { slug: string };

// Generate one route per camera product. Products without privacy data are
// excluded — they won't have a page at /privacy/[their-slug].
export function generateStaticParams(): Params[] {
  return products
    .filter((p) => p.privacy)
    .map((p) => ({ slug: p.slug }));
}

// Per-page metadata: title and description derived from the product name
// and the neutral summary line. Helps search engines and AI assistants
// understand what each page is about.
export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product || !product.privacy) return {};
  return {
    title: `${product.name} privacy details — ${product.manufacturer}`,
    description: product.privacy.summary
  };
}

export default function PrivacyDetailPage({ params }: { params: Params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product || !product.privacy) {
    notFound();
  }
  const p = product.privacy;

  return (
    <PageShell>
      <JsonLd
        schema={breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
          { name: product.name, path: `/privacy/${product.slug}` }
        ])}
      />

      <section className="pt-10 pb-4 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8">
        <div className="container-shell max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <Link href="/" className="hover:text-trust-700 hover:underline">Home</Link>
            <span aria-hidden className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Privacy</span>
            <span aria-hidden className="mx-2 text-slate-400">/</span>
            <span className="text-slate-700">{product.name}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            {product.imageUrl && (
              <div className="shrink-0 overflow-hidden rounded-2xl border border-coral-200 bg-cream-100 sm:w-40">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="block h-40 w-full object-contain sm:h-40 sm:w-40"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="eyebrow">Privacy details</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                by {product.manufacturer}
              </p>
              <p className="mt-3 text-xs text-slate-500 sm:text-sm">
                Last researched: {p.lastResearched}
              </p>
            </div>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-800 sm:text-lg sm:leading-8">
            {p.summary}
          </p>
        </div>
      </section>

      <section className="pb-8 sm:pb-10">
        <div className="container-shell max-w-4xl space-y-6">
          <ManufacturerZone privacy={p} />
          <ThirdPartyZone findings={p.fromThirdParty} />
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container-shell max-w-4xl">
          <div className="rounded-2xl border border-trust-200 bg-trust-50 p-5 sm:p-6">
            <h2 className="text-lg font-bold tracking-tight text-trust-900 sm:text-xl">
              How to think about this
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              The criteria above are documented buying considerations for any
              connected pet robot. For a full explanation of what each criterion
              means, what to ask before you buy, and steps to take once you own
              the product, see our{" "}
              <Link
                href="/questions#privacy"
                className="font-semibold underline text-trust-700 hover:text-trust-900"
              >
                buyer&rsquo;s guide to camera and privacy questions
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
              {product.productUrl && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600"
                >
                  View {product.name}
                </a>
              )}
              <Link
                href="/questions#privacy"
                className="inline-flex items-center justify-center rounded-full border border-trust-300 bg-white px-5 py-2.5 text-sm font-semibold text-trust-700 transition hover:border-trust-500 hover:text-trust-900"
              >
                Read the privacy guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
