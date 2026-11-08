import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { useReducedMotion } from './hooks/useEnv'
import Home from './pages/Home'
const CaseStudy = lazy(() => import('./pages/CaseStudy'))

function NotFound() {
  return <main className="grid min-h-screen place-items-center px-5 text-center"><div><p className="mono">404</p><h1 className="mt-2 text-4xl font-bold">Page not found</h1><Link to="/" className="btn-primary mt-6">Back to portfolio</Link></div></main>
}
export default function App() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => { if (pathname !== '/') window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Loader reduced={reduced} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-neon focus:px-3 focus:py-2">Skip to content</a>
      <Nav />
      <motion.div id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes><Route path="/" element={<Home />} /><Route path="/projects/:slug" element={<CaseStudy />} /><Route path="*" element={<NotFound />} /></Routes>
        </Suspense>
      </motion.div>
      <Footer />
    </>
  )
}
