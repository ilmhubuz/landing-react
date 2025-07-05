// scripts/generate-sitemap.js
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// 1) configure your routes here:
const routes = [
  { path: '/',     changefreq: 'daily',    priority: 1.0 },
  { path: '/register', changefreq: 'weekly', priority: 0.8 },
  // → when you add new “real” routes, just push here
]

// 2) compute today's date in YYYY‑MM‑DD
const today = new Date().toISOString().split('T')[0]

// 3) build XML
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(r => `
    <url>
      <loc>https://ilmhub.uz${r.path}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${r.changefreq}</changefreq>
      <priority>${r.priority}</priority>
    </url>
  `.trim()),
  '</urlset>'
].join('\n')

// 4) write to your `dist` folder
const outPath = resolve(process.cwd(), 'dist', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`✔︎ sitemap.xml generated at ${outPath}`)
