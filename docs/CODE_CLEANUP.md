# Code Cleanup

> Dead code, unused files, naming inconsistencies, and general housekeeping items. These add to bundle size, cause confusion for contributors, and should be cleaned up.

---

## 1. Dead Files (Safe to Delete)

These files are either empty, never imported, or superseded by newer versions:

| File | Size | Reason |
|---|---|---|
| `src/components/footer.js` | 0 bytes | Empty file, never imported |
| `src/logo.svg` | 2.6 KB | Default CRA logo, never imported |
| `src/images/Nimesha.jpeg` | 60 KB | Superseded by `me2.jpg` (which is used in home.scss) |
| `src/images/cv.pdf` | 200 KB | Older CV version; `cv2.pdf` is the one imported in about.js |
| `src/images/goldenGate.PNG` | 445 KB | Appears to be a duplicate; `golden-gate.PNG` is the one imported in data.js |

**Total space recovered**: ~708 KB

---

## 2. Unused Dependencies (Safe to Remove)

| Package | Size Impact | Reason |
|---|---|---|
| `@fortawesome/fontawesome-svg-core` | ~50 KB | Listed in dependencies but **never imported** anywhere in the codebase. Social icons use inline SVG files instead. |

**To remove:**
```bash
npm uninstall @fortawesome/fontawesome-svg-core
```

---

## 3. Unused Components (Decide: Use or Delete)

### SEOHelmet.js + its usage

**File**: `src/components/SEOHelmet.js` (1.5 KB)

A fully-built reusable SEO component that accepts `title`, `description`, `keywords`, `canonical`, OG, and Twitter meta props. However, **no page imports it** — all pages use `react-helmet` directly with duplicate code.

**Decision needed:**
- ✅ Refactor all pages to use `<SEOHelmet>` (recommended — see `DESIGN_IMPROVEMENTS.md §2`)
- ❌ Delete it if you prefer explicit `<Helmet>` blocks per page

### FAQ.js + FAQ.scss

**Files**: `src/components/FAQ.js` (4.4 KB) + `src/components/FAQ.scss` (2.2 KB)

A complete FAQ accordion component. The import in `home.js` is commented out:
```javascript
//import FAQ from '../components/FAQ';
// ...
{/* <FAQ /> */}
```

**Decision needed:**
- ✅ Uncomment and use it (adds SEO value with structured FAQ content)
- ❌ Delete both files if not planning to use

---

## 4. Commented-Out Code

Remove commented-out code blocks that add noise:

### `src/components/data.js` (lines 19-39)

Two entire commented-out project objects (~20 lines). These appear to be placeholder/example entries that were never finished.

### `src/pages/home.js` (lines 19-33)

Commented-out `scrollToNextSection` function (~15 lines).

### `src/pages/home.js` (line 8)

Commented-out FAQ import:
```javascript
//import FAQ from '../components/FAQ';
```

### `src/pages/home.js` (lines 81-84)

Commented-out "100% Client Satisfaction" stat:
```jsx
{/* <div className="stat">
    <span className="stat-number">100%</span>
    <span className="stat-label">Client Satisfaction</span>
</div> */}
```

### `src/pages/home.js` (lines 280-285)

Commented-out scroll indicator section.

---

## 5. Default CRA Files (Customize or Remove)

These files still contain Create React App defaults:

| File | Issue | Action |
|---|---|---|
| `README.md` | Contains default CRA boilerplate text with null bytes at the end | Rewrite with actual project info |
| `public/manifest.json` | `"name": "Create React App Sample"` | Update with portfolio info |
| `public/logo192.png` | Default React logo | Replace with portfolio favicon/logo |
| `public/logo512.png` | Default React logo | Replace with portfolio favicon/logo |
| `src/App.test.js` | Tests default CRA render | Delete or write real tests |
| `src/setupTests.js` | Default test setup | Keep if writing tests, delete otherwise |
| `src/reportWebVitals.js` | Default CRA vitals | Keep (it's functional) |

---

## 6. File Naming Conventions

React component files should use **PascalCase** by convention. The project mixes styles:

### Current State

| Convention | Files |
|---|---|
| PascalCase ✅ | `FAQ.js`, `SEOHelmet.js` |
| camelCase ❌ | `blogCard.js`, `portfolioModal.js`, `progressBar.js` |
| lowercase ❌ | `header.js`, `nav.js`, `main.js`, `footer.js`, `data.js` |
| Pages (lowercase) ❌ | `home.js`, `about.js`, `blog.js`, `contact.js`, `portfolio.js` |

### Recommended Renames

| Current | Recommended |
|---|---|
| `header.js` | `Header.js` |
| `nav.js` | `Nav.js` |
| `main.js` | `Main.js` |
| `footer.js` | `Footer.js` |
| `data.js` | `data.js` (keep lowercase — it's not a component) |
| `blogCard.js` | `BlogCard.js` |
| `portfolioModal.js` | `PortfolioModal.js` |
| `progressBar.js` | `ProgressBar.js` |
| `home.js` | `Home.js` |
| `about.js` | `About.js` |
| `blog.js` | `Blog.js` |
| `contact.js` | `Contact.js` |
| `portfolio.js` | `Portfolio.js` |

> **Note**: Renaming files requires updating all import paths that reference them. On case-insensitive file systems (macOS default), `git mv` is needed to ensure Git tracks the rename.

---

## 7. SCSS File Sizes

Some SCSS files are notably large. Consider whether they contain dead/unused styles:

| File | Size | Lines |
|---|---|---|
| `src/pages/home.scss` | 30 KB | 914 lines |
| `src/pages/contact.scss` | 17 KB | ~520 lines |
| `src/pages/about.scss` | 14 KB | ~614 lines |
| `src/pages/portfolio.scss` | 11 KB | ~442 lines |
| `src/components/header.scss` | 9 KB | ~362 lines |
| `src/components/nav.scss` | 7 KB | ~234 lines |
| `src/pages/blog.scss` | 7 KB | ~297 lines |

**Recommendation**: Run a CSS coverage report (Chrome DevTools → Coverage tab) to identify unused CSS rules.

---

## Cleanup Checklist

- [ ] Delete empty `footer.js`
- [ ] Delete unused `logo.svg`
- [ ] Delete unused `Nimesha.jpeg` (verify `me2.jpg` is the correct one)
- [ ] Delete unused `cv.pdf` (verify `cv2.pdf` is current)
- [ ] Delete unused `goldenGate.PNG` duplicate
- [ ] Uninstall `@fortawesome/fontawesome-svg-core`
- [ ] Decide on SEOHelmet: use or delete
- [ ] Decide on FAQ: use or delete
- [ ] Remove all commented-out code blocks
- [ ] Customize README.md
- [ ] Customize manifest.json
- [ ] Replace CRA default logos (logo192, logo512)
- [ ] Rename component files to PascalCase (optional, but recommended)
- [ ] Audit SCSS for unused styles
