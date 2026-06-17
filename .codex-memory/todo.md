# TODO
## In Progress
- [ ] Decide whether to delete the duplicate phase note `design-system/publishing-frontmatter-alignment.md` after user confirmation

## Next
- [ ] Decide whether to further tune pixel/proportion fidelity against the PNG mockups
- [ ] If Next dev preview is needed, clear/recreate `.next` dev cache/process state before testing
- [ ] Consider cleaning old transient `.codex-next-dev.*.log` files only after user confirmation

## Done
- [x] Complete `/posts` Folk Canvas fidelity tuning phase 1 with browser QA and production review
- [x] Repair repository-facing documentation encoding issues
- [x] Review and commit the legacy frontmatter alignment phase
- [x] Align the five legacy Markdown frontmatter blocks with canonical publishing metadata and eliminate known prebuild drift warnings
- [x] Migrate Folk Canvas route consumers from showcase data to normalized publishing data after feed/static-meta migration
- [x] Make clean-checkout publishing frontmatter drift visible in prebuild logs without reintroducing a build blocker
- [x] Fix Production Code Quality Review content consistency findings
- [x] Unify Folk Showcase page data and RSS/sitemap generation on one JSON source
- [x] Add duplicate slug validation for Folk Showcase posts
- [x] Reach a practical Folk Canvas delivery checkpoint for `/`, `/posts`, `/categories/[category]`, and `/posts/[slug]`
- [x] Verify `npm.cmd run build` passes and exports 15 pages
- [x] Capture final desktop/mobile screenshot matrix under `output/qa-screenshots/final-pass-2026-06-17/`
- [x] Fix mobile menu accessible labels and controls
- [x] Confirm active UI scan has no `Folklore & Code` or decorative Unicode residue
- [x] Isolate Next dev `./250.js` issue as a preview/cache problem, not a production export blocker
- [x] Fix Production Code Quality Review routing fallback and archive-count findings
- [x] Add route-specific Open Graph and Twitter metadata for category and post detail pages
- [x] Keep category archives scoped to owned posts only
- [x] Fix related-post selection to use the first valid non-self candidates
- [x] Run refreshed desktop/mobile browser QA for the semantic and metadata fix pass
- [x] Run Production Code Quality Review on the blog publishing package phase
- [x] Commit and push the blog publishing package source phase (`e5edf59`)
- [x] Push the new repository README presentation to GitHub (`23bf3d2`)
- [x] Migrate feed/static metadata generation from showcase JSON to normalized publishing data
- [x] Push the `source`-only GitHub Pages workflow trigger and verify a successful deploy run from `source`
