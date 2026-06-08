# Interactive Pet Marketplace

Improved multi-page affiliate-style Next.js site for comparing interactive pets and AI \& robotic pets.



\## ⚠️ Data Integrity Rules — READ BEFORE EDITING



This is an affiliate review site. The credibility of every recommendation

depends on the data being accurate. Claude (or any AI assistant) working

on this project must follow these rules without exception.



\### Hard rules — never violated



1\. \*\*Never invent product specifications, features, ratings, prices, or

&#x20;  review counts.\*\* If a value is not in `Documentation/Product Matrix.xlsx`

&#x20;  or sourced from a verifiable URL, it does not go on the site.



2\. \*\*Never copy customer review text from Amazon, manufacturer sites, or

&#x20;  anywhere else\*\* onto this site. Reviews are the reviewer's intellectual

&#x20;  property and reproducing them violates copyright AND Amazon's Associates

&#x20;  terms.



3\. \*\*Never automate scraping of Amazon, manufacturer sites, or any third

&#x20;  party.\*\* Manual lookups by a human are fine; bots, scripts, or scheduled

&#x20;  fetchers that hit those sites are not.



4\. \*\*Never present invented data as verified.\*\* If you have to guess

&#x20;  (e.g., a placeholder value), say so explicitly in the data file, in

&#x20;  your response, and never let it ship to a user-facing field.



\### Soft rules — acceptable with disclosure



5\. \*\*Generic editorial copy is allowed\*\* — homepage taglines, section

&#x20;  headers, intro paragraphs, trust-box descriptions, research-page

&#x20;  summaries. These are clearly editorial voice, not factual claims about

&#x20;  specific products.



6\. \*\*Paraphrasing manufacturer marketing copy is allowed\*\* for product

&#x20;  blurbs — but the paraphrase must not introduce new claims. If the

&#x20;  manufacturer doesn't say "AI-powered", don't add that. Paraphrase what

&#x20;  exists; don't invent what doesn't.



7\. \*\*Suggesting placeholder data is allowed during development\*\*, as long

&#x20;  as the suggestion is clearly labeled in the response (e.g., "I can put

&#x20;  a placeholder rating of 4.4 here for now — please replace with the

&#x20;  verified Amazon rating before launch").



\### Source of truth



\- \*\*`Documentation/Product Matrix.xlsx`\*\* is the authoritative source for

&#x20; all product-specific data: manufacturer, name, type, category, best for

&#x20; tags, flags (gifts, premium, top pick, camera, internet access), URLs,

&#x20; images, prices, ratings, review counts, sources, and last-checked dates,

&#x20; blurbs, features, and highlights.

\- \*\*`Documentation/product-privacy.json`\*\* holds hand-curated privacy and

&#x20; security research for products with cameras or internet access. Keyed by

&#x20; product slug (matching `components/site-data.ts`). Each entry includes

&#x20; sources, a research date, and findings on privacy shutter, indicator LED,

&#x20; 2FA, policy clarity, storage location, and known incidents. Update

&#x20; manually when a product's privacy posture changes or a new camera product

&#x20; is added; the `npm run generate:products` step will merge it into

&#x20; `site-data.ts` automatically.

\- \*\*`components/site-data.ts`\*\* is auto-generated from the spreadsheet AND

&#x20; `product-privacy.json` via `npm run generate:products`. \*\*Never edit it

&#x20; by hand.\*\*

\- \*\*`Documentation/product-details.json`\*\* is being phased out. Do not

&#x20; add new entries. Migrate existing fields into the spreadsheet over time.



\### Required disclosures in responses



When working with this codebase, Claude must:



\- \*\*Flag any value that wasn't sourced from the spreadsheet or a URL the

&#x20; user provided.\*\* Use phrases like "this is a placeholder" or "I don't

&#x20; have a verified source for this — please check before publishing".

\- \*\*Never present invented numbers, ratings, or specs as factual.\*\*

\- \*\*Surface uncertainty proactively\*\*, before the user asks. If you're

&#x20; about to invent a rating because you can't find one, stop and ask.

\- \*\*Refuse to copy review text\*\* even if asked. Offer to paraphrase or

&#x20; link out instead.

## Command Line

when recommending terminal commands present Command Line Interface commands. Do not present Power Shell commands.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit content

Main editable content lives in:

* `components/site-data.ts`
* `components/\\\\\\\*`

Replace placeholder links with your affiliate URLs before launch.

