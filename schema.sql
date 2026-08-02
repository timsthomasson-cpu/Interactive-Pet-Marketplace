-- Cloudflare D1 schema for the internal outbound-click audit log.
-- This is separate from GA4 / Meta Pixel — see components/click-tracking.ts
-- and app/api/track-click/route.ts.
--
-- This file is the schema for a FRESH setup. If the table already exists
-- (e.g. in production), apply incremental changes from migrations/ instead
-- — see migrations/002_add_geo_columns.sql for an example.
--
-- Apply after creating the database (see wrangler.jsonc / setup notes):
--   wrangler d1 execute interactive-pet-marketplace-clicks --remote --file=./schema.sql
--   wrangler d1 execute interactive-pet-marketplace-clicks --local --file=./schema.sql

CREATE TABLE IF NOT EXISTS outbound_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  affiliate_program TEXT,
  destination_url TEXT NOT NULL,
  source_page TEXT,
  referrer TEXT,
  session_id TEXT,
  city TEXT,
  region TEXT,
  country TEXT
);

CREATE INDEX IF NOT EXISTS idx_outbound_clicks_timestamp ON outbound_clicks (timestamp);
CREATE INDEX IF NOT EXISTS idx_outbound_clicks_product_slug ON outbound_clicks (product_slug);
