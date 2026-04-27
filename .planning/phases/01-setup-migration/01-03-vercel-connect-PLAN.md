---
phase: 01-setup-migration
plan: 03
type: execute
wave: 3
depends_on:
  - 01-01
  - 01-02
files_modified:
  - .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md
autonomous: false
requirements:
  - SITE-01
  - MIG-03

must_haves:
  truths:
    - "A Vercel project named `tgtc-website` exists, linked to the GitHub repo `Nn1co.github.io`"
    - "Pushing to `main` triggers an automatic Vercel deploy without manual intervention"
    - "The auto-generated `*.vercel.app` URL serves the placeholder page (`TGTC — under construction`) over HTTPS with HTTP 200"
    - "Production branch is locked to `main` (no auto-deploy from forks or random branches)"
    - "Build settings match the Next.js framework preset: build `next build`, install `npm install`, output `.next`, Node 20.x"
    - "The custom domain `tgtechconsulting.com` is NOT yet attached (Phase 9 owns that switchover)"
    - "Evidence of the live deploy (URL + HTTP status + timestamp) is captured in the phase directory for the SUMMARY"
  artifacts:
    - path: ".planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md"
      provides: "Evidence file recording the *.vercel.app URL, the deploy commit SHA, and the curl smoke-test output"
      min_lines: 10
  key_links:
    - from: "git push origin main"
      to: "Vercel build pipeline"
      via: "GitHub → Vercel webhook"
      pattern: "https?://.*\\.vercel\\.app"
    - from: "Vercel build"
      to: "https://*.vercel.app/"
      via: "next build → Vercel Edge serving"
      pattern: "TGTC"
---

<objective>
Connect the existing GitHub repo `Nn1co.github.io` to a new Vercel project,
configure the build settings to match the Next.js scaffold from Plan 02, push
the local commits from Plans 01 + 02 to GitHub, verify Vercel auto-deploys
the push, and confirm the resulting `*.vercel.app` URL serves the placeholder
page. Capture evidence (URL, commit SHA, HTTP status, timestamp) in the phase
directory so the SUMMARY can prove MIG-03.

Purpose: per CONTEXT.md decisions and design spec §12 Migration Step 3 (lite
version — full DNS switchover lands in Phase 9), Vercel must be serving the
site from Phase 1 onwards (just at a temporary `*.vercel.app` URL until Phase
9 flips the production DNS). This plan delivers MIG-03 (Vercel project
configured, repo connected, automatic deploy on push) and the deploy half of
SITE-01 (deployed on Vercel).

Output:
- Vercel project `tgtc-website` linked to GitHub repo `Nn1co.github.io`
- First successful auto-deploy reachable at the project's `*.vercel.app` URL
- HTTP 200 response from that URL with `TGTC` in the body
- Evidence file at `.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md`

