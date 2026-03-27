import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import content from '../data/content.json';

gsap.registerPlugin(useGSAP);

const { headline, description, backgroundImage } = content.hero;

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.from('.hero-text', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.5,
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative w-full h-[100dvh] flex items-end justify-start overflow-hidden bg-brand-black/90"
    >
      {/* Background Image & Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url('${backgroundImage}')`
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent" />
      <div className="absolute inset-0 z-10 bg-black/20 mix-blend-multiply" />
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 lg:w-2/3 lg:mx-0 lg:pl-24">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text text-brand-white font-heading font-bold text-5xl md:text-7xl lg:text-[7rem] leading-none tracking-tight">
            {headline[0]}
          </span>
          <span className="hero-text text-brand-gray font-drama italic text-6xl md:text-8xl lg:text-[9rem] leading-none pr-4">
            {headline[1]}
          </span>
        </h1>
        <p className="hero-text mt-8 text-brand-light font-outfit text-lg md:text-xl max-w-md font-light leading-relaxed opacity-80">
          {description}
        </p>
      </div>
    </section>
  );
}
