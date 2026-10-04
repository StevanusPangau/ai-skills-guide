import { useEffect, useRef, useState, type ComponentType } from 'react'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import { PlaybackBar } from '@/features/motion/primitives'
import { usePlayback, type Playback } from '@/features/motion/use-playback'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { emilCategoryLabel } from './labels'
import {
  AuditDemo,
  GestureDemo,
  OpportunityDemo,
  PopoverDemo,
  ReviewDemo,
  VocabularyDemo,
} from './preview-demos'
import { AnimateDemo, BreakDemo, MobileDemo } from './preview-demos-new'

// Skills with a visual demo. animate-expo (native), ask-sonner, write-swift,
// pick-ui-library and prototype are deliberately left out.
const DEMOS: Record<string, ComponentType<{ playback: Playback }>> = {
  'emil-design-eng': PopoverDemo,
  'apple-design': GestureDemo,
  'animation-vocabulary': VocabularyDemo,
  'find-animation-opportunities': OpportunityDemo,
  animate: AnimateDemo,
  'mobile-native': MobileDemo,
  'review-animations': ReviewDemo,
  'improve-animations': AuditDemo,
  'break-ui': BreakDemo,
}

const GROUPS: { label: () => string; names: string[] }[] = [
  {
    label: () => m.emil_preview_group_principles(),
    names: ['emil-design-eng', 'apple-design', 'animation-vocabulary'],
  },
  {
    label: () => m.emil_preview_group_build(),
    names: ['find-animation-opportunities', 'animate', 'mobile-native'],
  },
  {
    label: () => m.emil_preview_group_review(),
    names: ['review-animations', 'improve-animations', 'break-ui'],
  },
]

const previewSkills = emilkowalskiSkills.filter((item) => item.name in DEMOS)

export function EmilPreviewLab() {
  const [skillName, setSkillName] = useState(GROUPS[0].names[0])
  const playback = usePlayback()
  const skill = previewSkills.find((item) => item.name === skillName) ?? previewSkills[0]
  const Demo = DEMOS[skill.name]
  const selectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    selectorRef.current
      ?.querySelector<HTMLElement>('[aria-pressed="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [skillName])

  return (
    <section id="preview" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.emil_preview_title()}
        </h2>
        <p className="mt-1 max-w-3xl text-muted-foreground">
          {m.emil_preview_description({
            count: String(previewSkills.length),
            total: String(emilkowalskiSkills.length),
          })}
        </p>
      </div>

      <div
        ref={selectorRef}
        role="group"
        aria-label={m.emil_preview_choose_skill()}
        className="-mx-1 flex gap-5 overflow-x-auto px-1 pb-2"
      >
        {GROUPS.map((group) => (
          <div key={group.label()} role="group" aria-label={group.label()} className="shrink-0 space-y-1.5">
            <p className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.label()}
            </p>
            <div className="flex gap-1.5">
              {group.names.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={name === skill.name}
                  onClick={() => setSkillName(name)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 font-mono text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                    name === skill.name
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card hover:border-primary/50',
                  )}
                >
                  /{name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-3 shadow-xs sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm font-bold">/{skill.name}</p>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {emilCategoryLabel(skill.category)}
            </span>
          </div>
          <PlaybackBar playback={playback} />
        </div>
        <Demo key={`${skill.name}-${playback.runKey}`} playback={playback} />
      </div>
    </section>
  )
}
