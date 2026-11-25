import { useEffect, useRef } from 'react';
// @ts-ignore — React Bits component is maintained as JavaScript JSX.
import Grainient from '@/components/Grainient';
import { usePath } from '@/lib/router';
import CursorSlash from '@/components/CursorSlash';
import { FloatingDock } from '@/components/navigation/FloatingDock';
import { Footer } from '@/components/layout/Footer';
import { Intro, useIntro } from '@/components/animations/Intro';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Skills from '@/pages/Skills';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/AnchorProject';
import Certificates from '@/pages/Certificates';
import Blogs from '@/pages/Blogs';
import ResearchPaper from '@/pages/ResearchPaper';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

function Route({ path }: { path: string }) {
  if (path === '/') return <Home />;
  if (path === '/about') return <About />;
  if (path === '/skills') return <Skills />;
  if (path === '/projects') return <Projects />;
  if (path === '/certificates') return <Certificates />;
  if (path === '/blogs') return <Blogs />;
  if (path === '/contact') return <Contact />;
  let m = path.match(/^\/projects\/([\w-]+)$/); if (m) return <ProjectDetail slug={m[1]} />;
  m = path.match(/^\/blogs\/([\w-]+)$/); if (m) return <ResearchPaper slug={m[1]} />;
  return <NotFound />;
}

function ScrollBar() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.current?.style.setProperty('--sp', String(max > 0 ? Math.min(1, window.scrollY / max) : 0)); }); };
    window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on); on();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return <div ref={el} className="scrollbar" aria-hidden="true" />;
}

export default function App() {
  const path = usePath();
  const [phase, setPhase] = useIntro();
  const appRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={grainRef} className={`grainient-background${phase !== 'done' ? ' intro-on' : ''}`} aria-hidden="true"
        style={phase === 'loading' ? { clipPath: 'polygon(0 0,0 0,0 0)' } : undefined}>
        <Grainient
          colors={['#F8C6A8', '#F3A58F', '#E98D91', '#D97883']}
          type="linear" angle={62} speed={0.13} flow={0.55} softness={1.15} silk={0.28}
          grainAmount={0.045} grainSize={1.4} grainAnimated={false}
          contrast={1.12} saturation={1.18} interactive={true} intro={false} lightMode={true} dpr={1.5}
        />
      </div>
      <Intro phase={phase} setPhase={setPhase} appRef={appRef} grainRef={grainRef} />
      <ScrollBar />
      <CursorSlash />
      <div ref={appRef} className={`app${phase !== 'done' ? ' intro-on' : ''}`} inert={phase !== 'done'}
        style={phase === 'loading' ? { clipPath: 'polygon(0 0,0 0,0 0)' } : undefined}>
        <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
        <div key={path} className="page"><Route path={path} /></div>
        <Footer />
        <FloatingDock path={path} />
      </div>
    </>
  );
}
