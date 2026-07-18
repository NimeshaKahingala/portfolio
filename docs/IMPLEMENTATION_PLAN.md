# Implementation Plan — Portfolio Revamp

> Execution plan for the approved `REVAMP_PLAN.md` + `DESIGN_CONCEPT.md` (accent: Blue).
> Branch: **`revamp`** (created off `main`). Old site keeps running from `main` until final merge.
> Status: ready to execute. Nothing below has been built yet.

---

## 0. Ground Rules

- **Source of truth**: `DESIGN_CONCEPT.md` for every visual decision; `REVAMP_PLAN.md` for architecture. Deviations get written back into those docs, not decided silently.
- **Strategy**: scaffold Astro **in-place on the `revamp` branch**, deleting CRA files as their replacements land. The old code stays fully intact on `main` — instant rollback is `git checkout main` / redeploying the previous Pages deployment.
- **Every phase ends with**: `npm run build` passing + a visual check via `npm run dev` (and from Phase 5 on, a Cloudflare Pages preview deployment).
- **Commits**: one commit per completed step below, conventional messages (`feat: …`, `chore: …`, `content: …`). Push `revamp` early so Pages builds branch previews.

### Content defaults (pending Nimesha's confirmation — build proceeds with these)

| Decision | Default used | Change later? |
|---|---|---|
| Experience figure | **"5+ years"** everywhere (majority of current site copy) | 1-line edit in `site.ts` |
| Featured projects (home) | MillionSpaces, Ceyphire, Helpful Engineering | `featured: true` flag in frontmatter |
| Photo | `me2.jpg` (current live photo) | drop-in file replacement |
| Socials | LinkedIn, Medium, GitHub, Email — **Facebook dropped** | array edit in `site.ts` |
| Contact email backend | **Resend** | swappable function internals |

---

## Phase 1 — Scaffold & Foundation

**Goal**: empty-but-real Astro site with the design system, header/footer/theme, deployable.

1. **Clean slate on branch**: remove CRA artifacts — `src/` (except `src/images`, kept temporarily as asset source), `public/` CRA files (`logo192/512.png`, CRA `manifest.json`), `tailwind.config.js`, `package.json` deps. Keep `docs/`, `.gitignore`, `README.md` (rewritten in Phase 6).
2. **Scaffold**: `npm create astro@latest` (empty template, TypeScript strict) merged into repo root; add integrations:
   - `tailwindcss` v4 (via `@tailwindcss/vite`)
   - `@astrojs/sitemap`
   - `astro-icon` + `@iconify-json/simple-icons` + `@iconify-json/lucide`
   - `@fontsource-variable/space-grotesk`, `@fontsource-variable/inter`, `@fontsource/jetbrains-mono` (500 only)
3. **Design tokens**: `src/styles/global.css` — Tailwind v4 `@theme` with the full §2 token table (both themes via `[data-theme]` + `prefers-color-scheme` fallback), fluid type scale utilities, focus-visible rule, reduced-motion rule.
4. **Base layout** (`src/layouts/Base.astro`): `<head>` with metadata props (title, description, canonical, OG/Twitter), font preloads, **no-flash theme script** (inline, before paint), JSON-LD Person schema, Cloudflare Web Analytics beacon placeholder (commented until token exists), skip-link, `<ViewTransitions />`.
5. **Components**: `Header.astro` (sticky blur, scroll hairline, active-link detection, mobile overlay menu with scroll-lock + ESC), `ThemeToggle.astro`, `Footer.astro`, `Button.astro`, `Reveal` (IntersectionObserver script, one instance sitewide).
6. **Pages**: placeholder `index.astro` + real `404.astro`.
7. **Config**: `astro.config.mjs` (site URL `https://nimeshakahingala.com`, sitemap), `.nvmrc` (Node 22), `public/robots.txt` pointing at `/sitemap-index.xml`.

**Done when**: `npm run build` outputs `dist/`, theme toggles with no flash, header/footer/404 match the mockup, mobile menu works at 360px.

## Phase 2 — Content & Assets Migration

**Goal**: all content out of JSX and into data files; all images optimized.

1. **Content collections**: `src/content.config.ts` — `projects` collection schema: `title, slug, summary, description, url, role, year, tech[], featured, order, cover, gallery[], fullStack`.
2. **Port 7 projects** from `src/components/data.js` → `src/content/projects/*.md`:
   `millionspaces` · `golden-gate` · `squadgurus` (fix "SqaudGurus" typo) · `1billion-tech` · `banyan-restaurant` · `ceyphire` · `helpful-engineering`.
   Rewrite each `responsibilities` paragraph as 3–6 "What I did" bullets (content edit, per §4.4 of the design concept).
3. **Data files**: `src/data/site.ts` (name, tagline, email, socials, availability, experience figure), `src/data/skills.ts` (4 categories, icon names from simple-icons), `src/data/timeline.ts` (experience + education from current `about.js`), certifications list.
4. **Images**: move originals `src/images/` → `src/assets/images/` (profile + per-project folders); Astro `<Image>` handles AVIF/WebP + `srcset` at build. Delete: `Nimesha.jpeg`, `cv.pdf`, `goldenGate.PNG` duplicate, `logo.svg`, all unused icons (SVGs replaced by astro-icon). Copy `cv2.pdf` → `public/resume.pdf`.
5. **Blog source**: `src/lib/medium.ts` — build-time fetch + parse of `https://medium.com/feed/@NimeshaKahingala` (title, link, pubDate, thumbnail, reading-time estimate), with graceful fallback (empty feed → page still renders the Medium profile card).

