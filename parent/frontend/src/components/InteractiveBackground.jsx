import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentMouse = { x: mouse.x, y: mouse.y };
    let isMouseOnScreen = false;
    const ease = 0.08;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMouseOnScreen = true;
    };

    const handleMouseLeave = () => {
      isMouseOnScreen = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    class Particle {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, randomStart = false) {
        this.x = randomStart ? Math.random() * w : (Math.random() > 0.5 ? 0 : w);
        this.y = randomStart ? Math.random() * h : (Math.random() > 0.5 ? 0 : h);

        // Very slow drift speed
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = (Math.random() - 0.5) * 0.18;

        this.radius = Math.random() * 1.2 + 0.6;

        // Grayscale colors only
        const rand = Math.random();
        if (rand < 0.3) {
          this.color = 'rgba(255, 255, 255, 0.12)';
        } else if (rand < 0.75) {
          this.color = 'rgba(255, 255, 255, 0.08)';
        } else {
          this.color = 'rgba(255, 255, 255, 0.04)';
        }
      }

      update(w, h, mouseX, mouseY) {
        this.x += this.vx;
        this.y += this.vy;

        if (isMouseOnScreen) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            this.x += dx * 0.001;
            this.y += dy * 0.001;
          }
        }

        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
          this.reset(w, h, false);
        }
      }

      draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const particleCount = w < 768 ? 30 : 75;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      currentMouse.x += (mouse.x - currentMouse.x) * ease;
      currentMouse.y += (mouse.y - currentMouse.y) * ease;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentMouse.x}px, ${currentMouse.y}px, 0) translate(-50%, -50%)`;
      }

      const connectionDist = w < 768 ? 70 : 90;
      const mouseConnectionDist = w < 768 ? 100 : 130;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(w, h, currentMouse.x, currentMouse.y);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.05;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (isMouseOnScreen) {
          const dx = p1.x - currentMouse.x;
          const dy = p1.y - currentMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDist) {
            const alpha = (1 - dist / mouseConnectionDist) * 0.1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(currentMouse.x, currentMouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const patternSvg = `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 0 L 40 80 M 0 40 L 80 40" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
      <path d="M 38 40 L 42 40 M 40 38 L 40 42" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
    </svg>
  `;
  const patternUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}")`;

  const dotSvg = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="0.4" fill="rgba(255,255,255,0.04)" />
    </svg>
  `;
  const dotUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(dotSvg)}")`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#080808]"
    >
      {/* 1. Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-[0.95]"
      />

      {/* 2. Overhead Ambient White Studio Light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[550px] pointer-events-none opacity-[0.95] blur-[120px] z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.001) 60%, transparent 100%)'
        }}
      />

      {/* 3. Base Technical Dot Grid */}
      <div className="absolute inset-0 z-10 opacity-[0.8] pointer-events-none" style={{
        backgroundImage: dotUrl,
        backgroundSize: '32px 32px',
      }} />

      {/* 4. Base CAD Grid Lines */}
      <div className="absolute inset-0 z-10 opacity-[0.6] pointer-events-none" style={{
        backgroundImage: patternUrl,
        backgroundSize: '80px 80px',
      }} />

      {/* 5. Interactive Spotlight Glow (Soft Grayscale) */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.25] blur-[80px] z-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 45%, transparent 75%)',
          transform: 'translate3d(0px, 0px, 0px)',
          willChange: 'transform',
        }}
      />

      {/* 6. Subtle Film Grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.012] z-30 pointer-events-none">
        <filter id="mncGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
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
        background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(8,8,8,0.2) 80%, rgba(8,8,8,0.9) 100%)'
      }} />
    </div>
  );
}
