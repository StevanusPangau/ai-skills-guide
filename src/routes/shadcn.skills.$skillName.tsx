import { createFileRoute, notFound } from '@tanstack/react-router'
import {
  shadcnSkills,
  SHADCN_SOURCE_REPO,
  SHADCN_SOURCE_SHA,
} from '@/data/shadcn-skills'
import { collectionContext } from '@/features/skill-page/adapters'
import { RichCollectionSkillPage } from '@/features/skill-page/rich-collection-skill-page'
import { SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/shadcn/skills/$skillName')({
  loader: async ({ params }) => {
    const { shadcnSkills } = await import('@/data/shadcn-skills')
    const index = shadcnSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: ShadcnSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('shadcn', {
  label: 'shadcn/ui',
  skillPath: '/shadcn/skills/$skillName',
  indexPath: '/shadcn',
  catalogHash: 'skills',
})

function ShadcnSkillPage() {
  const { index } = Route.useLoaderData()
  return (
    <RichCollectionSkillPage
      skills={shadcnSkills}
      index={index}
      ctx={ctx}
      sourceRepo={SHADCN_SOURCE_REPO}
      sourceSha={SHADCN_SOURCE_SHA}
      installSource="shadcn-ui/ui"
    />
  )
}
