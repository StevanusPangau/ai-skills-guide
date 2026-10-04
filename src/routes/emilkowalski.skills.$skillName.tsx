import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import { collectionContext, neighbour } from '@/features/skill-page/adapters'
import { emilToView } from '@/features/skill-page/adapters-special'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/emilkowalski/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { emilkowalskiSkills } = await import('@/data/emilkowalski-skills')
    const index = emilkowalskiSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: EmilSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('emilkowalski', {
  label: 'Emil Kowalski',
  skillPath: '/emilkowalski/skills/$skillName',
  indexPath: '/emilkowalski',
  catalogHash: 'catalog',
})

function EmilSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = emilkowalskiSkills[index]
  return (
    <SkillPage
      view={emilToView(skill)}
      ctx={ctx}
      prev={neighbour(emilkowalskiSkills, index - 1, (s) => s.description)}
      next={neighbour(emilkowalskiSkills, index + 1, (s) => s.description)}
      position={index + 1}
      total={emilkowalskiSkills.length}
      install={
        <SkillInstallBlock
          source="emilkowalski/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
