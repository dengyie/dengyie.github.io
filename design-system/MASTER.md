# Little Lighthouse Design System

## Objective

Make the blog feel like a memorable technical publication rather than a themed template: dark-first, kinetic, editorial, colorful, static-friendly, and readable.

## Reference Direction

- Reference site: `https://dala.craftedbygc.com/?ref=godly`
- Interpretation: borrow the feeling of bold color blocks, playful asymmetry, oversized typography, and interactive tension without copying the brand or relying on heavy 3D/runtime effects.

## Product Pattern

- Product type: personal technical blog / developer field notes.
- Layout pattern: editorial bento homepage.
- Primary UX: quick orientation first, then clear paths into notes and categories.
- Static constraint: all effects must be CSS-native and safe for GitHub Pages static export.

## Visual Rules

- Dark mode is the default and must feel intentionally designed, not inverted.
- Use high-contrast surfaces, visible grid lines, oversized type, and offset accent panels.
- Keep lighthouse motif as abstract signal/beam/navigation metaphor.
- Avoid emoji as structural icons; use text marks, CSS shapes, or SVG/CSS primitives.
- Use 4px/8px spacing rhythm and 44px minimum interactive targets.

## Token Direction

- Background: rich near-black, not pure black.
- Surfaces: layered glass and solid panels with crisp borders.
- Accents: acid lime, ultraviolet, cyan/teal, coral.
- Typography: bold editorial sans for display, readable sans body, mono for labels and metadata.
- Radius: mix soft rounded cards with a few sharper editorial panels.

## Homepage Framework

1. Sticky glass header with compact brand, navigation, and accessible theme toggle.
2. Hero as a full-screen editorial stage:
   - giant split title
   - signal marquee
   - abstract lighthouse/device visual
   - stats and topic chips
3. Featured posts as asymmetric bento cards with strong first-card hierarchy.
4. Category explorer as navigational control deck.
5. About snippet as manifesto/callout panel with reading principles.

## Accessibility / Quality Checklist

- Text contrast meets AA in both themes.
- Focus rings are visible.
- Motion respects `prefers-reduced-motion`.
- No horizontal scroll at 375px.
- Navigation and icon-only controls have accessible names.
- Hover/press states do not shift surrounding layout.
