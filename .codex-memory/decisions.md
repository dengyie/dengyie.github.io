# Decisions

## 2026-06-18 - Compress Detail Hero Title On Mobile Instead Of Dropping Modules
- Decision: Keep the post-detail mobile route fully composed with title, meta, image, sidebar controls, author card, and related posts, but reduce the hero title scale and allow aggressive word wrapping instead of removing modules.
- Rationale: The detail mockup still expects a rich stacked mobile article surface, while the first pass let the title dominate too much of the viewport.
- Impact: Mobile keeps the required modules and route identity without page-level overflow or an unreadably oversized hero block.

## 2026-06-18 - Archive Cards Use Mockup-Facing Showcase Copy
- Decision: Keep `/posts` archive cards on an archive-only presentation layer that prefers Folk Showcase title, excerpt, date label, and reading-time copy when the same slug exists in the merged publishing collection.
- Rationale: The route-level fidelity target is the approved PNG mockup, while detail pages, feeds, and publishing metadata should continue to reflect canonical package content.
- Impact: `/posts` now matches the intended mockup copy and ordering more closely without weakening the publishing-package migration or route validation model.

## 2026-06-18 - Keep Hover Emphasis Out Of Featured Posts Cards
- Decision: Restrict the warm `hover` emphasis treatment on `/posts` to the lower compact-card row and remove it from the second featured card.
- Rationale: The active `/posts` page spec requires the hover-like state in the smaller lower grid, while the featured row should read as two strong editorial hero cards rather than a hovered CTA pair.
- Impact: The route keeps the intended asymmetry in the featured row without mislabeling a hero card, and the lower grid remains the only place where the hover accent appears.

## 2026-06-18 - Keep Canonical Publishing Metadata In Markdown Frontmatter
- Decision: Align the five Markdown-backed posts' frontmatter with their companion `.meta.json` values instead of leaving known drift in place.
- Rationale: The warning-only migration path did its job for clean releases, but once the mismatches were known and stable, leaving them around only added noisy prebuild output and made author-facing Markdown less trustworthy.
- Impact: The current publishing package no longer emits the known frontmatter drift warnings for shipped posts, while `.meta.json` still remains the canonical validation source during the broader migration.

## 2026-06-17 - GitHub Pages Workflow Deploys From Source
- Decision: Move GitHub Pages publishing fully onto the `source` branch and GitHub Actions `workflow` deploy mode.
- Rationale: The site build, content pipeline, and release validation now all happen from `source`, while the old `legacy` Pages setup and environment policy were blocking deploys from the actual production branch.
- Impact: `.github/workflows/deploy.yml` now auto-runs on `source`, the repository Pages site serves from the workflow artifact instead of `main`, and future releases no longer need a split code/deploy branch model.

## 2026-06-17 - Public C++ Route With Internal Canonical Slug
- Decision: Keep `c-plus-plus` as the internal publishing category slug, but expose `/categories/c++` in links, static params, and sitemap output.
- Rationale: The current site surface and showcase source already present `C++` publicly, while the publishing layer benefits from a normalized internal slug.
- Impact: Route consumers resolve both forms, category links stay human-facing, and metadata/output stay aligned with the exported route set.

## 2026-05-25 - Tech Stack: Next.js Static Export
- Decision: Use Next.js with output: 'export' for static site generation
- Rationale: Modern DX, TypeScript support, component model, easy GitHub Pages deploy
- Impact: No server-side rendering at runtime; all pages prerendered

## 2026-05-25 - Design: Playful & Warm + Lighthouse Motif
- Decision: Playful & Warm aesthetic with lighthouse brand identity
- Rationale: User preference for warm, friendly tone; lighthouse theme for tech blog
- Impact: Rounded elements, warm color palette, Quicksand font, floating animations

## 2026-05-25 - Blog Name: Little Lighthouse
- Decision: Blog named 'Little Lighthouse'
- Rationale: User chosen; sets a unique brand identity
- Impact: All copy and metadata uses this name

## 2026-05-25 - Dark Mode with System Preference
- Decision: Light + dark toggle with system preference detection
- Rationale: User preference; CSS custom properties for theme switching
- Impact: ThemeProvider context, localStorage persistence, anti-FOUC script

## 2026-06-11 - Dala-Inspired Dark Motion Redesign
- Decision: Refactor the blog UI toward a dark-first, colorful, motion-driven technical portfolio style inspired by Dala.
- Rationale: User requested reference alignment with https://dala.craftedbygc.com/?ref=godly and `$ui-ux-pro-max`; this direction better supports a memorable technical blog identity.
- Impact: Default theme is dark, structural emoji were removed, homepage and content pages now use layered CSS shapes, high-contrast cards, short text marks, and accessible hover/focus states.

