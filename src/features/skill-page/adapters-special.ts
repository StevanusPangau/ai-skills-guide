import {
  davidCategoryLabels,
  davidSourceUrl,
  type DavidSkill,
} from '@/data/davidondrej-skills'
import { emilSourceUrl, type EmilSkill } from '@/data/emilkowalski-skills'
import {
  compatibilityLabel,
  riskLabel,
} from '@/features/davidondrej/badges'
import {
  emilCategoryLabel,
  emilModeLabel,
} from '@/features/emilkowalski/labels'
import { m } from '@/paraglide/messages.js'
import { getOfficialTitle, getWhenNotToUse, type Skill } from '@/types/skill'
import { categoryLabel } from './adapters'
import type { SkillView } from './types'

/** Matt Pocock collection: single-language records (Indonesian prose). */
export function mattpocockToView(skill: Skill, all: Skill[]): SkillView {
  const byName = new Map(all.map((s) => [s.name, s] as const))
  const official = getOfficialTitle(skill)
  const whenNotToUse = getWhenNotToUse(skill)
  const detail = skill.detailedDescription || undefined
  return {
    name: skill.name,
    invocation: skill.invocation,
    category: categoryLabel(skill.category),
    tagline: official !== skill.name ? official.replace(/^[^:]+:\s*/, '') : undefined,
    summary: skill.description,
    detail,
    useWhen: skill.whenToUse ? [skill.whenToUse] : [],
    avoidWhen: whenNotToUse ? [whenNotToUse] : [],
    steps: skill.howItWorks ?? [],
    rules: skill.keyBehaviors,
    tips: skill.tips ?? [],
    signs: skill.itsWorkingIf,
    workflow: skill.workflow,
    pairs: (skill.pairsWellWith ?? []).flatMap((name) => {
      const target = byName.get(name)
      return target ? [{ name, summary: target.description }] : []
    }),
    agentRule: {
      name: skill.name,
      description: detail || skill.description,
      useWhen: skill.whenToUse ? [skill.whenToUse] : [],
      coreRules: skill.keyBehaviors,
      howItWorks: skill.howItWorks,
    },
  }
}

/** David Ondrej collection: catalog records with compatibility and risk. */
export function davidToView(skill: DavidSkill): SkillView {
  return {
    name: skill.name,
    invocation: skill.invocation === 'manual' ? 'user' : 'model',
    category: davidCategoryLabels[skill.category],
    summary: skill.description,
    badges: [
      { label: compatibilityLabel(skill.compatibility), tone: 'outline' },
      {
        label: riskLabel(skill.risk),
        tone: skill.risk === 'high' ? 'danger' : 'secondary',
      },
    ],
    facts: [
      { label: m.skillpage_fact_compat(), value: compatibilityLabel(skill.compatibility) },
      { label: m.skillpage_fact_risk(), value: riskLabel(skill.risk) },
    ],
    useWhen: skill.useWhen ?? [],
    avoidWhen: skill.avoidWhen ?? [],
    steps: skill.steps ?? [],
    rules: skill.rules ?? [],
    tips: skill.tips ?? [],
    extraSections: [
      ...(skill.prerequisites?.length
        ? [
            {
              id: 'prerequisites',
              title: m.david_detail_prerequisites(),
              chips: skill.prerequisites,
            },
          ]
        : []),
      ...(skill.dependencies?.length
        ? [
            {
              id: 'dependencies',
              title: m.david_detail_dependencies(),
              chips: skill.dependencies,
            },
          ]
        : []),
      {
        id: 'adaptation',
        title: m.david_detail_adaptation(),
        body: skill.notes,
      },
    ],
    pairs: [],
    sourceUrl: davidSourceUrl(skill.sourcePath),
    sourcePath: skill.sourcePath,
    agentRule: {
      name: skill.name,
      description: `${skill.description}\n\n${skill.notes}`,
      useWhen: skill.useWhen ?? [],
      coreRules: skill.rules ?? [],
      howItWorks: skill.steps,
    },
  }
}

/** Emil Kowalski collection: read-only/build modes with support files. */
export function emilToView(skill: EmilSkill): SkillView {
  return {
    name: skill.name,
    invocation: skill.invocation === 'manual' ? 'user' : 'model',
    category: emilCategoryLabel(skill.category),
    summary: skill.description,
    badges: [{ label: emilModeLabel(skill.mode), tone: 'secondary' }],
    facts: [{ label: m.skillpage_fact_mode(), value: emilModeLabel(skill.mode) }],
    useWhen: skill.useWhen,
    avoidWhen: skill.avoidWhen,
    steps: [],
    rules: skill.coreRules,
    tips: [],
    output: skill.output,
    extraSections: [
      {
        id: 'source',
        title: m.emil_detail_source_files(),
        links: [skill.sourcePath, ...(skill.supportFiles ?? [])].map((path) => ({
          label: path,
          href: emilSourceUrl(path),
        })),
      },
    ],
    pairs: [],
    sourceUrl: emilSourceUrl(skill.sourcePath),
    sourcePath: skill.sourcePath,
    agentRule: {
      name: skill.name,
      description: skill.description,
      useWhen: skill.useWhen,
      coreRules: skill.coreRules,
    },
  }
}
