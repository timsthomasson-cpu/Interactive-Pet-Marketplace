import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { DetailedCompareTable } from "@/components/detailed-compare-table";
export default function ComparePage() {
  return <PageShell><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Comparison table" title="Compare comfort, complexity, and price in one place." text="This page is meant to reduce friction for buyers who already know they want a smart pet but need a clean side-by-side view." /><DetailedCompareTable items={products} /></div></section></PageShell>;
}
