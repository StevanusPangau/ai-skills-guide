import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  gsapSkills,
  GSAP_SOURCE_REPO,
  GSAP_SOURCE_SHA,
  type RichSkill,
} from '@/data/gsap-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/gsap/skills/$skillName')({
  loader: ({ params }) => {
    const index = gsapSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: GsapSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('gsap', {
  label: 'GSAP',
  skillPath: '/gsap/skills/$skillName',
  indexPath: '/gsap',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function GsapSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = gsapSkills[index]
  return (
    <SkillPage
      view={richToView(skill, gsapSkills, {
        sourceUrl: githubBlobUrl(GSAP_SOURCE_REPO, GSAP_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(gsapSkills, index - 1, summaryOf)}
      next={neighbour(gsapSkills, index + 1, summaryOf)}
      position={index + 1}
      total={gsapSkills.length}
      install={
        <SkillInstallBlock
          source="greensock/gsap-skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
