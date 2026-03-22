---
description: A complete catalog of cinematic components, GSAP animation patterns, and UI structures. Use this library skill to quickly apply ultra-premium effects to any section or component based on user request.
---

# Cinematic Component & Animation Library

## Usage Directive
When the USER invokes this skill or asks for a specific cinematic effect (e.g., "Add the morphing hamburger menu", "Apply the cinematic scrolling stack", or "Use the asymmetric grid"), **refer to the exact code patterns, easing functions, and mathematical values detailed below.** 
Do not approximate or invent generic animations. Use these precise mathematical constants and Tailwind properties to maintain the high-end Awwwards-style identity.

---

## 1. Global Effect: Cinematic Stacking Scroll
**Behavior:** Full-screen sections stay rigidly pinned while the next section slides over them, causing the pinned background section to shrink, dim, and blur slightly—creating a sense of deep Z-axis layering.

**Implementation Rules (App Level):**
1. Ensure `Lenis` is running for smooth scroll interception (duration ~1.2).
2. Apply the class `.stack-section` to all direct section children.
3. Every section wrapper must have these core Tailwind bounds: `relative w-full min-h-screen origin-top md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:mb-[50vh]`. 
4. Wrap GSAP ScrollTrigger creation in `gsap.matchMedia("(min-width: 768px)")` so the overlapping physics remain disabled on mobile devices.

**GSAP Logic:**
```javascript
const mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
  const sections = gsap.utils.toArray('.stack-section');
  sections.forEach((section, i) => {
    if (i < sections.length - 1) {
      ScrollTrigger.create({
        trigger: section,
        start: () => section.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        endTrigger: sections[i + 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
      gsap.to(section, {
        scale: 0.85,
        opacity: 0.8,
        filter: "blur(2px)", // or up to 5px depending on intensity
        ease: "none",
        scrollTrigger: {
          trigger: sections[i + 1],
          start: "top 70%", // Only start fading when the covering section is firmly ascending
          end: "top top",
          scrub: true,
        }
      });
    }
  });
});
```

---

## 2. Component: Morphing 2-Line Hamburger Menu
**Behavior:** A deep, silencing full-screen mobile void. The hamburger trigger strictly consists of two thin lines that elegantly morph into an X without text clutter.

**Trigger JSX:**
```tsx
<button aria-label="Toggle Menu" className="flex items-center justify-center p-2 hover:opacity-70 transition-all duration-300">
  <div className="w-6 h-6 flex flex-col items-center justify-center relative">
    <span className={cn("block h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-full origin-center absolute", menuOpen ? "rotate-45" : "-translate-y-[4px]")} />
    <span className={cn("block h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-full origin-center absolute", menuOpen ? "-rotate-45" : "translate-y-[4px]")} />
  </div>
</button>
```

**Overlay Typography & Easing:**
- Container: `fixed top-0 right-0 bottom-0 left-0 bg-[#0A0A0A] overflow-hidden`.
- Links: Must scale to viewport sizes (e.g. `text-[9vw] sm:text-5xl md:text-7xl`) and include a slight right-translation on group-hover (`group-hover:translate-x-4`).
- GSAP Reveal Timeline: Fade in overlay over `0.6s ease: "power3.inOut"`. Stagger link appearance via `y: 40 -> 0` over `0.9s ease: "power4.out" stagger: 0.1`.

---

## 3. UI Element: SVG Grain / Noise Texture
**Behavior:** Eradicates digital sterility by blending geometric structural static into flat colors to emulate raw analog film depth.

**Tailwind Inject:**
```tsx
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')] mix-blend-multiply pointer-events-none" />
```
*(Crucial Variant Rule: Modify `mix-blend-screen` with a lower opacity like `0.03` exclusively for dark mode sections. Use `mix-blend-multiply` with a higher opacity like `0.06` for stark white sections).*

---

## 4. UI Structure: Asymmetric Showcase Grid
**Behavior:** Displaying large monolithic cards in an uneven, editorially staggered 2-column layout.

**Grid Architecture:**
- Grid CSS: `grid grid-cols-1 md:grid-cols-2 gap-x-12 xl:gap-x-32 gap-y-16`.
- Map Stagger Logic: Inject `md:mt-24` on odds to break vertical symmetry.
```tsx
<div className={`group cursor-pointer flex flex-col ${index % 2 === 1 ? 'md:mt-24' : ''}`}>
```

**Premium "Hover" Physics Rulebook:**
- Images require absolute aspect clamping: `w-full relative aspect-[4/5] overflow-hidden`.
- Inner Image scale factor: `transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]`. (Note the micro-scale offset against the extreme duration length).
- Secondary Meta-Text: `transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2`.

---

## 5. UI Structure: The Editorial "Studio/About" Split
**Behavior:** Utilizing harsh negative space to emphasize confidence. 
**Implementation Blueprint:**
- Wrap in a massively spaced container: `py-32 md:py-48`.
- Flex Layout: `flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-24`.
- Left Side (Primary Identity): Takes up `lg:w-[55%]`. Consists purely of a massive, heavily restricted statement spanning 2-3 lines `text-4xl lg:text-6xl tracking-tight leading-[1.1]`.
- Right Side (Secondary Context): Takes up `lg:w-[40%]`. A muted (`text-opacity-80`) explanatory paragraph explicitly pushed down to align near the baseline of the main header.

