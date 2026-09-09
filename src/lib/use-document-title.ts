import { usePageMetadata } from '@/lib/use-page-metadata'
import { m } from '@/paraglide/messages.js'

/**
 * Set route-aware title, canonical URL, description, and social metadata.
 * Callers may pass a more specific description when the route has one.
 */
export function useDocumentTitle(title?: string, description?: string) {
  usePageMetadata({
    title,
    description:
      description ??
      (title
        ? `${title}: panduan workflow, aturan, penggunaan, dan instalasi AI coding-agent skill.`
        : m.hero_description()),
  })
}
