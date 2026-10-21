import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Wf = {
  titleId: string
  titleEn: string
  descId: string
  descEn: string
  whyId: string
  whyEn: string
  steps: string[]
}

const workflows: Wf[] = [
  {
    titleId: 'Tambah dan susun komponen lewat CLI',
    titleEn: 'Add and compose a component via the CLI',
    descId:
      'Baca konteks proyek, cari di registry, ambil docs, pasang komponen, lalu tinjau terhadap Critical Rules.',
    descEn:
      'Read project context, search the registry, fetch docs, install the component, then review against Critical Rules.',
    whyId:
      'Skill shadcn menegaskan: cek komponen terpasang dulu, jangan menebak registry, dan selalu baca file yang ditambahkan sebelum lanjut.',
    whyEn:
      'The shadcn skill requires checking installed components first, never guessing a registry, and always reading added files before moving on.',
    steps: [
      'npx shadcn@latest info --json',
      'npx shadcn@latest search',
      'npx shadcn@latest docs <component>',
      'npx shadcn@latest add <component>',
      'review Group / Title / iconLibrary',
    ],
  },
  {
    titleId: 'Migrasi satu komponen Radix → Base UI',
    titleEn: 'Migrate one component from Radix to Base UI',
    descId:
      'Preflight migrate-radix-to-base, lalu strategi golden pair first pada satu komponen (mode progressive).',
    descEn:
      'migrate-radix-to-base preflight, then golden-pair-first strategy on one component (progressive mode).',
    whyId:
      'Progressive menulis ke <component>-base.tsx tanpa --overwrite agar konsumen yang masih mengimpor original tidak rusak; radix dan @base-ui/react hidup berdampingan sampai komponen terakhir.',
    whyEn:
      'Progressive writes <component>-base.tsx without --overwrite so consumers still importing the original stay intact; radix and @base-ui/react coexist until the last component.',
    steps: [
      'npx shadcn@latest info --json',
      'baseline typecheck/build',
      'install @base-ui/react (alongside)',
      'fetch base variant / write <component>-base.tsx',
      'repoint consumers one at a time',
      'grep leftover radix-ui|@radix-ui',
      '.migration/<component>.md',
    ],
  },
]

export function ShadcnWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How the two shadcn/ui skills combine: CLI composition, then a single-component Radix→Base migration.'
            : 'Cara dua skill shadcn/ui digabung: komposisi lewat CLI, lalu migrasi satu komponen Radix→Base.'}
        </p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {isEn ? wf.titleEn : wf.titleId}
                  </CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isEn ? wf.descEn : wf.descId}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="whitespace-nowrap font-mono text-xs">
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 && (
                      <span className="text-sm text-muted-foreground">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="border-l-2 border-primary/30 pl-3 text-xs text-muted-foreground italic">
                <span className="font-semibold not-italic text-foreground">
                  {isEn ? 'Why: ' : 'Mengapa: '}
                </span>
                {isEn ? wf.whyEn : wf.whyId}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
