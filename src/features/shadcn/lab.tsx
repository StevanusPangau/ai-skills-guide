import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

type ContextField = {
  key: string
  ruleId: string
  ruleEn: string
}

/** Key Fields from skills/shadcn/SKILL.md "Key Fields" / Current Project Context. */
const CONTEXT_FIELDS: ContextField[] = [
  {
    key: 'aliases',
    ruleId: 'Pakai prefix alias aktual untuk import (mis. @/, ~/), jangan hardcode.',
    ruleEn: 'Use the actual alias prefix for imports (e.g. @/, ~/), never hardcode.',
  },
  {
    key: 'isRSC',
    ruleId:
      'Bila true, komponen dengan useState/useEffect/handler/API browser butuh "use client".',
    ruleEn:
      'When true, components using useState, useEffect, event handlers, or browser APIs need "use client".',
  },
  {
    key: 'tailwindVersion',
    ruleId: '"v4" memakai @theme inline; "v3" memakai tailwind.config.js.',
    ruleEn: '"v4" uses @theme inline blocks; "v3" uses tailwind.config.js.',
  },
  {
    key: 'tailwindCssFile',
    ruleId: 'File CSS global tempat variabel kustom didefinisikan — selalu edit file ini.',
    ruleEn: 'The global CSS file where custom CSS variables are defined — always edit this file.',
  },
  {
    key: 'style',
    ruleId: 'Perlakuan visual komponen (mis. nova, vega).',
    ruleEn: 'Component visual treatment (e.g. nova, vega).',
  },
  {
    key: 'base',
    ruleId: 'Library primitif (radix atau base). Mempengaruhi API dan props tersedia.',
    ruleEn: 'Primitive library (radix or base). Affects component APIs and available props.',
  },
  {
    key: 'iconLibrary',
    ruleId: 'Menentukan paket import ikon. Jangan mengasumsikan lucide-react.',
    ruleEn: 'Determines icon imports. Never assume lucide-react.',
  },
  {
    key: 'resolvedPaths',
    ruleId: 'Destinasi filesystem eksak untuk components, utils, hooks, dll.',
    ruleEn: 'Exact file-system destinations for components, utils, hooks, etc.',
  },
  {
    key: 'framework',
    ruleId: 'Konvensi routing dan file (mis. Next.js App Router vs Vite SPA).',
    ruleEn: 'Routing and file conventions (e.g. Next.js App Router vs Vite SPA).',
  },
  {
    key: 'packageManager',
    ruleId: 'Pakai ini untuk instal dependensi non-shadcn (pnpm add vs npm install).',
    ruleEn: 'Use this for any non-shadcn dependency installs (pnpm add vs npm install).',
  },
  {
    key: 'preset',
    ruleId: 'Kode/nilai preset ter-resolve. Refresh dengan preset resolve --json.',
    ruleEn: 'Resolved preset code and values. Refresh with preset resolve --json.',
  },
]

const CLI_WORKFLOW = [
  'npx shadcn@latest info --json',
  'npx shadcn@latest search @shadcn -q "sidebar"',
  'npx shadcn@latest docs button dialog select',
  'npx shadcn@latest add button card dialog',
  'npx shadcn@latest add button --dry-run',
  'npx shadcn@latest add button --diff button.tsx',
].join('\n')

export function ShadcnContextLab() {
  const isEn = getLocale() === 'en'
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const done = CONTEXT_FIELDS.filter((f) => checked[f.key]).length

  return (
    <section id="shadcn-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Project Context Lab' : 'Lab Konteks Proyek'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Fields the shadcn skill reads from the current project via npx shadcn@latest info --json (Key Fields / Current Project Context). Tick each field as you verify it in a real project.'
            : 'Field yang dibaca skill shadcn dari proyek saat ini lewat npx shadcn@latest info --json (Key Fields / Current Project Context). Centang setiap field saat Anda verifikasi di proyek nyata.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-semibold">
                {isEn ? 'Current Project Context checklist' : 'Checklist Current Project Context'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? `Rule: skills/shadcn/SKILL.md — Key Fields · ${done}/${CONTEXT_FIELDS.length} checked`
                  : `Aturan: skills/shadcn/SKILL.md — Key Fields · ${done}/${CONTEXT_FIELDS.length} dicentang`}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="max-w-full space-y-2" aria-label={isEn ? 'Context fields' : 'Field konteks'}>
            {CONTEXT_FIELDS.map((field) => {
              const isOn = Boolean(checked[field.key])
              return (
                <li key={field.key}>
                  <button
                    type="button"
                    aria-pressed={isOn}
                    aria-label={`${field.key}: ${isEn ? field.ruleEn : field.ruleId}`}
                    onClick={() => toggle(field.key)}
                    className={`flex w-full max-w-full items-start gap-2 rounded-md border px-2.5 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isOn
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border font-mono text-[10px] ${
                        isOn
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border'
                      }`}
                      aria-hidden="true"
                    >
                      {isOn ? 'x' : ''}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono font-semibold text-foreground">
                        {field.key}
                      </span>
                      <span className="mt-0.5 block leading-snug text-muted-foreground">
                        {isEn ? field.ruleEn : field.ruleId}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'CLI workflow (exact commands from the skill)' : 'Alur CLI (perintah persis dari skill)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEn
              ? 'info → search → docs → add; preview updates with --dry-run / --diff.'
              : 'info → search → docs → add; preview pembaruan dengan --dry-run / --diff.'}
          </p>
        </CardHeader>
        <CardContent>
          <CodeBlock code={CLI_WORKFLOW} shell />
        </CardContent>
      </Card>
    </section>
  )
}
