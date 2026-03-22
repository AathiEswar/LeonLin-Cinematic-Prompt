import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import SelectedWork from './components/SelectedWork';
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

    // Handle smooth scrolling for anchor links to prevent GSAP jumps
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hash && target.hash.startsWith('#') && target.origin === window.location.origin) {
        e.preventDefault();
        lenis.scrollTo(target.hash, { offset: 0, duration: 1.5 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

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
          endTrigger: sections[i + 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true, // Recalculate heights on resize
        });

        // Animate scaling and blur when the NEXT section overlaps it
        gsap.to(section, {
          scale: 0.85,
          opacity: 0.8,
          filter: "blur(5px)",
          ease: "none",
          scrollTrigger: {
            trigger: sections[i + 1],
            start: "top 70%", // Transition starts later (when next section is 60% up)
            end: "top top",
            scrub: true,
          }
        });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
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
        <div id="hero" className="stack-section relative w-full min-h-screen mb-[50vh] z-[1] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Hero /></div>
        <div id="features" className="stack-section relative w-full min-h-screen mb-[50vh] z-[2] bg-brand-white origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Features /></div>
        <div id="work" className="stack-section relative w-full min-h-screen mb-[50vh] z-[3] bg-[#0D0D0D] origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><SelectedWork /></div>
        <div id="philosophy" className="stack-section relative w-full min-h-screen mb-[50vh] z-[4] bg-brand-white origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Philosophy /></div>
        <div id="protocol" className="stack-section relative w-full min-h-screen mb-[50vh] z-[5] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Protocol /></div>
        <div id="membership" className="stack-section relative w-full min-h-screen mb-[50vh] z-[6] bg-brand-white origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Membership /></div>
        <div id="footer" className="stack-section relative w-full z-[7] bg-brand-black origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)]"><Footer /></div>
      </main>
    </>
  );
}

export default App;
