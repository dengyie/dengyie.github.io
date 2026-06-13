# OrnamentalDivider

## Purpose

Shared horizontal divider for Folk Canvas sections, sidebars, and article body breaks.

## Design Notes

- Use `role="separator"` to keep the decorative divider semantic without relying on browser `<hr>` defaults.
- Support `diamonds` and `weave` variants via global pattern tokens.
- Keep layout stable on hover; enhance only opacity, filter, and shadow.
- Make the center motif crisp by sizing tiled backgrounds explicitly in pixels.

