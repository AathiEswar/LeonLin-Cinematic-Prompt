import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';

import content from '../data/content.json';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { heading, webDesign, development, branding } = content.features as any;

function DarkServiceCard() {
  return (
    <div className="relative w-full h-[350px] flex flex-col justify-end bg-[#111] rounded-[3rem] overflow-hidden p-8 text-brand-white border border-white/5 group">
      <div className="absolute top-6 left-6 font-data text-xs text-brand-white/40 uppercase tracking-widest">{webDesign.label}</div>
      <div className="flex flex-col gap-4 relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
        <h3 className="font-heading font-medium text-5xl leading-tight">{webDesign.title}</h3>
        <p className="font-outfit text-base text-brand-white/60 leading-relaxed max-w-[90%]">{webDesign.description}</p>
      </div>
    </div>
  );
}

function TerminalServiceCard() {
  const messages = development.messages;
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
        }, 80);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, msgIdx, messages]);

  return (
    <div className="relative w-full h-[350px] flex flex-col justify-between bg-[#0A0A0A] rounded-[3rem] overflow-hidden p-8 text-brand-white border border-brand-white/5">
      <div className="flex items-center justify-between w-full">
        <div className="font-data text-xs text-brand-white/40 uppercase tracking-widest">{development.label}</div>
        <div className="flex items-center gap-2">
          <span className="font-data text-[10px] text-brand-white/60">{development.statusLabel}</span>
          <div className="w-2 h-2 rounded-full bg-brand-gray animate-pulse" />
        </div>
      </div>
      
      <div className="font-data text-xl leading-relaxed text-brand-white/90">
        <span className="text-brand-gray mr-3">~</span>
        {displayedText}
        <span className="inline-block w-3 h-6 ml-1 bg-brand-white align-middle animate-pulse" />
      </div>
    </div>
  );
}

function LightServiceCard() {
  const container = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    tl.set(cursorRef.current, { x: 30, y: 180, opacity: 0, scale: 1 });
    tl.set(saveRef.current, { scale: 1 });

    tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
      .to(cursorRef.current, {
        x: 125,
        y: 118,
        duration: 0.9,
        ease: 'power2.inOut'
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(saveRef.current, { scale: 0.95, border: '1px solid rgba(0,0,0,0.1)', duration: 0.1 }, "<")
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      .to(saveRef.current, { scale: 1, border: '1px solid rgba(0,0,0,0)', duration: 0.1 }, "<")
      .to(cursorRef.current, {
        x: 230,
        y: 200,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      });
      
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full h-[350px] flex flex-col justify-between items-center bg-brand-white rounded-[3rem] overflow-hidden p-8 border border-brand-black/10">
      <div className="absolute top-6 left-6 w-full text-left font-data text-xs text-brand-black/40 uppercase tracking-widest">{branding.label}</div>
      
      <div className="relative w-full max-w-[260px] flex flex-col items-center gap-10 mt-16 z-10">
        <h3 className="font-heading font-medium text-[2.5rem] tracking-tight text-brand-black text-center">{branding.title}</h3>
        
        <button ref={saveRef} className="px-6 py-3 rounded-full bg-[#171717] text-brand-white font-outfit text-sm font-semibold shadow-2xl transition-transform">
          {branding.buttonText}
        </button>
        
        <div 
          ref={cursorRef}
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none drop-shadow-2xl z-20 text-brand-black"
          style={{ transform: 'translate(0px, 150px)', opacity: 0 }}
        >
          <MousePointer2 size={26} fill="#000000" />
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
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 w-full max-w-7xl mx-auto bg-brand-light/20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
      <div className="mb-20">
        <h2 className="font-heading font-medium text-5xl md:text-7xl text-brand-black flex flex-col gap-2 tracking-tight">
          <span>{heading.line1}</span>
          <span className="font-drama italic text-brand-gray text-6xl md:text-8xl">{heading.line2}</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card">
          <DarkServiceCard />
        </div>
        <div className="feature-card relative top-0 md:top-16">
          <TerminalServiceCard />
        </div>
        <div className="feature-card relative top-0 md:top-32">
          <LightServiceCard />
        </div>
      </div>
    </section>
  );
}
