-- Adds geographic columns (city/region/country) to the existing
-- outbound_clicks table, populated from Cloudflare's request.cf object —
-- no external IP lookup needed. Run this once against the live database
-- (it already has rows from schema.sql, so this is an ALTER, not a
-- CREATE):
--
--   wrangler d1 execute interactive-pet-marketplace-clicks --remote --file=./migrations/002_add_geo_columns.sql
--
-- Existing rows will have NULL in these three columns, which is expected
-- — they were logged before this change.

ALTER TABLE outbound_clicks ADD COLUMN city TEXT;
ALTER TABLE outbound_clicks ADD COLUMN region TEXT;
ALTER TABLE outbound_clicks ADD COLUMN country TEXT;
