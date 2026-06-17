# Posts Page Fidelity Tuning Phase 1

## Phase

Folk Canvas visual tuning for `/posts`

## Objective

Bring the `/posts` archive materially closer to the approved `folk-canvas-posts-page.png` mockup while preserving the current static-export-safe data model and interaction behavior.

## Current Gaps

Based on the current implementation and the latest desktop/mobile QA screenshots:

1. the left sidebar title block is directionally correct but still too airy and not ornamental enough compared with the mockup
2. the featured cards feel too uniform and boxed; the mockup has stronger asymmetry, denser decorative rails, and more editorial contrast
3. the lower four-card row reads as a balanced grid, while the mockup has a slightly more varied visual rhythm and stronger hover/emphasis treatment
4. mobile preserves usability, but the first-viewport identity still leans a bit more "clean implementation" than "dense Folk Canvas board"

## Scope

Touch only the `/posts` route and shared Folk components/styles that directly affect that route:

- `src/app/posts/page.tsx`
- `src/components/folk/FolkPostCard.tsx`
- `src/components/folk/folk.module.css`
- any closely related Folk route helpers only if required by the archive composition

## Non-Goals

- no route/data model migration
- no content copy rewrite beyond small presentational labels if needed
- no changes to `/posts/[slug]`, `/categories/[category]`, or `/` unless a shared Folk component change naturally carries over safely
- no asset deletion

## Implementation Map

### Desktop

- tighten the left sidebar block so the title, subtitle, ornament rail, category controls, and workshop card read as one stronger editorial column
- increase the featured-card contrast:
  - stronger illustration panel presence
  - denser vertical ornament strip
  - more distinct inner framing
  - slightly more intentional copy spacing
- tune the four-card row so at least one card reads as an emphasized hover-like state and the grid has more shape variation
- keep the ornamental divider and pagination/load-more row aligned with the mockup rhythm

### Mobile

- preserve the current archive card usability
- keep category pills readable and compact
- make the first viewport feel more like the desktop identity scaled down, not just a tidy stacked list

## Archive Copy Strategy

- `/posts` keeps the merged publishing route collection as its canonical source for slugs, dates, categories, links, and visibility
- archive cards may override `title`, `excerpt`, `dateLabel`, and `readingTime` with curated Folk Showcase copy when the same slug exists in `src/data/folkShowcase.json`
- post detail pages, feeds, metadata, and package validation continue to use canonical publishing/package content

## Decision Notes

### 2026-06-18 - Archive Cards Prefer Mockup-Facing Copy

- Problem: the route migration to merged publishing data replaced mockup-facing archive titles like `Memory Maps for Modern Java` with package titles like `HashMap, Hashtable, and ConcurrentHashMap`, which made the `/posts` first viewport drift away from `folk-canvas-posts-page.png`
- Choice: add an archive-only display-copy and ordering layer for `/posts` instead of changing canonical publishing titles
- Rationale: the mockup fidelity requirement is route-specific, while package metadata, feeds, and detail pages should stay truthful to the publishing package migration
- Risk: the archive can intentionally present a different short title/excerpt than the post detail page; this is acceptable for the current framework-first phase and is now explicit in the phase doc

## Acceptance Criteria

- `npm.cmd run build` passes
- `/posts` still exports correctly in the 18-page build
- desktop `/posts` first viewport reads closer to `folk-canvas-posts-page.png` in hierarchy and ornament density
- mobile `/posts` keeps no page-level horizontal overflow and retains the Folk Canvas identity
- production review finds no new blocking regressions in the touched diff
