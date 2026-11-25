import { PageHeader } from '@/components/layout/PageHeader';
import { FlowingMenu } from '@/components/ui/FlowingMenu';
import { projects } from '@/data/projects';
import { useSeo } from '@/hooks/useSeo';

export default function Projects() {
  useSeo('Projects', 'Projects by Koka Sowmya, including ANCHOR for Smart India Hackathon 2026.');
  const items = projects.map((p) => ({ to: `/projects/${p.slug}`, text: p.name, meta: `${p.team} · ${p.problemId}`, image: p.image }));
  return (
    <main id="main">
      <PageHeader eyebrow="Projects" title={<>Selected <em>work</em></>} lead="Hover a project to explore it, then open it for the full story." />
      <div className="wrap"><FlowingMenu items={items} /></div>
    </main>
  );
}
