import { useEffect } from 'react'
import { m } from '@/paraglide/messages.js'

/**
 * Set the document title for the current route, restoring the base title
 * on unmount. Keeps tab titles meaningful in a client-side SPA (no SSR).
 */
export function useDocumentTitle(title?: string) {
  const baseTitle = m.nav_ai_skills_guide()
  useEffect(() => {
    document.title = title ? `${title} — ${baseTitle}` : baseTitle
    return () => {
      document.title = baseTitle
    }
  }, [title, baseTitle])
}
