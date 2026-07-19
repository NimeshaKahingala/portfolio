# CI/CD — GitHub Actions → Cloudflare Workers

The site deploys automatically via GitHub Actions ([.github/workflows/deploy.yml](../.github/workflows/deploy.yml)).

## What it does

| Trigger | Build | Deploy |
|---|---|---|
| Push to `main` | ✅ | ✅ `wrangler deploy` |
| Pull request → `main` | ✅ (validation) | ❌ |
| Manual (`workflow_dispatch`) | ✅ | ✅ |

- Node version comes from [.nvmrc](../.nvmrc) (22).
- `npm ci` → `npm run build` (Astro) → `npx wrangler deploy` (uploads `dist` per
  [wrangler.jsonc](../wrangler.jsonc)).
- Uses the wrangler pinned in `devDependencies`, so CI and local deploys use the same version.
- The account id lives in `wrangler.jsonc`, so the only secret needed is the API token.
- Concurrent runs on the same branch cancel the older run.

## One-time setup (manual — required before the first push deploy works)

### 1. Create a Cloudflare API token

1. Cloudflare dashboard → **My Profile** → **API Tokens** → **Create Token**.
2. Use the **Edit Cloudflare Workers** template.
3. Scope **Account Resources** to `Nimesha.isholi94@gmail.com's Account` and **Zone
   Resources** to `nimesha.dev` (or All zones).
4. Create and **copy the token** (shown once).

### 2. Add it as a GitHub repository secret

- GitHub → repo **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
- Name: `CLOUDFLARE_API_TOKEN` · Value: the token from step 1.

Optionally, with the `gh` CLI:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo NimeshaKahingala/portfolio
# paste the token when prompted
```

That's it — the next push to `main` builds and deploys automatically. Trigger a test run any
time from the repo's **Actions** tab (**Deploy** workflow → **Run workflow**).

## Note: don't also enable Workers Builds

Since deploys now run through GitHub Actions, **do not** also connect Cloudflare **Workers
Builds** for this repo — both would fire on every push and double-deploy. Pick one; this repo
uses GitHub Actions.

## Local manual deploy (fallback)

Still available if you ever need it (requires `npx wrangler login` once):

```bash
npm run deploy   # astro build && wrangler deploy
```
