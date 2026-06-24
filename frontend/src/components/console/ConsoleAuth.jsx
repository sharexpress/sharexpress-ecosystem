import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, KeyRound, Mail, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function ConsoleAuth({ onLoginSuccess, onBackToLanding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
    if (email === 'demo@sharexpress.in' && password === 'sharexpress') {
      onLoginSuccess({ name: 'Demo Architect', email: 'demo@sharexpress.in' });
    } else {
      setError('Invalid credentials. Use demo@sharexpress.in / sharexpress to sign in.');
      setIsLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setIsLoading(true);
    setError('');
    setEmail('demo@sharexpress.in');
    setPassword('sharexpress');
    
    await new Promise((resolve) => setTimeout(resolve, 1200));
    onLoginSuccess({ name: 'Demo Architect', email: 'demo@sharexpress.in' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-transparent px-6 py-12 select-none">

      {/* Card */}
      <motion.div 
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] premium-card p-8 md:p-10 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.07] shadow-[0_32px_80px_rgba(0,0,0,0.8)] z-10 relative overflow-hidden"
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-9">
          <button 
            onClick={onBackToLanding}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-[11px] text-white/30 hover:text-white/55 uppercase tracking-[0.06em] mb-9 transition-all duration-300 font-medium"
          >
            ← Back to marketing
          </button>
          
          <div className="w-12 h-12 rounded-2xl border border-white/[0.08] flex items-center justify-center bg-white/[0.03] mb-5">
            <Shield size={18} className="text-white/45" />
          </div>
          <h2 className="heading-display text-[26px] text-white mb-2 font-semibold">
            Console Login
          </h2>
          <p className="text-[13px] text-white/35 font-normal">
            Access the sharexpress edge & compute dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.06em] text-white/30 uppercase font-medium mb-2.5">
              Email address
            </label>
            <div className="relative">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@sharexpress.in"
                disabled={isLoading}
                className="premium-input pl-11"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/18" size={15} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="block text-[10px] tracking-[0.06em] text-white/30 uppercase font-medium">
                Password
              </label>
              <button 
                type="button" 
                className="text-[10px] text-white/20 hover:text-white/40 tracking-[0.04em] transition-colors font-medium"
                onClick={() => setError('Password resets are simulated. Try "Demo Login".')}
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isLoading}
                className="premium-input pl-11 pr-11"
              />
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/18" size={15} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/18 hover:text-white/45 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-5 py-3.5 rounded-2xl bg-red-500/5 border border-red-500/10 text-center"
            >
              <span className="text-[12px] text-red-400/80 font-normal">{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-white/95 text-black rounded-2xl font-semibold text-[13px] tracking-[-0.005em] transition-all duration-300 disabled:opacity-50 active:scale-[0.99] shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-white/[0.05]"></div>
          <span className="flex-shrink mx-4 text-[10px] text-white/18 tracking-[0.08em] uppercase font-medium">OR</span>
          <div className="flex-grow border-t border-white/[0.05]"></div>
        </div>

        {/* Demo */}
        <button
          type="button"
          onClick={handleDemoAccess}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/12 text-white rounded-2xl font-medium text-[13px] tracking-[-0.005em] transition-all duration-300 disabled:opacity-50"
        >
          {isLoading && email === 'demo@sharexpress.in' ? (
            <>
              <Loader2 size={14} className="animate-spin text-white/30" />
              <span className="text-white/40">Loading Sandbox...</span>
            </>
          ) : (
            <span className="text-white/55">Demo Login (One-Click)</span>
          )}
        </button>

        <p className="text-center text-[11px] text-white/22 mt-7 font-normal">
          Credentials: <code className="text-white/35 font-mono text-[10px] bg-white/[0.04] px-1.5 py-0.5 rounded-md">demo@sharexpress.in</code> / <code className="text-white/35 font-mono text-[10px] bg-white/[0.04] px-1.5 py-0.5 rounded-md">sharexpress</code>
        </p>
      </motion.div>
    </div>
  );
}
