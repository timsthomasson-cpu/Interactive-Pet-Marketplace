import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { DetailedCompareTable } from "@/components/detailed-compare-table";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";

export const metadata = {
  title: "Compare Interactive Pets — Side-by-side feature and price comparison",
  description: "A clean side-by-side comparison of every interactive pet and robotic companion on the site: type, audience, features, ratings, and price."
};

export default function ComparePage() {
  return (
    <PageShell>
      <JsonLd
        schema={breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" }
        ])}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Comparison table"
            title="Compare comfort, complexity, and price in one place."
            text="This page is meant to reduce friction for buyers who already know they want an interactive pet but need a clean side-by-side view."
          />
          <DetailedCompareTable items={products} />
        </div>
      </section>
    </PageShell>
  );
}
