---
title: Claude Design — Brief mockups TGTC
date: 2026-05-04
project: TGTC (TG Tech Consulting)
purpose: Brief copy-paste pour claude.ai (Claude Design) — génère les mockups visuels avant l'implémentation Phase 2
---

# Claude Design — Brief mockups TGTC

> Ce dossier reçoit les mockups exportés depuis **claude.ai → Claude Design** (research preview, lancé 2026-04-17, Powered by Claude Opus 4.7, Pro/Max plan).
> Le brief de la section **§ Brief à coller** ci-dessous est self-contained — Claude Design n'a pas accès à ton repo, il a besoin de tout le contexte dans le prompt.

## Comment l'utiliser

1. Ouvre [claude.ai](https://claude.ai) avec ton plan Pro/Max/Team
2. Active **Claude Design** (sélecteur d'outil ou menu artifact)
3. Copie tout le contenu de **§ Brief à coller** plus bas (de `# TGTC Website — Visual Mockups Brief` jusqu'à la fin)
4. Itère mockup par mockup. Demande des variations sur le hero (S1) avant de passer au reste.
5. Exporte chaque mockup en PNG haute résolution (≥ 1440px de large)
6. Range les fichiers dans ce dossier en suivant la **§ Naming convention**

## Naming convention

```
docs/design/mockups/
├── home-s1-hero-va.png         # Hero variation A — side card Index à droite
├── home-s1-hero-vb.png         # Hero variation B — pleine largeur
├── home-s1-hero-vc.png         # Hero variation C — Index full width sous H1
├── home-s3-pillar-netsuite.png # Section S3, 3-column sub-blocks
├── home-s7-manifesto.png       # Section S7, full-width quote sur ink-soft
├── services-netsuite.png       # Page Services, section #netsuite, 4 sub-blocks 2x2
├── about-hero.png              # About hero XL — H1 "Thibaut Gendebien." en text-5xl
├── logo-lockup-v1.png          # Logo TG TECH · CONSULTING — variation typo 1
├── logo-lockup-v2.png          # Variation 2
└── logo-lockup-v3.png          # Variation 3
```

## Une fois les mockups validés

→ Référence-les depuis le `PLAN.md` de Phase 2 (`/gsd-plan-phase` Phase 2 — Design system).
→ Les agents GSD `write-plan` et `execute-phase` consommeront ces visuels comme target visuel pendant l'implémentation Tailwind + primitives.

---

# § Brief à coller (dans Claude Design sur claude.ai)

```
# TGTC Website — Visual Mockups Brief

## Project context

You are designing visual mockups for **TGTC (TG Tech Consulting)**, the website of an independent NetSuite + AI integration consulting practice based in the Benelux. Owner: Thibaut Gendebien.

Stack target: Next.js 14 (App Router) + Tailwind v3 + Framer Motion. Deployment: Vercel. The mockups will guide implementation, but I do NOT need code from you — I need static visual designs (PNG export) that I will then implement separately.

The visual brief is **editorial × Hermès**: distinctive, mémorable, NOT another SaaS/Stripe/consulting clone. Think editorial publication meets luxury house meets developer-tooling rigor.

## Visual system (strict — do not deviate)

### Palette

```
Backgrounds
  ink              #0E1410   primary background (dark forest green, near-black)
  ink-soft         #142019   elevated cards, sections (S7 manifesto)
  parchment        #F4EDE1   reserved for any future light variant — NOT used in v1

Text
  cream            #E8E2CF   primary text on ink
  cream-dim        rgba(232,226,207,0.72)
  cream-muted      rgba(232,226,207,0.45)

Accents
  gold             #D4A55F   eyebrows, primary CTA fill, italic emphasis
  gold-dim         #A8814A
  oxblood          #B73A2C   sparingly, only critical italic emphasis

Lines / dividers
  rule-soft        rgba(232,226,207,0.12)
  rule-dotted      1px dotted rgba(232,226,207,0.25)
```

**The site is dark-only in v1**. No light mode toggle. All mockups should be on `ink` background.

### Typography

```
Display     IM Fell English          serif, slightly archaic, mémorable
            Used for: H1, hero, large quotes
            Italic variant used for emphasis on key word in H1

Body        EB Garamond              classic editorial serif
            Used for: paragraphs, ledes, narrative

Mono        JetBrains Mono           uppercase, letter-spaced
            Used for: eyebrows, KPIs, metadata, navigation, section numbering
```

### Type scale (modular 1.25, base 16px)

```
text-xs   11px  1.5    mono uppercase eyebrows
text-sm   13px  1.6    captions, nav, metadata
text-base 16px  1.65   body, lede
text-lg   19px  1.55   sub-titles
text-xl   24px  1.4    secondary section titles
text-2xl  32px  1.25   hero section titles
text-3xl  44px  1.1    secondary page H1
text-4xl  64px  1.05   Home hero H1
text-5xl  88px  1.0    XXL display (About page H1)
```

### Borders & containers

- No `border-radius > 4px` except CTA pills (full radius)
- Visual hierarchy via **nested thin frames** (Hermès-style), NOT shadows
- Optional inset glow on cards: `inset 0 0 30px rgba(212,165,95,0.04)`
- NO Material-style drop shadows

### Eyebrow convention

Every section has a mono uppercase eyebrow numbered: `№ 01 · Practice · Benelux`, `№ 02 · Practice partners`, `№ 03`, etc. The `№` symbol is essential — it sets the editorial tone.

## Mockups to generate

Generate the following 8 mockups, in this order. After each one, ask if I want variations before moving on.

### 1. Home — Hero (S1) — Variation A: side card Index

- Eyebrow (top-left): `№ 01 · Practice · Benelux`
- H1 (display serif, text-4xl ~64px): `NetSuite, réellement *habitable*` — the word `habitable` in italic + gold color
- Lede (body serif, 2 lines, cream-dim): short tagline about NetSuite consulting & AI integration in the Benelux
- Two CTAs side-by-side: primary (gold filled pill) "Parlons" + secondary (text + dotted underline) "Découvrir l'approche"
- Right column: a thin-bordered frame card titled `INDEX · CE QUE L'ON COUVRE` with 5 roman-numbered items: `I. NetSuite consulting`, `II. AI integration`, `III. Custom dev`, `IV. Workflow automation`, `V. Peppol e-invoicing`
- Background: `ink`, subtle decorative thin gold rule somewhere

### 2. Home — Hero (S1) — Variation B: full-width H1

Same content as A, but H1 dominates full container width, the Index card moves below the H1 as a horizontal strip of 5 items separated by dotted rules.

### 3. Home — Hero (S1) — Variation C: editorial folio

Layout reminiscent of a magazine cover: H1 huge centered, eyebrow top, lede just below H1, Index runs as a footer strip at the bottom of the hero viewport with a thin top rule.

### 4. Home — Pillar 1 NetSuite (S3)

- Eyebrow: `№ 03 · NetSuite Consulting & Automation`
- H2 (display serif, text-2xl ~32px): `Faire de NetSuite une plateforme opérationnelle`
- Below: 3-column grid (equal widths), each column is a thin-bordered frame containing:
  - Mono uppercase mini-title: `I. AUDIT & ARCHITECTURE` / `II. CUSTOM DEV SUITESCRIPT` / `III. WORKFLOW AUTOMATION`
  - Body paragraph (3-4 lines, cream-dim)
  - Bottom: small `→` link in gold, "En savoir plus"
- Bottom of section: a single text CTA "Voir la pratique NetSuite →" in gold

### 5. Home — Manifesto Quote (S7)

- Background: `ink-soft` (the elevated variant)
- Full-width section
- Centered: an italic display-serif quote (text-3xl ~44px) on 2-3 lines, cream color. Example placeholder: `"Un ERP doit être un outil de pensée, pas un système d'enregistrement."`
- Below the quote, mono uppercase signature: `— TG TECH CONSULTING`
- Generous vertical padding (py-32 minimum). No CTA.

### 6. Services page — Section #netsuite

- Eyebrow: `№ 01 · NetSuite Consulting & Automation`
- H2 (display serif, text-3xl): `Faire de NetSuite une plateforme opérationnelle`
- Below: a 2x2 grid of 4 sub-blocks (thin frames):
  1. `Audit & architecture`
  2. `Custom dev SuiteScript`
  3. `Workflow automation`
  4. `Peppol e-invoicing`
- Each sub-block: mono uppercase mini-title, body paragraph (4-5 lines), no per-block CTA
- Section bottom: shared CTA "Une question sur la pratique NetSuite ?" + mailto link

### 7. About page — Hero XL

- Eyebrow: `№ 01 · About`
- H1 in display serif at **text-5xl (~88px)**, cream: `Thibaut Gendebien.` (with the period — important)
- Below H1, a single body paragraph (lede) in EB Garamond, 2-3 lines, cream-dim
- Generous whitespace. The H1 should feel monumental but restrained.
- No image of Thibaut in this v1 — type-only.

### 8. Logo lockup — 3 variations

The logo is **typographic only** (no separate icon mark). The base wordmark is:

```
TG TECH · CONSULTING
```

Generate 3 variations exploring:

- **v1**: All in display serif (IM Fell English), tight tracking, the `·` central separator slightly raised
- **v2**: `TG TECH` in display serif + `CONSULTING` in mono uppercase letter-spaced, separated by a vertical rule instead of `·`
- **v3**: Stacked layout — `TG TECH` on first line in display serif, `CONSULTING` on second line in mono uppercase, smaller, cream-dim color

All 3 variations on `ink` background, each at the size they would appear in the site header (~24-32px tall).

## Format & deliverables

For each mockup:
- **Aspect ratio**: 16:9 desktop viewport (1440 × 810 minimum) for full sections, except logo lockups which can be tighter
- **Format**: PNG, sharp at 1440px+ width
- **No annotations or labels** — clean designs only
- **No placeholder Lorem Ipsum** — use the French copy provided in each spec, or invent short on-brief French copy if needed

## Tone & feel reminders

- **Editorial publication** > tech startup
- **Restraint** > spectacle
- **Typography is the design** — color is accent, not subject
- **Hermès-inspired thin frames** > Material shadows
- **Cream + gold + ink** is the only palette — no other colors except oxblood used sparingly
- Sites to *avoid* looking like: Stripe, Linear, Vercel, generic SaaS landing pages, generic NetSuite partner sites
- Sites to *take inspiration from*: editorial broadsheets, luxury house lookbooks, well-typeset books
```

---

## Statut

- Brief créé : 2026-05-04
- Mockups en attente d'export depuis claude.ai
- Prochaine étape une fois les mockups en main : `/gsd-plan-phase 2` (Design system) en référençant les mockups
