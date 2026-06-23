import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-transparent pt-16 pb-12 px-6 z-10 relative">
      {/* Header section spacing */}

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-20">
          
          {/* Brand Side */}
          <div className="flex flex-col justify-between max-w-[360px]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="ShareXpress" className="w-[20px] h-[20px] object-contain" />
                <span className="text-[14px] tracking-[0.06em] text-white/90 font-medium">
                  Share<span className="font-bold">Xpress</span>
                </span>
              </div>
              <p className="text-[14px] font-normal text-white/30 leading-[1.8]">
                An umbrella technology corporation building, incubating, and scaling production-ready developer systems and digital platforms.
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-16">
            
            {/* Products Column */}
            <div>
              <h5 className="text-[11px] tracking-[0.08em] text-white/25 uppercase font-semibold mb-6">Products</h5>
              <ul className="space-y-4">
                <li>
                  <a href="https://interleet.sharexpress.in" className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline inline-flex items-center gap-1.5 group">
                    Interleet
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="https://distribution.sharexpress.in" className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline inline-flex items-center gap-1.5 group">
                    Distribution Services
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="https://cloud.sharexpress.in" className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline inline-flex items-center gap-1.5 group">
                    Cloud Platform
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigation Column */}
            <div>
              <h5 className="text-[11px] tracking-[0.08em] text-white/25 uppercase font-semibold mb-6">Infrastructure</h5>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => scrollToSection('ecosystem')} className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Visualizer
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('why-sharexpress')} className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Design Pillars
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('tech-stack')} className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Core Stack
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('vision')} className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Founder Manifesto
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h5 className="text-[11px] tracking-[0.08em] text-white/25 uppercase font-semibold mb-6">Legal</h5>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] font-normal text-white/35 hover:text-white/80 transition-colors duration-400 link-underline">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/[0.05] gap-4">
          <p className="text-[12px] text-white/15 font-normal tracking-[0.01em]">
            &copy; {currentYear} ShareXpress. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-pulse"></span>
            <span className="text-[11px] text-white/15 font-medium tracking-[0.02em]">All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
