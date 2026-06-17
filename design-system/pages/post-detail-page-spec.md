# Post Detail Page Spec

Route: `/posts/[slug]`

Target image: `Post Detail /posts/[slug] - Folk Canvas`

## Goal

Build the article page as a framed editorial reading spread for `Little Lighthouse`, not a single-column markdown article.

## Desktop Layout

- Stage:
  - black outer background
  - large framed canvas with rounded corners
  - dense vertical ornament rails on both left and right sides
- Header inside frame:
  - flower mark + `Little Lighthouse`
  - nav aligned right
  - active/hover states in ochre/red
- Hero:
  - two-column split
  - left: large serif title `Memory Maps for Modern Java`
  - left: red/ochre ornamental underline
  - left: excerpt
  - left: metadata row with calendar icon, date, category pill, reading time
  - right: large framed landscape illustration panel, forest/lake/cabin mood
- Body:
  - content in a bordered reading panel
  - first paragraph uses Dala red drop cap
  - section heading with red underline flourish
  - pull quote with vertical diamond rail
- Right sidebar:
  - `On this page` card with section links and diamond bullets
  - collapsible-looking `Table of Contents` strip
  - teal author card with Dala horse image
- Related dock:
  - bottom overlay/panel with `Related Posts`
  - three compact related cards with thumbnails
  - middle related card shows hover glow label

## Mobile Layout

- Phone-style frame.
- Header: compact brand + hamburger + ornamental rail.
- Title first, then ornamental divider, metadata row.
- Featured image full width under meta.
- Article starts with drop cap.
- `On this page` compact dropdown-style row.
- Pull quote.
- Author card.
- Related posts section with thumbnail card.

## Data

Use curated visual data:

- Main post:
  - title: `Memory Maps for Modern Java`
  - date: `Jun 13, 2026`
  - category: `Java`
  - reading time: `8 min read`
  - hero visual: `forest-lake-cabin`
- Sections:
  - `Objects, references, and the quiet map`
  - `Reachability and GC roots`
  - `The cost of a mis-shaped graph`
  - `Practical notes`
  - `Closing thoughts`
- Related:
  - `Stack and Heap: A Field Guide`
  - `Markdown as a Thinking Tool`
  - `C++ Grammar Notes from the Workbench`

## Required Components

- `ArticlePageFrame`
- `ArticleHero`
- `ArticleSidebar`
- `OnThisPageCard`
- `AuthorFolkCard`
- `RelatedPostsDock`
- `FolkIllustration`
- `DropCap`
- `PullQuote`

## Acceptance Checklist

- Desktop has split hero title/image layout.
- Desktop has vertical ornamental rails on both sides.
- Desktop has right sidebar cards.
- Desktop has related posts dock at bottom.
- Mobile has image, drop cap, on-this-page dropdown, quote, author, related post.
- Uses `Little Lighthouse` everywhere.
