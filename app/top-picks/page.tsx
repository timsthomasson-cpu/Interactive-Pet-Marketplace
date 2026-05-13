import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
import { CompareTable } from "@/components/sections";

export const metadata = {
  title: "Top Picks — Editor's choice interactive pets",
  description: "Our top-rated interactive pets and AI companions, selected for features, ratings, and value across all price ranges."
};

export default function TopPicksPage() {
  const picks = products.filter((p) => p.flags?.topPick);
  return (
    <PageShell>
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Top picks"
            title="Interactive Pet Marketplace's Top Picks."
            text="Pets with the best features, ratings, and value."
          />
        </div>
      </section>
      <section className="section-pad pt-0">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-3">
            {picks.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
      <CompareTable items={picks} title="Top Picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
