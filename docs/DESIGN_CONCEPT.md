# UI/UX Design Concept — nimeshakahingala.com

> Companion to `REVAMP_PLAN.md`. This is the exact visual and interaction spec the rebuild follows.
> Concept status: **APPROVED** (2026-07-18, via rendered mockup). Accent locked: **Blue** (`#2563eb` light / `#60a5fa` dark) — teal/violet/amber variants were reviewed and rejected. This doc is the source of truth for all styling decisions.

---

## 1. The Concept: "Quiet Confidence"

A portfolio for a developer is judged twice: once as a résumé, once as a work sample. The site itself must *demonstrate* craft — speed, typography, restraint — rather than claim it with badges and stat counters.

**Design personality:** editorial-minimal, typography-led, technically warm.
Think of it as a well-set article about a person, not a landing page selling a service.

Five rules that settle every future styling argument:

1. **Type over decoration.** Hierarchy comes from font size/weight/spacing, never from boxes, borders or emoji. If a section needs a decoration to look "designed", the typography is wrong.
2. **One accent, everywhere else neutral.** Blue appears only on: links, primary CTA, focus rings, active states, small eyebrow labels. Never as large background fills.
3. **Whitespace is the layout.** Sections separated by space and a change in type scale — not by alternating background colors (the current site alternates section backgrounds; the new one does this at most once per page).
4. **Real artifacts.** Real photo, real project screenshots, real brand SVG logos. No emoji-as-icon, no progress bars, no invented stats.
5. **Motion is a whisper.** Nothing moves unless it helps comprehension (reveal on scroll, state feedback). Max 1 concurrent animation type per viewport.

### Modern conventions we adopt (2026) — and those we deliberately skip

| Adopt | Skip (and why) |
|---|---|
| Oversized fluid display type in hero | Bento grids — good for products with many features, noisy for a 7-project portfolio |
| Subtle grain/dot texture on hero background (CSS only) | Glassmorphism panels — dated on content sites, hurts contrast |
| View Transitions between pages | 3D / WebGL / cursor-follow effects — heavy JS, contradicts the performance story |
| System-default dark mode, first-class both themes | AI chat widgets / gimmick interactivity |
| Monospace accents for "technical" flavor (labels, meta, numbers) | Full-viewport scroll-jacking / horizontal scroll sections |
| Marquee-free logo/tech strip (static, wraps) | Auto-playing carousels |

---

## 2. Design Tokens

All tokens are CSS custom properties declared in Tailwind v4 `@theme`. Values below are final unless contrast testing forces a tweak.

### 2.1 Color

Neutral scale is **slate** (cool, matches the blue accent). Accent is the heritage blue, kept.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#0b1120` | page background |
| `--color-bg-subtle` | `#f8fafc` | `#111a2e` | alternate section, cards on hover |
| `--color-surface` | `#ffffff` | `#151f35` | cards, form inputs, header (with blur) |
| `--color-border` | `#e2e8f0` | `#24304a` | hairlines, card borders, dividers |
| `--color-text` | `#0f172a` | `#e8edf6` | headings, primary text |
| `--color-text-muted` | `#475569` | `#94a3b8` | body copy, descriptions |
| `--color-text-faint` | `#94a3b8` | `#64748b` | meta labels, timestamps, captions |
| `--color-accent` | `#2563eb` | `#60a5fa` | links, CTA, active nav, focus |
| `--color-accent-strong` | `#1d4ed8` | `#93c5fd` | link hover, CTA hover |
| `--color-accent-tint` | `#eff6ff` | `#1a2b4d` | chip backgrounds, subtle highlights |
| `--color-success` | `#16a34a` | `#4ade80` | form success, availability dot |
| `--color-error` | `#dc2626` | `#f87171` | form validation |

Rules:
- Dark bg is **deep navy-slate, not pure black** — pure black + white text causes halation; navy keeps brand warmth.
- Every text/background pair must pass **WCAG AA (4.5:1)**; `--color-text-faint` is only for ≥ 14px non-essential text.
- Accent on dark shifts *lighter* (`#60a5fa`) — the light-mode blue fails contrast on navy.

### 2.2 Typography

Self-hosted variable fonts (`@fontsource-variable`):

| Role | Font | Why |
|---|---|---|
| Display / headings | **Space Grotesk** | Geometric with quirky details — technical personality without being cold |
| Body / UI | **Inter** | Screen-optimized workhorse, pairs cleanly |
| Mono accents | **JetBrains Mono** (subset, optional) | Eyebrow labels, project meta (`role`, `year`, tech tags) — the "developer texture" of the design. If budget-conscious on font bytes, fallback `ui-monospace` stack is acceptable. |

