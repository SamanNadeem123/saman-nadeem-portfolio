import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../data/projects'
import Reveal from './Reveal'
import ProjectVisual from './ProjectVisuals'

function Tags({ p, n = 6 }: { p: Project; n?: number }) {
  return <ul className="flex flex-wrap gap-2">{p.stack.flatMap((s) => s.items).slice(0, n).map((t) => <li key={t} className="chip">{t}</li>)}</ul>
}
function Actions({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link to={`/projects/${p.slug}`} className="btn-primary">Case Study <ArrowUpRight size={16} /></Link>
      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Github size={16} /> GitHub</a>}
      {p.demoNote && <span className="mono !text-soft/60">Live demo: coming soon</span>}
    </div>
  )
}
export function FlagshipCard({ p }: { p: Project }) {
  return (
    <Reveal>
      <article className="glass glow relative overflow-hidden rounded-[2rem] p-6 md:p-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon/30 blur-3xl" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="mono">Flagship project · 01</p>
            <h3 className="text-4xl font-bold md:text-6xl">{p.name}</h3>
            <p className="font-display text-xl text-electric">{p.tagline}</p>
            <p className="text-soft/80">{p.summary}</p>
            <div className="rounded-2xl border border-neon/30 bg-void/50 p-4 text-sm"><p className="mono mb-1">My contribution</p><p className="text-soft/80">{p.contribution.mine.join(' · ')}. {p.teamSize}.</p></div>
            <Tags p={p} /><p className="text-sm text-soft/60">{p.status}</p><Actions p={p} />
          </div>
          <div className="space-y-4"><ProjectVisual slug={p.slug} />
            <ul className="grid grid-cols-2 gap-2 text-sm text-soft/80">{p.features.slice(0, 6).map((f) => <li key={f} className="rounded-xl border border-soft/10 bg-navy/50 px-3 py-2">{f}</li>)}</ul></div>
        </div>
      </article>
    </Reveal>
  )
}
export function FeaturedRow({ p, index, flip }: { p: Project; index: number; flip?: boolean }) {
  return (
    <Reveal>
      <article className={`glass grid items-center gap-8 rounded-3xl p-6 md:p-8 lg:grid-cols-2 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <ProjectVisual slug={p.slug} />
        <div className="space-y-4">
          <p className="mono">Featured · 0{index}</p>
          <h3 className="text-3xl font-bold">{p.name}</h3><p className="font-display text-electric">{p.tagline}</p>
          <p className="text-soft/80">{p.summary}</p><Tags p={p} n={5} />
          <p className="text-sm text-soft/70"><span className="text-soft">Contribution:</span> {p.contribution.mine[0]}</p>
          <p className="text-sm text-soft/60">{p.status}</p><Actions p={p} />
        </div>
      </article>
    </Reveal>
  )
}
export function ArchiveItem({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="group h-full rounded-3xl border border-soft/10 bg-navy/40 p-6 transition hover:-translate-y-1 hover:border-neon/60">
        <p className="mono">{p.tagline}</p>
        <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
        <p className="mt-3 text-sm text-soft/75">{p.summary}</p>
        <ul className="mt-4 space-y-1 text-sm text-soft/70">{p.features.map((f) => <li key={f}>• {f}</li>)}</ul>
        <p className="mono mt-4 !text-soft/60">Contribution</p><p className="text-sm text-soft/75">{p.contribution.mine.join(' ')}</p>
        <ul className="mt-4 flex flex-wrap gap-2">{p.stack.flatMap((s) => s.items).map((t) => <li key={t} className="chip">{t}</li>)}</ul>
        <p className="mt-4 text-xs text-soft/55">{p.status}</p>
      </article>
    </Reveal>
  )
}
