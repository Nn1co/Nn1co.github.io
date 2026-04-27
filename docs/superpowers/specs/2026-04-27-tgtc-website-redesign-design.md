---
title: TGTC Website Redesign — Design Spec
date: 2026-04-27
project: TGTC (TG Tech Consulting)
status: validated
authors:
  - Nicolas Lobo Nieuwenhuys (consultant builder)
stakeholders:
  - Thibaut Gendebien (TGTC owner)
tags:
  - website
  - redesign
  - nextjs
  - editorial-design
---

# TGTC Website Redesign — Design Spec

## 1. Context

TG Tech Consulting (TGTC) is an independent NetSuite consulting practice
operated by Thibaut Gendebien, based in the Benelux. The current website is a
Flutter Web application deployed on GitHub Pages (`Nn1co.github.io` repo)
behind the custom domain `tgtechconsulting.com`.

Key limitations of the current implementation:

- **Flutter Web is the wrong tool** for a marketing site. The bundle is
  ~3 MB (`main.dart.js` alone), Lighthouse scores are mediocre, SEO is poor
  because content is rendered into a CanvasKit surface rather than HTML.
- **Visual identity is generic** — looks like another corporate consulting
  template, doesn't differentiate Thibaut from the noise of NetSuite
  partners.
- **Content is split across 7 pages** (home, services, about, demo, contact,
  ai_netsuite, integrations), diluting the message instead of focusing it.
- **Trilingual EN/FR/NL** maintenance is heavy and the NL value is
  questionable for the target audience.

The redesign is a complete rewrite from scratch, with a new stack, new visual
direction, and a smaller content footprint focused on lead generation.

## 2. Goals

| # | Goal | Success metric |
|---|---|---|
| G1 | **Generate qualified leads** for NetSuite consulting and AI integration engagements | Inbound contacts per month after launch (baseline TBD) |
| G2 | **Distinct visual identity** that differentiates TGTC from generic NetSuite partners | Subjective: design feels mémorable, not "another Stripe clone" |
| G3 | **Strong SEO on Benelux + NetSuite + AI keywords** | Top 10 ranking on `netsuite consulting benelux`, `ai netsuite integration` within 6 months |
| G4 | **Performance & accessibility** at Lighthouse 95+ across all four axes | Confirmed via CI Lighthouse audit |
| G5 | **Maintenance-friendly** so Thibaut can edit copy without touching code | Content lives in MDX files, copy changes are PRs of `.mdx` only |

## 3. Audience

Two complementary entry profiles:

1. **Existing NetSuite users** (CFO, IT/Ops directors, controllers) hitting
   limits of stock NetSuite and looking for a partner to extend, automate,
   or integrate.
2. **Companies wanting to inject AI into their operations** (regardless of
   ERP). They may not have NetSuite yet, but they recognize that AI in
   business workflows requires expertise, not just buying GPT.

**Geo**: Benelux (Belgium primary, Luxembourg + Netherlands secondary).

**Languages**: English (default for Flanders, Netherlands, international
HQs) and French (for Wallonia, Luxembourg, French-speaking decision
makers). Dutch dropped from the new version (can be reintroduced later if
demand emerges).

## 4. Decisions Summary

| Dimension | Decision | Rationale |
|---|---|---|
| Site type | Marketing vitrine | Lead-gen, not SaaS app |
| Pages | 4 (Home, Services, About, Contact) | Minimal scope, focused message |
| Languages | EN + FR | Drop NL, reintroduce on demand |
| Default locale | Auto-detected via `Accept-Language`, fallback to FR | Audience is Benelux-leaning |
| Two pillars | NetSuite Consulting & Automation / AI Integration | Concentrates the offer narrative |
| Peppol | Mentioned discreetly on Home (S6) and as a sub-block in Services | Niche, not a pillar |
| Stack | Next.js 14 (App Router) + TypeScript + Tailwind + Vercel | Stack Nicolas knows; sufficient for marketing site needs |
| Visual direction | Editorial × Hermes (vert sapin / cream / gold + serif + monospace + animations subtiles) | Distinctive, mémorable, on-brief |
| Animations | Framer Motion (orchestration) + CSS (transitions) | Lightweight, respect `prefers-reduced-motion` |
| Content storage | MDX files in `content/<locale>/<page>.mdx` | Editable without code changes |
| i18n | `next-intl` with subpath routing (`/fr/...`, `/en/...`) | Native App Router support, SEO-friendly |
| Forms | Mailto + LinkedIn link | Zero backend, sufficient for lead-gen at this stage |
| Analytics | Vercel Analytics + Google Analytics 4 | Vercel for privacy-friendly metrics, GA4 for goals/conversions |
| Hosting | Vercel | Best DX for Next.js, free tier OK for this volume |
| Domain | `tgtechconsulting.com` (existing, DNS to be re-pointed to Vercel) | Already configured by user |
| Repo | `Nn1co.github.io` (existing, conserved) — Flutter archived in branch `legacy/flutter`, Next.js rebuilt on `main` | Avoids reconfiguring the domain registrar binding |
| Clients shown | 2 logos: Bollé + Clinisys | All currently available; case study pages are out-of-scope for v1 |
| Out-of-scope | Blog, video demos, case study pages, testimonials, contact form backend, Calendly, NL, light/dark toggle | Reduces v1 scope; can be added incrementally |

