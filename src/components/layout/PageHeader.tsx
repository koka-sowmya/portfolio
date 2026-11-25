import type { ReactNode } from 'react';
export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="page-head wrap">
      <p className="label">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
