import { PageShell } from "@/components/layout";
import { CompareTable, GroupedProducts, HeroSection, MobileShopPills, ShopByNeed } from "@/components/sections";
import { products } from "@/components/site-data";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import {
  organizationSchema,
  websiteSchema,
  productSchema
} from "@/components/json-ld";

export default function HomePage() {
  // Home page features the top picks via TopPicksRotator. Embed Product
  // schema for each top pick so they can be associated with the home URL
  // in search results. Other products will be schema-tagged on their
  // respective category pages.
  const topPicks = products.filter((p) => p.flags?.topPick && p.imageUrl);

  return (
    <PageShell>
      <JsonLd
        schema={[
          organizationSchema(),
          websiteSchema(),
          ...topPicks.map(productSchema)
        ]}
      />
      <HeroSection />
      <MobileShopPills />
      <ShopByNeed />
      <section className="hidden md:block bg-white pt-2 pb-10 sm:pt-3 sm:pb-12">
        <div className="container-shell">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div className="flex flex-col items-center text-center">
              <Link href="/best-for-seniors" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-8 py-5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">Seniors</Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Calming, comforting companion pets with simple interaction and a gentle learning curve.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Link href="/kids-and-families" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-8 py-5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">Children and Families</Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Playful, engaging interactive pets built for fun, novelty, and everyday family entertainment.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-trust-400"></div>
      <div className="container-shell pt-10 sm:pt-12">
        <h2 className="text-center text-xl leading-tight font-bold tracking-tight text-slate-900 sm:text-3xl">All Products</h2>
      </div>
      <GroupedProducts items={products} hideTopPad />
      <CompareTable items={products} title="All products at a glance" text="A quick scan of every interactive pet on the site — type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
