# Folk Canvas Framework Implementation Map

## Objective

Build the first high-fidelity Little Lighthouse framework pass from the approved Folk Canvas mockups. This pass prioritizes page structure, frame geometry, ornament density, visual card rhythm, and responsive format over final article content accuracy.

## Mockup Mapping

- `/` follows `generated-concept-a-folk-canvas.png`: framed desktop canvas, side rails, integrated header/footer, hero copy, large floral featured card, recent post strip, category stack.
- `/posts` follows `folk-canvas-posts-page.png`: left archive sidebar, top woven rail, two featured illustrated cards, lower four-card grid, ornamental pagination/load-more.
- `/categories/[category]` follows `folk-canvas-category-page.png`: framed category stage, centered title, summary stats band, two featured cards, three compact cards, integrated footer.
- `/posts/[slug]` follows `folk-canvas-post-detail.png` enough to establish the framework: split article hero, landscape illustration, reading panel, right utility stack, related dock.

## Component Plan

- `src/data/folkShowcase.ts`: deterministic showcase posts, categories, category page data, and helper selectors.
- `src/components/folk/FolkFrame.tsx`: reusable dark rounded canvas with optional side rails, integrated header and footer.
- `src/components/folk/FolkHeader.tsx`: brand flower mark, `Little Lighthouse`, desktop nav, mobile menu toggle.
- `src/components/folk/FolkFooter.tsx`: bottom strip with GitHub, RSS, Next.js, and corner ornaments.
- `src/components/folk/FolkRail.tsx`: horizontal/vertical woven rails and section dividers.
- `src/components/folk/FolkIllustration.tsx`: CSS/SVG-like local illustration panels for flower, rosette, sprig, horse, diamond, and forest.
- `src/components/folk/FolkPostCard.tsx`: featured, compact, small, mobile-friendly visual cards.
- `src/components/folk/FolkControls.tsx`: category controls and decorative load-more/pagination.

## Styling Plan

- Keep existing global dark token baseline, but implement the mockup-specific frame in `src/components/folk/folk.module.css`.
- Use CSS gradients and pseudo-elements for grain, red/ochre rails, corner botanical marks, and side woven borders.
- Use local CSS illustration primitives instead of external images for this first framework pass.
- Preserve static export compatibility and avoid deleting legacy components.

## Delivery Fidelity Pass

- Posts cards need visible vertical ornament strips on featured cards, corner botanical marks on small cards, warm hover labels, and mobile thumbnail-left rows.
- Detail page needs a denser forest/lake/cabin illustration treatment, tighter right utility panels, and a related dock that reads like an attached bottom tray.
- Category page needs a richer centered hero field, stronger summary medallion/stats rhythm, and denser framed post cards.
- Active UI must stay ASCII/CSS-only for ornaments; avoid mojibake, structural emoji, and external image dependencies.

## Local Asset Pass

- Add hand-authored project SVG assets under `public/ornaments/folk/` for the six supported `visualKind` values: `flower`, `rosette`, `sprig`, `horse`, `diamond`, and `forest`.
- Render those SVGs inside `FolkIllustration` as local image assets, while retaining CSS grain, inset borders, stars, and corner ornaments as texture overlays.
- Keep the SVGs responsive and legible in three sizes: featured card image panels, compact mobile thumbnails, and the large post-detail hero image.
- Preserve static export compatibility and do not add runtime image services or external hotlinks.

## Painterly Proportion Pass

- Enrich the local SVGs with rough paper filters, carved hatching, uneven ink strokes, and botanical border details so the cards feel closer to the approved hand-painted PNG assets.
- Tune `/posts` desktop proportions toward the mockup: larger featured image panels, stronger vertical botanical strips, tighter post copy, and denser lower-card ornaments.
- Keep the 390px mobile row-card rhythm readable: no horizontal overflow, no clipped titles, and thumbnails remain visually legible.
- Do not introduce external image services for this pass; all fidelity gains must stay project-owned and static-export safe.

## Remaining Asset Pass

- Bring `horse.svg` and `sprig.svg` up to the same asset standard as the earlier flower, rosette, diamond, and forest panels.
- Add paper dots, diagonal scratch texture, rough displacement, inset hand-drawn borders, secondary linework, and corner botanicals so author/category/detail cards no longer read as flat placeholder SVGs.
- Keep the symbols legible in compact related cards and summary medallions as well as larger category/post panels.
- Preserve local static assets only; no external images, runtime services, or deletions.

## Proportion Scoring Pass

- Compare current screenshots against the approved category and detail mockups by first-viewport region order rather than only asset presence.
- Compress category hero, summary, and divider vertical rhythm so the first featured card row enters the desktop viewport at the same stage as the mockup.
- Compress post-detail hero typography, accent, excerpt, metadata, and image spacing so the reading panel and right sidebar begin earlier in the desktop viewport.
- Preserve the mobile phone-frame identity: large readable titles, no horizontal overflow, visible illustration cards, and stacked article modules.

## Responsive Plan

- Desktop canvas: width around `min(1480px, 100vw - 64px)`, rounded charcoal frame, dense rail treatment.
- Mobile canvas: width `min(390px, 100vw - 20px)`, phone-like rounded frame, compact brand row, hamburger toggle, stacked illustrated cards.
- No page-level horizontal overflow at 390px.

## QA Inventory

- Claims to verify: `Little Lighthouse` branding, framed canvas, integrated header/footer, route-specific layouts, local folk illustrations, ornamental rails, no horizontal overflow.
- Functional checks: nav links, mobile menu open/close, category links, post card links, load-more placeholder remains non-destructive.
- Visual checks: desktop and 390px mobile first viewport for `/`, `/posts`, `/categories/java`, `/posts/java-map-comparison`.
