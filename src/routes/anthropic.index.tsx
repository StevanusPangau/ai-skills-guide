import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  AnthropicOverview,
} from '@/features/anthropic/guide'
import { AnthropicConcepts } from '@/features/anthropic/concepts'
import { AnthropicEvalArena } from '@/features/anthropic/arena'
import { AnthropicWorkflows } from '@/features/anthropic/workflows'
import { AnthropicInstall } from '@/features/anthropic/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { anthropicSkills } from '@/data/anthropic-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/anthropic/')({
  component: AnthropicIndexPage,
})

function AnthropicIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.anthropic_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'eval-arena', label: m.anthropic_sidebar_arena() },
      {
        id: 'skills',
        label: m.anthropic_sidebar_skills({ count: String(anthropicSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Document Creation', value: 'document-creation' },
    { label: 'Design & Brand', value: 'design-brand' },
    { label: 'Agent Development', value: 'agent-development' },
    { label: 'Writing & Comms', value: 'writing-comms' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.anthropic_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.anthropic_footer()}</p>}
    >
      <AnthropicOverview />
      <AnthropicConcepts />
      <AnthropicEvalArena />
      <StandardSkillsSection
        collectionSlug="anthropic"
        skills={anthropicSkills}
        categories={categories}
        title={m.anthropic_catalog_title({ count: String(anthropicSkills.length) })}
        description={m.anthropic_catalog_desc()}
        repoUrl="github.com/anthropics/skills"
      />
      <AnthropicWorkflows />
      <AnthropicInstall />
    </CollectionGuideLayout>
  )
}
