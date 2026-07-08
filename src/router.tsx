import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
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
