import { useEffect, useState } from 'react'
export function useReducedMotion(): boolean {
  const [r, setR] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => { const m = window.matchMedia('(prefers-reduced-motion: reduce)'); const f = () => setR(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return r
}
export function useIsMobile(): boolean {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => { const f = () => setM(window.innerWidth < 768); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return m
}
export function canRender3D(): boolean {
  try {
    const c = document.createElement('canvas')
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return false
    return (navigator.hardwareConcurrency ?? 4) > 2
  } catch { return false }
}
export function useDocTitle(title: string, desc?: string) {
  useEffect(() => {
    document.title = title
    if (desc) document.querySelector('meta[name="description"]')?.setAttribute('content', desc)
  }, [title, desc])
}
