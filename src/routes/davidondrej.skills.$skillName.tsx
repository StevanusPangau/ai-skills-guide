import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { davidondrejSkills } from '@/data/davidondrej-skills'
import { collectionContext, neighbour } from '@/features/skill-page/adapters'
import { davidToView } from '@/features/skill-page/adapters-special'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/davidondrej/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { davidondrejSkills } = await import('@/data/davidondrej-skills')
    const index = davidondrejSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: DavidSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('davidondrej', {
  label: 'David Ondrej',
  skillPath: '/davidondrej/skills/$skillName',
  indexPath: '/davidondrej',
  catalogHash: 'catalog',
})

function DavidSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = davidondrejSkills[index]
  return (
    <SkillPage
      view={davidToView(skill)}
      ctx={ctx}
      prev={neighbour(davidondrejSkills, index - 1, (s) => s.description)}
      next={neighbour(davidondrejSkills, index + 1, (s) => s.description)}
      position={index + 1}
      total={davidondrejSkills.length}
      install={
        <SkillInstallBlock
          source="davidondrej/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
