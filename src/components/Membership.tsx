import { Check } from 'lucide-react';
import { cn } from './Navbar';

const plans = [
  {
    name: "Foundation",
    price: "Custom",
    period: "Quote",
    description: "Essential architecture and responsive design systems.",
    features: ["Clarity Consultation", "Wireframe Blueprints", "Standard Build"],
    popular: false,
    btnClass: "bg-brand-black text-brand-white hover:opacity-90",
    cardClass: "bg-brand-white text-brand-black border border-brand-black/10 shadow-sm"
  },
  {
    name: "Midnight Luxe",
    price: "Custom",
    period: "Quote",
    description: "Timeless UI/UX with cinematic micro-interactions.",
    features: ["Deep Strategy", "Bespoke Design System", "Fluid Motion", "Priority Assembly"],
    popular: true,
    btnClass: "bg-brand-white text-brand-black hover:opacity-90",
    cardClass: "bg-brand-black text-brand-white transform scale-105 shadow-2xl relative z-10"
  },
  {
    name: "Avant-Garde",
    price: "Retainer",
    period: "",
    description: "Ongoing evolution for enduring digital dominance.",
    features: ["Continuous Iteration", "Advanced Telemetry", "Dedicated Architect", "SLA Guarantee"],
    popular: false,
    btnClass: "bg-brand-black text-brand-white hover:opacity-90",
    cardClass: "bg-brand-light text-brand-black border border-brand-black/10 shadow-sm"
  }
];

export default function Membership() {
  return (
    <section id="membership" className="py-32 px-6 w-full max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="font-heading font-medium text-4xl md:text-5xl text-brand-black flex items-center justify-center gap-2">
          <span>Project</span>
          <span className="font-drama italic text-brand-gray text-5xl md:text-6xl">Engagements.</span>
        </h2>
        <p className="font-outfit text-brand-black/60 mt-4 max-w-md mx-auto">
          Partner with our architects to craft interfaces that endure beyond trends.
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
                Refined Choice
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
