import { skills } from '@/data/skills'

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

export const collections: Collection[] = [
  {
    slug: 'mattpocock',
    to: '/mattpocock',
    author: 'Matt Pocock',
    title: 'AI Coding Skills',
    description:
      'Workflow terstruktur dari ide hingga ship untuk pengembangan software berbasis AI agent. Main build chain, on-ramps, dan konsep Smart Zone.',
    skillCount: skills.length,
    status: 'available',
    source: 'github.com/mattpocock/skills',
    tags: ['engineering', 'workflow', 'agentic'],
  },
]

export const availableCollections = collections.filter((c) => c.status === 'available')
