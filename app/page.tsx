import { FAQSection } from "@/components/faq";
import { PageShell } from "@/components/layout";
import { ComparePreview, FeaturedProducts, HeroSection, ReviewMethod, ShopByNeed, TrustBlocks, TwoCategoryCards } from "@/components/sections";
import Link from "next/link";
export default function HomePage() {
  return <PageShell><HeroSection /><ShopByNeed /><FeaturedProducts /><ComparePreview /><TrustBlocks /><ReviewMethod /><FAQSection /><section className="section-pad pt-0"><div className="container-shell"><div className="card overflow-hidden bg-slate-900 p-10 text-white"><p className="eyebrow !text-brand-200">Final call to action</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to find the right smart pet?</h2><p className="mt-4 max-w-2xl text-lg text-slate-300">Browse top-rated picks and compare the best options for comfort, companionship, and fun.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/compare" className="btn-primary !bg-white !text-slate-900 hover:!bg-slate-100">Shop Top Picks</Link><Link href="/reviews" className="btn-secondary !border-slate-700 !bg-slate-900 !text-white hover:!border-slate-500">Read Reviews</Link></div></div></div></section></PageShell>;
}
