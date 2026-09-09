import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  CloudflareOverview,
} from '@/features/cloudflare/guide'
import { CloudflareConcepts } from '@/features/cloudflare/concepts'
import { CloudflareInstall } from '@/features/cloudflare/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { cloudflareSkills } from '@/data/cloudflare-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/cloudflare/')({
  component: CloudflareIndexPage,
})

function CloudflareIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.cloudflare_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      {
        id: 'skills',
        label: m.cloudflare_sidebar_skills({ count: String(cloudflareSkills.length) }),
      },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Workers Platform', value: 'workers-platform' },
    { label: 'Compute & State', value: 'compute-state' },
    { label: 'Security & Access', value: 'security-access' },
    { label: 'Messaging', value: 'messaging' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.cloudflare_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.cloudflare_footer()}</p>}
    >
      <CloudflareOverview />
      <CloudflareConcepts />
      <StandardSkillsSection
        collectionSlug="cloudflare"
        skills={cloudflareSkills}
        categories={categories}
        title={m.cloudflare_catalog_title({ count: String(cloudflareSkills.length) })}
        description={m.cloudflare_catalog_desc()}
        repoUrl="github.com/cloudflares/skills"
      />
      <CloudflareInstall />
    </CollectionGuideLayout>
  )
}
