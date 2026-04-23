import { PageShell } from "@/components/layout";
import { ComparePreview, FeaturedProducts, ReviewMethod, TrustBlocks } from "@/components/sections";
import { SectionHeading } from "@/components/ui";
export default function Page() {
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Advanced smart options" title="AI & Robotic Pets" text="Explore more premium robotic pets with motion, sensors, and a more modern presentation." /></div></section><FeaturedProducts filter="AI & Robotic" /><ComparePreview /><TrustBlocks /><ReviewMethod /></PageShell>;
}
