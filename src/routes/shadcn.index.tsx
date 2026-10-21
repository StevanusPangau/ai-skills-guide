import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { ShadcnOverview } from '@/features/shadcn/guide'
import { ShadcnConcepts } from '@/features/shadcn/concepts'
import { ShadcnContextLab } from '@/features/shadcn/lab'
import { ShadcnWorkflows } from '@/features/shadcn/workflows'
import { ShadcnInstall } from '@/features/shadcn/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import {
  shadcnSkills,
  SHADCN_CATEGORIES,
  SHADCN_SOURCE_REPO,
  SHADCN_SOURCE_SHA,
} from '@/data/shadcn-skills'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/shadcn/')({
  component: ShadcnIndexPage,
})

function ShadcnIndexPage() {
  useDocumentTitle(m.shadcn_hero_title(), m.collection_shadcn_description())

  const sections = useMemo(
    () => [
      { id: 'overview', label: m.shadcn_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'shadcn-lab', label: m.shadcn_sidebar_lab() },
      {
        id: 'skills',
        label: m.shadcn_sidebar_skills({ count: String(shadcnSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.shadcn_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.shadcn_footer()}</p>}
    >
      <ShadcnOverview />
      <ShadcnConcepts />
      <ShadcnContextLab />
      <StandardSkillsSection
        collectionSlug="shadcn"
        skills={shadcnSkills}
        categories={SHADCN_CATEGORIES}
        title={m.shadcn_catalog_title({ count: String(shadcnSkills.length) })}
        description={m.shadcn_catalog_desc()}
        repoUrl={SHADCN_SOURCE_REPO}
        sourceSha={SHADCN_SOURCE_SHA}
      />
      <ShadcnWorkflows />
      <ShadcnInstall />
    </CollectionGuideLayout>
  )
}
