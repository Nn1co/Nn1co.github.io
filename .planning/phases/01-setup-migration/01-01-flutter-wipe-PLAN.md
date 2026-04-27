---
phase: 01-setup-migration
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - 404.html
  - index.html
  - main.dart.js
  - flutter.js
  - flutter_bootstrap.js
  - flutter_service_worker.js
  - manifest.json
  - version.json
  - favicon.png
  - .nojekyll
  - .DS_Store
  - assets/
  - canvaskit/
  - icons/
  - media/
autonomous: true
requirements:
  - MIG-01
user_setup: []

must_haves:
  truths:
    - "All Flutter Web build artifacts are absent from the working tree"
    - "The design spec at docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md is preserved unchanged"
    - "All .planning/ files are preserved unchanged"
    - "The .git/ directory and full history are preserved"
    - "A single atomic commit on main records the wipe"
  artifacts:
    - path: "docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md"
      provides: "Canonical design spec preserved through the wipe"
      contains: "TGTC Website Redesign — Design Spec"
    - path: ".planning/ROADMAP.md"
      provides: "GSD roadmap preserved"
      contains: "Phase 1: Setup & migration"
  key_links:
    - from: "main branch HEAD"
      to: "the Flutter wipe commit"
      via: "single Conventional Commit"
      pattern: "chore.*remove Flutter|chore.*wipe Flutter|chore.*drop Flutter"
---

<objective>
Wipe every Flutter Web build artifact from the `main` branch of the
`Nn1co.github.io` repo while preserving `.git/`, `.gitignore`, `docs/`, and
`.planning/`. Result is a working tree containing only those four directories
(plus root dotfiles) so the Next.js scaffold in Plan 02 can land cleanly.

Purpose: per CONTEXT.md decisions and design spec §12 Migration Step 1, the
user has confirmed an external backup of the Flutter build exists outside the
repo. No archival branch is needed. We commit the wipe atomically so the next
plan starts from a known-empty state.

Output:
- Tracked Flutter files removed via `git rm -r`
- `.DS_Store` removed (macOS noise)
- Single atomic commit on `main`
- Working tree clean (`git status` reports nothing to commit)
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
@docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
</context>

<interfaces>
<!-- Pre-wipe inventory of tracked files (from CONTEXT.md §specifics + ls -la). -->
<!-- These are the ONLY files that must be removed. Anything else is preserved. -->

Top-level files to remove (Flutter web entry points + root noise):
  404.html
  index.html
  main.dart.js          (~3 MB — biggest payload)
  flutter.js
  flutter_bootstrap.js
  flutter_service_worker.js
  manifest.json
  version.json
  favicon.png           (Flutter-era; new favicon will land in P7)
  .nojekyll             (GitHub Pages convention; we are leaving GH Pages)
  .DS_Store             (macOS noise, not tracked but present)

Top-level directories to remove (Flutter compiled assets + dropped media):
  assets/               (Flutter compiled assets)
  canvaskit/            (Flutter renderer)
  icons/                (Flutter PWA icons; new icons land in P7)
  media/                (returns-assistant.mov, tgtc-demo.mov — explicitly dropped per spec §13)

