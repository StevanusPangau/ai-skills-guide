import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { TanStackOverview } from '@/features/tanstack/guide'
import { TanStackConcepts } from '@/features/tanstack/concepts'
import { TanStackLab } from '@/features/tanstack/lab'
import { TanStackWorkflows } from '@/features/tanstack/workflows'
import { TanStackInstall } from '@/features/tanstack/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { tanstackSkills } from '@/data/tanstack-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/tanstack/')({
  component: TanStackIndexPage,
})

function TanStackIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.tanstack_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'reactive-lab', label: m.tanstack_sidebar_lab() },
      {
        id: 'skills',
        label: m.tanstack_sidebar_skills({ count: String(tanstackSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Routing Framework', value: 'routing-framework' },
    { label: 'State & Fetching', value: 'state-fetching' },
    { label: 'Headless UI', value: 'headless-ui' },
    { label: 'Form Management', value: 'form-management' },
    { label: 'Fullstack Framework', value: 'fullstack-framework' },
    { label: 'Performance UI', value: 'performance-ui' },
    { label: 'State Management', value: 'state-management' },
    { label: 'AI SDK', value: 'ai-sdk' },
    { label: 'Client Database', value: 'client-database' },
    { label: 'Developer Tools', value: 'developer-tools' },
    { label: 'CLI Tooling', value: 'cli-tooling' },
    { label: 'Tooling & Monorepo', value: 'tooling-monorepo' },
    { label: 'Timing Utilities', value: 'timing-utilities' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.tanstack_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.tanstack_footer()}</p>}
    >
      <TanStackOverview />
      <TanStackConcepts />
      <TanStackLab />
      <StandardSkillsSection
        collectionSlug="tanstack"
        skills={tanstackSkills}
        categories={categories}
        title={m.tanstack_catalog_title({ count: String(tanstackSkills.length) })}
        description={m.tanstack_catalog_desc()}
        repoUrl="github.com/tanstack-skills/tanstack-skills"
      />
      <TanStackWorkflows />
      <TanStackInstall />
    </CollectionGuideLayout>
  )
}