## 5. Sitemap & Navigation

### 5.1 Site map

```
tgtechconsulting.com/
│
├── /                    Redirects to /fr/ or /en/ based on Accept-Language
│
├── /[locale]/
│   ├── /                Home (long-form, 8 narrative sections)
│   ├── /services        Services (2 pillars detailed, internal anchors)
│   ├── /about           About (Thibaut narrative, principles)
│   ├── /contact         Contact (mailto, LinkedIn, location)
│   └── /legal/
│       ├── /privacy     Privacy policy (GDPR-required, given GA4 usage)
│       └── /notice      Mentions légales / Legal notice (BE business required)
│
├── /sitemap.xml         Generated by app/sitemap.ts
├── /robots.txt          Static, allows all, points to sitemap
└── /[favicon, og, …]    Static assets
```

**Note on the four "main" pages**: Home, Services, About, and Contact are
the four navigational pages exposed in the header. The two `/legal/*`
pages are required for legal compliance (GDPR + Belgian business law due
to GA4 usage and as a registered consulting practice). They are linked
only from the footer, not from the main nav, and their content is short
boilerplate.

### 5.2 Header navigation (desktop)

Layout: `[Logo (left)]   [Services]   [About]   [Contact]   [FR / EN switcher (right)]`

- **Logo**: typographic only — `TG TECH · CONSULTING` in display serif
  (no separate icon mark for v1)
- **Nav links**: monospace, all-caps, letter-spaced, dotted-underline on hover
- **Language switcher**: pill toggle `FR · EN`, persists via `NEXT_LOCALE`
  cookie, redirects to same path in alternate locale
- **Scroll behavior**: header compresses after 80px scroll (padding shrinks,
  semi-transparent background with subtle backdrop-blur)

### 5.3 Header navigation (mobile, < 768px)

- Logo on left, hamburger icon on right
- Tap → full-screen overlay with all nav items + email + LinkedIn link
- Animation: fade + slide from right, 250ms

### 5.4 Footer

Present on all pages. Layout (desktop):

```
TG TECH · CONSULTING
Conseil NetSuite et automatisation IA · Benelux
─────
CONTACT                        NAVIGATION                LEGAL
thibaut.gendebien@…            Services                  Privacy
LinkedIn ↗                     About                     Notice
                               Contact
─────
© TG TECH CONSULTING · BENELUX
```

The "LEGAL" column links to `/legal/privacy` and `/legal/notice`. These are
the only entry points to the legal pages (no main-nav exposure).
The footer copyright line is intentionally year-less (no founding date, no
current-year dynamic value) — keeps the footer timeless and avoids
maintenance.

## 6. Visual System

### 6.1 Palette

```
Backgrounds
  ink              #0E1410   primary (dark forest green, near-black)
  ink-soft         #142019   elevated cards, sections
  parchment        #F4EDE1   reserved for any future light variant

Text
  cream            #E8E2CF   primary on ink
  cream-dim        rgba(232,226,207,0.72)
  cream-muted      rgba(232,226,207,0.45)

Accents
  gold             #D4A55F   eyebrows, primary CTA fill, italic emphasis
  gold-dim         #A8814A
  oxblood          #B73A2C   sparingly, for critical/italic emphasis

Lines / dividers
  rule-soft        rgba(232,226,207,0.12)
  rule-dotted      1px dotted rgba(232,226,207,0.25)
```

