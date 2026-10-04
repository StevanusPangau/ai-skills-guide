import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  impeccableSkills,
  IMPECCABLE_SKILL_NAME,
  IMPECCABLE_SOURCE_REPO,
  IMPECCABLE_SOURCE_SHA,
  type RichSkill,
} from '@/data/impeccable-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

// Commands that take no target argument (see command-metadata.json argumentHint).
const NO_TARGET = new Set(['init', 'document', 'live', 'doctor'])

export const Route = createFileRoute('/impeccable/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { impeccableSkills } = await import('@/data/impeccable-skills')
    const index = impeccableSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: ImpeccableSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('impeccable', {
  label: 'Impeccable',
  skillPath: '/impeccable/skills/$skillName',
  indexPath: '/impeccable',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function ImpeccableSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = impeccableSkills[index]
  const isEn = isEnglish()
  return (
    <SkillPage
      view={richToView(skill, impeccableSkills, {
        displayName: `${IMPECCABLE_SKILL_NAME} ${skill.name}`,
        invokeCommand: `/${IMPECCABLE_SKILL_NAME} ${skill.name}${NO_TARGET.has(skill.name) ? '' : ' [target]'}`,
        sourceUrl: githubBlobUrl(IMPECCABLE_SOURCE_REPO, IMPECCABLE_SOURCE_SHA, skill.sourcePath),
        extra: {
          // Always user-invoked: it is a command of the single /impeccable skill.
          invocation: 'user',
          installNotice: (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {isEn
                ? 'Impeccable installs as one skill; all commands come with it. Recommended: npx impeccable install, then /impeccable init.'
                : 'Impeccable di-install sebagai satu skill; semua command ikut terpasang. Disarankan: npx impeccable install, lalu /impeccable init.'}
            </p>
          ),
        },
      })}
      ctx={ctx}
      prev={neighbour(impeccableSkills, index - 1, summaryOf)}
      next={neighbour(impeccableSkills, index + 1, summaryOf)}
      position={index + 1}
      total={impeccableSkills.length}
      install={
        <SkillInstallBlock
          source="pbakaus/impeccable"
          skillName={IMPECCABLE_SKILL_NAME}
          hideHeading
        />
      }
    />
  )
}
