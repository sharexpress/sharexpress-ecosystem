import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'Ecosystem', id: 'ecosystem' },
  { label: 'Products', id: 'products' },
  { label: 'Methodology', id: 'why-sharexpress' },
  { label: 'Stack', id: 'tech-stack' },
  { label: 'Manifesto', id: 'vision' },
];

export default function Navbar({ onNavigateConsole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      let current = '';
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[92%] max-w-[1060px] ${
        scrolled
          ? 'top-4 py-2.5 px-5 bg-black/50 backdrop-blur-2xl border border-white/[0.06] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]'
          : 'top-6 py-4 px-6 bg-transparent border border-transparent rounded-2xl'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src={logoImg} alt="sharexpress" className="w-[24px] h-[24px] object-contain transition-all duration-500 group-hover:scale-110" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0.5 px-1 py-0.5 bg-white/[0.03] border border-white/[0.05] rounded-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-[13px] font-medium tracking-[-0.005em] rounded-[10px] transition-all duration-500 ${
                activeSection === link.id
                  ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => scrollToSection('contact')}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-semibold tracking-[-0.01em] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(255,255,255,0.20)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <span className={`absolute block h-[1.5px] w-4 bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-45' : '-translate-y-[3.5px]'}`} />
            <span className={`absolute block h-[1.5px] w-4 bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? '-rotate-45' : 'translate-y-[3.5px]'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <div className={`md:hidden fixed inset-0 top-0 bg-black/[0.98] z-40 flex flex-col transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04]">
          <div className="flex items-center">
            <img src={logoImg} alt="sharexpress" className="w-[24px] h-[24px] object-contain" />
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all"
          >
            <X size={16} className="text-white/60" />
          </button>
        </div>

        {/* Mobile links */}
        <div className="flex-1 flex flex-col justify-center px-8 -mt-16">
          {NAV_LINKS.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-left py-5 border-b border-white/[0.04] transition-all duration-600 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
              style={{ transitionDelay: isOpen ? `${idx * 70 + 120}ms` : '0ms' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[32px] font-semibold tracking-[-0.03em] text-white/80 hover:text-white transition-colors">
                  {link.label}
                </span>
                <ArrowUpRight size={18} className="text-white/15" />
              </div>
            </button>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className={`px-8 pb-10 flex flex-col gap-3 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isOpen ? '450ms' : '0ms' }}>
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-black font-semibold text-[15px] tracking-[-0.01em] transition-all duration-300 active:scale-[0.98]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
