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

## Digest article formatting

All Interactive Companion Digest articles (`app/digest/*/page.tsx`) use the
shared `DigestArticle` template and its companion components in
`components/digest-layout.tsx`. These already enforce the current standard —
do not re-derive per-article styling; use the components below.

- **Column width, paragraph spacing, typography:** built into `DigestArticle`
  itself (`max-w-2xl` column, `prose-p:mb-8` for a full blank-line gap between
  paragraphs, `prose-p:leading-8`). Nothing to add per article — just wrap
  content in `<DigestArticle meta={{...}}>`.
- **Fonts:** site default (Inter) — do not introduce per-article fonts.
- **Hero image:** pass `meta.heroImage = { src, alt, caption? }` when a
  suitable photo exists for the article's topic. Not mandatory if no fitting
  image is available, but preferred when one is.
- **FAQ sections:** use `<ArticleFAQ items={[{ q, a }, ...]} />` — bold
  question, answer below, full blank-line gap between pairs. Don't hand-roll
  `<h3>`/`<p>` pairs.
- **"See our related rankings" links:** use
  `<RelatedRankings links={[{ href, label }, ...]} />` — royal blue
  (`#4169E1`), bold, underlined. Don't use `prose-a` defaults or `Link`
  directly for this section.
- **In-article product recommendations:** use `<ArticleProductCard slug=...
  reason=... products={products} />` (add `tint="blue"` for the light-blue
  variant) plus `<ArticleProductJsonLd slug=... products={products} />`.
  Price and rating always come from `components/site-data.ts` (sourced from
  the Product Matrix) — never hardcode a price or rating in article prose.
  The card automatically shows "Price checked [date] / Rating checked
  [date]" from the spreadsheet's last-checked fields, and the JSON-LD block
  makes both machine-readable to search engines.

## Command Line

when recommending terminal commands present Command Line Interface commands. Do not present Power Shell commands.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## "Best For" hero background photos

When adding a background photo to a "Best For" hero section (the
`bg-{color}-100 py-8 sm:py-10` section at the top of each
`app/best-pets-for-*/page.tsx`), use this exact pattern so every page looks
and behaves the same:

1. Save the photo to `public/{page-slug}-hero.png` (full resolution, no
   pre-baked tint — tinting is done live via CSS so it can be tuned).
2. Add `relative overflow-hidden` to the hero `<section>`, and add
   `relative z-10` to the inner `container-shell` div so the text always
   renders above the photo.
3. Add a background layer `<div>` right before the text container:

```tsx
<div
  className="absolute inset-y-0 right-0 hidden w-1/3 sm:block"
  aria-hidden="true"
  style={{
    backgroundImage: [
      "linear-gradient(to right,",
      "  rgba(R,G,B,1) 0%,",
      "  rgba(R,G,B,0.7) 6%,",
      "  rgba(R,G,B,0.2) 13%,",
      "  rgba(R,G,B,0) 20%",
      "),",
      "url('/{page-slug}-hero.png')",
    ].join(" "),
    backgroundSize: "auto, cover",
    backgroundPosition: "left, center 20%",
    backgroundRepeat: "no-repeat, no-repeat",
  }}
/>
```

- `rgba(R,G,B,...)` must match the hero section's own background color
  (e.g. `rgba(255,237,213,...)` for `bg-orange-100`, `rgba(204,251,241,...)`
  for `bg-teal-100`) so the fade blends into the panel instead of showing a
  seam.
- The gradient stops (`0% / 6% / 13% / 20%`) fade out quickly, right next to
  the text — full clarity is reached by 20% across the panel, so the subject
  of the photo (the person's face/shoulder) reads with zero tint. Nudge the
  percentages if a specific photo's subject sits closer to the panel's left
  edge, but keep the fade confined to roughly the first fifth of the panel
  as the default.
- `backgroundPosition`'s `center 20%` controls vertical framing (crops
  toward the top of the photo, where faces usually are) — adjust per photo
  if needed, but keep the "left" position for the gradient layer unchanged.
- Hidden below the `sm` breakpoint so the photo never fights the text on
  mobile.

**Exception:** `best-pets-for-seniors-in-memory-care-facilities` predates
this convention and uses a wider, more gradual fade across most of the
panel. Leave it as-is — do not retrofit it to this pattern.

## Edit content

Main editable content lives in:

* `components/site-data.ts`
* `components/\\\\\\\*`

Replace placeholder links with your affiliate URLs before launch.

