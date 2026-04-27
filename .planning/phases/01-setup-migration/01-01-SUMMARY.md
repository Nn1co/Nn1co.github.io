---
phase: 01-setup-migration
plan: 01
subsystem: migration
tags:
  - flutter-wipe
  - migration
  - cleanup
dependency_graph:
  requires: []
  provides:
    - "clean working tree (.git/, docs/, .planning/ only) ready for Next.js scaffold"
    - "atomic commit recording the Flutter wipe with MIG-01 traceability"
  affects:
    - "main branch HEAD"
tech_stack:
  added: []
  patterns:
    - "explicit-path git rm (no glob, no rm -rf *)"
    - "pre-wipe inventory snapshot for after-the-fact diff"
key_files:
  created:
    - ".planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt"
  modified:
    - "main branch (57 Flutter artifacts removed)"
decisions:
  - "Wipe directly on main, no legacy/flutter archival branch (user has external backup per CONTEXT.md)"
  - "One atomic commit for the entire wipe (not split per file/dir)"
  - ".gitignore from create-next-app will be created in Plan 02 (no .gitignore existed before the wipe)"
metrics:
  duration: "~3 min"
  completed_date: "2026-04-27"
  commits: 1
  files_deleted: 57
  files_added: 1
requirements_satisfied:
  - MIG-01
---

# Phase 01 Plan 01: Flutter Wipe Summary

Single atomic commit removed all Flutter Web build artifacts from `main`
(main.dart.js, canvaskit/, assets/, icons/, media/, etc.) while preserving
`.git/`, `docs/`, and `.planning/`. Pre-wipe inventory snapshot captured for
audit. Working tree now ready for `create-next-app` in Plan 02.

## Outcome

- **Commit:** `44d4912` — `chore(01-01): remove Flutter web build from main`
- **Files deleted:** 57 (Flutter artifacts + macOS noise + dropped media)
- **Files added:** 1 (`.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt`)
- **Diff stat:** 58 files changed, 101 insertions(+), 193,118 deletions(-)

## Preserved Paths Verified

- `.git/` — full history intact
- `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md` — design spec preserved (still tracked)
- `.planning/` — 9 GSD planning files preserved (PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md, plans, context, inventory)

Note: `.gitignore` did NOT exist before this plan (the legacy Flutter build
had no root `.gitignore`). Plan 02's `create-next-app` will produce a fresh
one with Next.js conventions.

## Pre-wipe Inventory

`/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt`

Captured 2026-04-27 before any deletion. Contains:
- `git ls-files` of every tracked path
- `ls -la` of repo root
- `du -sh` of removed top-level directories (assets, canvaskit, icons, media)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocking] `.gitignore` not present pre-wipe**
- **Found during:** Task 2 inventory check
- **Issue:** The plan's preservation list and acceptance criteria assert `.gitignore` is preserved through the wipe, but no root `.gitignore` existed in the legacy Flutter tree
- **Fix:** No-op — the preservation requirement was anticipatory (Plan 02 creates the file via `create-next-app`). Documented here so the next planner doesn't expect a `.gitignore` carry-over
- **Files modified:** none
- **Commit:** n/a

**2. [Rule 1 — macOS regeneration] `.DS_Store` regenerated post-rm**
- **Found during:** Task 2 + Task 3 verification
- **Issue:** macOS Finder regenerated `.DS_Store` between `rm -f` and `git commit`, leaving it as untracked noise
- **Fix:** Removed via `rm -f .DS_Store` after each appearance. Plan 02 adds `.DS_Store` to `.gitignore` permanently
- **Files modified:** none committed
- **Commit:** n/a

No architectural deviations.

## Verification Run

| Check | Result |
|------|--------|
| `git status --porcelain` | empty (clean) |
| `git log -1 --pretty=%s` | `chore(01-01): remove Flutter web build from main` |
| `main.dart.js` in commit diff | yes |
| Spec preserved (`docs/superpowers/specs/...md`) | yes |
| `.planning/ROADMAP.md` preserved | yes |
| `git ls-files` Flutter artifacts | 0 matches |
| HEAD branch | `main` |

## Next Step

Plan `01-02-nextjs-scaffold-PLAN.md` — runs `npx create-next-app@latest .`
into the now-empty tree, installs P2-P7 runtime dependencies, writes the
TGTC placeholder page, replaces README, and updates `.gitignore`.

## Self-Check: PASSED

- File `.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt` — FOUND
- Commit `44d4912` — FOUND on `main`
