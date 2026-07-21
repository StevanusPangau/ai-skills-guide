import { useMemo, Fragment } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { DavidOverview } from '@/features/davidondrej/overview'
import { DavidMainFlow } from '@/features/davidondrej/main-flow'
import { DavidCatalog } from '@/features/davidondrej/catalog'
import { DavidWorkflows } from '@/features/davidondrej/workflows'
import { DavidConcepts } from '@/features/davidondrej/concepts'
import { DavidInstall } from '@/features/davidondrej/install'
import { Separator } from '@/components/ui/separator'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/davidondrej/')({
  component: DavidPage,
})

function DavidPage() {
  useDocumentTitle('David Ondrej')

  // Locale switch reloads the page, so labels are stable for this mount.
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.david_sidebar_overview() },
      { id: 'flow', label: m.david_sidebar_flow() },
      { id: 'catalog', label: m.david_sidebar_skills() },
      { id: 'workflows', label: m.david_sidebar_workflows() },
      { id: 'concepts', label: m.david_sidebar_concepts() },
      { id: 'installation', label: m.david_sidebar_installation() },
    ],
    [],
  )

  const sectionsContent = [
    <DavidOverview key="overview" />,
    <DavidMainFlow key="flow" />,
    <DavidCatalog key="catalog" />,
    <DavidWorkflows key="workflows" />,
    <DavidConcepts key="concepts" />,
    <DavidInstall key="installation" />,
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.david_sidebar_stats()}
      footer={
        <p className="text-center text-xs text-muted-foreground">
          {m.david_footer()}
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
