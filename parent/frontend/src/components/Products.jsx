import React from 'react';
import { ArrowUpRight, GraduationCap, Code, Cloud, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    id: 'interleet',
    name: 'Interleet',
    tagline: 'SYSTEMS TRAINING SANDBOX',
    description: 'An interactive sandbox environment designed for technical rigor. Instead of passive tutorials, engineers construct, stress-test, and debug distributed backends and infrastructure layers under simulated workloads.',
    link: 'https://interleet.sharexpress.in',
    availability: 'Production Ready',
    status: 'Operational',
    statusColor: 'bg-emerald-500',
    icon: GraduationCap,
    cta: 'Launch Sandbox'
  },
  {
    id: 'distribution',
    name: 'Distribution Services',
    tagline: 'ENTERPRISE SYSTEM ENGINEERING',
    description: 'Elite systems engineering and consulting. We design core software pipelines, implement zero-downtime database migrations, and construct scalable cloud topologies for organizations with complex requirements.',
    link: 'https://distribution.sharexpress.in/',
    availability: 'Active Ingress',
    status: 'Operational',
    statusColor: 'bg-emerald-500',
    icon: Code,
    cta: 'Access Specification'
  },
  {
    id: 'cloud',
    name: 'Cloud Platform',
    tagline: 'EDGE COMPUTE RUNTIME',
    description: 'The execution layer of the sharexpress ecosystem. A serverless compute platform designed to deploy static code and containerized runtimes to global edge locations, eliminating cold starts.',
    link: 'https://cloud.sharexpress.in',
    availability: 'Private Alpha',
    status: 'In Development',
    statusColor: 'bg-white/20',
    icon: Cloud,
    cta: 'Request Access'
  },
  {
    id: 'files',
    name: 'Files Sharing',
    tagline: 'SECURE CLOUD STORAGE',
    description: 'A high-performance peer-to-peer and cloud-based object storage and transfer platform. Transfer files securely with end-to-end encryption, guest sandboxes, and instant global distribution.',
    link: 'https://files.sharexpress.in',
    availability: 'Production Ready',
    status: 'Operational',
    statusColor: 'bg-emerald-500',
    icon: HardDrive,
    cta: 'Open Storage'
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

export default function Products() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="products" className="relative bg-transparent py-24 md:py-32 px-6 z-10">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header with Masked reveals */}
        <div className="max-w-[680px] mb-16 md:mb-24 text-left">
          <span className="section-label mb-5 block">Product Specifications</span>
          
          <h3 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6 leading-[1.1]">
            <div className="overflow-hidden block py-1">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient-premium block"
              >
                Ecosystem Verticals.
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
                Official Infrastructure Nodes.
              </motion.span>
            </div>
          </h3>
          
          <p className="body-text text-[14px] max-w-[500px]">
            Explore our modular product portfolio. Each system is designed with a single focus: logical clarity, deterministic execution, and operational reliability.
          </p>
        </div>

        {/* Minimal Cards Grid with Stagger Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            const isAlpha = prod.id === 'cloud';
            const CardComponent = isAlpha ? motion.div : motion.a;

            return (
              <CardComponent
                key={prod.id}
                href={isAlpha ? undefined : prod.link}
                target={isAlpha ? undefined : "_blank"}
                rel={isAlpha ? undefined : "noopener noreferrer"}
                variants={cardVariants}
                onMouseMove={handleMouseMove}
                className={`premium-card p-6 md:p-8 flex flex-col justify-between text-left min-h-[380px] transition-all duration-300 border border-white/[0.03] ${
                  isAlpha ? '' : 'cursor-pointer hover:border-white/20 hover:bg-white/[0.005]'
                }`}
              >
                {/* Icon, Availability & Status LED */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-9 h-9 border border-white/[0.04] bg-white/[0.005] rounded flex items-center justify-center">
                      <Icon className="text-white/80" size={16} strokeWidth={1.25} />
                    </div>
                    
                    {/* Status & Availability badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white/30">{prod.availability}</span>
                      <div className="flex items-center gap-1 bg-white/[0.01] border border-white/[0.04] rounded px-1.5 py-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${prod.statusColor}`} />
                        <span className="text-[8px] font-mono text-white/40 tracking-wide uppercase">{prod.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h4 className="text-[18px] font-mono tracking-wide text-white mb-1.5">
                    {prod.name}
                  </h4>
                  <p className="text-[8.5px] font-mono tracking-widest text-white/40 mb-4 uppercase">
                    {prod.tagline}
                  </p>
                  
                  {/* Short Description */}
                  <p className="text-[12.5px] text-white/35 font-light leading-relaxed mb-6">
                    {prod.description}
                  </p>
                </div>

                {/* Minimal CTA */}
                <div className="pt-4 border-t border-white/[0.03] mt-auto">
                  {isAlpha ? (
                    <div className="w-full py-2.5 text-center border border-dashed border-white/[0.04] text-white/20 rounded font-mono text-[10px] uppercase tracking-wider select-none">
                      Alpha Pre-provisioned
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/60 hover:text-white uppercase tracking-wider transition-colors duration-300">
                      <span>{prod.cta}</span>
                      <ArrowUpRight size={12} className="opacity-40" />
                    </div>
                  )}
                </div>
              </CardComponent>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
