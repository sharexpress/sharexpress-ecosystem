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

export default function Navbar() {
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
    <>
    <nav
      ref={navRef}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-[92%] max-w-[960px] ${
        scrolled
          ? 'top-4 py-2 px-4 bg-[#0d0d0d]/80 backdrop-blur-md border border-white/[0.04] rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
          : 'top-6 py-3 px-5 bg-transparent border border-transparent rounded-md'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src={logoImg} alt="sharexpress" className="w-[18px] h-[18px] object-contain transition-transform duration-500 group-hover:scale-105" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-[1.5px] bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={() => scrollToSection('contact')}
            className="group flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-transparent text-white/80 rounded text-[11px] font-mono uppercase tracking-wider transition-all duration-300 hover:border-white hover:text-white"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={10} className="transition-transform duration-300 group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-8 h-8 flex items-center justify-center rounded border border-white/[0.04] bg-[#0d0d0d]/80 hover:bg-[#111] transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            <span className={`absolute block h-[1.2px] w-3 bg-white transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-[3px]'}`} />
            <span className={`absolute block h-[1.2px] w-3 bg-white transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-[3px]'}`} />
          </div>
        </button>
      </div>
    </nav>

    {/* Mobile Fullscreen Overlay */}
    <div className={`md:hidden fixed inset-0 top-0 bg-[#080808] z-[99] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Mobile header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04]">
        <div className="flex items-center">
          <img src={logoImg} alt="sharexpress" className="w-[18px] h-[18px] object-contain" />
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 flex items-center justify-center rounded border border-white/[0.04] bg-[#0d0d0d] hover:bg-[#111] transition-all cursor-pointer"
        >
          <X size={14} className="text-white/60" />
        </button>
      </div>

      {/* Mobile links */}
      <div className="flex-1 flex flex-col justify-center px-8 -mt-12 space-y-6">
        {NAV_LINKS.map((link, idx) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`text-left py-2 border-b border-white/[0.02] transition-all duration-500 cursor-pointer ${
              isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{ transitionDelay: isOpen ? `${idx * 50 + 100}ms` : '0ms' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[20px] font-light tracking-wide font-sans text-white/75 hover:text-white transition-colors">
                {link.label}
              </span>
              <ArrowUpRight size={14} className="text-white/30" />
            </div>
          </button>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className={`px-8 pb-12 flex flex-col transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}>
        <button 
          onClick={() => scrollToSection('contact')}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded border border-white/15 bg-transparent text-white font-mono text-[12px] uppercase tracking-wider transition-all duration-300 active:scale-[0.98] cursor-pointer"
        >
          <span>Get in Touch</span>
          <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
    </>
  );
}