### 6.2 Typography

```
Display     IM Fell English          (Google Fonts, OFL)
            H1, hero, large quotes
            Fallback: Iowan Old Style, Palatino, Georgia, serif

Body        EB Garamond              (Google Fonts, OFL)
            Paragraphs, descriptions, narrative
            Fallback: Iowan Old Style, Georgia, serif

Mono        JetBrains Mono           (Google Fonts, OFL)
            Eyebrows, KPIs, metadata, code, navigation
            Fallback: ui-monospace, SF Mono, Menlo, monospace
```

Fonts are self-hosted in `public/fonts/` to avoid runtime Google Fonts
dependency and FOUT.

### 6.3 Type scale

Base = 16px. Scale = modular 1.25.

| Token | px | line-height | Usage |
|---|---|---|---|
| `text-xs` | 11 | 1.5 | mono uppercase eyebrows |
| `text-sm` | 13 | 1.6 | captions, nav, metadata |
| `text-base` | 16 | 1.65 | body, lede, long paragraphs |
| `text-lg` | 19 | 1.55 | sub-titles |
| `text-xl` | 24 | 1.4 | secondary section titles |
| `text-2xl` | 32 | 1.25 | hero section titles |
| `text-3xl` | 44 | 1.1 | secondary page H1 |
| `text-4xl` | 64 | 1.05 | Home hero H1 |
| `text-5xl` | 88 | 1.0 | XXL display (About page H1) |

### 6.4 Spacing & rhythm

- Tailwind default 4px base; prefer multiples of 8 and 12 for layout.
- Section vertical padding: `py-24` (96px) desktop, `py-16` (64px) mobile.
- Content max width: `max-w-6xl` (1152px), internal gutters 24-48px.

### 6.5 Borders & containers

- No `border-radius > 4px` except CTA pills (full radius).
- Visual hierarchy via **nested thin frames** (Hermes-style), not shadows.
- Optional inset glow on cards: `inset 0 0 30px rgba(212,165,95,0.04)`.
- No Material-style shadows.

## 7. Page Designs

### 7.1 Home — narrative long-form (8 sections)

| # | Section | Content focus | Key elements |
|---|---|---|---|
| S1 | Hero | First impression + positioning | Eyebrow `№ 01 · Practice · Benelux`, H1 "NetSuite, réellement *habitable*" with italic gold on key word, lede 2 lines, primary + secondary CTA, side card "Index · ce que l'on couvre" with 5 roman-numbered items |
| S2 | Partners | Credibility | Eyebrow `№ 02 · Practice partners`, 2 monochrome client logos (Bollé, Clinisys) separated by dotted rule, single-line caption per logo |
| S3 | Pillar 1 — NetSuite Consulting & Automation | Service offer | Eyebrow `№ 03`, H2 "Faire de NetSuite une plateforme opérationnelle", 3-column sub-blocks (Audit & architecture / Custom dev SuiteScript / Workflow automation), CTA → `/services#netsuite` |
| S4 | Pillar 2 — AI Integration | Service offer | Eyebrow `№ 04`, H2 "Étendre l'ERP avec de l'intelligence", 3-column sub-blocks (Copilotes métier / Workflow IA / Decision support), CTA → `/services#ai` |
| S5 | Approach | How we work | Eyebrow `№ 05 · Approach`, H2 "Comment on travaille", 3 columns numbered I, II, III: Discovery / Build / Operate |
| S6 | Peppol mention | Adjacent capability | Eyebrow `№ 06 · Adjacent capability`, single short paragraph, no CTA, ends with rule |
| S7 | Manifesto quote | Personality | Full-width on `ink-soft`, large italic serif quote, signature `— TG TECH CONSULTING` |
| S8 | Final CTA | Conversion | Eyebrow `№ 08 · Engage`, H2 "Parlons de votre NetSuite", lede with "1h offered discussion", mailto + LinkedIn buttons |

### 7.2 Services — 2 pillars detailed

```
Hero (eyebrow + H1 "Deux pratiques, une rigueur" + quick anchors)

Section #netsuite
  Eyebrow + H2
  4 sub-blocks (2x2 grid):
    1. Audit & architecture
    2. Custom dev SuiteScript
    3. Workflow automation
    4. Peppol e-invoicing

Section #ai
  Eyebrow + H2
  3-4 sub-blocks (Copilotes / Workflow IA / Search / Decision support)

CTA section
  "Une question sur un service précis ?" + mailto + LinkedIn

Footer
```

