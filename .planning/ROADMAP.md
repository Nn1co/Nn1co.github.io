# Roadmap: TGTC Website Rewrite

## Overview

Complete migration of the TGTC marketing site from Flutter Web to Next.js 14
across nine sequential phases. The journey starts with wiping the legacy
Flutter codebase and scaffolding the new stack, builds the design system,
the global layout, then page by page (Home first, then Services/About/Contact),
adds the second locale, layers in SEO/analytics/legal compliance, polishes for
Lighthouse 95+, and finally switches the production DNS off GitHub Pages onto
Vercel. Each phase produces a verifiable, deployable artifact — Vercel is
serving the site from Phase 1 onwards (just at a temporary `*.vercel.app` URL
until Phase 9 flips the DNS).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Setup & migration** — Wipe Flutter, scaffold Next.js, connect Vercel
- [ ] **Phase 2: Design system** — Tokens, fonts, shared primitives
- [ ] **Phase 3: Global layout** — Header, mobile overlay, footer, language switcher
- [ ] **Phase 4: Home page** — 8 narrative sections + Framer Motion animations
- [ ] **Phase 5: Secondary pages** — Services, About, Contact
- [ ] **Phase 6: i18n** — next-intl wiring, EN content authored, switcher active
- [ ] **Phase 7: SEO, analytics & legal** — Metadata, OG, sitemap, robots, GA4 + consent, legal pages
- [ ] **Phase 8: Polish & a11y audit** — Reduced-motion, contrast, keyboard nav, Lighthouse 95+
- [ ] **Phase 9: Production migration** — DNS switchover, GitHub Pages disable, monitoring

## Phase Details

### Phase 1: Setup & migration
**Goal**: Empty `main` of Flutter, scaffold a Next.js 14 + TS + Tailwind + App Router project, configure Vercel project so each push deploys automatically to a `*.vercel.app` URL.
**Depends on**: Nothing (first phase)
**Requirements**: SITE-01, MIG-01, MIG-02, MIG-03
**Success Criteria** (what must be TRUE):
  1. `main` branch contains a fresh Next.js 14 App Router scaffold (no Flutter artifacts)
  2. `npm run dev` boots a Next.js dev server on `localhost:3000`
  3. `npm run build` completes without errors
  4. Pushing to `main` triggers a successful Vercel deploy reachable via the project's `*.vercel.app` URL
  5. The repo's `docs/superpowers/specs/` design spec is preserved through the wipe
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Wipe Flutter web build from main (preserve docs/, .planning/, .git/)
- [ ] 01-02-PLAN.md — Scaffold Next.js 14 + TS strict + Tailwind, install P2-P7 deps, placeholder + README
- [ ] 01-03-PLAN.md — Connect Vercel project, push to main, smoke-test *.vercel.app deploy

### Phase 2: Design system
**Goal**: Lay down the visual foundation — Tailwind palette tokens, self-hosted fonts, and reusable shared primitives (Eyebrow, Headline, Rule, CTAs, Frame) — so all subsequent pages compose from a consistent kit.
**Depends on**: Phase 1
**Requirements**: VIS-01, VIS-02, VIS-05
**Success Criteria** (what must be TRUE):
  1. `tailwind.config.ts` exposes color tokens for `ink`, `ink-soft`, `cream`, `cream-dim`, `cream-muted`, `gold`, `gold-dim`, `oxblood`, `parchment`
  2. Type scale tokens defined per spec §6.3 (text-xs through text-5xl)
  3. Fonts IM Fell English, EB Garamond, JetBrains Mono are self-hosted in `public/fonts/` and loaded via `next/font/local`
  4. Shared components rendered in a Storybook-style preview page (or test): `<Eyebrow>`, `<Headline>`, `<Rule>`, `<CtaPrimary>`, `<CtaSecondary>`, `<Frame>`
  5. The typographic logo `TG TECH · CONSULTING` renders correctly in display serif
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Global layout
**Goal**: Build the persistent UI shell every page lives inside — desktop header, mobile full-screen overlay, footer (with legal column), language switcher, and the root `app/layout.tsx` that ties it together.
**Depends on**: Phase 2
**Requirements**: I18N-04 (switcher), CONT-01 (page shells)
**Success Criteria** (what must be TRUE):
  1. Header renders logo + nav (Services, About, Contact) + FR/EN switcher per spec §5.2
  2. Header compresses (padding shrinks + backdrop-blur) once `scrollY > 80`
  3. Mobile (< 768px) hamburger opens full-screen overlay with all nav items + email + LinkedIn
  4. Footer present on every page with three columns: Contact, Navigation, Legal
  5. Switcher persists locale choice in `NEXT_LOCALE` cookie and redirects to the same path in alternate locale
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Home page
**Goal**: Deliver the Home page in French — eight narrative sections, MDX content, Framer Motion typewriter on the hero, fade-in scroll on each section, dotted-to-solid hover underlines, ink-diffusion CTA.
**Depends on**: Phase 3
**Requirements**: CONT-01, CONT-03, CONT-04, VIS-03
**Success Criteria** (what must be TRUE):
  1. `/fr/` renders the 8 sections in order: Hero, Partners, Pillar 1 NetSuite, Pillar 2 AI, Approach, Peppol mention, Manifesto quote, Final CTA (per spec §7.1)
  2. Both client logos (Bollé, Clinisys) render in the Partners section
  3. Hero H1 animates with the typewriter effect on first load (~700ms total)
  4. Each section fades-in from below as it scrolls into 25% viewport visibility
  5. Primary CTA shows the ink-diffusion gradient on hover
  6. All copy is sourced from `content/fr/home.mdx`
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Secondary pages
**Goal**: Ship `/services`, `/about`, `/contact` in French with the same design language as Home, sourced from MDX, with internal anchors on `/services` for both pillars.
**Depends on**: Phase 4
**Requirements**: CONT-01, CONT-05
**Success Criteria** (what must be TRUE):
  1. `/fr/services` renders both pillars with anchors `#netsuite` and `#ai` per spec §7.2
  2. `/fr/about` renders Thibaut narrative + 3 numbered principles per spec §7.3
  3. `/fr/contact` renders email + LinkedIn + location blocks per spec §7.4
  4. All pages source copy from MDX in `content/fr/`
  5. Each page includes the Home-style fade-in scroll behavior
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: i18n
**Goal**: Wire `next-intl` end-to-end — subpath routing for FR/EN, Accept-Language redirect at root, EN content parity with FR, switcher fully active across all pages.
**Depends on**: Phase 5
**Requirements**: I18N-01, I18N-02, I18N-03, SITE-05, MNT-01
**Success Criteria** (what must be TRUE):
  1. `/` redirects to `/fr/` or `/en/` based on `Accept-Language` at the Edge
  2. `/en/`, `/en/services`, `/en/about`, `/en/contact` all render with English MDX content from `content/en/`
  3. Switcher in header toggles between locales and preserves the current page path
  4. UI strings (button labels, eyebrows, nav items) are sourced from `messages/fr.json` and `messages/en.json`
  5. A copy change to any `.mdx` file is reflected on the next dev reload (no code changes needed)
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

