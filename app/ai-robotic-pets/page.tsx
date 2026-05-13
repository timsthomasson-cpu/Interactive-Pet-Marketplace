import { PageShell } from "@/components/layout";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";

export const metadata = {
  title: "AI & Robotic Pets — Smart interactive companions",
  description: "Advanced robotic pets with motion, sensors, app features, and AI-driven behavior. Compare ratings, features, and prices."
};

export default function Page() {
  const items = products.filter((p) => p.type === "AI & Robotic");
  return (
    <PageShell>
      <section className="section-pad pb-2 sm:pb-3">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Advanced smart options"
            title="AI & Robotic Pets"
            text="Explore more premium robotic pets with motion, sensors, and a more modern presentation."
          />
        </div>
      </section>
      <TrustBoxesRow />
      <GroupedProducts items={items} pageName="AI & Robotic Pets" />
      <CompareTable items={items} title="AI & Robotic Pets at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
