import { createFileRoute, notFound } from '@tanstack/react-router'
import { CodeBlock } from '@/components/code-block'
import {
  superpowersSkills,
  SUPERPOWERS_SOURCE_REPO,
  SUPERPOWERS_SOURCE_SHA,
  type RichSkill,
} from '@/data/superpowers-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { m } from '@/paraglide/messages.js'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/superpowers/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { superpowersSkills } = await import('@/data/superpowers-skills')
    const index = superpowersSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: SuperpowersSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('superpowers', {
  label: 'Superpowers',
  skillPath: '/superpowers/skills/$skillName',
  indexPath: '/superpowers',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function SuperpowersSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = superpowersSkills[index]
  return (
    <SkillPage
      view={richToView(skill, superpowersSkills, {
        sourceUrl: githubBlobUrl(SUPERPOWERS_SOURCE_REPO, SUPERPOWERS_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(superpowersSkills, index - 1, summaryOf)}
      next={neighbour(superpowersSkills, index + 1, summaryOf)}
      position={index + 1}
      total={superpowersSkills.length}
      install={
        <div className="space-y-2">
          <CodeBlock code="/plugin install superpowers@claude-plugins-official" />
          <p className="text-xs text-muted-foreground">
            {m.superpowers_skill_install_note()}
          </p>
        </div>
      }
    />
  )
}
