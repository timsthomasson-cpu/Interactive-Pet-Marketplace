"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "./site-data";

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

export function DetailedCompareTable({ items }: { items: Product[] }) {
  const [filters, setFilters] = useState<FilterState>(ALL);

  const options = useMemo(() => ({
    name: items.map(p => p.name).sort(),
    category: unique(items.map(p => p.category)),
    type: unique(items.map(p => p.type)),
    bestFor: unique(items.flatMap(p => p.bestFor)),
    rating: unique(items.map(p => p.rating !== undefined ? p.rating.toFixed(1) : undefined)).sort((a, b) => parseFloat(b) - parseFloat(a)),
    price: PRICE_BUCKETS.map(b => b.label).filter(label => items.some(p => priceBucketLabel(p.price) === label))
  }), [items]);

  const filtered = useMemo(() => items.filter(p => {
    if (filters.name && p.name !== filters.name) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.bestFor && !p.bestFor.includes(filters.bestFor)) return false;
    if (filters.rating && (p.rating === undefined || p.rating < parseFloat(filters.rating))) return false;
    if (filters.price && priceBucketLabel(p.price) !== filters.price) return false;
    return true;
  }), [items, filters]);

  const set = (key: keyof FilterState) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters(prev => ({ ...prev, [key]: e.target.value }));

  const selectClass = "mt-2 w-full rounded-md border border-coral-300 bg-white px-2 py-1 text-xs font-normal text-slate-700 focus:border-trust-500 focus:outline-none focus:ring-1 focus:ring-trust-500";
  const anyFilter = Object.values(filters).some(Boolean);

  return (
    <div>
      {anyFilter && (
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-slate-600">Showing {filtered.length} of {items.length} products</span>
          <button
            onClick={() => setFilters(ALL)}
            className="text-sm font-semibold text-trust-700 underline hover:text-trust-900"
          >
            Clear all filters
          </button>
        </div>
      )}
      <div className="mt-6 overflow-hidden rounded-3xl border border-coral-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-cream-100 align-top">
              <tr>
                <th className="px-3 py-4 text-left min-w-[160px]">
                  <div className="font-semibold text-slate-900">Product</div>
                  <select className={selectClass} value={filters.name} onChange={set("name")} aria-label="Filter by product">
                    <option value="">All</option>
                    {options.name.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </th>
                <th className="px-3 py-4 text-left min-w-[110px]">
                  <div className="font-semibold text-slate-900">Category</div>
                  <select className={selectClass} value={filters.category} onChange={set("category")} aria-label="Filter by category">
                    <option value="">All</option>
                    {options.category.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </th>
                <th className="px-3 py-4 text-left min-w-[130px]">
                  <div className="font-semibold text-slate-900">Type</div>
                  <select className={selectClass} value={filters.type} onChange={set("type")} aria-label="Filter by type">
                    <option value="">All</option>
                    {options.type.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </th>
                <th className="px-3 py-4 text-left min-w-[130px]">
                  <div className="font-semibold text-slate-900">Best For</div>
                  <select className={selectClass} value={filters.bestFor} onChange={set("bestFor")} aria-label="Filter by best for">
                    <option value="">All</option>
                    {options.bestFor.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </th>
                <th className="px-3 py-4 text-left font-semibold text-slate-900 min-w-[140px]">Key Features</th>
                <th className="px-3 py-4 text-left font-semibold text-slate-900 min-w-[120px]">Highlight</th>
                <th className="px-3 py-4 text-left min-w-[100px]">
                  <div className="font-semibold text-slate-900">Rating</div>
                  <select className={selectClass} value={filters.rating} onChange={set("rating")} aria-label="Filter by rating">
                    <option value="">All</option>
                    {options.rating.map(v => <option key={v} value={v}>★ {v} & up</option>)}
                  </select>
                </th>
                <th className="px-3 py-4 text-left min-w-[110px]">
                  <div className="font-semibold text-slate-900">Price</div>
                  <select className={selectClass} value={filters.price} onChange={set("price")} aria-label="Filter by price">
                    <option value="">All</option>
                    {options.price.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </th>
                <th className="px-3 py-4 text-left font-semibold text-slate-900 min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-slate-600">No products match these filters. <button onClick={() => setFilters(ALL)} className="font-semibold text-trust-700 underline hover:text-trust-900">Clear filters</button></td></tr>
              ) : filtered.map(product => (
                <tr key={product.slug} className="border-t border-coral-200 align-top">
                  <td className="px-3 py-4 font-semibold text-slate-900">{product.name}</td>
                  <td className="px-3 py-4 text-slate-600 whitespace-nowrap">{product.category || "—"}</td>
                  <td className="px-3 py-4 text-slate-600">{product.type}</td>
                  <td className="px-3 py-4 text-slate-600">{product.bestFor.join(", ")}</td>
                  <td className="px-3 py-4 text-slate-600">{product.features.join(", ")}</td>
                  <td className="px-3 py-4 text-slate-600">{product.highlight}</td>
                  <td className="px-3 py-4 text-slate-900 whitespace-nowrap">{product.rating !== undefined ? <><span className="text-red-600">★</span> {product.rating.toFixed(1)}</> : "—"}</td>
                  <td className="px-3 py-4 text-slate-900">{product.price}</td>
                  <td className="px-3 py-4">
                    <Link href={product.productUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-trust-600 whitespace-nowrap">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
