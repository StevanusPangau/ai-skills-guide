import { externalLinkAriaLabel } from '@/lib/external-link'
import { cn } from '@/lib/utils'

function xProfileUrl(handle: string): string {
  return `https://x.com/${handle.replace(/^@/, '')}`
}

type XHandleLinkProps = {
  handle: string
  className?: string
}

/** Inline @handle that opens the author's X profile in a new tab. */
export function XHandleLink({ handle, className }: XHandleLinkProps) {
  const clean = handle.replace(/^@/, '')
  const label = `@${clean}`

  return (
    <a
      href={xProfileUrl(clean)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'rounded-sm text-muted-foreground/80 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        className,
      )}
      aria-label={externalLinkAriaLabel(label)}
    >
      {label}
    </a>
  )
}