### 7.3 About — short editorial

```
Hero (XL H1 "Thibaut Gendebien.", short lede)

Pourquoi TGTC
  2-3 narrative paragraphs in editorial body type

Principes (3 columns numbered I, II, III)
  I.  Profondeur ERP
  II. Délivrer ce qui est utilisé
  III. Communication directe

CTA
  "Discutons" + mailto + LinkedIn

Footer
```

### 7.4 Contact — minimal & centered

```
Hero (eyebrow + H1 "Écrire.")

Three blocks, each separated by a thin rule:
  Email           thibaut.gendebien@tgtechconsulting.com (mailto)
  LinkedIn        linkedin.com/in/thibaut-gendebien-7b777297 (external)
  Localisation    Benelux · réponse sous 48h

Closing line: "Préfères un appel ? Mentionne-le par mail et on cale 30 min."

Footer
```

### 7.5 Legal pages — boilerplate

Both legal pages share the same minimal layout: a small page hero, body
content rendered from MDX, and the footer. They use the same design
language as main pages (palette, typography, spacing) but are not
animated and carry no CTAs.

#### `/legal/privacy`
- Eyebrow `Legal · Privacy policy`
- H1 `Privacy policy` / `Politique de confidentialité`
- MDX body covering: data controller identity, data collected (GA4
  pageviews after consent, technical logs), purposes, lawful basis
  (consent for GA4, legitimate interest for Vercel Analytics), retention
  periods, third-party processors (Vercel, Google), user rights (access,
  rectification, deletion, portability, complaint to DPA), contact for
  data requests
- Last-updated timestamp at the bottom

#### `/legal/notice` (Mentions légales)
- Eyebrow `Legal · Notice`
- H1 `Mentions légales` / `Legal notice`
- MDX body covering: registered company name, address, BCE/CBE number,
  VAT number, hosting provider (Vercel), publication director (Thibaut
  Gendebien), contact email
- Required under Belgian commercial law for any professional activity
  with an online presence

The exact legal copy will be drafted during P7 (SEO + analytics + legal
phase). Thibaut provides the company registration details; the AI
drafts the boilerplate, and a quick review by the user before publish.

## 8. Animations & Micro-interactions

| # | Name | Trigger | Implementation | Reduced-motion fallback |
|---|---|---|---|---|
| 1 | Typewriter on H1 hero | Page load (Home only) | Framer Motion stagger, ~25ms/char, total ~700ms. No blinking cursor. | Instant render, no animation |
| 2 | Fade-in + slide-up on scroll | All sections | IntersectionObserver, opacity 0→1 + translateY 20→0, 600ms ease-out, trigger at 25% visible | Opacity-only fade, no translate |
| 3 | Underline dotted → solid on hover | Nav links, body links | CSS border-bottom transition 200ms | Same (functional) |
| 4 | Ink diffusion on primary CTA hover | Hover on gold filled button | Animated background-position gradient, 400ms ease-in-out | Color change only |
| 5 | Light parallax | Decorative frames, eyebrows | CSS `--scroll` custom property * 0.3 | Disabled |
| 6 | Card border on hover | Service sub-blocks | border-color transition rule-soft → gold, 250ms | Same |
| 7 | Cursor trail (optional, gimmicky) | Hero mouse move | Custom JS, light feather following cursor | Disabled |
| 8 | Header compression on scroll | Scroll > 80px | Padding + backdrop-blur transition 200ms | Same (functional) |
| 9 | Page transitions | Route change | Framer Motion 200ms fade | Same (already minimal) |
| 10 | Breathing letter-spacing on quote (optional) | Section S7 visible | CSS animation 4s loop, 0.001em ↔ 0.003em | Disabled |

**Library choices**:
- **Framer Motion** for orchestration (1, 2, 6, 9)
- **CSS-only** for transitions (3, 4, 5, 8)
- **Vanilla JS** minimal for optional decorative effects (7, 10)
- **Global respect** for `@media (prefers-reduced-motion: reduce)`

## 9. Technical Architecture

### 9.1 Repository structure (target)

