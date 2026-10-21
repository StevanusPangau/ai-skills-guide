import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { RemotionOverview } from '@/features/remotion/guide'
import { RemotionConcepts } from '@/features/remotion/concepts'
import { RemotionFrameLab } from '@/features/remotion/lab'
import { RemotionWorkflows } from '@/features/remotion/workflows'
import { RemotionInstall } from '@/features/remotion/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import {
  remotionSkills,
  REMOTION_CATEGORIES,
  REMOTION_SOURCE_REPO,
  REMOTION_SOURCE_SHA,
} from '@/data/remotion-skills'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/remotion/')({
  component: RemotionIndexPage,
})

function RemotionIndexPage() {
  useDocumentTitle(m.remotion_hero_title(), m.collection_remotion_description())

  const sections = useMemo(
    () => [
      { id: 'overview', label: m.remotion_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'remotion-lab', label: m.remotion_sidebar_lab() },
      {
        id: 'skills',
        label: m.remotion_sidebar_skills({ count: String(remotionSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.remotion_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.remotion_footer()}</p>}
    >
      <RemotionOverview />
      <RemotionConcepts />
      <RemotionFrameLab />
      <StandardSkillsSection
        collectionSlug="remotion"
        skills={remotionSkills}
        categories={REMOTION_CATEGORIES}
        title={m.remotion_catalog_title({ count: String(remotionSkills.length) })}
        description={m.remotion_catalog_desc()}
        repoUrl={REMOTION_SOURCE_REPO}
        sourceSha={REMOTION_SOURCE_SHA}
      />
      <RemotionWorkflows />
      <RemotionInstall />
    </CollectionGuideLayout>
  )
}
