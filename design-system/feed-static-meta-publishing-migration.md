# Feed Static Metadata Publishing Migration

## Objective

Move `scripts/generate-static-meta.mjs` from raw Folk Showcase JSON to the normalized blog publishing package chain so RSS, sitemap, and robots output follow the same publication rules as future blog posts.

## Current State

- The generator reads `src/data/folkShowcase.json` directly.
- Folk Canvas route UI still renders showcase content while package route migration is pending.
- Real Markdown-backed posts now live as publishing packages:
  - `content/posts/<slug>.md`
  - `content/posts/<slug>.meta.json`
- Package metadata is canonical for publishing fields.
- Public package lists must only expose `published: true` posts.

## Desired Behavior

The static metadata generator should:

1. read Markdown package slugs from `content/posts/*.md`
2. read matching `content/posts/*.meta.json`
3. enforce metadata slug and filename agreement
4. normalize category aliases to canonical slugs
5. validate required publishing fields
6. validate `relatedPosts` references against known package slugs
7. exclude `published: false` posts from RSS and sitemap output
8. generate category sitemap entries only for canonical categories that have at least one published package post
9. keep `robots.txt` generation unchanged

## Implementation Constraints

The script runs as plain Node before `next build`, so it should not import TypeScript modules or rely on the `@/*` alias. For this phase, duplicate only the small script-safe category normalization data needed by the generator. Route consumers can later move to a shared runtime once the full publishing migration is complete.

## Expected Output Shift

Folk Showcase currently includes showcase-only cards that do not have Markdown package files. After this migration:

- RSS represents published article packages, not visual showcase-only cards.
- sitemap post URLs represent published article packages.
- sitemap category URLs represent categories owned by published package posts.

This is intentional because feed and search metadata are distribution surfaces, not visual filler surfaces.

## Acceptance Criteria

- `scripts/generate-static-meta.mjs` no longer reads `src/data/folkShowcase.json`.
- Generated RSS includes only published package posts.
- Generated sitemap includes only published package post URLs and their canonical categories.
- Package validation catches missing metadata, slug mismatch, missing required fields, invalid dates, unknown categories, duplicate slugs, self-related posts, and missing related post references.
- `npm.cmd run build` passes.
- Project memory records the migration result and next route-consumer migration step.
