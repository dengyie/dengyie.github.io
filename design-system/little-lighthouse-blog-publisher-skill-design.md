# Little Lighthouse Blog Publisher Skill Design

## Objective

Design a dedicated Codex skill named `little-lighthouse-blog-publisher` that becomes the only supported advanced publishing chain for adding or updating Little Lighthouse blog posts.

The skill must separate **resources** from **workflow**:

- users provide article content and optional assets
- the skill owns the publishing workflow, validation, build, review, memory updates, and commit
- the public GitHub Pages site only needs a simple submit guide, not a full CMS or upload backend

## Core Decision

Use an interactive, staged AI publishing skill instead of a browser-based import/admin page.

Rationale:

- GitHub Pages is static and cannot safely host a real write-capable backend.
- Browser-based upload flows require either manual package handoff or risky token handling.
- This repository already has a mature local publishing package model and build verifier chain.
- Codex can safely write files, run build validation, update memory, and create atomic commits inside the local workspace.

Impact:

- customer-facing work stays simple: provide Markdown and optional images
- all publishing complexity lives in one reusable skill
- future post creation becomes repeatable and reviewable

## Skill Name

```text
little-lighthouse-blog-publisher
```

## Trigger Scope

Use this skill when the user asks to:

- publish a new Little Lighthouse blog post
- turn a draft or note into a blog post
- update an existing post package
- add article assets for a post
- validate or repair a blog publishing package
- prepare a draft post without publishing it

Do not use this skill for:

- redesigning the site
- changing the publishing schema itself
- generic Markdown editing unrelated to publication
- deleting posts unless the user explicitly asks for deletion and confirms the target

## Required Skill Shape

Recommended installed location:

```text
C:\Users\mango\.codex\skills\little-lighthouse-blog-publisher\
```

Recommended resources:

```text
little-lighthouse-blog-publisher/
|-- SKILL.md
|-- agents/
|   `-- openai.yaml
|-- references/
|   |-- interaction-state-machine.md
|   |-- package-contract.md
|   |-- metadata-guidelines.md
|   |-- asset-guidelines.md
|   |-- verification-checklist.md
|   `-- commit-and-memory.md
`-- scripts/
    `-- scaffold-post-package.mjs
```

The first version can skip `scripts/scaffold-post-package.mjs` if the workflow is implemented manually, but the script should be added once the repeated file-generation path stabilizes.

## Related Project Sources

The skill must read these project files before publishing:

```text
.codex-memory/project-state.md
.codex-memory/todo.md
docs/superpowers/specs/2026-06-17-blog-publishing-package-design.md
src/data/publishing/categories.ts
src/data/publishing/defaults.ts
src/data/publishing/authors.ts
src/lib/publishing/loadPackagePosts.ts
src/lib/publishing/validatePublishedPost.ts
```

When changing a post, the skill must also inspect:

```text
content/posts/<slug>.md
content/posts/<slug>.meta.json
public/posts/<slug>/
```

## Publishing Model

The skill must use the existing publishing package model.

Each article package consists of:

```text
content/posts/<slug>.md
content/posts/<slug>.meta.json
public/posts/<slug>/thumbnail.png  optional
public/posts/<slug>/hero.png       optional
public/posts/<slug>/og.png         optional
```

Ownership rules:

- Markdown owns article body only.
- `.meta.json` owns publishing metadata.
- Frontmatter must not become the source of truth.
- If frontmatter conflicts with `.meta.json`, the skill must resolve or remove the conflict before publication.

## User Experience Goal

The user should feel like they are talking to an editor and release manager, not filling out a CMS form.

Minimum user input:

```md
# Article Title

Article body...
```

Optional user input:

```text
category: Java
tags: java, memory
published: true
thumbnail.png
hero.png
og.png
```

The user does not need to know:

- repo folder structure
- `.meta.json` shape
- RSS/sitemap generation
- fallback rules
- Git commands
- build commands
- route verification commands

## Interaction Principles

The skill must behave as a staged publishing partner. It should not ask the user to provide every field up front, and it should not start file creation while important material is still missing.

Core principles:

