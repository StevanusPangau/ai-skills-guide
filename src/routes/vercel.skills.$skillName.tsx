import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  vercelSkills,
  VERCEL_SOURCE_REPO,
  VERCEL_SOURCE_SHA,
  type RichSkill,
} from '@/data/vercel-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/vercel/skills/$skillName')({
  loader: ({ params }) => {
    const index = vercelSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: VercelSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('vercel', {
  label: 'Vercel',
  skillPath: '/vercel/skills/$skillName',
  indexPath: '/vercel',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function VercelSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = vercelSkills[index]
  return (
    <SkillPage
      view={richToView(skill, vercelSkills, {
        sourceUrl: githubBlobUrl(VERCEL_SOURCE_REPO, VERCEL_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(vercelSkills, index - 1, summaryOf)}
      next={neighbour(vercelSkills, index + 1, summaryOf)}
      position={index + 1}
      total={vercelSkills.length}
      install={
        <SkillInstallBlock
          source="vercel-labs/agent-skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
