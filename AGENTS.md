# AGENTS.md

## Scope

These instructions apply to the entire Interactive Pet Marketplace repository unless a more-specific `AGENTS.md` exists in a subdirectory.

## Required startup procedure

Before inspecting, editing, creating, moving, or deleting any project file:

1. Read the repository-root `README.md` in full.
2. Check the target directory and its parents for more-specific instruction files.
3. Identify the authoritative source files for the task.
4. Follow all data-integrity, editorial, advertising, branding, privacy, and command-line rules in `README.md`.
5. Report any conflict between the requested task and repository rules before making changes.
6. Re-read `README.md` at the start of each new coding session and after pulling changes that may have modified it.

Do not treat prior chat context as a replacement for the current repository instructions.

## Data integrity

* Never invent product specifications, features, prices, ratings, review counts, source dates, or verification status.
* Use `Documentation/Product Matrix.xlsx` as the authoritative source for product-specific data.
* Use `Documentation/product-privacy.json` for curated privacy and security findings.
* Never edit `components/site-data.ts` by hand. Generate it using the documented project workflow.
* Never scrape Amazon with scripts, bots, or scheduled automation.
* Never reproduce customer review text from Amazon, manufacturer sites, or other sources.
* Clearly label placeholders and uncertainty, and never allow unverified values to ship in user-facing fields.
* Do not introduce a factual claim from a manufacturer unless the source actually supports it.

## Editorial and research content

* Preserve the shared Digest article components and formatting conventions documented in `README.md`.
* Match research and health-related claims to approved articles and their cited sources.
* Preserve limitations and qualifications.
* Do not imply guaranteed medical outcomes.
* Do not imply that robotic pets replace people, caregivers, clinicians, or community support.
* Do not imply that a named consumer product was clinically studied unless the source confirms it.

## Advertising creative

Follow the complete advertising standards in `README.md`.

Key defaults:

* Static feed creative: `1080 × 1350` pixels, 4:5, PNG.
* Reels, Stories, and video slides: `1080 × 1920` pixels, 9:16, individual PNGs.
* Create separate feed and full-screen versions rather than relying on automatic cropping.
* Use the approved Interactive Pet Marketplace logo without alteration or distortion.
* Include a globe/web icon next to the website CTA on every applicable ad image or slide.
* Use `InteractivePetMarketplace.com` as the displayed website address unless the campaign brief specifies another approved destination.
* Keep informational campaigns educational, evidence-aware, and soft sell.
* Avoid product prices, ratings, recommendation banners, or aggressive sales language unless the campaign is explicitly product-focused.
* Never export creative containing placeholder text such as `Edit`, `URL`, `Website`, or `Click here`.
* Review all final creative at actual phone size and keep important content within mobile-safe areas.

## Code and content changes

* Make the smallest change that fully satisfies the task.
* Preserve existing architecture, naming conventions, and shared components.
* Do not duplicate logic or styling already handled by shared components.
* Do not edit generated files directly.
* Do not replace verified content with generalized model knowledge.
* Do not alter unrelated files.
* Preserve accessibility, including useful alt text, semantic structure, and readable contrast.

## Commands

* Present command-line examples using a standard command-line interface, not PowerShell.
* Prefer the existing project scripts documented in `package.json` and `README.md`.
* Before finalizing code changes, run the most relevant available checks, such as formatting, linting, tests, build, or type checks.
* If a check cannot be run, state that clearly.

## Final response requirements

When reporting completed work:

* Summarize the files changed.
* Identify any unverified values, placeholders, assumptions, or unresolved issues.
* Report the checks run and their results.
* Do not claim that a file was changed, tested, deployed, or verified unless it actually was.

