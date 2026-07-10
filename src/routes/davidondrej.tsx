import { createFileRoute, Outlet } from '@tanstack/react-router'

// Layout route for the David Ondrej collection. The collection landing lives in
// davidondrej.index.tsx; the per-skill detail in davidondrej.skills.$skillName.
// This parent only provides the nested Outlet so both render under /davidondrej.
export const Route = createFileRoute('/davidondrej')({
  component: () => <Outlet />,
})