- collect one class of material per stage
- summarize what has been collected after each stage
- identify missing or weak material before moving forward
- offer concrete editorial and metadata suggestions, not generic reminders
- allow the user to accept, reject, or defer suggestions
- keep a visible publication plan until final confirmation
- write files only after the user confirms the complete plan

The skill should use ordinary conversation, but internally maintain a collection ledger:

```text
intent:
  action:
  language:
  publicationState:
body:
  source:
  title:
  status:
metadata:
  slug:
  category:
  excerpt:
  tags:
  relatedPosts:
assets:
  thumbnail:
  hero:
  og:
fallbacks:
  thumbnail:
  hero:
  og:
confirmation:
  bodySuggestions:
  metadata:
  assetFallbacks:
  finalWrite:
```

The ledger does not need to be written to disk. It is the skill's conversation-state model, and the final publishing preview must be derived from it.

## Staged Conversation Contract

Each stage must produce three outputs before moving on:

```text
1. Collected material
2. AI assessment and suggestions
3. Next required user decision or confirmation
```

The skill should keep questions narrow. Prefer asking for the next missing material instead of presenting a long CMS-like checklist.

Example stage response shape:

```text
I have:
- title: ...
- body source: pasted Markdown
- likely language: Chinese

My suggestions:
- The opening is clear, but the conclusion is thin.
- The current title is usable; I would shorten it to ...
- This should stay draft until the final section is filled.

Next I need:
- confirm whether to apply the title suggestion
- choose draft or published
```

If the user provides enough material to satisfy multiple stages at once, the skill may extract it, but it must still show the staged summary and ask for confirmation before writing files.

## Interaction State Machine

The skill must proceed through this state machine:

```text
START
  -> INTENT_CONFIRMED
  -> BODY_COLLECTED
  -> META_CONFIRMED
  -> ASSETS_CONFIRMED
  -> PREVIEW_CONFIRMED
  -> FILES_WRITTEN
  -> VERIFIED
  -> REVIEWED
  -> COMMITTED
  -> DONE
```

The skill must not skip confirmation gates before writing files.

Allowed backward movement:

- `META_CONFIRMED -> BODY_COLLECTED` when title, excerpt, or structure changes after review
- `ASSETS_CONFIRMED -> META_CONFIRMED` when an image changes SEO or social copy
- `PREVIEW_CONFIRMED -> META_CONFIRMED` when the user changes route/category/publish state

Disallowed movement:

- any state after `FILES_WRITTEN` must not silently discard written files
- any destructive rewrite of an existing post requires explicit user confirmation
- delete operations are outside the normal publishing path and must follow the project deletion rule

## Stage 1 - Confirm Publishing Intent

Goal: determine what kind of publishing work is requested.

Ask the user to choose:

```text
1. Publish a new post
2. Update an existing post
3. Create a draft package only
```

Also confirm:

```text
language: Chinese / English / bilingual
publication state: published / draft
```

Required AI guidance:

- If the article is incomplete, recommend `published: false`.
- If the user is exploring ideas, recommend draft mode.
- If the post is a finished technical note, recommend published mode after validation.
- If the user says "help me publish this" but only provides a rough idea, treat it as draft creation until body quality improves.
- If the user says "update" without a slug, list likely existing matches instead of guessing.

Exit criteria:

- the publishing action is known
- the publication state is known
- update targets have an existing slug

Example prompt:

```text
This sounds like a new post. I can publish it or prepare it as a draft first.
Before I collect the article body, please confirm:
- language: Chinese, English, or bilingual?
- state: draft or published?
```

## Stage 2 - Collect Article Body

Goal: obtain enough body content to create or update the Markdown file.

Accept:

- Markdown
- plain text
- outline
- pasted notes
- existing draft file path

The skill must analyze the body before moving forward.

Required suggestions:

- title quality
- opening clarity
- section structure
- missing conclusion
- code-block formatting
- whether headings can generate a useful TOC
- whether the content is better as a draft

The skill must not rewrite the whole article without consent. It may suggest edits and ask whether to apply them.

Body readiness levels:

```text
ready:
  complete article with coherent intro, sections, and ending
needs-light-edit:
  publishable after small title/excerpt/heading fixes
draft-only:
  notes, outline, or incomplete article
blocked:
  not enough content to create a meaningful post
```

