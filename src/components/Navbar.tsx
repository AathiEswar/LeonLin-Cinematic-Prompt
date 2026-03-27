import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import content from '../data/content.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const { brand, menuLinks, footer: menuFooter } = content.navbar;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  // Resize cleanup to close menu if resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        tl.current?.seek(0).pause();
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  useGSAP(() => {
    // Initial setup
    gsap.set('.menu-overlay', { display: 'none', opacity: 0 });
    gsap.set('.menu-link-wrapper', { y: 40, opacity: 0 });
    gsap.set('.menu-footer-el', { opacity: 0 });

    tl.current = gsap.timeline({ paused: true })
      .to('.menu-overlay', {
        display: 'flex',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .to('.menu-link-wrapper', {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out'
      }, "-=0.3")
      .to('.menu-footer-el', {
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, "-=0.5");
  }, { scope: container });

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      tl.current?.play();
    } else {
      tl.current?.reverse().then(() => setMenuOpen(false));
    }
  };

  const handleLinkClick = () => {
    // Smoothly close on navigation
    tl.current?.reverse().then(() => setMenuOpen(false));
  };

  return (
    <div ref={container} className="relative z-[99]">
      {/* Primary Navigation Bar */}
      <nav
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 transition-all duration-[0.4s] ease-[cubic-bezier(0.25,1,0.5,1)]',
          'w-11/12 max-w-7xl rounded-full px-6 md:px-10 flex items-center justify-between z-[60]',
          scrolled && !menuOpen
            ? 'bg-black/40 backdrop-blur-xl text-brand-white border border-white/10 shadow-lg py-3'
            : 'bg-transparent text-brand-white/80 border-transparent py-5'
        )}
      >
        <a href="#hero" className="font-heading font-bold tracking-tight text-xl uppercase relative z-[60] transition-colors duration-500 hover:text-white cursor-pointer">
          {brand}
        </a>

        {/* Right Area: Links & Hamburger */}
        <div className="flex items-center relative z-[60]">
          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-8 font-outfit text-sm font-medium group/nav">
            {menuLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative flex items-center transition-all duration-[0.4s] ease-out group/link",
                  link.name === 'Contact'
                    ? "px-5 py-2 rounded-full border border-brand-white/40 bg-brand-white/10 text-brand-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-brand-white hover:text-brand-black hover:scale-[1.03]"
                    : "px-2 py-1 opacity-100 group-hover/nav:opacity-40 hover:!opacity-100 hover:scale-[1.03] text-brand-white/90 hover:text-white"
                )}
              >
                <span className={cn(
                  "transition-transform duration-[0.4s] ease-out block",
                  link.name !== 'Contact' && "group-hover/link:-translate-y-[2px]"
                )}>
                  {link.name}
                </span>
                {link.name !== 'Contact' && (
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-[0.4s] ease-out group-hover/link:w-full" />
                )}
              </a>
            ))}
          </div>

          {/* Hamburger Trigger (Mobile Only) */}
          <button
            onClick={toggleMenu}
            className={cn(
              "flex lg:hidden items-center justify-center p-2 -mr-2 hover:opacity-70 transition-all duration-300",
              menuOpen ? "text-brand-white" : ""
            )}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-6 flex flex-col items-center justify-center relative">
              <span className={cn("block h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-full origin-center absolute", menuOpen ? "rotate-45" : "-translate-y-[4px]")} />
              <span className={cn("block h-[1.5px] bg-current transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-full origin-center absolute", menuOpen ? "-rotate-45" : "translate-y-[4px]")} />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu (Mobile Only) */}
      <div className="menu-overlay lg:!hidden fixed top-0 right-0 bottom-0 left-0 bg-[#0A0A0A] text-brand-white z-[55] flex flex-col justify-center px-6 sm:px-12 overflow-hidden">
        {/* Grain Noise Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.03%22/%3E%3C/svg%3E')] mix-blend-multiply pointer-events-none" />

        <div className="flex flex-col gap-5 sm:gap-8 relative z-10 w-full max-w-6xl mx-auto -mt-20">
          {menuLinks.map((link, i) => (
            <div key={link.name} className="overflow-hidden">
              <div className="menu-link-wrapper flex">
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="group flex items-center font-heading font-medium text-[9vw] sm:text-5xl md:text-7xl tracking-tight transition-all duration-500"
                >
                  <div className="flex items-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-4">
                    <span className="text-sm sm:text-lg md:text-2xl font-data opacity-30 tracking-[0.2em] mr-4 sm:mr-8 transition-opacity duration-500 group-hover:opacity-100 italic">0{i + 1}</span>
                    <span className="text-brand-white/80 group-hover:text-brand-white transition-colors duration-500 relative">
                      {link.name}
                      {/* Subtle underline reveal */}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info inside Menu */}
        <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 font-data text-[10px] sm:text-xs uppercase tracking-[0.1em] text-brand-white/40 flex flex-col gap-6 w-[calc(100%-3rem)] sm:w-[calc(100%-6rem)] max-w-6xl mx-auto">
          <div className="menu-footer-el flex flex-col gap-1">
            <span className="opacity-50 tracking-[0.2em]">{menuFooter.contact.label}</span>
            <a href={`mailto:${menuFooter.contact.email}`} className="text-brand-white/80 hover:text-brand-white hover:underline transition-all underline-offset-4 pointer-events-auto">{menuFooter.contact.email}</a>
            <a href={`https://wa.me/918072135754`} target="_blank" rel="noopener noreferrer" className="text-brand-white/80 hover:text-brand-white hover:underline transition-all underline-offset-4 pointer-events-auto">{menuFooter.contact.phone}</a>
          </div>
          {/* <div className="menu-footer-el flex flex-col gap-1">
            <span className="opacity-50 tracking-[0.2em]">{menuFooter.socials.label}</span>
            <div className="flex gap-6 pointer-events-auto">
              {menuFooter.socials.links.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-brand-white transition-colors">{link.name}</a>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
