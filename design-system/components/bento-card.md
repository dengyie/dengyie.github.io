# BentoCard

## Purpose

Shared Folk Canvas content container for article cards, author panels, related posts, pull quote wrappers, and other bento grid modules.

## Design Notes

- Keep width fluid so parent grids own layout.
- Use variant classes for default, parchment, and teal surfaces.
- Keep hover motion transform-only to avoid layout shift.
- Use a pseudo-element for optional folk ornament border without adding DOM nodes.

