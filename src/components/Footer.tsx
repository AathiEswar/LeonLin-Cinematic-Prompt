import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-brand-black text-brand-white rounded-t-[4rem] px-6 pt-24 pb-12 mt-32 relative overflow-hidden">
      {/* Optional Noise / Texture over Footer */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.05%22/%3E%3C/svg%3E')] mix-blend-multiply pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading font-bold text-4xl tracking-tight">Vantique Studio.</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-brand-gray animate-pulse" />
              <span className="font-data text-xs uppercase tracking-widest text-brand-gray/80">Systems Online</span>
            </div>
            <p className="font-outfit text-sm opacity-60 max-w-xs mt-4">
              A design-driven digital agency crafting interfaces that endure beyond trends. Built on Clarity, Restraint, and Depth.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 font-outfit text-sm opacity-80">
            <div className="flex flex-col gap-3">
              <span className="font-data text-xs opacity-50 uppercase tracking-widest mb-2">Capabilities</span>
              <a href="#about" className="hover:text-brand-gray transition-colors flex items-center gap-1 group">
                Philosophy <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#features" className="hover:text-brand-gray transition-colors flex items-center gap-1 group">
                Digital Systems <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#protocol" className="hover:text-brand-gray transition-colors flex items-center gap-1 group">
                Methodology <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-data text-xs opacity-50 uppercase tracking-widest mb-2">Connect</span>
              <a href="#" className="hover:text-brand-gray transition-colors">Awwwards</a>
              <a href="#" className="hover:text-brand-gray transition-colors">Twitter</a>
              <a href="#" className="hover:text-brand-gray transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-data text-xs opacity-50 uppercase tracking-widest mb-2">Legal</span>
              <a href="#" className="hover:text-brand-gray transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-gray transition-colors">Terms of Service</a>
              <button onClick={scrollToTop} className="text-left mt-4 text-brand-gray hover:opacity-80 transition-opacity flex items-center gap-2">
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data opacity-40">
          <p>&copy; {new Date().getFullYear()} Vantique Studio. All rights reserved.</p>
          <p>Rooted in simplicity, not noise.</p>
        </div>
      </div>
    </footer>
  );
}
