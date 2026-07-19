# Remaining Tasks

> Snapshot as of 2026-07-19, after the Cloudflare Pages → Workers migration.
> The site is **live on Cloudflare Workers at [nimesha.dev](https://nimesha.dev)** with the
> light theme default applied. The items below are what's left. Full context for the
> migration items is in [WORKERS_MIGRATION_PLAN.md](WORKERS_MIGRATION_PLAN.md) §6; the
> backend item is in [PHASE4_BACKEND_PLAN.md](PHASE4_BACKEND_PLAN.md).

Legend — **[manual]** you do it in the dashboard · **[code]** I can do it on request.

---

## 1. CI/CD — GitHub Actions — [manual: add 1 secret]

**Done in code:** a GitHub Actions workflow ([.github/workflows/deploy.yml](../.github/workflows/deploy.yml))
now builds on every push/PR to `main` and deploys to Cloudflare Workers on pushes to `main`.
See [CICD.md](CICD.md).

**Remaining manual step:** create a Cloudflare API token and add it as the GitHub repo secret
`CLOUDFLARE_API_TOKEN` (full steps in [CICD.md](CICD.md) §"One-time setup"). Until then, the
deploy step fails; local `npm run deploy` still works.

> Chose GitHub Actions over Cloudflare **Workers Builds** — do not enable both, or every push
> double-deploys.

---

## 2. `www` → apex 301 redirect — [manual]

`www.nimesha.dev` is currently unconfigured (no DNS record). Add a redirect so it forwards
to the bare domain.

1. Dashboard → **Rules** → **Redirect Rules** → **Create rule**.
   - When incoming requests match: `Hostname` `equals` `www.nimesha.dev`
   - Then: **Dynamic redirect** → Type `301` → Expression
     `concat("https://nimesha.dev", http.request.uri.path)` → **Preserve query string** on.
2. When prompted, let Cloudflare add the proxied `www` DNS record automatically (or add a
   proxied `CNAME www → nimesha.dev` first — the Redirect Rule intercepts at the edge, so the
   target is irrelevant).

**Why manual:** the Cloudflare MCP token lacks Rulesets/Page Rules permission (it returned
auth errors), so this can't be done via API. A proxied `www` record without the rule
produces a live 522, so don't add the DNS record on its own — create the rule in the same sitting.

**Low urgency:** every page emits `<link rel="canonical" href="https://nimesha.dev/…">`, so
search engines already consolidate on the apex.

---

## 3. Contact-form backend — [code] + [manual] · not built yet

The contact form (`src/components/ContactForm.astro`) posts to `/api/contact`, which **does
not exist yet** — submissions currently go nowhere. See
[PHASE4_BACKEND_PLAN.md](PHASE4_BACKEND_PLAN.md) for the full design (note: that doc predates
the Workers migration and needs a light revision).

Now that the site is on **Workers** (not Pages), this got simpler:

- Add a small Worker script (`main` + `ASSETS` binding) handling `POST /api/contact`, using
  the **native `send_email` binding** instead of the Email Service REST API workaround. Drops
  the `CF_ACCOUNT_ID` and `CF_EMAIL_API_TOKEN` secrets the Pages-based plan needed.
- Add [Turnstile](https://developers.cloudflare.com/turnstile/) (free) for spam protection.
- Correct all references from the old domain to **nimesha.dev** (from-address `contact@nimesha.dev`).

**[manual] one-time dashboard setup** (~15 min): enable **Email Routing** on `nimesha.dev`,
**verify `nimesha.isholi94@gmail.com` as a destination address** (this unlocks free sending),
create a **Turnstile** widget, and create the Worker secrets. *Email Routing config also hits
the MCP token's permission gap, so these steps are dashboard-only.*

**Cost:** $0 — sends to a verified destination address are free on all plans; Turnstile and
Worker requests are free-tier.

---

## 4. (Optional) Web Analytics — [manual]

The old Pages project auto-injected a Web Analytics beacon that was removed when the project
was deleted. To re-enable: Dashboard → **Analytics & Logs** → **Web Analytics** → add
`nimesha.dev` (free; auto-injection works because the zone is proxied). Historical Pages
analytics data is not carried over.

---

## Cleanup note

The old React `main` is preserved at branch **`backup-main-pre-revamp`** (`27db228`, on
origin) as a rollback reference. Safe to delete once you're confident in the new site.
