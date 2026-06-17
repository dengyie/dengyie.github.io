# Route Consumer Publishing Migration

## Objective

Move the homepage, posts index, post detail, and category archive consumers away from direct `src/data/folkShowcase` access and onto one normalized route-facing collection that can combine package-backed posts with showcase-only filler posts.

## Why This Phase Exists

- Feed and sitemap already moved to the publishing package chain.
- Route consumers still read `src/data/folkShowcase.ts` directly.
- Replacing route data with package-only posts today would drop the current 18 exported page surface because only 5 real package posts exist.
- The visual Folk Canvas implementation still depends on enough cards to preserve the approved mockup density.

## Migration Strategy

This phase should not jump straight to package-only routes.

Instead, add a normalized route collection layer with these rules:

1. package-backed published posts are the canonical source when a slug exists in `content/posts/`
2. showcase-only posts remain available as visual filler until package coverage grows
3. route consumers read the same merged collection, not raw showcase JSON
4. package-backed slugs win over showcase duplicates
5. category derivation and counts come from the merged normalized collection

## Data Model Direction

Create a route-facing module under `src/lib/publishing/` that exposes:

- all route posts
- featured route posts
- recent route posts
- route categories with counts
- post lookup by slug
- posts by category
- total count

The returned post objects should already match the `PublishedPost` contract so page components do not need source-specific branching.

## Sorting And Priority Rules

- sort merged posts by descending `date`
- preserve `featured: true` when present
- if the same slug exists in both package and showcase layers, keep only the package-backed version
- keep showcase-only cards only when they do not collide with package-backed slugs

## Category Rules

- category slugs must remain canonical publishing slugs
- `design-notes` continues to absorb showcase `Static Web` content until those filler posts are replaced by package posts
- category counts and category route static params should come from the merged route collection, not from raw showcase category counts
- keep `c-plus-plus` as the internal publishing category slug, but preserve `/categories/c++` as the public route path and visible link target during this phase

## Route Expectations

After this phase:

- `/` uses merged normalized posts for featured and recent selections
- `/posts` uses merged normalized posts and merged category counts
- `/posts/[slug]` reads merged normalized post detail data and related-post candidates
- `/categories/[category]` reads merged normalized category data and post lists

## Out Of Scope

- removing `src/data/folkShowcase.json`
- removing showcase-only filler cards
- migrating every showcase-only slug into a package post
- changing the current Folk Canvas visual layout

## Acceptance Criteria

- no route page imports `src/data/folkShowcase` directly
- route pages continue to export 18 pages
- package-backed posts override matching showcase slugs
- category routes still include `java`, `android`, `c++`, and `design-notes`
- `npm.cmd run build` passes
- production code quality review finds no blocking correctness regressions in the merged route layer
