# Blog Publishing Package Plan

## Objective

Introduce a stable publishing-package workflow for `Little Lighthouse` so each article can evolve beyond a single Markdown file while preserving the current Folk Canvas delivery baseline.

This phase should not replace the Folk Canvas showcase routes outright. It should establish the package contract, resolver, validation, and migration bridge needed for later phases.

## Current State

- The Folk Canvas routes are still intentionally driven by `src/data/folkShowcase.json` while route migration is pending.
- Markdown content exists under `content/posts/*.md`, with companion `.meta.json` files added for the existing Markdown-backed posts.
- `src/lib/posts.ts` now reads through the publishing package loader instead of raw Markdown frontmatter.
- RSS and sitemap are still generated from the showcase JSON until the feed/static-meta migration phase.
- The article package design lives in `docs/superpowers/specs/2026-06-17-blog-publishing-package-design.md`.

## Phase Goal

Add the first production-ready publishing-package layer without destabilizing the shipped site.

This phase should:

1. define package resources
2. add companion metadata files for existing Markdown-backed posts
3. build a resolver that normalizes Markdown + metadata into one post object
4. add validation for the package contract
5. migrate the legacy `src/lib/posts.ts` entrypoint onto the resolver

This phase should not yet:

- replace Folk Canvas route data with publishing-package data
- remove `src/data/folkShowcase.json`
- require final post images
- rewrite the whole content inventory

## Package Contract

Each article package should eventually include:

- `content/posts/<slug>.md`
- `content/posts/<slug>.meta.json`

Optional assets may later live under:

- `public/posts/<slug>/thumbnail.png`
- `public/posts/<slug>/hero.png`
- `public/posts/<slug>/og.png`

## Normalized Published Post Shape

The resolver should produce a normalized article object that includes:

- slug
- title
- date
- category
- excerpt
- readingTime
- author
- published
- featured
- tags
- relatedPosts
- seoTitle
- seoDescription
- summaryQuote
- contentHtml

The resolver may also expose asset URLs and fallback state when those become available.

## Source Precedence

For this phase, resolve fields in this order:

1. companion metadata JSON
2. publishing defaults
3. derived fallback logic

The Markdown body remains the source of article prose.

Legacy frontmatter may remain inside existing Markdown files during the migration, but it is not the authoritative publishing source in this phase.

## Validation Rules For This Phase

Blocking errors:

- missing Markdown file for a package slug
- missing required metadata file for migrated posts
- missing slug, title, date, category, or excerpt
- duplicate slugs
- related posts referencing missing slugs
- unknown categories outside the configured publishing set

Warnings only:

- missing reading time
- missing tags
- missing summary quote
- missing related posts
- missing article-specific images

## Migration Strategy

### Phase 1A - Foundation

- add `src/data/publishing/`
- add resolver and config
- add companion metadata files for the currently checked-in Markdown posts
- move `src/lib/posts.ts` to the resolver
- add a validation script
- keep existing Markdown frontmatter tolerated but non-authoritative

### Phase 1B - Bridge

- allow showcase content and publishing-package content to coexist
- define which routes stay showcase-driven versus package-driven
- keep exported route count stable

### Phase 1C - Route Adoption

- progressively move eligible routes and generators onto the normalized publishing layer
- retire duplicated content paths only after parity is proven

## Acceptance Criteria For This Phase

This phase is complete only when:

- the package plan is documented
- existing Markdown-backed posts each have a `.meta.json` companion
- a resolver produces normalized post objects
- `src/lib/posts.ts` consumes the resolver
- validation can fail on broken package structure
- `npm.cmd run build` passes
- the shipped Folk Canvas routes are not regressed

## Progress

- 2026-06-17: Added companion `.meta.json` files for the existing Markdown posts.
- 2026-06-17: Added publishing schema/defaults, package resolver, validation helpers, fallback warning collector, and showcase bridge.
- 2026-06-17: Moved `src/lib/posts.ts` to read through the package resolver while keeping the current showcase-driven Folk Canvas routes intact.
- 2026-06-17: Verified `npm.cmd run build` passes and exports 18 pages.
- 2026-06-17: Production review hardening fixed draft leakage, metadata filename/slug mismatch risk, and missing `relatedPosts` references; commit `e5edf59` pushed this foundation to `source`.

## Out Of Scope

- full migration of showcase-only placeholder posts
- replacing the Folk Canvas route frame or visuals
- deleting the legacy Markdown files
- deleting the showcase JSON layer
