import React from 'react';
import { ArrowUpRight, GraduationCap, Server, Cloud, Code, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    id: 'interleet',
    name: 'Interleet',
    tagline: 'Systems Topology Sandbox',
    description: 'An interactive sandbox environment designed for technical rigor. Instead of passive tutorials, engineers construct, stress-test, and debug distributed backends and infrastructure layers under simulated workloads.',
    link: 'https://interleet.sharexpress.in',
    status: 'Active',
    icon: GraduationCap,
    features: ['Distributed Fault Injection', 'Interactive Kernel Sandboxes', 'Automated DevOps Simulations'],
    glowColor: '139, 92, 246',
    accentColor: 'text-violet-400',
    accentBorder: 'border-violet-500/20',
    accentBg: 'bg-violet-500/5',
    accentDot: 'bg-violet-400',
    cta: 'Initialize Sandbox'
  },
  {
    id: 'distribution',
    name: 'Distribution Services',
    tagline: 'Enterprise System Engineering',
    description: 'Elite engineering execution. We design core software pipelines, implement zero-downtime database migrations, and construct scalable cloud topologies for organizations with complex requirements.',
    link: 'https://distribution.sharexpress.in/',
    status: 'Active',
    icon: Code,
    features: ['High-Availability Design', 'Zero-Downtime Data Migration', 'Audited Infrastructure Pipelines'],
    glowColor: '6, 182, 212',
    accentColor: 'text-cyan-400',
    accentBorder: 'border-cyan-500/20',
    accentBg: 'bg-cyan-500/5',
    accentDot: 'bg-cyan-400',
    cta: 'Request Consulting Access'
  },
  {
    id: 'cloud',
    name: 'Cloud Platform',
    tagline: 'Edge Runtime Platform',
    description: 'The execution layer of the sharexpress ecosystem. A serverless compute platform designed to deploy static code and containerized runtimes to global edge locations, eliminating cold starts.',
    link: 'https://cloud.sharexpress.in',
    status: 'Coming Soon',
    icon: Cloud,
    features: ['Zero-Cold-Start Compute', 'Global Distributed Cache', 'Immutable Deployment Previews'],
    glowColor: '16, 185, 129',
    accentColor: 'text-emerald-400',
    accentBorder: 'border-emerald-500/20',
    accentBg: 'bg-emerald-500/5',
    accentDot: 'bg-emerald-400',
    cta: 'Request Early Alpha'
  },
  {
    id: 'files',
    name: 'Files Sharing',
    tagline: 'Secure Cloud Storage',
    description: 'A high-performance peer-to-peer and cloud-based object storage and transfer platform. Transfer files securely with end-to-end encryption, guest sandboxes, and instant global distribution.',
    link: 'https://files.sharexpress.in',
    status: 'Active',
    icon: HardDrive,
    features: ['End-to-End Encryption', 'Zero-Knowledge Storage', 'Ephemeral Guest Sandboxes'],
    glowColor: '59, 130, 246',
    accentColor: 'text-blue-400',
    accentBorder: 'border-blue-500/20',
    accentBg: 'bg-blue-500/5',
    accentDot: 'bg-blue-400',
    cta: 'Open Files Platform'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function Products() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="products" className="relative bg-transparent py-20 md:py-28 px-6 z-10">

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[680px] mb-20 md:mb-28"
        >
          <span className="section-label mb-6 block">
            Product Suite
          </span>
          <h3 className="heading-display text-[clamp(34px,5.5vw,60px)] text-white mb-7">
            <span className="text-gradient-premium">Designed for Engineers.</span>{' '}
            <br className="hidden sm:block" />
            <span className="text-white/30 font-light">Engineered for Scale.</span>
          </h3>
          <p className="body-text text-[16px] max-w-[520px] leading-[1.8]">
            Explore our modular product portfolio. Each system is designed with a single focus: logical clarity, deterministic execution, and operational reliability.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((prod, idx) => {
            const Icon = prod.icon;
            const isComingSoon = prod.status === 'Coming Soon';
            const CardComponent = isComingSoon ? motion.div : motion.a;

            return (
              <CardComponent 
                key={prod.id}
                href={isComingSoon ? undefined : prod.link}
                target={isComingSoon ? undefined : "_blank"}
                rel={isComingSoon ? undefined : "noopener noreferrer"}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                onMouseMove={handleMouseMove}
                className={`premium-card p-8 md:p-9 flex flex-col justify-between group min-h-[520px] overflow-hidden ${isComingSoon ? '' : 'cursor-pointer hover:border-white/20 transition-all duration-300'}`}
                style={{ '--glow-color': prod.glowColor }}
              >
                <div>
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.06] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:border-[rgba(var(--glow-color),0.2)] group-hover:bg-[rgba(var(--glow-color),0.05)] group-hover:scale-105">
                      <Icon className="text-white/35 group-hover:text-white/90 transition-all duration-500" size={22} strokeWidth={1.5} />
                    </div>
                    <span className={`premium-badge ${prod.accentBorder} ${prod.accentColor} ${prod.accentBg}`}>
                      {isComingSoon && <span className="w-[5px] h-[5px] rounded-full bg-white/25"></span>}
                      {!isComingSoon && (
                        <span className="relative flex h-[5px] w-[5px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40" style={{ backgroundColor: `rgb(${prod.glowColor})` }}></span>
                          <span className="relative inline-flex rounded-full h-[5px] w-[5px]" style={{ backgroundColor: `rgb(${prod.glowColor})` }}></span>
                        </span>
                      )}
                      <span>{prod.status}</span>
                    </span>
                  </div>

                  {/* Info */}
                  <h4 className="text-[24px] font-semibold tracking-[-0.025em] text-white mb-2.5 group-hover:text-white transition-colors duration-500">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] font-medium text-white/25 mb-5 tracking-[0.06em] uppercase">
                    {prod.tagline}
                  </p>
                  <p className="text-[14px] font-normal text-white/38 leading-[1.8] mb-8 tracking-[-0.005em] group-hover:text-white/50 transition-colors duration-500">
                    {prod.description}
                  </p>
                </div>

                {/* Features & CTA */}
                <div>
                  <ul className="space-y-3 border-t border-white/[0.05] pt-7 mb-8">
                    {prod.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-3 text-[13px] font-normal text-white/30 group-hover:text-white/40 transition-colors">
                        <span className="w-[5px] h-[5px] rounded-full flex-shrink-0 transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: `rgba(${prod.glowColor}, 0.35)` }}></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {isComingSoon ? (
                    <div className="w-full flex items-center justify-center py-4 border border-dashed border-white/[0.06] text-white/20 rounded-2xl text-[13px] font-medium">
                      Preview Pending
                    </div>
                  ) : (
                    <div 
                      className="w-full flex items-center justify-between py-4 px-6 bg-white/[0.03] group-hover:bg-white group-hover:text-black border border-white/[0.06] group-hover:border-white rounded-2xl text-[13px] font-semibold tracking-[-0.005em] transition-all duration-500"
                    >
                      <span>{prod.cta}</span>
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                    </div>
                  )}
                </div>
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
