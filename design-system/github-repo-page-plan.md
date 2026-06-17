# GitHub Repository Page Plan

## Goal

Improve the GitHub repository landing experience for `dengyie.github.io` by adding a polished `README.md` that quickly explains what the project is, what makes it distinctive, and how to run or extend it.

## Audience

- Visitors opening the repository for the first time
- Recruiters or collaborators scanning project quality
- Future maintainers returning to the codebase

## Problems In Current State

- The repository has no `README.md`, so the GitHub homepage feels empty and unfinished.
- There is no quick explanation of the live site, design direction, or route structure.
- Visitors cannot immediately see screenshots, stack choices, or local setup steps.

## README Content Plan

### 1. Header
- Project name: `Little Lighthouse`
- One-sentence description
- Link to live site

### 2. Preview
- Use exported QA screenshots already in the repo
- Show desktop and mobile views so the repository page has immediate visual richness

### 3. Highlights
- Folk Canvas visual system
- Static export workflow
- Shared content source for cards/detail/feed generation
- Route coverage

### 4. Tech Stack
- Next.js 15
- React 19
- TypeScript
- CSS Modules
- Static export

### 5. Project Structure
- Brief tree for main folders only

### 6. Local Development
- Install
- Dev
- Build/export

### 7. Key Routes
- `/`
- `/posts`
- `/posts/[slug]`
- `/categories/[category]`

### 8. Design Notes
- Point readers to `design-system/`

## Writing Style

- Concise, confident, and visual-first
- Repository-facing rather than implementation-dump
- Avoid placeholder marketing language

## Acceptance

- GitHub repository homepage looks complete without opening any files
- A visitor can understand the project in under 20 seconds
- README uses real screenshots and accurate commands
