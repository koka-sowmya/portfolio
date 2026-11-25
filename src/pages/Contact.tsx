import { useRef, useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/animations/Reveal';
import { Icon } from '@/lib/icons';
import { site } from '@/data/site';
import { useSeo } from '@/hooks/useSeo';

export default function Contact() {
  useSeo('Contact', 'Get in touch with Koka Sowmya by email.');
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle');
  const t = useRef(0);
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setState('ok'); }
    catch {
      try { const i = document.createElement('input'); i.value = site.email; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); setState('ok'); }
      catch { setState('fail'); }
    }
    window.clearTimeout(t.current); t.current = window.setTimeout(() => setState('idle'), 2200);
  };
  return (
    <main id="main">
      <PageHeader eyebrow="Contact" title={<>Let’s <em>talk</em></>} lead="The best way to reach me is by email." />
      <div className="wrap">
        <Reveal className="contact-card">
          <p className="label">Email</p>
          <a className="contact-mail" href={`mailto:${site.email}`}>{site.email}</a>
          <div className="contact-actions">
            <a className="btn" href={`mailto:${site.email}`}><Icon name="mail" size={16} /> Send an email</a>
            <button className="btn ghost" onClick={copy}><Icon name={state === 'ok' ? 'check' : 'copy'} size={16} /> {state === 'ok' ? 'Copied' : 'Copy email'}</button>
            <span className="sr" role="status" aria-live="polite">{state === 'ok' ? 'Email copied to clipboard' : state === 'fail' ? 'Copy failed' : ''}</span>
            {state === 'fail' && <span className="label">Copy failed. Please select the address above.</span>}
          </div>
          {(site.socials.github || site.socials.linkedin) && (
            <div className="contact-social">
              {site.socials.github && <a className="btn ghost" href={site.socials.github} target="_blank" rel="noopener noreferrer"><Icon name="github" size={16} /> GitHub</a>}
              {site.socials.linkedin && <a className="btn ghost" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={16} /> LinkedIn</a>}
            </div>
          )}
        </Reveal>
      </div>
    </main>
  );
}
