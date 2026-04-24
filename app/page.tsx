import { PageShell } from "@/components/layout";
import { FeaturedProducts, HeroSection, ShopByNeed } from "@/components/sections";
import Link from "next/link";
export default function HomePage() {
  return <PageShell><HeroSection /><ShopByNeed /><section className="section-pad pt-6 sm:pt-8 lg:pt-10"><div className="container-shell"><div className="grid gap-10 sm:grid-cols-2 sm:gap-16"><div className="flex flex-col items-center text-center"><Link href="/interactive-pets" className="btn-primary !px-8 !py-5 !text-base">Explore Plushy Companions</Link><p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Soft, engaging companion pets with touch response, sounds, and comforting interaction.</p></div><div className="flex flex-col items-center text-center"><Link href="/ai-robotic-pets" className="btn-primary !px-8 !py-5 !text-base">Explore AI & Robotic Pets</Link><p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Advanced smart pets with movement, sensors, app features and interactive behavior.</p></div></div></div></section><FeaturedProducts /></PageShell>;
}
