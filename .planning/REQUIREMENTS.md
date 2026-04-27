# Requirements: TGTC Website

**Defined:** 2026-04-27
**Core Value:** Distinctive editorial presence that converts the right prospects into inbound contacts without looking like another generic NetSuite partner site.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Site Foundation (SITE)

- [x] **SITE-01**: Site rendered via Next.js 14 (App Router) with TypeScript strict mode, deployed on Vercel
- [ ] **SITE-02**: Lighthouse Performance score ≥ 95 mobile across all 4 main pages
- [ ] **SITE-03**: Initial JS bundle ≤ 100kb gzipped on Home page
- [ ] **SITE-04**: LCP < 1.5s mobile, CLS < 0.05, TBT < 100ms on Home
- [ ] **SITE-05**: All copy editable via MDX files in `content/<locale>/<page>.mdx`

### Content & Pages (CONT)

- [ ] **CONT-01**: 4 main pages live: `/`, `/services`, `/about`, `/contact` per validated spec
- [ ] **CONT-02**: 2 legal pages live: `/legal/privacy`, `/legal/notice` (footer-linked only)
- [ ] **CONT-03**: Home page renders 8 narrative sections (Hero, Partners, Pillar 1, Pillar 2, Approach, Peppol, Manifesto, Final CTA) per spec §7.1
- [ ] **CONT-04**: Both client logos rendered on Home Partners section: Bollé + Clinisys
- [ ] **CONT-05**: Services page renders both pillars with internal anchors (`#netsuite`, `#ai`)

### Internationalization (I18N)

- [ ] **I18N-01**: Two locales live: English (en) and French (fr) — content parity required
- [ ] **I18N-02**: Subpath routing: `/fr/...` and `/en/...` — root `/` redirects via Accept-Language at the Edge
- [ ] **I18N-03**: Auto-detection from `Accept-Language` header on first visit
- [ ] **I18N-04**: Manual language switcher in header, persists choice via `NEXT_LOCALE` cookie

### Visual System (VIS)

- [ ] **VIS-01**: Palette implemented as Tailwind tokens: `ink #0E1410`, `ink-soft #142019`, `cream #E8E2CF`, `gold #D4A55F` per spec §6.1
- [ ] **VIS-02**: Three fonts self-hosted in `public/fonts/`: IM Fell English (display), EB Garamond (body), JetBrains Mono (mono)
- [ ] **VIS-03**: Animations implemented per spec §8: typewriter on Home H1, fade-in scroll, dotted-to-solid hover underlines, ink diffusion on primary CTA, header compression on scroll, page transitions
- [ ] **VIS-04**: All decorative animations respect `@media (prefers-reduced-motion: reduce)`
- [ ] **VIS-05**: Logo is typographic only ("TG TECH · CONSULTING") — no separate icon mark

### SEO (SEO)

- [ ] **SEO-01**: Per-route metadata via Next.js `generateMetadata()` on every page
- [ ] **SEO-02**: OG images 1200×630 generated as static PNGs in `public/og/` for each main page
- [ ] **SEO-03**: `sitemap.xml` auto-generated via `app/sitemap.ts`
- [ ] **SEO-04**: `robots.txt` present, allows all crawlers, points to sitemap
- [ ] **SEO-05**: JSON-LD `Organization` + `LocalBusiness` (Benelux address) injected in `<head>`
- [ ] **SEO-06**: `hreflang` alternate tags for FR/EN parity with `x-default`
- [ ] **SEO-07**: Lighthouse SEO score = 100 on all pages

### Compliance & Legal (LEG)

- [ ] **LEG-01**: `/legal/privacy` page covers data controller, GA4 behavior, third-party processors, user rights, contact for data requests
- [ ] **LEG-02**: `/legal/notice` page covers Belgian mentions légales: company name, address, BCE/CBE, VAT, hosting provider, publication director
- [ ] **LEG-03**: Cookie consent banner: minimal UI, default refused, GA4 only loads after explicit accept, choice stored in `NEXT_TGTC_CONSENT` cookie
- [ ] **LEG-04**: Vercel Analytics enabled (cookieless, no banner needed)