When the body is `draft-only`, the skill should recommend one of:

- create a draft package now
- ask the user for missing sections
- propose an outline expansion before metadata confirmation

When the body contains code blocks, the skill must check:

- fenced language labels exist where useful
- code blocks are not accidentally indented prose
- shell commands are clearly separated from output
- long lines are acceptable for the current article style

When the body is Chinese, the skill should suggest:

- readable English slug candidates
- Chinese excerpt unless the user wants bilingual metadata
- title normalization only when it improves clarity

Exit criteria:

- article body is available
- user has accepted or declined editorial suggestions

## Stage 3 - Collect And Confirm Metadata

Goal: create a complete `.meta.json` plan.

Required fields:

```text
slug
title
date
category
excerpt
published
```

Defaulted fields:

```text
author
featured
tags
relatedPosts
seoTitle
seoDescription
summaryQuote
```

The skill must propose metadata from the body, then ask for confirmation.

Example proposal:

```json
{
  "slug": "java-memory-structure-notes",
  "title": "Java Memory Structure Notes",
  "date": "2026-06-18",
  "category": "java",
  "excerpt": "A compact note on stack, heap, references, and practical debugging maps.",
  "author": "dengyie",
  "published": true,
  "featured": false,
  "tags": ["java", "memory", "runtime"],
  "relatedPosts": ["java-map-comparison", "java-stack-heap"],
  "seoTitle": "Java Memory Structure Notes | Little Lighthouse",
  "seoDescription": "A compact note on stack, heap, references, and practical debugging maps.",
  "summaryQuote": "Memory diagrams are only useful when they make debugging decisions clearer."
}
```

Slug rules:

- use lowercase kebab case
- keep it short and stable
- translate Chinese titles into readable English slugs
- check existing post slugs
- if a slug exists, propose a better unique slug rather than silently appending a suffix

Slug proposal rules for Chinese titles:

- provide 2-3 English slug candidates
- prefer stable technical nouns over literal word-by-word translation
- keep the final slug under roughly 60 characters when possible
- avoid date suffixes unless the date is central to the post

Category rules:

- use canonical category slugs from `src/data/publishing/categories.ts`
- map common user labels to canonical slugs
- `C++` maps to `c-plus-plus`
- unknown categories require a recommendation and user confirmation

Metadata suggestion quality rules:

- `excerpt` should describe the actual value of the article, not repeat the title.
- `seoDescription` may match `excerpt` when the excerpt is already concise.
- `summaryQuote` should only be generated when it sounds natural; otherwise omit it.
- `tags` should be specific enough to help discovery, usually 2-5 tags.
- `featured` should default to `false` unless the user explicitly asks to feature the post.
- `date` should default to the current local date only after the user confirms publication timing.

Related-post rules:

- prefer same-category posts
- exclude self
- use 2-3 posts
- if no good match exists, leave empty and let fallback behavior apply

Exit criteria:

- user confirms metadata
- category is canonical
- slug is unique for new posts

Example metadata confirmation prompt:

```text
I suggest this metadata:

slug: java-object-layout-notes
category: java
published: false
tags: java, memory, debugging

Two notes:
- I recommend draft because the conclusion is currently only one paragraph.
- I left relatedPosts empty because the closest matches are weak; the site fallback can handle this.

Confirm this metadata, or tell me what to change.
```

## Stage 4 - Collect Optional Assets

Goal: determine which resources the user provides and which fallbacks will apply.

Ask:

```text
Do you have article images?
1. No images; use defaults
2. thumbnail only
3. hero only
4. og only
5. multiple images
```

Supported assets:

```text
thumbnail.png
hero.png
og.png
```

Recommended image guidance:

- `thumbnail.png`: card-safe crop, clear subject, works at small sizes
- `hero.png`: wider image for article detail hero
- `og.png`: 1200x630 social share image

Rules:

- assets are user-provided by default
- do not generate images unless the user explicitly asks for generated images
- missing assets are allowed
- missing assets must be reported as intentional fallback use
- if provided asset filenames differ, normalize them into the supported names only after confirmation
- if an asset is clearly the wrong shape, warn the user and recommend either fallback or replacement
- never overwrite existing post assets without explicit confirmation

Fallback report example:

