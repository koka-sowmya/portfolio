
import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type Ref,
} from 'react';

const BASE_PATH = '/portfolio';

function getAppPath() {
  const pathname = window.location.pathname;

  const path = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname;

  return path.replace(/\/+$/, '') || '/';
}

// Minimal History-API router (no external dependency).
const EVT = 'app:navigate';

export function navigate(to: string) {
  if (to === window.location.pathname) {
    window.scrollTo({ top: 0 });
    return;
  }

  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event(EVT));
  window.scrollTo({ top: 0 });
}

export function usePath() {
  const [path, setPath] = useState(getAppPath);

  useEffect(() => {
    const on = () => setPath(getAppPath());

    window.addEventListener('popstate', on);
    window.addEventListener(EVT, on);

    return () => {
      window.removeEventListener('popstate', on);
      window.removeEventListener(EVT, on);
    };
  }, []);

  return path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  ref?: Ref<HTMLAnchorElement>;
};

export function Link({ to, onClick, children, ref, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} ref={ref} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
