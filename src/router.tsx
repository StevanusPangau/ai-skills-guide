import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  // Keep SPA back/forward positions. In-page section jumps intentionally set
  // hashScrollIntoView: false + resetScroll: false, then scroll natively
  // (see src/lib/scroll-to-section.ts) so restoration does not cancel motion.
  scrollRestoration: true,
  // Route changes should jump, not animate.
  scrollRestorationBehavior: 'instant',
  defaultOnCatch: () => {
    // If a dynamic import fails (stale hash after deploy), reload the page
    // to get the latest HTML with correct asset references.
    window.location.reload()
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
