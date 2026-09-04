export const JAKUBKREHEL_SOURCE_REPO = 'github.com/jakubkrehel/skills'
export const JAKUBKREHEL_SOURCE_SHA = 'main'

export type JakubSkill = {
  name: string
  description: string
  category: string
  invocation: 'user' | 'model'
  useWhen: string[]
  avoidWhen: string[]
  coreRules: string[]
  sourcePath: string
}

export const jakubkrehelSkills: JakubSkill[] = [
  {
    name: "better-accessibility",
    category: "accessibility",
    invocation: "user",
    description: "Helps your project comply with accessibility standards and best practices.",
    useWhen: ["Gunakan /better-accessibility saat mengerjakan task terkait better-accessibility"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-accessibility"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-accessibility/SKILL.md"],
    sourcePath: "skills/better-accessibility/SKILL.md",
  },
  {
    name: "better-colors",
    category: "color",
    invocation: "user",
    description: "Helps you build a color system and answer anything about color in your project. You can generate palettes, use semantic tokens, convert between formats, check contrast and more.",
    useWhen: ["Gunakan /better-colors saat mengerjakan task terkait better-colors"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-colors"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-colors/SKILL.md"],
    sourcePath: "skills/better-colors/SKILL.md",
  },
  {
    name: "better-interface",
    category: "visual",
    invocation: "user",
    description: "Combines all of the `better-*` skills into a single review across accessibility, layout, writing, typography, color and UI polish.",
    useWhen: ["Gunakan /better-interface saat mengerjakan task terkait better-interface"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-interface"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-interface/SKILL.md"],
    sourcePath: "skills/better-interface/SKILL.md",
  },
  {
    name: "better-layout",
    category: "visual",
    invocation: "user",
    description: "Helps with grouping, alignment, reading order, progressive disclosure and other details that make a good layout.",
    useWhen: ["Gunakan /better-layout saat mengerjakan task terkait better-layout"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-layout"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-layout/SKILL.md"],
    sourcePath: "skills/better-layout/SKILL.md",
  },
  {
    name: "better-typography",
    category: "typography",
    invocation: "user",
    description: "Focuses on type scale, spacing, sizing, variable fonts, OpenType features, wrapping, truncation and other details that make typography feel great across your product.",
    useWhen: ["Gunakan /better-typography saat mengerjakan task terkait better-typography"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-typography"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-typography/SKILL.md"],
    sourcePath: "skills/better-typography/SKILL.md",
  },
  {
    name: "better-ui",
    category: "visual",
    invocation: "user",
    description: "Polishes and improves the UI in your project. Covers concentric border radius, optical alignment, surface depth, contextual icons, hit areas and more.",
    useWhen: ["Gunakan /better-ui saat mengerjakan task terkait better-ui"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-ui"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-ui/SKILL.md"],
    sourcePath: "skills/better-ui/SKILL.md",
  },
  {
    name: "better-writing",
    category: "engineering",
    invocation: "user",
    description: "Focuses on improving product copy in your project.",
    useWhen: ["Gunakan /better-writing saat mengerjakan task terkait better-writing"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup better-writing"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/better-writing/SKILL.md"],
    sourcePath: "skills/better-writing/SKILL.md",
  },
  {
    name: "break",
    category: "engineering",
    invocation: "user",
    description: "Renders a component you choose in every state and scenario on a temporary page and stress tests it.",
    useWhen: ["Gunakan /break saat mengerjakan task terkait break"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup break"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/break/SKILL.md"],
    sourcePath: "skills/break/SKILL.md",
  },
  {
    name: "explain-interface",
    category: "engineering",
    invocation: "user",
    description: "Helps you figure out how something was built on the web.",
    useWhen: ["Gunakan /explain-interface saat mengerjakan task terkait explain-interface"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup explain-interface"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/explain-interface/SKILL.md"],
    sourcePath: "skills/explain-interface/SKILL.md",
  },
  {
    name: "interface-review",
    category: "engineering",
    invocation: "user",
    description: "Reviews your work across multiple categories like UI, typography, layout, color, writing and accessibility and gives you a detailed analysis of the findings.",
    useWhen: ["Gunakan /interface-review saat mengerjakan task terkait interface-review"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup interface-review"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/interface-review/SKILL.md"],
    sourcePath: "skills/interface-review/SKILL.md",
  },
  {
    name: "variant",
    category: "engineering",
    invocation: "user",
    description: "Builds multiple variants of a component you're working on and helps you iterate and pick one.",
    useWhen: ["Gunakan /variant saat mengerjakan task terkait variant"],
    avoidWhen: ["Jangan gunakan jika task berada di luar lingkup variant"],
    coreRules: ["Patuhi aturan dan panduan resmi di skills/variant/SKILL.md"],
    sourcePath: "skills/variant/SKILL.md",
  },
]