**Done when**: `astro check` passes the collection schema; no imports remain from the old `data.js`; repo contains no orphan images.

## Phase 3 — Pages

**Goal**: all six routes built to the §4 blueprints.

| Step | Route | Key work |
|---|---|---|
| 3.1 | `/` | Hero (dot-grid, display name, availability badge, 2 CTAs, photo), featured-projects grid (reuses ProjectCard), tools strip, closing CTA |
| 3.2 | `/portfolio/` | Grid + filter chips (`aria-pressed`, `data-tech` show/hide script) |
| 3.3 | `/portfolio/[slug]/` | `getStaticPaths` from collection; hero shot, sticky meta panel, bullets, gallery + native `<dialog>` lightbox (arrow keys, ESC), prev/next links, per-project OG/meta + BreadcrumbList JSON-LD |
| 3.4 | `/about/` | Bio, quick-facts row, skills grid, unified timeline, certifications, résumé button |
| 3.5 | `/blog/` | Medium cards from `medium.ts`, "Follow on Medium" CTA |
| 3.6 | `/contact/` | Page UI + form component (client validation, states) — **submission stubbed** until Phase 4 |

**Done when**: every route renders at 360/768/1024, lightbox and filters keyboard-operable, Lighthouse (local, mobile) Performance ≥ 90 before tuning.

## Phase 4 — Contact Backend (Cloudflare)

**Goal**: real form delivery, spam-protected.

1. `functions/api/contact.ts` (Pages Function): parse/validate JSON → verify Turnstile token (`siteverify`) → send via Resend REST API → typed success/error responses. Honeypot field + basic rate limit by IP (best-effort, header check).
2. Wire the form: fetch POST, loading state, success panel, error state with retry (per §3.6 of the design concept). Turnstile widget script only on `/contact/`.
3. **Dashboard setup (needs Nimesha's Cloudflare/Resend access)**: create Turnstile widget (site key → public env, secret → Pages secret), Resend account + domain verification (2 DNS records on the existing CF zone), set `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `PUBLIC_TURNSTILE_SITE_KEY` for production *and* preview envs.
4. Test end-to-end on a Pages preview deployment (functions run on previews).

**Done when**: a preview-URL submission lands in the Gmail inbox; bad token / missing fields return proper errors shown in the UI.

## Phase 5 — SEO, Performance & Polish

1. **Metadata pass**: unique title/description per route via Base props; canonical URLs; JSON-LD (Person site-wide, BreadcrumbList + project data on detail pages).
2. **OG image**: create `public/og-image.jpg` (1200×630 per asset spec §8) — referenced today but missing.
3. **Favicons/manifest**: NK monogram SVG favicon + 192/512 PNGs + maskable icon + minimal `manifest.webmanifest` (replaces CRA defaults).
4. **`public/_headers`**: immutable caching for `/_astro/*`, security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
5. **Cloudflare Web Analytics**: enable in dashboard, paste beacon token into Base layout.
6. **Audit loop**: Lighthouse mobile on the preview URL until §9 "Definition of Looks Done" passes (Perf ≥ 95, A11y ≥ 95, SEO = 100); keyboard-only walkthrough; 360px sweep; dark/light page-by-page review; social-share preview check (LinkedIn/WhatsApp debuggers).

## Phase 6 — Launch

1. Rewrite `README.md` (stack, structure, local dev, deploy notes).
2. **Pages project settings**: change build command to `npm run build`, output dir to `dist` (from CRA's `build`), confirm Node version. Do this only when `revamp` previews are green — production builds from `main` are unaffected until merge.
3. Final content read-through (experience figure, availability, project copy) — get Nimesha's sign-off on the preview URL.
4. Merge `revamp` → `main` via PR → production deploy → verify domain, sitemap fetch in Search Console, analytics beacon firing.
5. Post-launch cleanup: delete stale hand-written `sitemap.xml` reference checks, archive `docs/CRITICAL_FIXES.md`-era docs with a "superseded by revamp" note.

---

## Execution Order & Dependencies

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 5 ──► Phase 6
                          │
                          └─► Phase 4 (needs dashboard access; can run parallel to 5)
```

Estimated effort: **3–4 focused days** (per REVAMP_PLAN §8). Phase 4 step 3 and Phase 5 step 5 are the only steps requiring dashboard credentials/actions outside the repo.

## What I need from Nimesha (non-blocking — defaults listed in §0 apply meanwhile)

1. Confirm "5+ years" (or give the real figure).
2. Confirm the photo, featured-project trio, and dropping Facebook.
3. When Phase 4 arrives: Cloudflare dashboard access for Turnstile + env vars, and a Resend account (or say the word and we fall back to Cloudflare Email Service).
