"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

const mainNav = [
  { href:"/", label:"Home" },
  { href:"/best-for-seniors", label:"Seniors" },
  { href:"/kids-and-families", label:"Children and Families" }
];
const shopForNav = [
  { href:"/plushy-companions", label:"Plushy Companions" },
  { href:"/ai-robotic-pets", label:"AI & Robotic Pets" },
  { href:"/best-for-gifts", label:"Gifts" },
  { href:"/premium-picks", label:"Premium Picks" }
];
const tailNav = [
  { href:"/compare", label:"Compare" },
  { href:"/questions", label:"FAQ" },
  { href:"/about", label:"About" },
  { href:"/contact", label:"Contact" }
];

function ShopForDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // True if the current page is one of the dropdown's items — used to give
  // the trigger button a subtle "current section" treatment so visitors can
  // see at a glance that the dropdown contains their current page.
  const containsActive = shopForNav.some((item) => pathname === item.href);

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
        className={`flex items-center gap-1 text-sm transition hover:text-brand-700 ${
          containsActive ? "font-semibold text-trust-700" : "font-medium text-slate-700"
        }`}
      >
        Shop for
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2">
          <div className="rounded-xl border border-coral-200 bg-white py-2 shadow-soft">
            {shopForNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block px-4 py-2 text-sm ${
                    active
                      ? "bg-trust-50 font-semibold text-trust-700"
                      : "text-slate-700 hover:bg-trust-50 hover:text-trust-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const allMobileNav = [
    { href:"/", label:"Home" },
    { href:"/best-for-seniors", label:"Seniors" },
    { href:"/kids-and-families", label:"Kids & Families" },
    { href:"/best-for-gifts", label:"Gifts" },
    { href:"/plushy-companions", label:"Plushy Companions" },
    { href:"/ai-robotic-pets", label:"AI & Robotic Pets" },
    { href:"/premium-picks", label:"Premium Picks" },
    ...tailNav
  ];
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

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
          <img src="/logo-mark.svg" alt="" width="44" height="44" className="h-11 w-11" />
          <div>
            <div className="text-sm font-semibold text-brand-700">Interactive Pet Marketplace</div>
            <div className="hidden sm:block text-xs text-slate-500">Interactive &amp; AI companion guides</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition hover:text-brand-700 ${
                  active ? "font-semibold text-trust-700" : "font-medium text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ShopForDropdown />
          {tailNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition hover:text-brand-700 ${
                  active ? "font-semibold text-trust-700" : "font-medium text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/top-picks" className="hidden sm:inline-flex items-center justify-center rounded-full bg-trust-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600">Shop Top Picks</Link>
      </div>
      {/* Mobile pills nav: horizontally scrollable */}
      <MobilePillsNav items={allMobileNav} pathname={pathname} />
    </header>
  );
}

// Renders the mobile horizontal-scroll pills row. Pulled into its own
// component so it can manage a ref for auto-scrolling the active pill into
// view — otherwise on a long pill list the visitor lands on a page whose
// pill is off-screen and the active highlight is invisible.
function MobilePillsNav({
  items,
  pathname
}: {
  items: { href: string; label: string }[];
  pathname: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // After render, if there's an active pill outside the visible area of
    // the pill strip, scroll the strip (not the document) so the active
    // pill lands roughly centered. Using direct scrollLeft math instead of
    // scrollIntoView avoids the side effect of scrolling the document
    // window, which can yank the page if the user is mid-read.
    const container = containerRef.current;
    const active = activeRef.current;
    if (container && active) {
      const containerCenter = container.clientWidth / 2;
      const activeCenter = active.offsetLeft + active.offsetWidth / 2;
      const targetScroll = activeCenter - containerCenter;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth"
      });
    }
  }, [pathname]);

  return (
    <nav className="lg:hidden border-t border-coral-100 bg-white">
      <div
        ref={containerRef}
        className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5"
      >
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              ref={active ? activeRef : undefined}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-trust-500 bg-trust-500 text-white"
                  : "border-coral-200 bg-cream-50 text-slate-700 hover:border-trust-400 hover:bg-trust-50 hover:text-trust-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
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
            <p className="text-base font-semibold text-brand-900">Interactive Pet Marketplace</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
              A cleaner way to compare companion-style plushy companions and AI &amp; robotic pets for seniors, families, and gift buyers.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">Explore</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link href="/plushy-companions" className="block hover:text-brand-700">Plushy Companions</Link>
              <Link href="/ai-robotic-pets" className="block hover:text-brand-700">AI &amp; Robotic Pets</Link>
              <Link href="/best-for-seniors" className="block hover:text-brand-700">Seniors</Link>
              <Link href="/best-pets-for-seniors-in-memory-care-facilities" className="block hover:text-brand-700">Memory Care (testing)</Link>
              <Link href="/compare" className="block hover:text-brand-700">Compare</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-900">About this site</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link href="/about" className="block hover:text-brand-700">About</Link>
              <Link href="/contact" className="block hover:text-brand-700">Contact</Link>
              <Link href="/about#affiliate-disclosure" className="block hover:text-brand-700">Affiliate disclosure</Link>
              <Link href="/privacy" className="block hover:text-brand-700">Privacy policy</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-coral-200 pt-6">
          <p className="text-xs leading-6 text-slate-500">
            Interactive Pet Marketplace may participate in affiliate programs and may earn a commission when you buy through links on this site, at no extra cost to you. See our <Link href="/about#affiliate-disclosure" className="underline hover:text-brand-700">full affiliate disclosure</Link> for details.
          </p>
        </div>
      </div>
    </footer>
  );
}
export function PageShell({ children }: { children: ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }
