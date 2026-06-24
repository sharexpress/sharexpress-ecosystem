import React from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  {
    phase: 'Phase 01',
    status: 'Operational',
    title: 'Foundational Platforms',
    glowColor: '6, 182, 212',
    badgeColor: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5',
    dotColor: 'bg-cyan-400',
    items: [
      { name: 'Interleet', desc: 'Deploying simulated system challenges to train infrastructure engineers under production-like traffic.', glowColor: '139, 92, 246' },
      { name: 'Distribution Services', desc: 'Executing custom protocol design, API integrations, and scalable cloud migrations for enterprise organizations.', glowColor: '6, 182, 212' },
      { name: 'Files Sharing', desc: 'Providing end-to-end encrypted storage, high-speed object transfer, and temporary guest sharing workspaces.', glowColor: '59, 130, 246' }
    ]
  },
  {
    phase: 'Phase 02',
    status: 'In Development',
    title: 'Platform Virtualization',
    glowColor: '245, 158, 11',
    badgeColor: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
    dotColor: 'bg-amber-400',
    items: [
      { name: 'Cloud Platform', desc: 'Building our global serverless runtime, enabling teams to deploy containerized code to edge cells with microsecond latencies.', glowColor: '16, 185, 129' }
    ]
  },
  {
    phase: 'Phase 03',
    status: 'R&D',
    title: 'Unified Developer Suite',
    glowColor: '139, 92, 246',
    badgeColor: 'border-violet-500/20 text-violet-400 bg-violet-500/5',
    dotColor: 'bg-violet-400',
    items: [
      { name: 'CLI Tooling', desc: 'Bespoke terminal tools and compiler pipelines designed for seamless cloud orchestration and local debugging.', glowColor: '139, 92, 246' },
      { name: 'Enterprise Infrastructure', desc: 'Dedicated hosting cells, private registry layers, and regional data sovereignty compliance templates.', glowColor: '16, 185, 129' }
    ]
  }
];

export default function FutureEcosystem() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="future-ecosystem" className="relative bg-transparent py-20 md:py-28 px-6 z-10">
      {/* Header section spacing */}

      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[680px] mb-20 md:mb-32"
        >
          <span className="section-label mb-6 block">
            Corporate Roadmap
          </span>
          <h3 className="heading-display text-[clamp(34px,5.5vw,60px)] text-white mb-7">
            <span className="text-gradient-premium">Ecosystem Growth</span>{' '}
            <span className="text-white/30 font-light">Strategy.</span>
          </h3>
          <p className="body-text text-[16px] max-w-[520px] leading-[1.8]">
            sharexpress scales through systemic integration of developer tools and compute layers. Each phase adds a key pillar to our interconnected architecture.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-24 pl-10 md:pl-16 ml-3 md:ml-6">
          {/* Timeline line */}
          <div className="absolute top-0 left-0 w-[2px] h-full rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-white/12 via-white/[0.04] to-transparent" />
          </div>

          {STAGES.map((stage, idx) => {
            const isLatest = stage.status === 'Operational';

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Node marker */}
                <div className="absolute left-[-47px] md:left-[-71px] top-[6px] w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300" style={{ borderColor: `rgba(${stage.glowColor}, 0.35)` }}>
                  <div className={`w-2 h-2 rounded-full ${stage.dotColor}`} style={{ boxShadow: `0 0 10px rgba(${stage.glowColor}, 0.6)` }} />
                  {isLatest && (
                    <div className="absolute inset-[-3px] rounded-full border animate-ping opacity-25" style={{ borderColor: `rgba(${stage.glowColor}, 0.5)` }} />
                  )}
                </div>

                {/* Phase Info */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[12px] tracking-[0.06em] text-white/30 font-medium">{stage.phase}</span>
                  <span className="w-[4px] h-[4px] bg-white/10 rounded-full"></span>
                  <span className={`premium-badge ${stage.badgeColor}`}>
                    {stage.status}
                  </span>
                </div>

                <h4 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.03em] text-white mb-8">
                  {stage.title}
                </h4>

                {/* Items */}
                <div className={`grid grid-cols-1 gap-4 ${stage.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                  {stage.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      onMouseMove={handleMouseMove}
                      className="premium-card p-8 flex flex-col justify-between group overflow-hidden"
                      style={{ '--glow-color': item.glowColor }}
                    >
                      <h5 className="text-[16px] font-semibold tracking-[-0.01em] text-white mb-3 group-hover:text-white transition-colors duration-500">
                        {item.name}
                      </h5>
                      <p className="text-[13px] font-normal text-white/35 leading-[1.75] group-hover:text-white/50 transition-colors duration-500">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
