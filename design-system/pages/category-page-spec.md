# Category Page Spec

Route: `/categories/[category]`

Target image: `Category Page /categories/[category] - Folk Canvas`

## Goal

Build a category archive as a framed, centered Folk Canvas board with rich ornaments, summary stats, and a curated bento post grid.

## Desktop Layout

- Stage:
  - black outer background
  - centered large framed canvas
  - vertical ornament rails near left and right edges inside frame
  - footer integrated at bottom of frame
- Header:
  - flower mark + `Little Lighthouse`
  - nav links with Categories active and ochre underline
- Back link:
  - `← All Categories`
  - red/ochre tone
  - placed above category title area
- Category hero:
  - giant centered title `Craft & Code`
  - red hand-painted underline with small flower in center
  - faint background motifs: diamonds, plants, horse silhouettes
- Summary card:
  - horizontal bordered card
  - left round icon medallion
  - description: `Notes about the places where design craft meets practical engineering.`
  - right stats: `8 POSTS`, `Jun 2026 UPDATED`
- Rail divider:
  - red/ochre ornamental divider with centered flower and leaves
- Post grid:
  - first row two featured horizontal cards
  - first card red hover glow and `HOVER` label
  - second card deep teal panel
  - second row three smaller cards
  - every card includes a visual asset, category label, title, date, excerpt, arrow
- Footer inside frame:
  - left/right floral corner ornaments
  - GitHub, RSS, centered flower, `Built with Next.js`

## Mobile Layout

- Phone-style framed canvas.
- Header compact brand + hamburger + rail.
- Back link.
- Large `Craft & Code` title and hand-painted underline.
- Summary card stacks description and stats.
- Divider rail.
- Two large stacked post cards visible.
- Pagination dots below cards.
- Footer strip with GitHub, ornament, RSS, ornament, Next.js.

## Data

Use curated category data for visual target:

- category name: `Craft & Code`
- description: `Notes about the places where design craft meets practical engineering.`
- posts count: `8`
- updated: `Jun 2026`
- posts:
  - `Designing Static Sites That Feel Alive`
  - `Markdown as a Thinking Tool`
  - `Interfaces With Memory`
  - `A Small System for Better Notes`
  - `Why Constraints Make Better Pages`

## Required Components

- `CategoryPageFrame`
- `CategoryHero`
- `CategorySummaryCard`
- `CategoryPostGrid`
- `FolkPreviewCard`
- `FrameFooter`
- `FolkIllustration`
- `FolkRail`

## Acceptance Checklist

- Desktop has framed canvas with integrated footer.
- Desktop has vertical side ornament rails.
- Category title is centered and dominant.
- Summary stats match target layout.
- Post grid is two featured + three small cards.
- Mobile has pagination dots and integrated footer.
- Uses `Little Lighthouse` everywhere.
