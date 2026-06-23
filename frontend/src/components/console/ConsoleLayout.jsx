import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Server, Settings, LogOut, Terminal, Layers, Menu, X, ArrowUpRight } from 'lucide-react';

export default function ConsoleLayout({ 
  user, 
  activeTab, 
  setActiveTab, 
  onLogout, 
  children 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'deployments', label: 'Deployments', icon: Server },
    { id: 'settings', label: 'Settings & API', icon: Settings }
  ];

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col lg:flex-row relative">

      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden w-full flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-black/50 backdrop-blur-xl z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-[18px] h-[18px] bg-white rounded-[6px] flex items-center justify-center">
            <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
          </div>
          <span className="text-[13px] tracking-[0.06em] text-white/90 font-medium">
            Share<span className="font-bold">Xpress</span>
            <span className="text-[9px] text-white/25 uppercase tracking-[0.04em] ml-1.5 font-mono bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">Console</span>
          </span>
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-9 h-9 rounded-xl border border-white/[0.06] flex items-center justify-center bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-[69px] left-0 right-0 bottom-0 bg-[#020202]/[0.98] backdrop-blur-2xl z-20 flex flex-col p-6"
          >
            <div className="flex-1 flex flex-col gap-2 justify-center py-10">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 py-4 px-5 rounded-2xl text-[16px] font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-white bg-white/[0.05] border border-white/[0.08]' 
                        : 'text-white/40 border border-transparent'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-white/30'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/[0.05] pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center bg-white/[0.03] text-[12px] font-medium text-white/45">
                  DA
                </div>
                <div>
                  <h4 className="text-[13px] text-white font-semibold">{user?.name || 'Demo User'}</h4>
                  <p className="text-[10px] text-white/25 font-mono">{user?.email || 'demo@sharexpress.in'}</p>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-white/40 text-[14px] font-medium hover:bg-white/[0.04] transition-all"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[260px] h-screen border-r border-white/[0.05] bg-[#050505]/60 backdrop-blur-3xl flex-col justify-between p-6 z-10 sticky top-0">
        <div className="flex flex-col gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-[18px] h-[18px] bg-white rounded-[6px] flex items-center justify-center">
              <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
            </div>
            <span className="text-[13px] tracking-[0.06em] text-white/90 font-medium">
              Share<span className="font-bold">Xpress</span>
              <span className="text-[8px] text-white/25 tracking-[0.04em] ml-1.5 font-mono uppercase bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">Console</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-medium tracking-[-0.005em] transition-all duration-400 group relative ${
                    isActive 
                      ? 'text-white bg-white/[0.05] border border-white/[0.07]' 
                      : 'text-white/40 hover:text-white/75 hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  <Icon size={15} className={`transition-colors duration-400 ${isActive ? 'text-white' : 'text-white/25 group-hover:text-white/50'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeSideBarMarker" 
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User & Logout */}
        <div className="flex flex-col gap-4 border-t border-white/[0.05] pt-5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-xl border border-white/[0.08] flex items-center justify-center bg-white/[0.03] text-[11px] font-medium text-white/40">
              DA
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[12px] text-white/80 font-semibold truncate">{user?.name || 'Demo User'}</h4>
              <p className="text-[9px] text-white/20 font-mono truncate">{user?.email || 'demo@sharexpress.in'}</p>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white/25 hover:text-white/55 text-[11px] font-medium hover:bg-white/[0.02] transition-all duration-300"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 w-full flex flex-col min-h-0 z-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
