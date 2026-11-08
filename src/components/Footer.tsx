import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../data/site'
export default function Footer() {
  return (
    <footer className="border-t border-soft/10 bg-void">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full border border-neon/60 font-display text-sm font-bold">SN</span><div><p className="font-display">{site.name}</p><p className="mono">{site.title}</p></div></div>
        <div className="flex items-center gap-4 text-soft/80">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-electric"><Github size={20} /></a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-electric"><Linkedin size={20} /></a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-electric"><Mail size={20} /></a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-ghost !px-3 !py-2" aria-label="Back to top"><ArrowUp size={16} /> Top</button>
        </div>
        <p className="text-xs text-soft/60">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  )
}
