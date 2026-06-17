# Category Page Fidelity Tuning Phase 1

## Phase

Folk Canvas visual tuning for `/categories/[category]`

## Objective

Bring the category archive materially closer to `folk-canvas-category-page.png` while preserving the current static-export-safe route model, publishing chain, and frame/footer behavior.

## Current Gaps

Based on the current implementation and the approved category mockup:

1. the page structure is already close, but the hero still reads as a clean centered title block rather than a denser editorial category stage
2. the summary band is functional, but it lacks the stronger medallion, stat separation, and handcrafted weight seen in the mockup
3. the featured row and lower cards preserve the correct 2 + 3 rhythm, but the asymmetry, teal contrast, and hover-forward emphasis are still lighter than the target image
4. mobile keeps the frame and stacking behavior, but the first viewport should feel more intentionally composed and more clearly related to the desktop board

## Scope

Touch only the category archive route and shared Folk styles/components that directly affect that route:

- `src/app/categories/[category]/page.tsx`
- `src/components/folk/folk.module.css`
- closely related shared Folk helpers only if required by the category composition

## Non-Goals

- no route/data-model migration
- no publishing-schema changes
- no content-source rewrite
- no file deletion
- no homepage, posts archive, or post-detail retuning unless a shared Folk change carries safely

## Implementation Map

### Desktop

- strengthen the category hero:
  - back link should read as a clearer red editorial affordance
  - title block should feel more dominant and ceremonial
  - motif density should better echo the diamonds, plants, and horse silhouettes from the source image
- enrich the summary card:
  - medallion treatment should feel more inset and intentional
  - description and stats should separate more clearly
  - right-side stats should feel more like archival markers than generic counters
- tune the post grid:
  - keep the first row as two featured cards with stronger asymmetry
  - keep one card reading as a warmer hover-emphasis state and the other as a cooler teal sibling
  - make the lower three-card row feel slightly more compact and editorial

### Mobile

- preserve no page-level horizontal overflow
- keep the current stacked-card usability and integrated footer
- make the opening category view feel more like a reduced Folk Canvas board and less like a generic single-column archive

## Decision Notes

### 2026-06-18 - Keep Category Tuning Isolated From User In-Flight Detail Work

- Problem: the working tree already contains user-side uncommitted changes in `src/app/posts/[slug]/page.tsx`
- Choice: keep this phase scoped to `/categories/[category]` and shared Folk styles used by that route only
- Rationale: the category-fidelity phase can move forward without touching the active post-detail file, which avoids entangling unrelated in-flight work
- Risk: some shared Folk style changes may still have light cross-route effects; verify them conservatively during build and browser QA before claiming the phase complete

### 2026-06-18 - Grouped Category Rules Must Live In The Route Layer

- Problem: the category mockup expects `Craft & Code` to include both `Design Notes` and `Static Web`, but hardcoding that post set only in the page component made the visible list diverge from route counts and ownership rules
- Choice: implement grouped-category membership through the shared publishing route collection using `groupedArticleCategories`, then let the page consume that unified route result
- Rationale: list content, counts, metadata, and future tests all need the same source of truth; a page-local curated list would recreate the exact semantic drift fixed in the earlier semantic pass
- Impact: `/categories/design-notes` can still satisfy the mockup-facing visual target while keeping the count, card set, and category ownership on one consistent data path

## Acceptance Criteria

- `npm.cmd run build` passes
- the route still exports correctly in the 18-page build
- desktop `/categories/[category]` reads closer to `folk-canvas-category-page.png` in hero, summary band, and post-grid hierarchy
- mobile `/categories/[category]` keeps the required modules with no page-level horizontal overflow
- production review finds no new blocking regressions in the touched diff
