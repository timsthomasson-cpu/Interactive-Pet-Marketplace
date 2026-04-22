import { FAQSection } from "@/components/faq";
import { PageShell } from "@/components/layout";
import { ComparePreview, FeaturedProducts, ReviewMethod, TrustBlocks } from "@/components/sections";
import { SectionHeading } from "@/components/ui";
export default function Page() {
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Comfort-first options" title="Interactive Pets" text="Explore companion-style interactive pets designed for touch response, simple engagement, and lower maintenance." /></div></section><FeaturedProducts filter="Interactive" /><ComparePreview /><TrustBlocks /><ReviewMethod /><FAQSection /></PageShell>;
}