---

## 6. Component: The Vast Anchor Footer
**Behavior:** Reject standard crowded footers in favor of an imposing, architectural bedrock layer that slowly reveals underneath the primary stacking mechanism.

**Implementation Checklist:**
- Master Container: Minimum `pt-20` and massive rounded corners `rounded-t-[4rem] md:rounded-t-[6rem]` clipping any internal overflow.
- Brand Stamp: Absolute or relative baseline text scaling across the entire width of the view. `text-[12vw] uppercase font-heading text-center leading-[0.8] tracking-tighter mix-blend-overlay opacity-80 mt-12`.
- Small links/socials constrained near the absolute top curve edge to preserve the vastness of the stamp.

---

## 7. Full Layout Templates
Here are the stripped-down, structural boilerplate codes for the key cinematic components to use as architectural references.

### A. The Studio/About Section (`Philosophy.tsx`)
```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } });
    tl.from('.about-heading', { y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' })
      .from('.about-subtext', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
      .from('.about-capabilities span', { y: 10, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-brand-white text-brand-black overflow-hidden py-20">
      <div className="absolute inset-0 bg-[noise-url] mix-blend-multiply opacity-[0.06] pointer-events-none" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-24 md:gap-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-24">
          <div className="lg:w-[55%] flex flex-col gap-6">
            <span className="about-heading font-data text-xs uppercase tracking-[0.2em] text-brand-black/60">Studio</span>
            <h2 className="about-heading font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15]">Primary Statement.</h2>
          </div>
          <div className="lg:w-[40%] flex flex-col lg:pb-3">
            <p className="about-subtext font-outfit text-lg md:text-xl text-brand-black/80 leading-relaxed font-normal">Supporting context.</p>
          </div>
        </div>
        <div className="about-capabilities font-data text-xs md:text-sm uppercase tracking-[0.15em] text-brand-black/70 flex flex-wrap items-center gap-4 md:gap-6 pt-12 border-t border-brand-black/10">
          <span>Design</span><span className="text-brand-black/30">/</span><span>Systems</span>
        </div>
      </div>
    </section>
  );
}
```

### B. The Asymmetric Showcase (`SelectedWork.tsx`)
```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.work-header', { scrollTrigger: { trigger: '.work-header', start: 'top 80%' }, y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.utils.toArray('.work-card').forEach((card: any) => {
      gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 85%' }, y: 80, opacity: 0, duration: 1.2, ease: 'power3.out' });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-12 px-6 w-full bg-[#0D0D0D] text-brand-white">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="work-header flex flex-col gap-6 mb-32 max-w-3xl">
          <span className="font-data text-xs uppercase tracking-[0.2em] text-brand-white/40">Selected Work</span>
          <h2 className="font-heading font-bold text-5xl md:text-7xl tracking-tight leading-[1.1]">Header.</h2>
        </div>
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 xl:gap-x-32 gap-y-16">
          {[1,2,3,4].map((id, index) => (
            <div key={id} className={`work-card group cursor-pointer flex flex-col ${index % 2 === 1 ? 'md:mt-24' : ''}`}>
              <div className="w-full relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#111] mb-8">
                <img src="..." className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 ease-out" />
              </div>
              <div className="flex justify-between items-start transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl">Title</h3>
                  <span className="font-outfit text-brand-white/60 font-medium">Tag</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### C. The Vast Footer Layout (`Footer.tsx`)
```tsx
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] text-brand-white pt-24 md:pt-40 rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 mb-32 lg:mb-48">
        <h3 className="font-heading font-bold text-4xl lg:text-6xl tracking-tight leading-[1.1] max-w-lg mb-8">
          Have an idea? <br/><span className="text-brand-white/50">Let's build it.</span>
        </h3>
        <button className="group flex items-center gap-4 px-8 py-4 bg-brand-white text-brand-black rounded-full hover:bg-brand-gray transition-colors">
          Start Project <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
      <div className="w-full flex items-end justify-center mix-blend-overlay opacity-80 mt-12">
        <h1 className="text-[14vw] md:text-[16vw] xl:text-[18vw] uppercase font-heading font-black leading-[0.75] tracking-tighter">
          VANTIQUE
        </h1>
      </div>
    </footer>
  );
}
```

---

## 8. Effect Calling Reference Menu
When you want to use this skill, you can explicitly ask the AI to inject any of these specific modules into your project by referencing these exact phrases:

- **"Apply the Cinematic Stacking Scroll"**: Installs the z-depth background pinning, scale-down, and blur transition triggered upon scrolling.
- **"Use the Morphing Void Menu"**: Generates a deep fullscreen takeover mobile navigation with staggered oversized links and a 2-line minimalist toggler.
- **"Inject the Deep Analog Grain"**: Overlays the precise SVG noise logic (`mix-blend-multiply`/`screen` at specific opacities) to remove digital flatness.
- **"Build the Asymmetric Showcase Grid"**: Crafts the offset 2-column grid featuring the slow `1.5s` duration, `scale: 1.03` premium micro-hover physics.
- **"Use the Editorial Split Layout"**: Scaffolds a hyper-minimal 55%/40% horizontal split emphasizing a massive typography statement and a muted subtext anchor.
- **"Apply the Bottomless Anchor Footer"**: Builds the massive `rounded-t-[6rem]` architectural footer grounded by viewport-spanning baseline typography.
