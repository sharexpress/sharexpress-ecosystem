import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Server, GitBranch, GitCommit, CheckCircle2, AlertCircle, Loader2, Plus, ArrowUpRight, HelpCircle, RefreshCw } from 'lucide-react';
import CreateDeploymentModal from './CreateDeploymentModal';

const INITIAL_DEPLOYMENTS = [
  { name: 'interleet-frontend', slug: 'https://interleet.sharexpress.app', branch: 'main', commitMsg: 'feat: add ai feedback logs system', commitHash: 'd3f7e12', status: 'Ready', created: '2 hours ago' },
  { name: 'services-portal', slug: 'https://services.sharexpress.app', branch: 'main', commitMsg: 'refactor: migrate database cluster targets', commitHash: '8b9c10a', status: 'Ready', created: '1 day ago' },
  { name: 'edge-router-proxy', slug: 'https://edge-proxy.sharexpress.app', branch: 'dev', commitMsg: 'fix: edge container caching timeouts', commitHash: 'a52f97c', status: 'Failed', errorMsg: 'SyntaxError: Unexpected token < in edge-router.js:23', created: '3 days ago' },
  { name: 'sharexpress-marketing', slug: 'https://sharexpress.app', branch: 'main', commitMsg: 'chore: configure structured schema json-ld', commitHash: 'fb97a22', status: 'Ready', created: '5 days ago' }
];

