# TGTC — TG Tech Consulting

Bilingual website for TG Tech Consulting: NetSuite consulting, integrations,
AI automation and Microsoft Copilot Studio services delivered remotely.

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

Google Fonts are downloaded during the build and served locally by Next.js.

## Editing

- Copy: `messages/fr.json` and `messages/en.json`; keep their structures in sync.
- Theme and responsive layouts: `src/app/globals.css`.
- Routes: `src/app/[locale]`; French and English variants of home, services,
  about, contact and privacy.
- Service anchors: `#netsuite`, `#ai`, `#copilot`.
- Contact opens the visitor's email client or LinkedIn; there is no server form.

The visual palette uses cool white, navy and cobalt. Content remains visible
without JavaScript. Motion is limited to a short entrance and interaction states,
with `prefers-reduced-motion` support. The previous decorative components were
removed. Older design documents describe the superseded version.

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

## Hosting

The repository retains its existing Vercel setup. Pushing to `main` may trigger a
deployment. Local development and production builds do not publish the site.
