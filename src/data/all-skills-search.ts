import { skills as mattpocockSkills } from '@/data/skills'
import { davidondrejSkills } from '@/data/davidondrej-skills'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import { jakubkrehelSkills } from '@/data/jakubkrehel-skills'
import { brooklynSkills } from '@/data/brooklyn-skills'
import { superpowersSkills } from '@/data/superpowers-skills'
import { vercelSkills } from '@/data/vercel-skills'
import { anthropicSkills } from '@/data/anthropic-skills'
import { cloudflareSkills } from '@/data/cloudflare-skills'
import { getLocale } from '@/paraglide/runtime.js'

export type SearchableSkill = {
  id: string
  name: string
  collection: string
  collectionName: string
  category: string
  description: string
  href: string
}

export function getAllSearchableSkills(): SearchableSkill[] {
  const isEn = getLocale() === 'en'
  const list: SearchableSkill[] = []

  // 1. Matt Pocock
  for (const s of mattpocockSkills) {
    list.push({
      id: `mattpocock-${s.name}`,
      name: s.name,
      collection: 'mattpocock',
      collectionName: 'Matt Pocock',
      category: s.category,
      description: s.description,
      href: `/skills/${s.name}`,
    })
  }

  // 2. David Ondrej
  for (const s of davidondrejSkills) {
    list.push({
      id: `davidondrej-${s.name}`,
      name: s.name,
      collection: 'davidondrej',
      collectionName: 'David Ondrej',
      category: s.category,
      description: typeof s.description === 'string' ? s.description : (isEn ? (s.description as any).en : (s.description as any).id),
      href: `/davidondrej/skills/${s.name}`,
    })
  }

  // 3. Emil Kowalski
  for (const s of emilkowalskiSkills) {
    list.push({
      id: `emilkowalski-${s.name}`,
      name: s.name,
      collection: 'emilkowalski',
      collectionName: 'Emil Kowalski',
      category: s.category,
      description: typeof s.description === 'string' ? s.description : (isEn ? (s.description as any).en : (s.description as any).id),
      href: `/emilkowalski/skills/${s.name}`,
    })
  }

  // 4. Jakub Krehel
  for (const s of jakubkrehelSkills) {
    list.push({
      id: `jakubkrehel-${s.name}`,
      name: s.name,
      collection: 'jakubkrehel',
      collectionName: 'Jakub Krehel',
      category: s.category,
      description: isEn ? s.description.en : s.description.id,
      href: `/jakubkrehel/skills/${s.name}`,
    })
  }

  // 5. Brooklyn
  for (const s of brooklynSkills) {
    list.push({
      id: `brooklyn-${s.name}`,
      name: s.name,
      collection: 'brooklyn',
      collectionName: 'Brooklyn',
      category: s.category,
      description: isEn ? s.description.en : s.description.id,
      href: `/brooklyn/skills/${s.name}`,
    })
  }

  // 6. Superpowers
  for (const s of superpowersSkills) {
    list.push({
      id: `superpowers-${s.name}`,
      name: s.name,
      collection: 'superpowers',
      collectionName: 'Superpowers',
      category: s.category,
      description: isEn ? s.description.en : s.description.id,
      href: `/superpowers/skills/${s.name}`,
    })
  }

  // 7. Vercel
  for (const s of vercelSkills) {
    list.push({
      id: `vercel-${s.name}`,
      name: s.name,
      collection: 'vercel',
      collectionName: 'Vercel',
      category: s.category,
      description: isEn ? s.description.en : s.description.id,
      href: `/vercel/skills/${s.name}`,
    })
  }

  for (const s of anthropicSkills) {
    list.push({
      id: `anthropic-${s.name}`,
      name: s.name,
      collection: 'anthropic',
      collectionName: 'Anthropic',
      category: s.category,
      description: isEn ? s.description.en : s.description.id,
      href: `/anthropic/skills/${s.name}`,
    })
  }

  for (const s of cloudflareSkills) {
    list.push({
      id: `cloudflare-${s.name}`,
      name: s.name,
      collection: 'cloudflare',
      collectionName: 'Cloudflare',
      category: s.category,
      description: isEn ? s.description.en : s.description.id,
      href: `/cloudflare/skills/${s.name}`,
    })
  }

  return list
}
