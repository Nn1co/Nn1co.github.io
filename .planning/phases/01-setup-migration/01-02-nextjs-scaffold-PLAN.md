---
phase: 01-setup-migration
plan: 02
type: execute
wave: 2
depends_on:
  - 01-01
files_modified:
  - package.json
  - package-lock.json
  - tsconfig.json
  - next.config.mjs
  - tailwind.config.ts
  - postcss.config.mjs
  - .eslintrc.json
  - .gitignore
  - README.md
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/globals.css
  - public/next.svg
  - public/vercel.svg
autonomous: true
requirements:
  - SITE-01
  - MIG-02

must_haves:
  truths:
    - "`npm run dev` boots a Next.js dev server on http://localhost:3000 without errors"
    - "`npm run build` produces a production build that exits 0"
    - "TypeScript strict mode is enabled in tsconfig.json"
    - "Tailwind CSS v3 is configured and `@tailwind` directives are present in globals.css"
    - "App Router is in use (`src/app/` directory exists)"
    - "Path alias `@/*` resolves to `src/*`"
    - "All core dependencies for later phases (framer-motion, next-intl, MDX, @vercel/analytics, clsx, tailwind-merge) are installed"
    - "The Vercel placeholder page renders the string `TGTC` so Plan 03 can smoke-test the deploy"
    - "README documents the new stack and dev/build commands"
  artifacts:
    - path: "package.json"
      provides: "Next.js 14 + React 18 + TS 5 + Tailwind 3 manifest with all P1-bootstrap deps"
      contains: '"next":'
    - path: "tsconfig.json"
      provides: "TypeScript strict configuration"
      contains: '"strict": true'
    - path: "tailwind.config.ts"
      provides: "Tailwind config with content globs covering src/"
      contains: "content"
    - path: "src/app/page.tsx"
      provides: "Placeholder Home page rendering the string TGTC"
      contains: "TGTC"
    - path: "src/app/layout.tsx"
      provides: "Root layout with metadata"
      min_lines: 10
    - path: "src/app/globals.css"
      provides: "Tailwind base/components/utilities import"
      contains: "@tailwind"
    - path: "README.md"
      provides: "Project README documenting stack + dev commands"
      contains: "Next.js"
    - path: ".gitignore"
      provides: "Next.js + Vercel + env conventions"
      contains: "node_modules"
  key_links:
    - from: "src/app/page.tsx"
      to: "browser"
      via: "Next.js dev server on localhost:3000"
      pattern: "TGTC"
    - from: "src/app/globals.css"
      to: "tailwind.config.ts"
      via: "@tailwind directives + content scanning"
      pattern: "@tailwind base"
    - from: "package.json"
      to: "node_modules"
      via: "npm install lockfile"
      pattern: "package-lock.json"
---

<objective>
Scaffold a fresh Next.js 14 (App Router) project in place via
`create-next-app`, install the core runtime dependencies the rest of the
roadmap depends on, write a minimal placeholder page so the Vercel deploy in
Plan 03 has something observable, replace the README with one that describes
the new stack, and update `.gitignore` with Next.js + Vercel conventions.

Purpose: per CONTEXT.md decisions, the bootstrap must be "complete enough"
before Phase 2 starts so subsequent phases never need to stop and add a
dependency mid-task. This plan delivers SITE-01 (Next.js 14 + TS strict
runtime) and MIG-02 (scaffolded via create-next-app with TS + Tailwind +
App Router) end to end.

Output:
- `package.json` with React 18 + Next 14 + TS 5 + Tailwind 3 + framer-motion +
  next-intl + @next/mdx (+ MDX deps) + @vercel/analytics + clsx + tailwind-merge
- `src/app/{layout,page}.tsx` + `src/app/globals.css` (placeholder Home renders "TGTC")
- `tailwind.config.ts`, `tsconfig.json` (strict), `next.config.mjs`, `.eslintrc.json`
- New `README.md` describing stack + dev/build/deploy flow
- New `.gitignore` per Next.js conventions plus `.vercel/`, `.env*.local`, `.DS_Store`
- Three atomic commits: scaffold, deps, README+placeholder
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-setup-migration/01-CONTEXT.md
@.planning/phases/01-setup-migration/01-01-SUMMARY.md
@docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
</context>

