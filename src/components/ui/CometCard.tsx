import { useRef, useState } from 'react';

// Custom interactive profile card: 3D tilt, cursor-following glow, and a diagonal "comet" sheen.
export function CometCard({ src, alt, initials }: { src: string | null; alt: string; initials: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(!src);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${((0.5 - y) * 12).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((x - 0.5) * 14).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
  };
  const leave = () => { const el = ref.current; if (!el) return; ['--rx', '--ry'].forEach((k) => el.style.setProperty(k, '0deg')); el.style.setProperty('--gx', '50%'); el.style.setProperty('--gy', '30%'); };
  return (
    <div className="comet-wrap">
      <div ref={ref} className="comet" onPointerMove={move} onPointerLeave={leave}>
        {missing ? (
          <div className="comet-empty" role="img" aria-label={alt}><span>{initials}</span><small>Photo goes in public/images/profile.jpg</small></div>
        ) : (
          <img src={src ?? ''} alt={alt} width={480} height={600} decoding="async" onError={() => setMissing(true)} />
        )}
        <span className="comet-glow" aria-hidden /><span className="comet-sheen" aria-hidden />
      </div>
    </div>
  );
}
