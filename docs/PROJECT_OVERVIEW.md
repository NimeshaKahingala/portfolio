# Project Overview & Structure

> **Project**: Personal Portfolio Website for Nimesha Kahingala  
> **Domain**: [nimeshakahingala.com](https://nimeshakahingala.com)  
> **Last Evaluated**: July 2026

---

## Quick Reference

| Attribute | Value |
|---|---|
| **Framework** | React 18.2.0 (Create React App) |
| **Styling** | SCSS + CSS Variables + Tailwind CSS (mixed) |
| **Routing** | react-router-dom v6 (BrowserRouter) |
| **UI Library** | Ant Design (antd) v5 — used only for Modal |
| **SEO** | react-helmet + JSON-LD structured data |
| **Analytics** | Vercel Analytics + Speed Insights |
| **Hosting** | Vercel |
| **Node Version** | Not pinned |

---

## Directory Structure

```
portfolio/
├── public/
│   ├── index.html          # HTML template with SEO meta tags + JSON-LD schema
│   ├── favicon.ico
│   ├── logo192.png         # Default CRA logo (not customized)
│   ├── logo512.png         # Default CRA logo (not customized)
│   ├── manifest.json       # PWA manifest (uses CRA defaults)
│   ├── robots.txt          # SEO: sitemap reference + crawl-delay
│   └── sitemap.xml         # Static sitemap (5 pages)
│
├── src/
│   ├── App.js              # Root: scroll-to-top + Analytics + Header + Main
│   ├── App.css             # Global design system (CSS vars, utilities, animations)
│   ├── index.js            # Entry point: BrowserRouter wrapper
│   ├── index.css           # Base body styles
│   │
│   ├── components/
│   │   ├── header.js       # Dual header: Mobile (hamburger) + Desktop (sidebar)
│   │   ├── header.scss     # Header/sidebar styles
│   │   ├── nav.js          # Navigation links with active state detection
│   │   ├── nav.scss        # Navigation styles
│   │   ├── main.js         # React Router <Routes> definitions (all 5 routes)
│   │   ├── data.js         # Project data array (PROJECTS[]) — portfolio content
│   │   ├── SEOHelmet.js    # Reusable SEO component (currently unused)
│   │   ├── FAQ.js          # FAQ accordion component (currently commented out)
│   │   ├── FAQ.scss        # FAQ styles
│   │   ├── blogCard.js     # Single hardcoded blog card (JWT article)
│   │   ├── blogCard.scss   # Blog card styles
│   │   ├── portfolioModal.js  # Modal content for project detail view
│   │   ├── portfolioModal.scss
│   │   ├── progressBar.js  # Animated skill progress bar
│   │   ├── progressBar.scss
│   │   └── footer.js       # Empty file (0 bytes)
│   │
│   ├── pages/
│   │   ├── home.js + home.scss         # Landing: hero, tech stack, social links
│   │   ├── about.js + about.scss       # Bio, skills progress bars, timeline
│   │   ├── portfolio.js + portfolio.scss # Project grid with filter + modal
│   │   ├── blog.js + blog.scss         # Blog listing (1 article + placeholder)
│   │   └── contact.js + contact.scss   # Contact form + social + availability
│   │
│   └── images/             # 28 files: photos, screenshots (PNG/JPG), icons (SVG), PDFs
│
├── package.json
├── tailwind.config.js      # Minimal Tailwind config
├── README.md               # Default CRA readme (not customized)
└── .gitignore
```

---

## Architecture & Data Flow

```
index.js (BrowserRouter)
  └── App.js (Analytics, SpeedInsights, scroll-to-top on route change)
        ├── Header (dual: mobile hamburger + desktop sidebar)
        │     └── Nav (Link components with active state via useLocation)
        └── Main (Routes)
              ├── /           → Home     (hero, stats, certifications, tech stack, socials)
              ├── /about      → About    (profile, info cards, skills, timeline)
              ├── /portfolio  → Portfolio (filter, project grid, antd Modal → PortfolioModal)
              ├── /blog       → Blog     (BlogCard, coming soon placeholder)
              └── /contact    → Contact  (form, contact methods, social links, availability)
```

### Key Architectural Patterns

- **Routing**: Client-side SPA routing via `react-router-dom` v6, `BrowserRouter`
- **State Management**: Local component state only (`useState`), no global state (Redux/Context)
- **Styling**: Mixed approach — per-component SCSS files + global CSS custom properties in `App.css` + Tailwind utility imports
- **SEO**: Per-page `<Helmet>` meta tags, plus global JSON-LD Person schema in `index.html`
- **Navigation Layout**: Desktop uses a persistent left sidebar (280px); Mobile uses top hamburger menu
- **Theme System**: Light/dark mode toggled via `data-theme` attribute on `<html>`, persisted to `localStorage`
- **Data**: Portfolio project entries stored as a static array in `components/data.js`
- **Analytics**: Vercel Analytics and Speed Insights components rendered in `App.js`

---

## Routes

| Path | Component | Page Title |
|---|---|---|
| `/` | `Home` | Nimesha Kahingala - Full Stack Developer |
| `/about` | `About` | About Nimesha Kahingala - Full Stack Developer |
| `/portfolio` | `Portfolio` | Portfolio - Full Stack Projects by Nimesha Kahingala |
| `/blog` | `Blog` | Blog - Full Stack Development Articles |
| `/contact` | `Contact` | Contact Nimesha Kahingala - Hire Full Stack Developer |
| `/*` | _(none — missing)_ | No 404 handler exists |

---

## Dependency Map

### Runtime Dependencies (`dependencies`)

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.2.0 | Core framework |
| `react-dom` | ^18.2.0 | DOM rendering |
| `react-helmet` | ^6.1.0 | Dynamic `<head>` management for SEO |
| `antd` | ^5.14.2 | UI library — only `Modal` is used |
| `sass` | ^1.71.0 | SCSS compilation |
| `@vercel/analytics` | ^1.3.1 | Page view analytics |
| `@vercel/speed-insights` | ^1.0.11 | Performance metrics |
| `@fortawesome/fontawesome-svg-core` | ^6.5.1 | Icon library — **never imported** |
| `web-vitals` | ^2.1.4 | Core Web Vitals reporting |
| `react-scripts` | 5.0.1 | CRA build tooling |

### Dev Dependencies (`devDependencies`)

| Package | Version | Purpose | Issue |
|---|---|---|---|
| `tailwindcss` | ^3.4.1 | Utility CSS framework | Imported but barely used |
| `react-router-dom` | ^6.22.1 | Client-side routing | **⚠️ Should be in `dependencies`** |

---

## Design System (CSS Custom Properties)

Defined in `src/App.css`:

```css
:root {
  --primary-color: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary-color: #64748b;
  --accent-color: #06b6d4;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --border-color: #e2e8f0;
  --shadow-sm/md/lg/xl: ...
  --radius-sm/md/lg/xl: ...
}

[data-theme="dark"] {
  --primary-color: #3b82f6;
  --text-primary: #f8fafc;
  --bg-primary: #0f172a;
  /* ... overrides for dark mode */
}
```

### Global Utility Classes

- `.btn`, `.btn-primary`, `.btn-secondary` — Button styles
- `.card` — Card with hover elevation
- `.container` — Max-width 1200px centered
- `.section`, `.section-sm` — Vertical section padding
- `.text-gradient` — Gradient text effect
- `.backdrop-blur` — Glassmorphism backdrop
- `.animate-fade-in-up`, `.animate-fade-in`, `.animate-slide-in-left/right` — Entry animations

---

## Image Assets Summary

The `src/images/` directory contains **28 files (~13MB total)**:

| Category | Files | Notes |
|---|---|---|
| Profile photos | `Nimesha.jpeg`, `me2.jpg` | `me2.jpg` is the one in use |
| Project screenshots | 17 PNG/JPG files | Many are 1-2MB each |
| Social/UI icons | 4 SVG files | `linkedin.svg`, `medium.svg`, `facebook-square.svg`, `envelope-solid.svg`, `arrow_right.svg` |
| Resume/CV | `cv.pdf`, `cv2.pdf` | `cv2.pdf` is the one imported |

---

## Related Documentation

- [Critical Fixes](./CRITICAL_FIXES.md) — Bugs that must be fixed immediately
- [Performance Audit](./PERFORMANCE_AUDIT.md) — Performance issues and optimization recommendations
- [Design Improvements](./DESIGN_IMPROVEMENTS.md) — Architecture and UX improvement suggestions
- [Code Cleanup](./CODE_CLEANUP.md) — Dead code, unused files, naming conventions