```text
thumbnail: not provided; category default will be used
hero: not provided; site folk illustration fallback will be used
og: provided by user
```

Exit criteria:

- asset availability is known
- user accepts fallback behavior

Asset intake modes:

```text
none:
  no assets; use category or site defaults
paths:
  user provides local file paths; skill copies them after confirmation
existing:
  assets already exist under public/posts/<slug>/
generate-requested:
  user explicitly asks AI to generate image assets
```

If `generate-requested` is selected, the skill must use the image-generation workflow only after confirming visual direction, target asset names, and whether generated images may be committed.

## Stage 5 - Final Publishing Preview

Goal: show the complete package plan before writing files.

The skill must display:

```text
Files to create/update
Route impact
RSS/sitemap impact
Metadata summary
Asset/fallback summary
Validation commands
Commit message
```

Example:

```text
Will create:
- content/posts/java-memory-structure-notes.md
- content/posts/java-memory-structure-notes.meta.json

Will not create:
- public/posts/java-memory-structure-notes/ because no images were provided

Will publish:
- /posts/java-memory-structure-notes
- /posts
- /categories/java
- RSS
- sitemap

Fallbacks:
- thumbnail: Java category default
- hero: site folk illustration default
- og: site default OG image

Commit:
- feat(blog): publish java-memory-structure-notes
```

Required final question:

```text
Confirm that I should generate the files, run validation, and commit this post?
```

Exit criteria:

- user explicitly confirms publication or draft creation

The final preview is the hard gate. It must include enough information for the user to catch mistakes without reading the repository.

Minimum final preview fields:

```text
Action:
Slug:
Title:
Language:
Published:
Category:
Files:
Assets:
Fallbacks:
Public routes:
Validation:
Review:
Commit:
```

The skill must not treat vague acknowledgements like "ok" as final write confirmation if the preview was not shown immediately before it. Ask a clear confirmation question again.

## Stage 6 - Write Files

Only after final confirmation, the skill may write files.

For new posts:

```text
content/posts/<slug>.md
content/posts/<slug>.meta.json
public/posts/<slug>/... optional assets
```

For updates:

- read existing package first
- preserve unrelated metadata
- update only confirmed fields
- never overwrite user-provided assets without explicit confirmation

Markdown rules:

- preserve the user's article body
- remove publishing-source frontmatter unless it is intentionally non-authoritative
- keep UTF-8 without BOM
- avoid generated clutter comments

Metadata rules:

- write stable, pretty JSON
- keep required fields explicit
- keep optional fields only when useful
- do not invent fake related posts that do not exist

Write safety rules:

- check `git status --short` before writing
- inspect existing target files before updating them
- avoid touching unrelated generated files until validation requires it
- preserve unrelated user changes in a dirty worktree
- keep UTF-8 without BOM
- use deterministic formatting for JSON and Markdown
- if a target file exists unexpectedly, pause and ask before overwriting

## Stage 7 - Verify

Required commands:

```bash
npm.cmd run build
```

Required route checks for a published post:

```text
out/posts/<slug>.html exists
out/posts.html includes post link or title
out/categories/<category>.html includes post link or title
public/rss.xml includes post URL or title
public/sitemap.xml includes post URL
```

Recommended script:

```bash
node scripts/verify-blog-package.mjs <slug>
```

If this script does not exist yet, the skill must perform equivalent checks manually and should recommend adding the script.

Existing route fidelity scripts should be run when the new post could affect showcase-facing pages:

```bash
node scripts/verify-posts-archive-fidelity.mjs
node scripts/verify-post-detail-fidelity.mjs
node scripts/verify-category-page-fidelity.mjs
```

Failure handling:

- fix blocking validation errors
- rerun build
- do not commit if build fails
- report warning-only fallback use clearly

Draft verification behavior:

- validate `content/posts/<slug>.md`
- validate `content/posts/<slug>.meta.json`
- confirm `published: false`
- confirm public route/feed/sitemap inclusion is skipped or absent
- skip public-output checks that only apply to published posts

Published verification behavior:

- run the package verifier after build
- confirm detail route export exists
- confirm archive/category/feed/sitemap inclusion
- confirm warnings are intentional and documented in the final report

