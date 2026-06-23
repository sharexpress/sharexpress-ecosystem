import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse coordinates with a smooth spring ease lag
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentMouse = { x: mouse.x, y: mouse.y };
    const ease = 0.08;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const updatePosition = () => {
      currentMouse.x += (mouse.x - currentMouse.x) * ease;
      currentMouse.y += (mouse.y - currentMouse.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentMouse.x}px, ${currentMouse.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const patternSvg = `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 0 L 40 80 M 0 40 L 80 40" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
      <path d="M 37 40 L 43 40 M 40 37 L 40 43" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      <path d="M 0 3 L 0 0 L 3 0 M 77 0 L 80 0 L 80 3 M 80 77 L 80 80 L 77 80 M 3 80 L 0 80 L 0 77" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
    </svg>
  `;
  const patternUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}")`;

  const dotSvg = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="0.6" fill="rgba(255,255,255,0.3)" />
    </svg>
  `;
  const dotUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(dotSvg)}")`;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#040404]"
    >
      {/* 1. Overhead Ambient Studio Light */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1500px] h-[600px] pointer-events-none opacity-[0.95] blur-[110px] z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.065) 0%, rgba(99, 102, 241, 0.015) 50%, transparent 80%)'
        }}
      />

      {/* 2. Soft Corporate Accent Glows (Static) */}
      <div className="absolute inset-0 z-0 opacity-[0.7] pointer-events-none">
        {/* Navy/Indigo Glow */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{
            left: '-10%',
            top: '20%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.018) 0%, transparent 70%)'
          }}
        />
        {/* Steel Glow */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{
            right: '-5%',
            top: '35%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.012) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* 3. Base Technical Dot Grid */}
      <div className="absolute inset-0 z-10 opacity-[0.35] pointer-events-none" style={{
        backgroundImage: dotUrl,
        backgroundSize: '32px 32px',
      }} />

      {/* 4. Base CAD Grid Lines (Extremely faint) */}
      <div className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: patternUrl,
        backgroundSize: '80px 80px',
      }} />

      {/* 5. Interactive Spotlight Glow (Acts as the light source behind the grids) */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none opacity-[0.24] blur-[80px] z-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 75%)',
          transform: 'translate3d(0px, 0px, 0px)',
          willChange: 'transform',
        }}
      />

      {/* 6. Subtle Film Grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.016] z-30 pointer-events-none">
        <filter id="mncGrain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.85" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.8 0" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#mncGrain)" />
      </svg>

      {/* 7. Vignette for focus depth */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(4,4,4,0.3) 70%, rgba(4,4,4,0.92) 100%)'
      }} />
    </div>
  );
}
