import { useEffect } from 'react';

/**
 * A single smooth, tapered white slash that follows pointer movement.
 * Desktop fine-pointer only; respects reduced-motion preferences.
 */
export default function CursorSlash() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const CFG = {
      color: 'rgb(255, 151, 47)',
      life: 1200,
      maxWidth: 12,
      follow: 0.38,
      glow: 100,
      coreAlpha: 0.6,
      haloAlpha: 0.45,
      speedFull: 38,
      peak: 0.72,
    };

    const canvas = document.createElement('canvas');
    canvas.className = 'glow-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (context === null) {
      canvas.remove();
      return;
    }

    const ctx: CanvasRenderingContext2D = context;

    let W = 0;
    let H = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const target = { x: 0, y: 0, has: false };
    const smooth = { x: 0, y: 0 };
    let pts: Array<{ x: number; y: number; t: number; s: number }> = [];
    let running = false;
    let speedAvg = 0;
    let raf = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!target.has) {
        smooth.x = target.x;
        smooth.y = target.y;
        target.has = true;
      }
      if (!running) {
        running = true;
        raf = window.requestAnimationFrame(frame);
      }
    };

    const onMouseLeave = () => {
      target.has = false;
      if (!running && pts.length) {
        running = true;
        raf = window.requestAnimationFrame(frame);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    const ribbon = (list: typeof pts, widthScale: number) => {
      const n = list.length;
      if (n < 3) return null;
      const L: number[][] = [];
      const R: number[][] = [];

      for (let i = 0; i < n; i++) {
        const a = list[Math.max(i - 1, 0)];
        const b = list[Math.min(i + 1, n - 1)];
        let nx = -(b.y - a.y);
        let ny = b.x - a.x;
        const len = Math.hypot(nx, ny) || 1;
        nx /= len;
        ny /= len;

        const u = i / (n - 1);
        const shape = u < CFG.peak
          ? Math.sin((u / CFG.peak) * Math.PI / 2)
          : Math.cos(((u - CFG.peak) / (1 - CFG.peak)) * Math.PI / 2);
        const age = Math.max(0, 1 - (performance.now() - list[i].t) / CFG.life);
        const w = CFG.maxWidth * widthScale * Math.pow(shape, 1.1) * age * list[i].s * 0.5;

        L.push([list[i].x + nx * w, list[i].y + ny * w]);
        R.push([list[i].x - nx * w, list[i].y - ny * w]);
      }
      return { L, R };
    };

    const trace = (edge: number[][], move: boolean) => {
      if (move) ctx.moveTo(edge[0][0], edge[0][1]);
      for (let i = 1; i < edge.length - 1; i++) {
        const mx = (edge[i][0] + edge[i + 1][0]) / 2;
        const my = (edge[i][1] + edge[i + 1][1]) / 2;
        ctx.quadraticCurveTo(edge[i][0], edge[i][1], mx, my);
      }
      ctx.lineTo(edge[edge.length - 1][0], edge[edge.length - 1][1]);
    };

    const fillRibbon = (
      r: ReturnType<typeof ribbon>,
      alpha: number,
      blur: number,
    ) => {
      if (!r) return;
      ctx.save();
      ctx.beginPath();
      trace(r.L, true);
      const reversed = r.R.slice().reverse();
      ctx.lineTo(reversed[0][0], reversed[0][1]);
      trace(reversed, false);
      ctx.closePath();
      ctx.shadowColor = `rgba(${CFG.color},1)`;
      ctx.shadowBlur = blur * dpr;
      ctx.fillStyle = `rgba(${CFG.color},${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    function frame(now: number) {
      ctx.clearRect(0, 0, W, H);

      if (target.has) {
        const px = smooth.x;
        const py = smooth.y;
        smooth.x += (target.x - smooth.x) * CFG.follow;
        smooth.y += (target.y - smooth.y) * CFG.follow;
        const sp = Math.hypot(smooth.x - px, smooth.y - py);
        speedAvg += (sp - speedAvg) * 0.25;
        if (sp > 0.4) {
          pts.push({
            x: smooth.x,
            y: smooth.y,
            t: now,
            s: Math.min(1, speedAvg / CFG.speedFull),
          });
        }
      }

      while (pts.length && now - pts[0].t > CFG.life) pts.shift();
      if (pts.length > 80) pts.splice(0, pts.length - 80);

      if (pts.length > 2) {
        fillRibbon(ribbon(pts, 1.6), CFG.haloAlpha, CFG.glow);
        fillRibbon(ribbon(pts, 0.7), CFG.coreAlpha, CFG.glow * 0.9);
      }

      if (
        pts.length > 0 ||
        (target.has && Math.hypot(target.x - smooth.x, target.y - smooth.y) > 0.5)
      ) {
        raf = window.requestAnimationFrame(frame);
      } else {
        running = false;
        speedAvg = 0;
        raf = 0;
      }
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      canvas.remove();
    };
  }, []);

  return null;
}
