# Folk Canvas Content Consistency Fix

## Objective

Fix the production review issues where Folk Canvas cards, post detail pages, RSS, and sitemap use different content sources or ambiguous identifiers.

## Scope

- Use a single local data file for Folk Showcase post/category metadata.
- Ensure every post card has a unique slug and resolves to a matching detail page.
- Render post detail body content from the same post record instead of one hardcoded Java article.
- Generate RSS and sitemap from the same Folk Showcase source while the site is in framework-first mode.
- Add lightweight build-time validation for duplicate slugs and dangling categories.

## Non-Goals

- Do not restore full markdown article rendering in this pass.
- Do not change the Folk Canvas visual layout unless required by content structure.
- Do not delete legacy markdown, old components, screenshots, or logs.

## Acceptance Checks

- `npm.cmd run build` passes.
- No duplicate `folkPosts` slugs.
- `/posts`, `/categories/design-notes`, and `/posts/[slug]` show matching titles, links, and detail content.
- `out/sitemap.xml` includes `/categories/design-notes` and `/posts/interfaces-with-memory`.
- `out/sitemap.xml` does not include `/categories/other`.
