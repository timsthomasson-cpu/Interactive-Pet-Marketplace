# Interactive Pet Marketplace

Improved multi-page affiliate-style Next.js site for comparing interactive pets and AI \& robotic pets.

## AI assistant startup procedure — read before any work

Any AI coding assistant operating inside this repository must begin every task by:

1. Reading this root `README.md` in full before inspecting, editing, generating, or deleting project files.
2. Checking for more-specific instructions in the directory containing the files being changed.
3. Identifying the authoritative source files for the task before making edits.
4. Preserving the data-integrity, editorial, branding, advertising, and command-line rules in this document.
5. Reporting any conflict between the user's request and these repository rules before proceeding.

Do not assume that prior-chat context replaces the current repository instructions. Re-read this file when starting a new coding session or after pulling changes that may have modified it.

> \*\*Important:\*\* A normal ChatGPT conversation cannot automatically see this repository. This instruction applies only when the assistant is running in a repository-connected environment. For stronger automatic enforcement, mirror this startup requirement in the repository-root `AGENTS.md` and, when using Claude Code, `CLAUDE.md`.

## ⚠️ Data Integrity Rules — READ BEFORE EDITING

This is an affiliate review site. The credibility of every recommendation

depends on the data being accurate. Claude (or any AI assistant) working

on this project must follow these rules without exception.

### Hard rules — never violated

1. \*\*Never invent product specifications, features, ratings, prices, or

   review counts.\*\* If a value is not in `Documentation/Product Matrix.xlsx`

   or sourced from a verifiable URL, it does not go on the site.

2. \*\*Never copy customer review text from Amazon, manufacturer sites, or

   anywhere else\*\* onto this site. Reviews are the reviewer's intellectual

   property and reproducing them violates copyright AND Amazon's Associates

   terms.

3. **Never automate scraping of Amazon.** Manual lookups by a human are

   fine; bots, scripts, or scheduled fetchers that hit Amazon are not, per

Amazon's Associates terms. Automated fetching of non-Amazon manufacturer

or third-party sites is allowed, but must still comply with each site's

own terms of service, and with rule 1 (never invent data) and rule 4

(never present invented data as verified) if a value can't be confirmed.

4. **Never present invented data as verified.** If you have to guess

(e.g., a placeholder value), say so explicitly in the data file, in

your response, and never let it ship to a user-facing field.

### Soft rules — acceptable with disclosure

5. **Generic editorial copy is allowed** — homepage taglines, section

   headers, intro paragraphs, trust-box descriptions, research-page

   summaries. These are clearly editorial voice, not factual claims about

   specific products.

6. **Paraphrasing manufacturer marketing copy is allowed** for product

   blurbs — but the paraphrase must not introduce new claims. If the

   manufacturer doesn't say "AI-powered", don't add that. Paraphrase what

   exists; don't invent what doesn't.

