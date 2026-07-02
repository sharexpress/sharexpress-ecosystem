import React, { useEffect } from 'react';
import { ArrowLeft, Shield, HardDrive, GraduationCap, Cloud, Code, Server } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const POLICIES = [
  {
    id: 'parent',
    name: 'sharexpress Parent Namespace',
    icon: Server,
    header: 'ROOT NAMESPACE ROUTING REGISTRY SPECIFICATION',
    specs: [
      { key: 'Registry Class', val: 'DNS Ingress Root Routing Gateway Namespace.' },
      { key: 'Telemetry Scope', val: 'Latency metrics, packet load frequency, edge server load, and transport socket diagnostic data.' },
      { key: 'IP Retention', val: 'Cached inside temporary RAM arrays (Redis) for a maximum of 48 hours to manage load-balancing limits.' },
      { key: 'DNS Encryption', val: 'Enforced DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) resolving interfaces across all regional nodes.' }
    ],
    details: 'The sharexpress parent registry acts as the root DNS ingress proxy coordinate for all product subdomains (*.sharexpress.in). The gateway intercepts incoming connection handshakes to determine the geographically closest edge node (e.g. ap-south-1). No payload contents, request bodies, or user cookies are parsed at this routing layer. Telemetry metrics are compiled to evaluate overall load health and mitigate DNS amplification vectors.'
  },
  {
    id: 'files',
    name: 'Files Sharing',
    icon: HardDrive,
    header: 'NON-CUSTODIAL SECURE STORAGE TELEMETRY SPECIFICATION',
    specs: [
      { key: 'Cryptographic Core', val: 'WebCrypto API enforcing client-side non-custodial AES-GCM-256 encryption. The cipher key is never sent to the network.' },
      { key: 'Payload Disposal', val: 'Files are stored in volatile bucket blocks. Garbage collection scrubbing scripts run instantly upon link expiration.' },
      { key: 'Storage Metadata', val: 'Stored as salted SHA-256 hashes. Filenames and sizes are encrypted on the browser before transit.' },
      { key: 'Access Auditing', val: 'Zero logging of downloader IP addresses. Transfer metrics calculate only download success counts.' }
    ],
    details: 'The Files Sharing subsystem operates under a strict zero-knowledge architecture. Decryption keys are derived directly inside the browser using the client-side URL hash fragment (#key). Because this hash is never sent to our servers, the parent namespace holds no physical mechanism to decrypt, view, index, or retrieve any storage items. File expiration limits are absolute and scrubbed sectors are overwritten to prevent raw disk recovery.'
  },
  {
    id: 'interleet',
    name: 'Interleet Platform',
    icon: GraduationCap,
    header: 'SYSTEMS CHALLENGE SANDBOX SPECIFICATION',
    specs: [
      { key: 'VM Containment', val: 'Docker containers isolated by cgroups namespaces. Kernel overrides are blocked.' },
      { key: 'Grader Shell logs', val: 'Captures stdin/stdout execution logs, command history, and memory fault codes.' },
      { key: 'Submission History', val: 'Cached securely inside PostgreSQL database nodes under Row Level Security (RLS).' },
      { key: 'Retention period', val: 'Volatile container data is destroyed on exit. Submission history caches are kept for 30 days.' }
    ],
    details: 'Interleet provisions short-lived sandbox grading instances to run and grade systems code. We monitor VM memory allocations, execution limits, and bash command logs solely to verify solution outputs, calculate latency scores, and prevent grading circumvention attempts. Command history data is strictly restricted to grading verification profiles.'
  },
  {
    id: 'cloud',
    name: 'Cloud Platform',
    icon: Cloud,
    header: 'EDGE COMPUTE COMPILER & RUNTIME SPECIFICATION',
    specs: [
      { key: 'Runtime Sandbox', val: 'gVisor micro-kernels isolating user deployments. System calls are sanitized.' },
      { key: 'Access Key Hashes', val: 'Deployment access tokens are hashed via Argon2id. The parent holds no plain key records.' },
      { key: 'Execution Logging', val: 'Capped at 500 lines per runtime call. Stored in log nodes and scrubbed after 7 days.' },
      { key: 'Metric Telemetry', val: 'Monitors container memory usage, edge network queries, and cold start timings.' }
    ],
    details: 'The Cloud Edge compute runtime deploys compiled packages to edge micro-clusters. We track resource utilization parameters strictly to manage quota caps. Runtime log caches are isolated via encryption keys held solely by the function developer, ensuring the parent registry has no access to compute payloads.'
  },
  {
    id: 'apis',
    name: 'Distribution APIs',
    icon: Code,
    header: 'INGRESS GATEWAY TELEMETRY SPECIFICATION',
    specs: [
      { key: 'Ingress Sanitation', val: 'API Gateway strips custom cookies, HTTP referrers, and tracking parameters before routing.' },
      { key: 'Rate Throttling', val: 'Monitors token call frequencies. Logs are kept in Redis and scrubbed on window reset.' },
      { key: 'Payload Limits', val: 'Enforces strict HTTP body inspection. Payloads over 5MB are dropped at proxy ingress.' },
      { key: 'TLS Handshakes', val: 'Caches session handshakes for 1 hour to optimize connection renegotiation speeds.' }
    ],
    details: 'Our Ingress API nodes route modular developer pipeline queries. Routing transactions log only non-identifying telemetry (response codes, method type, region node, and latency metrics) to optimize API load distribution profiles.'
  }
];

