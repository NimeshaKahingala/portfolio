# Phase 4 — Contact Backend + Light-Theme Default (Plan)

> **Status: PLAN ONLY — not implemented.** Verified against current Cloudflare docs (July 2026).
> Two deliverables: (A) make light the default theme, (B) wire the contact form to a free, Cloudflare-native email backend that keeps the site on Pages.

---

## Part A — Default to light theme

Today the no-flash script in `src/layouts/Base.astro` picks the theme from `localStorage` **or the OS `prefers-color-scheme`**, so a visitor on a dark-mode OS lands on the dark site. Requirement: **default to light**; the toggle still works and still persists a user's choice.

**One-line change** (in the inline `<head>` script):

```diff
- var theme =
-   stored ||
-   (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
+ var theme = stored || "light";   // default light; honor a saved choice
```

Nothing else changes — dark mode remains fully available via the toggle, and a returning visitor who chose dark keeps it (`localStorage` still wins). Trivial, reversible, ~2 minutes.

*(Optional polish, not required): the two `<meta name="theme-color">` tags still follow the OS; can be simplified to a single light value. Cosmetic only — affects the mobile browser chrome bar, not the page.)*

---

## Part B — Contact form backend

### Goal
The form (already built in `ContactForm.astro`, currently POSTing to a non-existent `/api/contact`) should deliver each submission to Nimesha's inbox, with the visitor's address as **Reply-To** so she can reply directly. Must be **free** and must **keep the site on Cloudflare Pages**.

### Chosen approach (recommended): Pages Function → Cloudflare Email Service REST API + Turnstile

All Cloudflare-native, all on the free plan, no third-party account:

```
Browser (contact form)
  │  POST /api/contact  { name, email, message, company(honeypot), turnstileToken }
  ▼
Cloudflare Pages Function  (functions/api/contact.ts)
  │  1. reject if honeypot filled
  │  2. verify Turnstile token → challenges.cloudflare.com/turnstile/v0/siteverify   (free)
  │  3. server-side validate fields
  │  4. POST to Email Service REST API:
  │       api.cloudflare.com/client/v4/accounts/{id}/email/sending/send
  │       from: contact@nimeshakahingala.com   (a routing-domain address)
  │       to:   nimesha.isholi94@gmail.com      (VERIFIED destination → free)
  │       reply_to: <visitor's email>
  ▼
Nimesha's Gmail inbox
```

### Why this is free (the key fact)

Cloudflare Email **Sending** to *arbitrary* recipients needs the Workers Paid plan — **but sending to a _verified destination address_ in your own account is free on all plans, including the free plan, even when only Email Routing is configured**, and such sends do **not** count against any quota or daily limit. A contact form only ever mails Nimesha's own inbox, so it lands entirely inside that free carve-out.

> Sources: Email Service → Pricing ("Sends to verified destination addresses are free … on any plan"); Limits ("Sends to verified destination addresses are always free … they do not count toward your monthly quota or your daily sending limits, on any plan, including when only Email Routing is configured. … These limits apply to emails sent via the REST API, the Workers binding, and SMTP").

Turnstile is free and unlimited. Pages Functions are free (100k requests/day). **Net cost: $0.**

### Why the REST API (not the `send_email` binding)

The native `send_email` binding is a **Workers-only** feature — it is **not** in the Pages Functions supported-bindings list (which covers KV, R2, D1, Queues, Durable Objects, Hyperdrive, Vectorize, Service bindings, Analytics Engine, AI — but not email). Since we're keeping the site on **Pages**, we call the Email Service **REST API** instead, which is just an authenticated `fetch()` and works anywhere. Same free verified-destination rule applies.

### Files to add / change

