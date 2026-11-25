import { useRef } from 'react';
import { Icon } from '@/lib/icons';
import type { Skill } from '@/data/skills';

// Custom chroma grid: a cursor-following spotlight lights each card; outside the spotlight the grid is desaturated.
export function ChromaGrid({ items, radius = 280 }: { items: Skill[]; radius?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const set = (x: number, y: number, on: boolean) => {
    const el = root.current; if (!el) return;
    el.style.setProperty('--x', `${x}px`); el.style.setProperty('--y', `${y}px`); el.style.setProperty('--fade', on ? '1' : '0');
  };
  const move = (e: React.PointerEvent) => {
    const el = root.current!, r = el.getBoundingClientRect();
    set(e.clientX - r.left, e.clientY - r.top, true);
    el.querySelectorAll<HTMLElement>('.cg-card').forEach((c) => {
      const b = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - b.left}px`); c.style.setProperty('--my', `${e.clientY - b.top}px`);
    });
  };
  return (
    <div ref={root} className="cg" style={{ '--r': `${radius}px` } as React.CSSProperties}
      onPointerMove={move} onPointerLeave={() => set(0, 0, false)}>
      {items.map((s) => (
        <article key={s.id} className="cg-card" style={{ '--accent': s.accent } as React.CSSProperties} tabIndex={0}>
          <div className="cg-icon"><Icon name={s.icon} size={28} /></div>
          <p className="cg-sub">{s.subtitle}</p>
          <h3 className="cg-title">{s.title}</h3>
          <p className="cg-desc">{s.description}</p>
        </article>
      ))}
      <div className="cg-fade" aria-hidden />
    </div>
  );
}
