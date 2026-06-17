# Documentation Encoding Repair - 2026-06-18

## Objective

Repair repository-facing documentation that was saved or rewritten with broken character encoding so the docs remain readable and trustworthy.

## Problem

The current Chinese README and the `/posts` phase note contain mojibake text even though the English documentation is readable.

This creates three concrete problems:

1. the GitHub repository landing page looks broken for Chinese readers
2. phase documentation loses value because acceptance notes are partially unreadable
3. future updates become risky because good content and damaged content are mixed in the same files

## Scope

- repair `README.md`
- repair `design-system/posts-page-fidelity-tuning-phase-1.md`
- keep `README.en.md` aligned where wording needs a matching update
- do not change active application code in this documentation-only repair

## Repair Rules

1. preserve the current project facts, links, and workflow descriptions
2. replace mojibake with natural Simplified Chinese or clean English, depending on file language
3. keep Markdown structure stable so GitHub rendering does not change unexpectedly
4. avoid deleting older historical design notes during this pass

## Acceptance Criteria

- `README.md` is fully readable in Simplified Chinese
- `README.en.md` still matches the current repository state
- `design-system/posts-page-fidelity-tuning-phase-1.md` contains no mojibake
- `git diff` for this phase stays documentation-only
