"use client";
import { useState, useMemo } from "react";
import { Product } from "./site-data";
import { SectionHeading } from "./ui";

const PRICE_BUCKETS = [
  { label: "<$50", test: (n: number) => n < 50 },
  { label: "$50 to $100", test: (n: number) => n >= 50 && n <= 100 },
  { label: "$100 to $150", test: (n: number) => n > 100 && n <= 150 },
  { label: "$150 to $200", test: (n: number) => n > 150 && n <= 200 },
  { label: ">$200", test: (n: number) => n > 200 }
];

function parsePrice(p: string): number | null {
  if (!p) return null;
  const cleaned = p.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

function priceBucketLabel(p: string): string {
  const n = parsePrice(p);
  if (n === null) return "";
  const bucket = PRICE_BUCKETS.find(b => b.test(n));
  return bucket ? bucket.label : "";
}

function unique(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v && v.trim())))).sort();
}

type FilterState = {
  name: string;
  category: string;
  type: string;
  bestFor: string;
  rating: string;
  price: string;
};

const ALL: FilterState = { name: "", category: "", type: "", bestFor: "", rating: "", price: "" };

export function CompareTable({
  items,
  title = "Compare at a glance",
  text = "Quickly scan type, audience, highlight, rating, and price."
}: {
  items: Product[];
  title?: string;
  text?: string;
}) {
  const [filters, setFilters] = useState<FilterState>(ALL);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const options = useMemo(() => ({
    name: items.map(p => p.name).sort(),
    category: unique(items.map(p => p.category)),
    type: unique(items.map(p => p.type)),
    bestFor: unique(items.flatMap(p => p.bestFor)),
    rating: unique(items.map(p => p.rating !== undefined ? p.rating.toFixed(1) : undefined)).sort((a, b) => parseFloat(b) - parseFloat(a)),
    price: PRICE_BUCKETS.map(b => b.label).filter(label => items.some(p => priceBucketLabel(p.price) === label))
  }), [items]);

  const filteredAndSorted = useMemo(() => {
    const filtered = items.filter(p => {
      if (filters.name && p.name !== filters.name) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.bestFor && !p.bestFor.includes(filters.bestFor)) return false;
      if (filters.rating && (p.rating === undefined || p.rating < parseFloat(filters.rating))) return false;
      if (filters.price && priceBucketLabel(p.price) !== filters.price) return false;
      return true;
    });
    // Sort by price descending; products with no parseable price sort to the end.
    return filtered.slice().sort((a, b) => {
      const aPrice = parsePrice(a.price);
      const bPrice = parsePrice(b.price);
      if (aPrice === null && bPrice === null) return 0;
      if (aPrice === null) return 1;
      if (bPrice === null) return -1;
      return bPrice - aPrice;
    });
  }, [items, filters]);

  if (items.length === 0) return null;

  const set = (key: keyof FilterState) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters(prev => ({ ...prev, [key]: e.target.value }));

  const selectClass = "mt-2 w-full rounded-md border border-coral-300 bg-white px-2 py-1 text-xs font-normal text-slate-700 focus:border-trust-500 focus:outline-none focus:ring-1 focus:ring-trust-500";
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const anyFilter = activeFilterCount > 0;

  // Renderer for a single product cell value, used by both layouts.
  function ratingCell(product: Product) {
    if (product.rating === undefined) return <>—</>;
    const tipParts: string[] = [];
    if (product.ratingSource) tipParts.push(`Rating from ${product.ratingSource}`);
    if (product.ratingLastChecked) tipParts.push(`last verified ${product.ratingLastChecked}`);
    const tip = tipParts.join(", ");
    const inner = (
      <><span className="text-red-600">★</span> {product.rating.toFixed(1)}</>
    );
    return product.ratingUrl ? (
      <a href={product.ratingUrl} target="_blank" rel="noopener noreferrer" title={tip || undefined} className="hover:underline">
        {inner}
      </a>
    ) : (
      <span title={tip || undefined}>{inner}</span>
    );
  }

  function priceCell(product: Product) {
    const tipParts: string[] = [];
    if (product.priceSource) tipParts.push(`Price from ${product.priceSource}`);
    if (product.priceLastChecked) tipParts.push(`last verified ${product.priceLastChecked}`);
    const tip = tipParts.join(", ");
    return <span title={tip || undefined}>{product.price || "—"}</span>;
  }

  // Filter row used in the mobile filters disclosure
  function FilterRow({ label, value, onChange, optionsList, formatOption }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    optionsList: string[];
    formatOption?: (v: string) => string;
  }) {
    return (
      <div className="flex items-center justify-between gap-3 py-2">
        <span className="text-sm font-semibold text-slate-900">{label}</span>
        <select
          value={value}
          onChange={onChange}
          aria-label={`Filter by ${label.toLowerCase()}`}
          className="rounded-md border border-coral-300 bg-white px-2 py-1 text-sm text-slate-700 focus:border-trust-500 focus:outline-none focus:ring-1 focus:ring-trust-500 max-w-[55%]"
        >
          <option value="">All</option>
          {optionsList.map(v => <option key={v} value={v}>{formatOption ? formatOption(v) : v}</option>)}
        </select>
      </div>
    );
  }

  return (
    <section className="section-pad bg-white">
      <div className="container-shell">
        <SectionHeading eyebrow="Compare faster" title={title} text={text} />

        {/* Active-filter summary (shared by all viewports) */}
        {anyFilter && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600">
              Showing {filteredAndSorted.length} of {items.length} products
            </span>
            <button
              onClick={() => setFilters(ALL)}
              className="text-sm font-semibold text-trust-700 underline hover:text-trust-900"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* MOBILE + TABLET: pivoted view (attributes as rows, products as columns) */}
        <div className="lg:hidden">
          {/* Filters disclosure */}
          <div className="mt-4 rounded-2xl border border-coral-200 bg-cream-50">
            <button
              onClick={() => setMobileFiltersOpen(o => !o)}
              aria-expanded={mobileFiltersOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="text-sm font-semibold text-slate-900">
                Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </span>
              <span className="text-sm text-trust-700" aria-hidden="true">
                {mobileFiltersOpen ? "Hide" : "Show"}
              </span>
            </button>
            {mobileFiltersOpen && (
              <div className="border-t border-coral-200 px-4 py-2 divide-y divide-coral-100">
                <FilterRow label="Product"  value={filters.name}     onChange={set("name")}     optionsList={options.name} />
                <FilterRow label="Category" value={filters.category} onChange={set("category")} optionsList={options.category} />
                <FilterRow label="Type"     value={filters.type}     onChange={set("type")}     optionsList={options.type} />
                <FilterRow label="Best For" value={filters.bestFor}  onChange={set("bestFor")}  optionsList={options.bestFor} />
                <FilterRow label="Rating"   value={filters.rating}   onChange={set("rating")}   optionsList={options.rating} formatOption={v => `★ ${v} & up`} />
                <FilterRow label="Price"    value={filters.price}    onChange={set("price")}    optionsList={options.price} />
              </div>
            )}
          </div>

          {/* Pivoted table */}
          <div className="mt-4 overflow-hidden rounded-3xl border border-coral-200 bg-white shadow-soft">
            {filteredAndSorted.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-slate-600">
                No products match these filters.{" "}
                <button onClick={() => setFilters(ALL)} className="font-semibold text-trust-700 underline hover:text-trust-900">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table
                  className="text-left text-sm"
                  style={{ borderCollapse: "separate", borderSpacing: 0 }}
                >
                  <thead>
                    <tr className="bg-cream-100">
                      {/* Sticky top-left header — empty above the labels */}
                      <th
                        className="sticky left-0 z-20 bg-cream-100 px-3 py-3 align-top border-b border-coral-200"
                        style={{ width: "35vw", minWidth: "35vw", boxShadow: "1px 0 0 rgba(0,0,0,0.06)" }}
                      >
                        <span className="sr-only">Attribute</span>
                      </th>
                      {filteredAndSorted.map(product => (
                        <th
                          key={product.slug}
                          className="px-3 py-3 align-top border-b border-coral-200 bg-cream-100 font-semibold text-slate-900"
                          style={{ width: "60vw", minWidth: "60vw" }}
                        >
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row: Category */}
                    <PivotRow label="Category" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{p.category || "—"}</PivotCell>)}
                    </PivotRow>
                    {/* Row: Type */}
                    <PivotRow label="Type" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{p.type}</PivotCell>)}
                    </PivotRow>
                    {/* Row: Best For */}
                    <PivotRow label="Best For" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{p.bestFor.join(", ") || "—"}</PivotCell>)}
                    </PivotRow>
                    {/* Row: Highlight */}
                    <PivotRow label="Highlight" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{p.highlight || "—"}</PivotCell>)}
                    </PivotRow>
                    {/* Row: Rating */}
                    <PivotRow label="Rating" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{ratingCell(p)}</PivotCell>)}
                    </PivotRow>
                    {/* Row: Reviews */}
                    <PivotRow label="Reviews" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{p.reviewCount !== undefined ? p.reviewCount.toLocaleString() : "—"}</PivotCell>)}
                    </PivotRow>
                    {/* Row: Price */}
                    <PivotRow label="Price" sticky>
                      {filteredAndSorted.map(p => <PivotCell key={p.slug}>{priceCell(p)}</PivotCell>)}
                    </PivotRow>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP: original horizontal table, now sorted by price desc */}
        <div className="hidden lg:block">
          <div className="mt-6 overflow-hidden rounded-3xl border border-coral-200 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-cream-100 align-top">
                  <tr>
                    <th className="px-5 py-4 text-left min-w-[180px]">
                      <div className="font-semibold text-slate-900">Product</div>
                      <select className={selectClass} value={filters.name} onChange={set("name")} aria-label="Filter by product">
                        <option value="">All</option>
                        {options.name.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </th>
                    <th className="px-5 py-4 text-left min-w-[140px]">
                      <div className="font-semibold text-slate-900">Category</div>
                      <select className={selectClass} value={filters.category} onChange={set("category")} aria-label="Filter by category">
                        <option value="">All</option>
                        {options.category.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </th>
                    <th className="px-5 py-4 text-left min-w-[160px]">
                      <div className="font-semibold text-slate-900">Type</div>
                      <select className={selectClass} value={filters.type} onChange={set("type")} aria-label="Filter by type">
                        <option value="">All</option>
                        {options.type.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </th>
                    <th className="px-5 py-4 text-left min-w-[160px]">
                      <div className="font-semibold text-slate-900">Best For</div>
                      <select className={selectClass} value={filters.bestFor} onChange={set("bestFor")} aria-label="Filter by best for">
                        <option value="">All</option>
                        {options.bestFor.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-900">Highlight</th>
                    <th className="px-5 py-4 text-left min-w-[120px]">
                      <div className="font-semibold text-slate-900">Rating</div>
                      <select className={selectClass} value={filters.rating} onChange={set("rating")} aria-label="Filter by rating">
                        <option value="">All</option>
                        {options.rating.map(v => <option key={v} value={v}>★ {v} & up</option>)}
                      </select>
                    </th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-900 min-w-[110px]">Reviews</th>
                    <th className="px-5 py-4 text-left min-w-[140px]">
                      <div className="font-semibold text-slate-900">Price</div>
                      <select className={selectClass} value={filters.price} onChange={set("price")} aria-label="Filter by price">
                        <option value="">All</option>
                        {options.price.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSorted.length === 0 ? (
                    <tr><td colSpan={8} className="px-5 py-10 text-center text-slate-600">No products match these filters. <button onClick={() => setFilters(ALL)} className="font-semibold text-trust-700 underline hover:text-trust-900">Clear filters</button></td></tr>
                  ) : filteredAndSorted.map(product => (
                    <tr key={product.slug} className="border-t border-coral-200">
                      <td className="px-5 py-4 font-semibold text-slate-900">{product.name}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{product.category || "—"}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{product.type}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900">{product.bestFor.join(", ") || "—"}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900">{product.highlight}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{ratingCell(product)}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{product.reviewCount !== undefined ? product.reviewCount.toLocaleString() : "—"}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{priceCell(product)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pivot table helpers — kept in module scope so styling stays consistent.
function PivotRow({ label, sticky, children }: { label: string; sticky?: boolean; children: React.ReactNode }) {
  return (
    <tr className="border-t border-coral-200">
      <th
        scope="row"
        className={`align-top px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-700 bg-white ${sticky ? "sticky left-0 z-10" : ""}`}
        style={sticky ? { boxShadow: "1px 0 0 rgba(0,0,0,0.06)" } : undefined}
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function PivotCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="align-top px-3 py-3 text-sm font-medium text-slate-900">
      {children}
    </td>
  );
}
