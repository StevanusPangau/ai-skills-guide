export const SUPERPOWERS_SOURCE_REPO = 'github.com/obra/superpowers'
export const SUPERPOWERS_SOURCE_SHA = 'main'

export type SuperpowersSkill = {
  name: string
  description: string
  category: string
  useWhen: string[]
  avoidWhen: string[]
  coreRules: string[]
  sourcePath: string
}

export const superpowersSkills: SuperpowersSkill[] = [
  {
    name: 'brainstorming',
    category: 'planning',
    description: 'You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.',
    useWhen: ['Saat mengerjakan task terkait brainstorming'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik brainstorming'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/brainstorming/SKILL.md'],
    sourcePath: 'skills/brainstorming/SKILL.md',
  },
  {
    name: 'dispatching-parallel-agents',
    category: 'execution',
    description: 'Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies',
    useWhen: ['Saat mengerjakan task terkait dispatching-parallel-agents'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik dispatching-parallel-agents'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/dispatching-parallel-agents/SKILL.md'],
    sourcePath: 'skills/dispatching-parallel-agents/SKILL.md',
  },
  {
    name: 'executing-plans',
    category: 'planning',
    description: 'Use when you have a written implementation plan to execute in a separate session with review checkpoints',
    useWhen: ['Saat mengerjakan task terkait executing-plans'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik executing-plans'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/executing-plans/SKILL.md'],
    sourcePath: 'skills/executing-plans/SKILL.md',
  },
  {
    name: 'finishing-a-development-branch',
    category: 'quality',
    description: 'Use when implementation is complete, all tests pass, and you need to decide how to integrate the work',
    useWhen: ['Saat mengerjakan task terkait finishing-a-development-branch'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik finishing-a-development-branch'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/finishing-a-development-branch/SKILL.md'],
    sourcePath: 'skills/finishing-a-development-branch/SKILL.md',
  },
  {
    name: 'receiving-code-review',
    category: 'quality',
    description: 'Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation',
    useWhen: ['Saat mengerjakan task terkait receiving-code-review'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik receiving-code-review'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/receiving-code-review/SKILL.md'],
    sourcePath: 'skills/receiving-code-review/SKILL.md',
  },
  {
    name: 'requesting-code-review',
    category: 'quality',
    description: 'Use when completing tasks, implementing major features, or before merging to verify work meets requirements',
    useWhen: ['Saat mengerjakan task terkait requesting-code-review'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik requesting-code-review'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/requesting-code-review/SKILL.md'],
    sourcePath: 'skills/requesting-code-review/SKILL.md',
  },
  {
    name: 'subagent-driven-development',
    category: 'execution',
    description: 'Use when executing implementation plans with independent tasks in the current session',
    useWhen: ['Saat mengerjakan task terkait subagent-driven-development'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik subagent-driven-development'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/subagent-driven-development/SKILL.md'],
    sourcePath: 'skills/subagent-driven-development/SKILL.md',
  },
  {
    name: 'systematic-debugging',
    category: 'quality',
    description: 'Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes',
    useWhen: ['Saat mengerjakan task terkait systematic-debugging'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik systematic-debugging'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/systematic-debugging/SKILL.md'],
    sourcePath: 'skills/systematic-debugging/SKILL.md',
  },
  {
    name: 'test-driven-development',
    category: 'quality',
    description: 'Use when implementing any feature or bugfix, before writing implementation code',
    useWhen: ['Saat mengerjakan task terkait test-driven-development'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik test-driven-development'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/test-driven-development/SKILL.md'],
    sourcePath: 'skills/test-driven-development/SKILL.md',
  },
  {
    name: 'using-git-worktrees',
    category: 'execution',
    description: 'Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback',
    useWhen: ['Saat mengerjakan task terkait using-git-worktrees'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik using-git-worktrees'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/using-git-worktrees/SKILL.md'],
    sourcePath: 'skills/using-git-worktrees/SKILL.md',
  },
  {
    name: 'using-superpowers',
    category: 'quality',
    description: 'Use when starting any conversation - establishes how to find and use skills, requiring skill invocation before ANY response including clarifying questions',
    useWhen: ['Saat mengerjakan task terkait using-superpowers'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik using-superpowers'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/using-superpowers/SKILL.md'],
    sourcePath: 'skills/using-superpowers/SKILL.md',
  },
  {
    name: 'verification-before-completion',
    category: 'quality',
    description: 'Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always',
    useWhen: ['Saat mengerjakan task terkait verification-before-completion'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik verification-before-completion'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/verification-before-completion/SKILL.md'],
    sourcePath: 'skills/verification-before-completion/SKILL.md',
  },
  {
    name: 'writing-plans',
    category: 'planning',
    description: 'Use when you have a spec or requirements for a multi-step task, before touching code',
    useWhen: ['Saat mengerjakan task terkait writing-plans'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik writing-plans'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/writing-plans/SKILL.md'],
    sourcePath: 'skills/writing-plans/SKILL.md',
  },
  {
    name: 'writing-skills',
    category: 'quality',
    description: 'Use when creating new skills, editing existing skills, or verifying skills work before deployment',
    useWhen: ['Saat mengerjakan task terkait writing-skills'],
    avoidWhen: ['Saat tidak relevan dengan cakupan spesifik writing-skills'],
    coreRules: ['Patuhi instruksi spesifik pada dokumen skills/writing-skills/SKILL.md'],
    sourcePath: 'skills/writing-skills/SKILL.md',
  },
]
