# Folk Canvas Article Typography

## Purpose

Refine long-form reading and syntax highlighting after the main Folk Canvas implementation.

## Direction

- Keep article text warm and readable on charcoal, with slightly narrower rhythm than the homepage.
- Give headings a crafted editorial cadence: ornamental diamond markers, patterned underlines, and enough top margin to signal section breaks.
- Treat code blocks as carved teal panels: parchment text, ochre comments, red keywords, and clear internal scrolling for long lines.
- Preserve technical accuracy by keeping fenced code whitespace intact while allowing inline code to wrap on mobile.

## Implementation Notes

- Scope article-specific Markdown and Highlight.js styling under the post detail `.content` container.
- Use CSS Modules `:global(...)` selectors for generated Highlight.js classes.
- Use ASCII CSS escapes for ornamental glyphs to avoid encoding drift.
