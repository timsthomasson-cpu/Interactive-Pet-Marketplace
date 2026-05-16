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
              <Link href="/plushy-companions" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-8 py-5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">Explore Plushy Companions</Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Soft, engaging companion pets with touch response, sounds, and comforting interaction.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Link href="/ai-robotic-pets" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-8 py-5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">Explore AI & Robotic Pets</Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Advanced interactive pets with movement, sensors, app features and interactive behavior.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-trust-400"></div>
      <GroupedProducts items={products} />
      <CompareTable items={products} title="All products at a glance" text="A quick scan of every interactive pet on the site — type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
