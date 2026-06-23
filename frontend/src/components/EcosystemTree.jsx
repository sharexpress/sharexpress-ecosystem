import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemTree() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const triggerRef = useRef(null);
  
  const maskRectRef = useRef(null);
  
  const rootNodeRef = useRef(null);
  const cardLRef = useRef(null);
  const cardCRef = useRef(null);
  const cardRRef = useRef(null);
  
  const mobLineRef = useRef(null);
  const mobMaskRectRef = useRef(null);
  const mobCard1Ref = useRef(null);
  const mobCard2Ref = useRef(null);
  const mobCard3Ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=600",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(rootNodeRef.current, { scale: 1.05, duration: 0.15 })
        .to(maskRectRef.current, { attr: { height: 140 }, duration: 0.6, ease: "none" })
        .fromTo([cardLRef.current, cardCRef.current, cardRRef.current], 
          { opacity: 0, y: 18, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1 },
          "-=0.15"
        )
        .to([cardLRef.current, cardCRef.current, cardRRef.current], {
          borderColor: "rgba(255, 255, 255, 0.10)",
          duration: 0.2,
        });

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      tl.to(mobMaskRectRef.current, { attr: { height: 100 }, duration: 0.8, ease: "none" })
        .fromTo([mobCard1Ref.current, mobCard2Ref.current, mobCard3Ref.current],
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 },
          "-=0.6"
        );

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const NODES = [
    { 
      name: 'Interleet', 
      badge: 'Systems Training', 
      badgeActive: true, 
      desc: 'Advanced training sandboxes for engineers. Master distributed systems, fault-tolerant architectures, and core DevOps operations under load.', 
      items: ['Distributed Topology Labs', 'Failure Domain Modeling', 'Automated Compute Grading'],
      glowColor: '139, 92, 246', 
      dotColor: 'rgb(139, 92, 246)', 
      badgeClasses: 'border-violet-500/20 text-violet-400 bg-violet-500/5',
      dotBg: 'bg-violet-500/30'
    },
    {
      name: 'Distribution Services',
      badge: 'Core Integration',
      badgeActive: true,
      desc: 'Enterprise product engineering and systems consulting. Designing secure APIs, database clusters, and specialized server implementations.',
      items: ['Custom Protocol Engineering', 'Database Virtualization', 'Enterprise Infrastructure'],
      glowColor: '6, 182, 212',
      dotColor: 'rgb(6, 182, 212)',
      badgeClasses: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5',
      dotBg: 'bg-cyan-500/30'
    },
    {
      name: 'Cloud Platform',
      badge: 'Virtualization Runtime',
      badgeActive: false,
      desc: 'A high-performance virtualized runtime. Host and run applications on a secure, globally distributed edge compute cluster.',
      items: ['Deterministic Compute', 'Global Load Balancing', 'Zero-Cold-Start Runtimes'],
      glowColor: '16, 185, 129',
      dotColor: 'rgb(16, 185, 129)',
      badgeClasses: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
      dotBg: 'bg-emerald-500/30'
    }
  ];

  const cardRefs = [cardLRef, cardCRef, cardRRef];

  return (
    <section 
      id="ecosystem" 
      ref={triggerRef} 
      className="relative min-h-screen bg-transparent flex flex-col justify-center items-center py-28 px-6 z-10"
    >
      {/* Header section spacing */}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1100px] text-left mb-14 md:mb-20 z-10"
      >
        <span className="section-label mb-6 block">
          System Architecture
        </span>
        <h2 className="heading-display text-[clamp(34px,5.5vw,60px)] text-white">
          <span className="text-gradient-premium">The Root Namespace.</span>{' '}
          <br className="hidden sm:block" />
          <span className="text-white/30 font-light">Interconnected Verticals.</span>
        </h2>
      </motion.div>

      <div className="relative w-full max-w-[1100px] flex flex-col items-center">
        {/* ================= DESKTOP TREE ================= */}
        <div className="hidden lg:flex flex-col items-center w-full relative">
          
          {/* Root Node */}
          <div 
            ref={rootNodeRef}
            onMouseMove={handleMouseMove}
            className="z-20 px-9 py-6 premium-card bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] flex flex-col items-center transition-all duration-500 shadow-[0_0_60px_rgba(255,255,255,0.02)] overflow-hidden"
          >
            <img src={logoImg} alt="ShareXpress" className="w-7 h-7 object-contain mb-2.5 animate-breathe" />
            <span className="text-[14px] font-bold tracking-[0.06em] text-white">SHAREXPRESS</span>
            <span className="text-[10px] tracking-[0.08em] text-white/25 font-medium mt-1.5 uppercase">Root Organization</span>
          </div>

          {/* SVG Connector Lines — positioned dynamically in natural flow */}
          <svg 
            className="w-full pointer-events-none z-10 -mt-px -mb-px" 
            style={{ height: '140px' }}
            viewBox="0 0 1200 140" 
            fill="none"
          >
            <defs>
              <mask id="treeMask">
                <rect ref={maskRectRef} x="0" y="0" width="1200" height="0" fill="white" />
              </mask>
              <linearGradient id="gradientL" x1="600" y1="0" x2="200" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.5)" />
              </linearGradient>
              <linearGradient id="gradientC" x1="600" y1="0" x2="600" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.5)" />
              </linearGradient>
              <linearGradient id="gradientR" x1="600" y1="0" x2="1000" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.5)" />
              </linearGradient>
            </defs>

            <g mask="url(#treeMask)">
              {/* Left branch */}
              <path d="M 600 0 L 600 40 Q 600 50, 590 50 L 210 50 Q 200 50, 200 60 L 200 140" stroke="url(#gradientL)" strokeWidth="1.5" strokeLinecap="round" />
              {/* Center branch */}
              <path d="M 600 0 L 600 140" stroke="url(#gradientC)" strokeWidth="1.5" strokeLinecap="round" />
              {/* Right branch */}
              <path d="M 600 0 L 600 40 Q 600 50, 610 50 L 990 50 Q 1000 50, 1000 60 L 1000 140" stroke="url(#gradientR)" strokeWidth="1.5" strokeLinecap="round" />

              {/* Animated flow particles */}
              <path d="M 600 0 L 600 40 Q 600 50, 590 50 L 210 50 Q 200 50, 200 60 L 200 140" stroke="url(#gradientL)" strokeWidth="2" className="animated-flow-line" style={{ animationDelay: '0.2s' }} />
              <path d="M 600 0 L 600 140" stroke="url(#gradientC)" strokeWidth="2" className="animated-flow-line" style={{ animationDelay: '0.4s' }} />
              <path d="M 600 0 L 600 40 Q 600 50, 610 50 L 990 50 Q 1000 50, 1000 60 L 1000 140" stroke="url(#gradientR)" strokeWidth="2" className="animated-flow-line" style={{ animationDelay: '0.2s' }} />
            </g>

            {/* Glowing top node */}
            <circle cx="600" cy="0" r="3" fill="white" opacity="0.6" />
          </svg>

          {/* Sub Node Cards */}
          <div className="w-full grid grid-cols-3 gap-6 z-20">
            {NODES.map((node, idx) => (
              <div 
                key={idx}
                ref={cardRefs[idx]}
                onMouseMove={handleMouseMove}
                className="premium-card p-7 bg-white/[0.015] backdrop-blur-xl flex flex-col overflow-hidden border border-white/[0.06] opacity-0"
                style={{ '--glow-color': node.glowColor }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[16px] font-semibold tracking-[-0.01em] text-white">{node.name}</span>
                  <span className={`premium-badge text-[9px] ${node.badgeClasses}`}>{node.badge}</span>
                </div>
                <p className="text-[13px] text-white/35 font-normal leading-[1.75] mb-5">
                  {node.desc}
                </p>
                <div className="flex flex-col gap-2.5 border-t border-white/[0.05] pt-4 mt-auto">
                  {node.items.map((item, i) => (
                    <div key={i} className="text-[11px] text-white/25 font-normal flex items-center gap-2.5">
                      <span className={`w-[4px] h-[4px] ${node.dotBg} rounded-full flex-shrink-0`}></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE STACK ================= */}
        <div className="lg:hidden flex flex-col items-stretch w-full space-y-10 relative pl-9 border-l border-white/[0.05]">
          {/* SVG line */}
          <div className="absolute top-0 left-[-1px] w-[3px] h-full pointer-events-none z-10 overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 3 100">
              <defs>
                <mask id="mobMask">
                  <rect ref={mobMaskRectRef} x="0" y="0" width="3" height="0" fill="white" />
                </mask>
              </defs>
              <g mask="url(#mobMask)">
                <line ref={mobLineRef} x1="1.5" y1="0" x2="1.5" y2="100" stroke="white" strokeWidth="1.5" opacity="0.12" />
                <line x1="1.5" y1="0" x2="1.5" y2="100" stroke="white" strokeWidth="1.5" className="animated-flow-line" opacity="0.4" />
              </g>
            </svg>
          </div>

          {/* Parent Hub */}
          <div className="relative">
            <div className="absolute left-[-45px] top-1.5 w-7 h-7 rounded-[9px] flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="ShareXpress" className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] tracking-[0.08em] text-white/25 uppercase font-medium">Root Organization</span>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-white mt-1">SHAREXPRESS</h3>
          </div>

          {/* Mobile cards */}
          {[
            { ref: mobCard1Ref, ...NODES[0], tags: ['#Topology', '#ChaosEng', '#Compute'] },
            { ref: mobCard2Ref, ...NODES[1], tags: ['#CustomProtocols', '#Virtualization', '#InfraSovereignty'] },
            { ref: mobCard3Ref, ...NODES[2], tags: ['#EdgeHosting', '#Virtualization', '#CloudPlatform'] },
          ].map((card, idx) => (
            <div key={idx} ref={card.ref} onMouseMove={handleMouseMove} className="relative premium-card bg-white/[0.015] backdrop-blur-xl p-7 overflow-hidden" style={{ '--glow-color': card.glowColor }}>
              <div className="absolute left-[-45px] top-7 w-7 h-7 rounded-full bg-black border border-white/[0.08] flex items-center justify-center">
                <div className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ backgroundColor: card.dotColor, boxShadow: `0 0 12px ${card.dotColor}` }}></div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[18px] font-semibold tracking-[-0.01em] text-white">{card.name}</h4>
                <span className={`premium-badge text-[9px] ${card.badgeClasses}`}>{card.badge}</span>
              </div>
              <p className="text-[13px] font-normal text-white/35 leading-[1.75] mb-5">
                {card.desc}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/[0.05]">
                {card.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] text-white/20 font-medium px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.04]">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
