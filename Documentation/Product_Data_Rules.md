# Product Data Rules

## Spreadsheet column conventions

Required columns for every product:
- `Manufacturer` — official brand name
- `Product` — product name as the manufacturer writes it
- `Type` — one of: "AI & Robotic Pets", "Fluffy Companion", "Pocket Pet"
- `Category` — animal category: Cat, Dog, Robot, Panda, etc.
- `Best For 1`, `Best For 2` — audience tags (Seniors, Children, Families,
  Senior loved ones, Gift buyers)
- `Gifts`, `Premium`, `Top Pick` — yes/blank flags
- `Product URL` — direct manufacturer or retailer link
- `Image URL` — direct image URL
- `Comments` — internal notes, not displayed
- `Camera`, `Internet Access`, `Affiliate Agreement` — yes/blank flags

For verified product data:
- `Blurb` — 1-3 sentence product description, paraphrased from
  manufacturer copy or Claude-drafted then user-approved
- `Feature 1`, `Feature 2`, `Feature 3` — short verifiable specs
- `Highlight` — short editorial differentiator written by user
- `Price` — current price as displayed on Product URL
- `Price Source` — where the price was checked (Amazon, Manufacturer)
- `Price Last Checked` — date in YYYY-MM-DD format
- `Rating` — 0.0 to 5.0
- `Review Count` — integer
- `Rating Source` — Amazon | Manufacturer | (other named source)
- `Rating Last Checked` — date in YYYY-MM-DD format

## What goes where

| Content | Allowed source | Where it lives |
|---|---|---|
| Product specs/features | Manufacturer site, manual lookup | Spreadsheet |
| Ratings + counts | Manual Amazon/manufacturer lookup | Spreadsheet |
| Prices | Manual lookup | Spreadsheet |
| Product blurbs | Paraphrased manufacturer copy | Spreadsheet |
| Editorial highlights | User opinion / editorial voice | Spreadsheet |
| Page taglines / homepage copy | Claude-generated, user-approved | Code |
| Research article links | Verified web sources | Code |
| Customer review text | ❌ Never used on this site | — |

## Refresh cadence

Even verified data goes stale. Keep these refreshed:
- Hot-tier products (>$200): every 7 days
- Regular-tier products: every 30 days
- Long-tail products: every 90 days

