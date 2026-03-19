import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out',
        'w-11/12 max-w-5xl rounded-full px-6 py-4 flex items-center justify-between',
        scrolled 
          ? 'bg-brand-white/80 backdrop-blur-md text-brand-black border border-brand-black/10 shadow-lg' 
          : 'bg-transparent text-brand-white border-transparent'
      )}
    >
      <div className="font-heading font-bold tracking-tight text-xl uppercase">
        Vantique
      </div>
      <div className="hidden md:flex items-center gap-8 font-outfit text-sm font-medium">
        <a href="#about" className="hover:text-brand-gray transition-colors">Philosophy</a>
        <a href="#features" className="hover:text-brand-gray transition-colors">Digital Systems</a>
        <a href="#protocol" className="hover:text-brand-gray transition-colors">Methodology</a>
        <a href="#membership" className="hover:text-brand-gray transition-colors">Engagements</a>
      </div>
      <button className="flex items-center gap-2 font-outfit text-sm font-semibold hover:text-brand-gray transition-colors">
        <span className="hidden md:inline">Start Project</span>
        <Menu size={20} />
      </button>
    </nav>
  );
}
