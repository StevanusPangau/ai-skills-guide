import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  expoSkills,
  EXPO_SOURCE_REPO,
  EXPO_SOURCE_SHA,
  type RichSkill,
} from '@/data/expo-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/expo/skills/$skillName')({
  loader: ({ params }) => {
    const index = expoSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: ExpoSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('expo', {
  label: 'Expo',
  skillPath: '/expo/skills/$skillName',
  indexPath: '/expo',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function ExpoSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = expoSkills[index]
  return (
    <SkillPage
      view={richToView(skill, expoSkills, {
        sourceUrl: githubBlobUrl(EXPO_SOURCE_REPO, EXPO_SOURCE_SHA, skill.sourcePath),
      })}
      ctx={ctx}
      prev={neighbour(expoSkills, index - 1, summaryOf)}
      next={neighbour(expoSkills, index + 1, summaryOf)}
      position={index + 1}
      total={expoSkills.length}
      install={
        <SkillInstallBlock
          source="expo/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
