# Posts Page Spec

Route: `/posts`

Target image: `Posts Page /posts - Folk Canvas`

## Goal

Build the posts archive as a high-density Folk Canvas editorial dashboard for `Little Lighthouse`. The current simple title-plus-grid implementation is not acceptable.

## Desktop Layout

- Outer stage:
  - black background outside the page frame
  - centered framed canvas with rounded corners, subtle gray border, warm inner glow, grain texture
  - page frame width approximately `min(1440px - 96px, 1320px)`
- Header inside frame:
  - flower/rosette mark plus `Little Lighthouse`
  - nav links: Posts active in red, Categories, About, RSS
  - thin ornamental rail below header with centered red diamond/flower motif
- Content grid:
  - two-column macro layout:
    - left sidebar around 280px
    - right content area fills remaining width
  - left sidebar contains:
    - large `All Posts` title
    - short subtitle
    - decorative row of small horse/flower/leaf motifs
    - `Categories` label
    - stacked category controls: All Posts, Java, Android, C++, Design Notes
    - each category row has small folk icon and count badge
    - workshop callout card with Dala horse and `Notes from the workshop. Made with care.`
  - right content area contains:
    - top featured row with two large horizontal cards
    - each featured card has vertical ornamental rail, image panel, `FEATURED` label, title, date, category, excerpt
    - lower row with four smaller cards
    - one small card shows hover state with warm ochre glow and small `hover` label
    - card corners include botanical/floral decorations
  - bottom area:
    - full-width dense ornamental divider rail
    - pagination row with left arrow, active diamond page `1`, pages `2`, `3`, ellipsis, `4`, right arrow
    - large `LOAD MORE POSTS` button with flower ornaments

## Mobile Layout

- Phone-frame-style canvas with rounded outer border and black stage.
- Header:
  - compact flower mark + `Little Lighthouse`
  - hamburger icon
  - red ornamental rail
- Content:
  - `All Posts` title with small botanical accent
  - subtitle
  - mini motif rail
  - horizontal wrapping category pills: All, Java, Android, C++, Design Notes
  - stacked media cards:
    - thumbnail image left, content right
    - first three posts visible in first screen area
  - `LOAD MORE POSTS` full-width button
  - bottom floral ornament

## Data

Use curated visual data rather than current markdown-only data:

- `Memory Maps for Modern Java`
- `RecyclerView: What Actually Gets Reused`
- `C++ Grammar Notes from the Workbench`
- `Markdown as a Thinking Tool`
- `Designing Static Sites That Feel Alive`
- `Stack and Heap: A Field Guide`

Required fields:

- title
- slug
- dateLabel
- category
- excerpt
- readingTime
- visualKind: `flower`, `rosette`, `horse`, `diamond`, `forest`, `sprig`
- featured boolean

## Required Components

- `ArchivePageFrame`
- `ArchiveSidebar`
- `CategoryControl`
- `FolkPreviewCard`
- `FolkIllustration`
- `FolkRail`
- `PaginationLoadMore`

## Acceptance Checklist

- Desktop has visible left sidebar and right bento area.
- Desktop has exactly two featured cards in the top row.
- Desktop has four lower cards and one visible hover state.
- Mobile cards include thumbnails.
- Page title and metadata say `Little Lighthouse`, not `Folklore & Code`.
- No generic plain grid remains.
