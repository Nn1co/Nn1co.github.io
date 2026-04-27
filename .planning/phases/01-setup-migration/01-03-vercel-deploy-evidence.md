# Plan 01-03 — Vercel Deploy Evidence

**Captured:** 2026-04-27T13:27:44Z

## Deploy

| Field | Value |
|---|---|
| Vercel project | tgtc-website (scope: nn1cos-projects) |
| URL | https://tgtc-website.vercel.app |
| Deploy-specific URL | https://tgtc-website-96e6zkkf4-nn1cos-projects.vercel.app |
| HTTP status | 200 |
| Body match | TGTC — under construction |
| Commit SHA on origin/main | f2fd0c95bc4b8001c9daf3b40e881356b03e851d |
| Production branch | main |
| Custom domain attached | NO (Phase 9 will attach tgtechconsulting.com) |
| First deploy method | CLI (`npx vercel --prod`) |
| Build duration | 47s |
| Vercel deployment id | dpl_BvxjD6PSswoqVXTjkiA91yht6Bee |

## Verification

```
$ curl -sI https://tgtc-website.vercel.app/ | head -5
HTTP/2 200 
accept-ranges: bytes
access-control-allow-origin: *
age: 51
cache-control: public, max-age=0, must-revalidate
```

## GitHub Webhook Status

The `vercel link` step attempted to connect the GitHub repo `Nn1co/Nn1co.github.io` to the Vercel project but failed:

> Error: Failed to connect Nn1co/Nn1co.github.io to project. Make sure there aren't any typos and that you have access to the repository if it's private.

This means **automatic deploy on `git push origin main` is NOT yet active**. Reconnection will be done via the Vercel Dashboard (Project Settings → Git → Connect Git Repository) or by re-running `vercel git connect` after the GitHub App authorization is granted on the repo. Until then, deploys must be triggered manually with `npx vercel --prod`.

This is captured here as a known follow-up; the rest of MIG-03 (project configured, building successfully) is satisfied.

## Refs

- Requirement: MIG-03 (Vercel project configured, repo connected, automatic deploy on push to main) — partially: project configured + repo not auto-deploying yet
- Requirement: SITE-01 (Site rendered via Next.js 14 — Vercel half) — satisfied
- CONTEXT decision: §"Vercel project configuration"
- Design spec: §12 Migration Step 3 (lite — full DNS switchover lands in Phase 9)