## Stage 8 - Production Review

Use `production-code-quality-review` before committing.

Review scope:

- new Markdown package
- new `.meta.json`
- asset placement
- route/RSS/sitemap output
- build warnings
- any changed resolver or validation code

Review report must include:

```text
severity findings
improvement suggestions
quality score
pass status
```

The skill may self-fix review findings and rerun verification before commit.

Review can be scoped to a checkpoint when the change is only a post package:

```text
Review mode: checkpoint
Scope: content/posts/<slug>.*, public/posts/<slug>/, generated feed/sitemap output
Focus: correctness, publication leakage, route/feed inclusion, metadata quality, asset placement
```

Review must block commit when it finds:

- published draft leakage
- broken required metadata
- invalid category
- missing body for a published post
- asset path mismatch
- build failure
- generated public route missing for a published post

## Stage 9 - Memory And Commit

Update:

```text
.codex-memory/session-log.md
.codex-memory/decisions.md when decisions were made
.codex-memory/todo.md when follow-up remains
```

Session log entry must include:

```text
Task
Actions
Results
Next
Blockers
```

Commit messages:

New published post:

```bash
git commit -m "feat(blog): publish <slug>"
```

Draft post:

```bash
git commit -m "chore(blog): add draft <slug>"
```

Post update:

```bash
git commit -m "fix(blog): update <slug>"
```

The commit must be atomic: one post package or one coherent publishing change.

If the user asks not to commit, the skill must stop after verification and report the exact uncommitted files.

If the post is published and committed, memory should record:

- slug
- publication state
- assets/fallbacks
- verification commands
- review outcome
- commit hash

If the post remains draft, memory should record:

- why it stayed draft
- what is needed before publication
- where the draft package lives

## Stage 10 - Final Report

The skill response after a successful run must include:

```text
published slug
files created/updated
assets used/fallbacks applied
validation commands and results
review status and score
commit hash
remaining follow-up
```

Example:

```text
Published `java-memory-structure-notes`.

Created:
- content/posts/java-memory-structure-notes.md
- content/posts/java-memory-structure-notes.meta.json

Fallbacks:
- thumbnail: Java category default
- hero: site default
- og: site default

Verification:
- npm.cmd run build passed
- detail/posts/category/rss/sitemap checks passed

Review:
- score 94
- status: passed

Commit:
- abc1234 feat(blog): publish java-memory-structure-notes
```

For a draft, use:

```text
Created draft `java-memory-structure-notes`.

Not published:
- `published` is false
- no public route/feed/sitemap inclusion expected

Next:
- add conclusion
- confirm hero image or accept fallback
- rerun publication workflow when ready
```

## Resume And Recovery Behavior

The skill should support interrupted publishing conversations.

On resume:

1. read project memory
2. inspect `git status --short`
3. check whether target post files already exist
4. reconstruct the latest safe stage from files and conversation context
5. show what is known and what still needs confirmation

If files were already written but not verified:

- do not rewrite immediately
- verify package shape first
- ask whether to continue validation or revert only if the user explicitly requests removal

If build fails:

- summarize the first blocking error
- fix only relevant package issues
- rerun the smallest useful verifier before rerunning the full build

If unrelated files are dirty:

- ignore unrelated changes
- do not stage unrelated changes
- mention them only if they affect the publication

## Public Submit Page

The site may include a simple page:

```text
/submit
```

Purpose:

- explain how to provide content to the AI publisher
- show the minimum Markdown template
- list optional assets
- set expectations that AI handles the publishing workflow

This page must not:

- request GitHub tokens
- pretend to publish directly from GitHub Pages
- store uploaded content
- implement a full CMS

Recommended submit page sections:

```text
1. Minimum post template
2. Optional metadata
3. Optional image resources
4. What the AI publisher will do
5. What happens after publication
```

Minimum template:

```md
# Article Title

Article body...
```

Recommended template:

```md
title: Article Title
category: Java
tags: java, memory
published: true

# Article Title

Article body...
```

## Skill Implementation Phases

### Phase 8 - Publishing Skill Design

- create this design document
- define interaction stages
- define confirmation gates
- define resource ownership
- define verification expectations

Acceptance:

