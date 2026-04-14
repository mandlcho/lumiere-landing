# Desktop/Mobile Page Split — Design Spec

## Overview

Split the single `index.html` into separate mobile and desktop experiences with client-side device detection routing. The desktop page adds richer interactivity (custom cursor, mouse-driven parallax, smoother transitions) while preserving the same scroll-driven video layout and content.

## Architecture

Three static HTML files served from the root:

| File | Purpose |
|------|---------|
| `index.html` | Lightweight router — detects device, redirects |
| `mobile.html` | Current page renamed, unchanged |
| `desktop.html` | New desktop page with enhanced interactivity |

No build step. No server-side logic. Works on Vercel as-is.

## Detection & Routing (`index.html`)

**Logic:**
1. Check touch capability: `'ontouchstart' in window || navigator.maxTouchPoints > 0`
2. Check viewport width: `window.innerWidth < 768`
3. Mobile = touch device OR narrow viewport → `window.location.replace('mobile.html')`
4. Desktop = no touch AND wide viewport → `window.location.replace('desktop.html')`
5. `<noscript>` fallback embeds the mobile page content (or a meta-refresh to `mobile.html`)

**Direct access:** `mobile.html` and `desktop.html` do NOT redirect away. Users who navigate directly stay on that page.

**SEO:** All meta tags, structured data, Open Graph, and canonical (`lumieremotionlabs.com/`) live in `index.html`. The mobile and desktop pages include basic meta but defer canonical to the router. `robots.txt` and `sitemap.xml` remain unchanged — they point to `/` which is the router.

## Mobile Page (`mobile.html`)

Current `index.html` renamed. No changes to content, styles, or scripts.

## Desktop Page (`desktop.html`)

Same 5-section scroll-driven video structure. Same content and copy. Same fonts. Differences:

### Scroll Feel
- Lerp factor reduced to `0.08` (from `0.14`) for smoother, more cinematic interpolation
- Scroll heights per section increased (500vh base, 250vh for last section)
- Wider parallax range on text layers

### Custom Cursor
- Hide native cursor via `cursor: none` on body
- Custom cursor element: 8px solid white dot (inner) + 32px ring (outer, `rgba(255,255,255,0.15)`)
- Cursor follows mouse position via `requestAnimationFrame` with slight lerp for smoothness
- On hover over interactive elements (`.feature-card`, `.cta-button`, `.footer-social`): outer ring scales to 48px, inner dot scales to 6px
- Cursor hidden when mouse leaves the viewport

### Mouse-Driven Parallax
- Track mouse position relative to viewport center (normalized -1 to 1 on both axes)
- Video layer: `translate3d` shifts opposite to cursor, 2-3% of viewport range (creates depth illusion)
- Primary text (h2/p): shifts with cursor at 1-2% range, different speed than video
- Secondary text and cards: stationary (anchored)
- Applied via `transform` on each `requestAnimationFrame` tick, composed with existing scroll transforms

### Enhanced Hover Effects
- Feature cards: subtle white glow (`box-shadow: 0 0 30px rgba(255,255,255,0.08)`) + existing `translateY(-4px)` + background brighten
- CTA button: shimmer effect — a diagonal light sweep via CSS `background` animation on hover (pure CSS, no JS)
- Footer links: smooth color transition (already exists, keep as-is)

### Transition Timing
- Fade-to-black between sections starts at 75% (from 72%) and takes longer — more cinematic breath
- Text fade timings get slightly wider windows (fade-in and fade-out each get +2% duration)

## Files Changed

1. **Rename** `index.html` → `mobile.html` (no content changes)
2. **Create** `index.html` (router with meta tags + detection script)
3. **Create** `desktop.html` (desktop experience)

## Out of Scope

- No changes to video files or their encoding
- No changes to `robots.txt`, `sitemap.xml`, or `vercel.json`
- No analytics or tracking
- No cookie/preference persistence (detection runs fresh each visit)
