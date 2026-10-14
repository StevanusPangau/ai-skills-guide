import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  tasteSkills,
  TASTE_SOURCE_REPO,
  TASTE_SOURCE_SHA,
  type RichSkill,
} from '@/data/taste-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/taste/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { tasteSkills } = await import('@/data/taste-skills')
    const index = tasteSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: TasteSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('taste', {
  label: 'Taste Skill',
  skillPath: '/taste/skills/$skillName',
  indexPath: '/taste',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function TasteSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = tasteSkills[index]
  return (
    <SkillPage
      view={richToView(skill, tasteSkills, {
        sourceUrl: githubBlobUrl(TASTE_SOURCE_REPO, TASTE_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(tasteSkills, index - 1, summaryOf)}
      next={neighbour(tasteSkills, index + 1, summaryOf)}
      position={index + 1}
      total={tasteSkills.length}
      install={
        <SkillInstallBlock
          source="Leonxlnx/taste-skill"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
