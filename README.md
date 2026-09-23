# AETHER STUDIO — Creative Agency Homepage Experience

> **"Creative digital experiences that turn attention into meaningful action."**

An original, award-quality creative agency homepage experience inspired by the interaction philosophy, visual rhythm, and storytelling of modern studio flagships (such as NVRMND Studio). Developed as an original frontend assessment project for Sixjuly Design Studio.

---

## 🌟 Visual Identity & Design Philosophy

AETHER Studio embodies an **editorial creative-studio aesthetic** marked by radical visual intentionality and architectural restraint:

- **Palette**: Warm monochromatic near-black (`#080808` / `#0F0F10`) and warm off-white typography (`#F8F8F6`), punctuated by an electric amber / vermilion accent (`#FF3E18`).
- **Typography**: Fluid, responsive display typography pairing `Syne` (display), `Plus Jakarta Sans` (editorial body), and `Space Mono` (coordinates, badges, telemetry metadata) scaled dynamically via CSS `clamp()`.
- **Layout & Rhythm**: Asymmetric masonry composition, generous negative space, dynamic viewport sections, and overlapping dimensional layers.

---

## 🎬 3-Tier Motion & Animation Architecture

Rather than arbitrary animations, motion is structured into three distinct functional tiers:

### Level 1: Essential Motion
- **Curtain Page Loader**: Fast editorial loading overlay (< 1.2s) with numeric percentage counter and smooth curtain wipe.
- **Hero Reveal Timeline**: Coordinated GSAP timeline revealing the eyebrow badge, staggered line-by-line masked text with blur-to-sharp settling, CTA entrance, and looping scroll indicator.

### Level 2: Interaction Motion
- **Context-Aware Custom Cursor**: Built with high-performance `gsap.quickTo` setters (bypassing React state lag for 60fps tracking). Seamlessly transitions between default dot/ring, hover link expansion, and a `90px` amber `"VIEW"` pill on project cards.
- **Magnetic Buttons & Links**: Physics-based attraction on CTAs and navigation items (`useMagnetic` hook).
- **Project Image Reveals**: Scroll-triggered `clip-path: inset(0 100% 0 0)` to `inset(0 0% 0 0)` paired with container zoom settling and cursor-reactive 3D parallax.
- **Services Accordion**: Fluid row expansion, typography displacement, and instant deliverable reveal.

### Level 3: Atmospheric Motion
- **WebGL Procedural 3D Sculpture**: Lightweight Three.js scene utilizing `@react-three/fiber` and `@react-three/drei`. Features a procedural metallic Torus Knot sculpture with an iridescent wireframe orbit and glowing core, reacting to pointer coordinates with smooth inertia dampening.
- **Kinetic Marquee Scrub**: Dual-layer typography ribbon scrubbed horizontally in sync with vertical page scroll speed using ScrollTrigger.
- **Manifesto Differential Parallax**: Multi-speed horizontal shifting of large typographic statements creating cinematic depth.

---

## 🏗️ Technical Stack & Dependencies

- **Core Framework**: React 19 + Vite 8
- **Styling**: Vanilla Modern CSS (CSS custom properties, fluid clamp scales, modular structure)
- **Animation**: GSAP 3 + ScrollTrigger
- **3D / WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Smooth Scrolling**: Lenis (synchronized with GSAP ticker and ScrollTrigger updates)
- **Icons**: Lucide React

---

## 📂 Project Architecture

```
FrontEnd Assessment/
├── public/
│   └── assets/
│       └── projects/          # High-resolution original project visuals (Orbit, Monument, Noir, Aura)
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── FloatingGeometry.jsx  # Procedural 3D sculpture with inertial mouse tracking
│   │   │   └── HeroScene.jsx         # Optimized Three.js Canvas container with lighting
│   │   ├── CustomCursor.jsx          # Contextual GSAP quickTo cursor
│   │   ├── PageLoader.jsx            # Editorial curtain loader & percentage counter
│   │   ├── Navbar.jsx                # Sticky adaptive header with frosted scroll pill
│   │   ├── MobileMenu.jsx            # Full-screen staggered mobile navigation
│   │   ├── Hero.jsx                  # 100vh hero section with GSAP sequence
│   │   ├── Intro.jsx                 # Progressive word-by-word reveal & studio metrics
│   │   ├── Work.jsx                  # Selected work asymmetrical showcase
│   │   ├── WorkCard.jsx              # Project card with clip-path reveal & 3D tilt
│   │   ├── HorizontalMarquee.jsx     # Kinetic horizontal scrub marquee
│   │   ├── Services.jsx              # Expandable capabilities accordion
│   │   ├── Process.jsx               # 4-stage vertical timeline with SVG progress line
│   │   ├── Manifesto.jsx             # Parallax typographic manifesto
│   │   ├── CTA.jsx                   # High-impact magnetic CTA with clipboard copy
│   │   └── Footer.jsx                # Live Paris/CET clock & studio directory
│   ├── data/
│   │   ├── projects.js               # Flagship case study dataset
│   │   ├── services.js               # Capabilities and deliverables
│   │   └── process.js                # 4-step methodology dataset
│   ├── hooks/
│   │   ├── useSmoothScroll.js        # Lenis + GSAP ScrollTrigger sync hook
│   │   ├── useMagnetic.js            # Physics pointer attraction hook
│   │   └── useMediaQuery.js          # Reactive viewport hook
│   ├── styles/
│   │   ├── variables.css             # Color tokens, glassmorphism, z-indices
│   │   ├── typography.css            # Responsive fluid clamp type scales
│   │   └── globals.css               # Resets, accessibility styles, noise overlay
│   ├── App.jsx                       # Main application composition
│   └── main.jsx                      # React application entry point
├── index.html                        # SEO meta tags, Google Fonts, and favicon
├── package.json
└── vite.config.js
```

---

## ♿ Accessibility & Performance Optimizations

1. **`prefers-reduced-motion` Support**:
   - Immediately falls back to static rendering without animations.
   - Suspends heavy 3D rotations, smooth scroll interception, and custom cursor overlays.
2. **GPU-Accelerated Transforms**:
   - Animations exclusively leverage `transform` (GPU translate/scale) and `opacity` to avoid layout thrashing and reflows.
3. **Optimized WebGL Overhead**:
   - Clamped Device Pixel Ratio (`dpr={[1, 1.5]}`) preventing GPU slowdowns on 4K/retina displays.
   - Lightweight procedural geometries avoiding large GLTF/GLB download weights.
4. **Touch Device Awareness**:
   - Custom cursor automatically hides on touch screens (`(hover: none) and (pointer: coarse)`).
   - Full touch-friendly menu drawer with background scroll locking.
5. **Semantic HTML & Keyboard Navigation**:
   - Proper `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` landmark structure.
   - Visible focus outlines (`:focus-visible`) and descriptive `aria-label` tags on interactive triggers.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📄 Note & Attribution
This project is an independent creative work designed and engineered as a frontend developer assessment for Sixjuly Design Studio, demonstrating modern creative-agency interaction design, WebGL integration, and GSAP animation choreography.
