import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

// Scroll-triggered reveal. `delay` (ms) staggers siblings. Pure IntersectionObserver + CSS transitions.
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }:
  { children: ReactNode; delay?: number; as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'h2'; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  const Comp = Tag as 'div';
  return <Comp ref={ref as never} className={`reveal ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties}>{children}</Comp>;
}
