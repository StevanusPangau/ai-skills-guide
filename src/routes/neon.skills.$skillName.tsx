import { createFileRoute, notFound } from '@tanstack/react-router'
import { neonSkills, NEON_SOURCE_REPO, NEON_SOURCE_SHA } from '@/data/neon-skills'
import { collectionContext } from '@/features/skill-page/adapters'
import { RichCollectionSkillPage } from '@/features/skill-page/rich-collection-skill-page'
import { SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/neon/skills/$skillName')({
  loader: async ({ params }) => {
    const { neonSkills } = await import('@/data/neon-skills')
    const index = neonSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: NeonSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('neon', {
  label: 'Neon',
  skillPath: '/neon/skills/$skillName',
  indexPath: '/neon',
  catalogHash: 'skills',
})

function NeonSkillPage() {
  const { index } = Route.useLoaderData()
  return (
    <RichCollectionSkillPage
      skills={neonSkills}
      index={index}
      ctx={ctx}
      sourceRepo={NEON_SOURCE_REPO}
      sourceSha={NEON_SOURCE_SHA}
      installSource="neondatabase/agent-skills"
    />
  )
}
