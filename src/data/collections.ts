import { MATTPOCOCK_SKILL_COUNT } from '@/data/skills-meta'
import { DAVIDONDREJ_SKILL_COUNT } from '@/data/davidondrej-skills-meta'
import { EMILKOWALSKI_SKILL_COUNT } from '@/data/emilkowalski-skills-meta'
import { JAKUBKREHEL_SKILL_COUNT } from '@/data/jakubkrehel-skills-meta'
import { BROOKLYN_SKILL_COUNT } from '@/data/brooklyn-skills-meta'
import { SUPERPOWERS_SKILL_COUNT } from '@/data/superpowers-skills-meta'
import { m } from '@/paraglide/messages.js'

export type CollectionStatus = 'available' | 'coming-soon'

export type Collection = {
  /** URL slug — stable identifier */
  slug: string
  /** Route path untuk Link tujuan (undefined jika coming-soon) */
  to?: string
  author: string
  /** Local path under public/ — X/Twitter profile snapshot, self-hosted */
  avatarSrc?: string
  /** X handle without @ */
  xHandle?: string
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
      avatarSrc: '/avatars/mattpocock.jpg',
      xHandle: 'mattpocockuk',
      title: 'AI Coding Skills',
      description: m.collection_mattpocock_description(),
      skillCount: MATTPOCOCK_SKILL_COUNT,
      status: 'available',
      source: 'github.com/mattpocock/skills',
      tags: ['engineering', 'workflow', 'agentic'],
    },
    {
      slug: 'emilkowalski',
      to: '/emilkowalski',
      author: 'Emil Kowalski',
      avatarSrc: '/avatars/emilkowalski.jpg',
      xHandle: 'emilkowalski',
      title: 'Design Engineering Skills',
      description: m.collection_emilkowalski_description(),
      skillCount: EMILKOWALSKI_SKILL_COUNT,
      status: 'available',
      source: 'github.com/emilkowalski/skills',
      tags: ['design-engineering', 'animation', 'motion'],
    },
    {
      slug: 'davidondrej',
      to: '/davidondrej',
      author: 'David Ondrej',
      avatarSrc: '/avatars/davidondrej.jpg',
      xHandle: 'DavidOndrej1',
      title: 'Personal Agent Skills',
      description: m.collection_davidondrej_description(),
      skillCount: DAVIDONDREJ_SKILL_COUNT,
      status: 'available',
      source: 'github.com/davidondrej/skills',
      tags: ['orchestration', 'research', 'authoring'],
    },
    {
      slug: 'jakubkrehel',
      to: '/jakubkrehel',
      author: 'Jakub Krehel',
      avatarSrc: '/avatars/jakubkrehel.jpg',
      xHandle: 'jakubkrehel',
      title: 'UI & Design Engineering Skills',
      description: m.collection_jakubkrehel_description(),
      skillCount: JAKUBKREHEL_SKILL_COUNT,
      status: 'available',
      source: 'github.com/jakubkrehel/skills',
      tags: ['ui-polish', 'design-engineering', 'typography'],
    },
    {
      slug: 'brooklyn',
      to: '/brooklyn',
      author: 'Brooklyn',
      avatarSrc: '/avatars/brooklyn.jpg',
      xHandle: 'imbabybrooklyn',
      title: 'Autonomous Engineering & PR Skills',
      description: m.collection_brooklyn_description(),
      skillCount: BROOKLYN_SKILL_COUNT,
      status: 'available',
      source: 'github.com/OutThisLife/brooklyn-skills',
      tags: ['pr-lifecycle', 'autonomous', 'engineering-hygiene'],
    },
    {
      slug: 'superpowers',
      to: '/superpowers',
      author: 'Jesse Vincent',
      avatarSrc: '/avatars/obra.jpg',
      title: 'Agentic SDLC & Superpowers',
      description: m.collection_superpowers_description(),
      skillCount: SUPERPOWERS_SKILL_COUNT,
      status: 'available',
      source: 'github.com/obra/superpowers',
      tags: ['subagent-sdd', 'methodology', 'framework'],
    },
  ]
}

/** Stable lookup for skill pages / catalogs that need author branding. */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return getCollections().find((c) => c.slug === slug)
}

export function getAvailableCollections() {
  return getCollections().filter((c) => c.status === 'available')
}

// Keep backward-compatible exports (re-evaluated per call for locale reactivity)
export const collections = getCollections()
export const availableCollections = getAvailableCollections()
