# Folk Canvas Asset And Data Spec

## Purpose

The supplied mockups depend heavily on illustration and curated editorial data. Rendering the existing markdown list without assets cannot meet the target.

## Visual Data Source

Create a static module dedicated to the showcase UI, for example:

`src/data/folkShowcase.ts`

The module may coexist with the real markdown data layer.

## Post Shape

Each showcase post needs:

- `slug`
- `title`
- `dateLabel`
- `category`
- `excerpt`
- `readingTime`
- `visualKind`
- `featured`
- `surface`

Supported `visualKind` values:

- `flower`
- `rosette`
- `sprig`
- `horse`
- `diamond`
- `forest`

Supported `surface` values:

- `charcoal`
- `teal`
- `redGlow`
- `ochre`

## Illustration Strategy

Use deterministic project-owned assets. Do not rely on external hotlinks.

Preferred order:

1. Generated bitmap assets stored in `public/images/folk-canvas/`.
2. Hand-authored reusable SVG assets stored in `public/ornaments/`.
3. CSS patterns for rails, grain, diamonds, and simple flourishes.

Do not use emoji for flowers, horses, arrows, RSS, GitHub, or decorative marks.

## Required Assets

- brand flower mark
- small rosette medallion
- Dala horse illustration
- botanical flower panel
- oval rosette flower panel
- diamond flower tile
- botanical sprig corner decoration
- forest lake cabin hero image
- dense horizontal woven divider
- vertical side rail pattern

## Image Treatment

- Colors should stay within Dala red, ochre, muted parchment, deep teal, and near-black.
- Add grain and aged print texture.
- Borders should look painted/carved, not glossy digital neon.
- Do not blur the primary subject.
- Maintain clear focal objects at mobile thumbnail size.

## Fake Content Policy

Fake editorial content is explicitly allowed for visual fidelity.

The visual showcase pages may use the curated English titles defined in the page specs even when matching markdown files do not exist. Links may point to a single showcase detail slug until real content is wired later.
