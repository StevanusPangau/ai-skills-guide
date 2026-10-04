import { createFileRoute, notFound } from '@tanstack/react-router'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  cloudflareSkills,
  CLOUDFLARE_SOURCE_REPO,
  CLOUDFLARE_SOURCE_SHA,
  type RichSkill,
} from '@/data/cloudflare-skills'
import {
  collectionContext,
  githubBlobUrl,
  isEnglish,
  neighbour,
  richToView,
} from '@/features/skill-page/adapters'
import { SkillPage, SkillPageNotFound } from '@/features/skill-page/skill-page'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/cloudflare/skills/$skillName')({
  // Dynamic import keeps this collection's data out of the entry bundle: route
  // loaders are not code-split, so a static import here would ship every
  // collection's skills on first paint.
  loader: async ({ params }) => {
    const { cloudflareSkills } = await import('@/data/cloudflare-skills')
    const index = cloudflareSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return { index }
  },
  component: CloudflareSkillPage,
  notFoundComponent: () => <SkillPageNotFound ctx={ctx} />,
})

const ctx = collectionContext('cloudflare', {
  label: 'Cloudflare',
  skillPath: '/cloudflare/skills/$skillName',
  indexPath: '/cloudflare',
})

function summaryOf(skill: RichSkill): string {
  return isEnglish() ? skill.description.en : skill.description.id
}

function CloudflareSkillPage() {
  const { index } = Route.useLoaderData()
  const skill = cloudflareSkills[index]
  const upstream = skill.upstream
  return (
    <SkillPage
      view={richToView(skill, cloudflareSkills, {
        sourceUrl: githubBlobUrl(
          upstream?.repo ?? CLOUDFLARE_SOURCE_REPO,
          upstream?.sha ?? CLOUDFLARE_SOURCE_SHA,
          skill.sourcePath,
        ),
        // A skill that lives in another repo shows where it comes from and under which license.
        extra: upstream
          ? {
              facts: [
                { label: m.skillpage_fact_license(), value: upstream.license },
                { label: m.skillpage_fact_repo(), value: upstream.repo.replace(/^github\.com\//, '') },
              ],
            }
          : undefined,
      })}
      ctx={ctx}
      prev={neighbour(cloudflareSkills, index - 1, summaryOf)}
      next={neighbour(cloudflareSkills, index + 1, summaryOf)}
      position={index + 1}
      total={cloudflareSkills.length}
      install={
        <SkillInstallBlock
          source={upstream ? upstream.repo.replace(/^github\.com\//, '') : 'cloudflare/skills'}
          skillName={skill.name}
          hideHeading
        />
      }
    />
  )
}
