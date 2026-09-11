import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const siteUrl = 'https://skills.stevanuspangau.dev'

const collections = [
  ['mattpocock', 'skills.ts', ''],
  ['davidondrej', 'davidondrej-skills.ts', 'davidondrej'],
  ['emilkowalski', 'emilkowalski-skills.ts', 'emilkowalski'],
  ['jakubkrehel', 'jakubkrehel-skills.ts', 'jakubkrehel'],
  ['brooklyn', 'brooklyn-skills.ts', 'brooklyn'],
  ['superpowers', 'superpowers-skills.ts', 'superpowers'],
  ['vercel', 'vercel-skills.ts', 'vercel'],
  ['anthropic', 'anthropic-skills.ts', 'anthropic'],
  ['cloudflare', 'cloudflare-skills.ts', 'cloudflare'],
  ['supabase', 'supabase-skills.ts', 'supabase'],
  ['prisma', 'prisma-skills.ts', 'prisma'],
  ['tanstack', 'tanstack-skills.ts', 'tanstack'],
  ['expo', 'expo-skills.ts', 'expo'],
  ['gsap', 'gsap-skills.ts', 'gsap'],
  ['impeccable', 'impeccable-skills.ts', 'impeccable'],
]

const urls = ['/', '/collections']
const llmsSections = []

for (const [slug, file, skillPrefix] of collections) {
  const source = await readFile(resolve(root, 'src/data', file), 'utf8')
  const names = [...source.matchAll(/^\s{4}name:\s*['"]([^'"]+)['"],/gm)].map(
    (match) => match[1],
  )
  const skillPath = (name) =>
    skillPrefix ? `/${skillPrefix}/skills/${name}` : `/skills/${name}`
  urls.push(`/${slug}`)
  urls.push(...names.map(skillPath))
  llmsSections.push(
    `## ${slug}\n\n- Collection: ${siteUrl}/${slug}\n${names
      .map((name) => `- ${name}: ${siteUrl}${skillPath(name)}`)
      .join('\n')}`,
  )
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const llms = `# AI Skills Guide

> A bilingual educational reference for practical AI coding-agent skills, workflows, constraints, and installation guidance. Indonesian is the default interface language; many skill collections also contain complete English content.

Canonical site: ${siteUrl}/
Source repository: https://github.com/StevanusPangau/ai-skills-guide
Collections index: ${siteUrl}/collections

The guide curates and explains work by the attributed upstream authors. Each collection page identifies its source repository and pinned source revision. Treat upstream repositories as canonical for installation files and licenses.

${llmsSections.join('\n\n')}
`

async function output(path, content) {
  const target = resolve(root, path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, content)
}

await Promise.all([
  output('public/sitemap.xml', sitemap),
  output('public/robots.txt', robots),
  output('public/llms.txt', llms),
])

console.log(`Generated SEO artifacts for ${urls.length} canonical URLs.`)
