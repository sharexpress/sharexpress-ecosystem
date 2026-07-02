import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('sx-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000); // Trigger banner after 2s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('sx-cookie-consent', 'accepted-all');
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('sx-cookie-consent', 'accepted-essential');
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-50 w-[92%] sm:w-[350px] bg-[#0d0d0d] border border-white/[0.04] rounded p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none text-left"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                <ShieldCheck size={11} className="text-white/60" />
              </div>
              <span className="font-mono text-[10px] tracking-wider uppercase text-white/80">Cookie Registry Management</span>
            </div>
            <button 
              onClick={handleClose}
              className="text-white/20 hover:text-white/60 transition-colors"
            >
              <X size={12} />
            </button>
          </div>

          {/* Description */}
          <p className="text-[11.5px] text-white/35 font-light leading-relaxed mb-3.5">
            We use strictly essential cryptographically signed cookies to balance edge gateway latency and authenticate sandbox session states. No marketing scripts are active.
          </p>

          {/* Collapsible Cookie Management specs */}
          <div className="mb-3.5">
            <button 
              onClick={() => setShowManage(!showManage)}
              className="flex items-center gap-1 text-[9px] font-mono tracking-wider uppercase text-white/40 hover:text-white/80 transition-colors"
            >
              <span>Manage Registries</span>
              {showManage ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>

            <AnimatePresence>
              {showManage && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-2 space-y-2.5 border-t border-white/[0.02] pt-2.5"
                >
                  {/* Cookie 1 */}
                  <div className="flex items-start justify-between font-mono text-[9px]">
                    <div className="text-left">
                      <p className="text-white/70">__sx_ingress (Edge Routing)</p>
                      <p className="text-white/20 mt-0.5">Pins the nearest gateway to reduce latency. Expiration: 24h.</p>
                    </div>
                    <span className="text-emerald-400 border border-emerald-500/10 bg-emerald-500/[0.02] px-1 rounded-sm uppercase text-[7.5px] tracking-wider select-none flex-shrink-0">
                      Required
                    </span>
                  </div>
                  {/* Cookie 2 */}
                  <div className="flex items-start justify-between font-mono text-[9px]">
                    <div className="text-left">
                      <p className="text-white/70">__il_session (Grader Sandbox)</p>
                      <p className="text-white/20 mt-0.5">Authorizes JWT verification runs. Expiration: Session.</p>
                    </div>
                    <span className="text-emerald-400 border border-emerald-500/10 bg-emerald-500/[0.02] px-1 rounded-sm uppercase text-[7.5px] tracking-wider select-none flex-shrink-0">
                      Required
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 font-mono text-[10px]">
            <button 
              onClick={handleAcceptAll}
              className="flex-1 py-2 bg-white hover:bg-white/90 text-black rounded uppercase tracking-wider transition-colors font-medium active:scale-[0.98]"
            >
              Accept All
            </button>
            <button 
              onClick={handleAcceptEssential}
              className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded uppercase tracking-wider transition-all duration-300 border border-white/5 hover:border-white/10 active:scale-[0.98]"
            >
              Essential Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
