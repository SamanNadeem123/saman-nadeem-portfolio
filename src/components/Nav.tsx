import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/site'

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const onHome = pathname === '/'

  useEffect(() => {
    if (!onHome) return
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    navItems.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [onHome])

  const go = (id: string) => {
    setOpen(false)
    if (onHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else { navigate('/'); window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 150) }
  }
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Primary" className="glass glow relative flex w-full max-w-3xl items-center justify-between rounded-full px-4 py-2">
        <Link to="/" onClick={() => window.scrollTo({ top: 0 })} aria-label="Saman Nadeem — home" className="grid h-9 w-9 place-items-center rounded-full border border-neon/60 font-display text-sm font-bold">SN</Link>
        <ul className="hidden gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id}><button onClick={() => go(n.id)} aria-current={onHome && active === n.id ? 'true' : undefined} className={`rounded-full px-3 py-1.5 text-sm transition ${onHome && active === n.id ? 'bg-neon/25 text-white' : 'text-soft/70 hover:text-electric'}`}>{n.label}</button></li>
          ))}
        </ul>
        <button className="grid h-10 w-10 place-items-center md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        {open && (
          <ul className="glass absolute left-0 right-0 top-14 rounded-3xl p-3 md:hidden">
            {navItems.map((n) => <li key={n.id}><button onClick={() => go(n.id)} className="w-full rounded-2xl px-4 py-3 text-left hover:bg-neon/20">{n.label}</button></li>)}
          </ul>
        )}
      </nav>
    </header>
  )
}
