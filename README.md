# Saman Nadeem — Portfolio

Immersive 3D portfolio built with React, TypeScript, Vite, Tailwind CSS, Three.js (React Three Fiber + Drei), GSAP and Motion.

## Run (Windows PowerShell)
```powershell
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # outputs dist/
npm run preview
```

## Structure
`src/data` (site, skills, projects content) · `src/components` · `src/pages` (Home, CaseStudy) · `src/scene` (3D hero) · `src/hooks` · `src/styles`

## Edit content
- Personal info, contact links, experience, education: `src/data/site.ts`
- Skills: `src/data/skills.ts`
- Projects (add/update, GitHub links, status): `src/data/projects.ts`. Set `hasCaseStudy: true` for a route at `/projects/<slug>`; `false` places it in the archive. Add a `github` field only for verified repos; add `demoNote` only while a demo is "coming soon".
- QuickFix repo: once you have the URL, add `github: '...'` to the QuickFix entry.
- Site URL: set `VITE_SITE_URL` (Vercel → Settings → Environment Variables) once your real domain exists. It feeds canonical, og:url, og:image, robots.txt and sitemap.xml at build time; if unset they are omitted. The `og.svg` social image is also only emitted with a URL; note some platforms prefer PNG for previews.

## Contact form
No mail server is bundled. Without configuration the form validates, then opens the visitor's email app addressed to you (and says so). For real delivery, create a Formspree form and set `VITE_FORMSPREE_ID` (see `.env.example`; also add it in Vercel).

## Deploy
```powershell
git init; git add .; git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/SamanNadeem123/<repo-name>.git
git push -u origin main
```
Vercel: Add New Project → import the repo → Framework "Vite" (build `npm run build`, output `dist`) → Deploy. `vercel.json` already rewrites all routes to `index.html`, so case-study URLs work on refresh.

## Notes
- Project visuals (`src/components/ProjectVisuals.tsx`) are conceptual SVG/CSS illustrations, labelled as not screenshots.
- `npm audit` leftovers: esbuild (dev server only, fixed in Vite 6+), uuid (via Drei, buffer-arg bug not used here), react-router moderate advisory (fix requires v7). Not force-upgraded to avoid breaking changes.
