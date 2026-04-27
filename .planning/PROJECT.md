# TGTC — TG Tech Consulting Website

## What This Is

Marketing website for TG Tech Consulting (TGTC), an independent NetSuite
consulting practice based in the Benelux operated by Thibaut Gendebien.
The site exists to generate qualified leads for two service pillars:
NetSuite consulting/automation and AI integration for business operations.

## Core Value

**Distinctive editorial presence** that converts the right prospects (existing
NetSuite users + companies wanting AI in their ops) into inbound contacts —
without looking like another generic NetSuite partner site.

## Requirements

### Validated

(None yet — first release in progress)

### Active

- [ ] Lead-gen marketing site, 4 main pages + 2 legal pages
- [ ] EN + FR locales (NL deferred), Benelux geo focus
- [ ] Editorial × Hermes visual direction (forest-green / cream / gold,
      serif + monospace, manuscript-tech aesthetic)
- [ ] 2 service pillars: NetSuite Consulting & Automation / AI Integration
- [ ] Contact via mailto + LinkedIn (no form, no Calendly)
- [ ] Vercel Analytics + GA4 with GDPR consent banner
- [ ] Lighthouse 95+ across all four axes on all pages
- [ ] MDX-based content so copy changes are PRs of `.mdx` files only

### Out of Scope (v1)

- Blog / `/insights` section — no content yet
- Video demos — current videos rejected by user as low-quality
- Per-client case study pages — content not available
- Written client testimonials — none collected yet
- Contact form with backend — mailto suffices
- Calendly integration — explicitly declined by user
- Dutch locale — dropped from current iteration, may return on demand
- Light/dark theme toggle — v1 is dark-only
- Light variant of palette — declared as `parchment` token but unused in v1

## Context

- Current site is Flutter Web on GitHub Pages, ~3 MB JS bundle, mediocre
  Lighthouse, poor SEO due to CanvasKit rendering. Complete rewrite needed.
- Target audience splits in two: existing NetSuite users hitting ERP limits
  vs. companies wanting to inject AI into ops (any ERP)
- 2 client logos available: Bollé and Clinisys
- Domain `tgtechconsulting.com` is already configured on GitHub Pages and
  must be re-pointed to Vercel during migration
- User confirmed external backup of Flutter build exists; no `legacy/flutter`
  archival branch needed
- Design fully validated and locked in `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md`

## Constraints

- **Tech stack**: Next.js 14 (App Router) + TypeScript strict + Tailwind CSS
  + Framer Motion + next-intl. Hosted on Vercel. No backend, no database,
  no API routes for v1.
- **Repo**: Existing `Nn1co.github.io` repo conserved. Wipe Flutter build
  on `main`, scaffold Next.js in place. No legacy archival branch.
- **Compliance**: GA4 requires GDPR consent banner. Belgian commercial
  activity requires `/legal/notice` (mentions légales) with company
  registration details.
- **Performance**: Lighthouse Performance ≥ 95 mobile, LCP < 1.5s,
  initial JS bundle < 100kb gzipped, page weight < 500kb on Home.
- **Design fidelity**: Palette and typography are non-negotiable per
  validated spec. Animations must respect `prefers-reduced-motion`.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 + Tailwind + Vercel | User's primary stack; sufficient for marketing site | — Pending |
| Drop Flutter Web entirely | Wrong tool for marketing (3MB bundle, bad SEO) | — Pending |
| Editorial × Hermes visual direction | Distinctive in NetSuite consulting market; user explicitly chose | — Pending |
| 4 main pages (minimal sitemap) | Focused message > diluted content; user chose option A | — Pending |
| EN + FR only, drop NL | Anglais couvre Flandre/NL/international; FR couvre Wallonie/Lux | — Pending |
| MDX content storage | Allows copy edits without code changes for Thibaut | — Pending |
| Mailto + LinkedIn only (no form) | Zero backend; quality > volume; user chose | — Pending |
| Vercel Analytics + GA4 with consent | Vercel cookieless + GA4 for conversion tracking with banner | — Pending |
| No legacy/flutter branch | User confirmed external backup exists | — Pending |

---
*Last updated: 2026-04-27 after design spec validation*
