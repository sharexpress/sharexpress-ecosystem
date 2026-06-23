import React from 'react';

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
    <div className="mx-2 flex items-center gap-3 px-6 py-4 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.05] rounded-2xl transition-all duration-500 select-none cursor-default group shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-[1px]">
      <span className="text-[13px] tracking-[-0.01em] font-semibold text-white/55 group-hover:text-white/90 transition-colors duration-500 whitespace-nowrap">
        {name}
      </span>
      <span className="w-[4px] h-[4px] bg-white/10 rounded-full flex-shrink-0 group-hover:bg-white/30 transition-colors duration-500"></span>
      <span className="text-[10px] tracking-[0.06em] text-white/20 uppercase whitespace-nowrap font-medium group-hover:text-white/40 transition-colors duration-500">
        {category}
      </span>
    </div>
  );
}

export default function TechStackMarquee() {
  const firstTrack = [...TRACK_1, ...TRACK_1, ...TRACK_1];
  const secondTrack = [...TRACK_2, ...TRACK_2, ...TRACK_2];

  return (
    <section id="tech-stack" className="relative bg-transparent py-20 md:py-28 overflow-hidden z-10">
      {/* Header section spacing */}

      <div className="max-w-[1200px] mx-auto px-6 mb-20 md:mb-24">
        <div className="max-w-[680px]">
          <span className="section-label mb-6 block">
            Infrastructure Standards
          </span>
          <h3 className="heading-display text-[clamp(34px,5.5vw,60px)] text-white mb-7">
            <span className="text-gradient-premium">Core Engineering</span>{' '}
            <span className="text-white/30 font-light">Stack.</span>
          </h3>
          <p className="body-text text-[16px] max-w-[520px] leading-[1.8]">
            Our systems deploy on audited, proven technologies that prioritize runtime speed, team velocity, and operational clarity.
          </p>
        </div>
      </div>

      {/* Marquee Rails */}
      <div className="flex flex-col gap-4 w-full">
        {/* Track 1 */}
        <div className="w-full overflow-hidden relative py-1">
          <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />
          
          <div className="animate-marquee">
            {firstTrack.map((tech, idx) => (
              <TechPill key={idx} name={tech.name} category={tech.category} />
            ))}
          </div>
        </div>

        {/* Track 2 */}
        <div className="w-full overflow-hidden relative py-1">
          <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

          <div className="animate-marquee-reverse">
            {secondTrack.map((tech, idx) => (
              <TechPill key={idx} name={tech.name} category={tech.category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
