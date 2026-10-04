import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { skills } from '@/data/skills'
import { collectionContext, neighbour } from '@/features/skill-page/adapters'
import { mattpocockToView } from '@/features/skill-page/adapters-special'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { skills } = await import('@/data/skills')
    const index = skills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: MattPocockSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('mattpocock', {
  label: 'Matt Pocock',
  skillPath: '/skills/$skillName',
  indexPath: '/mattpocock',
})

function MattPocockSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = skills[index]
  return (
    <SkillPage
      view={mattpocockToView(skill, skills)}
      ctx={ctx}
      prev={neighbour(skills, index - 1, (s) => s.description)}
      next={neighbour(skills, index + 1, (s) => s.description)}
      position={index + 1}
      total={skills.length}
      install={
        <SkillInstallBlock
          source="mattpocock/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
