import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'motion/react'

export default function Loader({ reduced }: { reduced: boolean }) {
  const [done, setDone] = useState(() => reduced || window.location.pathname !== '/' || sessionStorageSeen())
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (done) return
    const tl = gsap.timeline({ onComplete: () => { markSeen(); setDone(true) } })
    tl.to(bar.current, { width: '100%', duration: 1.2, ease: 'power2.inOut' })
    const safety = window.setTimeout(() => setDone(true), 3000)
    return () => { tl.kill(); window.clearTimeout(safety) }
  }, [done])
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-void" exit={{ opacity: 0 }} transition={{ duration: 0.5 }} role="status" aria-label="Loading">
          <div className="grid-bg absolute inset-0 opacity-60" />
          {!reduced && Array.from({ length: 24 }).map((_, i) => (
            <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-electric" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }} animate={{ opacity: [0, 1, 0], y: [0, -20] }} transition={{ duration: 2, repeat: Infinity, delay: (i % 8) * 0.2 }} />
          ))}
          <div className="relative text-center">
            <div className="font-display text-6xl font-bold tracking-tight"><span className="bg-gradient-to-br from-neon to-electric bg-clip-text text-transparent">SN</span></div>
            <div className="mx-auto mt-6 h-px w-48 bg-soft/10"><div ref={bar} className="h-px w-0 bg-gradient-to-r from-neon to-electric" /></div>
            <button onClick={() => setDone(true)} className="mono mt-6 opacity-70 hover:opacity-100">Skip</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
function sessionStorageSeen() { try { return sessionStorage.getItem('sn-intro') === '1' } catch { return false } }
function markSeen() { try { sessionStorage.setItem('sn-intro', '1') } catch { /* storage unavailable */ } }