Files/directories to PRESERVE (NEVER delete in this plan):
  .git/                 (entire history)
  .gitignore            (will be replaced in Plan 02)
  docs/                 (design spec — survives the wipe)
  .planning/            (GSD project files — survives the wipe)
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Pre-wipe verification snapshot</name>
  <files>.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md
  </read_first>
  <action>
    Capture a deterministic inventory of the working tree before any deletion so
    later tasks can prove what was removed. Run from repo root:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"
    {
      echo "# Pre-wipe inventory — $(date -u +%Y-%m-%dT%H:%M:%SZ)"
      echo ""
      echo "## git ls-files (tracked)"
      git ls-files
      echo ""
      echo "## ls -la root"
      ls -la
      echo ""
      echo "## du -sh top-level dirs"
      du -sh assets canvaskit icons media docs .planning .git 2>/dev/null
    } > .planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt
    ```

    Then verify the inventory file was written and contains the expected
    Flutter artifacts (main.dart.js, flutter.js, canvaskit/, assets/) AND the
    preserved paths (docs/, .planning/).
  </action>
  <verify>
    <automated>test -s "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt" && grep -q "main.dart.js" "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt" && grep -q "docs/superpowers" "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt"</automated>
  </verify>
  <acceptance_criteria>
    - File exists: `.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt`
    - File contains the string `main.dart.js` (Flutter artifact found)
    - File contains the string `docs/superpowers` (preserved path captured)
    - File contains the string `.planning/` (preserved path captured)
    - File size > 0 bytes
  </acceptance_criteria>
  <done>The inventory file exists, includes both Flutter artifacts and preserved paths, and can serve as the diff baseline for Task 3 verification.</done>
</task>

<task type="auto">
  <name>Task 2: Delete Flutter artifacts via git rm</name>
  <files>404.html, index.html, main.dart.js, flutter.js, flutter_bootstrap.js, flutter_service_worker.js, manifest.json, version.json, favicon.png, .nojekyll, assets/, canvaskit/, icons/, media/, .DS_Store</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt
  </read_first>
  <action>
    Remove every Flutter Web build artifact from the working tree using
    `git rm -rf` (so the deletions are staged for the same commit). Run
    from repo root:

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

    # Tracked top-level files
    git rm -f 404.html index.html main.dart.js flutter.js flutter_bootstrap.js flutter_service_worker.js manifest.json version.json favicon.png .nojekyll

    # Tracked top-level directories
    git rm -rf assets canvaskit icons media

    # Untracked macOS noise (just rm — not in index)
    rm -f .DS_Store
    ```

    Do NOT touch: `.git/`, `.gitignore`, `docs/`, `.planning/`. These are the
    explicit preservation list from CONTEXT.md decisions.

    Note: `.gitignore` is NOT removed in this plan — it stays as-is until
    Plan 02 replaces its content with Next.js conventions. Removing it now
    would be a no-op since Plan 02 immediately recreates it.
  </action>
  <verify>
    <automated>cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io" && test ! -e main.dart.js && test ! -e flutter.js && test ! -d canvaskit && test ! -d assets && test ! -d media && test ! -d icons && test -d docs && test -d .planning && test -d .git && test -f .gitignore</automated>
  </verify>
  <acceptance_criteria>
    - File does not exist: `main.dart.js`
    - File does not exist: `flutter.js`
    - File does not exist: `flutter_bootstrap.js`
    - File does not exist: `flutter_service_worker.js`
    - File does not exist: `index.html`
    - File does not exist: `404.html`
    - File does not exist: `manifest.json`
    - File does not exist: `version.json`
    - File does not exist: `favicon.png`
    - File does not exist: `.nojekyll`
    - File does not exist: `.DS_Store`
    - Directory does not exist: `assets/`
    - Directory does not exist: `canvaskit/`
    - Directory does not exist: `icons/`
    - Directory does not exist: `media/`
    - Directory exists: `docs/` (preserved)
    - Directory exists: `.planning/` (preserved)
    - Directory exists: `.git/` (preserved)
    - File exists: `.gitignore` (preserved, replaced in Plan 02)
    - `git status --short` shows only `D` (deleted) entries for the listed Flutter files, no `M`/`A` entries that would indicate accidental modification of preserved files
  </acceptance_criteria>
  <done>Working tree contains only `.git/`, `.gitignore`, `docs/`, `.planning/` (plus the inventory text file from Task 1). All deletions staged. `git status` shows the expected `deleted:` lines only.</done>
</task>

<task type="auto">
  <name>Task 3: Commit the wipe atomically</name>
  <files>.git/ (commit object only, no working tree changes)</files>
  <read_first>
    - /Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io/.planning/phases/01-setup-migration/01-CONTEXT.md
    - /Users/nicolaslobonieuwenhuys/.claude/CLAUDE.md
  </read_first>
  <action>
    Stage the inventory file and create a single atomic Conventional Commit
    on `main` recording the Flutter wipe. Use the exact commit message below
    (Conventional Commits in English per global CLAUDE.md):

    ```bash
    cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"
    git add .planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt
    git commit -m "$(cat <<'EOF'
chore(01-01): remove Flutter web build from main

Wipe all Flutter Web artifacts (main.dart.js, flutter.js, canvaskit/,
assets/, icons/, media/, manifest.json, version.json, index.html, 404.html,
favicon.png, .nojekyll, flutter_bootstrap.js, flutter_service_worker.js)
ahead of the Next.js scaffold. The user has confirmed an external backup
of the Flutter build exists outside the repo, so no archival branch is
created.

Preserved: .git/, .gitignore (replaced in Plan 02), docs/, .planning/.

Pre-wipe inventory snapshot at .planning/phases/01-setup-migration/01-01-pre-wipe-inventory.txt.

Refs: MIG-01, design spec §12 Migration Step 1
EOF
)"
    ```

    Do NOT push. Plan 03 (Vercel) covers the first push. Local-only commit
    here keeps recovery cheap if anything in Plan 02 needs to be re-rolled.
  </action>
  <verify>
    <automated>cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io" && git log -1 --pretty=%s | grep -q "chore(01-01): remove Flutter web build from main" && git diff HEAD~1 HEAD --stat | grep -q "main.dart.js" && test -z "$(git status --porcelain)"</automated>
  </verify>
  <acceptance_criteria>
    - `git log -1 --pretty=%s` exact output: `chore(01-01): remove Flutter web build from main`
    - `git log -1 --pretty=%B` body contains the string `MIG-01`
    - `git diff HEAD~1 HEAD --stat` mentions `main.dart.js` (proves the wipe is in this commit)
    - `git status --porcelain` produces empty output (clean working tree)
    - `git ls-files` does NOT contain any of: `main.dart.js`, `flutter.js`, `flutter_bootstrap.js`, `flutter_service_worker.js`, `index.html`, `404.html`, `manifest.json`, `version.json`, `favicon.png`, `assets/`, `canvaskit/`, `icons/`, `media/`
    - `git ls-files` DOES contain at least one path under `docs/superpowers/specs/` (preservation proof)
    - `git ls-files` DOES contain at least one path under `.planning/` (preservation proof)
    - HEAD is on branch `main` (`git rev-parse --abbrev-ref HEAD` outputs `main`)
  </acceptance_criteria>
  <done>One new commit on `main` with the exact subject above. Repo state: design spec preserved, GSD planning files preserved, all Flutter artifacts absent. Plan 02 can scaffold into a clean tree.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| local FS → git index | git rm operations stage destructive changes; an over-broad pattern could lose preserved files |
