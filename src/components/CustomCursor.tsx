import { useEffect, useRef } from 'react';

/**
 * Desktop-only custom cursor adapted to the reference portfolio's
 * data-cursor / data-magnetic interaction pattern.
 * Native cursors remain enabled for touch and reduced-motion users.
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !dot || !ring || !label) return;

    document.documentElement.classList.add('has-custom-cursor');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let target: Element | null = null;
    let raf = 0;

    const interactiveSelector = 'a, button, [role="button"], [data-cursor], [data-magnetic], .dock-item';

    const render = () => {
      raf = 0;
      const magnet = target?.matches('[data-magnetic]') || target?.matches('a, button, [role="button"], .dock-item');
      let destinationX = x;
      let destinationY = y;
      if (target && magnet) {
        const rect = target.getBoundingClientRect();
        if (rect.width && rect.height) {
          destinationX += (rect.left + rect.width / 2 - x) * 0.12;
          destinationY += (rect.top + rect.height / 2 - y) * 0.12;
        }
      }
      ringX += (destinationX - ringX) * 0.22;
      ringY += (destinationY - ringY) * 0.22;
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      label.style.transform = `translate3d(${ringX}px, ${ringY + 31}px, 0) translateX(-50%)`;
      if (Math.abs(destinationX - ringX) + Math.abs(destinationY - ringY) > 0.5) {
        raf = requestAnimationFrame(render);
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(render);
      root.classList.add('is-visible');
    };

    const onOver = (event: PointerEvent) => {
      const next = (event.target as Element | null)?.closest?.(interactiveSelector) ?? null;
      if (!next) return;
      target = next;
      const explicit = next.getAttribute('data-cursor');
      const text = explicit || (next.matches('button, [role="button"]') ? 'Click' : 'View');
      label.textContent = text;
      root.classList.add('is-active');
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onOut = (event: PointerEvent) => {
      const next = (event.relatedTarget as Element | null)?.closest?.(interactiveSelector) ?? null;
      if (next) {
        target = next;
        const explicit = next.getAttribute('data-cursor');
        label.textContent = explicit || (next.matches('button, [role="button"]') ? 'Click' : 'View');
        return;
      }
      target = null;
      root.classList.remove('is-active');
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onDown = () => root.classList.add('is-pressed');
    const onUp = () => root.classList.remove('is-pressed');
    const onLeave = () => root.classList.remove('is-visible');
    const onEnter = () => root.classList.add('is-visible');

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden="true">
      <span ref={dotRef} className="custom-cursor-dot" />
      <span ref={ringRef} className="custom-cursor-ring" />
      <span ref={labelRef} className="custom-cursor-label" />
    </div>
  );
}
