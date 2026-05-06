import { PageShell } from "@/components/layout";
import { CompareTable, FeaturedProducts, TrustBlocks } from "@/components/sections";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
export default function Page() {
  const items = products.filter((p) => p.type === "AI & Robotic");
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Advanced smart options" title="AI & Robotic Pets" text="Explore more premium robotic pets with motion, sensors, and a more modern presentation." /></div></section><FeaturedProducts filter="AI & Robotic" /><CompareTable items={items} title="AI & Robotic Pets at a glance" text="Quickly scan type, audience, highlight, rating, and price." /><TrustBlocks /></PageShell>;
}
