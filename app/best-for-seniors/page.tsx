import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import Link from "next/link";
export default function SeniorsPage() {
  const picks = products.filter((p)=>p.bestFor.some((tag)=>["Seniors","Senior loved ones","Gift buyers"].includes(tag)));
  return <PageShell><section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10"><div className="container-shell"><div className="max-w-3xl"><p className="eyebrow">Senior-friendly picks</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Best smart pets for seniors and senior loved ones.</h2><p className="mt-4 text-lg leading-8 text-slate-600">This page is structured for adult children shopping for parents, as well as older buyers who want companionship with minimal complexity.</p><p className="mt-4 text-lg leading-8 text-slate-600">Research has shown that Interactive Pets can improve the lives of seniors by reducing loneliness and social isolation, as well as decreasing agitation and anxiety. (<Link href="/senior-research" className="underline text-trust-700 hover:text-trust-900">See a list of articles.</Link>)</p></div></div></section><TrustBoxesRow /><GroupedProducts items={picks} pageName="Seniors" /><CompareTable items={picks} title="Senior picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." /></PageShell>;
}
