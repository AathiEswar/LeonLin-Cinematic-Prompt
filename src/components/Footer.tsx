import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <span className="font-data text-xs uppercase tracking-widest text-brand-white/50">Available for Work</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.1]">
            Have an idea?<br />
            <span className="text-brand-white/40">Let's build it.</span>
          </h2>
          <a href="mailto:hello@vantique.studio" className="inline-flex items-center gap-2 mt-6 rounded-full border border-brand-white/20 px-8 py-4 text-sm font-data hover:bg-brand-white hover:text-brand-black transition-all duration-300 w-fit group">
            hello@vantique.studio
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-24 lg:w-1/2 justify-start lg:justify-end mt-8 lg:mt-0">
          <div className="flex flex-col gap-6">
            <span className="font-data text-xs uppercase tracking-widest text-brand-white/30 mb-2">Navigation</span>
            <a href="#features" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Digital Systems</a>
            <a href="#work" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Selected Work</a>
            <a href="#philosophy" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Philosophy</a>
            <a href="#protocol" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Methodology</a>
            <a href="#membership" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Membership</a>
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-data text-xs uppercase tracking-widest text-brand-white/30 mb-2">Socials</span>
            <a href="#" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Awwwards</a>
            <a href="#" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Twitter (X)</a>
            <a href="#" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">LinkedIn</a>
            <a href="#" className="font-outfit text-xl md:text-2xl hover:text-brand-white/60 transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Massive Brand Text & Copyright */}
      <div className="w-full relative flex flex-col items-center mt-auto z-10 border-t border-brand-white/10 pt-6 md:pt-10">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 font-data text-[10px] md:text-xs text-brand-white/40 uppercase tracking-widest gap-4 px-2 md:px-0 max-w-[1400px]">
          <span>&copy; {new Date().getFullYear()} Vantique Studio.</span>
          <span className="hidden md:inline-block">Built on Clarity, Restraint, and Depth.</span>
          <button onClick={scrollToTop} className="hover:text-brand-white transition-colors flex items-center gap-1 group">
            Back to Top <ArrowUpRight size={12} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* The Huge Text */}
        <div className="w-full flex justify-center pb-2 md:pb-0 select-none">
          <h1 className="font-heading font-black text-[20vw] md:text-[11vw] leading-[0.85] md:leading-[0.75] tracking-tighter text-brand-white flex flex-col md:flex-row md:gap-8 items-center justify-center opacity-90 uppercase">
            <span>Vantique</span>
            <span>Studio</span>
          </h1>
        </div>
      </div>

    </footer>
  );
}