| working tree → commit | uncommitted state is recoverable via `git restore`; once committed, only `git revert`/`reset` |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01-01 | Tampering | working tree | mitigate | Task 2 lists every removal target by **explicit path** (no `rm -rf *`, no glob expansion); Task 1 captures a pre-wipe inventory so any over-deletion is detectable by diff |
| T-01-01-02 | Tampering | docs/ + .planning/ | mitigate | Acceptance criteria for Task 2 explicitly assert `test -d docs && test -d .planning && test -d .git` BEFORE proceeding to commit |
| T-01-01-03 | Information disclosure | git history | accept | Wipe commit removes Flutter source from working tree but the full Flutter history remains in `.git/` (intentional — user wanted history preserved, not source) |
| T-01-01-04 | Repudiation | commit authorship | mitigate | Conventional Commit subject `chore(01-01): remove Flutter web build from main` plus Refs `MIG-01` make the change traceable to the requirement |
| T-01-01-05 | Denial of service | repo | accept | Wipe is local-only (no push); if anything goes wrong, `git reset --hard origin/main` recovers fully — risk floor is one branch reset |
| T-01-01-06 | Tampering | external backup assumption | accept | User confirmed external Flutter backup in CONTEXT.md decisions; we are not the backup mechanism, so we do not verify it |
</threat_model>

<verification>
After all three tasks complete, run from repo root:

```bash
cd "/Users/nicolaslobonieuwenhuys/Documents/proj Thib/TGTC web/Nn1co.github.io"

# 1. Working tree clean
git status --porcelain
# (must produce no output)

# 2. Flutter artifacts absent (return 0)
ls main.dart.js 2>/dev/null; ls flutter.js 2>/dev/null; ls -d canvaskit 2>/dev/null; ls -d assets 2>/dev/null; ls -d media 2>/dev/null
# (must produce only "ls: ... No such file or directory" stderr)

# 3. Preservation proof
test -f docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md && echo "spec OK"
test -f .planning/ROADMAP.md && echo "roadmap OK"
test -d .git && echo "git OK"

# 4. Commit landed
git log -1 --oneline
# (must contain "remove Flutter web build")
```
</verification>

<success_criteria>
1. Plan 01 produces exactly one new commit on `main` whose subject starts with `chore(01-01): remove Flutter web build from main`
2. The commit's diff stat shows ≥ 14 files deleted (one per Flutter top-level artifact + directories) and zero files modified outside `.planning/phases/01-setup-migration/`
3. `docs/superpowers/specs/2026-04-27-tgtc-website-redesign-design.md` is byte-identical to its pre-wipe state (same SHA when hashed)
4. `.planning/` tree is byte-identical to its pre-wipe state for every file except the new `01-01-pre-wipe-inventory.txt`
5. Plan 02 can run `npx create-next-app@latest .` against the resulting tree with no manual cleanup
</success_criteria>

<output>
After completion, create `.planning/phases/01-setup-migration/01-01-SUMMARY.md`
documenting:
- Commit SHA of the wipe
- Number of files deleted
- List of preserved paths verified
- Pointer to the pre-wipe inventory file
</output>
</content>
</invoke>