# Post Detail Fidelity Tuning Phase 1

## Phase

Folk Canvas visual tuning for `/posts/[slug]`

## Objective

Bring the article detail route materially closer to `folk-canvas-post-detail.png` while preserving the current static-export-safe route model, metadata, and publishing chain.

## Current Gaps

Based on the current implementation and the approved post-detail mockup:

1. the hero is functionally correct, but it still reads more like a two-column content block than an editorial reading spread
2. the right sidebar cards exist, but their hierarchy and ornamental treatment are lighter than the mockup
3. the reading panel has drop cap and quote behavior, but it needs a stronger framed-surface cadence and section rhythm
4. the related-posts dock works, but it does not yet feel as integrated and dock-like as the source image
5. mobile keeps the needed modules, but the route identity should feel more intentionally composed and less like stacked desktop leftovers

## Scope

Touch only the post detail route and shared Folk styles/components that directly affect that route:

- `src/app/posts/[slug]/page.tsx`
- `src/components/folk/folk.module.css`
- closely related shared Folk helpers only if required by the detail composition

## Non-Goals

- no route/data-model migration
- no content-source rewrite
- no publishing-schema changes
- no file deletion
- no homepage, posts archive, or category archive retuning unless a shared Folk change carries safely

## Implementation Map

### Desktop

- strengthen the hero spread:
  - title block should feel weightier and more editorial
  - meta row should read closer to the mockup with clearer grouped markers
  - image should feel more framed and inset like a featured painting panel
- enrich the article panel:
  - keep drop cap
  - increase section rhythm and panel depth
  - make the pull quote feel more like an internal decorative callout
- refine the right sidebar:
  - stronger `On this page` card hierarchy
  - compact `Table of Contents` strip treatment
  - richer teal author card with clearer internal roles
- make the related dock read as an integrated lower band instead of a generic card stack

### Mobile

- preserve title, meta, image, reading panel, sidebar controls, author card, and related posts
- keep no page-level horizontal overflow
- make the route feel like a deliberate mobile editorial composition

## Acceptance Criteria

- `npm.cmd run build` passes
- the route still exports correctly in the 18-page build
- desktop `/posts/[slug]` reads closer to `folk-canvas-post-detail.png` in hero, sidebar, and related-dock structure
- mobile `/posts/[slug]` keeps the required modules with no page-level horizontal overflow
- production review finds no new blocking regressions in the touched diff

## Delivery Notes

- Visible detail-page content may diverge from canonical publishing metadata during this phase when the approved Folk Showcase mockup requires different article copy.
- Preserve canonical route metadata, canonical URL handling, and publishing-package ownership while overriding only the user-visible detail title, excerpt, date label, reading panel copy, and approved related-card set.
- Guard this phase with a static export check so regressions are caught from `out/posts/java-map-comparison.html`, not only from runtime inspection.
