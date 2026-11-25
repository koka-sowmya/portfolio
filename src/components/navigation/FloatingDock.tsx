
import { useRef, useState, useEffect } from 'react';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { nav } from '@/data/site';

const BASE = 44;
const MAX = 66;
const RANGE = 140;

export function FloatingDock({ path }: { path: string }) {
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const [tip, setTip] = useState<number | null>(null);
  const raf = useRef(0);

  const magnify = (x: number | null) => {
    cancelAnimationFrame(raf.current);

    raf.current = requestAnimationFrame(() => {
      items.current.forEach((el) => {
        if (!el) return;

        let size = BASE;

        if (x !== null) {
          const rect = el.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const distance = Math.abs(x - center);

          const influence = Math.max(0, 1 - distance / RANGE);

          // Smooth falloff instead of abrupt linear magnification
          const eased = influence * influence * (3 - 2 * influence);

          size = BASE + (MAX - BASE) * eased;
        }

        el.style.setProperty('--size', `${size}px`);
      });
    });
  };

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const isActive = (to: string) =>
    to === '/'
      ? path === '/'
      : path === to || path.startsWith(to + '/');

  return (
    <nav
      className="dock"
      aria-label="Primary"
      onPointerMove={(e) =>
        e.pointerType === 'mouse' && magnify(e.clientX)
      }
      onPointerLeave={() => {
        magnify(null);
        setTip(null);
      }}
    >
      {nav.map((n, i) => (
        <Link
          key={n.to}
          to={n.to}
          ref={(el) => {
            items.current[i] = el;
          }}
          className={`dock-item${isActive(n.to) ? ' is-active' : ''}`}
          aria-label={n.label}
          aria-current={isActive(n.to) ? 'page' : undefined}
          onPointerEnter={() => setTip(i)}
          onFocus={() => setTip(i)}
          onBlur={() => setTip(null)}
        >
          <Icon name={n.icon} size={20} />
          <span
            className={`dock-tip${tip === i ? ' show' : ''}`}
            role="tooltip"
          >
            {n.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
