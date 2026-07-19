# Pages → Workers Migration Plan (nimesha.dev)

> **Status: PLAN ONLY — not implemented.** Audited live against the Cloudflare account
> (`dfcfd8b8…`) via MCP on 2026-07-18 and verified against the official
> [Pages→Workers migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).
> Goal: serve the site as a **Cloudflare Worker with static assets** (the recommended
> platform going forward), on the domain **nimesha.dev**, replacing the current Pages setup.

---

## 1. Current state (audited)

| Item | Value |
|---|---|
| Pages project | `portfolio` — GitHub `NimeshaKahingala/portfolio`, prod branch `main` |
| Pages build config | `npm run build` → output dir **`build`** (the *old* React site; Astro outputs `dist`) |
| Pages domains | `portfolio-b0m.pages.dev` + **`nimesha.dev`** (active custom domain) |
| DNS (zone `nimesha.dev`) | apex `CNAME → portfolio-b0m.pages.dev` (proxied) · `TXT` google-site-verification · `A vcarepos-api` (unrelated service — **keep**) |
| `www.nimesha.dev` | does not exist (no DNS record) |
| Workers in account | none |
| Other Pages project | `ceyphire` (ceyphire.com) — **untouched by this migration** |

### ⚠️ Bug found during audit — wrong canonical domain in the new code

