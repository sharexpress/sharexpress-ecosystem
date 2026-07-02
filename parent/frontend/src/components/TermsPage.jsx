import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, HardDrive, GraduationCap, Cloud, Code, Server } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TERMS = [
  {
    id: 'parent',
    name: 'sharexpress Parent Namespace',
    icon: Server,
    header: 'ROOT NAMESPACE REGISTER TERMS',
    specs: [
      { key: 'Registry Access', val: 'Subdomain allocations (*.sharexpress.in) are provided dynamically based on namespace availability.' },
      { key: 'Transit Quota', val: 'Fair-use data transit is capped at 10 TB/month. Exceeding volumes will throttle edge routing.' },
      { key: 'Abuse Audits', val: 'Executing denial of service (DDoS) loops or port scans against regional gateways results in immediate blacklist.' },
      { key: 'Rate Throttling', val: 'Queries are limited to 1,200 requests/minute per root connection point.' }
    ],
    details: 'By accessing or delegating network routers to the sharexpress registry coordinate, you agree to adhere to edge proxy bandwidth limits. We reserve the right to prune inactive or malicious subdomains to maintain system latency indexes across our regional clusters.'
  },
  {
    id: 'files',
    name: 'Files Sharing',
    icon: HardDrive,
    header: 'SECURE CLOUD STORAGE TERMS',
    specs: [
      { key: 'Key Custody', val: 'Zero custody. The user holds sole responsibility for derivation hashes. We cannot reset or recover keys.' },
      { key: 'Garbage Collection', val: 'Object payloads are automatically scrubbed from memory arrays immediately upon link expiration.' },
      { key: 'Acceptable Content', val: 'Distribution of malicious compiler payloads or viruses is strictly prohibited.' },
      { key: 'Storage Limits', val: 'Guest storage slots are capped at 4GB per user without dedicated workspace nodes.' }
    ],
    details: 'Files storage limits are defined dynamically based on node volume configurations. All operations are non-custodial; files cannot be retrieved by sharexpress if decryption keys are lost. Link expiration parameters are final and cannot be reverted.'
  },
  {
    id: 'interleet',
    name: 'Interleet Platform',
    icon: GraduationCap,
    header: 'SANDBOX TESTING GRADER TERMS',
    specs: [
      { key: 'Resource Cap', val: 'Grading containers are limited to 0.5 vCPU and 256MB RAM allocations.' },
      { key: 'Cheating Boundaries', val: 'Circumventing runtimes, decompiling test scripts, or sharing grading keys is prohibited.' },
      { key: 'Code Property', val: 'Submission challenge code remains the intellectual property of the author.' },
      { key: 'Networking Cap', val: 'Containers are disconnected from external networks to prevent database leaks.' }
    ],
    details: 'Interleet provisions short-lived VM containers to test systems code. Bypassing sandbox cgroups or seeking socket connections to local grading databases will trigger an automatic security lock and grader reset.'
  },
  {
    id: 'cloud',
    name: 'Cloud Platform',
    icon: Cloud,
    header: 'EDGE COMPUTE COMPILER TERMS',
    specs: [
      { key: 'Cold Start limits', val: 'Edge functions are limited to a maximum execution lifecycle of 10 seconds per request.' },
      { key: 'cgroups boundaries', val: 'Containers run inside isolated namespace kernels. Virtual memory overrides are disabled.' },
      { key: 'Function SLA', val: 'Uptime guarantees are governed by regional node availability logs.' },
      { key: 'Concurrency', val: 'Free tier limits deployment concurrency to 5 concurrent active execution cells.' }
    ],
    details: 'Cloud runtimes compile and deploy static scripts to edge proxies. Users agree to prevent infinite loops, memory leakages, or continuous background tasks that exhaust proxy resource bounds.'
  },
  {
    id: 'apis',
    name: 'Distribution APIs',
    icon: Code,
    header: 'INGRESS REGION ROUTING TERMS',
    specs: [
      { key: 'API Rate limit', val: 'Standard requests are throttled at 60 calls/minute per authorization namespace token.' },
      { key: 'RPC Payload', val: 'Requests exceeding 5MB are automatically dropped by the Gateway proxy filters.' },
      { key: 'Token Secrecy', val: 'Namespace access keys must be kept private. Compromised keys must be rotated immediately.' },
      { key: 'Audit Cache', val: 'Ingress logs store routing success records for 48 hours before scrub.' }
    ],
    details: 'Distribution API routes are monitored for request frequencies. Attempting to spoof ingress headers or forge signature tokens will result in proxy filters blocking the originating IP address.'
  }
];

export default function TermsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const activeTab = productId || 'parent';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  const activeTerm = TERMS.find(t => t.id === activeTab) || TERMS[0];

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
            Ecosystem Terms of Service
          </h1>
          <p className="text-[13px] text-white/35 font-light max-w-[500px] mt-4 leading-relaxed">
            Legal coordinates regarding namespace governance, rate thresholds, and usage limits across the sharexpress parent namespace.
          </p>
        </div>

        {/* Console Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Tabs (3 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-1.5 border-r border-white/[0.03] pr-4">
            <span className="font-mono text-[9px] text-white/15 tracking-widest uppercase mb-2 select-none">Ecosystem Nodes</span>
            
            {TERMS.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => navigate(`/terms/${t.id}`)}
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded text-left font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white/5 border border-white/10 text-white font-medium shadow-[0_2px_10px_rgba(255,255,255,0.02)]' 
                      : 'border border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.01]'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-white' : 'text-white/20'} />
                  <span>{t.name.split(' ')[0]}</span>
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
                <span className="font-mono text-[8px] tracking-widest text-white/25 block mb-1">{activeTerm.header}</span>
                <h2 className="text-[18px] font-mono text-white">{activeTerm.name}</h2>
              </div>

              {/* Specs Table */}
              <div className="space-y-4 mb-6">
                {activeTerm.specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start border-b border-white/[0.02] pb-3 last:border-0 font-mono text-[11px]">
                    <span className="text-white/30 sm:w-[160px] flex-shrink-0 mb-1 sm:mb-0 uppercase tracking-wider">{spec.key}</span>
                    <span className="text-white/70 font-light leading-relaxed">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Detailed statement */}
              <div className="border-t border-white/[0.03] pt-5">
                <h3 className="font-mono text-[10px] tracking-widest text-white/20 uppercase mb-3">Governance Scope</h3>
                <p className="text-[12.5px] text-white/45 leading-relaxed font-light">
                  {activeTerm.details}
                </p>
              </div>
            </div>

            {/* Audit log footnote */}
            <div className="flex items-center gap-2 pl-2 font-mono text-[9px] text-white/20 select-none">
              <BookOpen size={10} />
              <span>REGISTRY STATUS: VERIFIED // VERIFIED: 2026-07-02 UTC</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