**Fluid scale** (clamp between 360px and 1280px viewport — one scale, no per-breakpoint font overrides):

| Token | Size (fluid) | Font / weight | Usage |
|---|---|---|---|
| `display` | clamp(2.5rem, 1.5rem + 5vw, 4.5rem) | Space Grotesk 600, line-height 1.05, tracking −0.02em | Hero name only |
| `h1` | clamp(2rem, 1.4rem + 2.5vw, 3rem) | Space Grotesk 600, lh 1.1 | Page titles |
| `h2` | clamp(1.5rem, 1.2rem + 1.5vw, 2rem) | Space Grotesk 600, lh 1.2 | Section headings |
| `h3` | 1.25rem | Space Grotesk 500 | Card titles |
| `body-lg` | 1.125rem | Inter 400, lh 1.7 | Hero intro, About bio |
| `body` | 1rem | Inter 400, lh 1.65 | Default |
| `small` | 0.875rem | Inter 400/500 | Meta, captions, footer |
| `eyebrow` | 0.8125rem | Mono 500, uppercase, tracking +0.08em, accent color | Section labels ("Selected work", "About") |

Rules:
- Reading measure: body text containers max **65ch**.
- No font weight above 600 anywhere (current site uses up to 900 — part of why it feels shouty).
- `<strong>` only for genuine emphasis in prose — never around keywords.

### 2.3 Space, radius, elevation

- **Spacing:** Tailwind default 4px scale. Section vertical rhythm: `py-20 md:py-28` (80/112px). Between heading and content: 40px. Card padding: 24px.
- **Radius:** `--radius-sm: 6px` (chips, inputs), `--radius-md: 12px` (cards, images), `--radius-lg: 20px` (hero photo, lightbox). Nothing fully-rounded except the availability dot and tag chips.
- **Elevation:** borders over shadows. Default card = `1px solid var(--color-border)`, flat. On hover: border → accent-tint, translateY(−2px), plus one soft shadow `0 8px 24px rgb(2 6 23 / 0.06)` (light) / `0 8px 24px rgb(0 0 0 / 0.4)` (dark). Shadows never used at rest — this keeps the page calm and makes hover feedback obvious.
- **Hero texture:** faint dot grid (`radial-gradient` background-image, 24px cell, 1px dots at 4% opacity) fading out with a mask toward the bottom. The only decorative element in the design.

### 2.4 Grid & breakpoints

- Container: `max-width: 1152px` (Tailwind `max-w-6xl`), side padding `px-5 sm:px-8`.
- Breakpoints (Tailwind defaults): `sm 640` · `md 768` · `lg 1024` · `xl 1280`.
- **Mobile-first**: every component is styled for 360px first; `md:`/`lg:` prefixes add columns. Design must be verified at 360, 390, 768, 1024, 1440.

---

## 3. Component Specs

### 3.1 Header (one component, all viewports)

Sticky, `backdrop-blur` over page bg at 85% opacity, bottom hairline appears only after scroll (subtle "lift" cue).

```
Desktop (≥768px)
┌────────────────────────────────────────────────────────────┐
│  NK·  Nimesha Kahingala      Work  About  Writing  Contact  ◐ │
└────────────────────────────────────────────────────────────┘
```
- Left: monogram + name (Space Grotesk 500), links to `/`.
- Right: 4 links + theme toggle. Active link = accent color + 2px underline offset 6px. Hover = text color darkens, underline fades in.
- Nav labels are human: **Work, About, Writing, Contact** (not "Portfolio Projects").

```
Mobile (<768px)                    Menu open (overlay)
┌──────────────────────┐           ┌──────────────────────┐
│  NK·          ◐   ≡  │           │  NK·          ◐   ✕  │
└──────────────────────┘           │                      │
                                   │   Work               │
                                   │   About              │
                                   │   Writing            │
                                   │   Contact            │
                                   │   ───────────        │
                                   │   in · md · gh · ✉   │
                                   └──────────────────────┘
```
- Hamburger is a real `<button aria-expanded>`; menu is a full-screen overlay (not a cramped dropdown), links at `h2` size, staggered 30ms fade-in, socials at bottom. Body scroll locked while open. ESC and backdrop close it.
- Touch targets ≥ 44×44px.

### 3.2 Buttons

