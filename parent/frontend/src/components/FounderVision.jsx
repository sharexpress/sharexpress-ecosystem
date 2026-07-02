import React from 'react';
import { motion } from 'framer-motion';

export default function FounderVision() {
  return (
    <section id="vision" className="relative bg-transparent py-24 md:py-32 px-6 z-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16 text-left">
        
        {/* Left Column: Manifesto Meta */}
        <div className="w-full md:w-[35%] flex flex-col items-start gap-8">
          <div>
            <span className="section-label mb-5 block">Founder Manifesto</span>
            <h3 className="text-[24px] font-mono tracking-wide text-white leading-snug">
              <div className="overflow-hidden block py-0.5">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  The Philosophy
                </motion.span>
              </div>
              <div className="overflow-hidden block py-0.5">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                  className="block"
                >
                  Behind Our Work.
                </motion.span>
              </div>
            </h3>
          </div>

          {/* Profile details */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="flex flex-col items-start"
          >
            <div className="w-9 h-9 border border-white/10 bg-white/[0.005] rounded-md flex items-center justify-center mb-3 text-[12px] font-mono text-white/70 tracking-wider select-none">
              SK
            </div>
            <cite className="not-italic text-[14px] font-mono tracking-wide text-white/80">
              Santusht Kotai
            </cite>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-1">
              Founder & Chief Systems Architect
            </span>
          </motion.div>
        </div>

        {/* Right Column: Blockquote text */}
        <div className="w-full md:w-[60%] flex flex-col items-start pt-2 md:pt-6">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[72px] leading-none text-white select-none h-8 flex items-center -ml-4"
          >
            “
          </motion.span>
          <blockquote className="heading-display text-[clamp(20px,3vw,32px)] text-white/80 leading-[1.5] font-light">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              We believe software is the core infrastructure of modern society. Building for the long term requires{' '}
              <span className="text-gradient-subtle">moving past short-term hacks</span>{' '}
              to build an ecosystem where{' '}
              <span className="relative inline-block text-white/95">
                <span>engineering rigor and logical purity</span>
                <span className="absolute bottom-[2px] left-0 right-0 h-[1px] bg-white/20" />
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="absolute bottom-[2px] left-0 right-0 h-[1px] bg-white/60 origin-left"
                />
              </span>{' '}
              are the core priorities.
            </motion.p>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