7. **Suggesting placeholder data is allowed during development**, as long

   as the suggestion is clearly labeled in the response (e.g., "I can put

   a placeholder rating of 4.4 here for now — please replace with the

   verified Amazon rating before launch").

### Source of truth

* **`Documentation/Product Matrix.xlsx`** is the authoritative source for

  all product-specific data: manufacturer, name, type, category, best for

  tags, flags (gifts, premium, top pick, camera, internet access), URLs,

  images, prices, ratings, review counts, sources, and last-checked dates,

  blurbs, features, and highlights.

* **`Documentation/product-privacy.json`** holds hand-curated privacy and

  security research for products with cameras or internet access. Keyed by

  product slug (matching `components/site-data.ts`). Each entry includes

  sources, a research date, and findings on privacy shutter, indicator LED,

2FA, policy clarity, storage location, and known incidents. Update

manually when a product's privacy posture changes or a new camera product

is added; the `npm run generate:products` step will merge it into

`site-data.ts` automatically.

* **`components/site-data.ts`** is auto-generated from the spreadsheet AND

`product-privacy.json` via `npm run generate:products`. \*\*Never edit it

by hand.\*\*

* **`Documentation/product-details.json`** is being phased out. Do not

  add new entries. Migrate existing fields into the spreadsheet over time.

### Required disclosures in responses

When working with this codebase, Claude must:

* \*\*Flag any value that wasn't sourced from the spreadsheet or a URL the

  user provided.\*\* Use phrases like "this is a placeholder" or "I don't

  have a verified source for this — please check before publishing".

* **Never present invented numbers, ratings, or specs as factual.**
* **Surface uncertainty proactively**, before the user asks. If you're

  about to invent a rating because you can't find one, stop and ask.

* **Refuse to copy review text** even if asked. Offer to paraphrase or

  link out instead.

## Advertising creative standards

These standards apply to Facebook and Instagram advertising for Interactive Pet Marketplace. Unless a campaign brief explicitly says otherwise, design mobile-first, keep the tone educational and trustworthy, and use a soft-sell approach.

### Default formats and deliverables

#### Static feed ads

* Canvas: **1080 × 1350 px**
* Aspect ratio: **4:5**
* Primary placements: Facebook Feed and Instagram Feed
* Deliverable: one individual PNG per ad

#### Reels, Stories, and short-video slides

* Canvas: **1080 × 1920 px**
* Aspect ratio: **9:16**
* Primary placements: Facebook Reels, Instagram Reels, Facebook Stories, and Instagram Stories
* Deliverables: one individual PNG per slide and an MP4 when assembly is requested
* Typical informational video: two or three slides, approximately 3–5 seconds per slide

When a campaign will run in both feed and full-screen placements, create separate 4:5 and 9:16 versions. Do not rely on automatic cropping.

### Mobile-first layout

* Make the main idea understandable within about two seconds.
* Use one primary message per slide.
* Use large, high-contrast headlines and brief supporting copy.
* Do not shrink text merely to fit more information; remove lower-priority copy instead.
* Review final creative at actual phone size before approval.
* Keep essential text, logos, disclaimers, and calls to action away from the outer edges.
* For 9:16 creative, leave generous clear space at the top, bottom, and far right for Meta interface overlays.

### Brand identity

* Use the approved Interactive Pet Marketplace logo supplied with the project.
* Do not redraw, recolor, stretch, distort, or substitute the logo.
* Use the icon-only logo only when space is genuinely limited.
* Maintain clear space around the logo.
* Use dark blue for primary structure and headlines, orange/gold for emphasis, and cream or warm white for backgrounds.
* Use the tagline `Companionship • Comfort • Connection` only when it remains comfortably readable.

### Website call to action

Every ad that sends viewers to the website must include:

* A recognizable globe/web icon
* A short action phrase such as `Learn more`, `Read the full guide`, `See the research`, or `Explore the guide`
* `InteractivePetMarketplace.com`

The globe icon should appear next to the website call to action on **all applicable images and slides**. Never leave placeholders such as `Edit`, `Click here`, `Website`, or `URL` in exported creative.

### Messaging and tone

Advertising should feel:

* Trustworthy
* Warm
* Educational
* Respectful
* Clear
* Evidence-aware
* Non-alarmist

Unless a campaign is explicitly product-focused, avoid prices, ratings, urgency, product banners, and aggressive sales language. General research ads must not feature Percy Robot Cat or another product as though the product were part of the cited research.

### Research and health-related claims

When discussing loneliness, depression, anxiety, dementia, agitation, or other health-related outcomes:

* Match every factual claim to the approved article and its cited sources.
* Preserve important limitations and qualifications.
* Prefer cautious wording such as `research suggests`, `small studies report`, `may help`, `results vary`, and `evidence is encouraging but still developing`.
* Do not describe a consumer product as a treatment, cure, therapy, or guaranteed solution unless the cited evidence supports that exact statement.
* Never imply that robotic pets replace human relationships, caregivers, clinicians, or community support.
* Never imply that a specific consumer product was studied unless it actually was.
* Never imply that Interactive Pet Marketplace conducted clinical research unless that is true.

### Educational ad structure

A typical 4:5 static informational ad should contain:

1. Official logo
2. Clear headline
3. Short research framing or subtitle
4. One concise supporting statement
5. Two or three takeaways
6. An important limitation or qualification
7. Website CTA with globe icon and URL

A typical three-slide 9:16 informational video should use:

1. **Context:** introduce the issue or one audience-relevant statistic.
2. **Evidence:** state what the research suggests and include a qualification.
3. **Takeaway:** explain the practical meaning, reinforce that robotic pets supplement rather than replace human connection, and end with the globe icon, CTA, and URL.

Use gentle fades, slow pans, or subtle zooms. Avoid rapid cuts, flashing effects, bouncing text, and distracting animation.

### Photography and AI-generated imagery

Preferred imagery is warm, natural, respectful, and believable. Suitable scenes include an older adult interacting comfortably with a robotic companion pet in a familiar home environment, with a caregiver or family member when relevant.

Avoid:

* Infantilizing older adults
* Exaggerated sadness or emotional manipulation
* Unnecessary hospital-like scenes
* Unrealistic hands, faces, or body positions
* Images that inaccurately depict a named commercial product
* A robotic pet that could misleadingly be mistaken for a live animal

When an image is illustrative rather than an accurate depiction of a specific product, label it appropriately when needed.

### Icons and visual elements

* Use simple, consistent line icons.
* Use the globe icon for the website CTA.
* Do not use decorative paw icons in the lower-left website banner unless specifically requested.
* Do not use numbered slide badges unless visible numbering is necessary to understand the sequence.
* Avoid icons that could be mistaken for medical certification or clinical endorsement.

### File naming

Use descriptive names that identify the campaign, placement, dimensions, and slide number. Examples:

```text
loneliness-static-feed-1080x1350.png
loneliness-video-slide-01-1080x1920.png
loneliness-video-slide-02-1080x1920.png
loneliness-video-slide-03-1080x1920.png
real-vs-robotic-static-feed-1080x1350.png
```

Do not deliver files with generic names such as `imagegen.png`, `final.png`, `edit.png`, or `image-1.png`.

### Final advertising quality-control checklist

Before approval or export, confirm that:

* The official logo is correct and undistorted.
* The headline and all supporting text are accurate and spelled correctly.
* No placeholder text, including `Edit`, remains.
* The website address is correct.
* The globe icon appears with the website CTA.
* Dimensions and aspect ratio match the intended placement.
* Text is readable on a phone.
* Essential content is inside the mobile safe area.
* Claims match the approved article and sources.
* Qualifications and limitations are preserved.
* The ad does not imply guaranteed medical outcomes.
* The ad does not imply that robotic pets replace people.
* General informational campaigns remain educational and soft sell.
* Each static ad and each video slide is delivered as an individual PNG.

## Digest article formatting

All Interactive Companion Digest articles (`app/digest/\*/page.tsx`) use the
shared `DigestArticle` template and its companion components in
`components/digest-layout.tsx`. These already enforce the current standard —
do not re-derive per-article styling; use the components below.

* **Column width, paragraph spacing, typography:** built into `DigestArticle`
itself (`max-w-2xl` column, `prose-p:mb-8` for a full blank-line gap between
paragraphs, `prose-p:leading-8`). Nothing to add per article — just wrap
content in `<DigestArticle meta={{...}}>`.
* **Fonts:** site default (Inter) — do not introduce per-article fonts.
* **Hero image:** pass `meta.heroImage = { src, alt, caption? }` when a
suitable photo exists for the article's topic. Not mandatory if no fitting
image is available, but preferred when one is.
* **FAQ sections:** use `<ArticleFAQ items={\[{ q, a }, ...]} />` — bold
question, answer below, full blank-line gap between pairs. Don't hand-roll
`<h3>`/`<p>` pairs.
* **"See our related rankings" links:** use
`<RelatedRankings links={\[{ href, label }, ...]} />` — royal blue
(`#4169E1`), bold, underlined. Don't use `prose-a` defaults or `Link`
directly for this section.
* **In-article product recommendations:** use `<ArticleProductCard slug=... reason=... products={products} />` (add `tint="blue"` for the light-blue
variant) plus `<ArticleProductJsonLd slug=... products={products} />`.
Price and rating always come from `components/site-data.ts` (sourced from
the Product Matrix) — never hardcode a price or rating in article prose.
The card automatically shows "Price checked \[date] / Rating checked
\[date]" from the spreadsheet's last-checked fields, and the JSON-LD block
makes both machine-readable to search engines.

## Known Benign Warnings

These console/terminal messages have been investigated and confirmed
harmless. Still report them if you see them (in case something about the
underlying cause has changed) — but they are not blockers for testing or
deployment.

### "Encountered a script tag while rendering React component"

```
\[browser] Encountered a script tag while rendering React component. Scripts
inside React components are never executed when rendering on the client.
```

**Cause:** Several pages embed SEO structured data (JSON-LD) via a raw
`<script type="application/ld+json" dangerouslySetInnerHTML={...} />` tag —
this is the standard, Next.js-recommended pattern for JSON-LD, including in
the shared `<JsonLd>` component (`components/json-ld.tsx`). React 19 warns
whenever a `<script>` tag gets reconciled during a **client-side**
render — which happens on any Next.js `<Link>` "soft" navigation between
pages (not full page reloads). It does not happen on a hard page load,
which is why it may not show up if you're mostly refreshing/typing URLs
rather than clicking between pages.

**Why it's safe to ignore:** JSON-LD isn't meant to *execute* as
JavaScript — it's inert structured data that search engine crawlers read
directly from the page's HTML. It doesn't matter that React "doesn't
execute" it during a client re-render, because it was never supposed to
run in the first place. This only affects the dev console; it doesn't
affect what search engines see (they read the full server-rendered HTML on
first load) and doesn't affect site functionality.

**First seen:** August 2026, likely surfaced by a Next.js upgrade (project
is on Next.js 16.2.6 as of this writing) combined with testing that
involved a lot of link-to-link navigation rather than hard reloads.

**When to actually worry:** if the warning is accompanied by a real error
(e.g. "Uncaught Error," a 500 response, a blank/broken page, or anything
that changes what's visibly rendered) — that's a separate, real problem,
not this one.

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
`app/best-pets-for-\*/page.tsx`), use this exact pattern so every page looks
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
    backgroundImage: \[
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

* `rgba(R,G,B,...)` must match the hero section's own background color
(e.g. `rgba(255,237,213,...)` for `bg-orange-100`, `rgba(204,251,241,...)`
for `bg-teal-100`) so the fade blends into the panel instead of showing a
seam.
* The gradient stops (`0% / 6% / 13% / 20%`) fade out quickly, right next to
the text — full clarity is reached by 20% across the panel, so the subject
of the photo (the person's face/shoulder) reads with zero tint. Nudge the
percentages if a specific photo's subject sits closer to the panel's left
edge, but keep the fade confined to roughly the first fifth of the panel
as the default.
* `backgroundPosition`'s `center 20%` controls vertical framing (crops
toward the top of the photo, where faces usually are) — adjust per photo
if needed, but keep the "left" position for the gradient layer unchanged.
* Hidden below the `sm` breakpoint so the photo never fights the text on
mobile.

**Exception:** `best-pets-for-seniors-in-memory-care-facilities` predates
this convention and uses a wider, more gradual fade across most of the
panel. Leave it as-is — do not retrofit it to this pattern.

## Edit content

Main editable content lives in:

* `components/site-data.ts`
* `components/\\\\\\\\\\\\\\\*`

Replace placeholder links with your affiliate URLs before launch.

