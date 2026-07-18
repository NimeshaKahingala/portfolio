# Performance Audit

> Issues affecting page load speed, bundle size, and Core Web Vitals.

---

## 1. 🔴 Enormous Image Assets (~13MB Total)

**Impact**: Severely degrades initial load time and Largest Contentful Paint (LCP)

The `src/images/` directory contains **28 files totaling ~13MB**. Many project screenshots are 1-2MB uncompressed PNGs. All images are bundled by Webpack via JavaScript imports in `data.js`, meaning they are part of the build output.

### Largest Offenders

| Image | Size | Used In |
|---|---|---|
| `ms2.PNG` | 2.07 MB | data.js (MillionSpaces) |
| `millionSpaces.png` | 1.85 MB | data.js (MillionSpaces) |
| `ms1.PNG` | 1.84 MB | data.js (MillionSpaces) |
| `banyan1.PNG` | 1.73 MB | data.js (Banyan Restaurant) |
| `ceyphire.png` | 1.10 MB | data.js (Ceyphire) |
| `golden-gate2.PNG` | 1.05 MB | data.js (Golden Gate) |
| `sg1.PNG` | 588 KB | data.js (SquadGurus) |
| `ceyphire2.png` | 550 KB | data.js (Ceyphire) |
| `goldenGate.PNG` | 445 KB | data.js (Golden Gate) |
| `helpfulEng.png` | 469 KB | data.js (Helpful Engineering) |

### Recommendations

1. **Convert all PNGs to WebP format** — typically 60-80% smaller with equal quality
2. **Generate responsive sizes** — create thumbnail (~400px wide) and full-size variants
3. **Lazy load modal images** — only load `otherImages` when the modal opens, not on page load
4. **Use Vercel Image Optimization** — Vercel provides built-in image optimization at the edge
5. **Move large images to `/public`** or a CDN — avoid Webpack bundling them into JS chunks

### Expected Savings

| Format | Estimated Total Size | Savings |
|---|---|---|
| Current (PNG/JPG) | ~13 MB | — |
| WebP conversion | ~3-4 MB | ~70% |
| WebP + thumbnails | ~1.5-2 MB | ~85% |

---

## 2. 🟡 Ant Design Bundle Bloat

**Impact**: Adds ~200-300KB gzipped to the JavaScript bundle

The entire `antd` v5 library is listed as a dependency, but only the `<Modal>` component is used (in `portfolio.js`). Even with tree-shaking, antd's CSS-in-JS runtime adds significant overhead.

### Current Usage
```javascript
// portfolio.js — the ONLY antd import in the entire project
import { Modal } from 'antd';
```

### Alternatives (Pick One)

| Option | Bundle Size | Effort |
|---|---|---|
| Custom CSS modal | ~0 KB (just CSS) | Medium |
| `@headlessui/react` Dialog | ~3 KB gzipped | Low |
| `react-modal` | ~5 KB gzipped | Low |
| HTML `<dialog>` element | ~0 KB (native) | Low |
| Keep antd but verify tree-shaking | ~50-100 KB | Low |

### Recommendation
Build a custom modal using the native HTML `<dialog>` element or a lightweight library. The existing `portfolioModal.scss` already has all the layout styles — only the backdrop and open/close logic needs replacing.

---

## 3. 🟡 No Code Splitting

**Impact**: All 5 pages load upfront, increasing initial bundle size

Currently, all page components are eagerly imported in `main.js`:

```javascript
// Current — everything loads at once
import Homepage from "../pages/home";
import AboutPage from "../pages/about";
import Portfolio from "../pages/portfolio";
import Blog from "../pages/blog";
import Contact from "../pages/contact";
```

### Recommended Fix

Use `React.lazy()` and `Suspense` for route-based code splitting:

```javascript
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Homepage = React.lazy(() => import("../pages/home"));
const AboutPage = React.lazy(() => import("../pages/about"));
const Portfolio = React.lazy(() => import("../pages/portfolio"));
const Blog = React.lazy(() => import("../pages/blog"));
const Contact = React.lazy(() => import("../pages/contact"));

function Main() {
    return (
        <Suspense fallback={<div className="page-loader">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Suspense>
    );
}
```

This ensures users only download the JavaScript for the page they're viewing.

---

## 4. 🟡 Tailwind CSS Included But Barely Used

**Impact**: Adds unused CSS to the final bundle

Tailwind CSS is imported in `App.css`:
```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

However, scanning the JSX reveals almost **no Tailwind utility classes are used** — all styling is done via SCSS and CSS custom properties.

### Recommendations

**Option A (Recommended): Remove Tailwind entirely**
1. Delete `tailwind.config.js`
2. Remove the 3 `@import` lines from `App.css`
3. Remove `tailwindcss` from `devDependencies`
4. Verify no Tailwind classes are used in JSX (grep for common patterns)

**Option B: Commit to Tailwind**
- Migrate SCSS styles to Tailwind utilities
- Remove per-component SCSS files
- This is a much larger effort and may not be worth it

---

## 5. 🟠 Font Loading Not Optimized

**Impact**: Potential layout shift (CLS) and render blocking

Google Fonts (Inter) is loaded in `index.html` with `preconnect`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Improvements
1. **Reduce weight range** — the site loads 7 weights (300-900). Audit actual usage; likely only 400, 500, 600, 700 are needed.
2. **Use `font-display: swap`** — already included via `&display=swap` ✅
3. **Consider self-hosting** — eliminates the third-party request entirely

---

## 6. 🟠 Conflicting Body Styles

**Impact**: Minor — unnecessary duplication, potential specificity conflicts

Both `index.css` and `App.css` set `body` styles:

**`index.css`:**
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

**`App.css`:**
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

The `App.css` version wins (loaded second), making the `index.css` body styles dead code.

### Fix
Remove the body styles from `index.css` or consolidate into one file.

---

## Summary Priority

| Priority | Issue | Expected Impact |
|---|---|---|
| 🔴 High | Optimize images (WebP + thumbnails) | 10MB+ savings, massive LCP improvement |
| 🟡 Medium | Replace antd with lightweight modal | 200-300KB JS savings |
| 🟡 Medium | Add route-level code splitting | Faster initial page load |
| 🟡 Medium | Remove unused Tailwind CSS | Cleaner CSS bundle |
| 🟠 Low | Optimize font loading | Minor CLS improvement |
| 🟠 Low | Consolidate body styles | Code cleanliness |
