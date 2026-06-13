# Folk Canvas Responsive Review

## Purpose

Record the responsive QA adjustments made after the Folk Canvas implementation browser pass.

## Findings

- The article detail page should never let long mixed Chinese/English titles or inline code widen the mobile viewport.
- Code blocks may scroll horizontally inside their own `pre` container, but they must not create page-level horizontal overflow.
- The mobile header menu should be a real touch interaction, not only a visual hamburger placeholder.

## Implementation Direction

- Allow article grid children to shrink with `min-width: 0`.
- Use `overflow-wrap` on article titles, paragraphs, excerpts, and inline code.
- Preserve `white-space: pre` inside fenced code blocks so syntax examples remain readable.
- Convert the mobile header into a small client component with `aria-expanded`, `aria-controls`, and click-to-close link behavior.
