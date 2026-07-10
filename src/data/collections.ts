import { skills } from '@/data/skills'
import { davidondrejSkills } from '@/data/davidondrej-skills'
import { m } from '@/paraglide/messages.js'

export type CollectionStatus = 'available' | 'coming-soon'

export type Collection = {
  /** URL slug — stable identifier */
  slug: string
  /** Route path untuk Link tujuan (undefined jika coming-soon) */
  to?: string
  author: string
  title: string
  description: string
  /** Jumlah skill; jika 0 dan status coming-soon, badge disembunyikan */
  skillCount: number
  status: CollectionStatus
  /** Sumber resmi / atribusi */
  source?: string
  /** Tag ringkas untuk kartu */
  tags: string[]
}

export function getCollections(): Collection[] {
  return [
    {
      slug: 'mattpocock',
      to: '/mattpocock',
      author: 'Matt Pocock',
      title: 'AI Coding Skills',
      description: m.collection_mattpocock_description(),
      skillCount: skills.length,
      status: 'available',
      source: 'github.com/mattpocock/skills',
      tags: ['engineering', 'workflow', 'agentic'],
    },
    {
      slug: 'davidondrej',
      to: '/davidondrej',
      author: 'David Ondrej',
      title: 'Personal Agent Skills',
      description: m.collection_davidondrej_description(),
      skillCount: davidondrejSkills.length,
      status: 'available',
      source: 'github.com/davidondrej/skills',
      tags: ['orchestration', 'research', 'authoring'],
    },
  ]
}

export function getAvailableCollections() {
  return getCollections().filter((c) => c.status === 'available')
}

// Keep backward-compatible exports (re-evaluated per call for locale reactivity)
export const collections = getCollections()
export const availableCollections = getAvailableCollections()
