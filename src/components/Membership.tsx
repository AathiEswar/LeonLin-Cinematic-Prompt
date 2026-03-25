import { Check } from 'lucide-react';
import { cn } from './Navbar';
import content from '../data/content.json';

const { heading, subtext, popularLabel, plans } = content.membership;

export default function Membership() {
  return (
    <section id="membership" className="py-32 px-6 w-full max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="font-heading font-medium text-4xl md:text-5xl text-brand-black flex items-center justify-center gap-2">
          <span>{heading.line1}</span>
          <span className="font-drama italic text-brand-gray text-5xl md:text-6xl">{heading.line2}</span>
        </h2>
        <p className="font-outfit text-brand-black/60 mt-4 max-w-md mx-auto">
          {subtext}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 items-center pt-8">
        {plans.map((p, i) => (
          <div 
            key={i} 
            className={cn(
              "group p-10 rounded-[3rem] transition-all duration-300 hover:shadow-xl",
              p.cardClass
            )}
          >
            {p.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gray text-brand-white font-data text-xs uppercase tracking-widest px-4 py-1.5 rounded-full z-20 shadow-md">
                {popularLabel}
              </div>
            )}
            
            <h3 className="font-heading font-bold text-2xl tracking-tight mb-2">{p.name}</h3>
            <p className="font-outfit text-sm opacity-70 mb-8 min-h-[40px]">{p.description}</p>
            
            <div className="mb-8 flex items-end gap-2">
              <span className="font-heading text-4xl tracking-tight leading-none">{p.price}</span>
              <span className="font-data text-sm opacity-60 pb-1">{p.period}</span>
            </div>
            
            <ul className="space-y-4 mb-10 font-outfit text-sm">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 opacity-90">
                  <span className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center bg-black/5",
                    p.popular && "bg-white/10 text-brand-white"
                  )}>
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            
            <button className={cn(
              "w-full py-4 rounded-full font-heading font-semibold text-sm transition-transform hover:scale-[1.02]",
              p.btnClass
            )}>
              Select {p.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
