# Little Lighthouse - Project State

## Current Objective
Rebuild the Little Lighthouse blog to match the supplied Folk Canvas mockups at high fidelity for `/`, `/posts`, `/posts/[slug]`, and `/categories/[category]`.

## Current Snapshot
- Route consumers now read the merged publishing route collection instead of `src/data/folkShowcase` directly.
- Public category links and static params preserve `/categories/c++` while keeping `c-plus-plus` as the internal publishing slug.
- `npm.cmd run build` passes and exports 18 pages.
- Browser QA on the exported HTML confirmed `/`, `/posts.html`, `/categories/c++.html`, and `/posts/java-map-comparison.html` render correctly with no page-level horizontal overflow.
- The remaining deliverable step is GitHub Pages publish of the refreshed static export.

## Latest Verification
- 2026-06-17: Feed/static metadata migration now uses published package posts from `content/posts/*.md` plus `.meta.json`. `node scripts/generate-static-meta.mjs` reports 5 published package posts, and `npm.cmd run build` still passes with 18 exported pages.
- 2026-06-17: Documentation repair restored bilingual README pages, local README badge/screenshot assets, and current publishing-package status on `source`; commit `23bf3d2` was pushed.
- 2026-06-17: Production-review hardening for the blog publishing package phase fixed draft leakage, meta filename mismatch risk, and missing related-post references. `npm.cmd run build` passes with 18 exported pages after the fixes, and commit `e5edf59` was pushed to `source`.
- 2026-06-17: Blog publishing package Phase 1/2 is underway. Added publishing schema/defaults, companion metadata for the five Markdown posts, package resolver/validation/warning helpers, and moved `src/lib/posts.ts` to the package loader while preserving showcase-driven Folk Canvas routes. `npm.cmd run build` passes with 18 exported pages.
- 2026-06-17: Added `design-system/folk-canvas-semantic-and-metadata-fix.md` and tightened the category/detail semantic pass. Category archives now stay scoped to their own posts, post detail related cards use the first three valid non-self candidates, and `/categories/[category]` plus `/posts/[slug]` now emit route-specific Open Graph/Twitter metadata. `npm.cmd run build` still passes with 18 exported pages.
- 2026-06-17: Static browser QA over `http://127.0.0.1:4173` checked `/`, `/posts`, `/categories/java`, and `/posts/java-map-comparison` at desktop `1600x900` and mobile `390x844`. All four routes showed no page-level horizontal overflow, and the mobile menu still opened correctly on the exported site.
- 2026-06-17: Added a repository-facing `README.md` and `design-system/github-repo-page-plan.md` so the GitHub homepage now shows project description, live link, preview screenshots, route overview, stack, structure, and local setup instead of a bare file list.
- 2026-06-17: Fixed Production Code Quality Review routing/count findings. Unknown Folk Showcase slugs/categories no longer silently fall back to the first record, archive/category badges now derive from real showcase ownership, and `npm.cmd run build` still passes with 18 exported pages.
- 2026-06-17: Fixed Production Code Quality Review content-consistency findings. Folk Showcase now has a shared JSON content source, unique post slugs, per-post article bodies, and RSS/sitemap generation from the same source. `npm.cmd run build` passes and exports 18 pages. Export checks confirm `/categories/design-notes`, `/posts/interfaces-with-memory`, `/posts/static-sites-feel-alive`, `/posts/better-notes-system`, and `/posts/constraints-make-better-pages` are present while `/categories/other` is absent.
- 2026-06-17: `npm.cmd run build` passes and exports 15 pages. Active UI scan over `src` and `public/ornaments/folk` found no rejected `Folklore & Code` branding or decorative Unicode residue. Final screenshots for desktop/mobile route matrix are saved under `output/qa-screenshots/final-pass-2026-06-17/`.
- 2026-06-17: The production static export is healthy; exported HTML includes the updated mobile menu button with `aria-label="Open navigation menu"`, `aria-expanded`, and `aria-controls="folk-primary-navigation"`. Next dev preview still intermittently reproduces a stale chunk/runtime issue: `Cannot find module './250.js'`. Treat that as a dev-cache/process issue separate from the export artifact unless dev preview is specifically needed.
- 2026-06-17: Visual QA reviewed key desktop and mobile screenshots for `/categories/design-notes` and `/posts/java-map-comparison`; framed canvas, side rails, integrated header/footer, summary band, illustration cards, detail hero, and local folk SVG assets are visible. No page-level horizontal overflow was measured in the screenshot matrix.

## Deploy Status
- Live site: https://dengyie.github.io
- Source code branch: `source`
- Built static site branch: `main`
- Local project path: `E:\project\blog\personal-blog`

## Current UI Direction
- Style: Folk Canvas: dark-first, Dala-inspired, handcrafted, editorial bento
- Brand: `Little Lighthouse` is mandatory everywhere.
- Default theme: dark
- Design source of truth: `design-system/MASTER.md`, `design-system/IMPLEMENTATION-PLAN.md`, `design-system/ASSET-AND-DATA-SPEC.md`, and page specs in `design-system/pages/`

## Tech Stack
- Next.js 15 App Router
- TypeScript
- CSS Modules
- Markdown content with `gray-matter`, `remark`, and `remark-html`
- Static export via `output: "export"` in `next.config.ts`

## Route Structure
| Route | Purpose |
| --- | --- |
| `/` | Homepage with hero, latest notes, category explorer, manifesto |
| `/posts` | All posts list |
| `/posts/[slug]` | Static post detail page |
| `/categories/[category]` | Static category archive |

## SEO And Feeds
- `scripts/generate-static-meta.mjs` generates `public/rss.xml`, `public/sitemap.xml`, and `public/robots.txt` from published package posts under `content/posts/`.
- `prebuild` runs the generator before every `next build`.
- `.nojekyll` is included so GitHub Pages serves `_next/` assets correctly.

## Publishing Package Status
- Existing Markdown-backed posts now use `content/posts/<slug>.meta.json` companion metadata.
- `src/lib/posts.ts` consumes `src/lib/publishing/loadPackagePosts.ts`.
- Public package post lists filter `published: true`.
- Meta slug/file mismatches and missing `relatedPosts` references are blocking validation errors.
- Feed/static metadata generation now reads package posts instead of raw showcase JSON.
- Current Folk Canvas routes now consume the merged normalized route collection.
