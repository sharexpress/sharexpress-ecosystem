import React from 'react';
import { motion } from 'framer-motion';

const TRACK_1 = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Tooling' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Framer Motion', category: 'UI Motion' },
  { name: 'TailwindCSS', category: 'Styles' },
  { name: 'FastAPI', category: 'Backend API' },
  { name: 'Python', category: 'Language' },
  { name: 'Redis', category: 'Caching' },
  { name: 'PostgreSQL', category: 'Database' }
];

const TRACK_2 = [
  { name: 'Docker', category: 'Containers' },
  { name: 'Kubernetes', category: 'Orchestration' },
  { name: 'AWS', category: 'Cloud Host' },
  { name: 'Nginx', category: 'Reverse Proxy' },
  { name: 'Cloudflare', category: 'CDN & Security' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'Prometheus', category: 'Monitoring' },
  { name: 'Grafana', category: 'Metrics' }
];

function TechPill({ name, category }) {
  return (
    <div className="mx-1.5 flex items-center gap-2.5 px-4 py-2 bg-[#0d0d0d] border border-white/[0.04] rounded transition-all duration-300 select-none cursor-default group hover:border-white/20">
      <span className="text-[12px] font-mono tracking-wide text-white/60 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
      <span className="w-1.5 h-1.5 bg-white/10 rounded-full flex-shrink-0 group-hover:bg-white/40 transition-colors duration-300"></span>
      <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase whitespace-nowrap group-hover:text-white/40 transition-colors duration-300">
        {category}
      </span>
    </div>
  );
}

export default function TechStackMarquee() {
  const firstTrack = [...TRACK_1, ...TRACK_1, ...TRACK_1];
  const secondTrack = [...TRACK_2, ...TRACK_2, ...TRACK_2];

  return (
    <section id="tech-stack" className="relative bg-transparent py-24 md:py-32 overflow-hidden z-10">
      <div className="max-w-[1100px] mx-auto px-6 mb-16 md:mb-20 text-left">
        <div className="max-w-[680px]">
          <span className="section-label mb-5 block font-mono">Infrastructure Standards</span>
          
          <h3 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6 leading-[1.1]">
            <div className="overflow-hidden block py-1">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient-premium block"
              >
                Core Engineering
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
                Stack.
              </motion.span>
            </div>
          </h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="body-text text-[14px] max-w-[500px]"
          >
            Our systems deploy on audited, proven technologies that prioritize runtime speed, team velocity, and operational clarity.
          </motion.p>
        </div>
      </div>

      {/* Marquee Rails with scroll slide-in */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3 w-full"
      >
        {/* Track 1 */}
        <div className="w-full overflow-hidden relative py-0.5">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#080808] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#080808] to-transparent z-20 pointer-events-none" />
          
          <div className="animate-marquee">
            {firstTrack.map((tech, idx) => (
              <TechPill key={idx} name={tech.name} category={tech.category} />
            ))}
          </div>
        </div>

        {/* Track 2 */}
        <div className="w-full overflow-hidden relative py-0.5">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#080808] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#080808] to-transparent z-20 pointer-events-none" />

          <div className="animate-marquee-reverse">
            {secondTrack.map((tech, idx) => (
              <TechPill key={idx} name={tech.name} category={tech.category} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
