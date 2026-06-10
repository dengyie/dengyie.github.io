# Little Lighthouse - Project State

## Current Objective
Personal technical blog built as a Next.js static export for GitHub Pages. Current UI direction is a Dala-inspired, dark-first, colorful, motion-driven technical portfolio/blog.

## Deploy Status
- Live site: https://dengyie.github.io
- Source code branch: `source`
- Built static site branch: `main`
- Local project path: `E:\project\blog\personal-blog`

## Current UI Direction
- Reference: https://dala.craftedbygc.com/?ref=godly
- Skill used: `$ui-ux-pro-max`
- Style: dark-first, colorful, playful, illustrative, interactive-feeling
- Implementation: lightweight CSS motion and layered shapes, no heavy 3D runtime
- Default theme: dark, with persisted light/dark toggle
- Icons: no structural emoji; use text marks, CSS shapes, and accessible controls

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
| `Header` | Sticky nav, LL mark, theme toggle |
| `Hero` | Dark motion-inspired lighthouse/knowledge-beam scene |
| `FeaturedPosts` | Top 3 latest notes as portfolio cards |
| `CategoryExplorer` | Category cards with short text marks |
| `AboutSnippet` | Manifesto panel |
| `Footer` | Footer links |
| `ThemeProvider` | Theme state, localStorage persistence |

## Latest Verification
- `npm run build` passes.
- Static export generated 14 pages.
- Browser check at `http://localhost:3000` desktop: no horizontal overflow, theme defaults to dark.
- Browser check at 375px mobile: no horizontal overflow, cards fit within viewport.
- Deployed commit: `1fd81b3` on GitHub Pages `main` branch.
- Live checks passed: homepage 200, RSS 200, sitemap 200.

## SEO And Feeds
- `scripts/generate-static-meta.mjs` generates `public/rss.xml`, `public/sitemap.xml`, and `public/robots.txt`.
- `prebuild` runs the generator before every `next build`.
- `.nojekyll` is included so GitHub Pages serves `_next/` assets correctly.
- Post pages have dynamic metadata and Open Graph article fields.
- Markdown rendering uses `remark-rehype`, `rehype-highlight`, and `rehype-stringify`.
