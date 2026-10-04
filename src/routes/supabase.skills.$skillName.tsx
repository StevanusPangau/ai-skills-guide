import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  supabaseSkills,
  SUPABASE_SOURCE_REPO,
  SUPABASE_SOURCE_SHA,
  type RichSkill,
} from '@/data/supabase-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/supabase/skills/$skillName')({
  loader: ({ params }) => {
    const index = supabaseSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: SupabaseSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('supabase', {
  label: 'Supabase',
  skillPath: '/supabase/skills/$skillName',
  indexPath: '/supabase',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function SupabaseSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = supabaseSkills[index]
  return (
    <SkillPage
      view={richToView(skill, supabaseSkills, {
        sourceUrl: githubBlobUrl(SUPABASE_SOURCE_REPO, SUPABASE_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(supabaseSkills, index - 1, summaryOf)}
      next={neighbour(supabaseSkills, index + 1, summaryOf)}
      position={index + 1}
      total={supabaseSkills.length}
      install={
        <SkillInstallBlock
          source="supabase/agent-skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
