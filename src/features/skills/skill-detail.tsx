import { Badge } from '@/components/ui/badge'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { RiLightbulbLine } from '@remixicon/react'
import type { Skill } from '@/types/skill'
import { getOfficialTitle, getWhenNotToUse } from '@/types/skill'
import { m } from '@/paraglide/messages.js'

/** Full skill body — used inside the catalog modal. */
export function SkillDetailBody({ skill }: { skill: Skill }) {
  const whenNotToUse = getWhenNotToUse(skill)

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{getOfficialTitle(skill)}</p>
      <p className="text-sm leading-relaxed">{skill.description}</p>

      {skill.detailedDescription && (
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          {skill.detailedDescription}
        </p>
      )}

      <Section title={m.skill_detail_when_to_use()}>
        <p className="text-sm leading-relaxed">{skill.whenToUse}</p>
      </Section>

      {whenNotToUse && (
        <Section title={m.skill_detail_when_not_to_use()}>
          <p className="text-sm leading-relaxed">{whenNotToUse}</p>
        </Section>
      )}

      {skill.keyBehaviors.length > 0 && (
        <Section title={m.skill_detail_key_behaviors()}>
          <ul className="space-y-1">
            {skill.keyBehaviors.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 text-primary">•</span>
                {b}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(skill.howItWorks ?? []).length > 0 && (
        <Section title={m.skill_detail_how_it_works()}>
          <ol className="list-inside list-decimal space-y-1.5">
            {skill.howItWorks!.map((step, i) => (
              <li key={i} className="text-sm">
                {step}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {(skill.itsWorkingIf ?? []).length > 0 && (
        <Section title={m.skill_detail_its_working_if()}>
          <ul className="space-y-1">
            {skill.itsWorkingIf!.map((sign, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 text-emerald-600">✓</span>
                {sign}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {skill.workflow && (
        <Section title={m.skill_detail_workflow()}>
          <div className="rounded-md bg-secondary/50 p-3 font-mono text-xs">
            {skill.workflow}
          </div>
        </Section>
      )}

      {(skill.tips ?? []).length > 0 && (
        <Section title={m.skill_detail_tips()}>
          <ul className="space-y-1">
            {skill.tips!.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <RiLightbulbLine className="mt-0.5 size-4 shrink-0 text-orange-600" />
                {tip}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(skill.pairsWellWith ?? []).length > 0 && (
        <Section title={m.skill_detail_pairs_well_with()}>
          <div className="flex flex-wrap gap-1.5">
            {skill.pairsWellWith!.map((name) => (
              <Badge key={name} variant="outline" className="font-mono text-xs">
                /{name}
              </Badge>
            ))}
          </div>
        </Section>
      )}

      <SkillInstallBlock source="mattpocock/skills" skillName={skill.name} />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h4>
      {children}
    </div>
  )
}