| Variant | Style | Usage (max 1 primary per viewport) |
|---|---|---|
| Primary | Accent bg, white text, radius-sm, `px-6 py-3` | "View work", form submit |
| Secondary | Transparent, 1px border, text color | "Get in touch", "Download résumé" |
| Link-arrow | Text + `→` that nudges 4px right on hover | "All projects", card links |

Focus: 2px accent ring, 2px offset, on `:focus-visible` only — same treatment on every interactive element sitewide.

### 3.3 Project card

```
┌───────────────────────┐
│ [screenshot 16:10]    │   image: radius-md top, subtle zoom-on-hover (scale 1.03, 400ms)
│                       │
│ MillionSpaces         │   h3
│ Workspace booking     │   1-line description, text-muted, truncated
│ platform…             │
│ React · AntD · Maps   │   tech chips: mono small, accent-tint bg, max 3 + "+2"
└───────────────────────┘
```
- Whole card is one `<a>` to the detail page (no separate "view" button).
- Hover: lift (per §2.3) + image zoom. Featured cards on Home are identical to Portfolio cards — one component.

### 3.4 Tech stack strip / skills grid

- **Home (strip):** single row of brand SVG icons (React, TypeScript, Vue, Node, PostgreSQL, MongoDB, AWS, Docker…), 28px, monochrome `currentColor` at text-faint, brand-color on hover, wraps on mobile. A quiet "I speak your stack" signal — no headings per group, no percentages.
- **About (grid):** 2×2 (mobile 1-col) categorized card-less lists: category as eyebrow, then icon + name rows.

### 3.5 Timeline (About)

Single vertical line (2px, border color), dot at each entry (accent for current role), entries: mono year range → role + company (h3) → 1–2 line summary. Experience and education in one continuous timeline, newest first — not two separate sections.

### 3.6 Forms (Contact)

- Inputs: surface bg, 1px border, radius-sm, `px-4 py-3`, label above (small, 500). Focus: accent border + ring. Error: error-color border + message below with icon, announced via `aria-live`.
- Submit button shows inline spinner + disabled during send; success replaces the form with a confirmation panel (✓, "Thanks — I'll reply within a day or two", "Send another" link). No toasts that vanish before being read.
- Turnstile widget above submit; invisible mode preferred.

### 3.7 Footer

```
┌────────────────────────────────────────────────────────────┐
│  NK·                                                       │
│  Full Stack Developer · Colombo, Sri Lanka                 │
│                                                            │
│  Work   About   Writing   Contact        in  md  gh  ✉     │
│  ──────────────────────────────────────────────────────    │
│  © 2026 Nimesha Kahingala        Built with Astro · Source │
└────────────────────────────────────────────────────────────┘
```
Mobile: stacks to one column, socials as a row of 44px icon buttons.

### 3.8 Lightbox (project galleries)

Native `<dialog>`: dark scrim (80%), image at max 90vw/85vh radius-lg, caption below, ✕ top-right, prev/next arrows (also ← → keys), ESC/backdrop closes. Focus trapped by `<dialog>` semantics for free.

---

## 4. Page Blueprints

### 4.1 Home

```
Desktop                                     Mobile
┌──────────────────────────────────────┐    ┌──────────────────┐
│ HERO  (dot-grid texture, ~80vh)      │    │ [photo, 96px ○]  │
│                                      │    │ HI, I'M          │
│  HI, I'M                    ┌──────┐ │    │ Nimesha          │
│  Nimesha Kahingala          │photo │ │    │ Kahingala        │
│  (display type)             │ 320px│ │    │ Full Stack Dev…  │
│  Full Stack Developer —     │ r-lg │ │    │ intro sentence   │
│  I build fast, reliable     └──────┘ │    │                  │
│  web apps end to end.                │    │ [View work]      │
│  ● Available for projects            │    │ [Get in touch]   │
│  [View work]  [Get in touch]         │    ├──────────────────┤
├──────────────────────────────────────┤    │ SELECTED WORK    │
│ SELECTED WORK              All →     │    │ [card]           │
│ [card]      [card]      [card]       │    │ [card]           │
├──────────────────────────────────────┤    │ [card]           │
│ TOOLS I WORK WITH                    │    ├──────────────────┤
│  ⚛ TS V ⬡ 🐘 M AWS 🐳  (icon strip)  │    │ icon strip wraps │
├──────────────────────────────────────┤    ├──────────────────┤
│ "Have a project in mind?"            │    │ CTA + button     │
│ [Get in touch]                       │    ├──────────────────┤
└──────────────────────────────────────┘    │ FOOTER           │
```
- Hero copy: greeting eyebrow (mono), display name, **one honest sentence** of positioning, availability badge (green dot + "Available for projects"), two CTAs. No stats, no cert badges, no orbiting anything.
- Photo: rectangle radius-lg with slight accent-tint border glow — not a circle avatar (circles read "profile", rectangles read "editorial").
- Everything above the fold on a 390px phone: photo (smaller, circular crop acceptable on mobile), name, sentence, CTAs.

