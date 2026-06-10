# Decisions

## 2026-05-25 - Tech Stack: Next.js Static Export
- Decision: Use Next.js with output: 'export' for static site generation
- Rationale: Modern DX, TypeScript support, component model, easy GitHub Pages deploy
- Impact: No server-side rendering at runtime; all pages prerendered

## 2026-05-25 - Design: Playful & Warm + Lighthouse Motif
- Decision: Playful & Warm aesthetic with lighthouse brand identity
- Rationale: User preference for warm, friendly tone; lighthouse theme for tech blog
- Impact: Rounded elements, warm color palette, Quicksand font, floating animations

## 2026-05-25 - Blog Name: Little Lighthouse
- Decision: Blog named 'Little Lighthouse'
- Rationale: User chosen; sets a unique brand identity
- Impact: All copy and metadata uses this name

## 2026-05-25 - Dark Mode with System Preference
- Decision: Light + dark toggle with system preference detection
- Rationale: User preference; CSS custom properties for theme switching
- Impact: ThemeProvider context, localStorage persistence, anti-FOUC script

## 2026-06-11 - Dala-Inspired Dark Motion Redesign
- Decision: Refactor the blog UI toward a dark-first, colorful, motion-driven technical portfolio style inspired by Dala.
- Rationale: User requested reference alignment with https://dala.craftedbygc.com/?ref=godly and `$ui-ux-pro-max`; this direction better supports a memorable technical blog identity.
- Impact: Default theme is dark, structural emoji were removed, homepage and content pages now use layered CSS shapes, high-contrast cards, short text marks, and accessible hover/focus states.
