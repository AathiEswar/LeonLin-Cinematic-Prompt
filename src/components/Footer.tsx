import { ArrowUpRight } from 'lucide-react';
import content from '../data/content.json';

const { availability, navigation, bottom } = content.footer;

export default function Footer() {
  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-brand-black text-brand-white rounded-t-[3rem] md:rounded-t-[6rem] px-6 md:px-12 pt-24 md:pt-32 pb-6 md:pb-8 flex flex-col items-center overflow-hidden relative">

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')] mix-blend-multiply pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 mb-12 lg:mb-20 relative z-10">

        {/* Left: Call to Action */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand-white animate-pulse" />
            <span className="font-data text-xs uppercase tracking-widest text-brand-white/50">{availability.label}</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.1]">
            {availability.heading.line1}<br />
            <span className="text-brand-white/40">{availability.heading.line2}</span>
          </h2>
          <div className="flex flex-col gap-4 mt-6">
            <a href={`mailto:${availability.email}`} className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-data bg-brand-white text-brand-black transition-all duration-300 w-fit group">
              {availability.email}
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>
            <a href={`https://wa.me/918072135754`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-data bg-brand-white text-brand-black transition-all duration-300 w-fit group">
              {availability.phone}
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-24 lg:w-1/2 justify-start lg:justify-end mt-8 lg:mt-0">
          <div className="flex flex-col gap-6">
            <span className="font-data text-xs uppercase tracking-widest text-brand-white/30 mb-2">{navigation.label}</span>
            {navigation.links.map((link) => (
              <a key={link.name} href={link.href} className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">{link.name}</a>
            ))}
          </div>
          {/* <div className="flex flex-col gap-6">
            <span className="font-data text-xs uppercase tracking-widest text-brand-white/30 mb-2">{socials.label}</span>
            {socials.links.map((link) => (
              <a key={link.name} href={link.href} className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">{link.name}</a>
            ))}
          </div> */}
        </div>
      </div>

      {/* Bottom Massive Brand Text & Copyright */}
      <div className="w-full relative flex flex-col items-center mt-auto z-10 border-t border-brand-white/10 pt-6 md:pt-10">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 font-data text-[10px] md:text-xs text-brand-white/40 uppercase tracking-widest gap-4 px-2 md:px-0 max-w-[1400px]">
          <span>&copy; {new Date().getFullYear()} {bottom.copyright}</span>
          <span className="hidden md:inline-block">{bottom.tagline}</span>
          <button onClick={scrollToTop} className="hover:text-brand-white transition-colors flex items-center gap-1 group">
            {bottom.backToTop} <ArrowUpRight size={12} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* The Huge Text */}
        <div className="w-full flex justify-center pb-2 md:pb-0 select-none">
          <h1 onClick={scrollToTop} className="font-heading font-black text-[20vw] md:text-[11vw] leading-[0.85] md:leading-[0.75] tracking-tighter text-brand-white flex flex-col md:flex-row md:gap-8 items-center justify-center opacity-90 uppercase cursor-pointer">
            {bottom.brandName.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </h1>
        </div>
      </div>

    </footer>
  );
}
