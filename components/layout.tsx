"use client";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

const mainNav = [
  { href:"/", label:"Home" },
  { href:"/interactive-pets", label:"Plushy Companions" },
  { href:"/ai-robotic-pets", label:"AI & Robotic Pets" }
];
const shopForNav = [
  { href:"/best-for-seniors", label:"Seniors" },
  { href:"/kids-and-families", label:"Kids & Families" },
  { href:"/best-for-gifts", label:"Gifts" },
  { href:"/premium-picks", label:"Premium Picks" }
];
const tailNav = [
  { href:"/compare", label:"Compare" },
  { href:"/questions", label:"Questions?" }
];

function ShopForDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-brand-700"
      >
        Shop for
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2">
          <div className="rounded-xl border border-coral-200 bg-white py-2 shadow-soft">
            {shopForNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-trust-50 hover:text-trust-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const allMobileNav = [...mainNav, ...shopForNav, ...tailNav];
  const headerRef = useRef<HTMLElement>(null);

  // Publish the header's pixel height as a CSS variable so any sticky element
  // on the page can pin itself directly below the header without hardcoding
  // a pixel value. ResizeObserver keeps this current across rotation,
  // font-size changes, etc.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = headerRef.current;
    if (!el) return;
    function publish() {
      const h = el!.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    }
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-coral-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-lg text-white">🐾</div>
          <div>
            <div className="text-sm font-semibold text-brand-700">Interactive Pets Marketplace</div>
            <div className="hidden sm:block text-xs text-slate-500">Interactive & AI companion guides</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {mainNav.map((item)=><Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-700">{item.label}</Link>)}
          <ShopForDropdown />
          {tailNav.map((item)=><Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-700">{item.label}</Link>)}
        </nav>
        <Link href="/top-picks" className="hidden sm:inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">Shop Top Picks</Link>
      </div>
      {/* Mobile pills nav: horizontally scrollable */}
      <nav className="lg:hidden border-t border-coral-100 bg-white">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5">
          {allMobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-coral-200 bg-cream-50 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-trust-400 hover:bg-trust-50 hover:text-trust-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
export function StickyCompareBar() {
  return <div className="fixed bottom-4 left-0 right-0 z-40"><div className="container-shell"><div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border border-coral-200 bg-white px-4 py-3 shadow-soft"><div><p className="text-sm font-semibold text-brand-900">Need a faster decision?</p><p className="text-xs text-slate-600">Compare comfort, ease of use, and price in one view.</p></div><Link href="/compare" className="btn-primary shrink-0">Open Compare</Link></div></div></div>;
}
export function SiteFooter() {
  return (
    <footer className="border-t border-coral-200 bg-cream-100">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-base font-semibold text-brand-900">Interactive Pets Marketplace</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
              A cleaner way to compare companion-style plushy companions and AI &amp; robotic pets for seniors, families, and gift buyers.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">Explore</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link href="/interactive-pets" className="block hover:text-brand-700">Plushy Companions</Link>
              <Link href="/ai-robotic-pets" className="block hover:text-brand-700">AI &amp; Robotic Pets</Link>
              <Link href="/best-for-seniors" className="block hover:text-brand-700">Seniors</Link>
              <Link href="/compare" className="block hover:text-brand-700">Compare</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">About this site</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link href="/about" className="block hover:text-brand-700">About</Link>
              <Link href="/contact" className="block hover:text-brand-700">Contact</Link>
              <Link href="/about#affiliate-disclosure" className="block hover:text-brand-700">Affiliate disclosure</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-coral-200 pt-6">
          <p className="text-xs leading-6 text-slate-500">
            Smart Pets Marketplace may participate in affiliate programs and may earn a commission when you buy through links on this site, at no extra cost to you. See our <Link href="/about#affiliate-disclosure" className="underline hover:text-brand-700">full affiliate disclosure</Link> for details.
          </p>
        </div>
      </div>
    </footer>
  );
}
export function PageShell({ children }: { children: ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }
