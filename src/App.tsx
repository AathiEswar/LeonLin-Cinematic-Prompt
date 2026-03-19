import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Membership from './components/Membership';
import Footer from './components/Footer';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 500);
    });
    gsap.ticker.lagSmoothing(0);

    const sections = gsap.utils.toArray('.stack-section') as HTMLElement[];
    sections.forEach((section, i) => {
      if (i < sections.length - 1) {
        // Pin section dynamically based on height
        ScrollTrigger.create({
          trigger: section,
          start: () => section.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true, // Recalculate heights on resize
        });

        // Animate scaling and blur when the NEXT section overlaps it
        gsap.to(section, {
          scale: 0.92,
          opacity: 0.6,
          filter: "blur(5px)",
          ease: "none",
          scrollTrigger: {
            trigger: sections[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div className="noise-bg" />

      <Navbar />

      {/* Replaced sticky top-0 with relative positioning for GSAP pinning */}
      <main ref={mainRef} className="flex flex-col min-h-screen bg-brand-black">
        <div className="stack-section relative w-full min-h-screen z-[1] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Hero /></div>
        <div className="stack-section relative w-full min-h-screen z-[2] bg-brand-white origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Features /></div>
        <div className="stack-section relative w-full min-h-screen z-[3] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Philosophy /></div>
        <div className="stack-section relative w-full min-h-screen z-[4] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Protocol /></div>
        <div className="stack-section relative w-full min-h-screen z-[5] bg-brand-white origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Membership /></div>
        <div className="stack-section relative w-full z-[6] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Footer /></div>
      </main>
    </>
  );
}

export default App;
