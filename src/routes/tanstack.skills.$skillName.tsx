import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  tanstackSkills,
  TANSTACK_SOURCE_REPO,
  TANSTACK_SOURCE_SHA,
  type RichSkill,
} from '@/data/tanstack-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/tanstack/skills/$skillName')({
  loader: ({ params }) => {
    const index = tanstackSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: TanstackSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('tanstack', {
  label: 'TanStack (community)',
  skillPath: '/tanstack/skills/$skillName',
  indexPath: '/tanstack',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function TanstackSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = tanstackSkills[index]
  return (
    <SkillPage
      view={richToView(skill, tanstackSkills, {
        sourceUrl: githubBlobUrl(TANSTACK_SOURCE_REPO, TANSTACK_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(tanstackSkills, index - 1, summaryOf)}
      next={neighbour(tanstackSkills, index + 1, summaryOf)}
      position={index + 1}
      total={tanstackSkills.length}
      install={
        <SkillInstallBlock
          source="tanstack-skills/tanstack-skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
