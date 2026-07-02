import React from 'react';
import { Shield, Zap, Sparkles, Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Systemic Innovation',
    desc: 'Designing clean, minimal abstractions that eliminate operational complexity. We model the future of horizontal scaling rather than patching current legacy limits.',
    gridSpan: 'md:col-span-2',
    num: '01'
  },
  {
    icon: Zap,
    title: 'Horizontal Scaling',
    desc: 'Predictable performance characteristics under load. Architected to scale horizontally without adding runtime bloat or linear costs.',
    gridSpan: 'md:col-span-1',
    num: '02'
  },
  {
    icon: Shield,
    title: 'Engineering Rigor',
    desc: 'Strict error boundaries, automated challenge analysis, and lightweight compiled binary outputs are our baseline requirements.',
    gridSpan: 'md:col-span-1',
    num: '03'
  },
  {
    icon: Terminal,
    title: 'Developer Experience',
    desc: 'System APIs should read like standard mathematical models. CLIs must stay fast and readable. Integration guides should be absolute and clear.',
    gridSpan: 'md:col-span-2',
    num: '04'
  },
  {
    icon: Activity,
    title: 'Infrastructure Sovereignty',
    desc: 'Providing sandboxed nodes with regional data sovereignty. We utilize optimized compute runtimes to host and execute modules closer to edge query points.',
    gridSpan: 'md:col-span-3',
    num: '05'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function WhyShareXpress() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="why-sharexpress" className="relative bg-transparent py-24 md:py-32 px-6 z-10">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header with masked line reveals */}
        <div className="max-w-[680px] mb-16 md:mb-24 text-left">
          <span className="section-label mb-5 block">Corporate Methodology</span>
          
          <h3 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6 leading-[1.1]">
            <div className="overflow-hidden block py-1">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient-premium block"
              >
                The Engineering
              </motion.span>
            </div>
            <div className="overflow-hidden block py-1">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="text-white/30 font-light block"
              >
                Principles.
              </motion.span>
            </div>
          </h3>
          
          <p className="body-text text-[14px] max-w-[500px]">
            We operate with absolute focus on logical clarity. These five principles shape our design patterns, choice of dependencies, and long-term roadmap.
          </p>
        </div>

        {/* Bento Grid with Stagger Reveal and cursor spotlight */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                onMouseMove={handleMouseMove}
                className={`${pillar.gridSpan} premium-card p-6 md:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 border border-white/[0.03] hover:border-white/20 hover:bg-white/[0.005]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-8 h-8 border border-white/[0.04] bg-white/[0.005] rounded flex items-center justify-center">
                      <Icon size={14} className="text-white/70" strokeWidth={1.25} />
                    </div>
                    <span className="text-[10px] font-mono text-white/10 tracking-widest">{pillar.num}</span>
                  </div>
                  <h4 className="text-[16px] font-mono tracking-wide text-white mb-2 text-left">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-[12.5px] font-light text-white/35 leading-relaxed text-left">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