### 4.2 About

```
Desktop                                     Mobile: photo top (full-
┌──────────────────────────────────────┐    width, 4:3), then bio,
│ ABOUT (eyebrow) + h1                 │    facts, skills (1-col),
│ ┌────────┐  Bio: 3 short paragraphs  │    timeline, certs, CTA —
│ │ photo  │  (body-lg, 65ch)          │    all stacked.
│ │ 4:5    │  quick-facts (mono):      │
│ └────────┘  📍 Colombo · N yrs · ✉   │
├──────────────────────────────────────┤
│ SKILLS — 2×2 categorized icon lists  │
├──────────────────────────────────────┤
│ EXPERIENCE & EDUCATION — timeline    │
├──────────────────────────────────────┤
│ CERTIFICATIONS — text rows (name ·   │
│ issuer · year, link if verifiable)   │
├──────────────────────────────────────┤
│ [Download résumé (PDF, 68KB)]        │
└──────────────────────────────────────┘
```

### 4.3 Portfolio (grid)

- h1 + one-line intro, filter chips (`All · React · Vue · Full Stack`) — chips are buttons with `aria-pressed`, filtering hides/shows cards via `data-tech` (10 lines of JS), animated with `view-transition`/FLIP-lite fade only.
- Grid: `1 / 2 / 3` columns at `base / md / lg`. Gap 24px.
- URL keeps `/portfolio/` (SEO equity).

### 4.4 Project detail (`/portfolio/[slug]/`)

```
Desktop                                     Mobile: meta panel moves
┌──────────────────────────────────────┐    above the fold content,
│ ← All work (link-arrow, mono)        │    2-col meta grid, then
│ MillionSpaces (h1)                   │    hero image, sections
│ One-line summary (body-lg, muted)    │    stacked.
│ [hero screenshot 16:9, radius-md]    │
│ ┌─────────────┐  ┌─────────────────┐ │
│ │ META (mono) │  │ ABOUT THE       │ │
│ │ Role        │  │ PROJECT (prose) │ │
│ │ Year        │  │                 │ │
│ │ Stack chips │  │ WHAT I DID      │ │
│ │ [Visit ↗]   │  │ • bullet        │ │
│ └─────────────┘  │ • bullet        │ │
│    (sticky)      └─────────────────┘ │
├──────────────────────────────────────┤
│ GALLERY — 2-up thumbs → lightbox     │
├──────────────────────────────────────┤
│ ← Prev project      Next project →   │
└──────────────────────────────────────┘
```
- The current `responsibilities` paragraphs get rewritten as 3–6 scannable bullets each during content migration.

### 4.5 Writing (blog)

- h1 + "I write about web development on Medium."
- Article cards: thumbnail (from RSS), title, date + reading time (mono), external-link arrow. 1-col mobile / 2-col md.
- Footer of section: secondary button "Follow on Medium ↗". With only 1–2 posts the layout still reads intentional (cards left-aligned, no empty placeholders).

### 4.6 Contact

```
Desktop: 2 columns (5/7 split)              Mobile: pitch → form
┌───────────────┬──────────────────────┐
│ CONTACT       │  Name    [———————]   │
│ h1 + pitch    │  Email   [———————]   │
│               │  Message [———————]   │
│ ✉ email row   │          [———————]   │
│ ● Available…  │  (Turnstile)         │
│ in · md · gh  │  [Send message]      │
└───────────────┴──────────────────────┘
```
- Email address shown as plain copyable text row with a copy-button — some visitors will never use a form.

### 4.7 404

Centered: mono `404` eyebrow, h1 "This page doesn't exist.", one line of humor kept professional, links: Home / Work. No search, no gimmicks.

---

## 5. Motion Spec

