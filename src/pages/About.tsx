import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/animations/Reveal';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { useSeo } from '@/hooks/useSeo';

export default function About() {
  useSeo('About', 'About Koka Sowmya: interests in technology and cybersecurity, learning journey, projects and research.');
  const blocks = [
    ['Interest in technology', 'I’m a student at VIT-AP University, and I enjoy learning how software is built and how it can be made useful for people. I’ve been building that foundation through C, Python, HTML, CSS and JavaScript.'],
    ['Learning journey', 'I learn by taking courses and then applying them to real problems. I’ve completed Girls Who Code’s Intro to Cybersecurity and Intro to Cryptography courses, and I’ve used Python for data analysis and machine learning in a research paper.'],
    ['Cybersecurity', 'Cybersecurity is the area I’m most drawn to. I’m building my fundamentals, starting with how security and cryptography work, and I want to keep going deeper.'],
    ['Projects & research', 'With Team Neur0 Nex I worked on Anchor for Smart India Hackathon 2026, a cognitive gaming and memory assistance platform for elderly dementia patients. I also co-authored a research paper with Oussama Batouche through the Lumiere Research Scholar Program, on predicting prostate cancer recurrence from pre-treatment clinical features.'],
  ];
  return (
    <main id="main">
      <PageHeader eyebrow="About" title={<>A bit about <em>me</em></>} lead="Technology, security and the habit of learning by building." />
      <div className="wrap prose-grid">
        {blocks.map(([h, p], i) => (
          <Reveal key={h} delay={i * 60} className="prose-block"><h2 className="subheading">{h}</h2><p className="body">{p}</p></Reveal>
        ))}
        <Reveal className="prose-links">
          <Link to="/projects/anchor" className="more">See Anchor <Icon name="arrowRight" size={16} /></Link>
          <Link to="/blogs/research-paper" className="more">Read the research paper <Icon name="arrowRight" size={16} /></Link>
        </Reveal>
      </div>
    </main>
  );
}
