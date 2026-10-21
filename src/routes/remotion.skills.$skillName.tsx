import { createFileRoute, notFound } from '@tanstack/react-router'
import {
  remotionSkills,
  REMOTION_SOURCE_REPO,
  REMOTION_SOURCE_SHA,
} from '@/data/remotion-skills'
import { collectionContext } from '@/features/skill-page/adapters'
import { RichCollectionSkillPage } from '@/features/skill-page/rich-collection-skill-page'
import { SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/remotion/skills/$skillName')({
  loader: async ({ params }) => {
    const { remotionSkills } = await import('@/data/remotion-skills')
    const index = remotionSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: RemotionSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('remotion', {
  label: 'Remotion',
  skillPath: '/remotion/skills/$skillName',
  indexPath: '/remotion',
  catalogHash: 'skills',
})

function RemotionSkillPage() {
  const { index } = Route.useLoaderData()
  return (
    <RichCollectionSkillPage
      skills={remotionSkills}
      index={index}
      ctx={ctx}
      sourceRepo={REMOTION_SOURCE_REPO}
      sourceSha={REMOTION_SOURCE_SHA}
      installSource="remotion-dev/skills"
    />
  )
}