### Phase 7: SEO, analytics & legal
**Goal**: Layer in everything that converts a working site into a discoverable, compliant, measurable one — per-route metadata, OG images, sitemap, robots, JSON-LD, hreflang, GA4 + Vercel Analytics with consent banner, and the two legal pages.
**Depends on**: Phase 6
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, LEG-01, LEG-02, LEG-03, LEG-04, CONT-02
**Success Criteria** (what must be TRUE):
  1. Every page returns proper `<meta>` (title, description, OG, Twitter, canonical) via `generateMetadata()`
  2. `public/og/*.png` 1200×630 images exist for at least Home, Services, About, Contact
  3. `/sitemap.xml` lists all pages in both locales with `hreflang`
  4. `/robots.txt` allows all crawlers and links to sitemap
  5. JSON-LD `Organization` + `LocalBusiness` injected into `<head>`
  6. Cookie consent banner shows on first visit; refusing keeps GA4 silent; accepting loads GA4
  7. `/legal/privacy` and `/legal/notice` pages render in FR and EN with required sections per spec §7.5
  8. Vercel Analytics is enabled and recording (cookieless)
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

### Phase 8: Polish & a11y audit
**Goal**: Hit Lighthouse 95+ across all four axes on every page — fix contrast, keyboard navigation, focus states, reduced-motion fallbacks, image optimization, font preload, JS bundle trimming.
**Depends on**: Phase 7
**Requirements**: SITE-02, SITE-03, SITE-04, VIS-04, SEO-07, MNT-02
**Success Criteria** (what must be TRUE):
  1. Lighthouse mobile reports Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO = 100 on Home, Services, About, Contact
  2. Initial JS bundle ≤ 100kb gzipped on Home
  3. LCP < 1.5s, CLS < 0.05, TBT < 100ms on Home (mobile)
  4. With `prefers-reduced-motion: reduce`, decorative animations (parallax, cursor trail, breathing letter-spacing) are disabled, while functional ones (fade, header compress, page transitions) keep minimal versions
  5. Tab key navigates through all interactive elements with visible focus rings
  6. A `lighthouse-ci` (or equivalent) command exists and is documented in README
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

### Phase 9: Production migration
**Goal**: Cut the cord with GitHub Pages — point `tgtechconsulting.com` DNS at Vercel, disable GitHub Pages, monitor for 24h to confirm the new stack is serving production traffic with no regressions.
**Depends on**: Phase 8
**Requirements**: MIG-04, MIG-05, MIG-06, MNT-03
**Success Criteria** (what must be TRUE):
  1. Vercel project has `tgtechconsulting.com` as a verified custom domain
  2. DNS A/CNAME records at the registrar resolve `tgtechconsulting.com` to Vercel's edge
  3. `https://tgtechconsulting.com` serves the new Next.js site (verified from outside any local DNS cache)
  4. GitHub Pages is disabled in repo Settings → Pages
  5. README documents the new stack, deploy flow, content edit flow, and monitoring contacts
  6. After 24h of monitoring no Sentry/Vercel error spikes, no Lighthouse regression, traffic flowing
**Plans**: TBD

Plans:
- [ ] 09-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Setup & migration | 0/3 | Planned | - |
| 2. Design system | 0/0 | Not started | - |
| 3. Global layout | 0/0 | Not started | - |
| 4. Home page | 0/0 | Not started | - |
| 5. Secondary pages | 0/0 | Not started | - |
| 6. i18n | 0/0 | Not started | - |
| 7. SEO, analytics & legal | 0/0 | Not started | - |
| 8. Polish & a11y audit | 0/0 | Not started | - |
| 9. Production migration | 0/0 | Not started | - |

---
*Roadmap created: 2026-04-27 from design spec at `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md`*
