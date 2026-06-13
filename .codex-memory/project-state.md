# Little Lighthouse - Project State

## Current Objective
Personal technical blog built as a Next.js static export for GitHub Pages. Current UI direction is a Dala-inspired, dark-first, kinetic editorial/bento technical publication.

## Deploy Status
- Live site: https://dengyie.github.io
- Source code branch: `source`
- Built static site branch: `main`
- Local project path: `E:\project\blog\personal-blog`

## Current UI Direction
- Reference: https://dala.craftedbygc.com/?ref=godly
- Skill used: `$ui-ux-pro-max`
- Style: Folk Canvas: dark-first, Dala-inspired, handcrafted, editorial bento
- Implementation: CSS Modules with semantic tokens, ornamental dividers, asymmetric cards, parchment/teal surfaces, and warm red/ochre hover states
- Default theme: dark
- Icons: no structural emoji; use text marks, CSS shapes, and accessible controls
- Design source of truth: `design-system/MASTER.md` plus page notes in `design-system/pages/`

## Tech Stack
- Next.js 15 App Router
- TypeScript
- CSS Modules
- Markdown content with `gray-matter`, `remark`, and `remark-html`
- Static export via `output: "export"` in `next.config.ts`

## Content Structure
All posts live in `content/posts/` with frontmatter fields: `title`, `date`, `category`, `excerpt`.

| File | Category |
| --- | --- |
| `android-recyclerview-cache.md` | Android |
| `cpp-grammar-basics.md` | C++ |
| `java-map-comparison.md` | Java |
| `java-stack-heap.md` | Java |
| `markdown-syntax.md` | Other |

## Route Structure
| Route | Purpose |
| --- | --- |
| `/` | Homepage with hero, latest notes, category explorer, manifesto |
| `/posts` | All posts list |
| `/posts/[slug]` | Static post detail page |
| `/categories/[category]` | Static category archive |

## Component Structure
| Component | Purpose |
| --- | --- |
| `src/components/layout/Header` | Sticky Folk Canvas brand/nav with mobile menu |
| `src/components/layout/Footer` | Footer with weave divider and social/RSS links |
| `BentoCard` | Shared handcrafted bento container |
| `PostCard` | Article preview cards for homepage, archive, categories, and related posts |
| `OrnamentalDivider` | Dala-inspired diamond/weave separator |
| `CategoryPill` | Reusable category chip/link |
| `FancyUnderline`, `DropCap`, `PullQuote` | Editorial article ornament components |

## Latest Verification
- `npm.cmd run build` passes.
- Static export generated 14 pages.
- 2026-06-13: Folk Canvas implementation build passes after responsive fixes.
- 2026-06-13: Browser review on Next dev preview checked homepage, `/posts`, `/posts/java-map-comparison`, and `/categories/java` at desktop and 390px mobile.
- 2026-06-13: Fixed article-detail mobile overflow from long headings/inline code and upgraded the mobile header hamburger to an actual accessible toggle.
- 2026-06-13: Mobile article page now has no page-level horizontal overflow; fenced code blocks retain internal horizontal scroll.`r`n- 2026-06-14: Article typography and syntax highlighting were refined; source commit `b31bfcb` is on `source`.
- Deployed commit: `a68dab9` on GitHub Pages `main` branch.
- 2026-06-14: Folk Canvas live checks passed: homepage 200, RSS 200, sitemap 200.

## SEO And Feeds
- `scripts/generate-static-meta.mjs` generates `public/rss.xml`, `public/sitemap.xml`, and `public/robots.txt`.
- `prebuild` runs the generator before every `next build`.
- `.nojekyll` is included so GitHub Pages serves `_next/` assets correctly.
- Post pages have dynamic metadata and Open Graph article fields.
- Markdown rendering uses `remark-rehype`, `rehype-highlight`, and `rehype-stringify`.

