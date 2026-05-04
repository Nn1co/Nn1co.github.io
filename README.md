# TGTC — TG Tech Consulting

Marketing website for TG Tech Consulting — NetSuite consulting and AI
integration practice based in the Benelux.

## Stack

- **Framework**: Next.js 14 (App Router) with React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 with custom palette tokens (ink, cream, gold)
- **Animations**: CSS-first; Framer Motion lazy-loaded for the mobile overlay
- **i18n**: next-intl 4 (subpath routing `/fr`, `/en`, Accept-Language detection)
- **Content**: structured copy in `messages/<locale>.json`, surfaced via
  `useTranslations` / `getTranslations`
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

Page copy lives in `messages/fr.json` and `messages/en.json`, organised
by namespace (`home.hero`, `services.netsuite`, `about.principles`, …).
A copy change is a PR of these JSON files only — no React or layout
work is required for a textual update. Both locales must stay in sync.

## Environment variables

| Variable | Purpose | Required in prod |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin (e.g. `https://tgtechconsulting.com`) | yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID, only loaded after explicit consent | optional |

## Performance budget

The build aims for Lighthouse 95+ across Performance, Accessibility,
Best Practices, and SEO on every page. First-Load JS sits well under
the 100 kB gzipped target on every route; legal pages stay close to
the framework baseline. CSS animations are preferred over Framer
Motion to keep the initial bundle lean; Framer is only paid for when
the mobile menu opens.

## Repository

`Nn1co.github.io` — same repo as the previous Flutter build; history
preserved.
