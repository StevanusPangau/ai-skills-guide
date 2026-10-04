import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  prismaSkills,
  PRISMA_SOURCE_REPO,
  PRISMA_SOURCE_SHA,
  type RichSkill,
} from '@/data/prisma-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/prisma/skills/$skillName')({
  loader: ({ params }) => {
    const index = prismaSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: PrismaSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('prisma', {
  label: 'Prisma',
  skillPath: '/prisma/skills/$skillName',
  indexPath: '/prisma',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function PrismaSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = prismaSkills[index]
  return (
    <SkillPage
      view={richToView(skill, prismaSkills, {
        sourceUrl: githubBlobUrl(PRISMA_SOURCE_REPO, PRISMA_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(prismaSkills, index - 1, summaryOf)}
      next={neighbour(prismaSkills, index + 1, summaryOf)}
      position={index + 1}
      total={prismaSkills.length}
      install={
        <SkillInstallBlock
          source="prisma/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
