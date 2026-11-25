import { useEffect, useRef } from 'react';
import { Link } from '@/lib/router';
import { Icon } from '@/lib/icons';
import { Reveal } from '@/components/animations/Reveal';
import { CometCard } from '@/components/ui/CometCard';
import { useSeo } from '@/hooks/useSeo';
import { site } from '@/data/site';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';
import { blogs } from '@/data/blogs';

function More({ to, children }: { to: string; children: string }) {
  return <Link to={to} className="more">{children} <Icon name="arrowRight" size={16} /></Link>;
}
function Head({ n, title, to, cta }: { n: string; title: string; to?: string; cta?: string }) {
  return (
    <Reveal className="sec-head">
      <div><p className="label">{n}</p><h2 className="section-title">{title}</h2></div>
      {to && cta && <More to={to}>{cta}</More>}
    </Reveal>
  );
}

export default function Home() {
  useSeo('Home', 'Portfolio of Koka Sowmya, VIT-AP University: skills, projects, certifications and research.');
  const hero = useRef<HTMLElement>(null);

  // Scroll-linked hero progress (0..1) drives the name -> left, photo-in transition via the --p CSS variable.
  useEffect(() => {
    const el = hero.current; if (!el) return;
    let raf = 0;
    const update = () => {
      const range = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / Math.max(1, range * 0.8)));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const proj = projects[0], blog = blogs[0];
  return (
    <>
      <section ref={hero} className="hero" aria-label="Introduction">
        <div className="hero-stick">
          <div className="hero-name">
            <p className="label hero-kicker">Portfolio</p>
            <h1 className="hero-title"><span>Koka</span><span>Sowmya</span></h1>
            <p className="hero-intro">A student exploring cybersecurity, programming and research, one project at a time.</p>
          </div>
          <div className="hero-card">
            <CometCard src={site.profileImage} alt="Portrait of Koka Sowmya" initials="KS" />
            <div className="hero-college">
              <p className="label">Studying at</p>
              <p className="hero-college-name">{site.college}</p>
            </div>
          </div>
          <div className="scroll-ind" aria-hidden><span>Scroll</span><i /></div>
        </div>
      </section>

      <main id="main" className="wrap home">
        <section className="home-sec">
          <Head n="01" title="Introduction" to="/about" cta="Read more about me" />
          <Reveal delay={80}><p className="lead big">I’m a student at {site.college} with a growing interest in cybersecurity. I’ve completed introductory courses in cybersecurity and cryptography, built a hackathon project for dementia care, and co-authored a research paper that uses machine learning on clinical data.</p></Reveal>
        </section>

        <section className="home-sec">
          <Head n="02" title="Skills" to="/skills" cta="View all skills" />
          <ul className="chips">
            {skills.map((s, i) => <Reveal as="li" key={s.id} delay={i * 70} className="chip"><Icon name={s.icon} size={18} />{s.title}</Reveal>)}
          </ul>
        </section>

        <section className="home-sec">
          <Head n="03" title="Projects" to="/projects" cta="View projects" />
          <Reveal delay={80}>
            <Link to={`/projects/${proj.slug}`} className="feature">
              <p className="label">{proj.event} · {proj.problemId}</p>
              <h3 className="card-title">{proj.name} <span className="muted">— {proj.team}</span></h3>
              <p className="card-desc">{proj.summary}</p>
              <span className="more">View project <Icon name="arrowRight" size={16} /></span>
            </Link>
          </Reveal>
        </section>

        <section className="home-sec">
          <Head n="04" title="Certifications" to="/certificates" cta="View certificates" />
          <ul className="mini-grid">
            {certificates.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 90}>
                <Link to="/certificates" className="mini">
                  <img src={c.image} alt="" loading="lazy" decoding="async" width={420} height={297} />
                  <div><p className="card-title sm">{c.title}</p><p className="label">{c.issuer}</p></div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="home-sec">
          <Head n="05" title="Blogs" to="/blogs" cta="View all writing" />
          <Reveal delay={80}>
            <Link to={`/blogs/${blog.slug}`} className="feature">
              <p className="label">{blog.kind} · {blog.affiliation}</p>
              <h3 className="card-title">{blog.title}</h3>
              <p className="card-desc">{blog.summary}</p>
              <span className="more">Read more <Icon name="arrowRight" size={16} /></span>
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  );
}
