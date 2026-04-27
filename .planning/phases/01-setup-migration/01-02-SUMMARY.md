---
phase: 01-setup-migration
plan: 02
subsystem: scaffold
tags:
  - nextjs
  - typescript
  - tailwind
  - bootstrap
dependency_graph:
  requires:
    - "01-01 (clean working tree)"
  provides:
    - "Next.js 14 (App Router) + TS strict + Tailwind v3 runtime"
    - "All P2-P7 runtime dependencies pre-installed"
    - "TGTC placeholder page renderable on localhost:3000 + future Vercel deploy"
    - "Path alias @/* → ./src/*"
    - ".gitignore covering Next.js conventions + Vercel + env + macOS"
    - "README documenting the new stack and dev/build/deploy flow"
  affects:
    - "main branch HEAD (3 atomic commits)"
    - "package.json + package-lock.json (dependency manifest)"
tech_stack:
  added:
    - "Next.js 14.2.35"
    - "React 18 (^18)"
    - "TypeScript 5 (^5)"
    - "Tailwind CSS 3.4.19 (^3.4.1)"
    - "framer-motion ^12.38.0"
    - "next-intl ^4.9.1"
    - "@next/mdx ^16.2.4"
    - "@mdx-js/loader ^3.1.1"
    - "@mdx-js/react ^3.1.1"
    - "@vercel/analytics ^2.0.1"
    - "clsx ^2.1.1"
    - "tailwind-merge ^3.5.0"
    - "@types/mdx ^2.0.13 (dev)"
    - "ESLint 8 + eslint-config-next 14.2.35 (dev)"
  patterns:
    - "App Router (src/app/)"
    - "TypeScript strict mode"
    - "Tailwind v3 with PostCSS"
    - "Path alias @/* resolves to ./src/*"
key_files:
  created:
    - "package.json"
    - "package-lock.json"
    - "tsconfig.json"
    - "next.config.mjs"
    - "tailwind.config.ts"
    - "postcss.config.mjs"
    - ".eslintrc.json"
    - ".gitignore"
    - "src/app/layout.tsx"
    - "src/app/page.tsx"
    - "src/app/globals.css"
    - "src/app/favicon.ico"
    - "src/app/fonts/GeistVF.woff"
    - "src/app/fonts/GeistMonoVF.woff"
    - "next-env.d.ts (gitignored)"
  modified:
    - "README.md (full rewrite — Flutter README replaced with Next.js stack doc)"
decisions:
  - "Used create-next-app@14 (pinned) to land Next.js 14.2.35 + React 18 + Tailwind 3 — latest create-next-app would have produced Next.js 16 + React 19 + Tailwind 4, which contradicts CONTEXT.md locked decisions"
  - "Scaffold ran into a temp directory and copied the result into the repo root because create-next-app rejected the repo name 'Nn1co.github.io' (uppercase letters violate npm package naming)"
  - "package.json `name` is 'tgtc' (the temp scaffold dir name) — npm-valid lowercase, scoped to local install only since the package is private:true"
  - ".gitignore from create-next-app already covered .DS_Store + .env*.local; only `.vercel` was upgraded to `.vercel/` (trailing slash) to match the spec exactly"
  - "Geist fonts (woff files) shipped by create-next-app stay in src/app/fonts/ for now; P2 will replace them with the spec-mandated IM Fell English / EB Garamond / JetBrains Mono"
metrics:
  duration: "~5 min"
  completed_date: "2026-04-27"
  commits: 3
  build_status: "passing (npm run build exits 0)"
  build_size: "First Load JS / = 87.4 kB (137 B page-specific)"
requirements_satisfied:
  - SITE-01
  - MIG-02
---

# Phase 01 Plan 02: Next.js Scaffold Summary

Bootstrapped Next.js 14 (App Router) with TypeScript strict mode, Tailwind v3,
and ESLint into the cleaned repo, then installed every runtime dependency
the P2-P7 roadmap will consume so subsequent phases never need to stop and
add a dep mid-task. Replaced the create-next-app demo page with a minimal
"TGTC — under construction" placeholder, rewrote the README to document
the new stack, and ensured `.gitignore` covers Vercel + env + macOS noise.
Build passes; dev server serves the placeholder on `localhost:3000`.