Why `autonomous: false`: Vercel project creation, GitHub repo connection,
and the first push to `origin/main` are shared infrastructure changes. Per
the global CLAUDE.md security rules ("ne pas force-push sur main/master sans
confirmation explicite") and the downstream consumer note in this phase
prompt, Claude pauses for explicit user confirmation at each infrastructure
gate.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-setup-migration/01-CONTEXT.md
@.planning/phases/01-setup-migration/01-01-SUMMARY.md
@.planning/phases/01-setup-migration/01-02-SUMMARY.md
@docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
</context>

<interfaces>
<!-- Vercel project configuration contract — exact values to set during the connect step. -->
<!-- These come from CONTEXT.md decisions §"Vercel project configuration". -->

```
Project name           tgtc-website
Framework preset       Next.js (auto-detected from package.json)
Root directory         . (project root, no monorepo)
Build command          next build         (default for Next.js preset)
Install command        npm install
Output directory       .next              (default for Next.js preset)
Node.js version        20.x (LTS)
Production branch      main
Auto-deploy on push    enabled (default)
Pull-request previews  enabled (default — useful for future PRs)
Custom domain          NOT added (Phase 9 owns tgtechconsulting.com)
Environment variables  none (no env vars used in P1)
```

CLI alternative (recommended over dashboard for scriptability):

```bash
# One-time, interactive: log in if not already
vercel login

# From repo root, link the local dir to a new Vercel project
vercel link --yes

# Set the production deploy target
vercel --prod                      # produces a *.vercel.app URL
```

Or fully via dashboard:
  https://vercel.com/new → Import Git Repository → select Nn1co.github.io
  → set Project Name, confirm Next.js preset → Deploy

Both routes produce the same result: a connected project with auto-deploy on
push. The plan presents both options at a checkpoint and lets the user pick.
</interfaces>

<tasks>

<task type="checkpoint:decision" gate="blocking">
  <name>Task 1: Decide connection method (Vercel CLI vs Dashboard)</name>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
  </read_first>
  <decision>How to create the Vercel project and link it to the GitHub repo</decision>
  <context>
    Vercel project creation is shared infrastructure. Two equivalent paths
    exist; both end with the same configuration. Pick the one Nicolas
    prefers based on whether the Vercel CLI is already authenticated locally.

    Configuration values applied in BOTH paths (from CONTEXT.md decisions):
      - Project name: `tgtc-website`
      - Framework preset: Next.js (auto-detected)
      - Build command: `next build` (default)
      - Install command: `npm install`
      - Output directory: `.next` (default)
      - Node.js version: 20.x (LTS)
      - Production branch: `main`
      - Auto-deploy on push: enabled
      - Custom domain: NOT added in this phase
  </context>
  <options>
    <option id="option-a">
      <name>CLI route (`vercel login` + `vercel link` + `vercel --prod`)</name>
      <pros>
        - Scriptable, every step traceable in the terminal
        - Project ID written to `.vercel/project.json` locally (gitignored)
        - Faster if you already have the CLI installed and logged in
      </pros>
      <cons>
        - Requires `npm install -g vercel` if not already installed
        - First `vercel login` opens a browser anyway, so not zero-touch
      </cons>
    </option>
    <option id="option-b">
      <name>Dashboard route (https://vercel.com/new → Import Git Repository)</name>
      <pros>
        - Zero local install required
        - Visual confirmation of every config field before clicking Deploy
        - Git connection authorized via OAuth, no PAT to manage
      </pros>
      <cons>
        - Manual clicks — slightly slower
        - Less traceability (no terminal log)
      </cons>
    </option>
  </options>
  <resume-signal>Reply with `option-a` (CLI) or `option-b` (Dashboard). The next task adapts to the choice.</resume-signal>
</task>

<task type="checkpoint:human-action" gate="blocking">
  <name>Task 2: Create Vercel project and link it to the repo</name>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-02-SUMMARY.md
    - /Users/nicolaslobonieuwenhuys/.claude/CLAUDE.md
  </read_first>
  <what-built>
    Plan 01 wiped Flutter from `main` (one local commit). Plan 02 scaffolded
    Next.js 14 + TS strict + Tailwind, installed all P2-P7 runtime deps, and
    placed a minimal placeholder page at `src/app/page.tsx` rendering "TGTC —
    under construction" (three local commits). All four commits are local
    only — nothing has been pushed to `origin/main` yet. This task creates
    the Vercel project so the next push automatically triggers a deploy.
  </what-built>
  <how-to-verify>
    Pick the option chosen at Task 1.

    **If option-a (CLI):**

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

    # Install Vercel CLI globally if not present
    npm ls -g vercel >/dev/null 2>&1 || npm install -g vercel

    # Authenticate (opens browser)
    vercel login

    # Link this directory to a new Vercel project
    # When prompted:
    #   - Set up and deploy? Y
    #   - Which scope? <your personal account or team>
    #   - Link to existing project? N
    #   - Project name? tgtc-website
    #   - In which directory is your code located? ./
    #   - Want to modify settings? N (the auto-detected Next.js preset is correct)
    vercel link --yes
    ```

    Confirm `.vercel/project.json` was created (locally; gitignored):

    ```bash
    test -f .vercel/project.json && echo "project linked OK"
    ```

    Then in the Vercel dashboard for the project:
      1. Settings → General → confirm Framework Preset = Next.js, Build Command = `next build`, Install Command = `npm install`, Output Directory = `.next`
      2. Settings → General → Node.js Version → set to 20.x (LTS)
      3. Settings → Git → confirm `Nn1co.github.io` is connected, production branch = `main`
      4. Settings → Domains → confirm NO custom domain is attached (Phase 9 owns that)

    **If option-b (Dashboard):**

      1. Visit https://vercel.com/new
      2. Click "Import Git Repository", authorize GitHub if needed
      3. Select `Nn1co.github.io` from the list
      4. Project Name: `tgtc-website`
      5. Framework Preset: Next.js (should auto-detect from package.json)
      6. Root Directory: `.` (default)
      7. Build & Output Settings: leave at defaults (Next.js preset → `next build`, `.next`, `npm install`)
      8. Environment Variables: leave empty
      9. Click "Deploy"
      10. Wait for the first deploy to finish (will succeed because `npm run build` already passed in Plan 02)
      11. After deploy: Settings → General → Node.js Version → set to 20.x (LTS) if not already
      12. Settings → Git → confirm production branch = `main`
      13. Settings → Domains → confirm NO custom domain is attached

    Reply with the *.vercel.app URL Vercel issued (visible at the top of the
    project dashboard or printed by the CLI), or describe any issue.
  </how-to-verify>
  <resume-signal>Reply with the `*.vercel.app` URL (e.g. `https://tgtc-website-xxxx.vercel.app`) or describe blockers.</resume-signal>
  <acceptance_criteria>
    - A Vercel project named `tgtc-website` exists in the user's account/team
    - The project is connected to the GitHub repo `Nn1co.github.io`
    - Framework preset = Next.js, build command = `next build`, install command = `npm install`, output dir = `.next`
    - Node.js version = 20.x
    - Production branch = `main`
    - No custom domain attached
    - User has provided the `*.vercel.app` URL for use in subsequent tasks
  </acceptance_criteria>
</task>

<task type="checkpoint:human-action" gate="blocking">
  <name>Task 3: Push local commits to origin/main and trigger first auto-deploy</name>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-SUMMARY.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-02-SUMMARY.md
    - /Users/nicolaslobonieuwenhuys/.claude/CLAUDE.md
  </read_first>
  <what-built>
    Plans 01 + 02 produced four local commits ahead of `origin/main`:

      1. `chore(01-01): remove Flutter web build from main`
      2. `chore(01-02): scaffold Next.js 14 with TS strict + Tailwind + App Router`
      3. `build(01-02): install core runtime deps for P2-P7 roadmap`
      4. `chore(01-02): placeholder page, gitignore additions, new README`

    Pushing them now is destructive in the sense that it permanently replaces
    the remote Flutter site on `main`. The user has confirmed an external
    backup of the Flutter build exists outside the repo (CONTEXT.md decisions),
    and the GitHub Pages site will keep serving from the previous commit until
    Phase 9 disables Pages — so the production URL `tgtechconsulting.com` is
    NOT affected by this push. Only the GitHub `main` branch contents change.
  </what-built>
  <how-to-verify>
    Confirm preconditions, then push.

    Preconditions:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

    # Confirm we are on main
    git rev-parse --abbrev-ref HEAD
    # Expected: main

    # Confirm we are 4 commits ahead of origin/main
    git rev-list --count origin/main..HEAD
    # Expected: 4

    # Confirm working tree clean
    git status --porcelain
    # Expected: empty
    ```

    If any precondition fails, STOP and report — do not paper over.

    Then push (this is the destructive infrastructure step that requires
    explicit user approval per global CLAUDE.md):

    ```bash
    git push origin main
    ```

    NO `--force`, NO `--no-verify`. The push must be a normal fast-forward.
    If GitHub rejects the push, diagnose root cause (someone else may have
    pushed; rebase before retrying).

    After push, watch the Vercel dashboard for the build to start. It should
    pick up automatically within ~10 seconds. The build will run `npm install`
    then `next build`, then deploy. Wait until status is "Ready".

    Reply with:
      - The commit SHA at the tip of `origin/main` (output of `git rev-parse origin/main`)
      - The Vercel deployment URL or build status (Ready / Failed)
  </how-to-verify>
  <resume-signal>Reply with `pushed, build Ready, sha=<full-sha>` or describe any failure.</resume-signal>
  <acceptance_criteria>
    - `git rev-parse origin/main` matches `git rev-parse HEAD` (push succeeded, fast-forward)
    - The latest Vercel deployment for the `tgtc-website` project is in state "Ready" (not "Building", "Error", "Cancelled")
    - The deployment commit message at the top of the Vercel dashboard matches `chore(01-02): placeholder page, gitignore additions, new README`
    - No force flag was used
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Smoke-test the *.vercel.app deploy and capture evidence</name>
  <files>.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-03-vercel-connect-PLAN.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/src/app/page.tsx
  </read_first>
  <action>
    Use the `*.vercel.app` URL provided by the user in Tasks 2 + 3 to smoke-
    test the deploy and write the evidence file. Substitute `<VERCEL_URL>`
    below with the actual URL:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

    VERCEL_URL="<VERCEL_URL>"   # e.g. https://tgtc-website-xxxx.vercel.app

    # Capture HTTP status and body
    HTTP_CODE=$(curl -s -o /tmp/tgtc-body.html -w "%{http_code}" "$VERCEL_URL")
    BODY_SAMPLE=$(grep -oE "TGTC[^<]*" /tmp/tgtc-body.html | head -1)
    DEPLOY_SHA=$(git rev-parse origin/main)
    NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)

    # Write evidence file
    cat > .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md <<EOF
# Plan 01-03 — Vercel Deploy Evidence

**Captured:** ${NOW}

## Deploy

| Field | Value |
|---|---|
| Vercel project | tgtc-website |
| URL | ${VERCEL_URL} |
| HTTP status | ${HTTP_CODE} |
| Body match | ${BODY_SAMPLE} |
| Commit SHA on origin/main | ${DEPLOY_SHA} |
| Production branch | main |
| Custom domain attached | NO (Phase 9 owns that) |

## Verification

\`\`\`
$ curl -s -I ${VERCEL_URL} | head -5
$(curl -s -I "$VERCEL_URL" | head -5)
\`\`\`

## Refs

- Requirement: MIG-03 (Vercel project configured, repo connected, automatic deploy on push to main)
- Requirement: SITE-01 (Site rendered via Next.js 14 — Vercel half)
- CONTEXT decision: §"Vercel project configuration"
- Design spec: §12 Migration Step 3 (lite — full DNS switchover lands in Phase 9)
EOF

    # Sanity check the evidence file
    test -s .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md
    grep -q "${VERCEL_URL}" .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md
    grep -q "${DEPLOY_SHA}" .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md
    ```

    Then commit the evidence file (single atomic commit):

    ```bash
    git add .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md
    git commit -m "$(cat <<'EOF'
docs(01-03): capture Vercel deploy evidence for *.vercel.app smoke test

Records the auto-deploy URL, HTTP status, body match for "TGTC", deploy
commit SHA, and production branch. Confirms MIG-03 (Vercel project
configured, repo connected, automatic deploy on push to main) and the
deploy half of SITE-01.

Custom domain `tgtechconsulting.com` deliberately NOT attached — Phase 9
owns the DNS switchover.

Refs: MIG-03, SITE-01
EOF
)"

    git push origin main
    ```

    The push of the evidence commit will itself trigger another Vercel
    deploy. That second deploy proves auto-deploy works end-to-end (one push
    = one deploy). Wait for it to reach Ready, then we're done.

    If `HTTP_CODE` is not 200 or `BODY_SAMPLE` is empty, STOP and diagnose
    (see <how-to-verify> hints below). Do not commit the evidence file
    until both checks pass — the file's purpose is to be ground truth.
  </action>
  <verify>
    <automated>cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io" && test -s .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md && grep -qE "https?://[a-zA-Z0-9-]+\.vercel\.app" .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md && grep -q "HTTP status | 200" .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md && grep -q "TGTC" .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md && git log -1 --pretty=%s | grep -q "capture Vercel deploy evidence"</automated>
  </verify>
  <acceptance_criteria>
    - File exists: `.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md`
    - File contains a `*.vercel.app` URL (regex: `https?://[a-zA-Z0-9-]+\.vercel\.app`)
    - File contains the literal table row `| HTTP status | 200 |`
    - File contains the substring `TGTC` (proof the body matched)
    - File contains a 40-character hex commit SHA
    - File contains the substring `tgtc-website`
    - File explicitly notes that the custom domain `tgtechconsulting.com` is NOT attached in this phase
    - `curl -s -o /dev/null -w "%{http_code}" <VERCEL_URL>` returns `200` at the time of verification
    - `curl -s <VERCEL_URL>` body contains the substring `TGTC`
    - `git log -1 --pretty=%s` matches `docs(01-03): capture Vercel deploy evidence for *.vercel.app smoke test`
    - After push, `git rev-parse origin/main` equals `git rev-parse HEAD`
    - Evidence-commit push triggered a second Vercel deploy that also reached Ready (proves auto-deploy works for any push, not just the first)
  </acceptance_criteria>
  <done>The `*.vercel.app` URL serves the placeholder page over HTTPS with HTTP 200 and the body contains `TGTC`. The evidence file is committed. A second push (the evidence commit itself) triggered a successful auto-deploy, proving the pipeline works for ongoing pushes — not just the initial import. MIG-03 and the Vercel half of SITE-01 are now demonstrably true.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| GitHub repo → Vercel | Vercel pulls source on every push; repo permissions and webhook integrity matter |
| Vercel project ID → repo | `.vercel/project.json` contains the project ID; if committed, attackers know which project to target |
| origin/main → public Vercel URL | Anything in `main` is publicly served; secrets/PII in `main` would be exposed |
| Custom domain → DNS | Out of scope here (Phase 9 owns it) |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-03-01 | Spoofing | Vercel project ownership | accept | User performs login/auth via Vercel's normal flow (CLI or OAuth); we trust Vercel's auth as the security boundary |
| T-01-03-02 | Tampering | force push to main | mitigate | Task 3 explicitly forbids `--force`; acceptance criteria check that the push is a fast-forward; per global CLAUDE.md "JAMAIS force-push sur main/master sans confirmation explicite" |
| T-01-03-03 | Information disclosure | `.vercel/project.json` leak | mitigate | `.vercel/` was added to `.gitignore` in Plan 02 Task 3, BEFORE `vercel link` runs in this plan |
| T-01-03-04 | Information disclosure | secrets in repo served publicly | mitigate | `.env*.local` in `.gitignore` (Plan 02); P1 introduces no env vars; Vercel project is created with empty Environment Variables panel |
| T-01-03-05 | Tampering | auto-deploy from forks | mitigate | Production branch locked to `main`; Vercel by default does not deploy production from forks (only preview). User confirms this in Task 2 acceptance criteria step 5 (Settings → Git) |
| T-01-03-06 | Denial of service | runaway deploys | accept | Vercel free tier rate-limits builds; only `main` triggers production. Risk floor is what Vercel community already accepts |
| T-01-03-07 | Information disclosure | crawler indexing of `*.vercel.app` placeholder | accept | Placeholder is plaintext "TGTC — under construction"; no PII, no Flutter artifacts (Plan 01 wiped them); SEO blocking via robots.txt is Phase 7's responsibility |
| T-01-03-08 | Repudiation | "who pushed" | mitigate | Push uses Nicolas' git config; Vercel logs the GitHub commit SHA; evidence file records the SHA at deploy time |
| T-01-03-09 | Tampering | flutter artifacts re-indexed | mitigate | Plan 01 deleted all Flutter files from main; Vercel only serves what's currently in `main`; no orphan asset risk after the wipe commit |
</threat_model>

<verification>
End-to-end verification (run after Task 4):

```bash
cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

# 1. Local main matches remote main
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" && echo "main synced"

# 2. Evidence file exists and is valid
test -s .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md && echo "evidence file OK"

# 3. *.vercel.app URL serves the placeholder over HTTPS
VERCEL_URL=$(grep -oE "https?://[a-zA-Z0-9-]+\.vercel\.app" .planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md | head -1)
curl -s -o /dev/null -w "%{http_code}\n" "$VERCEL_URL"      # 200
curl -s "$VERCEL_URL" | grep -q "TGTC" && echo "TGTC body OK"

# 4. .vercel/ NOT committed
git ls-files .vercel/ | wc -l                                # 0

# 5. Custom domain still unattached (sanity — would need Vercel API to fully verify; manual check at Settings → Domains is acceptable)
```
</verification>

<success_criteria>
1. Vercel project `tgtc-website` exists, linked to GitHub `Nn1co.github.io`, with framework preset Next.js, Node 20.x, production branch `main`
2. `git push origin main` triggers an automatic Vercel deploy with no further intervention
3. The auto-generated `*.vercel.app` URL returns HTTP 200 over HTTPS and serves a body containing the literal string `TGTC`
4. The evidence file `.planning/phases/01-setup-migration/01-03-vercel-deploy-evidence.md` records the URL, HTTP status, body match, deploy commit SHA, and timestamp
5. A second push (the evidence commit itself) also auto-deploys successfully, proving the pipeline works for ongoing pushes
6. `.vercel/project.json` exists locally but is NOT tracked in git (`.gitignore` works as intended)
7. The custom domain `tgtechconsulting.com` is NOT attached (deferred to Phase 9)
8. No force flag was ever used on `git push`
</success_criteria>

<output>
After completion, create `.planning/phases/01-setup-migration/01-03-SUMMARY.md`
documenting:
- The `*.vercel.app` URL
- The deploy commit SHA on `origin/main`
- Confirmation of HTTP 200 + `TGTC` body match
- Vercel project settings (framework, Node version, prod branch)
- Pointer to the evidence file
- Explicit note that `tgtechconsulting.com` is NOT attached and Phase 9 owns the DNS switchover
- Phase 1 closure: all four success criteria from ROADMAP.md §"Phase 1: Setup & migration" are now true
</output>
</content>
</invoke>