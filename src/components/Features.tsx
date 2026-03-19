import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';
import { cn } from './Navbar';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ShufflerCard() {
  const [cards, setCards] = useState(["Clarity", "Restraint", "Depth"]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const copy = [...prev];
        const last = copy.pop()!;
        copy.unshift(last);
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[350px] flex items-center justify-center bg-[#111] rounded-[3rem] overflow-hidden p-8 border border-white/5">
      <div className="absolute top-6 left-6 font-data text-xs text-brand-white/40 uppercase tracking-widest">Aesthetic Principles</div>
      <div className="relative w-full max-w-[220px] h-[180px]">
        {cards.map((lbl, idx) => {
          const yOffset = idx * 20;
          const scale = 1 - (idx * 0.08);
          const opacity = 1 - (idx * 0.3);
          const zIndex = 10 - idx;
          
          return (
             <div 
               key={lbl}
               className="absolute top-0 left-0 w-full bg-brand-white text-brand-black p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-brand-black/5"
               style={{
                 transform: `translateY(${yOffset}px) scale(${scale})`,
                 opacity,
                 zIndex,
                 transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
               }}
             >
                <div className="font-data tracking-tight text-[10px] mb-3 opacity-60">Pillar {cards.length - idx}</div>
                <div className="font-heading font-semibold text-base leading-snug">{lbl}</div>
             </div>
          );
        })}
      </div>
    </div>
  );
}

function TelemetryCard() {
  const messages = ["Crafting Design Systems...", "Refining Midnight Luxe Theme...", "Building Intuitive Flow...", "Executing Simplicity..."];
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentMsg = messages[msgIdx];

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setMsgIdx((prev) => (prev + 1) % messages.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentMsg.substring(0, displayedText.length - 1));
        }, 50);
      }
    } else {
      if (displayedText.length === currentMsg.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentMsg.substring(0, displayedText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, msgIdx, messages]);

  return (
    <div className="relative w-full h-[350px] flex flex-col justify-between bg-brand-black rounded-[3rem] overflow-hidden p-8 text-brand-white border border-brand-white/5">
      <div className="flex items-center justify-between w-full">
        <div className="font-data text-xs text-brand-white/40 uppercase tracking-widest">Active Thread</div>
        <div className="flex items-center gap-2">
          <span className="font-data text-[10px] text-brand-white/60">Live Build</span>
          <div className="w-2 h-2 rounded-full bg-brand-gray animate-pulse" />
        </div>
      </div>
      
      <div className="font-data text-lg leading-relaxed text-brand-white/90">
        <span className="text-brand-gray mr-2">~</span>
        {displayedText}
        <span className="inline-block w-2.5 h-5 ml-1 bg-brand-white align-middle animate-pulse" />
      </div>
    </div>
  );
}

function RegimenCard() {
  const container = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    tl.set(cursorRef.current, { x: 0, y: 150, opacity: 0, scale: 1 });
    tl.set(".day-btn", { scale: 1, backgroundColor: 'transparent', color: '#000000' });
    tl.set(saveRef.current, { scale: 1 });

    tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
      .to(cursorRef.current, {
        x: 100,
        y: 40,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(".day-btn-W", { 
        backgroundColor: '#0A0A0A', 
        color: '#FFFFFF', 
        scale: 0.95,
        duration: 0.1 
      }, "<")
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      .to(".day-btn-W", { scale: 1, duration: 0.1 }, "<")
      .to(cursorRef.current, {
        x: 130,
        y: 110,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(saveRef.current, { scale: 0.95, duration: 0.1 }, "<")
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      .to(saveRef.current, { scale: 1, duration: 0.1 }, "<")
      .to(cursorRef.current, {
        x: 250,
        y: 200,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      });
      
  }, { scope: container });

  const days = ['S','M','T','W','T','F','S'];

  return (
    <div ref={container} className="relative w-full h-[350px] flex flex-col items-center justify-center bg-brand-white rounded-[3rem] overflow-hidden p-8 border border-brand-black/10">
      <div className="absolute top-6 left-6 font-data text-xs text-brand-black/40 uppercase tracking-widest">Workflow Protocol</div>
      
      <div className="relative w-full max-w-[240px] mt-4 z-10">
        <div className="flex justify-between mb-8">
          {days.map((d, i) => (
            <div 
              key={i} 
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center font-outfit text-xs font-semibold border border-brand-black/10 day-btn text-brand-black",
                d === 'W' && "day-btn-W"
              )}
            >
              {d}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button ref={saveRef} className="px-5 py-2.5 rounded-full bg-[#171717] text-brand-white font-outfit text-sm font-semibold shadow-xl border border-white/5 transition-transform">
            Start Project
          </button>
        </div>
        
        <div 
          ref={cursorRef}
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none drop-shadow-xl z-20 text-brand-black"
          style={{ transform: 'translate(0px, 150px)', opacity: 0 }}
        >
          <MousePointer2 size={24} fill="#000000" />
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 w-full max-w-7xl mx-auto bg-brand-light/20">
      <div className="mb-16">
        <h2 className="font-heading font-medium text-4xl md:text-5xl text-brand-black flex flex-col gap-2">
          <span>The Digital</span>
          <span className="font-drama italic text-brand-gray text-5xl md:text-6xl">Systems Archive.</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card">
          <ShufflerCard />
        </div>
        <div className="feature-card relative top-0 md:top-12">
          <TelemetryCard />
        </div>
        <div className="feature-card relative top-0 md:top-24">
          <RegimenCard />
        </div>
      </div>
    </section>
  );
}
