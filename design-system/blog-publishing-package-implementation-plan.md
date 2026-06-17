# Blog Publishing Package Implementation Plan

## Objective

Implement the publishing-package workflow for `Little Lighthouse` so each new post can be added as a repeatable bundle:

- Markdown body
- metadata companion file
- optional article-specific assets
- resolver-backed fallbacks and validation

The implementation should preserve the current site behavior while creating a path away from the existing showcase-only data flow.

## Current State

- The shipped Folk Canvas routes currently render from `src/data/folkShowcase.json` and `src/data/folkShowcase.ts`.
- Markdown-backed posts now have companion `.meta.json` files under `content/posts/`.
- `src/lib/posts.ts` already consumes the publishing package loader.
- Feed generation still uses the showcase JSON and is the next obvious migration target.
- The approved design spec defines source ownership, category rules, publication gating, and fallback reporting.

## Phase 1 - Publishing Schema

Create a normalized publishing schema that can represent both current showcase posts and future package-based posts.

### Deliverables

- `src/data/publishing/types.ts`
- `src/data/publishing/defaults.ts`
- `src/data/publishing/authors.ts`
- `src/data/publishing/categories.ts`

### Requirements

- `PublishedPost` must be the canonical normalized shape.
- Category data must be canonical and slug-based.
- Default image and metadata values must exist in one place.
- The schema must support article-level status and fallback-aware fields.

## Phase 2 - Package Loader And Resolver

Build the resolver that consumes Markdown + meta JSON and produces normalized published posts.

### Status

- 2026-06-17: Complete for the foundation phase. Added package companion metadata for the existing Markdown posts, introduced `src/lib/publishing` resolver/validation/warning helpers, and moved `src/lib/posts.ts` onto the package loader while keeping the current Folk Canvas showcase routes stable. `npm.cmd run build` passes with 18 exported pages.
- 2026-06-17: Production review pass found and fixed publication-safety risks in the package loader. Public post lists now filter `published: true`, companion metadata slugs must match their Markdown filename, and `relatedPosts` references are validated against known package slugs. `npm.cmd run build` still passes with 18 exported pages.
- 2026-06-17: Foundation phase was committed and pushed to `source` as `e5edf59 feat: add blog publishing package foundation`.

### Deliverables

- `src/lib/publishing/loadPackagePosts.ts`
- `src/lib/publishing/resolvePublishedPost.ts`
- `src/lib/publishing/validatePublishedPost.ts`

### Requirements

- Read Markdown body files and companion metadata files.
- Enforce source ownership rules.
- Fail on duplicate publishing fields between frontmatter and meta JSON.
- Normalize categories through canonical slugs.
- Apply fallback values for missing non-critical resources.
- Produce warning summaries for optional resources that were missing.

## Phase 3 - Bridge Existing Showcase Data

Keep the current site stable while the package model is introduced.

### Deliverables

- Bridge adapter from `folkShowcase.json` to `PublishedPost`
- Compatibility layer for existing route consumers

### Requirements

- Existing pages should continue to render.
- The current showcase posts should remain available through the resolver layer.
- No route should directly depend on raw JSON shapes once the bridge is in place.

## Phase 4 - Article Resource Layout

Add the file layout for future article packages.

### Deliverables

- `content/posts/<slug>.md`
- `content/posts/<slug>.meta.json`
- `public/posts/<slug>/thumbnail.png`
- `public/posts/<slug>/hero.png`
- `public/posts/<slug>/og.png`

### Requirements

- Optional assets must be genuinely optional.
- Missing assets must fall back to defaults without breaking builds.
- Asset lookup must be deterministic and slug-based.

## Phase 5 - Consumer Migration

Move site consumers from showcase data to normalized publishing data.

### Deliverables

- homepage post selection migration
- `/posts` migration
- `/posts/[slug]` migration
- `/categories/[category]` migration
- RSS / sitemap / metadata migration

### Requirements

- All public consumers must use the same normalized resolver output.
- Publication gating must be consistent across all consumers.
- Category grouping behavior must remain explicit and centralized.

## Phase 6 - Validation And Observability

Make publishing failures and fallback use visible.

### Deliverables

- build-time validation summary
- fallback warning report
- blocking vs warning issue separation

### Requirements

- Blocking failures must stop the build.
- Non-critical omissions must surface as warnings.
- Warnings must identify the article slug and affected surface.

## Phase 7 - QA And Safety Check

Verify the implementation against the project’s production-readiness standard.

### Required Checks

- `npm.cmd run build`
- route verification for homepage, posts, post detail, and category archive
- feed and metadata verification
- fallback behavior verification for missing optional assets
- no regressions in current export output

### Acceptance Criteria

- Current site continues to build.
- New publishing package flow is available.
- Existing showcase content still renders.
- The system can safely support articles with and without custom assets.

## Out Of Scope

- CMS integration
- backend persistence
- editorial approval workflow UI
- new routes beyond the current blog surface

## Implementation Order

1. schema and defaults
2. resolver and validation
3. bridge existing showcase data
4. migrate consumers
5. add explicit fallback reporting
6. run build and QA
