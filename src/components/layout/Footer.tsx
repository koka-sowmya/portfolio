import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { nav, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">{site.name}</p>
          <a className="footer-mail" href={`mailto:${site.email}`}>{site.email}</a>
          <div className="footer-social">
            {site.socials.github && <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>}
            {site.socials.linkedin && <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>}
          </div>
        </div>
        <nav aria-label="Footer"><ul className="footer-links">{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul></nav>
      </div>
      <div className="wrap footer-base">
        <p>© 2026 Koka Sowmya. All rights reserved.</p>
        <p className="footer-credit">Built with React, TypeScript and Lucide icons (ISC licence, via react-icons). All interface components are custom-written. Third-party libraries remain the property of their respective authors.</p>
      </div>
    </footer>
  );
}
