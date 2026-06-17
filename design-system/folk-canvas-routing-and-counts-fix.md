# Folk Canvas Routing And Counts Fix

## Objective

Resolve the production review issues around silent route fallback and mismatched archive counts without changing the approved Folk Canvas page family.

## Scope

- Make unknown `/posts/[slug]` and `/categories/[category]` routes fail explicitly instead of rendering the first showcase record.
- Derive archive and category counts from the real Folk Showcase post data.
- Keep the current framework-first visual filler behavior for category grids, but do not let filler cards rewrite the true category counts.
- Preserve static export compatibility and the current `Little Lighthouse` branding.

## Design Decisions

### 1. Route lookup must be strict

- `getFolkPostBySlug()` returns `undefined` when no post exists.
- `getFolkCategory()` returns `undefined` when no category exists.
- App Router pages call `notFound()` when those lookups fail.
- Metadata generation follows the same strict lookup path so canonical tags do not point at the wrong record.

### 2. Counts come from post ownership, not hardcoded labels

- `All Posts` count is `folkPosts.length`.
- Each category count is derived from the real post collection.
- `Design Notes` keeps its current visual grouping with `Static Web`, but the count shown in UI reflects the real grouped posts rather than an arbitrary spec placeholder number.

### 3. Visual filler stays presentational

- Category pages may still fill to five cards for the current Folk Canvas framework target.
- The summary band count and category control badges reflect true owned posts, not the filled visual card count.

## Acceptance Checks

- Unknown slug/category no longer resolve to the first post or first category.
- `All Posts` badge equals the number of showcase posts.
- Category badges match the real grouped post counts.
- `npm.cmd run build` still passes and exports the static site.
