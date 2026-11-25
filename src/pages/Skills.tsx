import { PageHeader } from '@/components/layout/PageHeader';
import { ChromaGrid } from '@/components/ui/ChromaGrid';
import { Reveal } from '@/components/animations/Reveal';
import { skills } from '@/data/skills';
import { useSeo } from '@/hooks/useSeo';

export default function Skills() {
  useSeo('Skills', 'Skills of Koka Sowmya: cybersecurity fundamentals, C, HTML, CSS, Python and JavaScript fundamentals.');
  return (
    <main id="main">
      <PageHeader eyebrow="Skills" title={<>What I’m <em>working with</em></>} lead="The tools and foundations I’m using and building on. Move your cursor across the grid." />
      <div className="wrap"><Reveal><ChromaGrid items={skills} /></Reveal></div>
    </main>
  );
}