```
Nn1co.github.io/                   (existing repo, will be wiped on main)
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── legal/
│   │       ├── privacy/page.tsx
│   │       └── notice/page.tsx
│   ├── api/                       (empty for v1)
│   ├── globals.css
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx                 (root, redirects / → /[locale])
├── components/
│   ├── nav/
│   │   ├── header.tsx
│   │   ├── mobile-overlay.tsx
│   │   └── language-switcher.tsx
│   ├── footer.tsx
│   ├── home/
│   │   ├── hero.tsx
│   │   ├── partners.tsx
│   │   ├── pillar-netsuite.tsx
│   │   ├── pillar-ai.tsx
│   │   ├── approach.tsx
│   │   ├── peppol-mention.tsx
│   │   ├── manifesto-quote.tsx
│   │   └── final-cta.tsx
│   ├── services/
│   │   ├── pillar-section.tsx
│   │   └── sub-block.tsx
│   ├── about/
│   │   ├── principles.tsx
│   │   └── narrative.tsx
│   ├── shared/
│   │   ├── eyebrow.tsx
│   │   ├── headline.tsx
│   │   ├── rule.tsx
│   │   ├── cta-primary.tsx
│   │   ├── cta-secondary.tsx
│   │   └── frame.tsx
│   └── motion/
│       ├── reveal.tsx
│       ├── typewriter.tsx
│       └── ink-button.tsx
├── content/
│   ├── fr/
│   │   ├── home.mdx
│   │   ├── services.mdx
│   │   ├── about.mdx
│   │   └── contact.mdx
│   └── en/
│       └── (mirror of fr)
├── lib/
│   ├── i18n.ts
│   ├── seo.ts
│   └── analytics.ts
├── messages/
│   ├── fr.json
│   └── en.json
├── public/
│   ├── fonts/                     (self-hosted IM Fell, EB Garamond, JetBrains Mono)
│   ├── logos/
│   │   ├── bolle.svg
│   │   └── clinisys.svg
│   ├── og/
│   │   ├── default.png            (1200×630)
│   │   └── home.png
│   ├── favicon.ico
│   ├── icon.png
│   ├── apple-icon.png
│   └── robots.txt
├── docs/
│   └── superpowers/specs/
│       └── 2026-04-27-tgtc-website-redesign-design.md   (this file)
├── tailwind.config.ts
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### 9.2 Key implementation choices

- **Content as MDX**: each page reads its `content/<locale>/<page>.mdx`,
  rendered with `@next/mdx`. Thibaut can edit copy by submitting PRs of
  `.mdx` files only.
- **Internationalization**: `next-intl` with `[locale]` segment. Subpath
  routing `/fr/...` and `/en/...`. Root `/` performs an `Accept-Language`
  redirect at the Edge. Switcher persists via `NEXT_LOCALE` cookie.
- **No state management library**: site is fully static.
- **No backend**: no API routes, no DB, no tRPC, no Prisma.
- **Animations**: `framer-motion` only where strictly needed; CSS otherwise.
- **Analytics**: `@vercel/analytics/react` for Vercel Analytics, plus
  `next/third-parties/google` for GA4 (with explicit consent banner — see
  §11 GDPR).
- **Static export**: not used — keep Vercel Edge for `Accept-Language`
  redirect at root.

### 9.3 Performance budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP (mobile) | < 1.5s |
| TBT | < 100ms |
| CLS | < 0.05 |
| Initial JS bundle (gzipped) | < 100kb |
| Home page total weight | < 500kb |

## 10. SEO

- **Per-route metadata** via Next.js `generateMetadata()` in each page
- **OG images**: 1200×630, one per main page, design consistent with site
  typography and palette (generated as static PNGs in `public/og/`)
- **JSON-LD schema**: `Organization` + `LocalBusiness` (address Benelux)
  injected in `<head>` via shared component
- **`sitemap.xml`**: auto-generated by `app/sitemap.ts` (Next.js native)
- **`robots.txt`**: static, allows all crawlers, points to sitemap
- **Canonical URLs**: explicit `canonical` in metadata for each page
- **`hreflang` tags**: `<link rel="alternate" hreflang="fr|en|x-default" />`
  for FR/EN parity
- **Target keyword themes** (organically integrated, not stuffed):
  - `netsuite consulting benelux`, `netsuite consultant belgique`
  - `ai netsuite integration`, `ai erp automation`
  - `netsuite peppol`, `peppol e-invoicing belgium`
  - `netsuite suitescript developer`

## 11. GDPR & analytics consent

- **Vercel Analytics**: cookieless, no consent banner needed
- **Google Analytics 4**: requires consent banner per EU GDPR / Belgian
  data protection rules
  - Implement a minimal consent banner (accept / refuse, no dark patterns)
  - GA4 only loads after explicit user consent
  - Consent stored in `NEXT_TGTC_CONSENT` cookie (1-year expiry)
  - Default to **refused** until user accepts
- **Required legal pages** (see §5.1 site map and §7.5 legal pages):
  - `/legal/privacy` — privacy policy describing data collection, GA4
    behavior, third-party processors, user rights, controller contact
  - `/legal/notice` — Belgian "mentions légales" with company
    registration, VAT, hosting provider, publication director
- **Footer links**: both legal pages must be reachable from every page's
  footer, plus a dedicated link from the consent banner ("Read our
  privacy policy")
- **Cookie list disclosure** in `/legal/privacy` for transparency: the
  banner cookie itself, plus GA4 cookies (`_ga`, `_ga_*`) when consent
  is granted

## 12. Migration plan (high level)

The user (Nicolas) has confirmed an external backup of the current Flutter
build exists outside the repo. No archival branch is needed; we wipe the
working tree directly on `main`.

```
Step 1 — Wipe main for Next.js scaffold
  git checkout main
  rm -rf <everything except .git/, .gitignore, docs/>
  npx create-next-app@latest . --typescript --tailwind --app
  git add -A && git commit -m "chore: scaffold Next.js, drop Flutter web build"

