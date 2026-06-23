import React from 'react';
import { motion } from 'framer-motion';

export default function FounderVision() {
  return (
    <section id="vision" className="relative bg-transparent py-24 md:py-32 px-6 z-10 overflow-hidden">
      {/* Header section spacing */}

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24 text-left">
        
        {/* Left Column: Manifesto metadata & author details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[35%] flex flex-col items-start gap-10"
        >
          <div>
            <span className="section-label mb-6 block">
              Founder Manifesto
            </span>
            <h3 className="text-[28px] font-bold tracking-[-0.03em] text-white">
              The Philosophy <br className="hidden md:block" />
              Behind Our Work.
            </h3>
          </div>

          {/* Founder Profile */}
          <div className="flex flex-col items-start">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-2xl border border-white/[0.08] flex items-center justify-center mb-4 bg-white/[0.03] text-[14px] text-white/35 font-medium select-none tracking-wide backdrop-blur-sm">
              SK
            </div>
            <cite className="not-italic text-[16px] font-semibold tracking-[-0.01em] text-white">
              Santusht Kotai
            </cite>
            <span className="text-[11px] tracking-[0.08em] text-white/25 font-medium mt-2 uppercase">
              Founder & Chief Systems Architect
            </span>
          </div>
        </motion.div>

        {/* Right Column: Quote Text */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[60%] flex flex-col items-start pt-2 md:pt-8"
        >
          {/* Quote Mark */}
          <div className="text-[100px] leading-none text-white/[0.04] font-extralight mb-0 -ml-4 select-none h-12 flex items-center">
            “
          </div>
          <blockquote className="heading-display text-[clamp(22px,3.8vw,40px)] text-white/90 leading-[1.4] mb-4 font-medium">
            We believe software is the core infrastructure of modern society. Building for the long term requires{' '}
            <span className="text-gradient-subtle">moving past short-term hacks</span>{' '}
            to build an ecosystem where{' '}
            <span className="relative inline-block">
              <span className="relative z-10">engineering rigor and logical purity</span>
              <span className="absolute bottom-[3px] left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/30 via-cyan-500/20 to-transparent rounded-full"></span>
            </span>{' '}
            are the core priorities.
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
