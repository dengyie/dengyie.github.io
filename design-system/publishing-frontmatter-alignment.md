# Publishing Frontmatter Alignment

## Objective

Remove the remaining legacy frontmatter drift in the five Markdown-backed package posts so the publishing package no longer emits avoidable migration warnings during prebuild.

## Problem

The publishing package intentionally treats `.meta.json` as canonical and only warns when legacy Markdown frontmatter disagrees.

That warning path was useful for the clean-checkout release fix, but the current repository still ships five known mismatches:

- `android-recyclerview-cache`
- `cpp-grammar-basics`
- `java-map-comparison`
- `java-stack-heap`
- `markdown-syntax`

As long as those mismatches remain, each production build prints drift warnings that no longer carry new information.

## Phase Goal

Bring the Markdown frontmatter into alignment with canonical package metadata without changing article body content, route behavior, or visual output.

## Scope

Update only the frontmatter blocks in:

- `content/posts/android-recyclerview-cache.md`
- `content/posts/cpp-grammar-basics.md`
- `content/posts/java-map-comparison.md`
- `content/posts/java-stack-heap.md`
- `content/posts/markdown-syntax.md`

## Alignment Rules

For this phase:

1. `.meta.json` remains the source of truth
2. Markdown body prose stays untouched
3. frontmatter should match canonical `title`, `date`, `category`, and `excerpt`
4. no route or publishing code should change unless review uncovers a regression

## Acceptance Criteria

- `scripts/generate-static-meta.mjs` no longer prints frontmatter drift warnings for the five migrated posts
- `npm.cmd run build` passes
- exported route count remains 18 pages
- production code review finds no new correctness or release regressions in the phase diff
