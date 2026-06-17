# Little Lighthouse Folk Canvas Design System

## Source Of Truth

The three supplied mockup images are the binding visual target for this implementation:

- `Posts Page /posts - Folk Canvas`
- `Post Detail /posts/[slug] - Folk Canvas`
- `Category Page /categories/[category] - Folk Canvas`

The previous implementation did not meet this target. This document replaces the earlier broad "Dala-inspired" direction with a strict implementation contract.

## Non-Negotiable Brand Rules

- The site name is `Little Lighthouse`.
- Visible UI text, metadata, Open Graph title, footer copyright, and navigation brand must use `Little Lighthouse`.
- Do not use `Folklore & Code` in the app UI. It appears in the mockups only as placeholder copy and must be replaced.
- The visual identity is still Folk Canvas: dark, tactile, Dala-inspired, handcrafted, warm, editorial, and bento-based.

## Implementation Scope

The next build must prioritize these routes:

- `/posts`
- `/posts/[slug]`
- `/categories/[category]`

It is acceptable and preferred to use curated fake article data for these visual pages. The goal is fidelity to the supplied mockups, not strict rendering of the current real markdown inventory.

## Visual Language

- Background: near-black charcoal canvas with visible grain, faint paper texture, and low-opacity folk motifs.
- Primary surfaces: framed dark cards with warm parchment text, ochre borders, Dala red accents, and deep teal panels.
- Ornamentation: dense but controlled. Use rails, woven dividers, diamonds, rosettes, small horse silhouettes, floral motifs, corner flourishes, and patterned side borders.
- Typography: expressive serif display for large titles and card headings; mono/sans metadata for dates, reading time, categories, and utility labels.
- Density: high editorial density. The pages should feel composed, not merely stacked.
- Assets: every major card needs a visual panel. Use generated/static SVG/CSS folk illustrations if real images are unavailable.

## Layout Contract

### Desktop

- The primary page frame is a large rounded rectangle, centered on a black stage.
- The frame has a subtle border, inner glow, grain texture, and decorative side or horizontal ornament rails depending on page.
- Desktop views should fit the first screen at roughly 1440x900 without feeling like a generic web page.
- Navigation sits inside the frame, not as a detached generic header.

### Mobile

- Mobile is not a collapsed generic stack. It must be separately composed:
  - phone-like narrow framed canvas
  - compact brand row
  - hamburger icon
  - ornamental rail under the header
  - cards with thumbnails where shown in the mockups
  - preserved red/ochre/teal contrast
- No horizontal overflow at 390px.

## Component Direction

- `Header`: brand mark + `Little Lighthouse`, nav links, active state underline, compact mobile menu icon. Must support page-specific frame integration.
- `PageFrame`: reusable framed canvas with grain and optional vertical side rails.
- `FolkRail`: horizontal/vertical ornamental rails with diamond, flower, horse, and weave variants.
- `FolkIllustration`: reusable SVG/CSS illustration panels for flower, rosette, horse, forest lake, diamond tile, and botanical sprig motifs.
- `PostPreviewCard`: multiple variants: featured horizontal, small vertical, mobile media row, related compact.
- `CategoryControl`: sidebar pill/list item with icon and count.
- `LoadMorePagination`: decorative pagination plus large load-more button.
- `AuthorCard`, `OnThisPageCard`, `RelatedPostsDock`: required for post detail.

## Acceptance Standard

A page is not done because it compiles. It is done only when:

- It visually matches the corresponding mockup at desktop and 390px mobile.
- It uses `Little Lighthouse` everywhere.
- It includes the expected layout regions from the page-specific specs.
- It contains visible folk illustration assets and ornamental rails.
- It passes `npm.cmd run build`.
- Browser inspection confirms no console errors and no horizontal overflow.
- A screenshot comparison review rates the page at 85%+ fidelity against the supplied mockup.
