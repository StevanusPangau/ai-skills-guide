import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

const sizeClass = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
} as const

const sizePx = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
} as const

export type AuthorAvatarSize = keyof typeof sizeClass

type AuthorAvatarProps = {
  src: string
  name: string
  size?: AuthorAvatarSize
  className?: string
  /**
   * When true (default), treated as decorative — pair with visible name nearby.
   * When false, exposes an accessible alt label.
   */
  decorative?: boolean
}

/** Circular author portrait — self-hosted under /avatars. */
export function AuthorAvatar({
  src,
  name,
  size = 'sm',
  className,
  decorative = true,
}: AuthorAvatarProps) {
  const px = sizePx[size]
  return (
    <img
      src={src}
      alt={decorative ? '' : m.author_avatar_alt({ name })}
      width={px}
      height={px}
      decoding="async"
      className={cn(
        'shrink-0 rounded-full bg-muted object-cover ring-1 ring-border/80 ring-offset-1 ring-offset-background',
        sizeClass[size],
        className,
      )}
      aria-hidden={decorative ? true : undefined}
    />
  )
}

type AuthorBylineProps = {
  name: string
  avatarSrc: string
  size?: AuthorAvatarSize
  /** Optional secondary line (e.g. @handle) */
  handle?: string
  className?: string
}

/** Avatar + name chip for skill cards and collection rows. */
export function AuthorByline({
  name,
  avatarSrc,
  size = 'xs',
  handle,
  className,
}: AuthorBylineProps) {
  return (
    <span
      className={cn(
        'inline-flex min-w-0 items-center gap-2 text-muted-foreground',
        className,
      )}
    >
      <AuthorAvatar src={avatarSrc} name={name} size={size} />
      <span className="min-w-0 truncate text-xs leading-tight">
        <span className="font-medium text-foreground/90">{name}</span>
        {handle ? (
          <span className="text-muted-foreground/80"> · @{handle}</span>
        ) : null}
      </span>
    </span>
  )
}