export default function PrivacyPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const activeTab = productId || 'parent';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  const activePolicy = POLICIES.find(p => p.id === activeTab) || POLICIES[0];

  return (
    <div className="min-h-screen bg-[#080808] text-white/75 relative py-20 px-6 font-sans">
      {/* Visual CAD Grid & Ambient Lighting */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[350px] pointer-events-none opacity-[0.015] blur-[100px] z-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgb(255, 255, 255) 0%, transparent 70%)'
      }} />

      <div className="max-w-[960px] mx-auto relative z-10 text-left">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors duration-300 mb-12 group bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={11} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Namespace Root</span>
        </button>

        {/* Heading */}
        <div className="border-b border-white/[0.04] pb-8 mb-12">
          <span className="section-label mb-3 block">Specification Node</span>
          <h1 className="heading-display text-[clamp(28px,4vw,48px)] text-gradient-premium leading-none">
            Ecosystem Privacy Policy
          </h1>
          <p className="text-[13px] text-white/35 font-light max-w-[500px] mt-4 leading-relaxed">
            Technical declarations regarding data lifecycle, tracking constraints, and cryptographic policies across the sharexpress infrastructure.
          </p>
        </div>

        {/* Console Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Tabs (3 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-1.5 border-r border-white/[0.03] pr-4">
            <span className="font-mono text-[9px] text-white/15 tracking-widest uppercase mb-2 select-none">Ecosystem Nodes</span>
            
            {POLICIES.map((p) => {
              const Icon = p.icon;
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/privacy/${p.id}`)}
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded text-left font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white/5 border border-white/10 text-white font-medium shadow-[0_2px_10px_rgba(255,255,255,0.02)]' 
                      : 'border border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.01]'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-white' : 'text-white/20'} />
                  <span>{p.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Details Content (8 Cols) */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            <div className="premium-card p-6 md:p-8 border border-white/[0.04] bg-[#0d0d0d]/40 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* Tab Header */}
              <div className="border-b border-white/[0.04] pb-4 mb-6">
                <span className="font-mono text-[8px] tracking-widest text-white/25 block mb-1">{activePolicy.header}</span>
                <h2 className="text-[18px] font-mono text-white">{activePolicy.name}</h2>
              </div>

              {/* Specs Table */}
              <div className="space-y-4 mb-6">
                {activePolicy.specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start border-b border-white/[0.02] pb-3 last:border-0 font-mono text-[11px]">
                    <span className="text-white/30 sm:w-[160px] flex-shrink-0 mb-1 sm:mb-0 uppercase tracking-wider">{spec.key}</span>
                    <span className="text-white/70 font-light leading-relaxed">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Detailed statement */}
              <div className="border-t border-white/[0.03] pt-5">
                <h3 className="font-mono text-[10px] tracking-widest text-white/20 uppercase mb-3">Telemetry Context</h3>
                <p className="text-[12.5px] text-white/45 leading-relaxed font-light">
                  {activePolicy.details}
                </p>
              </div>
            </div>

            {/* Audit log footnote */}
            <div className="flex items-center gap-2 pl-2 font-mono text-[9px] text-white/20 select-none">
              <Shield size={10} />
              <span>LOG LEVEL: PARANOID // AUDITED: 2026-07-02 UTC</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
