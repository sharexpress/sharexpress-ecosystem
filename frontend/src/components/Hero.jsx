import React, { useRef } from 'react';
import { ArrowDown, Layers, LayoutGrid, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-transparent px-6">

      {/* Hero Content */}
      <div className="relative z-10 max-w-[860px] text-center flex flex-col items-center">
        {/* Status Badge */}
        <div 
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-500 mb-12 animate-fade-in cursor-default group"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
          </span>
          <span className="text-[12px] tracking-[0.04em] font-medium text-white/45 group-hover:text-white/60 transition-colors">
            ShareXpress Core // Autonomous Developer Ecosystem
          </span>
        </div>

        {/* Main Title */}
        <h1 
          className="heading-display text-[clamp(38px,7.5vw,88px)] text-white mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
        >
          <span className="text-gradient-premium block">A Foundation for</span>
          <span className="block mt-1 sm:mt-2">
            <span className="text-gradient-subtle">Autonomous Systems.</span>
          </span>
          <span className="block mt-1 sm:mt-2 font-light text-white/30 tracking-[-0.03em]">One Namespace. Multiple Verticals.</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="max-w-[620px] text-white/40 text-[clamp(15px,1.7vw,18px)] font-normal leading-[1.8] tracking-[-0.005em] mb-14 animate-fade-in-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          ShareXpress is an umbrella technology corporation. We design, deploy, and scale high-performance developer systems, cloud infrastructure, and software engines under a single, unified namespace.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
          style={{ animationDelay: '0.65s', animationFillMode: 'both' }}
        >
          <button
            onClick={() => scrollToSection('ecosystem')}
            className="btn-primary group/btn"
          >
            <Layers size={16} className="group-hover/btn:rotate-12 transition-transform duration-400" />
            <span>Explore Ecosystem</span>
          </button>
          
          <button
            onClick={() => scrollToSection('products')}
            className="btn-secondary group/btn"
          >
            <LayoutGrid size={16} className="group-hover/btn:scale-110 transition-transform duration-400" />
            <span>Review Specifications</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection('ecosystem')}
          className="flex flex-col items-center text-white/20 hover:text-white/45 transition-all duration-500 z-10 group mt-16 md:mt-24 animate-fade-in-up"
          style={{ animationDelay: '0.75s', animationFillMode: 'both' }}
        >
          <span className="text-[10px] tracking-[0.2em] font-medium uppercase mb-3">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/15 to-transparent group-hover:from-white/35 transition-all duration-500" />
        </button>
      </div>
    </section>
  );
}