Step 2 — Build the new site (covered by /gsd-plan-phase phases)

Step 3 — Production switch
  - Vercel: import the Nn1co.github.io repo
  - Vercel: add custom domain tgtechconsulting.com
  - Domain registrar: update DNS A/CNAME to Vercel
  - GitHub: Settings → Pages → disable
  - Monitor DNS propagation (~1h, up to 24h)
```

The Flutter source repo (`tgtc/`) at `~/Documents/proj Thib/TGTC web/tgtc/`
is a **separate repository** and is not touched by this migration. It
remains intact for archival.

## 13. Out of scope (v1)

The following are explicitly deferred to a future phase:

- Blog / `/insights` section (no content yet, structure not built)
- Video demos (current `returns-assistant.mov` and `tgtc-demo.mov` dropped)
- Per-client case study pages (`/work/bolle`, `/work/clinisys`)
- Written client testimonials
- Contact form with backend (Resend / Vercel Forms / Formspree)
- Calendly integration
- Dutch (NL) locale
- Light/dark theme toggle (v1 is dark-only)

## 14. Implementation phases (proposed)

These will be refined into atomic tasks via `/gsd-plan-phase`.

| Phase | Scope |
|---|---|
| P1 — Setup & migration | Wipe Flutter build from `main`, scaffold Next.js, install deps, configure Vercel project |
| P2 — Design system | Tailwind tokens, self-hosted fonts, shared primitives (eyebrow, headline, rule, CTAs, frame) |
| P3 — Global layout | Header, mobile overlay, footer, language switcher, root layout |
| P4 — Home page | 8 narrative sections, MDX content (FR), Framer Motion on hero |
| P5 — Secondary pages | Services, About, Contact (FR) |
| P6 — i18n | `next-intl` wired, EN content authored, switcher active |
| P7 — SEO, analytics & legal | Metadata, OG images, sitemap, robots, GA4 + Vercel Analytics + consent banner, `/legal/privacy` and `/legal/notice` pages |
| P8 — Polish & a11y audit | Reduced-motion, contrast, keyboard nav, Lighthouse 95+ |
| P9 — Production migration | DNS switchover, GitHub Pages disable, 24h monitoring |

## 15. Open questions / things to revisit

- **Belgian company registration details** (BCE/CBE number, VAT, registered
  address) — required to complete `/legal/notice`. Resolved in P7 when
  Thibaut provides the data.
- Whether the **cursor trail** animation (#7) and **breathing letter-spacing**
  (#10) survive design polish phase — both are flagged as gimmicky and may
  be cut.
- Whether the **manifesto quote** content gets written by Thibaut himself or
  drafted and validated.
- Whether to **redraw the logo** as a typographic mark (this spec assumes
  type-only logo; a future iteration may add a custom mark).
- Final OG image artwork direction — to be designed during P7.
