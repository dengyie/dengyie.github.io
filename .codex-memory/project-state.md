# Little Lighthouse - Project State

## Current Objective
Rebuild the Little Lighthouse blog to match the supplied Folk Canvas mockups at high fidelity for `/`, `/posts`, `/posts/[slug]`, and `/categories/[category]`.

## Current Snapshot
- The final closeout audit is in its last step: build, route verifiers, and `git diff --check` are green, and the stray category fidelity helper is being committed rather than left as an orphaned scratch file.
- Final delivery audit now has passing build, export, route-level fidelity verifiers, cross-route smoke checks, repository-facing README alignment, and desktop/mobile visual QA evidence for the four shipped Folk Canvas routes.
- Route consumers now read the merged publishing route collection instead of `src/data/folkShowcase` directly.
- Public category links and static params preserve `/categories/c++` while keeping `c-plus-plus` as the internal publishing slug.
- `npm.cmd run build` passes and exports 18 pages.
- Static metadata prebuild no longer emits the known legacy frontmatter drift warnings for the five package-backed Markdown posts; `.meta.json` remains the blocking source of truth for package validation.
- Browser QA on the exported HTML confirmed `/`, `/posts.html`, `/categories/c++.html`, and `/posts/java-map-comparison.html` render correctly with no page-level horizontal overflow.
- GitHub Pages is now aligned to `workflow` mode on `source`, and the refreshed export is live from the same branch as the production workflow.
- `/posts` archive fidelity phase 1 now uses archive-only Folk Showcase display fields for title, excerpt, date label, reading time, and showcase ordering while preserving canonical publishing metadata for detail pages, feeds, and validation.
- `/posts/[slug]` detail fidelity phase 1 now uses a detail-only Folk Showcase display layer for visible title, excerpt, date label, reading panel copy, and the approved related-post card set on `java-map-comparison`, while keeping canonical publishing metadata intact.
- `src/lib/publishing/routeCollection.ts` now honors `groupedArticleCategories`, so the `design-notes` route consistently groups `Design Notes` and `Static Web` posts for counts and category archives.
- `scripts/verify-posts-archive-fidelity.mjs` now asserts the visible exported `/posts` HTML keeps the approved archive titles, dates, and featured order.
- `scripts/verify-post-detail-fidelity.mjs` now asserts the visible exported `/posts/java-map-comparison.html` keeps the approved detail title, body snippets, quote, and related-post ordering without treating `<head>` metadata as visible UI.
- `scripts/verify-category-page-fidelity.mjs` now validates the exported `Craft & Code` page against the grouped 8-post target copy and structure.

## Latest Verification
- 2026-06-18: Final delivery audit re-ran `npm.cmd run build`, `node scripts/verify-posts-archive-fidelity.mjs`, `node scripts/verify-post-detail-fidelity.mjs`, `node scripts/verify-category-page-fidelity.mjs`, and the cross-route smoke check over `/`, `/posts`, `/posts/java-map-comparison`, and `/categories/design-notes`. All checks passed. Static export HTML still contains `Little Lighthouse` and excludes `Folklore & Code` on the shipped routes. Existing desktop/mobile QA screenshots under `output/qa-screenshots/final-pass-2026-06-17/` still match the final route family.
- 2026-06-18: Completed `/posts/[slug]` fidelity tuning phase 1. The detail route now uses a stronger editorial hero spread, enriched reading panel, denser sidebar cards, and a more integrated related-posts dock. Static browser QA over `http://127.0.0.1:4173/posts/java-map-comparison.html` passed at `1600x900` and `390x844` with `Little Lighthouse` branding, `On this page`, author, and related-post modules visible plus no page-level horizontal overflow.
- 2026-06-18: Added the detail-route display override layer plus `scripts/verify-post-detail-fidelity.mjs`, then rechecked the exported detail page at `http://127.0.0.1:3001/posts/java-map-comparison.html`. The visible page now shows `Memory Maps for Modern Java`, the approved Folk Showcase body copy, and the three mockup-facing related cards in order while desktop/mobile width checks remain clean.
- 2026-06-18: Completed `/categories/[category]` fidelity tuning phase 1. `npm.cmd run build` passes, `node scripts/verify-category-page-fidelity.mjs` passes, and the exported `http://127.0.0.1:3001/categories/design-notes.html` route now presents the grouped 8-post `Craft & Code` board with stronger hero, summary band, featured asymmetry, pagination dots, and integrated footer.
- 2026-06-18: Added archive-only display copy and ordering for `/posts`, verified the exported archive with `node scripts/verify-posts-archive-fidelity.mjs`, and rechecked `http://127.0.0.1:4173/posts.html` at `1600x900` and `390x844`. The visible archive now shows `Memory Maps for Modern Java` and `RecyclerView: What Actually Gets Reused` as the two featured cards with no page-level horizontal overflow.
- 2026-06-18: Completed `/posts` fidelity tuning phase 1. The desktop archive now uses a tighter editorial sidebar stack, exactly two featured cards, varied lower-card rhythm, and a dedicated archive rail wrapper. Static browser QA over `http://127.0.0.1:4173/posts.html` passed at `1600x900` and `390x844` with `All Posts | Little Lighthouse`, 6 post cards, and no page-level horizontal overflow in either viewport.
- 2026-06-18: Added `design-system/documentation-encoding-repair-2026-06-18.md`, repaired the Chinese repository README plus the active `/posts` phase note as clean UTF-8 text, and verified the touched docs with a targeted mojibake scan.
- 2026-06-18: Added `design-system/legacy-frontmatter-drift-cleanup.md` for the next publishing cleanup phase and aligned the five Markdown-backed post frontmatter blocks with their canonical `.meta.json` values. `npm.cmd run build` passes with 18 exported pages and prebuild no longer prints the previous migration warning block.
- 2026-06-17: Added `design-system/github-pages-workflow-release-fix.md`, changed `.github/workflows/deploy.yml` to run on `source` pushes, switched the repository Pages site to `build_type: workflow` with `source` as the source branch, added `source` to the `github-pages` environment branch policy, pushed commit `3840cdf`, and verified successful deploy run `27668119161` plus live `https://dengyie.github.io/` status `200`.
- 2026-06-18: GitHub API confirms Pages is already configured as `build_type: workflow` with source branch `source` and path `/`. The remaining release task is to push the `source`-only workflow trigger and verify a fresh `Deploy to GitHub Pages` run succeeds from `source`.
- 2026-06-17: Clean-checkout publishing release fix now reports frontmatter drift in `scripts/generate-static-meta.mjs` prebuild logs instead of silently discarding it. `npm.cmd run build` passes and exports 18 pages while printing the remaining migration warnings for the five legacy Markdown files.
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
- GitHub Pages mode: `workflow`
- GitHub Pages source branch: `source`
- Local project path: `E:\project\blog\personal-blog`
- Delivery status: implementation complete for the documented Folk Canvas scope; remaining items are explicit follow-up maintenance or user-confirmation cleanup only

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
- Legacy Markdown frontmatter disagreement is warning-only during this migration phase, but the previously known five-post drift has now been aligned.
