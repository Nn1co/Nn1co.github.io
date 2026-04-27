# Phase 1: Setup & migration - Context

**Gathered:** 2026-04-27
**Status:** Ready for planning
**Source:** PRD Express Path (`docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md`)

<domain>
## Phase Boundary

This phase wipes the legacy Flutter Web codebase from `main`, scaffolds a
fresh Next.js 14 (App Router) project with TypeScript strict mode and
Tailwind CSS in place, installs the core runtime dependencies the rest of
the roadmap depends on, and connects the GitHub repo to a Vercel project
so every push to `main` deploys automatically to a `*.vercel.app` URL.

**In scope:**
- Removing all Flutter source/build artifacts from `main` (the spec/docs
  folder is preserved)
- Running `create-next-app` with the project conventions (TS strict, App
  Router, Tailwind, ESLint, src dir)
- Installing the core dependencies the next phases need so the bootstrap
  is "complete enough" before P2 starts
- Adding a minimal `app/page.tsx` placeholder that renders something
  identifiable (so the Vercel deploy is observable)
- Configuring the Vercel project (linking the repo, setting build
  command, framework preset, and Node version)
- Adding `.gitignore` entries appropriate for Next.js
- Documenting the dev/build/deploy commands in a fresh `README.md`

**Out of scope (for this phase):**
- Custom domain binding (Phase 9 owns the DNS switchover; here we just
  use the auto-generated `*.vercel.app` URL)
- Any visual design work (Phase 2 owns design tokens and fonts)
- Any layout components (Phase 3)
- Any page content (Phases 4-5)
- i18n routing (Phase 6)
- SEO config, analytics, legal pages (Phase 7)
- Lighthouse optimization (Phase 8)
- DNS migration and GitHub Pages disable (Phase 9)

</domain>

<decisions>
## Implementation Decisions

### Stack (locked)
- Next.js 14 (App Router) — confirmed by user
- TypeScript strict mode (no `any`, prefer `unknown`)
- Tailwind CSS for styling
- Hosted on Vercel
- Package manager: npm (per global CLAUDE.md, unless project CLAUDE.md
  overrides — no project CLAUDE.md exists yet)

### Repository (locked)
- Same repo: `Nn1co.github.io` (existing, conserved to avoid reconfiguring
  the domain registrar binding later)
- Branch strategy: wipe directly on `main`. **No** `legacy/flutter`
  archival branch — user has confirmed an external backup of the Flutter
  build exists outside the repo
- Files explicitly preserved through the wipe:
  - `.git/` (entire history)
  - `.gitignore` (will be replaced/updated)
  - `docs/` (contains the design spec — must survive)
  - `.planning/` (contains GSD project files — must survive)

### Bootstrap conventions
- Use `npx create-next-app@latest .` with these flags:
  - `--typescript` (TS)
  - `--tailwind` (Tailwind preinstalled)
  - `--app` (App Router)
  - `--eslint`
  - `--src-dir` (use `src/app/` rather than top-level `app/`)
  - `--import-alias "@/*"` (path alias)
  - `--no-turbo` (default Next.js dev server, simpler troubleshooting)
- Result is `package.json` with React 18 + Next.js 14, TypeScript 5,
  Tailwind 3, ESLint config

### Core dependencies installed in this phase
The spec calls for these libraries in later phases. We install them up
front so subsequent phases never need to stop and add a dependency mid-task:
- `framer-motion` (P4 animations: typewriter, page transitions, fade-in)
- `next-intl` (P6 i18n)
- `@next/mdx` + `@mdx-js/loader` + `@mdx-js/react` + `@types/mdx` (P4-7
  MDX content sourcing)
- `@vercel/analytics` (P7 Vercel Analytics)
- `clsx` + `tailwind-merge` (utility for shared component variants in P2)

### Vercel project configuration
- Connect the GitHub repo `Nn1co.github.io` to a new Vercel project
- Framework preset: Next.js (auto-detected)
- Build command: `next build` (default)
- Output directory: `.next` (default)
- Install command: `npm install`
- Node.js version: 20.x (LTS)
- Root directory: project root (no monorepo)
- Production branch: `main`
- Auto-deploy on push: enabled
- The custom domain `tgtechconsulting.com` is **NOT** added in this
  phase — Phase 9 owns that step

### Placeholder page
- `src/app/page.tsx` renders a minimal "TGTC — under construction" message
- Plain text, no design tokens (those land in P2)
- Purpose: confirm the Vercel deploy is reachable and rendering Next.js
  output (not a 404 or build failure)

### .gitignore for Next.js
Replace any Flutter-era `.gitignore` content with the standard
`create-next-app` ignore list, plus:
- `.vercel/` (Vercel project link metadata)
- `.env*.local` (environment files)
- macOS noise: `.DS_Store`

