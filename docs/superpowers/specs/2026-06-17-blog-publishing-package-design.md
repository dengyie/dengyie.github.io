# Blog Publishing Package Design

## Goal

Define a mature, repeatable workflow for adding a new blog post to `Little Lighthouse` using a publishing-package model instead of a single raw content file.

The selected approach is:

- **Option B: Publishing package hybrid chain**

This means each article is treated as a package composed of:

1. Markdown body content
2. A structured metadata companion file
3. Optional article-specific assets
4. A resolver layer that applies defaults, validation, and fallback logic before the site consumes the article

## Why This Approach

This project is no longer a simple text blog. A new article affects:

- homepage cards
- posts index
- post detail page
- category archive page
- RSS
- sitemap
- metadata
- Open Graph and social previews
- optional repository showcase materials

Using a per-article publishing package keeps writing, publishing, and display concerns organized without forcing all metadata into one global table or into oversized Markdown frontmatter.

## Chosen Architecture

### Source Layer

Each article should be stored as a pair:

- `content/posts/<slug>.md`
- `content/posts/<slug>.meta.json`

Optional article-specific images should live under:

- `public/posts/<slug>/thumbnail.png`
- `public/posts/<slug>/hero.png`
- `public/posts/<slug>/og.png`

Additional project-level publishing defaults should live under:

- `src/data/publishing/defaults.ts`
- `src/data/publishing/authors.ts`
- `src/data/publishing/categories.ts`

### Source Ownership Rules

The package model must avoid split-brain metadata across Markdown frontmatter and companion metadata.

Ownership should be explicit:

- `content/posts/<slug>.md` owns the article body only
- `content/posts/<slug>.meta.json` owns all publishing metadata consumed by the site

Allowed Markdown frontmatter should be kept minimal and non-authoritative. It may exist for authoring convenience, but the resolver must not treat frontmatter as the source of truth for publishing fields.

For publishing fields such as:

- slug
- title
- date
- category
- excerpt
- author
- published
- featured

the canonical source must be `content/posts/<slug>.meta.json`.

If overlapping values appear in Markdown frontmatter and `.meta.json`, the build should fail rather than silently choosing one. The design goal is to prevent different consumers from trusting different sources.

### Resolver Layer

The site should not consume raw Markdown or raw meta files directly.

Instead, a publishing resolver should:

1. read Markdown content
2. read companion metadata
3. validate required fields
4. estimate or fill derived fields
5. detect missing assets
6. apply fallback logic
7. produce one normalized `PublishedPost` object

Every consumer should use that normalized object:

- homepage
- `/posts`
- `/posts/[slug]`
- `/categories/[category]`
- RSS generator
- sitemap generator
- route metadata generation

The resolver is also responsible for enforcing source ownership rules, publication gating, category normalization, and fallback observability.

## File Structure

```text
content/
  posts/
    <slug>.md
    <slug>.meta.json

public/
  posts/
    <slug>/
      thumbnail.png
      hero.png
      og.png

src/
  data/
    publishing/
      defaults.ts
      authors.ts
      categories.ts
```

## Content Package Contract

### Required Markdown Resource

Each article must have:

- `content/posts/<slug>.md`

The Markdown file is the writing surface for the actual article body.

### Required Metadata Resource

Each article must have:

- `content/posts/<slug>.meta.json`

This file is the publishing surface for structured metadata.

### Optional Asset Resources

These assets are recommended but not mandatory because fallback behavior is required:

- `public/posts/<slug>/thumbnail.png`
- `public/posts/<slug>/hero.png`
- `public/posts/<slug>/og.png`

## Metadata Model

Recommended minimum metadata shape:

