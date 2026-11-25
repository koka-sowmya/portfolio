import { useRef } from 'react';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';

export interface FlowItem { to: string; text: string; meta: string; image: string }

// Custom flowing menu: the marquee layer slides in from whichever edge the cursor entered,
// text slides with it, and an image preview follows the cursor.
export function FlowingMenu({ items }: { items: FlowItem[] }) {
  return (
    <ul className="fm" aria-label="Projects">
      {items.map((it) => <Row key={it.to} it={it} />)}
    </ul>
  );
}
function Row({ it }: { it: FlowItem }) {
  const row = useRef<HTMLLIElement>(null);
  const edge = (e: React.PointerEvent) => {
    const r = row.current!.getBoundingClientRect();
    row.current!.dataset.edge = e.clientY - r.top < r.height / 2 ? 'top' : 'bottom';
  };
  const track = Array.from({ length: 8 });
  return (
    <li ref={row} className="fm-row" data-edge="top"
      onPointerEnter={(e) => { edge(e); row.current!.classList.add('is-on'); }}
      onPointerLeave={(e) => { edge(e); row.current!.classList.remove('is-on'); }}
      onPointerMove={(e) => {
        const r = row.current!.getBoundingClientRect();
        row.current!.style.setProperty('--px', `${e.clientX - r.left}px`);
        row.current!.style.setProperty('--py', `${e.clientY - r.top}px`);
      }}>
      <Link to={it.to} className="fm-link" aria-label={`${it.text} — ${it.meta}`}
        onFocus={() => row.current!.classList.add('is-on')} onBlur={() => row.current!.classList.remove('is-on')}>
        <span className="fm-text">{it.text}</span>
        <span className="fm-meta">{it.meta} <Icon name="arrowUpRight" size={18} /></span>
        <span className="fm-marquee" aria-hidden>
          <span className="fm-marquee-in">
            <span className="fm-track">
              {track.map((_, i) => (
                <span className="fm-seg" key={i}>
                  <span>{it.text}</span><img src={it.image} alt="" loading="lazy" decoding="async" />
                </span>
              ))}
            </span>
          </span>
        </span>
      </Link>
      <img className="fm-preview" src={it.image} alt="" aria-hidden loading="lazy" decoding="async" />
    </li>
  );
}
