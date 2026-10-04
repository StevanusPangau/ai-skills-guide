import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  anthropicSkills,
  ANTHROPIC_SOURCE_REPO,
  ANTHROPIC_SOURCE_SHA,
  ANTHROPIC_SKILL_LICENSES,
  type RichSkill,
} from '@/data/anthropic-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { m } from '@/paraglide/messages.js'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'

export const Route = createFileRoute('/anthropic/skills/$skillName')({
  loader: ({ params }) => {
    const index = anthropicSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: AnthropicSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('anthropic', {
  label: 'Anthropic',
  skillPath: '/anthropic/skills/$skillName',
  indexPath: '/anthropic',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function AnthropicSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = anthropicSkills[index]
  const license = ANTHROPIC_SKILL_LICENSES[skill.name] ?? 'none'
  return (
    <SkillPage
      view={richToView(skill, anthropicSkills, {
        sourceUrl: githubBlobUrl(ANTHROPIC_SOURCE_REPO, ANTHROPIC_SOURCE_SHA, skill.sourcePath),
        extra: {
          badges: [
            {
              label:
                license === 'apache-2.0'
                  ? m.anthropic_license_apache()
                  : license === 'proprietary'
                    ? m.anthropic_license_proprietary()
                    : m.anthropic_license_none(),
              tone: license === 'proprietary' ? 'danger' : 'outline',
            },
          ],
          installNotice:
            license === 'proprietary' ? (
              <div
                role="note"
                className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm leading-relaxed text-foreground"
              >
                <p className="font-semibold text-destructive">
                  {m.anthropic_license_warning_title()}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {m.anthropic_license_warning_body()}
                </p>
              </div>
            ) : null,
        },
      })}
      ctx={ctx}
      prev={neighbour(anthropicSkills, index - 1, summaryOf)}
      next={neighbour(anthropicSkills, index + 1, summaryOf)}
      position={index + 1}
      total={anthropicSkills.length}
      install={
        <SkillInstallBlock
          source="anthropics/skills"
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