| File | Change |
|---|---|
| `functions/api/contact.ts` | **New.** Pages Function: honeypot check → Turnstile siteverify → validation → Email Service REST send → typed JSON responses (`{ ok: true }` / `{ ok: false, error }`). Basic per-IP rate-limit via header check. |
| `src/components/ContactForm.astro` | Mount the Turnstile widget into the existing `[data-turnstile]` placeholder; include the token in the POST body. Success/loading/error states already exist. |
| `src/layouts/Base.astro` (or contact page) | Load the Turnstile script (`challenges.cloudflare.com/turnstile/v0/api.js`) **only on `/contact/`**. |
| `astro.config.mjs` | No change needed for static output; Pages serves `functions/` automatically. |
| `.dev.vars` (gitignored) | Local secrets for `wrangler pages dev` testing. |

### Environment variables (set in Pages project → Settings → Variables, for **Production and Preview**)

| Name | Type | Purpose |
|---|---|---|
| `CF_ACCOUNT_ID` | plaintext var | Account id for the Email Service REST URL |
| `CF_EMAIL_API_TOKEN` | **secret** | API token scoped to **Email Sending: Edit** |
| `TURNSTILE_SECRET_KEY` | **secret** | Server-side siteverify |
| `PUBLIC_TURNSTILE_SITE_KEY` | build-time public var | Rendered into the widget (safe to expose) |
| `CONTACT_TO` | var (optional) | `nimesha.isholi94@gmail.com` |
| `CONTACT_FROM` | var (optional) | `contact@nimeshakahingala.com` |

### Dashboard steps (need Nimesha / account access — one-time, ~15 min)

1. **Email Routing**: enable on `nimeshakahingala.com` (free; likely already on since DNS is at Cloudflare).
2. **Verify destination address**: add `nimesha.isholi94@gmail.com` as a destination address and click the verification link Cloudflare emails. *(This is what unlocks free sending.)*
3. *(Recommended for deliverability, still free)* **Onboard the sending domain** in Email Service → adds SPF/DKIM/DMARC records on the `cf-bounce` subdomain automatically. Improves inbox placement; not strictly required to send to a verified destination.
4. **API token**: create one with the **Email Sending: Edit** permission → store as `CF_EMAIL_API_TOKEN` secret.
5. **Turnstile**: create a widget (Managed/invisible) for `nimeshakahingala.com` (+ `localhost` for dev) → site key is public, secret key → `TURNSTILE_SECRET_KEY`.

### Testing

- Local: `wrangler pages dev dist` with `.dev.vars` → submit the form, confirm a real email arrives and Reply-To is the test address; confirm bad/missing Turnstile token and missing fields return proper errors surfaced in the UI (the error state is already wired and was verified in the Chrome audit).
- Preview deploy: Pages Functions run on branch previews with preview env vars — validate end-to-end there before merging.

### Fallbacks (only if a blocker appears)

- **If the REST `send` endpoint turns out to be plan-gated in practice** (docs say verified-destination sends are free on all plans, but if the account disagrees): deploy a **tiny standalone Worker** with the `send_email` binding (free to verified destinations) and have the Pages Function call it via a **Service binding**. Keeps the site on Pages; the Worker is a separate free deploy.
- **Third-party alternative**: **Resend** free tier (3,000 emails/month) via the same Pages Function — just swap the fetch target and use `RESEND_API_KEY`. Requires a Resend account + DKIM/SPF/DMARC DNS records. Reliable and well-documented, but adds a third party; only reach for it if the Cloudflare path is unexpectedly blocked.

### Cost summary

| Component | Plan | Cost |
|---|---|---|
| Pages Functions | Free (100k req/day) | $0 |
| Email Service → verified destination | Free on all plans | $0 |
| Turnstile | Free, unlimited | $0 |
| **Total** | | **$0** |

---

## What I need from Nimesha before implementing Part B

1. Confirm this Cloudflare-native approach (vs. Resend).
2. Account access to do the 5 dashboard steps above (or do them yourself and hand me the site key + confirm the secrets are set).
3. Confirm the destination inbox (`nimesha.isholi94@gmail.com`) and the from-address local part (`contact@`).

Part A (light default) needs nothing — it's ready to apply on your go.

---

**Stopping here as requested — no code has been written for either part.** Say the word and I'll implement Part A immediately and Part B once the dashboard prerequisites are in place.
