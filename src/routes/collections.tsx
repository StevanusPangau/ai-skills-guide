import { createFileRoute } from '@tanstack/react-router'
import { CollectionsPage } from '@/features/collections-page'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/collections')({
  component: CollectionsRoute,
})

function CollectionsRoute() {
  useDocumentTitle(m.collections_page_title())
  return <CollectionsPage />
}
