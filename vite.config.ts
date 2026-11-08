import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Deployment-specific URL comes from VITE_SITE_URL (set in Vercel after the real domain is known).
// When unset, canonical/og:url/og:image tags are omitted and no sitemap is emitted.
function seo(siteUrl: string): Plugin {
  const routes = ['/', '/projects/zyntra', '/projects/simuloom', '/projects/dastkaar-interiors']
  return {
    name: 'seo',
    transformIndexHtml: (html) => siteUrl
      ? html.split('__SITE_URL__').join(siteUrl)
      : html.split('\n').filter((l) => !l.includes('__SITE_URL__')).join('\n'),
    generateBundle() {
      const robots = siteUrl ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n` : 'User-agent: *\nAllow: /\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `<url><loc>${siteUrl}${r === '/' ? '/' : r}</loc></url>`).join('\n')}\n</urlset>\n` })
    },
  }
}
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), '').VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    plugins: [react(), seo(siteUrl)],
    build: { rollupOptions: { output: { manualChunks: { three: ['three', '@react-three/fiber', '@react-three/drei'], motion: ['motion/react', 'gsap'] } } }, chunkSizeWarningLimit: 1200 },
  }
})
