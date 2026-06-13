# PostCard

## Purpose

Reusable Folk Canvas article preview card for homepage grids, all-post lists, category archives, sidebars, and related posts.

## Design Notes

- Wrap the full card in a Next.js `Link` for a large, predictable target.
- Use `BentoCard` for the content shell and hover elevation.
- Support vertical, horizontal, and compact layouts without changing data shape.
- Reserve image space with fixed dimensions/ratios to avoid layout shift.

