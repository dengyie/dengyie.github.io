# Publishing Clean Checkout Release Fix

## Objective

Fix the publishing-package release path so a clean GitHub checkout can build and deploy successfully from the committed repository state.

## Problem

The publishing package loader currently treats legacy Markdown frontmatter and companion `.meta.json` as a hard conflict when their values differ.

That behavior is too strict for the current repository because:

- the committed Markdown files still contain older frontmatter text
- the committed `.meta.json` files are already the canonical publishing source
- local working-tree edits can accidentally hide the problem
- GitHub Actions builds from a clean checkout and therefore sees the real committed mismatch

This surfaced in the `Deploy to GitHub Pages` workflow on `source`, where `/posts/[slug]` static param generation failed during `next build`.

## Required Behavior

For the current migration phase:

1. companion `.meta.json` remains the canonical source for publishing fields
2. legacy Markdown frontmatter may remain in place during the transition
3. frontmatter should not block the build when it disagrees with canonical metadata
4. disagreement should still be observable so the repo can be cleaned later
5. missing metadata, slug mismatch, unknown categories, duplicate slugs, and broken related-post references must remain blocking failures
6. legacy single-line frontmatter files should still parse during the migration window

## Implementation Direction

- downgrade frontmatter-vs-meta disagreement from blocking error to publishing warning
- normalize legacy single-line frontmatter into standard block frontmatter before parsing
- record the affected slug and field in the warning collector
- continue to resolve published posts from `.meta.json` plus Markdown body content
- keep route consumers and feed generation behavior unchanged

## Acceptance Criteria

- `npm.cmd run build` passes in the current working tree
- a clean checkout of `source` also passes `npm run build`
- GitHub Pages workflow can build from `source` via `workflow_dispatch`
- the warning path remains visible in code and project documentation
- this fix does not loosen existing blocking validation around missing package structure or broken relations