[astro.config.mjs:9](astro.config.mjs#L9) and [site.ts:11](src/data/site.ts#L11) still say
`https://nimeshakahingala.com` — a zone that **doesn't exist in this account**. The live
domain is `nimesha.dev`. Right now every canonical URL, sitemap entry, OG/Twitter URL, and
the JSON-LD `url` in the revamp point at the wrong domain. Fixing this is step W1-1
regardless of the migration.

---

## 2. Target architecture

```
GitHub push (main) ──► Workers Builds (CI) ──► npm run build ──► wrangler deploy
                                                                    │
nimesha.dev  ──(Workers custom domain)──►  Worker "nimesha-portfolio"
                                             └─ static assets: ./dist  (assets-only, no main script)
branch pushes ──► preview URLs (versions on workers.dev)
```

- **Assets-only Worker** — no `main` script needed today. Static-asset requests are
  **free and unlimited** (they don't count against the 100k/day Workers free-tier request
  limit). Total cost stays **$0**.
- Worker name: **`nimesha-portfolio`** — Workers and Pages share a name namespace in the
  dashboard, so reusing `portfolio` while the Pages project still exists risks a conflict.
- `_headers`/`_redirects` are natively supported by Workers assets if we ever add them
  (we currently have none).

### `wrangler.jsonc` (new file, repo root)

```jsonc
{
  "name": "nimesha-portfolio",
  "compatibility_date": "2026-07-18",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"   // dist/404.html exists — Pages did this implicitly, Workers is explicit
    // html_handling defaults to "auto-trailing-slash" — matches Astro's trailingSlash: "always"
  },
  "preview_urls": true,
  "observability": { "enabled": true }
}
```

---

## 3. Migration phases

### W1 — Code changes (on `revamp`, ~30 min, zero risk)

1. **Domain fix**: `site: 'https://nimesha.dev'` in `astro.config.mjs`; `url: "https://nimesha.dev"` in `src/data/site.ts`.
2. Add `wrangler@^4` as a dev dependency (guide requires v4+; v4.112.0 confirmed available).
3. Add `wrangler.jsonc` as above.
4. `package.json` scripts: add `"deploy": "astro build && wrangler deploy"` and `"cf:preview": "astro build && wrangler dev"`.
5. Validate: `npm run build && npx wrangler deploy --dry-run`.

No `functions/` dir and no `_worker.js` exist → nothing else to convert.

### W2 — First deploy & verification (needs one manual auth step)

1. **[MANUAL]** `npx wrangler login` (browser OAuth, one time). *(Alternative: an API token with Workers Scripts:Edit.)*
2. **[MANUAL, if prompted]** register the account's `*.workers.dev` subdomain (first Worker in this account — wrangler will prompt for a name; suggestion: `nimesha`).
3. `npm run deploy` from the `revamp` branch → live at `nimesha-portfolio.<subdomain>.workers.dev`.
4. Chrome-MCP audit of the workers.dev URL (routing incl. trailing slashes, 404 page, assets, LCP/CLS re-check).

### W3 — Domain cutover (API-driven, seconds of propagation)

> **Ordering matters:** flip the domain **before** merging `revamp` → `main`. The Pages
> project still auto-builds `main` with the old config (output dir `build`) — merging first
> would break the Pages production deployment while it still owns nimesha.dev.

1. Detach `nimesha.dev` from the Pages project (API — I can do this via MCP).
2. Delete the apex `CNAME → portfolio-b0m.pages.dev` record (API).
3. Attach `nimesha.dev` as a **Workers custom domain** on `nimesha-portfolio` (API — auto-creates the DNS record + certificate).
4. Verify `https://nimesha.dev` serves the new site.
- **Untouched:** `vcarepos-api` A record, google-site-verification TXT.
- **Rollback:** reverse steps 1–3 (re-attach domain to Pages) — the old Pages deployment stays live until W5.

### W4 — CI/CD via Workers Builds (mostly manual — dashboard/GitHub OAuth)

1. Merge `revamp` → `main`.
2. **[MANUAL]** Dashboard → Worker `nimesha-portfolio` → Settings → Builds → connect
   `NimeshaKahingala/portfolio` (the GitHub app is already installed for Pages — should be a
   few clicks). Build command `npm run build`, deploy command `npx wrangler deploy`, prod branch `main`.
3. **[MANUAL]** Enable **non-production branch builds** → branch pushes get preview URLs
   (the Pages preview-deployment equivalent; `preview_urls: true` already set in W1).
4. Push a trivial commit to verify the pipeline end-to-end.

### W5 — Cleanup (destructive — only after W3/W4 verified, with your explicit OK)

1. **Delete the Pages project `portfolio`** (removes `portfolio-b0m.pages.dev` and the old
   React site entirely). I can do this via API once you confirm.
2. **[MANUAL, optional]** Re-enable **Web Analytics**: the Pages project auto-injected an
   analytics beacon (token `79efed84…`) which dies with the project. On Workers, enable Web
   Analytics for the `nimesha.dev` zone in the dashboard (free; auto-injection works since
   the zone is proxied). History resets — the old Pages analytics data is not migrated.
3. **[OPTIONAL, recommended]** Add `www.nimesha.dev` → apex redirect. No `www` record
   exists today, so `www.` currently dead-ends. One proxied DNS record + one free Redirect
   Rule (301 → `https://nimesha.dev`). Your call — skipping keeps status quo.

---

## 4. Manual steps required from you (summary)

| # | Step | Phase | Why manual |
|---|---|---|---|
| 1 | `npx wrangler login` in the project dir | W2 | Browser OAuth — I can't authenticate as you |
| 2 | Pick/confirm the `*.workers.dev` subdomain name if prompted | W2 | Account-level naming choice |
| 3 | Connect GitHub repo in Workers Builds + enable branch builds | W4 | GitHub app authorization is dashboard-only |
| 4 | Say "go" before I delete the Pages project | W5 | Destructive |
| 5 | (Optional) enable Web Analytics for nimesha.dev | W5 | Dashboard-only toggle |
| 6 | (Optional) decide on `www.` redirect | W5 | Preference |

Everything else — code changes, deploys (post-login), domain detach/attach, DNS record
cleanup, Pages project deletion — I can execute via wrangler + the Cloudflare MCP.
*(Note: the MCP token was denied on the Email Routing read endpoint during the audit; if a
cutover call hits a similar scope limit, that step becomes a 2-minute dashboard action and
I'll flag it.)*

---

## 5. Impact on the Phase 4 contact-backend plan — it gets **simpler**

`docs/PHASE4_BACKEND_PLAN.md` will need a revision after this migration (it was also
written against the wrong domain):

1. **The `send_email` binding becomes available.** Its whole "REST API workaround" section
   existed only because that binding is Workers-only and we were on Pages. On Workers we
   add a small `main` script (with an `ASSETS` binding) handling `POST /api/contact` and
   use the **native `send_email` binding** — no `CF_ACCOUNT_ID`, no `CF_EMAIL_API_TOKEN`.
2. **Domain corrections**: Email Routing + verified destination on **nimesha.dev**;
   from-address `contact@nimesha.dev`; Turnstile widget for `nimesha.dev`.
3. Free-tier economics unchanged: sends to a verified destination are free on all plans.

Still on hold per your earlier instruction — I'll revise that doc when Phase 4 is greenlit.

---

**Stopping here as requested — nothing has been changed** (no code, no DNS, no Cloudflare
resources). Say "start W1" (or "W1+W2" once you've run `wrangler login`) and I'll begin.
