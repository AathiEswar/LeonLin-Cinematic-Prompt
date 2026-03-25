import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, Activity } from 'lucide-react';
import content from '../data/content.json';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HelixGear = () => (
  <div className="relative w-64 h-64 flex items-center justify-center animate-[spin_10s_linear_infinite]">
    <Settings size={200} className="text-brand-gray drop-shadow-lg" strokeWidth={1} />
    <div className="absolute inset-0 flex items-center justify-center animate-[spin_5s_linear_reverse_infinite]">
      <div className="w-32 h-32 border border-brand-black/20 rounded-full border-dashed" />
    </div>
  </div>
);

const LaserGrid = () => (
  <div className="relative w-64 h-64 border border-brand-black/10 bg-brand-light rounded-xl overflow-hidden shadow-inner">
    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-2">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="bg-brand-gray/10 rounded-sm" />
      ))}
    </div>
    {/* Laser scan line */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-brand-black shadow-[0_0_15px_#000] animate-pulse"
      style={{ animation: 'scan 2s linear infinite' }} />
    <style dangerouslySetInnerHTML={{
      __html: `
      @keyframes scan {
        0% { transform: translateY(0); }
        50% { transform: translateY(256px); }
        100% { transform: translateY(0); }
      }
    `}} />
  </div>
);

const Waveform = () => (
  <div className="relative w-72 h-40 flex items-center justify-center text-brand-black">
    <Activity size={180} strokeWidth={1} className="drop-shadow-lg animate-pulse" />
  </div>
);

const visualComponents: Record<string, React.FC> = {
  HelixGear,
  LaserGrid,
  Waveform,
};

const { heading, phases } = content.protocol;

const protocols = phases.map((p) => ({
  ...p,
  Visual: visualComponents[p.visualKey] || (() => null),
}));

export default function Protocol() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.stack-card') as HTMLElement[];

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.8,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 0",
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section id="protocol" ref={containerRef} className="relative w-full pb-12">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-brand-black to-brand-white z-[-1]" />

      <div className="w-full max-w-7xl mx-auto px-6 pt-16 pb-16">
        <h2 className="font-heading font-medium text-4xl md:text-5xl text-brand-white/90 flex flex-col gap-2">
          <span>{heading.line1}</span>
          <span className="font-drama italic text-brand-gray text-5xl md:text-6xl">{heading.line2}</span>
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6">
        {protocols.map((p, i) => (
          <div
            key={i}
            className={`stack-card sticky top-24 w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)] flex flex-col md:flex-row shadow-2xl rounded-[3rem] overflow-hidden ${p.color}`}
            style={{ zIndex: i + 1, marginBottom: '2rem', willChange: 'transform, filter, opacity', transformOrigin: 'top center' }}
          >
            {/* Visual Half */}
            <div className="card-content w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-brand-black/5 flex items-center justify-center p-12 bg-black/5 mix-blend-multiply">
              <p.Visual />
            </div>

            {/* Text Half */}
            <div className="card-content w-full md:w-1/2 h-1/2 md:h-full p-12 md:p-24 flex flex-col justify-center">
              <div className="font-data text-sm tracking-widest uppercase opacity-60 mb-6 border-b border-brand-black/10 pb-4 inline-block max-w-max">Phase {i + 1}</div>
              <h3 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mb-6">{p.title}</h3>
              <p className="font-outfit text-lg md:text-xl font-light leading-relaxed max-w-md opacity-80">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
