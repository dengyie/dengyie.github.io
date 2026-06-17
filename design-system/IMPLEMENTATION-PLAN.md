# Little Lighthouse Folk Canvas Rebuild Plan

## Objective

Replace the current partial Folk Canvas implementation with a high-fidelity build based on the three supplied mockups.

## Phase 0 - Baseline Audit

- Keep the current implementation available for comparison.
- Fix brand references from `Folklore & Code` to `Little Lighthouse`.
- Fix duplicate metadata titles.
- Inventory reusable components and identify which ones need replacement.

## Phase 1 - Design Foundation

- Rewrite tokens to match the mockups:
  - near-black canvas
  - parchment typography
  - Dala red
  - ochre
  - deep teal
  - muted gray border system
- Add frame, rail, illustration, card, hover, and grain tokens.
- Add a deterministic static visual data source with fake posts and categories.
- Add folk asset primitives:
  - flower
  - rosette
  - botanical sprig
  - Dala horse
  - diamond tile
  - forest lake cabin

## Phase 2 - Shared Shell

- Build `PageFrame`.
- Rebuild `Header` for framed desktop/mobile layouts.
- Build reusable `FolkRail` horizontal and vertical variants.
- Build `FrameFooter`.
- Build `FolkIllustration`.

## Phase 3 - Posts Page

- Implement desktop sidebar + featured bento layout.
- Implement category controls and counts.
- Implement featured cards and lower cards.
- Implement pagination/load more region.
- Implement mobile thumbnail list composition.
- Browser compare against posts mockup at:
  - desktop 1440x900
  - mobile 390x844

## Phase 4 - Post Detail

- Implement split title/image hero.
- Implement vertical side rails.
- Implement article body panel and sidebar.
- Implement on-this-page/table-of-contents visual controls.
- Implement author card and related posts dock.
- Implement mobile composition.
- Browser compare against detail mockup.

## Phase 5 - Category Page

- Implement centered category hero with motif background.
- Implement summary/stats card.
- Implement two-featured + three-small post grid.
- Implement integrated frame footer.
- Implement mobile pagination dots and stacked cards.
- Browser compare against category mockup.

## Phase 6 - Quality Gate

- `npm.cmd run build`
- static export succeeds
- no console errors
- no horizontal overflow at 390px
- keyboard focus visible
- mobile menu usable
- screenshot review against all three mockups
- minimum visual fidelity score: 85% per page

## Out Of Scope Until Fidelity Is Met

- Real markdown accuracy
- Advanced filtering logic
- Backend pagination
- CMS work
- Additional routes
- New deployment

## Definition Of Done

The project is complete only when all three routes meet the visual acceptance checks in their page specs and consistently use the `Little Lighthouse` brand.