### README.md
The existing README mentions Flutter and GitHub Pages. Replace with a
new README that describes:
- The project (TGTC marketing website)
- The stack (Next.js 14 + TS + Tailwind + Vercel)
- Local development commands (`npm install`, `npm run dev`, `npm run build`)
- Deploy flow (push to `main` → Vercel auto-deploys)
- Pointer to `docs/superpowers/specs/` for the canonical design spec
- Pointer to `.planning/` for the GSD roadmap

### Commit hygiene
- One atomic commit per task (per global CLAUDE.md: Conventional Commits
  in English)
- Use `chore:` for scaffolding, `docs:` for README, `build:` for
  dependency adds where appropriate

### Claude's Discretion (areas not pinned by spec)
- Exact ordering of file deletions (the wipe step is one big delete)
- Whether to use `npm` vs `pnpm` — spec implies npm via global CLAUDE.md
  default, no project override exists, so npm
- Whether to enable Tailwind v4 or stay on v3 — `create-next-app@latest`
  currently ships v3, stay on v3 for now (v4 has migration friction not
  worth incurring before P2 starts)
- Whether to install `eslint-plugin-tailwindcss` — yes, helpful for
  shared component lint in P2; defer unless it costs nothing to add now

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design contract
- `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md` —
  Full validated design spec. Sections relevant to Phase 1:
  - §4 Decisions Summary (stack, repo, hosting, domain rows)
  - §9 Technical Architecture (target repo structure)
  - §12 Migration plan (high-level step list — this phase covers Step 1
    of the migration plan; Phase 9 covers Step 3)

### GSD project files
- `.planning/PROJECT.md` — project mission, constraints, key decisions
- `.planning/REQUIREMENTS.md` — checkable requirements with traceability
- `.planning/ROADMAP.md` — 9-phase roadmap with success criteria

### Global guidelines
- `~/.claude/CLAUDE.md` (user's global instructions): Next.js + TS strict
  default stack, npm package manager, Conventional Commits English,
  no `console.log` in production, prompts in `/src/prompts/*.md`

### Phase requirement IDs (from ROADMAP.md)
Plans for this phase MUST address: **SITE-01, MIG-01, MIG-02, MIG-03**

| REQ-ID | Description |
|--------|-------------|
| SITE-01 | Site rendered via Next.js 14 (App Router) with TypeScript strict mode, deployed on Vercel |
| MIG-01 | Flutter source files removed from `main` branch (user has external backup, no archival branch) |
| MIG-02 | Next.js scaffolded in place via `create-next-app` with TS + Tailwind + App Router |
| MIG-03 | Vercel project configured, repo connected, automatic deploy on push to `main` |

</canonical_refs>

<specifics>
## Specific Ideas

### Pre-wipe inventory (what's currently in main)

Per `git ls-tree main` against `Nn1co.github.io/`, the current Flutter
build artifacts include:
- `404.html`, `index.html` (Flutter web entry points)
- `main.dart.js` (~3 MB), `flutter.js`, `flutter_bootstrap.js`,
  `flutter_service_worker.js`
- `assets/` (Flutter compiled assets)
- `canvaskit/` (Flutter renderer)
- `media/` (vidéos returns-assistant.mov, tgtc-demo.mov — explicitly
  dropped per spec §13)
- `icons/`, `manifest.json`, `version.json`, `favicon.png`

**Files to PRESERVE through the wipe:**
- `.git/` (history)
- `.gitignore` (will be modified after wipe)
- `docs/` (design spec)
- `.planning/` (GSD files)
- The `.nojekyll` file is a GitHub Pages convention; safe to delete since
  we're moving off GitHub Pages

### Verification pattern

After scaffolding, the deploy is "live" when:
1. `npm run build` exits 0 locally
2. `git push origin main` triggers a Vercel deploy
3. The Vercel dashboard shows a successful deploy
4. The auto-generated `*.vercel.app` URL renders the placeholder page

### Vercel CLI vs. Dashboard

Either approach works for the initial connect:
- **Dashboard** (recommended for first-time): import the GitHub repo via
  the Vercel UI, less typing
- **CLI** (`vercel link` then `vercel`): scriptable, but requires the
  user to have the Vercel CLI logged in

The plan can call this out as a step the user performs (with explicit
confirmation prompt), not an action Claude executes — Vercel project
creation is shared infrastructure per the global CLAUDE.md rules.

</specifics>

<deferred>
## Deferred Ideas

These came up while scoping Phase 1 but belong elsewhere:

- **Custom domain binding** (`tgtechconsulting.com` → Vercel) — Phase 9
  owns this. Phase 1 lives at the auto `*.vercel.app` URL.
- **CI Lighthouse audit** — Phase 8 owns the Lighthouse 95+ gate.
- **`.env.example` for future API keys** — Phase 7 (analytics) or later.
  No env vars needed in P1.
- **Husky / lint-staged / pre-commit hooks** — useful but optional;
  defer to a polish pass post-launch.
- **Storybook for shared components** — Phase 2 may add this; not P1.

</deferred>

---

*Phase: 01-setup-migration*
*Context gathered: 2026-04-27 via PRD Express Path*