## Commits

| Hash | Subject | Refs |
|------|---------|------|
| `aa99a7e` | `chore(01-02): scaffold Next.js 14 with TS strict + Tailwind + App Router` | SITE-01, MIG-02 |
| `f8f06f7` | `build(01-02): install core runtime deps for P2-P7 roadmap` | SITE-01, MIG-02 |
| `141c268` | `chore(01-02): placeholder page, gitignore additions, new README` | SITE-01, MIG-02 |

## Final `package.json` Dependency List

**Runtime:**
```
@mdx-js/loader   ^3.1.1
@mdx-js/react    ^3.1.1
@next/mdx        ^16.2.4
@vercel/analytics ^2.0.1
clsx             ^2.1.1
framer-motion    ^12.38.0
next             14.2.35
next-intl        ^4.9.1
react            ^18
react-dom        ^18
tailwind-merge   ^3.5.0
```

**Dev:**
```
@types/mdx       ^2.0.13
@types/node      ^20
@types/react     ^18
@types/react-dom ^18
eslint           ^8
eslint-config-next 14.2.35
postcss          ^8
tailwindcss      ^3.4.1   (resolved 3.4.19)
typescript       ^5
```

## Build Output

```
▲ Next.js 14.2.35
✓ Compiled successfully
✓ Generating static pages (5/5)

Route (app)                              Size     First Load JS
┌ ○ /                                    137 B          87.4 kB
└ ○ /_not-found                          875 B          88.1 kB
+ First Load JS shared by all            87.2 kB
```

`npm run build` exits 0. Bundle size healthy for a placeholder page (87.4 kB
First Load is dominated by the React/Next.js runtime; the page itself is 137 B).

## Dev Server Smoke Test

