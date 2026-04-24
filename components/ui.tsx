import Link from "next/link";
import { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, text, align = "left" }: { eyebrow?: string; title: string; text?: string; align?: "left" | "center"; }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p> : null}
    </div>
  );
}
export function CTAButtons() {
  return <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/compare" className="btn-primary">Compare Models</Link><Link href="/best-for-seniors" className="btn-secondary">Explore Best for Seniors</Link></div>;
}
export function PlaceholderVisual({ label }: { label: string }) {
  return <div className="gradient-tile relative overflow-hidden rounded-3xl border border-coral-200 p-6"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,143,26,0.18),transparent_18%),radial-gradient(circle_at_25%_75%,rgba(240,153,123,0.14),transparent_22%)]" /><div className="relative flex h-56 items-end rounded-[2rem] border border-white/70 bg-white/40 p-5 backdrop-blur"><div><div className="mb-3 inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-800">Product image placeholder</div><p className="text-xl font-semibold text-slate-900">{label}</p><p className="mt-2 max-w-sm text-sm text-slate-700">Swap this block for a real product image later without changing the layout.</p></div></div></div>;
}
export function Badge({ children }: { children: ReactNode }) { return <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">{children}</span>; }
