import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { SkillDetail } from '@/features/skills/skill-detail'
import type { Skill } from '@/types/skill'

function getBorderColor(skill: Skill): string {
  if (skill.category === 'engineering' && skill.invocation === 'user') return 'border-l-orange-700'
  if (skill.category === 'engineering' && skill.invocation === 'model') return 'border-l-violet-600'
  if (skill.category === 'productivity' && skill.invocation === 'user') return 'border-l-emerald-600'
  return 'border-l-sky-600'
}

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Accordion className="w-full">
      <AccordionItem
        value={skill.name}
        className={`rounded-lg border border-border border-l-4 ${getBorderColor(skill)} bg-card px-4 shadow-sm transition-colors hover:border-foreground/20`}
      >
        <AccordionTrigger className="py-5 hover:no-underline">
          <div className="flex flex-col items-start gap-2 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-semibold">/{skill.name}</span>
              <Badge variant="outline" className="text-xs">{skill.category}</Badge>
              <Badge variant={skill.invocation === 'user' ? 'default' : 'secondary'} className="text-xs">
                {skill.invocation}-invoked
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-normal leading-relaxed">{skill.description}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-5">
          <SkillDetail skill={skill} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
