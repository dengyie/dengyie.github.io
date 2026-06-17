# GitHub Pages Workflow Release Fix

## Objective

Restore a reliable GitHub Pages release path for the Little Lighthouse static export after the publishing-package migration.

## Problem

The repository now builds and validates correctly from the `source` branch, but GitHub Pages deployment is still split across two older assumptions:

1. the repository Pages setting is still in `legacy` mode and serves from `main`
2. the Actions workflow deploy job is being run from `source`
3. the `github-pages` environment currently allows `main` and `master`, but not `source`

That combination lets the build job succeed while the deploy job is rejected by environment protection.

## Desired Release Model

Use `source` as the single code-and-release branch for the production site workflow.

- developers push source changes to `source`
- GitHub Actions builds the static export from `source`
- Pages runs in `workflow` mode instead of legacy branch mode
- the `github-pages` environment explicitly allows `source`
- `main` can remain in the repository as a historical branch, but it is no longer the live publishing source

## Implementation Plan

### 1. Workflow trigger cleanup

- update `.github/workflows/deploy.yml` so automatic deploys run on pushes to `source`
- keep `workflow_dispatch` for manual retry and release verification

### 2. Repository Pages setting alignment

- switch the repository Pages site from `legacy` to `workflow`
- point the Pages source branch metadata to `source` with path `/`

### 3. Environment policy alignment

- add `source` to the `github-pages` environment deployment branch policy
- keep existing `main` and `master` allowances unless there is a separate explicit cleanup pass later

### 4. Validation

- run `npm.cmd run build` locally before release
- push the workflow change to `source`
- trigger or observe the GitHub Actions deploy run from `source`
- confirm the Pages site returns the refreshed export

## Out Of Scope

- deleting `main` or `master`
- changing the repository default branch
- replacing GitHub Pages with another hosting provider

## Acceptance Criteria

- `.github/workflows/deploy.yml` auto-runs on `source` pushes
- `npm.cmd run build` passes locally
- GitHub Pages no longer reports `build_type: legacy`
- the `github-pages` environment allows `source`
- a `Deploy to GitHub Pages` run from `source` completes successfully
- `https://dengyie.github.io/` serves the refreshed 18-page export
