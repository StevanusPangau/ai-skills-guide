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
    titleId: 'Create → Studio → markup',
    titleEn: 'Create → Studio → markup',
    descId: 'Scaffold proyek blank, buka preview, baru tulis composition dengan frame clock.',
    descEn: 'Scaffold a blank project, open the preview, then write the composition with the frame clock.',
    whyId: 'Skill create dan best-practices: jangan render dulu — pengguna ingin preview interaktif segera setelah proyek bisa dijalankan.',
    whyEn: 'Create and best-practices skills: do not render first — users want an interactive preview as soon as the project can run.',
    steps: [
      'npx create-video@latest --yes --blank --no-tailwind .',
      'npm i',
      'npx remotion studio',
      'useVideoConfig() + interpolate()',
    ],
  },
  {
    titleId: 'Caption dari audio ke Basic Captions',
    titleEn: 'Captions from audio to Basic Captions',
    descId: 'Transcribe ke Caption JSON, inline ke elemen Basic Captions, jaga sync trim dengan parent Sequence.',
    descEn: 'Transcribe to Caption JSON, inline into Basic Captions, keep trim sync on the shared Sequence parent.',
    whyId: 'Timestamp harus relatif ke file sumber; captions={variable} menghilangkan array yang bisa di-write-back oleh Caption editor.',
    whyEn: 'Timestamps must stay relative to the source file; captions={variable} leaves no array for the Caption editor to write back.',
    steps: [
      'npx remotion add @remotion/whisper-webgpu …',
      'transcribe() → Caption[]',
      'npx remotion add @remotion/captions',
      'inline captions={[{…}]}',
      'npx remotion studio',
    ],
  },
  {
    titleId: 'Upgrade Remotion + skills',
    titleEn: 'Upgrade Remotion + skills',
    descId: 'Satu versi exact untuk semua paket Remotion, selaraskan Mediabunny, perbarui Agent Skills.',
    descEn: 'One exact version for every Remotion package, align Mediabunny, refresh Agent Skills.',
    whyId: 'Campur versi @remotion/* dan skill basi membuat Studio/render tidak selaras dengan docs yang diingat agent.',
    whyEn: 'Mixed @remotion/* versions and stale skills leave Studio/render out of sync with what the agent remembers from docs.',
    steps: [
      'npx remotion upgrade',
      'atau: npm view remotion version',
      'npx skills update remotion-best-practices … remotion-upgrade --yes',
      'npx remotion versions',
    ],
  },
]

export function RemotionWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How Remotion skills combine for create, captions, and upgrades.'
            : 'Cara skill Remotion digabungkan untuk create, captions, dan upgrade.'}
        </p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {isEn ? wf.titleEn : wf.titleId}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEn ? wf.descEn : wf.descId}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs font-mono whitespace-nowrap">
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 && (
                      <span className="text-muted-foreground text-sm">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 italic">
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
