import React, { useState, useEffect } from 'react';

export default function TelemetryOverlay() {
  const [latency, setLatency] = useState(18);
  const [time, setTime] = useState('');

  // Simulate minor live latency jitter (e.g. between 16ms and 21ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 15 && next <= 24 ? next : prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Update clock every minute
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utcTime = now.toISOString().slice(11, 16) + ' UTC';
      setTime(utcTime);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#0d0d0d]/80 backdrop-blur-md border border-white/[0.04] rounded shadow-2xl select-none font-mono text-[9px] text-white/35 transition-all duration-300 hover:border-white/10 hover:text-white/50"
    >
      {/* State LED */}
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
        </span>
        <span className="tracking-wide">SYS: OK</span>
      </div>

      <span className="w-[1px] h-3 bg-white/[0.05]" />

      {/* Edge proxy */}
      <span>EDGE: ap-south-1</span>

      <span className="w-[1px] h-3 bg-white/[0.05]" />

      {/* Dynamic latency */}
      <span>LAT: {latency}ms</span>

      <span className="w-[1px] h-3 bg-white/[0.05]" />

      {/* UTC clock */}
      <span>{time}</span>

      <span className="w-[1px] h-3 bg-white/[0.05]" />

      {/* Software version */}
      <span>BUILD: v4.14</span>
    </div>
  );
}
