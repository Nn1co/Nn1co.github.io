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
- Order workflow landing page: `/en/netsuite-order-workflow` and
  `/fr/netsuite-order-workflow`. The same slug preserves the existing locale
  routing and language switcher. It embeds the verified 65-second synthetic
  workflow montage, with French/English captions and a text transcript.
  The interface shown is French; the demonstration creates no real order and
  does not connect to NetSuite. Public assets are in `public/proof/demo/` and
  `public/proof/video/`; open their explicit `index.html` paths. The interactive
  demo stores a draft only in the visitor’s browser.
- Service anchors: `#netsuite`, `#replacements`, `#ai`.
- Contact validates a short brief and prepares an email draft or copies the
  message. The visitor reviews and sends it in their own email application;
  the website does not submit, store or send the message.

The visual palette uses white, navy and cobalt. The homepage leads with services,
each supported by a small project example. Project pages explain the starting
point, the application and what TGTC could build for the visitor’s team.
The SVG illustrations contain no client data. AI services distinguish agents
connected across business tools from assistants embedded in custom applications.
Content remains visible without JavaScript. Motion is limited to interaction states,
with `prefers-reduced-motion` support. The previous decorative components were
removed. Older design documents describe superseded versions.

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