<interfaces>
<!-- Expected output of `create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --no-turbo`. -->
<!-- These are the file contracts subsequent plans (P2 design system, P4 home) will build on. -->

After scaffold, the tree must contain:

```
package.json                  // next 14, react 18, typescript 5, tailwindcss 3, eslint config
tsconfig.json                 // strict: true, paths: { "@/*": ["./src/*"] }
next.config.mjs               // empty default config
tailwind.config.ts            // content: ["./src/**/*.{ts,tsx,mdx}"], theme.extend: {}, plugins: []
postcss.config.mjs            // tailwindcss + autoprefixer plugins
.eslintrc.json                // extends "next/core-web-vitals"
.gitignore                    // Next.js conventions
src/app/layout.tsx            // Root layout, exports `metadata` and default RootLayout({ children })
src/app/page.tsx              // Home page (we replace this with the TGTC placeholder)
src/app/globals.css           // @tailwind base; @tailwind components; @tailwind utilities;
public/next.svg               // default Next.js asset (kept until P2 cleanup)
public/vercel.svg             // default Vercel asset (kept until P2 cleanup)
```

Core dependencies to install on top of the scaffold (per CONTEXT.md decisions):

```
framer-motion          // P4 animations: typewriter, page transitions, fade-in
next-intl              // P6 i18n with subpath routing
@next/mdx              // P4-7 MDX content sourcing (Next.js MDX integration)
@mdx-js/loader         // peer of @next/mdx
@mdx-js/react          // peer of @next/mdx
@types/mdx             // dev — type-safe MDX imports
@vercel/analytics      // P7 Vercel Analytics
clsx                   // P2 shared component variants
tailwind-merge         // P2 shared component variants
```

Path alias contract used throughout the codebase:
  `@/*` → `./src/*`
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Run create-next-app to scaffold Next.js 14 + TS + Tailwind + App Router</name>
  <files>package.json, package-lock.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.mjs, .eslintrc.json, .gitignore, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, public/next.svg, public/vercel.svg</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-SUMMARY.md
    - /Users/nicolaslobonieuwenhuys/.claude/CLAUDE.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
  </read_first>
  <action>
    From repo root, run create-next-app non-interactively with the exact flags
    listed in CONTEXT.md decisions:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"
    npx --yes create-next-app@latest . \
      --typescript \
      --tailwind \
      --eslint \
      --app \
      --src-dir \
      --import-alias "@/*" \
      --use-npm \
      --no-turbopack \
      --skip-install
    ```

    Notes:
    - `--use-npm` enforces npm per global CLAUDE.md
    - `--skip-install` defers `npm install` to Task 2 (which adds extra deps in the same install)
    - `--no-turbopack` matches CONTEXT.md decision (default Next.js dev server, simpler troubleshooting)
    - The `.` argument scaffolds into the current directory; create-next-app
      will detect existing files (`docs/`, `.planning/`, `.gitignore`,
      `.git/`) and proceed (it only fails if the dir contains conflicting
      files like an existing `package.json`, which Plan 01 already wiped)

    Then verify TypeScript strict mode and the path alias landed correctly:

    ```bash
    grep -q '"strict": true' tsconfig.json
    grep -q '"@/\*":' tsconfig.json
    grep -q '"next": "' package.json
    grep -q '"tailwindcss":' package.json
    test -f src/app/layout.tsx && test -f src/app/page.tsx && test -f src/app/globals.css
    test -f tailwind.config.ts && test -f postcss.config.mjs && test -f next.config.mjs
    ```

    Stage and commit (no install yet):

    ```bash
    git add -A
    git commit -m "$(cat <<'EOF'
chore(01-02): scaffold Next.js 14 with TS strict + Tailwind + App Router

create-next-app@latest with --typescript --tailwind --eslint --app
--src-dir --import-alias "@/*" --use-npm --no-turbopack --skip-install.

