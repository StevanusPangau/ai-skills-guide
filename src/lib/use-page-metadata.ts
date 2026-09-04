import { useEffect } from 'react'
import { getLocale } from '@/paraglide/runtime.js'

const SITE_NAME = 'AI Skills Guide'
const SITE_URL = 'https://skills.stevanuspangau.dev'

type PageMetadata = {
  title?: string
  description: string
  path?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = url
}

/** Keep route-specific search and social metadata aligned in the client SPA. */
export function usePageMetadata({ title, description, path, type = 'website', noindex = false }: PageMetadata) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = `${SITE_URL}${path ?? window.location.pathname}`

  useEffect(() => {
    const locale = getLocale()
    document.title = pageTitle
    document.documentElement.lang = locale
    setCanonical(canonicalUrl)
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex,follow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    )
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', locale === 'en' ? 'en_US' : 'id_ID')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }, [canonicalUrl, description, noindex, pageTitle, type])
}