```json
{
  "slug": "java-map-comparison",
  "title": "Memory Maps for Modern Java",
  "date": "2026-06-17",
  "category": "Java",
  "excerpt": "A compact tour through objects, references, and the small traps hiding in memory diagrams.",
  "readingTime": "8 min read",
  "author": "dengyie",
  "published": true,
  "featured": false,
  "tags": ["java", "memory", "runtime"],
  "relatedPosts": ["java-stack-heap", "interfaces-with-memory"],
  "seoTitle": "Memory Maps for Modern Java | Little Lighthouse",
  "seoDescription": "A compact tour through objects, references, and memory diagrams in modern Java.",
  "summaryQuote": "A good memory model is less a diagram and more a lantern for debugging."
}
```

## Category Model

Category handling must be canonical and centralized to preserve the current route and archive behavior.

The source of truth for allowed categories should be `src/data/publishing/categories.ts`.

Each category definition should include:

- canonical slug
- display name
- description
- icon or visual defaults
- optional alias list
- optional grouping membership

Article metadata should store the canonical category slug, not a display label.

Example direction:

```ts
{
  slug: "design-notes",
  name: "Design Notes",
  aliases: ["design", "static-web"],
  groupedArticleCategories: ["design-notes", "static-web"]
}
```

Normalization rules:

1. article metadata provides one canonical category slug
2. resolver looks up display information from `categories.ts`
3. archive routes are generated from canonical slugs only
4. any grouping behavior must be encoded in `categories.ts`, not spread across page logic

If a category slug is unknown, publication should fail.

## Resource Categories Per Article

Each article package should conceptually contain five layers.

### 1. Core Publishing Fields

Required for basic publication:

- slug
- title
- date
- category
- excerpt
- readingTime
- published
- featured
- author

### 2. Visual Resources

Used for cards, detail hero regions, and social previews:

- thumbnail
- hero image
- OG image
- optional mobile-safe crop
- visual kind
- surface style

### 3. Editorial and Distribution Fields

Used for stronger publishing quality:

- seoTitle
- seoDescription
- seoKeywords
- canonicalUrl
- tags
- series
- relatedPosts
- homePriority
- categoryPriority
- pinned or featured state
- summaryQuote

### 4. QA and Release Fields

Used to make publishing state explicit:

- draft or published state
- reviewed state
- qaScreenshots.desktop
- qaScreenshots.mobile
- brokenLinksChecked
- metadataChecked
- rssIncluded
- sitemapIncluded
- publishedAt
- updatedAt

### 5. Derived Fields

Resolver-generated when omitted:

- readingTime estimate
- canonical URL
- SEO defaults
- related post suggestions
- TOC

## Fallback Strategy

Fallback behavior is required and should be built into the resolver.

### Image Fallbacks

When article-specific assets are missing:

1. use article asset if present
2. otherwise use category default asset
3. otherwise use site-wide default asset
4. otherwise render the built-in folk illustration fallback

This applies independently to:

- thumbnail
- hero image
- OG image

If mobile crop is missing:

- reuse hero image

### Field Fallbacks

If metadata is incomplete:

- `seoTitle` -> `${title} | Little Lighthouse`
- `seoDescription` -> `excerpt`
- `readingTime` -> auto-estimate from Markdown body
- `author` -> default author
- `relatedPosts` -> auto-pick from same category excluding self
- `summaryQuote` -> hide quote module or fall back to excerpt
- `toc` -> generate from Markdown headings when possible

### Display Fallbacks

When non-critical publishing resources are absent:

- no hero -> render default hero illustration
- no thumbnail -> render category or site fallback visual
- no related posts -> auto-populate from same category
- no tags -> hide tags section
- no TOC -> hide TOC module if generation fails

## Validation Rules

Validation should be split into blocking errors and warning-only issues.

### Blocking Errors

Build or publication should fail when:

- slug is missing
- title is missing
- date is missing or invalid
- category is not in the allowed category set
- excerpt is missing
- Markdown body file is missing
- `published: true` but article body is empty
- slug duplicates another article
- canonical URL does not match slug policy
- relatedPosts references missing slugs
- Markdown frontmatter duplicates publishing fields with values that differ from `.meta.json`

