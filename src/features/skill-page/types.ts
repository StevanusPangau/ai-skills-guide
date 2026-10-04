import type { ReactNode } from 'react'

export type SkillLink = { name: string; summary: string }

export type SkillFact = { label: string; value: string }

export type SkillBadge = {
  label: string
  tone?: 'default' | 'secondary' | 'outline' | 'danger'
}

/** Extra collection-specific section (prerequisites, support files, ...). */
export type SkillExtraSection = {
  id: string
  title: string
  /** Rendered as mono chips. */
  chips?: string[]
  /** Rendered as links (e.g. source files). */
  links?: { label: string; href: string }[]
  body?: string
}

/**
 * Collection-agnostic view of one skill. Each collection adapts its own data
 * record into this shape (already resolved for the active locale), so every
 * skill page gets the same rich layout without per-collection copies.
 */
export type SkillView = {
  name: string
  /** Text shown after the slash in the title, e.g. `impeccable audit`. */
  displayName?: string
  invocation: 'user' | 'model'
  category: string
  /** Optional one-line headline shown under the title (e.g. an official title). */
  tagline?: string
  summary: string
  /** Longer explanation; may contain paragraph breaks. */
  detail?: string
  badges?: SkillBadge[]
  /** Extra rows in "Quick facts" (license, risk, compatibility, ...). */
  facts?: SkillFact[]
  useWhen: string[]
  avoidWhen: string[]
  steps: string[]
  rules: string[]
  tips: string[]
  signs?: string[]
  workflow?: string
  output?: string
  spotlight?: { title: string; body: string }
  extraSections?: SkillExtraSection[]
  pairs: SkillLink[]
  sourceUrl?: string
  sourcePath?: string
  /** Command typed by the user, defaults to `/<name>`. */
  invokeCommand?: string
  /** Slot above the install block (license warnings, plugin notes...). */
  installNotice?: ReactNode
  /** Prompt-ready text for the "copy as agent rule" button. */
  agentRule: {
    name: string
    description: string
    useWhen: string[]
    coreRules: string[]
    howItWorks?: string[]
  }
}

export type SkillCollectionContext = {
  slug: string
  /** Label in breadcrumb and "back" link. */
  label: string
  /** Typed route pattern for skill pages, e.g. `/vercel/skills/$skillName`. */
  skillPath: string
  /** Typed route for the collection's catalog page. */
  indexPath: string
  authorName?: string
  authorHandle?: string
  avatarSrc?: string
  catalogHash?: string
}
