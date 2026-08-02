import { getCloudflareContext } from "@opennextjs/cloudflare";

// Always read fresh from D1 — this is an internal audit view, not a page
// that should be cached/prerendered.
export const dynamic = "force-dynamic";

type ClickRow = {
  id: number;
  timestamp: string;
  product_slug: string;
  affiliate_program: string | null;
  destination_url: string;
  source_page: string | null;
  referrer: string | null;
  session_id: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
};

export default async function AdminClicksPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; program?: string; days?: string }>;
}) {
  const params = await searchParams;
  const product = params.product?.trim() || "";
  const program = params.program?.trim() || "";
  const days = Number(params.days) || 30;

  const { env } = getCloudflareContext();
  const db = env.CLICKS_DB;

  let rows: ClickRow[] = [];
  let error: string | null = null;

  if (!db) {
    error = "D1 binding (CLICKS_DB) is not available in this environment.";
  } else {
    try {
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      let query = `SELECT * FROM outbound_clicks WHERE timestamp >= ?`;
      const bindings: (string | number)[] = [cutoff];

      if (product) {
        query += ` AND product_slug = ?`;
        bindings.push(product);
      }
      if (program) {
        query += ` AND affiliate_program = ?`;
        bindings.push(program);
      }
      query += ` ORDER BY timestamp DESC LIMIT 500`;

      const result = await db
        .prepare(query)
        .bind(...bindings)
        .all<ClickRow>();
      rows = result.results ?? [];
    } catch (err) {
      error = err instanceof Error ? err.message : "Query failed";
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-trust-900">Outbound Clicks</h1>
        <form action="/api/admin/logout" method="post">
          <button className="text-sm text-gray-500 underline" type="submit">
            Sign out
          </button>
        </form>
      </div>

      <form className="mb-6 flex flex-wrap gap-3" method="get">
        <input
          name="product"
          defaultValue={product}
          placeholder="Product slug"
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
        <input
          name="program"
          defaultValue={program}
          placeholder="Affiliate program"
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
        <select
          name="days"
          defaultValue={String(days)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
        <button
          type="submit"
          className="rounded-md bg-trust-600 px-4 py-1.5 text-sm font-medium text-white"
        >
          Filter
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <p className="mb-3 text-sm text-gray-500">
        {rows.length} click{rows.length === 1 ? "" : "s"} shown (max 500)
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">Timestamp</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Program</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Source Page</th>
              <th className="px-3 py-2">Destination</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap px-3 py-2 text-gray-600">
                  {new Date(row.timestamp).toLocaleString()}
                </td>
                <td className="px-3 py-2 font-medium text-trust-800">{row.product_slug}</td>
                <td className="px-3 py-2">{row.affiliate_program ?? "—"}</td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-500">
                  {row.city ? `${row.city}, ${row.region ?? "—"}` : "—"}
                  {row.country ? ` (${row.country})` : ""}
                </td>
                <td className="max-w-xs truncate px-3 py-2 text-gray-500">
                  {row.source_page ?? "—"}
                </td>
                <td className="max-w-xs truncate px-3 py-2 text-gray-500">
                  <a
                    href={row.destination_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {row.destination_url}
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !error && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-400">
                  No clicks in this range yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