### Warning-Only Issues

Build should continue with logged warnings when:

- thumbnail is missing
- hero image is missing
- OG image is missing
- readingTime is missing
- seoTitle is missing
- seoDescription is missing
- tags are missing
- relatedPosts are missing
- summaryQuote is missing
- TOC is missing

## Publication Gating Rules

Public inclusion must be driven by one canonical release rule.

The rule should be:

- only articles with `published: true` are eligible for public output

Public output includes:

- homepage featured or recent sections
- `/posts`
- `/posts/[slug]`
- `/categories/[category]`
- RSS
- sitemap
- route metadata
- Open Graph and social metadata

Additional release fields have narrower meaning:

- `publishedAt`: informational timestamp for the publication event
- `updatedAt`: informational timestamp for later revisions
- `reviewed`: workflow signal only; it does not override `published`
- QA flags: workflow signals only; they do not independently publish content

Draft behavior:

- `published: false` articles may exist locally
- they must be excluded from all public route generation and feed generation
- they may still be validated during local build tooling if desired

## Default Resource System

Defaults should exist in layers rather than as a single universal fallback.

### Site-Wide Defaults

- default thumbnail
- default hero image
- default OG image
- default author
- default SEO suffix

### Category Defaults

Defaults per major category such as:

- Java
- Android
- C++
- Design Notes

### Visual Slot Defaults

Optional defaults based on:

- visual kind
- surface style

## Warning and Reporting Contract

Fallback use must be visible to maintainers.

Warning-only issues should be emitted through a structured build summary.

Minimum behavior:

1. print warning lines during build for each affected article
2. print one end-of-build summary grouped by article slug
3. distinguish between blocking failures and fallback warnings

Recommended output shape:

- article slug
- missing resource or field
- fallback applied
- affected surfaces such as card, detail, OG, RSS, or metadata

Release policy:

- local development builds may pass with warnings
- CI release builds may still pass with warnings, but warnings must remain visible in logs
- if the team later wants stricter governance, warning counts can be promoted to CI thresholds without changing the publishing model

## Recommended Publishing Flow

When adding a new article, the standard workflow should be:

1. create `content/posts/<slug>.md`
2. create `content/posts/<slug>.meta.json`
3. fill required publishing fields
4. optionally add article-specific assets under `public/posts/<slug>/`
5. run build-time validation
6. resolve canonical category, publication state, and source ownership
7. let resolver fill non-critical defaults
8. verify post detail page
9. verify posts index placement
10. verify category archive placement
11. verify RSS and sitemap inclusion
12. verify route metadata and OG behavior
13. review warning summary to confirm any fallback use is intentional
14. publish

## New Article Checklist

For each article:

1. create Markdown body
2. create metadata companion file
3. fill required fields:
   - title
   - slug
   - date
   - category
   - excerpt
   - published
4. optionally add:
   - thumbnail
   - hero image
   - OG image
5. confirm `.meta.json` is the only publishing source of truth
6. review relatedPosts
7. run local build
8. verify detail page
9. verify posts index
10. verify category archive
11. verify RSS and sitemap
12. verify metadata and social image behavior
13. verify fallback behavior when optional assets are missing
14. review warning output for intentional fallback usage

## Implementation Direction

The next implementation should introduce:

1. a normalized publishing schema
2. a publishing resolver
3. default asset and metadata definitions
4. validation helpers with blocking and warning levels
5. migration or bridging logic from current `folkShowcase` usage toward the package model
6. canonical category definitions and normalization helpers
7. structured warning reporting for fallback usage

## Recommendation Summary

Adopt **Option B: Publishing package hybrid chain** as the standard for future article creation.

This gives the project:

- a stable writing experience
- explicit publishing metadata
- image and SEO fallback safety
- better long-term maintainability
- one repeatable chain for detail pages, cards, RSS, sitemap, and metadata generation
