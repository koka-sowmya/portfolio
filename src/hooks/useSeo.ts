import { useEffect } from 'react';
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title === 'Home' ? 'Koka Sowmya — Portfolio' : `${title} — Koka Sowmya`;
    const set = (sel: string, attr: string, val: string) => document.head.querySelector(sel)?.setAttribute(attr, val);
    if (description) { set('meta[name="description"]', 'content', description); set('meta[property="og:description"]', 'content', description); }
    set('meta[property="og:title"]', 'content', document.title);
  }, [title, description]);
}