- design is complete enough to implement `SKILL.md`
- workflow separates resources from process
- user confirmation points are explicit

### Phase 9 - Submit Guide Page

- add `design-system/pages/submit-page-spec.md`
- add `src/app/submit/page.tsx`
- add footer entry only if the page should be discoverable
- keep the page informational, not write-capable

Acceptance:

- static export includes `/submit`
- page explains minimum and recommended input
- page does not include token or upload-backend claims

### Phase 10 - Blog Package Verifier

- add `scripts/verify-blog-package.mjs`
- support `node scripts/verify-blog-package.mjs <slug>`
- verify detail route, posts index, category archive, RSS, and sitemap

Acceptance:

- verifier passes for an existing post
- verifier fails clearly for a missing slug

### Phase 11 - Skill Implementation

- create `little-lighthouse-blog-publisher`
- include lean `SKILL.md`
- move detailed contracts into references
- optionally add scaffold script
- validate with `quick_validate.py`

Acceptance:

- skill validates
- skill can walk through staged interaction
- skill does not write files before final confirmation

Recommended Phase 11 resource split:

```text
SKILL.md
  concise trigger workflow, safety gates, and reference routing
references/interaction-state-machine.md
  staged conversation model, ledger, confirmation rules, resume behavior
references/package-contract.md
  file layout, metadata fields, category rules, draft/published behavior
references/editorial-guidelines.md
  title, excerpt, slug, structure, language-specific suggestions
references/asset-guidelines.md
  supported image slots, fallback policy, generated-image boundary
references/verification-checklist.md
  build, verifier, route/feed/sitemap checks, failure handling
references/commit-and-memory.md
  memory updates, review, atomic commit, final report
scripts/scaffold-post-package.mjs
  optional deterministic package writer once manual workflow stabilizes
```

`SKILL.md` should stay lean enough to load quickly. It should instruct Codex to read only the relevant reference file for the current stage.

## First-Version Skill Prompt Examples

The skill should work for requests like:

```text
帮我发布一篇新 blog，我先给你正文。
```

Expected behavior:

- confirm new post/draft/published intent
- collect body
- suggest title, slug, category, excerpt
- ask about optional assets
- preview files and route impact
- write only after final confirmation

```text
把这篇 Java 笔记做成草稿，图片先走默认兜底。
```

Expected behavior:

- set `published: false`
- accept missing images
- create Markdown and metadata package after confirmation
- verify draft package without public route checks

```text
更新 java-map-comparison 的 hero 图。
```

Expected behavior:

- inspect existing package
- confirm exact asset source and overwrite target
- update only `public/posts/java-map-comparison/hero.png`
- run relevant verification

```text
这篇文章够不够发布？你先帮我看。
```

Expected behavior:

- stay in body/editorial review stage
- provide structure and publication-readiness suggestions
- avoid writing files until the user asks to publish or draft

## Non-Goals

- no browser-hosted CMS
- no GitHub token entry on the public site
- no client-side write-back to repository
- no external database
- no server functions required for the default workflow
- no AI-generated images unless explicitly requested

## Open Questions

1. Should `/submit` be linked from the footer, README only, or hidden unless shared directly?
2. Should the skill default new posts to `published: true` or `published: false` when the user does not specify?
3. Should Chinese posts generate English slugs automatically, or should the skill always show 2-3 slug options?
4. Should generated excerpts be English, Chinese, or match the article language?
5. Should the first version implement `scripts/verify-blog-package.mjs` before the skill, or should the skill do manual checks first?

## Recommended Defaults

- link `/submit` from footer as `Submit`
- default unknown publication state to `draft`
- show 2-3 slug options for Chinese titles
- make excerpt language match article language
- implement `scripts/verify-blog-package.mjs` before the skill, because it gives the skill a deterministic gate

## Definition Of Done

The skill design is complete when:

- the state machine is documented
- each user interaction stage has entry and exit criteria
- each stage defines collected material, AI suggestions, and user confirmation
- the user-confirmation gate before file writes is explicit
- resource fallback behavior is explicit
- validation and review commands are explicit
- memory and commit requirements are explicit
- public submit page boundaries are explicit
- implementation phases are clear enough to schedule
- resume and failure behavior are documented
- first-version prompt examples are documented
