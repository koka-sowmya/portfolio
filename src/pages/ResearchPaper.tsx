import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/animations/Reveal';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { blogs } from '@/data/blogs';
import { useSeo } from '@/hooks/useSeo';
import NotFound from './NotFound';

export default function ResearchPaper({ slug }: { slug: string }) {
  const b = blogs.find((x) => x.slug === slug);
  useSeo(b ? 'Research paper' : 'Not found', b?.summary);
  if (!b) return <NotFound />;
  return (
    <main id="main">
      <div className="wrap"><Link to="/blogs" className="back"><Icon name="arrowLeft" size={16} /> All writing</Link></div>
      <PageHeader eyebrow={b.kind} title={<span className="article-title">{b.title}</span>} lead={`${b.authors.join(', ')} · ${b.affiliation}`} />
      <div className="wrap detail narrow">
        <Reveal className="d-sec"><h2 className="section-title">Abstract</h2><p className="body">{b.abstract}</p></Reveal>
        <Reveal className="d-sec"><h2 className="section-title">Topics</h2><ul className="topics">{b.topics.map((t) => <li key={t}>{t}</li>)}</ul></Reveal>
        <Reveal className="d-sec">
          <h2 className="section-title">Model comparison</h2>
          <p className="body">Table 2 of the paper compares five machine learning models on the test set.</p>
          <div className="table-wrap"><table>
            <caption className="sr">Machine learning model performance for predicting biochemical recurrence</caption>
            <thead><tr><th scope="col">Model</th><th scope="col">AUC</th><th scope="col">Accuracy</th><th scope="col">F1</th></tr></thead>
            <tbody>{b.models.map((m) => <tr key={m.name}><th scope="row">{m.name}</th><td>{m.auc}</td><td>{m.accuracy}</td><td>{m.f1}</td></tr>)}</tbody>
          </table></div>
        </Reveal>
        <Reveal><a className="btn" href={b.pdf} target="_blank" rel="noopener noreferrer"><Icon name="download" size={16} /> Read the full paper (PDF)</a></Reveal>
      </div>
    </main>
  );
}
