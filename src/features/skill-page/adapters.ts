import { getCollectionBySlug } from '@/data/collections'
import { getLocale } from '@/paraglide/runtime.js'
import type {
  SkillCollectionContext,
  SkillLink,
  SkillView,
} from './types'

type Bi<T> = { id: T; en: T }

/** Shape shared by the "rich" collections (vercel, anthropic, cloudflare, ...). */
export type RichSkillLike = {
  name: string
  category: string
  invocation: 'user' | 'model'
  description: Bi<string>
  detailedDescription: Bi<string>
  useWhen: Bi<string[]>
  avoidWhen: Bi<string[]>
  howItWorks: Bi<string[]>
  coreRules: Bi<string[]>
  tips: Bi<string[]>
  pairsWellWith: string[]
  sourcePath: string
  spotlight?: { title: Bi<string>; body: Bi<string> }
}

export function isEnglish(): boolean {
  return getLocale() === 'en'
}

/** `react-performance` -> `react performance` (slugs double as display labels). */
export function categoryLabel(category: string): string {
  return category.replace(/[-_]+/g, ' ')
}

export function githubBlobUrl(repo: string, sha: string, path: string): string {
  return `https://${repo}/blob/${sha}/${path}`
}

export function neighbour<T extends { name: string }>(
  list: T[],
  index: number,
  toSummary: (item: T) => string,
): SkillLink | null {
  const item = list[index]
  return item ? { name: item.name, summary: toSummary(item) } : null
}

export function collectionContext(
  slug: string,
  opts: {
    label: string
    skillPath: string
    indexPath: string
    catalogHash?: string
  },
): SkillCollectionContext {
  const author = getCollectionBySlug(slug)
  return {
    slug,
    label: opts.label,
    skillPath: opts.skillPath,
    indexPath: opts.indexPath,
    catalogHash: opts.catalogHash,
    authorName: author?.author,
    authorHandle: author?.xHandle,
    avatarSrc: author?.avatarSrc,
  }
}

export function richToView(
  skill: RichSkillLike,
  all: RichSkillLike[],
  opts: {
    sourceUrl?: string
    /** Overrides for collections that rename/reshape the skill. */
    displayName?: string
    invokeCommand?: string
    extra?: Partial<SkillView>
  } = {},
): SkillView {
  const isEn = isEnglish()
  const pick = <T>(v: Bi<T>): T => (isEn ? v.en : v.id)
  const byName = new Map(all.map((s) => [s.name, s] as const))
  const detail = pick(skill.detailedDescription)

  return {
    name: skill.name,
    displayName: opts.displayName,
    invokeCommand: opts.invokeCommand,
    invocation: skill.invocation,
    category: categoryLabel(skill.category),
    summary: pick(skill.description),
    detail: detail || undefined,
    useWhen: pick(skill.useWhen),
    avoidWhen: pick(skill.avoidWhen),
    steps: pick(skill.howItWorks),
    rules: pick(skill.coreRules),
    tips: pick(skill.tips),
    spotlight: skill.spotlight
      ? { title: pick(skill.spotlight.title), body: pick(skill.spotlight.body) }
      : undefined,
    pairs: skill.pairsWellWith.flatMap((name) => {
      const target = byName.get(name)
      return target ? [{ name, summary: pick(target.description) }] : []
    }),
    sourceUrl: opts.sourceUrl,
    sourcePath: skill.sourcePath,
    agentRule: {
      name: opts.displayName ?? skill.name,
      description: detail || pick(skill.description),
      useWhen: pick(skill.useWhen),
      coreRules: pick(skill.coreRules),
      howItWorks: pick(skill.howItWorks),
    },
    ...opts.extra,
  }
}
