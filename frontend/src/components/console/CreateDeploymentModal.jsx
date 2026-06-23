import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Loader2, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const MOCK_BUILD_LOGS = [
  'Cloning repository main branch...',
  'Analyzing package structures (discovered React & Vite package configuration)',
  'Setting environment targets inside edge containers...',
  'Running build command: npm run build',
  'vite v8.0.16 building client environment for production...',
  'transforming modules... (2188 components parsed successfully)',
  'rendering chunks and optimization bundles...',
  'Built in 572ms. Generated bundle outputs:',
  '  - dist/index.html (6.38 kB)',
  '  - dist/assets/index-CO2ik5Po.css (61.38 kB)',
  '  - dist/assets/index-6WKhmRji.js (238.21 kB)',
  'Synchronizing edge distribution node CDN caches...',
  'Singapore (SG) Node status: ONLINE',
  'Frankfurt (DE) Node status: ONLINE',
  'US-East (N. Virginia) Node status: ONLINE',
  'Deployment pipeline resolved. Routing endpoints...',
  'SUCCESS: Domain mapping active at https://{slug}.sharexpress.app'
];

export default function CreateDeploymentModal({ isOpen, onClose, onDeploymentCreated }) {
  const [step, setStep] = useState('input');
  const [projectName, setProjectName] = useState('');
  const [branch, setBranch] = useState('main');
  const [repoUrl, setRepoUrl] = useState('');
  const [envVars, setEnvVars] = useState([{ key: '', value: '' }]);
  const [buildLogs, setBuildLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  const [buildProgress, setBuildProgress] = useState(0);

  const logsEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setProjectName('');
      setBranch('main');
      setRepoUrl('');
      setEnvVars([{ key: '', value: '' }]);
      setBuildLogs([]);
      setLogIndex(0);
      setBuildProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step !== 'building') return;

    if (logIndex < MOCK_BUILD_LOGS.length) {
      const logTimeout = setTimeout(() => {
        const currentLog = MOCK_BUILD_LOGS[logIndex];
        const processedLog = currentLog.replace('{slug}', projectName.toLowerCase().replace(/\s+/g, '-'));
        
        setBuildLogs((prev) => [...prev, processedLog]);
        setLogIndex((prev) => prev + 1);
        setBuildProgress(Math.round(((logIndex + 1) / MOCK_BUILD_LOGS.length) * 100));
      }, 350 + Math.random() * 300);

      return () => clearTimeout(logTimeout);
    } else {
      const completeTimeout = setTimeout(() => {
        setStep('success');
        const generatedSlug = `https://${projectName.toLowerCase().replace(/\s+/g, '-')}.sharexpress.app`;
        onDeploymentCreated({
          name: projectName,
          branch: branch,
          slug: generatedSlug,
          status: 'Ready',
          created: 'Just now'
        });
      }, 1000);
      return () => clearTimeout(completeTimeout);
    }
  }, [step, logIndex, projectName, branch]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [buildLogs]);

  const handleAddEnv = () => {
    setEnvVars([...envVars, { key: '', value: '' }]);
  };

  const handleRemoveEnv = (idx) => {
    const list = [...envVars];
    list.splice(idx, 1);
    setEnvVars(list);
  };

  const handleEnvChange = (idx, field, value) => {
    const list = [...envVars];
    list[idx][field] = value;
    setEnvVars(list);
  };

  const handleStartDeploy = (e) => {
    e.preventDefault();
    if (!projectName) return;
    setStep('building');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={step !== 'building' ? onClose : undefined}
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[550px] premium-card bg-[#080808] border border-white/[0.08] p-8 md:p-9 shadow-[0_32px_90px_rgba(0,0,0,0.9)] z-10 overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        
        {/* Close */}
        {step !== 'building' && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white/75 hover:bg-white/[0.05] transition-all"
          >
            <X size={14} />
          </button>
        )}

        {/* STEP 1: INPUT */}
        {step === 'input' && (
          <form onSubmit={handleStartDeploy} className="flex flex-col gap-6">
            <div>
              <h3 className="text-[20px] font-semibold text-white mb-2">Deploy New Infrastructure</h3>
              <p className="text-[12px] text-white/35 font-normal">Configure and spin up isolated project deployments at the global edge.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
                  Project Name <span className="text-white/12">*</span>
                </label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. cloud-dashboard"
                  required
                  className="premium-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
                    Repository URL
                  </label>
                  <input 
                    type="text" 
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="github.com/company/repo"
                    className="premium-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
                    Production Branch
                  </label>
                  <input 
                    type="text" 
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="main"
                    className="premium-input"
                  />
                </div>
              </div>

              {/* Env vars */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="block text-[10px] tracking-[0.06em] text-white/30 uppercase font-medium">
                    Environment Variables
                  </label>
                  <button 
                    type="button"
                    onClick={handleAddEnv}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus size={10} />
                    <span>Add variable</span>
                  </button>
                </div>
                <div className="max-h-[140px] overflow-y-auto pr-1 space-y-2 console-scrollbar">
                  {envVars.map((env, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text"
                        placeholder="KEY"
                        value={env.key}
                        onChange={(e) => handleEnvChange(idx, 'key', e.target.value)}
                        className="premium-input py-2.5 px-3 font-mono text-[11px]"
                      />
                      <input 
                        type="text"
                        placeholder="VALUE"
                        value={env.value}
                        onChange={(e) => handleEnvChange(idx, 'value', e.target.value)}
                        className="premium-input py-2.5 px-3 font-mono text-[11px]"
                      />
                      {envVars.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEnv(idx)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] text-white/18 hover:text-red-400 hover:border-red-500/20 transition-all flex-shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/[0.05] pt-5 mt-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/[0.07] hover:bg-white/[0.04] text-[12.5px] text-white/40 hover:text-white transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 text-[12.5px]"
              >
                <Play size={12} fill="currentColor" />
                <span>Build & Deploy</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: BUILDING */}
        {step === 'building' && (
          <div className="flex flex-col flex-grow min-h-0 gap-5 select-text">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[17px] font-semibold text-white">Deploying: <span className="font-mono text-cyan-400 text-[15px]">{projectName}</span></h3>
                <span className="text-[11px] text-white/35 font-mono font-medium">{buildProgress}%</span>
              </div>
              <div className="w-full h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.7)]"
                  style={{ width: `${buildProgress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="flex-1 min-h-[220px] bg-black/60 border border-white/[0.05] rounded-2xl p-5 font-mono text-[10.5px] leading-[1.65] text-white/45 overflow-y-auto console-scrollbar">
              <div className="space-y-1.5">
                {buildLogs.map((log, i) => (
                  <div key={i} className="log-entry flex items-start gap-2">
                    <span className="text-white/10 select-none font-medium">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="whitespace-pre-wrap font-mono tracking-tight text-white/65">{log}</span>
                  </div>
                ))}
                
                {logIndex < MOCK_BUILD_LOGS.length && (
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10.5px] pl-6 pt-1">
                    <Loader2 size={11} className="animate-spin" />
                    <span>Executing pipeline checks...</span>
                  </div>
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-white/18 uppercase tracking-[0.06em] border-t border-white/[0.05] pt-4 font-mono font-medium">
              <span>SANDBOX HOST: AWS-AP-SOUTHEAST-1</span>
              <span>DO NOT CLOSE MODAL</span>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={32} className="animate-bounce" />
            </div>

            <div>
              <h3 className="text-[22px] font-semibold text-white mb-2.5">Build Pipeline Active</h3>
              <p className="text-[13px] text-white/35 font-normal max-w-sm leading-[1.7]">
                Your project has been deployed across global edge points. SSL, CDN caching, and custom routes have been configured.
              </p>
            </div>

            <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center text-[12px] border-b border-white/[0.04] pb-3">
                <span className="text-white/22 font-medium">Active slug</span>
                <a 
                  href={`https://${projectName.toLowerCase().replace(/\s+/g, '-')}.sharexpress.app`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono truncate max-w-[280px] font-medium"
                >
                  {projectName.toLowerCase().replace(/\s+/g, '-')}.sharexpress.app
                </a>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-white/22 font-medium">Target Branch</span>
                <span className="text-white/55 font-mono font-medium">{branch}</span>
              </div>
            </div>

            <button 
              type="button" 
              onClick={onClose}
              className="w-full btn-primary py-3.5 px-6 rounded-2xl text-[13px] mt-4"
            >
              Back to list
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
