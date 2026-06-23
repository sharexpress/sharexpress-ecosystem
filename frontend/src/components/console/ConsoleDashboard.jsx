import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Cpu, Database, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';

const LOG_TEMPLATES = [
  { level: 'INF', msg: 'GET /api/v1/auth/session - 200 OK (11ms) - Edge/SG', color: 'text-neutral-400' },
  { level: 'INF', msg: 'Edge routing node synced in Frankfurt (DE)', color: 'text-cyan-400/80' },
  { level: 'INF', msg: 'GET /assets/main.css - 304 Not Modified - CDN Cache hit', color: 'text-neutral-400' },
  { level: 'WRN', msg: 'Edge node CPU spike (45%) in North Virginia (US-East)', color: 'text-amber-400/80' },
  { level: 'INF', msg: 'POST /api/v1/inquiries - 201 Created (48ms)', color: 'text-emerald-400/80' },
  { level: 'INF', msg: 'Serverless execution warm start: router-handler (120ms)', color: 'text-neutral-400' },
  { level: 'INF', msg: 'Deployment check completed. Git head hash: fb97a22', color: 'text-violet-400/80' }
];

export default function ConsoleDashboard({ onNavigateToDeployments }) {
  const [logs, setLogs] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLogs(LOG_TEMPLATES.slice(0, 4));

    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const timestamp = new Date().toLocaleTimeString();
      const newLog = {
        id: Math.random(),
        time: timestamp,
        ...template
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsRefreshing(false);
  };

  const metrics = [
    { title: 'Edge Requests', value: '1,429,203', diff: '+12.4%', colorClass: 'glow-accent-cyan', borderAccent: 'group-hover:border-cyan-500/15', icon: Activity, iconColor: 'text-cyan-400' },
    { title: 'Avg. Latency', value: '28.4 ms', diff: '-4.1ms', colorClass: 'glow-accent-emerald', borderAccent: 'group-hover:border-emerald-500/15', icon: Zap, iconColor: 'text-emerald-400' },
    { title: 'Serverless CPU', value: '14.8 %', diff: 'Optimal', colorClass: 'glow-accent-violet', borderAccent: 'group-hover:border-violet-500/15', icon: Cpu, iconColor: 'text-violet-400' },
    { title: 'Data Egress', value: '412.9 GB', diff: '+8.9%', colorClass: 'glow-accent-amber', borderAccent: 'group-hover:border-amber-500/15', icon: Database, iconColor: 'text-amber-400' }
  ];

  return (
    <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-8 w-full max-w-[1200px] mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] tracking-[0.08em] text-white/20 uppercase block mb-1.5 font-medium">Compute Center</span>
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-white">Dashboard Workspace</h2>
        </div>

        <button 
          onClick={handleManualRefresh}
          className="flex items-center gap-2 px-5 py-2.5 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] text-[12px] text-white/50 hover:text-white rounded-xl transition-all duration-300 active:scale-[0.98] font-medium"
        >
          <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Sync Stats</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`premium-card p-6 bg-white/[0.015] flex flex-col justify-between group overflow-hidden border border-white/[0.05] ${m.borderAccent}`}
            >
              <div className="flex justify-between items-start mb-7">
                <span className="text-[12px] text-white/35 font-medium tracking-[-0.005em]">{m.title}</span>
                <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <Icon size={15} className={m.iconColor} />
                </div>
              </div>
              <div>
                <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-white leading-none mb-2.5">{m.value}</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] uppercase font-mono tracking-wider font-medium ${m.diff.startsWith('+') ? 'text-emerald-400/80' : m.diff.startsWith('-') ? 'text-cyan-400/80' : 'text-white/20'}`}>
                    {m.diff}
                  </span>
                  <span className="text-[9px] text-white/15 font-medium">from last 24h</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart + Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 premium-card p-7 border border-white/[0.05] bg-white/[0.015] flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="flex justify-between items-start mb-7">
              <div>
                <h4 className="text-[16px] font-semibold text-white mb-1.5">Network Traffic Distribution</h4>
                <p className="text-[11px] text-white/25 font-normal">Edge gateway request throughput (Singapore, Frankfurt, US-East).</p>
              </div>
              <span className="premium-badge text-[9px] text-cyan-400 border-cyan-500/20 bg-cyan-500/5 relative pl-6">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-cyan-400 animate-pulse"></span>
                Singapore Active
              </span>
            </div>
            
            <div className="w-full h-44 relative mt-2 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.10)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.0)" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="5 5" />

                <path 
                  d="M 0 150 C 50 110, 80 130, 120 70 C 160 30, 200 80, 240 50 C 280 20, 320 90, 360 40 C 400 10, 440 60, 500 20 L 500 150 Z" 
                  fill="url(#chartGradient)"
                />
                
                <motion.path 
                  d="M 0 150 C 50 110, 80 130, 120 70 C 160 30, 200 80, 240 50 C 280 20, 320 90, 360 40 C 400 10, 440 60, 500 20" 
                  fill="none" 
                  stroke="rgba(6, 182, 212, 0.50)" 
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                />

                <circle cx="120" cy="70" r="3" fill="#ffffff" stroke="rgb(6, 182, 212)" strokeWidth="1" className="animate-pulse" />
                <circle cx="240" cy="50" r="3" fill="#ffffff" stroke="rgb(6, 182, 212)" strokeWidth="1" />
                <circle cx="360" cy="40" r="3" fill="#ffffff" stroke="rgb(6, 182, 212)" strokeWidth="1" />
                <circle cx="500" cy="20" r="4" fill="#ffffff" stroke="rgb(6, 182, 212)" strokeWidth="1.5" />
              </svg>
              <div className="absolute top-[3px] right-2 px-3 py-1.5 rounded-xl bg-[#0a0a0a] border border-white/[0.08] text-[9px] font-mono text-cyan-400 font-medium">
                Peak: 4.8k req/sec
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-white/[0.05] pt-5 mt-7">
            <span className="text-[10px] text-white/18 tracking-wider font-mono font-medium">GRID SCALE: 1h INTERVALS</span>
            <button 
              onClick={onNavigateToDeployments}
              className="text-[11px] text-white/45 hover:text-white flex items-center gap-1.5 transition-colors group font-medium"
            >
              <span>Verify deployment sources</span>
              <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
            </button>
          </div>
        </motion.div>

        {/* Logs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="premium-card p-7 border border-white/[0.05] bg-white/[0.015] flex flex-col justify-between overflow-hidden"
        >
          <div className="flex flex-col flex-grow min-h-0">
            <h4 className="text-[16px] font-semibold text-white mb-1.5">Edge System Logs</h4>
            <p className="text-[11px] text-white/25 font-normal mb-5">Real-time incoming telemetry data ticker.</p>
            
            <div className="flex-1 min-h-[160px] bg-black/50 rounded-2xl border border-white/[0.04] p-4 font-mono text-[10.5px] leading-[1.65] text-white/40 overflow-y-auto console-scrollbar relative flex flex-col-reverse gap-2">
              <div className="absolute inset-0 bg-gradient-to-b from-[#000]/15 to-transparent pointer-events-none rounded-2xl" />
              {logs.map((log) => (
                <div key={log.id} className="log-entry flex items-start gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="text-white/12 select-none font-medium">[{log.time || new Date().toLocaleTimeString()}]</span>
                  <span className="text-white/18 select-none font-bold uppercase font-mono text-[9px] bg-white/[0.04] px-1 rounded-md">{log.level}</span>
                  <span className={`font-mono tracking-tight select-all truncate ${log.color}`}>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 pt-5 mt-6 border-t border-white/[0.05] text-[10px] text-white/18 uppercase tracking-[0.06em] font-mono font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Real-time Socket stream (active)</span>
          </div>
        </motion.div>

      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="premium-card p-7 border border-white/[0.05] bg-white/[0.015] flex items-start gap-5 group hover:border-violet-500/10 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-center text-violet-400 flex-shrink-0">
            <Server size={17} />
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-white mb-1.5">Developer Education Hub</h4>
            <p className="text-[13px] text-white/35 font-normal leading-[1.65] mb-3">
              Learn systems design and mock docker testing with <strong className="text-white/50">Interleet</strong> modules.
            </p>
            <a href="https://interleet.sharexpress.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-violet-400 hover:text-violet-300 font-semibold transition-colors">
              <span>Launch challenges academy</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>

        <div className="premium-card p-7 border border-white/[0.05] bg-white/[0.015] flex items-start gap-5 group hover:border-cyan-500/10 transition-all">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Zap size={17} />
          </div>
          <div>
            <h4 className="text-[15px] font-semibold text-white mb-1.5">Expert Platform Integrations</h4>
            <p className="text-[13px] text-white/35 font-normal leading-[1.65] mb-3">
              Coordinate bespoke multi-cloud architectural upgrades with our engineering team.
            </p>
            <a href="https://distribution.sharexpress.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              <span>Consult cloud architecture</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
