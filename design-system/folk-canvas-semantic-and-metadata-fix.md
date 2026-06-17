# Folk Canvas Semantic And Metadata Fix

## Objective

Tighten the Folk Canvas framework pass after the latest production-style review so the exported routes keep their visual direction without drifting into incorrect content relationships or weak page metadata.

## Scope

- Stop category archive pages from padding with posts owned by other categories.
- Fix related-post selection on detail pages so the list no longer skips the first valid candidates.
- Add route-specific social metadata for category and post detail pages instead of falling back to site-wide defaults.

## Decisions

### 1. Category archives should prefer semantic truth over filler density

- `getFolkPostsByCategory()` now returns only posts that belong to the requested category.
- The `design-notes` grouped visual rule still includes `Static Web`.
- If a category has fewer than five owned posts, the lower grid can render fewer cards for now.

### 2. Related posts should use the first valid neighbors

- Post detail related content now uses the first three non-self posts from the shared showcase source.
- The prior `slice(2, 5)` behavior skipped earlier valid candidates without any product reason.

### 3. Category and detail pages need route-level sharing metadata

- `/categories/[category]` now emits category-specific Open Graph and Twitter metadata.
- `/posts/[slug]` now includes `siteName` and Twitter metadata alongside its article Open Graph fields.

## Acceptance Checks

- `npm.cmd run build` passes and exports 18 pages.
- `out/categories/java.html` no longer contains Android, C++, or Design Notes filler cards.
- `out/posts/java-map-comparison.html` related posts start from the first valid non-self records.
- Exported category and detail HTML contain route-specific `og:title` and `twitter:title` values.
