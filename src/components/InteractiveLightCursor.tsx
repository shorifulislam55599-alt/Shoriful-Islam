import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  glow: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  color: string;
  lineWidth: number;
}

interface AmbientGlow {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

export const InteractiveLightCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse position tracking
    let mouseX = -100;
    let mouseY = -100;
    let targetX = -100;
    let targetY = -100;
    let isHoveringInteractive = false;
    let isPointerDown = false;
    let isMouseOnScreen = false;

    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];
    const ambientGlows: AmbientGlow[] = [];

    const colors = [
      '#38bdf8', // Sky 400
      '#0ea5e9', // Sky 500
      '#06b6d4', // Cyan 500
      '#22d3ee', // Cyan 400
      '#67e8f9', // Cyan 300
      '#93c5fd', // Blue 300
      '#ffffff', // Pure white spark
    ];

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Spawn Burst of Light on Click / Touch
    const triggerLightBurst = (x: number, y: number) => {
      // 1. Central radiant light flash / flare
      ambientGlows.push({
        x,
        y,
        radius: 120,
        alpha: 0.85,
        decay: 0.035,
        color: 'rgba(56, 189, 248, 0.45)',
      });

      // 2. Primary expanding shockwave ring
      shockwaves.push({
        x,
        y,
        radius: 4,
        maxRadius: 110,
        alpha: 0.95,
        decay: 0.03,
        color: '#38bdf8',
        lineWidth: 3.5,
      });

      // 3. Secondary cyan ring with wider radius
      shockwaves.push({
        x,
        y,
        radius: 2,
        maxRadius: 85,
        alpha: 0.8,
        decay: 0.04,
        color: '#22d3ee',
        lineWidth: 2,
      });

      // 4. Radial sparkling light particles shooting outward
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const speed = 2.5 + Math.random() * 5.5;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3.5,
          color,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.025,
          glow: 12 + Math.random() * 10,
        });
      }
    };

    // Spawn subtle gliding trail particle on movement
    let lastTrailTime = 0;
    const spawnMovementSpark = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastTrailTime < 35) return; // limit trail rate for ultra-smooth 60fps
      lastTrailTime = now;

      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.4,
        size: 1.5 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
        alpha: 0.7,
        decay: 0.035,
        glow: 8,
      });
    };

    // Pointer Event Listeners
    const onPointerMove = (e: PointerEvent) => {
      isMouseOnScreen = true;
      targetX = e.clientX;
      targetY = e.clientY;

      if (mouseX === -100) {
        mouseX = targetX;
        mouseY = targetY;
      }

      spawnMovementSpark(targetX, targetY);

      // Check if hovering over interactive buttons / cards / links
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer'
        );
        isHoveringInteractive = Boolean(interactive);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      triggerLightBurst(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      isPointerDown = false;
    };

    const onPointerLeave = () => {
      isMouseOnScreen = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    // Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      mouseX += (targetX - mouseX) * 0.22;
      mouseY += (targetY - mouseY) * 0.22;

      // 1. Draw Ambient Glows (from clicks)
      for (let i = ambientGlows.length - 1; i >= 0; i--) {
        const glow = ambientGlows[i];
        glow.alpha -= glow.decay;

        if (glow.alpha <= 0) {
          ambientGlows.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          glow.x,
          glow.y,
          0,
          glow.x,
          glow.y,
          glow.radius
        );
        gradient.addColorStop(0, `rgba(56, 189, 248, ${glow.alpha * 0.4})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${glow.alpha * 0.15})`);
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.14;
        sw.alpha -= sw.decay;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius - 2) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.lineWidth * sw.alpha;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw Particles (light sparks)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94; // friction
        p.vy *= 0.94;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Cursor Beacon Follower (When mouse is active on screen)
      if (isMouseOnScreen && mouseX > 0 && mouseY > 0) {
        ctx.save();
        const baseRadius = isHoveringInteractive ? 22 : isPointerDown ? 10 : 16;
        const coreRadius = isHoveringInteractive ? 5 : isPointerDown ? 3 : 4;

        // Outer soft cyan/sky glow ring
        ctx.strokeStyle = isHoveringInteractive
          ? 'rgba(56, 189, 248, 0.7)'
          : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = isHoveringInteractive ? 16 : 8;

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, baseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner radiant beacon dot
        ctx.fillStyle = isHoveringInteractive ? '#38bdf8' : '#e0f2fe';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair spark flare when hovering over buttons
        if (isHoveringInteractive) {
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.5)';
          ctx.lineWidth = 1;
          const flareLen = 9;

          ctx.beginPath();
          // Horizontal tick
          ctx.moveTo(mouseX - baseRadius - flareLen, mouseY);
          ctx.lineTo(mouseX - baseRadius + 3, mouseY);
          ctx.moveTo(mouseX + baseRadius - 3, mouseY);
          ctx.lineTo(mouseX + baseRadius + flareLen, mouseY);
          // Vertical tick
          ctx.moveTo(mouseX, mouseY - baseRadius - flareLen);
          ctx.lineTo(mouseX, mouseY - baseRadius + 3);
          ctx.moveTo(mouseX, mouseY + baseRadius - 3);
          ctx.lineTo(mouseX, mouseY + baseRadius + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
};
