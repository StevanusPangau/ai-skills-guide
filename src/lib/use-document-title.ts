import { useEffect } from 'react'

const BASE_TITLE = 'AI Skills Guide'

/**
 * Set the document title for the current route, restoring the base title
 * on unmount. Keeps tab titles meaningful in a client-side SPA (no SSR).
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE
    return () => {
      document.title = BASE_TITLE
    }
  }, [title])
}
