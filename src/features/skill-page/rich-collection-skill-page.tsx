import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
  type RichSkillLike,
} from '@/features/skill-page/adapters'
import { SkillPage } from '@/features/skill-page/skill-page'
import type { SkillCollectionContext } from '@/features/skill-page/types'

type RichCollectionSkillPageProps = {
  skills: readonly RichSkillLike[]
  index: number
  ctx: SkillCollectionContext
  sourceRepo: string
  sourceSha: string
  /** skills.sh owner/repo, for example `remotion-dev/skills`. */
  installSource: string
}

/** Shared detail page for a bilingual collection. Each route file only loads its own data. */
export function RichCollectionSkillPage({
  skills,
  index,
  ctx,
  sourceRepo,
  sourceSha,
  installSource,
}: RichCollectionSkillPageProps) {
  const skill = skills[index]
  if (!skill) return null
  const summaryOf = (item: RichSkillLike) =>
    isEnglish() ? item.description.en : item.description.id
  const list = skills as RichSkillLike[]

  return (
    <SkillPage
      view={richToView(skill, list, {
        sourceUrl: githubBlobUrl(sourceRepo, sourceSha, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(list, index - 1, summaryOf)}
      next={neighbour(list, index + 1, summaryOf)}
      position={index + 1}
      total={skills.length}
      install={
        <SkillInstallBlock source={installSource} skillName={skill.name} hideHeading />
      }
    />
  )
}
