import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Terminal, Activity } from 'lucide-react';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Systemic Innovation',
    desc: 'Designing clean, minimal abstractions that eliminate operational complexity. We do not duplicate existing design patterns; we model the future of computation.',
    gridSpan: 'md:col-span-2',
    glowColor: '139, 92, 246',
    iconColor: 'text-violet-400/70 group-hover:text-violet-300',
    num: '01'
  },
  {
    icon: Zap,
    title: 'Horizontal Scaling',
    desc: 'Predictable performance characteristics under extreme global traffic. Architected to scale without linear cost increases.',
    gridSpan: 'md:col-span-1',
    glowColor: '6, 182, 212',
    iconColor: 'text-cyan-400/70 group-hover:text-cyan-300',
    num: '02'
  },
  {
    icon: Shield,
    title: 'Engineering Rigor',
    desc: 'Type-safe codebases, automated coverage, strict error boundaries, and highly optimized binary footprints are our baseline requirement.',
    gridSpan: 'md:col-span-1',
    glowColor: '16, 185, 129',
    iconColor: 'text-emerald-400/70 group-hover:text-emerald-300',
    num: '03'
  },
  {
    icon: Terminal,
    title: 'Developer Experience',
    desc: 'APIs should read like math. Command-line interfaces must be fast and expressive. Documentation must be exhaustive and cover the edge cases.',
    gridSpan: 'md:col-span-2',
    glowColor: '139, 92, 246',
    iconColor: 'text-violet-400/70 group-hover:text-violet-300',
    num: '04'
  },
  {
    icon: Activity,
    title: 'Infrastructure Sovereignty',
    desc: 'Running code on secure, distributed nodes. We utilize lightweight virtualization to run code closer to user requests with minimal operational latency.',
    gridSpan: 'md:col-span-3',
    glowColor: '6, 182, 212',
    iconColor: 'text-cyan-400/70 group-hover:text-cyan-300',
    num: '05'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1]
    }
  })
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
    <section id="why-sharexpress" className="relative bg-transparent py-20 md:py-28 px-6 z-10">
      {/* Header section spacing */}

      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[680px] mb-20 md:mb-28"
        >
          <span className="section-label mb-6 block">
            Our Methodology
          </span>
          <h3 className="heading-display text-[clamp(34px,5.5vw,60px)] text-white mb-7">
            <span className="text-gradient-premium">The Engineering</span>{' '}
            <br className="hidden sm:block" />
            <span className="text-white/30 font-light">Principles.</span>
          </h3>
          <p className="body-text text-[16px] max-w-[520px] leading-[1.8]">
            We operate with absolute focus on logical clarity. These five principles shape our design patterns, choice of dependencies, and long-term roadmap.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                onMouseMove={handleMouseMove}
                className={`${pillar.gridSpan} premium-card p-8 md:p-10 flex flex-col justify-between min-h-[240px] group overflow-hidden`}
                style={{ '--glow-color': pillar.glowColor }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`transition-all duration-500 transform group-hover:scale-110 origin-left ${pillar.iconColor}`}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-mono text-white/10 tracking-widest">{pillar.num}</span>
                  </div>
                  <h4 className="text-[20px] font-semibold tracking-[-0.02em] text-white mb-3">
                    {pillar.title}
                  </h4>
                </div>
                <p className="relative z-10 text-[14px] font-normal text-white/35 leading-[1.8] max-w-xl group-hover:text-white/50 transition-colors duration-500">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
