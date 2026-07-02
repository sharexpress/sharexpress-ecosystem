import React from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  {
    phase: 'PHASE 01',
    status: 'Operational',
    title: 'Foundational Platforms',
    statusColor: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.02]',
    dotColor: 'bg-emerald-400',
    items: [
      { name: 'Interleet', desc: 'Deploying simulated systems challenges to train infrastructure engineers under load.' },
      { name: 'Distribution Services', desc: 'Executing custom protocol designs, API integrations, and systems migration pipelines.' },
      { name: 'Files Sharing', desc: 'Providing secure client-side encrypted storage and temporary guest pairing modules.' }
    ]
  },
  {
    phase: 'PHASE 02',
    status: 'In Development',
    title: 'Platform Virtualization',
    statusColor: 'border-white/10 text-white/60 bg-white/[0.01]',
    dotColor: 'bg-white/40',
    items: [
      { name: 'Cloud Platform', desc: 'Building our global edge runner, allowing groups to deploy modules directly to microsecond-range proxies.' }
    ]
  },
  {
    phase: 'PHASE 03',
    status: 'R&D Pipeline',
    statusColor: 'border-white/5 text-white/35 bg-white/[0.01]',
    dotColor: 'bg-white/10',
    items: [
      { name: 'CLI Utilities', desc: 'Terminal binaries built for edge compilation and local container routing handshakes.' },
      { name: 'Modular Infrastructure', desc: 'Dedicated hosting cells and sovereignty templates for enterprise cloud requirements.' }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const stageVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function FutureEcosystem() {
  return (
    <section id="future-ecosystem" className="relative bg-transparent py-24 md:py-32 px-6 z-10">
      <div className="max-w-[960px] mx-auto text-left">
        
        {/* Header */}
        <div className="max-w-[680px] mb-20 md:mb-28">
          <span className="section-label mb-5 block">Ecosystem Roadmap</span>
          <h3 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6">
            <span className="text-gradient-premium">Corporate Growth</span>{' '}
            <br className="hidden sm:block" />
            <span className="text-white/30 font-light">Strategy.</span>
          </h3>
          <p className="body-text text-[14px] max-w-[500px]">
            sharexpress scales through systemic integration of developer tools and compute layers. Each phase adds a key pillar to our interconnected architecture.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-16 pl-8 md:pl-12 ml-2 md:ml-4">
          
          {/* Animated Vertical line indicator that grows on scroll */}
          <motion.div 
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent origin-top" 
          />

          {/* Stages list container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            {STAGES.map((stage, idx) => {
              return (
                <motion.div 
                  key={idx} 
                  variants={stageVariants}
                  className="relative"
                >
                  {/* Node dot marker */}
                  <div className="absolute left-[-35px] md:left-[-51px] top-[5px] w-3 h-3 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center">
                    <span className={`w-1 h-1 rounded-full ${stage.dotColor}`} />
                  </div>

                  {/* Metadata & Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-white/30">{stage.phase}</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span className={`text-[8px] font-mono tracking-wider border rounded px-1.5 py-0.5 uppercase ${stage.statusColor}`}>
                      {stage.status}
                    </span>
                  </div>

                  <h4 className="text-[20px] font-mono tracking-wide text-white mb-6">
                    {stage.title}
                  </h4>

                  {/* Phase Items Grid */}
                  <div className={`grid grid-cols-1 gap-4 ${stage.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {stage.items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className="premium-card p-5 md:p-6 border border-white/[0.03] bg-transparent hover:border-white/20 hover:bg-white/[0.005] transition-all duration-300"
                      >
                        <h5 className="text-[13px] font-mono tracking-wide text-white/80 mb-2">
                          {item.name}
                        </h5>
                        <p className="text-[12px] font-light text-white/35 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
