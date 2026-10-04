import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  jakubkrehelSkills,
  JAKUBKREHEL_SOURCE_REPO,
  JAKUBKREHEL_SOURCE_SHA,
  type RichSkill,
} from '@/data/jakubkrehel-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/jakubkrehel/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { jakubkrehelSkills } = await import('@/data/jakubkrehel-skills')
    const index = jakubkrehelSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: JakubkrehelSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('jakubkrehel', {
  label: 'Jakub Krehel',
  skillPath: '/jakubkrehel/skills/$skillName',
  indexPath: '/jakubkrehel',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function JakubkrehelSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = jakubkrehelSkills[index]
  return (
    <SkillPage
      view={richToView(skill, jakubkrehelSkills, {
        sourceUrl: githubBlobUrl(JAKUBKREHEL_SOURCE_REPO, JAKUBKREHEL_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(jakubkrehelSkills, index - 1, summaryOf)}
      next={neighbour(jakubkrehelSkills, index + 1, summaryOf)}
      position={index + 1}
      total={jakubkrehelSkills.length}
      install={
        <SkillInstallBlock
          source="jakubkrehel/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
