import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { NeonOverview } from '@/features/neon/guide'
import { NeonConcepts } from '@/features/neon/concepts'
import { NeonBranchLab } from '@/features/neon/lab'
import { NeonWorkflows } from '@/features/neon/workflows'
import { NeonInstall } from '@/features/neon/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import {
  neonSkills,
  NEON_CATEGORIES,
  NEON_SOURCE_REPO,
  NEON_SOURCE_SHA,
} from '@/data/neon-skills'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/neon/')({
  component: NeonIndexPage,
})

function NeonIndexPage() {
  useDocumentTitle(m.neon_hero_title(), m.collection_neon_description())

  const sections = useMemo(
    () => [
      { id: 'overview', label: m.neon_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'neon-lab', label: m.neon_sidebar_lab() },
      {
        id: 'skills',
        label: m.neon_sidebar_skills({ count: String(neonSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.neon_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.neon_footer()}</p>}
    >
      <NeonOverview />
      <NeonConcepts />
      <NeonBranchLab />
      <StandardSkillsSection
        collectionSlug="neon"
        skills={neonSkills}
        categories={NEON_CATEGORIES}
        title={m.neon_catalog_title({ count: String(neonSkills.length) })}
        description={m.neon_catalog_desc()}
        repoUrl={NEON_SOURCE_REPO}
        sourceSha={NEON_SOURCE_SHA}
      />
      <NeonWorkflows />
      <NeonInstall />
    </CollectionGuideLayout>
  )
}
