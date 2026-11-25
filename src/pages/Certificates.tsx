import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/animations/Reveal';
import { Icon } from '@/lib/icons';
import { certificates, type Certificate } from '@/data/certificates';
import { useSeo } from '@/hooks/useSeo';

function Viewer({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null; btn.current?.focus();
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key); const o = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = o; prev?.focus(); };
  }, [onClose]);
  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-label={cert.title} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button ref={btn} className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        <img src={cert.image} alt={`${cert.title} certificate`} />
        <a className="btn" href={cert.pdf} target="_blank" rel="noopener noreferrer"><Icon name="download" size={16} /> Open PDF</a>
      </div>
    </div>,
    document.body
  );
}
export default function Certificates() {
  useSeo('Certificates', 'Certifications earned by Koka Sowmya from Girls Who Code in cybersecurity and cryptography.');
  const [open, setOpen] = useState<Certificate | null>(null);
  return (
    <main id="main">
      <PageHeader eyebrow="Certifications" title={<>Courses <em>completed</em></>} lead="Certificates of completion from Girls Who Code." />
      <div className="wrap cert-grid">
        {certificates.map((c, i) => (
          <Reveal key={c.id} delay={i * 100} className="cert">
            <button className="cert-img" onClick={() => setOpen(c)} aria-label={`View ${c.title} certificate`}>
              <img src={c.image} alt={`Preview of the ${c.title} certificate`} loading="lazy" decoding="async" width={720} height={509} />
              <span className="cert-hover">View certificate</span>
            </button>
            <h2 className="card-title">{c.title}</h2>
            <p className="card-desc">Issued by {c.issuer}. Signed by {c.signedBy}.</p>
            {c.date && <p className="label">{c.date}</p>}
            <button className="more as-btn" onClick={() => setOpen(c)}>View certificate <Icon name="arrowRight" size={16} /></button>
          </Reveal>
        ))}
      </div>
      {open && <Viewer cert={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
