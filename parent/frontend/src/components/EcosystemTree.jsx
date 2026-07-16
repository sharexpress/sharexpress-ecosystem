/*
 * Copyright 2026 Sharexpress Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { HardDrive, GraduationCap, Cloud, Code, GitFork, ArrowUpRight, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const PRODUCTS = [
  {
    id: 'files',
    name: 'Files Sharing',
    tag: 'files.sharexpress.in',
    status: 'ACTIVE',
    nodeHeader: 'CELL // STORAGE_PROXY_01',
    metric: 'LOAD: 8.4 MB/S // UPTIME: 99.99%',
    loadVal: 35,
    desc: 'Secured peer-to-peer and cloud storage with end-to-end client-side encryption and guest sandboxes.',
    icon: HardDrive,
    y: 40,
    link: 'https://files.sharexpress.in'
  },
  {
    id: 'interleet',
    name: 'Interleet Platform',
    tag: 'interleet.sharexpress.in',
    status: 'ACTIVE',
    nodeHeader: 'CELL // SANDBOX_GRADER_02',
    metric: 'CONTAINERS: 1,420 // GRADINGS/MIN: 48',
    loadVal: 72,
    desc: 'Systems engineering grading sandbox. Practice fault tolerance and distributed challenge runs.',
    icon: GraduationCap,
    y: 95,
    link: 'https://interleet.sharexpress.in'
  },
  {
    id: 'cloud',
    name: 'Cloud Platform',
    tag: 'cloud.sharexpress.in',
    status: 'IN DEVELOPMENT',
    nodeHeader: 'CELL // EDGE_COMPUTE_03',
    metric: 'CAPACITY: 42/50 CELLS // LATENCY: 18MS',
    loadVal: 15,
    desc: 'A serverless, zero-cold-start edge runtime for containerized code deployments.',
    icon: Cloud,
    y: 150,
    link: 'https://cloud.sharexpress.in'
  },
  {
    id: 'assets',
    name: 'AssetFlow Manager',
    tag: 'assets.sharexpress.in',
    status: 'ACTIVE',
    nodeHeader: 'CELL // INVENTORY_LIFECYCLE_04',
    metric: 'ASSETS REGISTERED: 384 // STATUS: SECURE',
    loadVal: 65,
    desc: 'Linear-inspired enterprise asset and physical inventory tracking dashboard with compliance audits.',
    icon: ClipboardCheck,
    y: 205,
    link: 'https://assets.sharexpress.in'
  },
  {
    id: 'apis',
    name: 'Distribution APIs',
    tag: 'api.sharexpress.in',
    status: 'ACTIVE',
    nodeHeader: 'CELL // GATEWAY_INGRESS_05',
    metric: 'REQUESTS: 4.8K/S // SECURITY: SECURE',
    loadVal: 54,
    desc: 'High-availability RPC and ingress routes for enterprise product distribution pipelines.',
    icon: Code,
    y: 260,
    link: 'https://distribution.sharexpress.in/'
  },
  {
    id: 'future',
    name: 'Future Products',
    tag: 'pipeline.research',
    status: 'R&D CELL',
    nodeHeader: 'CELL // COMPILER_PIPELINE_06',
    metric: 'STATUS: IN QUEUE // AGENT ID: 0x8F9A',
    loadVal: 0,
    desc: 'Audited CLI compilation tools and regional compliance nodes currently in system testing.',
    icon: GitFork,
    y: 315,
    link: '#contact'
  }
];

export default function EcosystemTree() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);

  React.useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.files) {
          setProducts((prev) =>
            prev.map((p) => {
              if (p.id === 'files') {
                const status = data.files === 'Operational' ? 'ACTIVE' : 'MAINTENANCE';
                const metric = data.files === 'Operational' ? 'LOAD: 8.4 MB/S // UPTIME: 99.99%' : 'STATUS: MAINTENANCE MODE';
                const loadVal = data.files === 'Operational' ? 35 : 0;
                return {
                  ...p,
                  status,
                  metric,
                  loadVal
                };
              }
              return p;
            })
          );
        }
      })
      .catch((err) => console.error('Failed to fetch ecosystem status:', err));
  }, []);

  // Dynamic mouse spotlight coordinates tracker for premium hover card effects
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const getBranchPath = (y) => {
    if (y === 170) {
      return "M 40 170 L 210 170";
    }
    return `M 40 170 L 100 170 L 100 ${y} L 210 ${y}`;
  };

  return (
    <section id="ecosystem" className="relative bg-transparent py-24 md:py-32 px-6 z-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Section Label & Masked Typography Header */}
        <div className="max-w-[680px] mb-16 md:mb-20 text-left">
          <span className="section-label mb-5 block">Product Topology</span>
          
          <h2 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6 leading-[1.1]">
            <div className="overflow-hidden block py-1">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient-premium block"
              >
                The Root Namespace.
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
                Logical Infrastructure Routing.
              </motion.span>
            </div>
          </h2>
          
          <p className="body-text text-[14px] max-w-[500px]">
            sharexpress acts as the root namespace coordinate. Our services fork into dedicated compute, storage, and networking layers through custom protocols.
          </p>
        </div>

        {/* Desktop Architecture Visualizer */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[460px]">
          
          {/* Left Visual Diagram column */}
          <div className="col-span-5 relative w-full h-[360px] flex flex-col justify-between border border-white/[0.04] bg-[#090909]/60 rounded p-5 overflow-hidden">
            {/* Engineering CAD Grid lines */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
              backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }} />
            
            {/* Visualizer header */}
            <div className="flex justify-between items-center z-10 border-b border-white/[0.03] pb-2 font-mono text-[8px] text-white/30 tracking-widest">
              <span>SYSTEM TRUNK CONSOLE // AP-SOUTH</span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                <span>STATE: LINKED</span>
              </span>
            </div>

            {/* SVG Graph Drawing */}
            <div className="relative flex-1 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 320 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Branch Paths rendering */}
                {products.map((prod) => {
                  const isPathHovered = hoveredProduct === prod.id;
                  const pathColor = isPathHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255,255,255,0.03)';
                  const strokeWidth = isPathHovered ? 1.5 : 1;
                  
                  return (
                    <g key={prod.id}>
                      {/* Connection path line — animates path drawing on scroll */}
                      <motion.path 
                        d={getBranchPath(prod.y)} 
                        stroke={pathColor} 
                        strokeWidth={strokeWidth} 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="transition-colors duration-300"
                      />

                      {/* Flowing high-speed dash segment when hovered */}
                      {isPathHovered && (
                        <path 
                          d={getBranchPath(prod.y)} 
                          stroke="rgba(255, 255, 255, 0.85)" 
                          strokeWidth="1.5" 
                          strokeDasharray="8 8"
                          className="animated-flow-line"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Root Namespace Node Hub */}
                <g className="cursor-default">
                  <rect x="15" y="148" width="50" height="44" rx="3" fill="#0d0d0d" stroke={hoveredProduct ? 'white' : 'rgba(255,255,255,0.08)'} strokeWidth="1" className="transition-all duration-300" />
                  <image href={logoImg} x="32" y="156" width="16" height="16" />
                  <text x="40" y="184" textAnchor="middle" fill="white" opacity="0.3" fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">ROOT</text>
                </g>

                {/* Product Target Nodes (Styled as Blade Units) */}
                {products.map((prod) => {
                  const isHovered = hoveredProduct === prod.id;
                  
                  return (
                    <g 
                      key={prod.id} 
                      onMouseEnter={() => setHoveredProduct(prod.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className="cursor-pointer"
                    >
                      {/* Blade server unit shape */}
                      <rect 
                        x="210" 
                        y={prod.y - 12} 
                        width="95" 
                        height="24" 
                        rx="2" 
                        fill="#0c0c0c" 
                        stroke={isHovered ? 'white' : 'rgba(255,255,255,0.05)'} 
                        strokeWidth="1" 
                        className="transition-all duration-300" 
                      />

                      {/* Small status light */}
                      <circle 
                        cx="222" 
                        cy={prod.y} 
                        r="2.5" 
                        fill={isHovered ? 'white' : 'rgba(255,255,255,0.15)'} 
                        className="transition-colors duration-300"
                      />
                      <circle 
                        cx="222" 
                        cy={prod.y} 
                        r="1.5" 
                        fill={prod.status === 'ACTIVE' ? '#10b981' : prod.status === 'R&D CELL' ? '#a3a3a3' : prod.status === 'MAINTENANCE' ? '#ec4899' : '#f59e0b'}
                        opacity="0.85"
                      />

                      {/* Label identifier */}
                      <text 
                        x="234" 
                        y={prod.y + 3} 
                        fill={isHovered ? 'white' : 'rgba(255,255,255,0.35)'} 
                        fontSize="7" 
                        fontFamily="monospace" 
                        letterSpacing="0.5"
                        className="transition-colors duration-300 select-none uppercase"
                      >
                        {prod.id}
                      </text>

                      {/* Terminal interface tick */}
                      {isHovered && (
                        <path d={`M 300 ${prod.y - 4} L 303 ${prod.y} L 300 ${prod.y + 4}`} stroke="white" strokeWidth="1" />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Visualizer footer */}
            <div className="flex justify-between items-center z-10 border-t border-white/[0.03] pt-2 font-mono text-[7.5px] text-white/20">
              <span>VOLTS: 1.25V</span>
              <span>CELL_BACKBONE // LINKED</span>
            </div>
          </div>

          {/* Right Product list cards column (Blade Unit designs) */}
          <div className="col-span-7 flex flex-col gap-3">
            {products.map((prod) => {
              const isHovered = hoveredProduct === prod.id;
              const Icon = prod.icon;
              const isFuture = prod.id === 'future';

              return (
                <div
                  key={prod.id}
                  onMouseEnter={() => setHoveredProduct(prod.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onMouseMove={handleMouseMove}
                  className={`premium-card p-4 transition-all duration-300 text-left border overflow-hidden ${
                    isHovered 
                      ? 'border-white/15 bg-white/[0.005]' 
                      : 'border-white/[0.03] bg-transparent'
                  }`}
                >
                  {/* Micro Blade server unit header */}
                  <div className="flex justify-between items-center border-b border-white/[0.03] pb-2 mb-3 font-mono text-[8px] text-white/20 tracking-wider">
                    <span className={isHovered ? 'text-white/40' : ''}>{prod.nodeHeader}</span>
                    <span className={isHovered ? 'text-white/40' : ''}>{prod.metric}</span>
                  </div>

                  {/* Main Title & Status badge */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded border border-white/[0.04] bg-white/[0.005] flex items-center justify-center transition-colors duration-300 ${isHovered ? 'border-white/20' : ''}`}>
                        <Icon size={10} className={isHovered ? 'text-white' : 'text-white/35'} />
                      </div>
                      <span className="text-[13px] font-mono tracking-wide text-white/80">{prod.name}</span>
                    </div>
                    <span className={`text-[8px] font-mono tracking-wider border rounded px-1.5 py-0.5 ${
                      prod.status === 'ACTIVE' 
                        ? 'border-emerald-500/10 text-emerald-400 bg-emerald-500/[0.01]' 
                        : prod.status === 'MAINTENANCE'
                        ? 'border-[#ec4899]/10 text-[#ec4899] bg-[#ec4899]/[0.01]'
                        : prod.status === 'R&D CELL'
                        ? 'border-white/10 text-white/40 bg-white/[0.01]'
                        : 'border-white/5 text-white/25 bg-white/5'
                    }`}>
                      {prod.status}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-[12px] text-white/35 font-light leading-relaxed mb-3">
                    {prod.desc}
                  </p>

                  {/* CPU Load bar or metric line */}
                  <div className="flex items-center justify-between text-[10px] font-mono mt-2 pt-2 border-t border-white/[0.02]">
                    <div className="flex items-center gap-3 w-[60%]">
                      <span className="text-white/15 select-none text-[8.5px] uppercase">Proxy Load</span>
                      <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white/30 transition-all duration-500" 
                          style={{ width: isHovered ? `${prod.loadVal}%` : '8%' }}
                        />
                      </div>
                    </div>
                    {isHovered && !isFuture && (
                      <a 
                        href={prod.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white/60 hover:text-white flex items-center gap-1 transition-colors text-[9px] uppercase tracking-wider font-mono"
                      >
                        <span>RESOLVE INGRESS</span>
                        <ArrowUpRight size={10} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Visual Stack */}
        <div className="lg:hidden flex flex-col gap-4 pl-4 border-l border-white/[0.04] text-left">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div 
                key={prod.id} 
                className="premium-card p-5 bg-[#0d0d0d] border border-white/[0.04]"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2.5">
                    <Icon size={13} className="text-white" />
                    <span className="text-[13px] font-mono text-white/80">{prod.name}</span>
                  </div>
                  <span className="text-[8px] font-mono tracking-wider border border-white/5 text-white/30 px-1.5 py-0.5 rounded">
                    {prod.status}
                  </span>
                </div>
                <p className="text-[12px] text-white/35 font-light leading-relaxed mb-3">
                  {prod.desc}
                </p>
                <span className="text-[10px] font-mono text-white/15">{prod.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
