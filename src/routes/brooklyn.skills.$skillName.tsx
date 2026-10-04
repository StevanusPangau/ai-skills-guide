import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  brooklynSkills,
  BROOKLYN_SOURCE_REPO,
  BROOKLYN_SOURCE_SHA,
  type RichSkill,
} from '@/data/brooklyn-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/brooklyn/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { brooklynSkills } = await import('@/data/brooklyn-skills')
    const index = brooklynSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: BrooklynSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('brooklyn', {
  label: 'Brooklyn',
  skillPath: '/brooklyn/skills/$skillName',
  indexPath: '/brooklyn',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function BrooklynSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = brooklynSkills[index]
  return (
    <SkillPage
      view={richToView(skill, brooklynSkills, {
        sourceUrl: githubBlobUrl(BROOKLYN_SOURCE_REPO, BROOKLYN_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(brooklynSkills, index - 1, summaryOf)}
      next={neighbour(brooklynSkills, index + 1, summaryOf)}
      position={index + 1}
      total={brooklynSkills.length}
      install={
        <SkillInstallBlock
          source="OutThisLife/brooklyn-skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
