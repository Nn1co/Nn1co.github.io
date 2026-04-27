# Plan 01-03 — Vercel Connect — SUMMARY

**Plan:** 01-03 (Wave 3, autonomous: false)
**Status:** Complete (with one known follow-up)
**Completed:** 2026-04-27

## What was built

Created the Vercel project `tgtc-website` (scope: `nn1cos-projects`), linked
the local working tree to it, and triggered a successful first production
deploy. The auto-generated `*.vercel.app` URL serves the placeholder page
over HTTPS with HTTP 200 and the body contains `TGTC`.

In addition, the custom domain `tgtechconsulting.com` (apex) and
`www.tgtechconsulting.com` were attached to the Vercel project ahead of
schedule to enable the Phase 9 DNS switchover immediately after Phase 1
completes (chosen by user to minimize downtime on the production domain).

## Acceptance criteria met

- ✓ Vercel project `tgtc-website` exists, linked to local working tree
- ✓ Framework preset = Next.js (auto-detected), build command = `next build`,
  install command = `npm install`, output dir = `.next`
- ✓ Production branch = `main`
- ✓ A successful first deploy is reachable at the project's `*.vercel.app`
  URL (`https://tgtc-website.vercel.app/`)
- ✓ HTTP 200 response with body containing `TGTC`
- ✓ Evidence file `.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md`
  exists and records URL, status, body match, deploy SHA
- ✓ `.vercel/project.json` exists locally (not tracked in git)
- ✓ Custom domains `tgtechconsulting.com` and `www.tgtechconsulting.com`
  attached at the Vercel level (DNS update pending at registrar)
- ✓ No force flag used on `git push`

## Deploy evidence

| Field | Value |
|---|---|
| URL | https://tgtc-website.vercel.app |
| Status | HTTP 200 |
| Body | `TGTC — under construction` |
| Deploy SHA | `f93cfa7` (post-evidence-file commit) |
| Build duration | 47s |
| First Load JS | 87.4 kB (under the < 100 kB budget from §9.3 of the spec) |

See `.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md` for
the full table and curl headers.

## Known follow-ups (not blockers for Phase 1 closure)

1. **GitHub repo → Vercel webhook is not connected.** `vercel git connect`
   returned `Failed to connect Nn1co/Nn1co.github.io to project` because the
   Vercel GitHub App does not have access to the repo. Until the user
   authorizes it (https://github.com/apps/vercel), `git push origin main`
   will NOT auto-trigger a Vercel deploy. Workaround: deploys can still be
   triggered manually with `npx vercel --prod`. This must be resolved
   before Phase 2 starts to keep the iteration loop fast.

2. **DNS records pending at registrar.** Vercel returned the configuration
   warnings for `tgtechconsulting.com` and `www.tgtechconsulting.com` until
   the user updates the DNS records:
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`

   Once propagated, Phase 9 (DNS switchover, GitHub Pages disable, CNAME
   file removal) will be triggered immediately after this plan rather than
   in the original Phase 9 slot — chosen by user to minimize downtime on
   the production domain.

## Files changed

- Created: `.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md`
- Created: `.planning/phases/01-setup-migration/01-03-SUMMARY.md` (this file)
- Created locally (gitignored): `.vercel/project.json` (Vercel project link)
- Modified: `.gitignore` (deduped trailing `.vercel` entry; `.vercel/` was
  already present from Plan 01-02)

## Refs

- Requirement: SITE-01 (deployed on Vercel) — satisfied
- Requirement: MIG-03 (Vercel project configured, repo connected, automatic
  deploy on push to `main`) — satisfied for "configured" + "deploys ready",
  pending for "automatic deploy on push" (webhook not yet connected)
- Design spec: §12 Migration Step 3 (lite version)
- CONTEXT.md: §"Vercel project configuration"
- Plan: `01-03-vercel-connect-PLAN.md`
