import React from 'react';
import { ArrowDown, HardDrive, GraduationCap, Cloud, Code } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

function EcosystemTopology() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[480px] mx-auto border border-white/[0.04] bg-white/[0.01] rounded-md p-6 flex flex-col justify-between overflow-hidden">
      {/* CAD Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Topology Header Details */}
      <div className="flex justify-between items-center z-10 border-b border-white/[0.03] pb-2 font-mono text-[9px] text-white/30 tracking-wider">
        <span>TOPOLOGY VISUALIZER // V4.14</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span>LIVE TELEMETRY</span>
        </div>
      </div>

      {/* SVG Interactive Topology Diagram */}
      <div className="relative flex-1 flex items-center justify-center py-4">
        <svg className="w-full h-full max-h-[240px]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Connection Lines (Paths for AnimateMotion) — draw dynamically on mount */}
          <motion.path 
            id="path-root-files" 
            d="M 200 150 L 90 75" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path 
            id="path-root-interleet" 
            d="M 200 150 L 310 75" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path 
            id="path-root-cloud" 
            d="M 200 150 L 90 225" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path 
            id="path-root-apis" 
            d="M 200 150 L 310 225" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
            strokeDasharray="3 3" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Animated Flowing Packet Nodes (White / Gray) */}
          <circle r="2.5" fill="white" opacity="0.8">
            <animateMotion dur="4.2s" repeatCount="indefinite">
              <mpath href="#path-root-files" />
            </animateMotion>
          </circle>
          <circle r="2.5" fill="white" opacity="0.8">
            <animateMotion dur="3.5s" repeatCount="indefinite">
              <mpath href="#path-root-interleet" />
            </animateMotion>
          </circle>
          <circle r="2.5" fill="white" opacity="0.4">
            <animateMotion dur="5s" repeatCount="indefinite">
              <mpath href="#path-root-cloud" />
            </animateMotion>
          </circle>
          <circle r="2.5" fill="white" opacity="0.8">
            <animateMotion dur="3.8s" repeatCount="indefinite">
              <mpath href="#path-root-apis" />
            </animateMotion>
          </circle>

          {/* Radar Circles around root */}
          <circle cx="200" cy="150" r="32" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          <circle cx="200" cy="150" r="60" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />

          {/* Node Rings & Lights */}
          {/* Root Node */}
          <circle cx="200" cy="150" r="14" fill="#080808" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="3" fill="white" className="animate-pulse" />

          {/* Files Node */}
          <circle cx="90" cy="75" r="10" fill="#080808" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="90" cy="75" r="2" fill="white" />
          {/* Interleet Node */}
          <circle cx="310" cy="75" r="10" fill="#080808" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="310" cy="75" r="2" fill="white" />
          {/* Cloud Node */}
          <circle cx="90" cy="225" r="10" fill="#080808" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="90" cy="225" r="2" fill="rgba(255,255,255,0.25)" />
          {/* APIs Node */}
          <circle cx="310" cy="225" r="10" fill="#080808" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="310" cy="225" r="2" fill="white" />

          {/* Node Text Labels */}
          {/* Root */}
          <text x="200" y="176" textAnchor="middle" fill="white" opacity="0.6" fontSize="8" fontFamily="monospace" letterSpacing="1">SHAREXPRESS // ROOT</text>

          {/* Files */}
          <text x="90" y="52" textAnchor="middle" fill="white" opacity="0.75" fontSize="8" fontFamily="monospace">files.sharexpress.in</text>
          <text x="90" y="60" textAnchor="middle" fill="white" opacity="0.2" fontSize="6.5" fontFamily="monospace">storage.pairing</text>

          {/* Interleet */}
          <text x="310" y="52" textAnchor="middle" fill="white" opacity="0.75" fontSize="8" fontFamily="monospace">interleet.sharexpress.in</text>
          <text x="310" y="60" textAnchor="middle" fill="white" opacity="0.2" fontSize="6.5" fontFamily="monospace">compute.sandbox</text>

          {/* Cloud */}
          <text x="90" y="249" textAnchor="middle" fill="white" opacity="0.45" fontSize="8" fontFamily="monospace">cloud.sharexpress.in</text>
          <text x="90" y="257" textAnchor="middle" fill="white" opacity="0.2" fontSize="6.5" fontFamily="monospace">edge.runtime (alpha)</text>

          {/* APIs */}
          <text x="310" y="249" textAnchor="middle" fill="white" opacity="0.75" fontSize="8" fontFamily="monospace">api.sharexpress.in</text>
          <text x="310" y="257" textAnchor="middle" fill="white" opacity="0.2" fontSize="6.5" fontFamily="monospace">ingress.routing</text>
        </svg>
      </div>

      {/* Micro metrics footer */}
      <div className="flex justify-between items-center pt-2 border-t border-white/[0.03] font-mono text-[8px] text-white/20">
        <span>ACTIVE SOCKETS: 14</span>
        <span>LATENCY proxy-01: 18ms</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 60]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-transparent px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Branding Messaging */}
        <div className="lg:col-span-7 text-left flex flex-col items-start">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.01] border border-white/[0.04] mb-8 select-none"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
              Parent Infrastructure namespace // v4.14
            </span>
          </motion.div>

          {/* Main Title with Masked slide-up reveal */}
          <h1 className="heading-display text-[clamp(36px,5.5vw,72px)] text-white mb-6 leading-[1.05]">
            <div className="overflow-hidden block py-1">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="block font-extralight text-white/30 tracking-tight"
              >
                unified software
              </motion.span>
            </div>
            <div className="overflow-hidden block py-1 mt-1">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="text-gradient-premium block tracking-tighter"
              >
                distribution platform
              </motion.span>
            </div>
          </h1>

          {/* Subtitle description with mask delay reveal */}
          <div className="overflow-hidden mb-10 max-w-[500px]">
            <motion.p 
              initial={{ y: "20px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="text-white/40 text-[14px] font-light leading-[1.8] tracking-normal"
            >
              sharexpress is an umbrella engineering corporation. We design, deploy, and scale high-performance developer sandbox runtimes, cryptographically secured object systems, and global APIs under a single root namespace.
            </motion.p>
          </div>

          {/* Clean CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className="flex items-center gap-3 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('ecosystem')}
              className="btn-primary"
            >
              <span>Explore Ecosystem</span>
            </button>
            
            <button
              onClick={() => scrollToSection('products')}
              className="btn-secondary"
            >
              <span>Product Specs</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Visualization with parallax scroll */}
        <motion.div style={{ y }} className="lg:col-span-5 flex flex-col gap-6 w-full max-w-[480px] mx-auto lg:mx-0">
          {/* Live visual graph */}
          <EcosystemTopology />
        </motion.div>
      </div>

      {/* Down indicator */}
      <div className="flex justify-center mt-8 lg:mt-16 w-full">
        <button 
          onClick={() => scrollToSection('ecosystem')}
          className="flex flex-col items-center text-white/10 hover:text-white/40 transition-colors group"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase mb-2">Initialize Specification Details</span>
          <ArrowDown size={11} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
