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
