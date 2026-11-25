import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/animations/Reveal';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { blogs } from '@/data/blogs';
import { useSeo } from '@/hooks/useSeo';

export default function Blogs() {
  useSeo('Blogs', 'Research writing by Koka Sowmya.');
  return (
    <main id="main">
      <PageHeader eyebrow="Blogs & research" title={<>Writing &amp; <em>research</em></>} lead="Papers and articles." />
      <div className="wrap">
        {blogs.map((b) => (
          <Reveal as="article" key={b.slug} className="post">
            <p className="label">{b.kind} · {b.affiliation}</p>
            <h2 className="post-title"><Link to={`/blogs/${b.slug}`}>{b.title}</Link></h2>
            <p className="body">{b.summary}</p>
            <ul className="topics">{b.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            <Link to={`/blogs/${b.slug}`} className="more">Read more <Icon name="arrowRight" size={16} /></Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
