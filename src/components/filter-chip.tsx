import { badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type FilterChipProps = {
  pressed: boolean
  onClick: () => void
  children: React.ReactNode
}

/** Toggle chip for catalog filters — real button + aria-pressed. */
export function FilterChip({ pressed, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        badgeVariants({ variant: pressed ? 'default' : 'outline' }),
        'cursor-pointer transition-colors',
      )}
    >
      {children}
    </button>
  )
}