### Migration & Deployment (MIG)

- [x] **MIG-01**: Flutter source files removed from `main` branch (user has external backup, no archival branch)
- [x] **MIG-02**: Next.js scaffolded in place via `create-next-app` with TS + Tailwind + App Router
- [ ] **MIG-03**: Vercel project configured, repo connected, automatic deploy on push to `main`
- [ ] **MIG-04**: Custom domain `tgtechconsulting.com` connected to Vercel
- [ ] **MIG-05**: GitHub Pages disabled in repo settings after Vercel propagation confirmed
- [ ] **MIG-06**: DNS A/CNAME records updated at registrar to point at Vercel

### Maintenance & Operations (MNT)

- [ ] **MNT-01**: Content edits possible by submitting PR of `.mdx` files only — no code changes required
- [ ] **MNT-02**: Lighthouse audit runs in CI (or pre-commit) to prevent regressions
- [ ] **MNT-03**: Repository documentation (README) reflects new stack and contribution flow

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content expansion (CONT-V2)

- **CONT-V2-01**: Blog / `/insights` section with at least 3 articles
- **CONT-V2-02**: Video demos (new recordings, current ones rejected)
- **CONT-V2-03**: Per-client case study pages (`/work/bolle`, `/work/clinisys`)
- **CONT-V2-04**: Written client testimonials with photos

### Capabilities (CAP-V2)

- **CAP-V2-01**: Contact form with backend (Resend / Vercel Forms / Formspree)
- **CAP-V2-02**: Calendly integration in footer
- **CAP-V2-03**: Dutch (NL) locale reintroduced
- **CAP-V2-04**: Light/dark theme toggle

## Out of Scope (definitive — won't be added)

| Feature | Reason |
|---------|--------|
| Backend / database | Marketing site only; lead-gen via mailto suffices |
| User accounts / auth | No app functionality, just a brochure |
| E-commerce / payments | Consulting practice, not a product |
| Native mobile apps | Web-first, responsive sufficient |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | Phase 1 | Complete |
| MIG-01 | Phase 1 | Complete |
| MIG-02 | Phase 1 | Complete |
| MIG-03 | Phase 1 | Pending |
| VIS-01 | Phase 2 | Pending |
| VIS-02 | Phase 2 | Pending |
| VIS-05 | Phase 2 | Pending |
| CONT-01 | Phase 3, 4, 5 | Pending |
| I18N-04 | Phase 3 | Pending |
| CONT-03 | Phase 4 | Pending |
| CONT-04 | Phase 4 | Pending |
| VIS-03 | Phase 4 | Pending |
| CONT-05 | Phase 5 | Pending |
| I18N-01 | Phase 6 | Pending |
| I18N-02 | Phase 6 | Pending |
| I18N-03 | Phase 6 | Pending |
| SITE-05 | Phase 6 | Pending |
| MNT-01 | Phase 6 | Pending |
| SEO-01 | Phase 7 | Pending |
| SEO-02 | Phase 7 | Pending |
| SEO-03 | Phase 7 | Pending |
| SEO-04 | Phase 7 | Pending |
| SEO-05 | Phase 7 | Pending |
| SEO-06 | Phase 7 | Pending |
| LEG-01 | Phase 7 | Pending |
| LEG-02 | Phase 7 | Pending |
| LEG-03 | Phase 7 | Pending |
| LEG-04 | Phase 7 | Pending |
| CONT-02 | Phase 7 | Pending |
| SITE-02 | Phase 8 | Pending |
| SITE-03 | Phase 8 | Pending |
| SITE-04 | Phase 8 | Pending |
| VIS-04 | Phase 8 | Pending |
| SEO-07 | Phase 8 | Pending |
| MNT-02 | Phase 8 | Pending |
| MIG-04 | Phase 9 | Pending |
| MIG-05 | Phase 9 | Pending |
| MIG-06 | Phase 9 | Pending |
| MNT-03 | Phase 9 | Pending |

---
*Updated: 2026-04-27 after design spec validation*
