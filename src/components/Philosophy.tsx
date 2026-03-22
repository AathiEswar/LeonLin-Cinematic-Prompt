import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.from('.about-heading', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out'
    })
      .from('.about-subtext', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=0.8")
      .from('.about-capabilities span', {
        y: 10,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-brand-white text-brand-black overflow-hidden py-20"
    >
      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.06%22/%3E%3C/svg%3E')] mix-blend-multiply pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-24 md:gap-32">

        {/* Top: 2-Part Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-24">

          {/* Left: Primary Statement */}
          <div className="lg:w-[55%] flex flex-col gap-6">
            <span className="about-heading font-data text-xs uppercase tracking-[0.2em] text-brand-black/60">Studio</span>
            <h2 className="about-heading font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-brand-black">
              We design and build digital experiences that feel as good as they look.
            </h2>
          </div>

          {/* Right: Supporting Content */}
          <div className="lg:w-[40%] flex flex-col lg:pb-3">
            <p className="about-subtext font-outfit text-lg md:text-xl text-brand-black/80 leading-relaxed font-normal max-w-sm md:max-w-md">
              We focus on clarity, motion, and structure — crafting interfaces that are not just visually refined, but functionally precise.
            </p>
          </div>
        </div>

        {/* Bottom: Capabilities Layer */}
        <div className="about-capabilities font-data text-xs md:text-sm uppercase tracking-[0.15em] text-brand-black/70 flex flex-wrap items-center gap-4 md:gap-6 pt-12 border-t border-brand-black/10">
          <span>Design</span>
          <span className="text-brand-black/30">/</span>
          <span>Development</span>
          <span className="text-brand-black/30">/</span>
          <span>Branding</span>
          <span className="text-brand-black/30">/</span>
          <span>Systems</span>
        </div>

      </div>
    </section>
  );
}
