import { useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Code2, BrainCircuit, Server, Database, Wrench, Users } from 'lucide-react'
import { skillGroups } from '../data/skills'
import { useIsMobile } from '../hooks/useEnv'

const icons = { lang: Code2, ai: BrainCircuit, web: Server, db: Database, tools: Wrench, eng: Users }

export default function SkillsUniverse() {
  const [sel, setSel] = useState('ai')
  const mobile = useIsMobile()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const n = skillGroups.length
  const group = skillGroups.find((g) => g.id === sel) ?? skillGroups[0]
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const k = (i + d + n) % n
    setSel(skillGroups[k].id)
    const targetIndex = e.currentTarget.id.startsWith('tabm-') ? k + n : k
    refs.current[targetIndex]?.focus()
  }
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div role="tablist" aria-label="Skill categories" className="mx-auto w-full max-w-lg">
        {/* Constellation (md and up) */}
        <div className="relative mx-auto hidden aspect-square w-full md:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true">
            <circle cx="50" cy="50" r="36" fill="none" stroke="#7955FF" strokeOpacity=".3" strokeDasharray="1 2" />
            {skillGroups.map((g, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; const on = g.id === sel; return <line key={g.id} x1="50" y1="50" x2={50 + 36 * Math.cos(a)} y2={50 + 36 * Math.sin(a)} stroke={on ? '#00CFFF' : '#E9EAF4'} strokeOpacity={on ? 0.9 : 0.12} strokeWidth={on ? 0.6 : 0.3} /> })}
          </svg>
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-neon to-electric text-center font-display text-xs font-bold leading-tight text-void">Skill<br />Universe</div>
          {skillGroups.map((g, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2, Icon = icons[g.id as keyof typeof icons], on = g.id === sel
            return (
              <button key={g.id} ref={(el) => { refs.current[i] = el }} role="tab" id={`tab-${g.id}`} aria-selected={on} aria-controls="skill-panel" tabIndex={on ? 0 : -1}
                onClick={() => setSel(g.id)} onKeyDown={(e) => onKey(e, i)}
                className={`absolute flex h-[6.5rem] w-[6.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border px-2 text-center text-[13px] font-medium leading-tight transition-colors duration-200 hover:border-electric hover:bg-navy ${on ? 'border-electric bg-navy text-white shadow-[0_0_0_4px_rgba(0,207,255,.15)]' : 'border-soft/20 bg-navy/70 text-soft/85'}`}
                style={{ left: `${50 + 36 * Math.cos(a)}%`, top: `${50 + 36 * Math.sin(a)}%` }}>
                <Icon size={20} className={on ? 'text-electric' : 'text-neon'} /><span>{g.short}</span>
              </button>
            )
          })}
        </div>
        {/* Stacked list (mobile) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.id as keyof typeof icons], on = g.id === sel
            return (
              <button key={g.id} ref={(el) => { refs.current[i + n] = el }} role="tab" id={`tabm-${g.id}`} aria-selected={on} aria-controls="skill-panel" tabIndex={on ? 0 : -1} onClick={() => setSel(g.id)} onKeyDown={(e) => onKey(e, i)}
                className={`flex min-h-[3.5rem] items-center gap-2 rounded-2xl border px-3 py-3 text-left text-sm transition-colors hover:border-electric ${on ? 'border-electric bg-navy text-white' : 'border-soft/20 bg-navy/60'}`}>
                <Icon size={18} className={on ? 'text-electric' : 'text-neon'} />{g.short}
              </button>
            )
          })}
        </div>
      </div>
      <div id="skill-panel" role="tabpanel" aria-live="polite" aria-labelledby={mobile ? `tabm-${group.id}` : `tab-${group.id}`} className="glass relative min-h-[280px] overflow-hidden rounded-3xl p-7">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/20 blur-3xl" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div key={group.id} className="relative" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="mono">{String(skillGroups.indexOf(group) + 1).padStart(2, '0')} / {group.skills.length} skills</p>
            <h3 className="mt-2 text-2xl font-bold">{group.name}</h3>
            <p className="mt-3 text-soft/75">{group.blurb}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">{group.skills.map((s) => <li key={s} className="rounded-full border border-electric/30 bg-void/50 px-4 py-2 font-mono text-sm">{s}</li>)}</ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
