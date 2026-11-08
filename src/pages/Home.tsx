import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site, experience, education, approach } from '../data/site'
import { projects } from '../data/projects'
import { canRender3D, useIsMobile, useReducedMotion, useDocTitle } from '../hooks/useEnv'
import Reveal from '../components/Reveal'
import SkillsUniverse from '../components/SkillsUniverse'
import ContactForm from '../components/ContactForm'
import { ArchiveItem, FeaturedRow, FlagshipCard } from '../components/ProjectCards'

gsap.registerPlugin(ScrollTrigger)
const HeroScene = lazy(() => import('../scene/HeroScene'))
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function Hero() {
  const mobile = useIsMobile(), reduced = useReducedMotion()
  const [ok] = useState(canRender3D)
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        {ok ? <Suspense fallback={null}><div className="absolute inset-0 md:left-[25%]"><HeroScene mobile={mobile} reduced={reduced} /></div></Suspense>
          : <div className="fallback-planet absolute right-[-10%] top-1/2 h-72 w-72 -translate-y-1/2 md:right-[8%] md:h-[28rem] md:w-[28rem]" />}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent md:via-void/40" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32">
        <Reveal><p className="mono mb-4">{site.title} · {site.location}</p></Reveal>
        <Reveal delay={0.05}><h1 className="text-5xl font-bold leading-[1.05] sm:text-7xl">{site.name}</h1></Reveal>
        <Reveal delay={0.1}><p className="mt-4 max-w-xl font-display text-2xl text-electric sm:text-3xl">{site.headline}</p></Reveal>
        <Reveal delay={0.15}><p className="mt-5 max-w-lg text-soft/80">{site.statement}</p></Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="btn-primary" onClick={() => go('projects')}>Explore My Work <ArrowDown size={16} /></button>
            <button className="btn-ghost" onClick={() => go('about')}>About Me</button>
            <a className="btn-ghost !px-3" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={18} /></a>
            <a className="btn-ghost !px-3" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={18} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
const Head = ({ k, t, sub }: { k: string; t: string; sub?: string }) => (
  <Reveal className="mb-12"><p className="mono">{k}</p><h2 className="mt-2 text-4xl font-bold md:text-5xl">{t}</h2>{sub && <p className="mt-3 max-w-2xl text-soft/70">{sub}</p>}</Reveal>
)

export default function Home() {
  useDocTitle('Saman Nadeem — Software Engineer', 'Saman Nadeem is a Software Engineering graduate from Lahore, Pakistan, building intelligent applications, full-stack platforms and backend systems.')
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const t = gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
    return () => { t.scrollTrigger?.kill(); t.kill() }
  }, [])
  const [flag, ...rest] = projects.filter((p) => p.hasCaseStudy)
  const archive = projects.filter((p) => !p.hasCaseStudy)
  return (
    <main>
      <div ref={bar} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-neon to-electric" aria-hidden="true" />
      <Hero />
      <section id="about" className="section">
        <Head k="01 / About" t="Building software that thinks and scales" />
        <div className="grid gap-8 md:grid-cols-5">
          <Reveal className="space-y-4 text-lg text-soft/80 md:col-span-3">
            <p>I am a Software Engineering graduate from the University of Management and Technology, Lahore, interested in designing and developing intelligent applications, scalable software systems, full-stack platforms and backend architectures.</p>
            <p>My projects range from a team-built admissions platform and a fairness-aware queue simulation lab to a full-stack e-commerce system and an emergency-room simulation with waiting-time prediction. I enjoy problem-solving, system design and learning by building.</p>
            <p>I have worked independently from requirements to testing, and in teams using Git, code review, Jira and Agile sprints.</p>
          </Reveal>
          <Reveal delay={0.1} className="glass space-y-3 rounded-3xl p-6 md:col-span-2">
            <p className="mono">Open to roles</p>
            <ul className="space-y-2">{['Software Engineer', 'Full Stack Developer', 'AI/ML Engineer', 'Backend Developer', 'Software Developer'].map((r) => <li key={r} className="border-b border-soft/10 pb-2">{r}</li>)}</ul>
            <p className="flex items-center gap-2 text-sm text-soft/70"><MapPin size={14} /> {site.location}</p>
          </Reveal>
        </div>
      </section>
      <section id="skills" className="section"><Head k="02 / Skills" t="Technical universe" sub="Choose a constellation node to explore what I work with." /><SkillsUniverse /></section>
      <section id="projects" className="section">
        <Head k="03 / Projects" t="Selected work" sub="Six projects, with my own contribution stated plainly on each." />
        <div className="space-y-8">
          <FlagshipCard p={flag} />
          {rest.map((p, i) => <FeaturedRow key={p.slug} p={p} index={i + 2} flip={i % 2 === 1} />)}
        </div>
        <h3 className="mono mb-6 mt-20">Additional projects · archive</h3>
        <div className="grid gap-6 md:grid-cols-3">{archive.map((p, i) => <ArchiveItem key={p.slug} p={p} i={i} />)}</div>
      </section>
      <section id="experience" className="section">
        <Head k="04 / Journey" t="Experience & education" />
        <ol className="relative ml-3 space-y-10 border-l border-neon/40 pl-8">
          <Reveal><li className="relative"><span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-electric glow" />
            <p className="mono">{experience.period}</p><h3 className="mt-1 text-2xl font-bold">{experience.role} — {experience.company}</h3><p className="text-soft/60">{experience.department}</p>
            <ul className="mt-4 space-y-2 text-soft/80">{experience.points.map((p) => <li key={p}>• {p}</li>)}</ul></li></Reveal>
          <Reveal><li className="relative"><span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-neon glow" />
            <p className="mono">{education.period}</p><h3 className="mt-1 text-2xl font-bold">{education.degree}</h3><p className="text-soft/60">{education.school}</p><p className="mt-2 text-soft/80">{education.note}</p></li></Reveal>
        </ol>
      </section>
      <section id="beyond" className="section">
        <Head k="05 / Beyond code" t="How I approach engineering" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{approach.map((a, i) => <Reveal key={a.t} delay={i * 0.06}><div className="h-full rounded-3xl border border-soft/10 bg-navy/40 p-6"><h3 className="text-lg font-bold">{a.t}</h3><p className="mt-2 text-sm text-soft/75">{a.d}</p></div></Reveal>)}</div>
      </section>
      <section id="contact" className="section">
        <Head k="06 / Contact" t="Let's talk" sub="Open to Software Engineer, Full Stack, AI/ML and Backend roles." />
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal className="space-y-4">
            {[{ I: Mail, l: site.email, h: `mailto:${site.email}` }, { I: Linkedin, l: 'LinkedIn profile', h: site.linkedin }, { I: Github, l: 'github.com/SamanNadeem123', h: site.github }].map(({ I, l, h }) => (
              <a key={h} href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-electric"><I className="text-electric" /><span>{l}</span></a>
            ))}
          </Reveal>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </section>
    </main>
  )
}
