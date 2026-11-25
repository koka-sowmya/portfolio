import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/animations/Reveal';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { projects } from '@/data/projects';
import { useSeo } from '@/hooks/useSeo';
import NotFound from './NotFound';

export default function ProjectDetail({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug);
  useSeo(p ? p.name : 'Not found', p?.summary);
  if (!p) return <NotFound />;
  return (
    <main id="main">
      <div className="wrap"><Link to="/projects" className="back"><Icon name="arrowLeft" size={16} /> All projects</Link></div>
      <PageHeader eyebrow={`${p.event} · ${p.problemId}`} title={p.name} lead={p.title} />
      <div className="wrap detail">
        <Reveal><dl className="meta">
          <div><dt className="label">Team</dt><dd>{p.team}</dd></div>
          <div><dt className="label">Event</dt><dd>{p.event}</dd></div>
          <div><dt className="label">Problem ID</dt><dd>{p.problemId}</dd></div>
        </dl></Reveal>
        <Reveal className="d-sec"><h2 className="section-title">Introduction</h2><p className="body">{p.introduction}</p></Reveal>
        <Reveal className="d-sec"><h2 className="section-title">Problem statement</h2><p className="body">{p.problem}</p></Reveal>
        <Reveal className="d-sec"><h2 className="section-title">Proposed solution</h2><p className="body">{p.solution}</p></Reveal>
        <section className="d-sec">
          <Reveal as="h2" className="section-title">Key features</Reveal>
          <ul className="feat-grid">
            {p.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 2) * 80} className={`feat${f.planned ? ' planned' : ''}`}>
                <h3 className="card-title sm">{f.title}{f.planned && <span className="tag">Planned</span>}</h3>
                <p className="card-desc">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>
        <section className="d-sec">
          <Reveal as="h2" className="section-title">How the platform works</Reveal>
          <ol className="steps">{p.how.map((s, i) => <Reveal as="li" key={i} delay={i * 50}><span className="step-n">{String(i + 1).padStart(2, '0')}</span><span className="body">{s}</span></Reveal>)}</ol>
          {p.diagram && (
            <Reveal><figure className="diagram">
              <img src={p.diagram} alt="Flow diagram: a caregiver creates the patient profile and invite code, the circle shares one patient profile, which drives cognitive games, daily support, familiar-world content, the Rakshak button and home-radius alerts, feeding the journey chart, circle notes and alerts that every caregiver sees on their own phone." loading="lazy" decoding="async" width={1112} height={928} />
              <figcaption className="caption">How the platform works — from the Anchor project overview.{p.pdf && <> <a href={p.pdf} target="_blank" rel="noopener noreferrer">Open the overview PDF <Icon name="arrowUpRight" size={14} /></a></>}</figcaption>
            </figure></Reveal>
          )}
        </section>
        {p.contribution && <Reveal className="d-sec"><h2 className="section-title">My contribution</h2><p className="body">{p.contribution}</p></Reveal>}
        <Reveal className="d-sec"><h2 className="section-title">Team &amp; SIH identification</h2>
          <p className="body">Anchor was built by {p.team} for {p.event}, under Problem ID {p.problemId}.</p></Reveal>
      </div>
    </main>
  );
}
