import { RiGithubFill } from '@remixicon/react'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { emilSourceUrl, type EmilSkill } from '@/data/emilkowalski-skills'
import { externalLinkAriaLabel } from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

export function EmilSkillDetailBody({ skill }: { skill: EmilSkill }) {
  return (
    <div className="space-y-7">
      <DetailSection id="use-when" title={m.emil_detail_use_when()} items={skill.useWhen} />
      <DetailSection id="avoid-when" title={m.emil_detail_avoid_when()} items={skill.avoidWhen} />
      <div id="output" className="scroll-mt-20">
        <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{m.emil_detail_output()}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{skill.output}</p>
      </div>
      <DetailSection id="core-rules" title={m.emil_detail_core_rules()} items={skill.coreRules} />
      <div id="source" className="scroll-mt-20 space-y-2">
        <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{m.emil_detail_source_files()}</h2>
        <ul className="space-y-2">
          {[skill.sourcePath, ...(skill.supportFiles ?? [])].map((path) => (
            <li key={path}>
              <a href={emilSourceUrl(path)} target="_blank" rel="noopener noreferrer" className="flex w-fit max-w-full items-center gap-1.5 break-all rounded-sm font-mono text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50" aria-label={externalLinkAriaLabel(path)}>
                <RiGithubFill className="size-4 shrink-0" aria-hidden="true" />{path}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div id="install" className="scroll-mt-20"><SkillInstallBlock source="emilkowalski/skills" skillName={skill.name} /></div>
    </div>
  )
}

function DetailSection({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{title}</h2>
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span><span>{item}</span></li>)}
      </ul>
    </div>
  )
}
