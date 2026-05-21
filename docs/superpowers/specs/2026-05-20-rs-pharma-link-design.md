# R.S. Pharma Link Pvt. Ltd. — Website Design Spec
**Date:** 2026-05-20  
**Status:** Approved  
**Location:** /home/roxed/rs-pharma-link

---

## 1. Project Overview

Ground-up inaugural web presence for R.S. Pharma Link Pvt. Ltd., a pharmaceutical distributor based in Golfutar, Kathmandu, Nepal. The site must establish digital authority, communicate pharmaceutical-grade trust, and deliver an unforgettable 3D interactive experience.

**Build scope:** 6 full pages + 8 unique 3D scenes + full SEO + loading screen + custom cursor + smooth scroll.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ App Router |
| 3D | Three.js via @react-three/fiber + @react-three/drei |
| Animations | GSAP (ScrollTrigger + Timeline) + Framer Motion |
| Smooth Scroll | Lenis (@studio-freight/lenis) |
| Styling | Tailwind CSS + CSS custom properties |
| Fonts | DM Serif Display + Plus Jakarta Sans + Space Mono (via next/font/google) |
| Icons | Lucide React |
| SEO | Next.js Metadata API + next-sitemap + JSON-LD |
| Deployment | Vercel-optimized |

---

## 3. Color System — Himalayan Slate

All colors defined as CSS custom properties on `:root`. Zero hardcoded hex values in components.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#F4F1EB` | Page background (cream parchment) |
| `--color-dark` | `#0A1A19` | Dark sections (near-black teal) |
| `--color-primary` | `#0D3D3A` | Deep forest teal — primary brand color |
| `--color-accent` | `#E8C97A` | Warm wheat/sand — accent, highlights |
| `--color-medical` | `#2EC4B6` | Bright teal-cyan — interactive/glow elements |
| `--color-text` | `#1A1A1A` | Body text |
| `--color-muted` | `#6B7A72` | Muted/secondary text |
| `--color-surface` | `rgba(13,61,58,0.08)` | Glassmorphism card backgrounds |

---

## 4. Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | DM Serif Display | 400 | H1, hero headlines, section titles |
| Body | Plus Jakarta Sans | 400, 500, 600 | Paragraphs, nav, UI copy |
| Mono | Space Mono | 400, 700 | Stat numbers, tags, precision labels |

Loaded via `next/font/google` — zero layout shift, self-hosted by Next.js.
**Banned:** Inter, Roboto, Arial, system fonts.

---

## 5. Pages & 3D Scenes

### `/` — Homepage
Six sections, each with a unique 3D scene:

| Section | 3D Scene | Interaction |
|---|---|---|
| Hero | DNA double-helix (teal spheres + wheat bonds), slow rotation, dissolves to particles on scroll | Mouse parallax tilt via useFrame + mouse position |
| About Snippet | Frosted glass double-doors swing open on scroll (GSAP 1.2s Y-axis hinge, bloom light behind, door handles as cylinder meshes) | Triggered at 30% viewport entry |
| Services | Supply chain network graph (Manufacturer→Distributor→Pharmacy→Patient), pulsing nodes, animated glowing data packets | Hover node = expand + tooltip |
| Stats | Rising 3D bar chart (teal glass pillars), bars rise one by one on scroll-in with bounce easing | Scroll-triggered, number counter |
| Testimonials/Partners | Partner logos on flat 3D planes orbiting central glowing sphere | Drag to spin, auto-rotate |
| CTA | Soft ambient particle field (teal/wheat), gently breathing | Passive animation |

### `/about`
- Full door-reveal scene (expanded from homepage snippet)
- Company timeline as 3D horizontal rail
- 3D caduceus floating top-right at 15% opacity
- Mission/values content with glassmorphism cards

### `/products`
- 3D pharmacy shelf — product category cards as 3D tiles
- Hover: card lifts toward camera, shadow deepens, detail overlay appears
- Click: camera zooms into product detail
- Category filter: shelf re-sorts with spring physics transitions
- No static image grids anywhere

### `/services`
- Expanded supply chain visualization from homepage
- Individual service deep-dives with glassmorphism cards
- Animated connection lines between service nodes

### `/contact`
- Low-poly Kathmandu Valley terrain mesh with animated gradient
- Golfutar location pin pulses with ring emission effect
- Hover map: slight zoom in
- Floating 3D envelope + phone models near contact form
- Contact form with glassmorphism styling

### `/careers`
- Sparse slow-moving molecule field background (distinct from hero)
- Job listing cards with magnetic hover (up to 10px GSAP pull)
- Culture/values section

---

## 6. Global UI Components

### Navbar
- Transparent over hero, frosted glass (`backdrop-filter: blur(20px)`) on scroll
- SVG wordmark logo (generated — teal + wheat, DM Serif Display)
- Desktop: links right-aligned | Mobile: slide-in drawer (Framer Motion)

### Footer
- Dark background (`#0A1A19`)
- Three-column: Logo+desc | Links | Contact info
- Thin wheat (`#E8C97A`) ruled line at top
- Newsletter signup input

### Custom Cursor
- Pill-shaped SVG, scales 2× on hover over interactive elements
- Teal trailing glow via canvas overlay
- Hidden on touch devices

### Loading Screen
- 3D capsule pill fills as progress bar (teal fill on wheat background)
- "R.S. PHARMA LINK" fades in below in DM Serif Display
- 1.5s minimum, 3s maximum display