```
GET http://localhost:3000  →  200
body contains "TGTC"        →  yes
<title>                     →  TGTC — under construction
<html lang="…">             →  fr
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocking] `create-next-app@latest` rejects repo name due to uppercase**
- **Found during:** Task 1 first invocation
- **Issue:** Running `npx create-next-app@latest .` from `/Users/.../Nn1co.github.io/` failed with `Could not create a project called "Nn1co.github.io" because of npm naming restrictions: name can no longer contain capital letters.`
- **Fix:** Scaffolded into a temp directory (`mktemp -d` + `tgtc` subdir) then copied every artifact except `.git/`, `node_modules/`, and `package-lock.json` into the target repo. Same final state, no contamination of the existing `.git/` history.
- **Files modified:** none (workaround only)
- **Commit:** captured in `aa99a7e`

**2. [Rule 4-equivalent — but resolved without checkpoint] `create-next-app@latest` ships Next.js 16 + React 19 + Tailwind v4**
- **Found during:** Task 1 second invocation (after fix #1)
- **Issue:** The latest `create-next-app` (as of 2026-04-27) scaffolds Next.js 16.2.4 + React 19 + Tailwind v4, which contradicts CONTEXT.md locked decisions (Next.js 14 + React 18 + Tailwind v3) and the plan's exact acceptance criteria (`"next":` followed by `14`).
- **Decision rationale:** CONTEXT.md decisions are locked by the user; the planning team explicitly chose Next.js 14 (design spec §4 decisions table). Pinning to `create-next-app@14` is a deterministic in-scope substitution that respects locked decisions, not an architectural change. No checkpoint needed.
- **Fix:** Re-ran with `npx create-next-app@14` (pinned to v14 of the scaffolder). Result is exactly the file shape the plan expects: Next.js 14.2.35, React 18, Tailwind 3.4.1, `tailwind.config.ts`, `next.config.mjs`, `.eslintrc.json`.
- **Side effect:** `create-next-app@14` does not support `--no-turbopack` (Turbopack wasn't an option then), so the `--no-turbopack` flag from the plan was dropped. Result respects the plan's intent (Turbopack NOT enabled — default webpack dev server).
- **Side effect:** `create-next-app@14` does not support `--skip-install`, so `node_modules/` got installed into the temp dir. We discarded that install during the copy and ran `npm install` afresh in Task 2.
- **Files modified:** none beyond Task 1 scope
- **Commit:** captured in `aa99a7e`

**3. [Rule 1 — Bug] `.gitignore` had `.vercel` (no slash), spec calls for `.vercel/`**
- **Found during:** Task 3 audit before edits
- **Issue:** create-next-app emits `.vercel` (without trailing slash) in `.gitignore`. The plan's acceptance criteria require `grep -q ".vercel/" .gitignore` to pass; without the slash, only `grep -q ".vercel"` would match.
- **Fix:** Edited `.gitignore` to `.vercel/` exactly. `.env*.local` and `.DS_Store` were already correct.
- **Files modified:** `.gitignore`
- **Commit:** captured in `141c268`

**4. [Rule 2 — Critical functionality] Geist fonts kept (deferred to P2)**
- **Found during:** Task 3 layout rewrite
- **Issue:** create-next-app shipped `src/app/fonts/GeistVF.woff` and `GeistMonoVF.woff` plus a `localFont` setup in the original `layout.tsx`. The new placeholder layout no longer references them. Removing them now would be in-scope for P2 (which will replace fonts with IM Fell / EB Garamond / JetBrains Mono per spec §6.2).
- **Decision:** Leave the woff files in `src/app/fonts/`. They're tracked but unused; P2 will swap them for the spec fonts and clean up. No build penalty since `localFont` was removed from `layout.tsx`.
- **Files modified:** none
- **Commit:** n/a

No architectural deviations required user input.

## Verification Run

| Check | Result |
|------|--------|
| `npm run build` exit code | 0 |
| Build output contains `Compiled successfully` | yes |
| `tsconfig.json` `"strict": true` | yes |
| `tsconfig.json` `"@/*":` path alias | yes |
| `package.json` next 14.x | 14.2.35 |
| `package.json` react 18.x | ^18 |
| `npm ls tailwindcss` | 3.4.19 |
| All 9 P2-P7 deps present in package.json | yes |
| `src/app/page.tsx` contains `TGTC` | yes |
| `src/app/layout.tsx` contains `title: 'TGTC` | yes |
| `.gitignore` contains `.vercel/`, `.env*.local`, `.DS_Store`, `node_modules`, `.next` | yes |
| `README.md` mentions Next.js 14, npm run dev/build, Vercel, design spec, ROADMAP | yes |
| `localhost:3000` HTTP status | 200 |
| `localhost:3000` body contains `TGTC` | yes |
| `docs/superpowers/specs/...md` preserved | yes |
| `.planning/ROADMAP.md` preserved | yes |
| `node_modules/` tracked | no (`git ls-files node_modules/` empty) |
| `git status --porcelain` post-commit | empty |

## Next Step

Plan `01-03-vercel-connect-PLAN.md` (Wave 3, autonomous: false) — connects
the GitHub repo to a new Vercel project, configures the build, and gets
the auto-generated `*.vercel.app` URL serving the placeholder. **Requires
user input** (Vercel CLI/dashboard access, project naming, account choice)
and **explicit approval to push to `origin/main`**, so this plan executor
stops here. The user runs `/gsd-execute-phase --plan 01-03` (or chains
manually) when ready.

## Self-Check: PASSED

- File `package.json` — FOUND (next 14.2.35)
- File `tsconfig.json` — FOUND (strict: true)
- File `tailwind.config.ts` — FOUND
- File `src/app/page.tsx` — FOUND (renders "TGTC — under construction")
- File `src/app/layout.tsx` — FOUND (title TGTC, lang fr)
- File `.gitignore` — FOUND (.vercel/, .env*.local, .DS_Store entries)
- File `README.md` — FOUND (rewrite, mentions Next.js 14 + Vercel)
- Commit `aa99a7e` — FOUND on `main`
- Commit `f8f06f7` — FOUND on `main`
- Commit `141c268` — FOUND on `main`
- Build passing — confirmed
- Dev server serving placeholder — confirmed (HTTP 200, body has TGTC)
