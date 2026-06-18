# Submit Page Spec

Route: `/submit`

## Goal

Create a static, public guide page that tells contributors how to provide article content to the future `little-lighthouse-blog-publisher` AI skill.

The page must not behave like a CMS, uploader, or GitHub write-back interface. It is an informational bridge between human contributors and the AI-managed publishing workflow.

## Audience

- non-technical contributors who can provide article text
- maintainers who need a stable explanation to share
- future Codex sessions that need a user-facing source of truth for the publishing workflow

## Desktop Layout

- Use the existing `FolkFrame` shell and `Little Lighthouse` brand.
- Keep the page calm and instructional, not a marketing landing page.
- First viewport should show:
  - page title: `Submit a Post`
  - short explanation that the user only needs Markdown and optional images
  - a compact process summary
- Body should include:
  - minimum Markdown template
  - recommended metadata template
  - optional image resource names
  - what the AI publisher will do
  - explicit GitHub Pages boundary: no token, no direct upload, no CMS

## Mobile Layout

- Stack all panels in one column.
- Keep code/template blocks horizontally safe.
- Avoid dense tables that overflow on narrow screens.

## Content Requirements

Must include these exact concepts:

- minimum input is a Markdown article
- optional fields are title, category, tags, published state, and images
- supported images are `thumbnail.png`, `hero.png`, and `og.png`
- missing images use fallback resources
- AI publisher handles metadata, validation, build, review, memory updates, and commit
- the page does not accept GitHub tokens
- the page does not publish directly from GitHub Pages

## Non-Goals

- no upload form
- no authentication
- no GitHub API calls
- no token input
- no local storage
- no client-side package generation
- no new backend

## Acceptance Criteria

- `npm.cmd run build` exports `/submit`
- footer includes a low-key `Submit` link
- `/submit` uses the existing Folk Canvas frame
- page copy clearly directs contributors to provide content to the AI publishing workflow
- page does not imply direct web publishing from GitHub Pages
