# Critical Fixes

> Bugs and issues that cause errors, security vulnerabilities, broken functionality, or SEO penalties in production. **Fix these immediately.**

---

## 1. `class` vs `className` in ProgressBar

**Severity**: 🔴 Critical  
**File**: `src/components/progressBar.js`  
**Impact**: Causes React console warnings on every render of the About page (12 progress bars × 5 incorrect `class` attributes = 60 warnings)

The `ProgressBar` component uses raw HTML `class` instead of React's `className`. While browsers still apply styles, React logs warnings for each instance.

**Current code:**
```jsx
<div class="progress-inner">
    <span className="details">
        <span class="label">{props.skill}</span>
        <span class="number">{props.number}%</span>
    </span>
    <div class="background">
        <div class="bar">
            <div class="bar-in" style={{width:`${props.number}%`}}></div>
        </div>
    </div>
</div>
```

**Fix:** Replace all `class=` with `className=`:
```jsx
<div className="progress-inner">
    <span className="details">
        <span className="label">{props.skill}</span>
        <span className="number">{props.number}%</span>
    </span>
    <div className="background">
        <div className="bar">
            <div className="bar-in" style={{width:`${props.number}%`}}></div>
        </div>
    </div>
</div>
```

---

## 2. `react-router-dom` in Wrong Dependency Group

**Severity**: 🔴 Critical  
**File**: `package.json` (lines 44-47)  
**Impact**: May break production builds on platforms that prune `devDependencies` before building

`react-router-dom` is a **runtime dependency** (the app literally cannot render without it), but it is listed under `devDependencies`.

**Fix:**
```diff
  "dependencies": {
+   "react-router-dom": "^6.22.1",
    ...
  },
  "devDependencies": {
-   "react-router-dom": "^6.22.1",
    "tailwindcss": "^3.4.1"
  }
```

---

## 3. Security: Unsafe `target="blank"` Without `noreferrer`

**Severity**: 🔴 Critical  
**File**: `src/components/portfolioModal.js` (line 17)  
**Impact**: Reverse tabnapping vulnerability — the opened page can access `window.opener` and redirect the original tab

Two issues in one line:
1. `target="blank"` is incorrect HTML — it should be `target="_blank"`
2. Missing `rel="noopener noreferrer"` attribute

**Current code:**
```jsx
<a href={props.data?.url} target="blank" className="link">
```

**Fix:**
```jsx
<a href={props.data?.url} target="_blank" rel="noopener noreferrer" className="link">
```

---

## 4. Missing `key` Prop in `.map()` Loop

**Severity**: 🟡 High  
**File**: `src/components/portfolioModal.js` (line 19)  
**Impact**: React key warning in console; can cause incorrect DOM reconciliation during re-renders

**Current code:**
```jsx
{props.data.otherImages.map(function (data) {
    return (
        <img src={data} alt="Additional project screenshot"></img>
    )
})}
```

**Fix:**
```jsx
{props.data?.otherImages?.map(function (data, index) {
    return (
        <img key={index} src={data} alt="Additional project screenshot" />
    )
})}
```

---

## 5. Crash Risk: Unguarded Property Access on Modal Open

**Severity**: 🟡 High  
**File**: `src/components/portfolioModal.js` (line 19)  
**Impact**: `TypeError: Cannot read properties of undefined (reading 'map')` — app crashes

The component uses optional chaining in some places (`props.data?.title`) but directly accesses `props.data.otherImages.map()` without a guard. The initial state for `selectedProject` in `portfolio.js` is `{}`, which has no `otherImages` property.

**Fix:** Add optional chaining:
```diff
- {props.data.otherImages.map(function (data) {
+ {props.data?.otherImages?.map(function (data, index) {
```

---

## 6. Full Page Reloads Instead of SPA Navigation

**Severity**: 🟡 High  
**File**: `src/pages/home.js` (lines 36, 40, 253, 260, 267)  
**Impact**: Every navigation triggers a full page reload, defeating the purpose of a React SPA. Causes flash of white, re-fetches all assets, resets state.

**Current pattern (appears 5+ times):**
```javascript
const scrollToPortfolio = () => {
    window.location.href = '/portfolio';
};

// And in JSX:
onClick={() => window.location.href = '/about'}
```

**Fix:** Use React Router's `useNavigate` hook:
```javascript
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const scrollToPortfolio = () => {
        navigate('/portfolio');
    };

    // In JSX:
    onClick={() => navigate('/about')}
}
```

---

## 7. PWA Manifest Still Uses CRA Defaults

**Severity**: 🟡 Medium  
**File**: `public/manifest.json`  
**Impact**: Displays "Create React App Sample" when users install the app or see it in app listings

**Fix:**
```diff
{
-   "short_name": "React App",
+   "short_name": "NK Portfolio",
-   "name": "Create React App Sample",
+   "name": "Nimesha Kahingala - Full Stack Developer",
    ...
+   "theme_color": "#2563eb",
    ...
}
```

---

## 8. Missing `og-image.jpg` File

**Severity**: 🟡 Medium  
**Files**: `public/index.html` (line 25), `src/components/SEOHelmet.js` (line 12)  
**Impact**: Social media sharing (Facebook, Twitter, LinkedIn) shows no preview image

Both the HTML template and SEOHelmet component reference `/og-image.jpg`, but this file **does not exist** in the `public/` directory.

**Fix:** Create an OpenGraph image (recommended size: 1200×630px) and place it at `public/og-image.jpg`.

---

## 9. Stale Sitemap Dates

**Severity**: 🟠 Medium  
**File**: `public/sitemap.xml`  
**Impact**: All `<lastmod>` dates show `2024-12-19` (over a year old). Search engines may lower crawl frequency.

**Fix:** Update all dates to reflect actual last modification dates.

---

## 10. Inconsistent Experience Claims Across Pages

**Severity**: 🟠 Medium  
**Impact**: Confusing for visitors; can damage credibility and hurt SEO consistency

The number of years of experience is stated differently across the site:

| Location | Claim |
|---|---|
| `public/index.html` (line 13) | "3+ years" |
| `src/pages/home.js` (line 47) | "5+ years" |
| `src/pages/about.js` (line 13) | "5+ years" |
| `src/pages/about.js` (line 38) | "over three years" |

**Fix:** Pick one accurate number and update all locations consistently.

---

## 11. Typo in Project Data

**Severity**: 🟠 Low  
**File**: `src/components/data.js` (line 61)  
**Impact**: Displays "SqaudGurus" instead of "SquadGurus" on the portfolio page

**Fix:**
```diff
- title: "SqaudGurus",
+ title: "SquadGurus",
```

---

## Priority Order

1. ~~Fix `class` → `className`~~ (§1)
2. Move `react-router-dom` to `dependencies` (§2)
3. Fix `target="blank"` security issue (§3)
4. Add key prop + crash guard in modal (§4, §5)
5. Replace `window.location.href` with `navigate()` (§6)
6. Update manifest.json (§7)
7. Create og-image.jpg (§8)
8. Fix experience year inconsistency (§10)
9. Update sitemap dates (§9)
10. Fix typo (§11)
