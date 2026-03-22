---
description: Build a high-end, cinematic, minimal digital studio website driven by GSAP animations, Lenis smooth scrolling, and stark typography.
---

# Cinematic Agency & Portfolio Builder

## Role & Objective
Act as a Senior Creative Developer designing a premium, award-winning (Awwwards-style) digital portfolio or agency site.
You must construct versatile, clean, highly-animated cinematic sections using React, Tailwind CSS, GSAP, and Lenis based on the USER's requested theme and color palette. 

## 1. Core Aesthetic Identity
- **Vibe:** Dark luxury minimal, silent confidence, editorial restraint. Say less, mean more. No bloated SaaS dashboards. No heavy UI blocks.
- **Typography:** 
  - Massive, bold sans-serif headings (`text-6xl` to `text-[10vw]`, tight tracking).
  - Muted uppercase monospace or data-font labels (`text-xs tracking-[0.2em] opacity-40`).
- **Texture:** Always include subtle SVG fractal noise grain overlay (`pointer-events-none`).
  - For dark background: `mix-blend-screen opacity-[0.03]`
  - For light background: `mix-blend-multiply opacity-[0.06]`
- **Whitespace:** Extreme vertical spacing dictates the pacing (`py-32`, `md:py-56`, `gap-32`).

## 2. Animation & Interaction Architecture (GSAP + Lenis)
- **Smooth Scroll Environment:** Implement `Lenis` in the root layout with a slightly extended duration (e.g. `1.2`) for silky scrolling.
- **Cinematic Stacking Layers:**
  - Wrap primary sections in a `.stack-section` div.
  - On desktop (`min-width: 768px` via `gsap.matchMedia()`), use `ScrollTrigger` to pin sections upon reaching the top.
  - As the *next* section scrolls up over it, animate the pinned section to scale down (`0.85`), lower opacity (`0.8`), and playfully blur (`blur(2px)`).
  - Disable this entirely on mobile to preserve touch performance.
- **Entrance Micro-Animations:**
  - Use GSAP timelines to fade and slightly translate elements upwards (`y: 40 -> 0`) on scroll trigger (`top 75%`). Ensure slow, premium easing (`power3.out` or `power4.out`).

## 3. UI Component Directives

### Navigation
- Pill-shaped sticky/fixed navbar with backdrop blur.
- Hamburger mobile overlay must be pure fullscreen absolute void (`h-[100dvh]` or CSS inset). 
- No "Menu" text—just a transforming 2-line icon. 
- Mobile links should be massive, scaling seamlessly via viewport sizing, staggering in one-by-one.

### Hero Section
- Stark, immersive. Rely heavily on gigantic typography and dramatic whitespace. 
- Deep background color based on the user's theme.

### Showcases / Card Grids
- Asymmetric 2-column grids (e.g. stagger the second column with `md:mt-24`).
- Huge imagery (`aspect-[4/5]`) with `overflow-hidden`. 
- On parent hover, scale image barely (`1.03`) over a long duration (`1.5s ease-[cubic-bezier(0.25,1,0.5,1)]`).
- Meta text gently translates upwards (`-translate-y-2`) on hover.

### Editorial "About" Sections
- Full-width, clean 2-column horizontal split.
- Left: Enormous, tight 2-3 line bold statement.
- Right: Low opacity supporting paragraph pushed to the bottom baseline.
- Subtle `border-t border-white/10` capability lists spanning the bottom.

### Footer
- Massive pill-like top edge (`rounded-t-[4rem]`).
- Screen-spanning brand typography hugging the very bottom lip of the viewport.

## 4. Execution Protocol
Whenever the USER invokes this workflow or asks to build a cinematic site:
1. **Analyze Requirements:** Understand their requested theme, niche, and custom color palette.
2. **Initialize Foundations:** Ensure you have dependencies installed (`gsap`, `@gsap/react`, `lenis`, `lucide-react`, `tailwind-merge`, `clsx`).
3. **Build `App.tsx` Stack:** Set up the exact Lenis + GSAP timeline stacking boilerplate outlined above.
4. **Build the Components:** Generate bespoke sections (Hero, Showcase, Manifesto, Footer) utilizing the new color palette while strictly adhering to the architectural and structural techniques described in this document.
5. **Quality Gate:** Verify it feels "effortless", not "expressive". Avoid unnecessary box-shadows, rounded UI borders, or bright contrasting buttons. The design must breathe.
