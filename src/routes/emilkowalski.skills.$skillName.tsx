import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import { collectionContext, neighbour } from '@/features/skill-page/adapters'
import { emilToView } from '@/features/skill-page/adapters-special'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/emilkowalski/skills/$skillName')({
  loader: ({ params }) => {
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
