# Legacy Frontmatter Drift Cleanup

## Objective

Remove the remaining legacy Markdown frontmatter drift from the five package-backed posts so the publishing prebuild no longer emits migration warnings for title, category, or excerpt mismatches.

## Problem

The publishing chain now intentionally tolerates frontmatter drift during the package migration, but the committed Markdown files still carry older frontmatter values.

Current symptoms:

- prebuild logs print migration warnings for all five Markdown-backed posts
- several frontmatter values are mojibake and no longer match the canonical `.meta.json`
- `markdown-syntax.md` still uses the old `Other` category in frontmatter while the canonical metadata now maps to `Design Notes`

This no longer blocks release, but it keeps the content package in a transitional state and makes author-facing files harder to trust.

## Scope

- update frontmatter in:
  - `content/posts/android-recyclerview-cache.md`
  - `content/posts/cpp-grammar-basics.md`
  - `content/posts/java-map-comparison.md`
  - `content/posts/java-stack-heap.md`
  - `content/posts/markdown-syntax.md`
- align `title`, `date`, `category`, and `excerpt` with each file's companion `.meta.json`
- preserve Markdown body content as-is for this phase

## Non-Goals

- rewriting article bodies
- removing frontmatter entirely
- changing canonical `.meta.json` values
- changing publishing resolver behavior

## Implementation Plan

1. Read the current `.meta.json` companions for the five Markdown-backed posts.
2. Replace each Markdown file's legacy frontmatter values with the canonical metadata text.
3. Keep the body untouched so this phase only resolves metadata drift.
4. Run `npm.cmd run build` and confirm the migration warning block disappears from prebuild output.
5. Run the production review workflow on the resulting diff and record the outcome in project memory.

## Acceptance Criteria

- `npm.cmd run build` passes
- prebuild no longer prints frontmatter drift warnings for the five existing package-backed posts
- the five Markdown files still parse correctly
- no `.meta.json` content changes are required for this cleanup
