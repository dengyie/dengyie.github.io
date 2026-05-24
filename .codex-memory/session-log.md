# Session Log

## 2026-05-25 03:55
- Task: Scaffold Next.js blog, build homepage with Playful & Warm design, dark mode, deploy config
- Actions: Created Next.js project, design system (CSS vars, Quicksand+Inter fonts), ThemeProvider, Header/Footer, Hero with lighthouse motif, FeaturedPosts cards, CategoryExplorer, AboutSnippet, dark mode toggle, GitHub Actions deploy workflow
- Results: Build succeeds, static export to out/, lighthouse-themed design with light/dark modes
- Next: Content import from existing markdown, post detail pages, category pages, deploy to dengyie/dengyie.github.io
- Blockers: None

## 2026-05-25 04:10
- Task: Import content, build post/category pages, wire real data
- Actions: Imported 5 existing posts with frontmatter, installed gray-matter + remark-html, built shared lib (src/lib/posts.ts), post detail page, posts listing page, category pages, updated FeaturedPosts + CategoryExplorer to read real data
- Results: Build succeeds, all 14 pages prerendered, 5 blog posts live
- Next: Deploy to GitHub Pages, add RSS feed, SEO improvements
- Blockers: None
