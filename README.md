# TGTC — TG Tech Consulting

Bilingual website for TG Tech Consulting: custom NetSuite applications, connected
AI assistants, ERP consulting and integrations.

## Development

Next.js 14 (App Router), React 18, TypeScript and next-intl. Existing npm dependencies
and lockfile are retained. CSS handles layout and motion; no animation library is
loaded by the redesigned pages.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build # includes lint and TypeScript checks
npm run start # serve the production build
npm run lint
```

The bundled Geist fonts are served locally. Builds do not download Google Fonts.

## Editing

- Copy: `messages/fr.json` and `messages/en.json`; keep their structures in sync.
- Theme and responsive layouts: `src/app/globals.css`.
- Routes: `src/app/[locale]`; French and English variants of home, services,
  contact and project details. Former About URLs redirect to the homepage.
- Project routes: `/work/quick-so`, `/work/prp-v2`, `/work/supply-chain-workbench`,
  `/work/quoting-assistants`.
- Demo workshop: `/en/demos` and `/fr/demos`, with three working applications
  embedded from `public/demos/`: order portal, stock workbench and quote configurator.
  The heading identifies NetSuite as the business context; the introduction and
  adjacent note distinguish fictional demonstrations from connected account software.
  Each tab loads on first use and stays mounted to preserve unfinished work.
  `?embed=1` removes redundant navigation through the scoped shared embed styles;
  standalone routes keep their complete layout. Full-screen links open those routes.
  Each accepts `?lang=fr` or `?lang=en` and uses fictional data stored locally in
  the visitor’s browser. The order portal supports carts, drafts and templates;
  the stock workbench supports demand/supply scenarios and filtered CSV exports;
  the configurator supports independent variants, comparisons, guided actions
  and saved quote exports. These demos do not connect to a business account or AI API.
  Their NetSuite branding is plain text, without a link or keyboard stop.
  The legacy hashes `order`, `stock`, `quote` and `assistant` open the matching
  application in the current language; `assistant` also opens its guided panel.
- Work index: `/en/work` and `/fr/work`, an image-led gallery of three documented
  projects. Captures in `public/work-previews/*-netsuite.jpg` show similar public demonstrations
  with fictional data, never client screens. A shared native dialog reuses one
  interactive instance per application. Project pages offer inline demonstrations
  and expandable background details. The AI offer remains linked from services.
- The former order-workflow route remains a short specialist page; no slow video
  is used as the main presentation. Earlier public demo/video files remain direct
  links for compatibility, outside the main navigation.
- Service anchors: `#netsuite`, `#replacements`, `#ai`.
- Contact validates a short brief and prepares an email draft or copies the
  message. The visitor reviews and sends it in their own email application;
  the website does not submit, store or send the message.

The visual palette, typography, spacing and alternating service/illustration rows
retain the approved Easier NetSuite design. The homepage keeps the original hero
and three service rows, with a short practical AI paragraph in the existing AI row.
Navigation separates Services, Demos, Work and Contact. The workshop and case
gallery use their own CSS modules and do not repeat the homepage service rows.
AI copy distinguishes connected agents from in-app assistants. Illustrations contain
no client data. Content remains visible without JavaScript; interactive examples
require JavaScript. Reduced-motion preferences are respected.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin; defaults to `https://tgtechconsulting.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics ID; loaded after consent |

Vercel Analytics is retained. The consent banner appears only when Google Analytics
is configured and the visitor has not chosen a preference.

The legal entity, registered address, company/VAT numbers and retention periods
remain to be confirmed. Unverified experience figures and response-time promises
are omitted.

The sitemap omits modification dates until reliable per-page editorial dates are
maintained. Canonicals and language alternates use the configured public origin.

## Hosting

The repository retains its existing Vercel setup. Pushing to `main` may trigger a
deployment. Local development and production builds do not publish the site.