export default function ConsoleDeployments() {
  const [deployments, setDeployments] = useState(INITIAL_DEPLOYMENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspectingLogs, setInspectingLogs] = useState(null);

  const handleReload = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);
  };

  const handleCreateDeployment = (newDep) => {
    setDeployments((prev) => [
      {
        name: newDep.name,
        slug: newDep.slug,
        branch: newDep.branch,
        commitMsg: 'initial: configure project environment',
        commitHash: Math.random().toString(16).substr(2, 7),
        status: 'Ready',
        created: 'Just now'
      },
      ...prev
    ]);
    setIsModalOpen(false);
  };

  const filteredDeployments = deployments.filter((dep) => {
    const matchesSearch = dep.name.toLowerCase().includes(search.toLowerCase()) || 
                          dep.commitMsg.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || dep.status === statusFilter;
    const matchesBranch = branchFilter === 'All' || dep.branch === branchFilter;
    
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setBranchFilter('All');
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-8 w-full max-w-[1200px] mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] tracking-[0.08em] text-white/20 uppercase block mb-1.5 font-medium">Server infrastructure</span>
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-white">Active Deployments</h2>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/95 text-black rounded-2xl font-semibold text-[13px] transition-all duration-300 active:scale-[0.98] shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_8px_28px_rgba(255,255,255,0.14)]"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Deploy Project</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div className="relative w-full md:w-[320px]">
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deployments or commits..."
            className="premium-input pl-11 py-3 text-[13px]"
          />
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/22" />
        </div>

        <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/18 uppercase tracking-[0.04em] font-mono font-medium">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-[12px] text-white/55 focus:border-white/18 outline-none transition-all font-medium"
            >
              <option value="All" className="bg-[#0a0a0a] text-white">All Statuses</option>
              <option value="Ready" className="bg-[#0a0a0a] text-white">Ready</option>
              <option value="Failed" className="bg-[#0a0a0a] text-white">Failed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/18 uppercase tracking-[0.04em] font-mono font-medium">Branch</span>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-[12px] text-white/55 focus:border-white/18 outline-none transition-all font-medium"
            >
              <option value="All" className="bg-[#0a0a0a] text-white">All Branches</option>
              <option value="main" className="bg-[#0a0a0a] text-white">main</option>
              <option value="dev" className="bg-[#0a0a0a] text-white">dev</option>
            </select>
          </div>

          <button
            onClick={handleReload}
            disabled={isLoading}
            className="w-10 h-10 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] text-white/50 hover:text-white flex items-center justify-center transition-all disabled:opacity-50"
            title="Reload table state"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full bg-white/[0.015] border border-white/[0.05] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="w-full overflow-x-auto console-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.015]">
                <th className="py-4 px-6 text-[10px] uppercase font-mono tracking-wider text-white/25 font-bold w-[250px]">Deployment</th>
                <th className="py-4 px-6 text-[10px] uppercase font-mono tracking-wider text-white/25 font-bold w-[120px]">Status</th>
                <th className="py-4 px-6 text-[10px] uppercase font-mono tracking-wider text-white/25 font-bold w-[120px]">Branch</th>
                <th className="py-4 px-6 text-[10px] uppercase font-mono tracking-wider text-white/25 font-bold">Commits</th>
                <th className="py-4 px-6 text-[10px] uppercase font-mono tracking-wider text-white/25 font-bold w-[130px]">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <AnimatePresence mode="popLayout">
                
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, sidx) => (
                    <tr key={sidx} className="animate-pulse">
                      <td className="py-5 px-6">
                        <div className="w-[160px] h-4 skeleton-shimmer rounded-lg mb-1.5" />
                        <div className="w-[120px] h-3 skeleton-shimmer rounded-lg opacity-60" />
                      </td>
                      <td className="py-5 px-6">
                        <div className="w-[70px] h-5 skeleton-shimmer rounded-full" />
                      </td>
                      <td className="py-5 px-6">
                        <div className="w-[80px] h-4 skeleton-shimmer rounded-lg" />
                      </td>
                      <td className="py-5 px-6">
                        <div className="w-[200px] h-4 skeleton-shimmer rounded-lg mb-1" />
                        <div className="w-[60px] h-3 skeleton-shimmer rounded-lg opacity-60" />
                      </td>
                      <td className="py-5 px-6">
                        <div className="w-[60px] h-4 skeleton-shimmer rounded-lg" />
                      </td>
                    </tr>
                  ))
                ) : 
                
                filteredDeployments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-20 px-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 text-white/18">
                          <Server size={22} />
                        </div>
                        <h4 className="text-[16px] font-semibold text-white mb-2">No deployments found</h4>
                        <p className="text-[13px] text-white/35 font-normal max-w-xs mb-6">We couldn't find any deployments matching your search or filters.</p>
                        <button 
                          onClick={handleResetFilters}
                          className="px-5 py-2.5 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] text-[12px] text-white/55 hover:text-white rounded-xl transition-all font-medium"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : 
                
                filteredDeployments.map((dep, idx) => {
                  const isReady = dep.status === 'Ready';
                  const isInspecting = inspectingLogs === dep.name;

                  return (
                    <React.Fragment key={dep.name}>
                      <motion.tr 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className={`hover:bg-white/[0.015] transition-all group/row ${isInspecting ? 'bg-white/[0.02]' : ''}`}
                      >
                        <td className="py-5 px-6">
                          <h4 className="text-[14px] text-white font-semibold mb-1 truncate max-w-[200px]">{dep.name}</h4>
                          <a 
                            href={dep.slug} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[11.5px] text-cyan-400/75 hover:text-cyan-300 font-mono flex items-center gap-1 group/slug"
                          >
                            <span className="truncate max-w-[180px]">{dep.slug.replace('https://', '')}</span>
                            <ArrowUpRight size={10} className="opacity-0 group-hover/slug:opacity-100 transition-opacity duration-300" />
                          </a>
                        </td>

                        <td className="py-5 px-6">
                          <span className={`premium-badge text-[9.5px] ${
                            isReady 
                              ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5 pl-6 relative' 
                              : 'border-red-500/20 text-red-400 bg-red-500/5 pl-6 relative cursor-pointer'
                          }`}
                          onClick={() => !isReady && setInspectingLogs(isInspecting ? null : dep.name)}
                          >
                            <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full ${
                              isReady ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                            }`} />
                            {dep.status}
                          </span>
                        </td>

                        <td className="py-5 px-6 text-white/50 text-[12.5px]">
                          <span className="flex items-center gap-1.5 font-mono text-[12px] font-medium">
                            <GitBranch size={12} className="text-white/18" />
                            {dep.branch}
                          </span>
                        </td>

                        <td className="py-5 px-6">
                          <div className="flex flex-col">
                            <p className="text-[13px] text-white/65 font-normal truncate max-w-[250px] group-hover/row:text-white transition-colors">
                              {dep.commitMsg}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <GitCommit size={11} className="text-white/18" />
                              <span className="text-[10px] text-white/22 font-mono font-medium">{dep.commitHash}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12.5px] text-white/35 font-normal">{dep.created}</span>
                            <button
                              onClick={() => setInspectingLogs(isInspecting ? null : dep.name)}
                              className="opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 text-[11px] text-white/30 hover:text-white font-medium px-2.5 py-1 rounded-lg hover:bg-white/[0.04]"
                            >
                              Logs
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                      
                      {isInspecting && (
                        <tr>
                          <td colSpan="5" className="bg-[#030303] border-b border-white/[0.05] p-7 relative">
                            <div className="absolute top-0 bottom-0 left-7 w-[2px] bg-cyan-500/25 rounded-full" />
                            <div className="pl-7 flex flex-col gap-4 font-mono">
                              <div className="flex justify-between items-center text-[11px] text-white/28 tracking-[0.04em] font-medium">
                                <span>PIPELINE BUILD INSPECTION</span>
                                <button 
                                  onClick={() => setInspectingLogs(null)}
                                  className="text-red-400 hover:text-red-300 font-medium"
                                >
                                  Close log panel
                                </button>
                              </div>
                              <div className="bg-black/70 rounded-2xl border border-white/[0.05] p-5 text-[11px] text-white/65">
                                {isReady ? (
                                  <div className="space-y-1.5 text-emerald-400/80">
                                    <p className="text-white/28 font-mono">[Ready Log Check] Sandbox system check success.</p>
                                    <p className="font-mono">  - Edge containers deployed: 3 locations synced.</p>
                                    <p className="font-mono">  - SSL Certificates validated.</p>
                                    <p className="font-mono">  - Edge bandwidth allocations: UNLIMITED.</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2.5">
                                    <div className="flex items-center gap-2 text-red-400">
                                      <AlertCircle size={13} />
                                      <span className="font-bold">BUILD FAILURE IN EDGE RESOLUTION</span>
                                    </div>
                                    <code className="block text-red-300 font-mono bg-red-950/20 p-3.5 rounded-xl border border-red-500/10 whitespace-pre">
                                      {dep.errorMsg}
                                    </code>
                                    <p className="text-white/18 text-[10px] mt-2">
                                      Fix by revising the webpack config target or pushing a commit with valid bundle references.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}

              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide */}
      <div className="p-6 premium-card border border-white/[0.05] bg-white/[0.015] flex items-start gap-4">
        <HelpCircle size={16} className="text-white/25 flex-shrink-0 mt-0.5" />
        <div className="text-[12.5px] text-white/35 font-normal leading-[1.7]">
          Every commit on your configured Git branch is automatically built, tested, and distributed to global edge servers. Hover rows or click status badges to inspect pipelines.
        </div>
      </div>

      {/* Modal */}
      <CreateDeploymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeploymentCreated={handleCreateDeployment}
      />

    </div>
  );
}