### Scroll Progress
- Thin vertical line on right viewport edge
- Moving dot indicator, teal color

### Section Transitions
- Entrance: `opacity: 0→1` + `y: 40→0`, staggered children, snap-in (not scrub)
- GSAP ScrollTrigger, start: "top 80%"

---

## 7. Animation Architecture

**GSAP ScrollTrigger** — scroll-driven:
- Section entrance animations (snap-in)
- 3D scene scroll links (DNA helix unwrap, bar chart rise) — `scrub: true`
- Door reveal timeline (triggered once at 30% entry)

**Framer Motion** — UI micro-interactions:
- Card hover lift/states
- Nav drawer open/close
- Loading screen exit (scale + fade)
- Page route transitions (cross-fade)

**Lenis** — smooth scroll:
- Wraps entire scroll container
- Feeds `ScrollTrigger.scrollerProxy()` to keep GSAP + Lenis in sync
- `lerp: 0.1` for smooth momentum

---

## 8. 3D Technical Specs

- All scenes: `dynamic(() => import(...), { ssr: false })` + `React.Suspense`
- Performance detection: `gl.getExtension('WEBGL_debug_renderer_info')` — low-perf devices get `<Fallback3D />` (static image or Lottie)
- `prefers-reduced-motion`: all 3D scenes replaced with static illustrations, all animations disabled
- Shared helpers in `/lib/three-utils.ts`: emissive material factory, float animation hook, particle system factory

---

## 9. Image Interaction Rules

Every image must have one of:
- **3D tilt** — CSS perspective + JS mouse tracking (`rotateX`, `rotateY`)
- **Depth parallax** — foreground moves faster than background on hover
- **Reveal overlay** — translucent info overlay slides up from bottom on hover
- **Magnetic pull** — image moves toward cursor up to 10px (GSAP)

No static, non-interactive images anywhere.

---

## 10. SEO Architecture

### Metadata (per page via `generateMetadata()`)
```ts
{
  title: "Page Title | R.S. Pharma Link Pvt. Ltd.",
  description: "150–160 chars, action-oriented, keyword-rich",
  canonical: "https://rspharmalink.com/[page]",
  openGraph: { title, description, images },
  twitter: { card: "summary_large_image" }
}
```

### JSON-LD Structured Data (server-side)
- `Organization` — name, url, logo, contactPoint
- `LocalBusiness` — address (Golfutar, Kathmandu), coordinates
- `WebSite` — with `SearchAction`
- `BreadcrumbList` — on all inner pages

### Target Keywords
- pharmaceutical distributor Kathmandu
- medicine supplier Nepal
- pharma wholesale Golfutar
- pharmaceutical company Nepal
- RS Pharma Link
- medicine distribution Kathmandu Valley
- healthcare supplier Nepal

### Technical SEO
- `sitemap.xml` — auto-generated via next-sitemap on build
- `robots.txt` — allows all crawlers, points to sitemap
- All images: `next/image` with descriptive alt text
- Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- Heading hierarchy: single `<h1>` per page with primary keyword

---

## 11. Accessibility

- `prefers-reduced-motion`: all animations and 3D scenes disabled, static fallbacks shown
- ARIA labels on all icon-only buttons
- Color contrast ≥ 4.5:1 (verified for Himalayan Slate palette)
- Keyboard-accessible alternatives for all interactive 3D elements
- Focus states: visible, styled with `--color-medical` outline

---

## 12. Folder Structure

```
/app
  layout.tsx              ← fonts, metadata base, providers
  page.tsx                ← Homepage
  /about/page.tsx
  /products/page.tsx
  /services/page.tsx
  /contact/page.tsx
  /careers/page.tsx

/components
  /3d
    HeroDNA.tsx           ← DNA helix scene
    DoorReveal.tsx        ← Door swing scene
    SupplyChain.tsx       ← Network graph scene
    ProductShelf.tsx      ← 3D shelf scene
    StatsChart.tsx        ← Bar chart scene
    PartnerOrbit.tsx      ← Orbit scene
    MapPin.tsx            ← Kathmandu terrain + pin
    CareersMolecule.tsx   ← Sparse molecule background
    Fallback3D.tsx        ← Static fallback component
  /ui
    Navbar.tsx
    Footer.tsx
    CustomCursor.tsx
    LoadingScreen.tsx
    ScrollProgress.tsx
    SectionTransition.tsx
  /sections
    Hero.tsx
    About.tsx
    Services.tsx
    Products.tsx
    Stats.tsx
    Testimonials.tsx
    Contact.tsx
    CTA.tsx

/lib
  gsap.ts                 ← GSAP + ScrollTrigger + Lenis setup
  three-utils.ts          ← Shared R3F helpers
  motion.ts               ← Framer Motion variants

/public
  /images
  /fonts

/styles
  globals.css             ← CSS custom properties, base reset

next.config.ts
tailwind.config.ts
next-sitemap.config.js
```

---

## 13. Hard Rules

- [ ] Never repeat a 3D scene or element across multiple sections
- [ ] Never use flat/static placeholder boxes where 3D is specified
- [ ] Never use Inter, Roboto, Arial, or any system font
- [ ] Never create a text-only section without an accompanying visual
- [ ] Never use purple gradient on white (cliché AI aesthetic)
- [ ] Never skip `prefers-reduced-motion` fallback
- [ ] Never hardcode colors — always use CSS custom properties
- [ ] All 3D scenes must be lazy-loaded and wrapped in `<Suspense>`
- [ ] Every image must have a hover interaction
