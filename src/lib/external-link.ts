import { m } from '@/paraglide/messages.js'

/** Accessible name for links that open in a new tab. */
export function externalLinkAriaLabel(label: string): string {
  return `${label} (${m.opens_in_new_tab()})`
}

/** Shared focus + hover styles for inline external text links. */
export const externalTextLinkClass =
  'rounded-sm underline hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