Result: package.json (Next 14, React 18, TS 5, Tailwind 3, ESLint
next/core-web-vitals), tsconfig.json (strict: true, paths @/* -> ./src/*),
src/app/{layout,page,globals.css}, tailwind.config.ts, postcss.config.mjs,
next.config.mjs.

Refs: SITE-01, MIG-02, design spec §9 Technical Architecture
EOF
)"
    ```
  </action>
  <verify>
    <automated>cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io" && grep -q '"strict": true' tsconfig.json && grep -q '"@/\*":' tsconfig.json && grep -q '"next": "' package.json && grep -q '"tailwindcss":' package.json && test -f src/app/layout.tsx && test -f src/app/page.tsx && test -f src/app/globals.css && test -f tailwind.config.ts && grep -q '@tailwind base' src/app/globals.css && git log -1 --pretty=%s | grep -q "scaffold Next.js 14"</automated>
  </verify>
  <acceptance_criteria>
    - File exists: `package.json`, contains `"next":` followed by a version starting with `14` or `^14` (e.g. `"next": "14.` or `"next": "^14`)
    - File exists: `tsconfig.json`, contains exact substring `"strict": true`
    - File exists: `tsconfig.json`, contains exact substring `"@/*":` (path alias)
    - File exists: `tailwind.config.ts`
    - File exists: `postcss.config.mjs` OR `postcss.config.js` (create-next-app may emit either depending on version)
    - File exists: `next.config.mjs` OR `next.config.js`
    - File exists: `src/app/layout.tsx`
    - File exists: `src/app/page.tsx`
    - File exists: `src/app/globals.css`, contains `@tailwind base`
    - File exists: `.gitignore` (overwritten by create-next-app)
    - File exists: `.eslintrc.json` OR `eslint.config.mjs`
    - Directory exists: `public/`
    - `git log -1 --pretty=%s` matches `chore(01-02): scaffold Next.js 14 with TS strict + Tailwind + App Router`
    - Preserved files still present: `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md`, `.planning/ROADMAP.md`
  </acceptance_criteria>
  <done>create-next-app scaffold landed in repo root, all required files present, strict mode enabled, path alias configured, single commit recording the scaffold. `node_modules/` not yet installed (Task 2 owns it).</done>
</task>

<task type="auto">
  <name>Task 2: Install core runtime dependencies and verify build</name>
  <files>package.json, package-lock.json, node_modules/ (not committed, generated)</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/package.json
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
  </read_first>
  <action>
    Install the dependencies the rest of the roadmap depends on so subsequent
    phases never need to stop and add a dep mid-task. Run from repo root:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

    # Runtime deps
    npm install \
      framer-motion \
      next-intl \
      @next/mdx \
      @mdx-js/loader \
      @mdx-js/react \
      @vercel/analytics \
      clsx \
      tailwind-merge

    # Dev deps
    npm install --save-dev @types/mdx
    ```

    Then run the build to confirm everything compiles cleanly:

    ```bash
    npm run build
    ```

    Build must exit 0. If it fails, do not paper over — diagnose the root
    cause (per global CLAUDE.md "diagnostiquer la cause racine avant de
    contourner"). Common scaffolding issues:
      - Node version mismatch → check `node --version` (need ≥ 18.17, ideally 20.x)
      - Tailwind v4 mistakenly pulled instead of v3 → `npm ls tailwindcss` should
        show 3.x.x; if v4, downgrade with `npm install -D tailwindcss@^3`

    Stage `package.json` + `package-lock.json` and commit:

    ```bash
    git add package.json package-lock.json
    git commit -m "$(cat <<'EOF'
build(01-02): install core runtime deps for P2-P7 roadmap

Adds the dependencies the rest of the phases will consume so that
subsequent plans never need to stop and add a dep mid-task:

  - framer-motion        (P4 animations: typewriter, fade-in, transitions)
  - next-intl            (P6 i18n with subpath routing)
  - @next/mdx, @mdx-js/loader, @mdx-js/react, @types/mdx
                         (P4-7 MDX content sourcing)
  - @vercel/analytics    (P7 Vercel Analytics)
  - clsx, tailwind-merge (P2 shared component variants)

Refs: SITE-01, MIG-02, design spec §9.2
EOF
)"
    ```

    Do NOT commit `node_modules/`; it is excluded by the `.gitignore` from
    create-next-app.
  </action>
  <verify>
    <automated>cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io" && grep -q '"framer-motion":' package.json && grep -q '"next-intl":' package.json && grep -q '"@next/mdx":' package.json && grep -q '"@vercel/analytics":' package.json && grep -q '"clsx":' package.json && grep -q '"tailwind-merge":' package.json && grep -q '"@mdx-js/loader":' package.json && grep -q '"@mdx-js/react":' package.json && grep -q '"@types/mdx":' package.json && test -f package-lock.json && test -d node_modules && npm run build 2>&1 | tail -3 | grep -E "Compiled successfully|✓|Generating static pages"</automated>
  </verify>
  <acceptance_criteria>
    - `package.json` `dependencies` block contains: `framer-motion`, `next-intl`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@vercel/analytics`, `clsx`, `tailwind-merge`
    - `package.json` `devDependencies` block contains: `@types/mdx`
    - File exists: `package-lock.json`
    - Directory exists: `node_modules/`
    - `node_modules/` is NOT tracked: `git ls-files node_modules/ | wc -l` outputs `0`
    - `npm run build` exits with status 0
    - `npm run build` stdout contains either `Compiled successfully` or `Generating static pages` or a checkmark indicating successful build
    - `npm ls tailwindcss --depth=0` reports a version starting with `3.` (Tailwind v3, not v4 — per CONTEXT.md decision)
    - `git log -1 --pretty=%s` matches `build(01-02): install core runtime deps for P2-P7 roadmap`
    - `git status --porcelain` is empty after the commit
  </acceptance_criteria>
  <done>All P2-P7 runtime deps installed and locked, `npm run build` passes, atomic commit records the dep additions. Only `package.json` and `package-lock.json` changed in this commit.</done>
</task>

<task type="auto">
  <name>Task 3: Replace placeholder page, update .gitignore, write new README</name>
  <files>src/app/page.tsx, src/app/layout.tsx, .gitignore, README.md</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/src/app/page.tsx
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/src/app/layout.tsx
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.gitignore
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
  </read_first>
  <action>
    Three small edits, then a single commit.

    **(a) Replace `src/app/page.tsx`** — overwrite the create-next-app demo
    page with a minimal placeholder that renders the literal string `TGTC`
    so Plan 03 can smoke-test the deploy. NO design tokens, NO Tailwind
    classes beyond the most basic centering — P2 owns the design system.
    Use this exact content:

    ```tsx
    export default function HomePage() {
      return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
          <p>TGTC — under construction</p>
        </main>
      )
    }
    ```

    **(b) Update `src/app/layout.tsx`** — set the metadata title to `TGTC`
    so the deploy is identifiable. Replace the existing layout file (which
    create-next-app fills with placeholder fonts and metadata) with this
    minimal version. Keep the `import './globals.css'` so Tailwind still
    boots (P2 will lean on it):

    ```tsx
    import type { Metadata } from 'next'
    import './globals.css'

    export const metadata: Metadata = {
      title: 'TGTC — under construction',
      description: 'TG Tech Consulting — NetSuite consulting & AI integration in the Benelux. Site redesign in progress.',
    }

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <html lang="fr">
          <body>{children}</body>
        </html>
      )
    }
    ```

    **(c) Append three lines to `.gitignore`** — read the create-next-app
    `.gitignore` first, then add (only if not already present) the
    CONTEXT.md additions:

    ```
    # Vercel project link metadata
    .vercel/

    # Environment files
    .env*.local

    # macOS
    .DS_Store
    ```

    Use grep to detect existing entries before appending; e.g.
    `grep -qxF ".vercel/" .gitignore || printf "\n# Vercel project link metadata\n.vercel/\n" >> .gitignore`.
    The default create-next-app `.gitignore` typically already contains
    `.env*` patterns; verify and only add what's missing.

    **(d) Replace `README.md`** — overwrite with the README documenting the
    new stack. Exact content:

    ```markdown
    # TGTC — TG Tech Consulting

    Marketing website for TG Tech Consulting — NetSuite consulting and AI
    integration practice based in the Benelux.

    ## Stack

    - **Framework**: Next.js 14 (App Router) with React 18
    - **Language**: TypeScript (strict mode)
    - **Styling**: Tailwind CSS v3
    - **Animations**: Framer Motion
    - **i18n**: next-intl (subpath routing `/fr`, `/en`)
    - **Content**: MDX via `@next/mdx`
    - **Analytics**: `@vercel/analytics` (cookieless) + GA4 (consent-gated)
    - **Hosting**: Vercel
    - **Package manager**: npm

    ## Local development

    ```bash
    npm install
    npm run dev    # http://localhost:3000
    npm run build  # production build
    npm run start  # serve the production build locally
    npm run lint
    ```

    ## Deploy flow

    Pushing to `main` triggers an automatic deploy on Vercel.

    The temporary `*.vercel.app` URL serves the site during development;
    Phase 9 of the rebuild switches the production DNS off GitHub Pages
    onto Vercel for `tgtechconsulting.com`.

    ## Project documentation

    - **Design spec**: `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md`
      (canonical reference for visual direction, content, architecture)
    - **GSD roadmap**: `.planning/ROADMAP.md`
    - **Requirements**: `.planning/REQUIREMENTS.md`

    ## Content edits

    Page copy lives in `content/<locale>/<page>.mdx` (added in Phase 4+).
    A copy change is a PR of `.mdx` files only — no code change required.

    ## Repository

    `Nn1co.github.io` — same repo as the previous Flutter build; history
    preserved.
    ```

    Stage all four files and commit:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"
    git add src/app/page.tsx src/app/layout.tsx .gitignore README.md
    git commit -m "$(cat <<'EOF'
chore(01-02): placeholder page, gitignore additions, new README

- src/app/page.tsx: minimal "TGTC — under construction" placeholder
  (P2 owns the design system; this just makes the Vercel deploy
  observable in Plan 03)
- src/app/layout.tsx: set metadata title/description to TGTC
- .gitignore: append .vercel/, .env*.local, .DS_Store
- README.md: document the new Next.js + TS + Tailwind + Vercel stack,
  dev/build/deploy commands, pointers to design spec and GSD roadmap

Refs: SITE-01, MIG-02
EOF
)"
    ```

    Verify the dev server boots (smoke test only — kill after a few seconds):

    ```bash
    npm run dev &
    DEV_PID=$!
    sleep 6
    curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
    # Should print 200
    kill $DEV_PID 2>/dev/null
    wait $DEV_PID 2>/dev/null
    ```
  </action>
  <verify>
    <automated>cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io" && grep -q "TGTC" src/app/page.tsx && grep -q "TGTC" src/app/layout.tsx && grep -q ".vercel/" .gitignore && grep -q ".env\*.local" .gitignore && grep -q ".DS_Store" .gitignore && grep -q "Next.js 14" README.md && grep -q "npm run dev" README.md && grep -q "tgtechconsulting" README.md && npm run build 2>&1 | tail -5 | grep -qE "Compiled successfully|Generating static pages|✓"</automated>
  </verify>
  <acceptance_criteria>
    - File `src/app/page.tsx` contains the exact string `TGTC — under construction`
    - File `src/app/page.tsx` exports a default function (regex match: `export default function`)
    - File `src/app/layout.tsx` contains `title: 'TGTC` (or `title: "TGTC` — quote style flexible)
    - File `src/app/layout.tsx` contains `import './globals.css'`
    - File `.gitignore` contains an entry matching exactly `.vercel/`
    - File `.gitignore` contains an entry matching `.env*.local`
    - File `.gitignore` contains an entry matching `.DS_Store`
    - File `README.md` contains the substring `Next.js 14`
    - File `README.md` contains the substring `npm run dev`
    - File `README.md` contains the substring `npm run build`
    - File `README.md` contains the substring `Vercel`
    - File `README.md` contains the substring `docs/superpowers/specs/`
    - File `README.md` contains the substring `.planning/ROADMAP.md`
    - `npm run build` exits 0 after these edits
    - `npm run dev` boots and `curl http://localhost:3000` returns HTTP 200 with body containing the string `TGTC`
    - `git log -1 --pretty=%s` matches `chore(01-02): placeholder page, gitignore additions, new README`
    - `git status --porcelain` is empty
  </acceptance_criteria>
  <done>Placeholder page renders "TGTC — under construction" on `localhost:3000`, layout has TGTC metadata, `.gitignore` covers Vercel + env + macOS noise, README documents the new stack. `npm run build` still passes. Plan 03 can connect Vercel against this state and verify a real deploy.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| npm registry → node_modules | Third-party packages execute install scripts; supply-chain risk |
| package-lock.json → reproducibility | Without a lockfile, builds drift; with one, they're pinned |
| .gitignore → secrets isolation | `.env*.local` MUST be ignored before any env var is ever written |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-02-01 | Tampering | npm supply chain | mitigate | Use `npm install` (not `npx` ad-hoc); commit `package-lock.json` so installs are reproducible; only install named packages from CONTEXT.md decisions, no transitive ad-hoc adds |
| T-01-02-02 | Information disclosure | secrets in repo | mitigate | Task 3 ensures `.env*.local` is in `.gitignore` BEFORE any later phase introduces env vars; acceptance criteria explicitly grep for the pattern |
| T-01-02-03 | Information disclosure | .vercel project link | mitigate | `.vercel/` added to `.gitignore` before Plan 03 runs `vercel link`, so the project ID is never committed |
| T-01-02-04 | Tampering | post-install scripts | accept | Standard Next.js scaffold deps (next, react, tailwind, framer-motion, next-intl, MDX) are well-known, widely audited; no custom-vendor packages introduced. Risk floor is what Vercel/Next.js community already accepts |
| T-01-02-05 | Denial of service | Tailwind v4 surprise | mitigate | CONTEXT.md decided Tailwind v3 stays; acceptance criteria assert `npm ls tailwindcss` shows 3.x; if create-next-app ships v4 by default, Task 2 is responsible for downgrading |
| T-01-02-06 | Repudiation | commit traceability | mitigate | Three atomic Conventional Commits (`chore: scaffold`, `build: install deps`, `chore: placeholder + gitignore + README`) each reference SITE-01/MIG-02 |
| T-01-02-07 | Tampering | preserved files (docs/, .planning/) | mitigate | create-next-app `.` will not touch existing dirs unless they conflict with its scaffold; acceptance criteria for Task 1 re-verify spec and roadmap still exist |
</threat_model>

<verification>
After all three tasks, run from repo root:

```bash
cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

# 1. Build passes
npm run build
# (must exit 0)

# 2. Dev server boots and serves placeholder
npm run dev &
DEV_PID=$!
sleep 6
curl -s http://localhost:3000 | grep -q "TGTC" && echo "placeholder OK"
kill $DEV_PID

# 3. Strict mode + alias
grep -q '"strict": true' tsconfig.json && echo "strict OK"
grep -q '"@/\*":' tsconfig.json && echo "alias OK"

# 4. Required deps
for dep in framer-motion next-intl @next/mdx @vercel/analytics clsx tailwind-merge; do
  grep -q "\"$dep\":" package.json && echo "$dep OK"
done

# 5. .gitignore safety
grep -q "\.env\*\.local" .gitignore && echo "env ignored OK"
grep -q "\.vercel/" .gitignore && echo "vercel ignored OK"

# 6. Preserved files still present
test -f docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md && echo "spec preserved"
test -f .planning/ROADMAP.md && echo "roadmap preserved"
```
</verification>

<success_criteria>
1. `npm run dev` boots a Next.js dev server on `localhost:3000` and `curl :3000` returns HTTP 200 with body containing `TGTC`
2. `npm run build` exits 0 and produces the `.next/` build directory
3. `tsconfig.json` contains `"strict": true` and the `@/*` path alias
4. `package.json` lists ALL of: `next` (14.x), `react` (18.x), `typescript` (5.x), `tailwindcss` (3.x), `framer-motion`, `next-intl`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@vercel/analytics`, `clsx`, `tailwind-merge`, plus dev: `@types/mdx`
5. `package-lock.json` is committed so installs are reproducible on Vercel
6. `.gitignore` contains `.vercel/`, `.env*.local`, `.DS_Store`, `node_modules`, `.next`
7. `README.md` documents the Next.js 14 + TS + Tailwind + Vercel stack with `npm run dev` / `npm run build` / push-to-deploy flow
8. Three atomic commits land on `main`: scaffold, deps, placeholder+README
9. `docs/` and `.planning/` are byte-identical to their pre-scaffold state
</success_criteria>

<output>
After completion, create `.planning/phases/01-setup-migration/01-02-SUMMARY.md`
documenting:
- Three commit SHAs (scaffold, deps, placeholder)
- Final `package.json` dep list with versions
- `npm run build` output snippet (success line)
- Confirmation `localhost:3000` serves the placeholder
- Pointer to `01-03-PLAN.md` as the next step (Vercel connection)
</output>
</content>
</invoke>