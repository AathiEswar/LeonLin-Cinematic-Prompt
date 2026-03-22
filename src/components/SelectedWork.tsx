import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 1,
    title: "Aura Aesthetics",
    description: "E-Commerce Experience & Brand Identity",
    tag: "2026",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Lumina Studio",
    description: "Digital Platform & Editorial Design",
    tag: "2025",
    image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Onyx Protocol",
    description: "Web3 Interface & Motion System",
    tag: "2025",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Khora Architecture",
    description: "Immersive 3D Space & Interactive Web",
    tag: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".work-header-elem", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Project cards staggered reveal
    gsap.utils.toArray('.work-card').forEach((card) => {
      gsap.from(card as HTMLElement, {
        scrollTrigger: {
          trigger: card as HTMLElement,
          start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 1.6,
        ease: 'power3.out'
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-12 px-6 w-full bg-[#0D0D0D] text-brand-white">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-32 max-w-3xl">
          <span className="work-header-elem font-data text-xs uppercase tracking-[0.2em] text-brand-white/40">
            Selected Work
          </span>
          <h2 className="work-header-elem font-heading font-medium text-5xl md:text-7xl tracking-tight leading-[1.1]">
            Statements of <br />
            <span className="text-brand-white/50">taste & restraint.</span>
          </h2>
        </div>

        {/* Modular Asymmetric Grid */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 xl:gap-x-32 gap-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`work-card group cursor-pointer flex flex-col ${index % 2 === 1 ? 'md:mt-24' : ''}`}
            >
              {/* Image Container with subtle hover scale */}
              <div className="w-full relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#111] mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                />
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 ease-out" />
              </div>

              {/* Meta Details shifting upward slightly on hover */}
              <div className="flex justify-between items-start transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-3xl font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-outfit text-brand-white/40 text-base">
                    {project.description}
                  </p>
                </div>
                <span className="font-data text-xs text-brand-white/20 tracking-[0.2em] mt-2 group-hover:text-brand-white/40 transition-colors duration-700">
                  {project.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
