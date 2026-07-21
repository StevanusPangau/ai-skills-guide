import { useMemo, Fragment } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { Overview } from '@/features/overview'
import { MainFlow } from '@/features/main-flow'
import { SkillsSection } from '@/features/skills/skills-section'
import { Workflows } from '@/features/workflows'
import { Concepts } from '@/features/concepts'
import { Installation } from '@/features/installation'
import { Separator } from '@/components/ui/separator'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/mattpocock')({
  component: MattPocockPage,
})

function MattPocockPage() {
  useDocumentTitle('Matt Pocock')

  // Locale switch reloads the page, so labels are stable for this mount.
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.sidebar_overview() },
      { id: 'flow', label: m.sidebar_flow() },
      { id: 'skills', label: m.sidebar_skills() },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const sectionsContent = [
    <Overview key="overview" />,
    <MainFlow key="flow" />,
    <SkillsSection key="skills" />,
    <Workflows key="workflows" />,
    <Concepts key="concepts" />,
    <Installation key="installation" />,
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      subtitle={m.sidebar_subtitle()}
      stats={m.sidebar_stats()}
      footer={
        <p className="text-center text-xs text-muted-foreground">
          {m.footer_mattpocock()}
        </p>
      }
    >
      {sectionsContent.map((section, i) => (
        <Fragment key={section.key}>
          {i > 0 ? <Separator /> : null}
          {section}
        </Fragment>
      ))}
    </CollectionGuideLayout>
  )
}
