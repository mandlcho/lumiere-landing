# Desktop/Mobile Page Split — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the landing page into separate mobile and desktop experiences with client-side device detection routing.

**Architecture:** Three static HTML files — `index.html` (router), `mobile.html` (current page renamed), `desktop.html` (new desktop experience with custom cursor, mouse parallax, enhanced transitions). No build step, pure static serving on Vercel.

**Tech Stack:** Vanilla HTML/CSS/JS, no dependencies.

---

### Task 1: Rename current page to mobile.html

**Files:**
- Rename: `index.html` → `mobile.html`

- [ ] **Step 1: Rename the file**

```bash
git mv index.html mobile.html
```

- [ ] **Step 2: Verify mobile.html is intact**

Open `mobile.html` in browser. Confirm all 5 video sections scroll correctly, text fades work, footer reveals.

- [ ] **Step 3: Commit**

```bash
git add mobile.html
git commit -m "refactor: rename index.html to mobile.html"
```

---

### Task 2: Create the router (index.html)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the router page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>LumiereMotionLabs — Cinematic Real Estate Visualization & Virtual Staging</title>
  <meta name="description" content="LumiereMotionLabs crafts cinematic real estate visuals, virtual staging, and immersive property walkthroughs. Transform empty rooms into designer interiors and help listings sell faster.">
  <meta name="keywords" content="virtual staging, real estate visualization, cinematic real estate, property marketing, room restyling, interior visualization, real estate video, 3D staging, luxury listings, LumiereMotionLabs">
  <meta name="author" content="LumiereMotionLabs">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <meta name="theme-color" content="#000000">
  <link rel="canonical" href="https://lumieremotionlabs.com/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="LumiereMotionLabs">
  <meta property="og:title" content="LumiereMotionLabs — Cinematic Real Estate Visualization & Virtual Staging">
  <meta property="og:description" content="Immersive property experiences, virtual staging, and cinematic real estate visuals. Interiors so real, you forget how they got there.">
  <meta property="og:url" content="https://lumieremotionlabs.com/">
  <meta property="og:locale" content="en_US">
  <meta property="og:image" content="https://lumieremotionlabs.com/og-image.jpg">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="LumiereMotionLabs — Cinematic Real Estate Visualization">
  <meta name="twitter:description" content="Virtual staging and cinematic real estate visualization. Every frame intentional, every space transformed.">
  <meta name="twitter:image" content="https://lumieremotionlabs.com/og-image.jpg">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://lumieremotionlabs.com/#org",
        "name": "LumiereMotionLabs",
        "url": "https://lumieremotionlabs.com/",
        "description": "Cinematic real estate visualization studio specializing in virtual staging, room restyling, and immersive property walkthroughs.",
        "sameAs": [
          "https://instagram.com/lumiere.motionlab"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "mandl.cho@icloud.com",
          "telephone": "+65-9777-7311",
          "availableLanguage": ["English"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://lumieremotionlabs.com/#website",
        "url": "https://lumieremotionlabs.com/",
        "name": "LumiereMotionLabs",
        "publisher": { "@id": "https://lumieremotionlabs.com/#org" },
        "inLanguage": "en"
      },
      {
        "@type": "Service",
        "name": "Virtual Staging & Cinematic Real Estate Visualization",
        "provider": { "@id": "https://lumieremotionlabs.com/#org" },
        "areaServed": "Worldwide",
        "serviceType": "Real Estate Visualization",
        "description": "Virtual staging, room restyling, day-to-night transformations, and cinematic property walkthroughs for real estate listings."
      }
    ]
  }
  </script>

  <style>
    body { margin: 0; background: #000; }
  </style>
</head>
<body>
  <script>
    (function () {
      var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      var isNarrow = window.innerWidth < 768;
      var target = (isTouch || isNarrow) ? 'mobile.html' : 'desktop.html';
      window.location.replace(target);
    })();
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=mobile.html">
  </noscript>
</body>
</html>
```

- [ ] **Step 2: Verify routing**

Open `index.html` on desktop browser → should redirect to `desktop.html` (will 404 until Task 3).
Open in mobile simulator or narrow viewport with touch emulation → should redirect to `mobile.html`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add device detection router in index.html"
```

---

### Task 3: Create desktop.html

**Files:**
- Create: `desktop.html`

This is the largest task. The desktop page is a copy of `mobile.html` with these modifications:

1. **CSS changes:** Remove mobile-first base sizes and media queries. Use desktop-optimized sizes directly. Add custom cursor styles, shimmer animation, enhanced hover effects.
2. **HTML changes:** Add cursor DOM elements (`<div class="cursor-dot">`, `<div class="cursor-ring">`). Remove mobile-specific safe-area padding references.
3. **JS changes:** Lower lerp factors (0.08), increase section scroll heights (500vh/250vh), add mouse tracking for cursor + parallax, adjust fade timing (+3% wider windows), compose mouse parallax with scroll transforms.

- [ ] **Step 1: Create desktop.html with desktop-optimized CSS**

The full CSS replaces the mobile-first approach with desktop-native styles:
- `cursor: none` on body
- `.cursor-dot`: fixed 8px white circle, `z-index: 9999`, `pointer-events: none`
- `.cursor-ring`: fixed 32px ring border (`2px solid rgba(255,255,255,0.15)`), `z-index: 9998`, `pointer-events: none`, transitions for scale
- `.cursor-ring.hovering`: scale to 1.5 (48px)
- `.cursor-dot.hovering`: scale to 0.75 (6px)
- `.cursor-dot.hidden, .cursor-ring.hidden`: opacity 0
- `.video-section` height: `500vh`, last: `250vh`
- `.video-sticky video`: `will-change: transform` for mouse parallax
- Typography uses the desktop media query sizes directly (no mobile base)
- `.feature-card` transition includes `box-shadow`
- `.feature-card:hover`: add `box-shadow: 0 0 30px rgba(255,255,255,0.08)`
- `.cta-button`: add `position: relative; overflow: hidden`
- `.cta-button::after`: shimmer pseudo-element (diagonal light sweep, `@keyframes shimmer`)
- `.cta-button:hover::after`: animate shimmer

- [ ] **Step 2: Add cursor and parallax HTML elements**

Add before `</body>`:
```html
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>
```

- [ ] **Step 3: Write the desktop JS**

Key differences from mobile JS:
- `LERP_FACTOR = 0.08` and `LERP_FACTOR_TEXT = 0.08`
- No `isMobile` variable — always desktop paths
- `pFactor = 0.5` (wider parallax)
- Mouse tracking: `mousemove` listener stores normalized mouse position (-1 to 1)
- `mouseenter`/`mouseleave` on body toggles cursor visibility
- `mouseover`/`mouseout` on interactive elements toggles `.hovering` class
- In `animationLoop`: lerp cursor position, apply to `.cursor-dot` and `.cursor-ring`
- In `animationLoop`: compute mouse parallax offsets for video (`translate3d` opposite to mouse, 2.5% range) and primary text (`translate3d` with mouse, 1.5% range), compose with scroll transforms
- Primary text fade: hero visible to 30% (from 28%), fade out 30-42% (from 28-38%). Others: fade in 6-16% (from 8-16%), visible 16-30%, fade out 30-42%.
- Secondary text: fade in 46-55% (from 48-55%), visible 55-64% (from 55-62%), fade out 64-74% (from 62-70%)
- Fade-to-black: starts at 75% (from 72%)
- Footer reveal: fade in 80-90% (from 78-88%)
- Seek threshold always `0.016` (no mobile branch)
- No `touchstart` primer — desktop only needs `scroll` and `click`

- [ ] **Step 4: Verify desktop.html in browser**

Open `desktop.html` directly. Verify:
- Custom cursor (dot + ring) follows mouse smoothly
- Ring enlarges over feature cards, CTA button, footer links
- Video layers shift subtly opposite to mouse position
- Primary text shifts slightly with mouse
- Scroll transitions are noticeably smoother than mobile
- Shimmer effect on CTA button hover
- Cards get glow on hover
- All 5 sections play correctly
- Footer reveals at end

- [ ] **Step 5: Verify routing end-to-end**

Open `index.html` on desktop → redirects to `desktop.html` → full experience works.
Open `index.html` in mobile simulator → redirects to `mobile.html` → unchanged experience.
Open `mobile.html` directly → stays on mobile, no redirect.
Open `desktop.html` directly → stays on desktop, no redirect.

- [ ] **Step 6: Commit**

```bash
git add desktop.html
git commit -m "feat: add desktop page with custom cursor, mouse parallax, enhanced transitions"
```

---

### Task 4: Final verification and push

- [ ] **Step 1: Run final checks**

```bash
git status
git log --oneline -5
```

Verify clean working tree, 3 new commits (rename, router, desktop).

- [ ] **Step 2: Push**

```bash
git push origin main
```
