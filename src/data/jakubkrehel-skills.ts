export const JAKUBKREHEL_SOURCE_REPO = 'github.com/jakubkrehel/skills'
export const JAKUBKREHEL_SOURCE_SHA = 'main'

export type JakubSkill = {
  name: string
  description: string
  category: string
  useWhen: string[]
  avoidWhen: string[]
  coreRules: string[]
  sourcePath: string
}

export const jakubkrehelSkills: JakubSkill[] = [
  {
    name: 'better-accessibility',
    category: 'a11y',
    description: 'Helps your project comply with accessibility standards and best practices.',
    useWhen: ['Saat mengerjakan task terkait better-accessibility'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-accessibility'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-accessibility/SKILL.md'],
    sourcePath: 'skills/better-accessibility/SKILL.md',
  },
  {
    name: 'better-colors',
    category: 'color',
    description: 'Helps you build a color system and answer anything about color in your project. You can generate palettes, use semantic tokens, convert between formats, check contrast and more.',
    useWhen: ['Saat mengerjakan task terkait better-colors'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-colors'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-colors/SKILL.md'],
    sourcePath: 'skills/better-colors/SKILL.md',
  },
  {
    name: 'better-interface',
    category: 'meta',
    description: 'Combines all of the `better-*` skills into a single review across accessibility, layout, writing, typography, color and UI polish.',
    useWhen: ['Saat mengerjakan task terkait better-interface'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-interface'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-interface/SKILL.md'],
    sourcePath: 'skills/better-interface/SKILL.md',
  },
  {
    name: 'better-layout',
    category: 'visual',
    description: 'Helps with grouping, alignment, reading order, progressive disclosure and other details that make a good layout.',
    useWhen: ['Saat mengerjakan task terkait better-layout'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-layout'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-layout/SKILL.md'],
    sourcePath: 'skills/better-layout/SKILL.md',
  },
  {
    name: 'better-typography',
    category: 'typography',
    description: 'Focuses on type scale, spacing, sizing, variable fonts, OpenType features, wrapping, truncation and other details that make typography feel great across your product.',
    useWhen: ['Saat mengerjakan task terkait better-typography'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-typography'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-typography/SKILL.md'],
    sourcePath: 'skills/better-typography/SKILL.md',
  },
  {
    name: 'better-ui',
    category: 'visual',
    description: 'Polishes and improves the UI in your project. Covers concentric border radius, optical alignment, surface depth, contextual icons, hit areas and more.',
    useWhen: ['Saat mengerjakan task terkait better-ui'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-ui'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-ui/SKILL.md'],
    sourcePath: 'skills/better-ui/SKILL.md',
  },
  {
    name: 'better-writing',
    category: 'testing',
    description: 'Focuses on improving product copy in your project.',
    useWhen: ['Saat mengerjakan task terkait better-writing'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik better-writing'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/better-writing/SKILL.md'],
    sourcePath: 'skills/better-writing/SKILL.md',
  },
  {
    name: 'break',
    category: 'testing',
    description: 'Renders a component you choose in every state and scenario on a temporary page and stress tests it.',
    useWhen: ['Saat mengerjakan task terkait break'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik break'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/break/SKILL.md'],
    sourcePath: 'skills/break/SKILL.md',
  },
  {
    name: 'explain-interface',
    category: 'meta',
    description: 'Helps you figure out how something was built on the web.',
    useWhen: ['Saat mengerjakan task terkait explain-interface'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik explain-interface'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/explain-interface/SKILL.md'],
    sourcePath: 'skills/explain-interface/SKILL.md',
  },
  {
    name: 'interface-review',
    category: 'meta',
    description: 'Reviews your work across multiple categories like UI, typography, layout, color, writing and accessibility and gives you a detailed analysis of the findings.',
    useWhen: ['Saat mengerjakan task terkait interface-review'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik interface-review'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/interface-review/SKILL.md'],
    sourcePath: 'skills/interface-review/SKILL.md',
  },
  {
    name: 'variant',
    category: 'visual',
    description: 'Builds multiple variants of a component you\'re working on and helps you iterate and pick one.',
    useWhen: ['Saat mengerjakan task terkait variant'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik variant'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/variant/SKILL.md'],
    sourcePath: 'skills/variant/SKILL.md',
  },
]
