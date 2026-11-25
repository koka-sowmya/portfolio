import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';

// Intro: loader -> rotating star that expands -> the site is revealed *through* the star.
// The app root is clipped to a star polygon (updated per frame), so the star's growth literally reveals the site.
const PTS = 5, INNER = 0.42;
function starPolygon(cx: number, cy: number, r: number, rot: number) {
  const pts: string[] = [];
  for (let i = 0; i < PTS * 2; i++) {
    const rad = i % 2 === 0 ? r : r * INNER;
    const a = rot + (i * Math.PI) / PTS - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)}px ${(cy + rad * Math.sin(a)).toFixed(1)}px`);
  }
  return `polygon(${pts.join(',')})`;
}
let played = false; // module-level: plays once per page load, not on internal navigation

export function useIntro() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>(() => (played || prefersReducedMotion() ? 'done' : 'loading'));
  return [phase, setPhase] as const;
}

export function Intro({ phase, setPhase, appRef, grainRef }: { phase: 'loading' | 'reveal' | 'done'; setPhase: (p: 'loading' | 'reveal' | 'done') => void; appRef: React.RefObject<HTMLDivElement | null>; grainRef?: React.RefObject<HTMLDivElement | null> }) {
  const raf = useRef(0);
  const [bgGone, setBgGone] = useState(false);

  // Lock scrolling and interaction while the intro runs.
  useEffect(() => {
    if (phase === 'done') return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  // Phase 1 -> 2: start once the page has loaded (+ a short minimum so the loader reads as intentional).
  useEffect(() => {
    if (phase !== 'loading') return;
    const start = performance.now();
    let t = 0;
    const go = () => { t = window.setTimeout(() => setPhase('reveal'), Math.max(0, 900 - (performance.now() - start))); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
    return () => { window.clearTimeout(t); window.removeEventListener('load', go); };
  }, [phase, setPhase]);

  // Phase 2: rotate + expand the star, clip the app to it.
  useEffect(() => {
    const app = appRef.current; if (!app) return;
    const els = [app, grainRef?.current].filter(Boolean) as HTMLElement[];
    const clip = (v: string) => els.forEach((el) => { el.style.clipPath = v; });
    if (phase === 'loading') { clip('polygon(0 0,0 0,0 0)'); return; }
    if (phase !== 'reveal') { clip(''); return; }
    const w = window.innerWidth, h = window.innerHeight, cx = w / 2, cy = h / 2;
    const maxR = Math.hypot(w, h) / (2 * INNER) * 1.15; // inner radius must clear the farthest corner
    const dur = 1700, t0 = performance.now();
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur), e = ease(p);
      clip(starPolygon(cx, cy, 34 + e * maxR, e * Math.PI * 0.9));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { played = true; clip(''); setBgGone(true); setPhase('done'); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase, appRef, grainRef, setPhase]);

  if (phase === 'done' || bgGone) return null;
  const handoff = phase === 'reveal';
  return (
    <div className="intro" aria-hidden="true">
      {(
        <div className={`loader${handoff ? ' handoff' : ''}`} role="status" aria-label="Loading">
          <svg viewBox="0 0 100 100" className="loader-star"><path d="M50 8l10.3 28.4L90 38 66 56.8 74.6 86 50 69.4 25.4 86 34 56.8 10 38l29.7-1.6z" /></svg>
          <span className="loader-name">Koka Sowmya</span>
          <span className="loader-bar"><i /></span>
        </div>
      )}
    </div>
  );
}
