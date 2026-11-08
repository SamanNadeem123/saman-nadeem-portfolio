import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Github } from 'lucide-react'
import { featured, projects } from '../data/projects'
import { useDocTitle } from '../hooks/useEnv'
import ProjectVisual from '../components/ProjectVisuals'
import Reveal from '../components/Reveal'

const H = ({ children }: { children: string }) => <h2 className="mb-4 mt-14 text-2xl font-bold md:text-3xl">{children}</h2>

export default function CaseStudy() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug && x.hasCaseStudy)
  useDocTitle(p ? `${p.name} — Case Study | Saman Nadeem` : 'Project | Saman Nadeem', p?.summary)
  if (!p) return <Navigate to="/" replace />
  const i = featured.findIndex((x) => x.slug === p.slug)
  const prev = featured[(i + featured.length - 1) % featured.length], next = featured[(i + 1) % featured.length]
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-32">
      <Link to="/" className="mono inline-flex items-center gap-2 hover:text-white"><ArrowLeft size={14} /> Back to portfolio</Link>
      <Reveal><p className="mono mt-8">{p.tier === 'flagship' ? 'Flagship case study' : 'Case study'}{p.teamSize ? ` · ${p.teamSize}` : ''}</p>
        <h1 className="mt-2 text-5xl font-bold md:text-7xl">{p.name}</h1><p className="mt-2 font-display text-2xl text-electric">{p.tagline}</p></Reveal>
      <div className="mt-8"><ProjectVisual slug={p.slug} /></div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-primary"><Github size={16} /> View repository</a>}
        {p.demoNote ? <span className="chip">{p.demoNote}</span> : <span className="chip">No public demo link</span>}
      </div>
      <p className="mt-4 text-sm text-soft/60">Status: {p.status}</p>
      <H>Overview</H><p className="text-lg text-soft/80">{p.summary}</p>
      <H>Problem</H><p className="text-soft/80">{p.problem}</p>
      <H>Goals</H><ul className="space-y-2 text-soft/80">{p.goals.map((g) => <li key={g}>• {g}</li>)}</ul>
      <H>Solution</H><p className="text-soft/80">{p.solution}</p>
      <H>Features</H><ul className="grid gap-2 sm:grid-cols-2">{p.features.map((f) => <li key={f} className="rounded-xl border border-soft/10 bg-navy/50 px-4 py-3 text-sm">{f}</li>)}</ul>
      {p.workflow && <><H>Architecture & workflow</H><ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{p.workflow.map((w, k) => <li key={w.step} className="glass rounded-2xl p-4"><p className="mono">Step {k + 1}</p><p className="mt-1 font-display font-bold">{w.step}</p><p className="mt-1 text-sm text-soft/70">{w.detail}</p></li>)}</ol></>}
      <H>Technology stack</H>
      <div className="space-y-4">{p.stack.map((s) => <div key={s.group}><p className="mono mb-2 !text-soft/60">{s.group}</p><ul className="flex flex-wrap gap-2">{s.items.map((t) => <li key={t} className="chip">{t}</li>)}</ul></div>)}</div>
      <p className="mt-3 text-xs text-soft/50">Source: {p.verifiedFrom}.</p>
      <H>My contribution</H>
      <ul className="space-y-2 rounded-2xl border border-neon/30 bg-navy/50 p-5">{p.contribution.mine.map((c) => <li key={c}>• {c}</li>)}</ul>
      {p.contribution.team && <><H>Team collaboration</H><ul className="space-y-2 text-soft/80">{p.contribution.team.map((c) => <li key={c}>• {c}</li>)}</ul></>}
      {p.challenges && <><H>Engineering challenges</H><ul className="space-y-2 text-soft/80">{p.challenges.map((c) => <li key={c}>• {c}</li>)}</ul></>}
      {p.acknowledgements && <><H>Acknowledgements</H><dl className="glass rounded-2xl p-5">{p.acknowledgements.map((a) => <div key={a.role} className="flex justify-between gap-4 py-1"><dt className="text-soft/60">{a.role}</dt><dd>{a.names}</dd></div>)}</dl></>}
      <nav aria-label="Other projects" className="mt-16 grid gap-4 sm:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="glass flex items-center gap-3 rounded-2xl p-5 hover:border-electric"><ArrowLeft size={18} /><span><span className="mono block">Previous</span>{prev.name}</span></Link>
        <Link to={`/projects/${next.slug}`} className="glass flex items-center justify-end gap-3 rounded-2xl p-5 text-right hover:border-electric"><span><span className="mono block">Next</span>{next.name}</span><ArrowRight size={18} /></Link>
      </nav>
    </main>
  )
}
