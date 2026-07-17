import { prefersReducedMotion } from '@/lib/motion'

/**
 * In-page section scroll for this SPA.
 *
 * Why not only rely on TanStack `hashScrollIntoView`?
 * With `scrollRestoration: true` the router sets `history.scrollRestoration =
 * "manual"` and runs its own onRendered scroll pipeline. Pairing that with a
 * separate `scrollTo`/`scrollIntoView` (or `history.replaceState`) races and
 * often cancels motion — which matched the “click does nothing” bug.
 *
 * Working approach (best practice for in-page anchors in TSR apps):
 * 1. Update the hash via `navigate` with **no** router scrolling
 *    (`hashScrollIntoView: false`, `resetScroll: false`).
 * 2. After navigation settles, call native `element.scrollIntoView` once.
 *
 * Performance: one native compositor scroll (no rAF tween, no library).
 * `prefers-reduced-motion` → instant jump.
 *
 * @see https://tanstack.com/router/latest/docs/framework/react/guide/scroll-restoration
 */

/** Sticky site header height (`h-14` / 3.5rem). */
export const HEADER_SCROLL_OFFSET = 56
/** Scroll-spy activation line: header + breathing room. */
export const SCROLL_SPY_TRIGGER = HEADER_SCROLL_OFFSET + 96

export function getHashScrollIntoViewOptions(): ScrollIntoViewOptions {
  return {
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
    inline: 'nearest',
  }
}

export function currentHashId(): string {
  return window.location.hash.replace(/^#/, '')
}

export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView(getHashScrollIntoViewOptions())
  return true
}

type SectionNavigate = (opts: {
  hash?: string
  replace?: boolean
  resetScroll?: boolean
  hashScrollIntoView?: boolean | ScrollIntoViewOptions
}) => Promise<void>

export async function navigateToSection(
  navigate: SectionNavigate,
  id: string,
): Promise<boolean> {
  // Re-query after await — navigation can re-render the tree.
  if (!document.getElementById(id)) return false

  const opts = getHashScrollIntoViewOptions()

  // Same hash: router treats navigation as a no-op — scroll ourselves.
  if (currentHashId() === id) {
    document.getElementById(id)?.scrollIntoView(opts)
    return true
  }

  // Hash-only navigation with router scroll fully disabled so it cannot
  // restore a cached window Y (often 0) over our smooth scroll.
  await navigate({
    hash: id,
    replace: true,
    resetScroll: false,
    hashScrollIntoView: false,
  })

  const el = document.getElementById(id)
  if (!el) return false

  // Next frame: layout + sticky header scroll-margin are settled.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })

  el.scrollIntoView(opts)
  return true
}

/**
 * On sibling skill detail navigation (same route, new param): jump to top and
 * clear the section hash via the router — never raw `history.replaceState`
 * (desyncs TanStack location when scrollRestoration is on).
 */
export async function resetSkillDetailScroll(
  navigate: SectionNavigate,
  opts: { isFirstMount: boolean; skillChanged: boolean },
): Promise<void> {
  if (opts.isFirstMount) {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return
  }
  if (!opts.skillChanged) return

  window.scrollTo({ top: 0, behavior: 'instant' })
  if (!window.location.hash) return

  await navigate({
    hash: '',
    replace: true,
    resetScroll: false,
    hashScrollIntoView: false,
  })
}
