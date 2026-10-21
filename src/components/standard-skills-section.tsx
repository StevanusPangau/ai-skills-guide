import { useMemo } from 'react'
import { SkillCatalog, type CatalogItem } from '@/components/skill-catalog'
import { getLocale } from '@/paraglide/runtime.js'
import type { RichSkill } from '@/data/jakubkrehel-skills'

type Props = {
  collectionSlug: string
  skills: RichSkill[]
  categories: { label: string; value: string }[]
  title: string
  description: string
  /** `github.com/owner/repo`, no scheme. */
  repoUrl: string
  /** Pinned commit. Without it, the SKILL.md link points at the default branch. */
  sourceSha?: string
}

/** Catalog for the "rich" bilingual collections; maps each record to a catalog row. */
export function StandardSkillsSection({
  collectionSlug,
  skills,
  categories,
  title,
  description,
  repoUrl,
  sourceSha,
}: Props) {
  const isEn = getLocale() === 'en'
  const items = useMemo<CatalogItem[]>(
    () =>
      skills.map((skill) => {
        const rules = isEn ? skill.coreRules.en : skill.coreRules.id
        const uses = isEn ? skill.useWhen.en : skill.useWhen.id
        return {
          name: skill.name,
          category: skill.category,
          categoryLabel: skill.category,
          invocation: skill.invocation,
          description: isEn ? skill.description.en : skill.description.id,
          highlights: rules,
          searchText: [...uses, ...rules].join(' '),
          sourceUrl: skill.sourcePath
            ? sourceSha
              ? `https://${repoUrl}/blob/${sourceSha}/${skill.sourcePath}`
              : `https://${repoUrl}/tree/main/${skill.sourcePath}`
            : undefined,
        }
      }),
    [skills, isEn, repoUrl, sourceSha],
  )

  return (
    <SkillCatalog
      collectionSlug={collectionSlug}
      items={items}
      categories={categories}
      title={title}
      description={description}
    />
  )
}
