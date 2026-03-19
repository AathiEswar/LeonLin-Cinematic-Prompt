import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".split-word", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
      },
      y: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
    });

    gsap.to(".parallax-bg", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: 150,
      ease: 'none',
    });

    gsap.from(".fade-text", {
      scrollTrigger: {
        trigger: ".fade-text",
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

  }, { scope: containerRef });

  const renderWords = (text: string, isItalic = false) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-4 mr-3 md:mr-6">
        <span className={`inline-block split-word ${isItalic ? 'font-drama italic text-brand-gray' : 'font-heading font-bold'}`}>
          {word}
        </span>
      </span>
    ));
  };

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-brand-black text-brand-white overflow-hidden py-32"
    >
      {/* Background Image & Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center parallax-bg h-[120%] opacity-40 grayscale"
        style={{
          top: '-10%',
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop')"
        }}
      />
      <div className="absolute inset-0 z-10 bg-brand-black/90 mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 z-10 bg-gradient-to-t from-brand-black to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/3 z-10 bg-gradient-to-b from-brand-white to-transparent opacity-5" />
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
        <div className="mb-24 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-brand-gray"></div>
          <span className="font-data text-sm uppercase tracking-widest text-brand-gray">The Manifesto</span>
        </div>
        
        <div className="flex flex-col gap-12 md:gap-24 w-full md:w-4/5 text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-24">
          <div>
            {renderWords("Modern agencies ask:", false)}
            <br />
            {renderWords("What is trendy?", true)}
          </div>
          <div>
            {renderWords("We ask:", false)}
            <br />
            {renderWords("What is timeless?", true)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-brand-white/10">
          <div />
          <div>
            <p className="fade-text font-outfit text-lg md:text-xl text-brand-light/80 leading-relaxed font-light">
              Vantique Studio is a design-driven digital agency focused on creating experiences that feel timeless, intentional, and built to last. Guided by a refined, editorial aesthetic inspired by the Midnight Luxe style, the studio emphasizes clarity, restraint, and depth in every project.
              <br /><br />
              Its approach centers on crafting design systems that endure beyond trends, building interfaces that feel intuitive, consistent, and effortless, and delivering visual experiences rooted in simplicity rather than noise. 
              <br /><br />
              The goal is to help brands create digital products that not only stand out today but remain relevant over time, with a primary focus on inviting clients to start their project and build something lasting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