## 2026-06-13 - Kinetic Editorial Bento Frame
- Decision: Move the homepage frame from themed card layout to a kinetic editorial/bento publication structure.
- Rationale: The prior UI was functional but still too template-like for the requested Dala-inspired quality; oversized typography, asymmetric hierarchy, control-deck categories, and CSS-native motion create a more distinctive blog identity while staying static-export friendly.
- Impact: Added `design-system/MASTER.md`, upgraded font/token system, rebuilt hero/featured/category/manifesto sections, and preserved GitHub Pages compatibility.

## 2026-06-15 - Local CSS Folk Assets for Delivery Baseline
- Decision: Keep the current delivery checkpoint on project-owned CSS illustration primitives instead of external images or hotlinked assets.
- Rationale: The user asked to first make the site framework and format deliverable; CSS assets preserve static export reliability and avoid adding generated bitmap cleanup work before the layout is accepted.
- Impact: The pages now have denser ornaments, rails, hover states, and mobile card rhythm, but the largest remaining fidelity gap is still hand-painted bitmap/SVG illustration quality.

## 2026-06-15 - Local SVG Folk Assets for Static Delivery
- Decision: Move the delivery baseline from pure CSS illustration primitives to project-owned local SVG folk ornaments and panels under `public/ornaments/folk`.
- Rationale: The approved PNG mockups depend on visible folk illustration panels, and local SVGs improve fidelity while keeping static export deterministic and avoiding external asset dependency.
- Impact: Card, category, and detail visuals now render as real local image assets with 0 broken images in QA; the remaining visual gap is painterly texture and exact mockup proportions rather than missing asset slots.

## 2026-06-16 - Painterly SVG Texture Before Bitmap Generation
- Decision: First deepen the existing local SVGs with paper texture, cutline hatching, rough print filters, and proportion tuning before introducing generated bitmap panels.
- Rationale: This improves visual fidelity while keeping assets inspectable, lightweight, deterministic, and compatible with static export.
- Impact: Featured cards and detail/category illustrations now read closer to handcrafted folk panels. The largest remaining gap is still the exact aged hand-painted richness of the PNG mockups.

## 2026-06-16 - Complete Remaining Local SVG Asset Set
- Decision: Upgrade `horse.svg` and `sprig.svg` to the same painterly local-asset standard as the flower, rosette, diamond, and forest panels before adding generated bitmap assets.
- Rationale: These two assets appear in author, category, and card contexts, so leaving them simpler made the otherwise richer frame feel inconsistent.
- Impact: The local folk asset set is now visually more even across compact and featured card slots while keeping static export deterministic.
## 2026-06-17 - Use Static Export as Delivery Truth
- Decision: Treat out/ from `npm.cmd run build` as the final QA target for this static blog.
- Rationale: The app is configured with output: "export", and the dev server intermittently hits a stale chunk error unrelated to the successful export.
- Impact: Handoff can proceed on the production artifact while the dev-preview cache issue remains a separate maintenance item.

## 2026-06-17 - Mobile Menu Accessibility Label
- Decision: Use state-specific ria-label values and ria-controls on the Folk mobile menu button.
- Rationale: This improves screen-reader clarity and makes mobile menu QA more robust.
- Impact: src/components/folk/FolkHeader.tsx changed without altering visual layout.

## 2026-06-17 - Shared Folk Showcase Content Source
- Decision: Use `src/data/folkShowcase.json` as the shared source for Folk Showcase cards, post detail pages, RSS, and sitemap while the site is in framework-first mode.
- Rationale: The review found duplicate card slugs, hardcoded detail content, and RSS/sitemap drift caused by split content sources.
- Impact: Post slugs are now unique, article detail content matches the selected card, and static metadata generation follows the exported route set.

## 2026-06-17 - Preserve Category Truth Over Visual Filler
- Decision: Keep category archive data strictly scoped to the selected category even if that leaves fewer than five cards in the current Folk Canvas framework pass.
- Rationale: Filling archive grids with posts from unrelated categories made the exported UI contradict its own counts and archive labels.
- Impact: Category summary counts, category card content, and exported archive semantics now agree, while the remaining visual gap is limited to lower-grid density in sparse categories.

## 2026-06-18 - Repository Docs Must Stay UTF-8 Clean
- Decision: Repair the Chinese README and active phase note by rewriting them as clean UTF-8 documentation and keep the English README aligned in the same pass.
- Rationale: Repository-facing docs are part of the shipped project surface, and encoding corruption makes the GitHub landing page and implementation notes look broken even when the app code is healthy.
- Impact: README maintenance now has a clean baseline again, and the current `/posts` phase note can be safely extended without mixing readable text with mojibake.