| Interaction | Behavior | Duration / easing |
|---|---|---|
| Scroll reveal | `opacity 0→1` + `translateY 16px→0`, once, IntersectionObserver at 20% visibility; siblings stagger 60ms, cap 3 | 500ms `cubic-bezier(0.22,1,0.36,1)` |
| Page navigation | Astro View Transitions: cross-fade + 8px slide; header persists | 250ms |
| Card hover | lift −2px + border tint + image scale 1.03 | 250ms ease-out |
| Link-arrow hover | arrow translateX 4px | 200ms |
| Theme switch | background/text color cross-fade | 200ms, no per-element transition (avoids waterfall) |
| Mobile menu | overlay fade + links stagger 30ms | 250ms |
| Lightbox | scale 0.96→1 + fade | 200ms |
| Form submit | button spinner; success panel fades in | — |

Global: `@media (prefers-reduced-motion: reduce)` → all transitions ≤ 1ms, reveals render visible immediately, View Transitions disabled. **No parallax, no scroll-jacking, no marquees, no typing-effect headline.**

---

## 6. Responsive Rules (mobile ≈ 60%+ of traffic — treat as primary)

| Aspect | Rule |
|---|---|
| Authoring | Mobile-first CSS; `md:`/`lg:` add columns, never hide content. The two-headers-hidden-by-CSS pattern is banned. |
| Type | Fluid clamp() scale only — no breakpoint font-size overrides needed |
| Grids | Cards `1→2→3` cols; About/Contact split `1→2` at `md` |
| Nav | Overlay menu < 768px; inline links ≥ 768px (same component) |
| Touch | All targets ≥ 44×44px; hover effects paired with visible focus/active states; no hover-only information |
| Images | `<Image>` with `sizes` per slot — card `(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw`; hero photo fixed widths 320/240/96; galleries lazy |
| Sticky elements | Header sticky everywhere; project-detail meta panel sticky only ≥ `lg` |
| Safe areas | `env(safe-area-inset-*)` padding on header/footer for notched phones |
| Test matrix | 360, 390 (primary), 768, 1024, 1440 · iOS Safari + Android Chrome + desktop trio |

---

## 7. Accessibility Checklist (built-in, not bolted on)

- Semantic landmarks: `header/nav/main/footer`, one `h1` per page, skip-to-content link.
- All interactive elements are `<button>`/`<a>` (fixes current div-onClick toggles); `aria-expanded` on hamburger, `aria-pressed` on filter chips, `aria-live="polite"` on form status.
- Contrast: AA for all text (§2.1); icons paired with text or `aria-label`.
- Keyboard: full tab order, `:focus-visible` rings everywhere, lightbox uses native `<dialog>` focus trap, ESC closes menu/lightbox.
- Forms: `<label for>` on every field, errors linked via `aria-describedby`, autocomplete attributes (`name`, `email`).
- Theme toggle announces state ("Switch to dark theme").

---

## 8. Asset Production List

| Asset | Spec | Status |
|---|---|---|
| Profile photo | From `me2.jpg` (or newer — pending Nimesha), export 640w + 320w + 192w AVIF/WebP | pending choice |
| Project screenshots | Recrop all to 16:10 (cards) + originals for galleries; AVIF/WebP via Astro | have sources |
| OG image | 1200×630: dark navy bg, dot texture, name + title set in Space Grotesk, accent underline | **missing today — must create** |
| Favicon | "NK·" monogram SVG (Space Grotesk), + 192/512 PNG, maskable icon for manifest | replace CRA defaults |
| Résumé | Single `resume.pdf` (from `cv2.pdf`), linked with file size shown | rename/copy |
| Brand icons | `simple-icons` via astro-icon (react, typescript, vuedotjs, nodedotjs, express, postgresql, mongodb, redis, amazonwebservices, docker, git, tailwindcss, nuxt, d3dotjs) | build-time |
| Social icons | Lucide (mail) + simple-icons (linkedin, medium, github) | build-time |

---

## 9. Definition of "Looks Done"

The revamp ships only when all of these hold on the preview URL:

1. Lighthouse mobile: Performance ≥ 95, A11y ≥ 95, SEO = 100.
2. Every page passes the 360px width test with no horizontal scroll and no truncated tap targets.
3. Dark and light mode both look *designed* (not inverted) — checked page by page.
4. Keyboard-only walkthrough: can reach and operate menu, theme toggle, filters, lightbox, form.
5. The word-level content audit is clean: no `<strong>` keyword wrappers, one consistent experience figure, no emoji icons, "SquadGurus" spelled correctly.
6. Social share preview (LinkedIn/WhatsApp) renders the new OG image on every route.
