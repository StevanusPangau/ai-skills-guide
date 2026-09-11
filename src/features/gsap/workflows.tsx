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
    titleId: 'Landing Page Pinned Showcase dengan ScrollTrigger',
    titleEn: 'Pinned Landing Page Showcase with ScrollTrigger',
    descId: 'Membuat section pinning yang terkunci di layar saat 3 kartu fitur bergantian masuk secara horizontal.',
    descEn: 'Pin a section to the viewport while 3 feature cards animate horizontally in sequence.',
    whyId: 'Memasang ScrollTrigger pada timeline root memastikan seluruh kartu tersinkronisasi tanpa lompatan scroll.',
    whyEn: 'Attaching ScrollTrigger at the timeline root coordinates all cards without scroll stutter.',
    steps: [
      'gsap.registerPlugin(ScrollTrigger)',
      'const tl = gsap.timeline({ scrollTrigger: { pin: true, scrub: 1 } })',
      'tl.to(cards, { xPercent: -100 * (cards.length - 1) })',
      'ScrollTrigger.refresh() on image load',
    ],
  },
  {
    titleId: 'Integrasi Animasi React Aman Bersama useGSAP',
    titleEn: 'Safe React Animation Integration via useGSAP',
    descId: 'Menganimasikan komponen React dengan isolasi ref scope dan pembersihan otomatis di StrictMode.',
    descEn: 'Animate React components with scoped ref isolation and automated StrictMode cleanup.',
    whyId: 'useGSAP membatalkan animasi mount pertama di dev sebelum mount kedua berjalan, mencegah from() glitch.',
    whyEn: 'useGSAP reverts the first mount animation before the second fires, preventing from() double-mount glitches.',
    steps: [
      'import { useGSAP } from "@gsap/react"',
      'const container = useRef()',
      'useGSAP(() => { gsap.from(".item", { opacity: 0, y: 20 }) }, { scope: container })',
      'automatic unmount revert',
    ],
  },
  {
    titleId: 'Transisi Layout State Dinamis dengan Flip Plugin',
    titleEn: 'Dynamic Layout State Transitions with Flip',
    descId: 'Menganimasikan kartu produk dari posisi grid kecil menjadi modal layar penuh pada 60FPS.',
    descEn: 'Transition a product card from a compact grid item into a full-screen modal at 60FPS.',
    whyId: 'Flip Plugin menghitung perubahan layout secara matematis dan menganimasikannya murni via GPU transforms.',
    whyEn: 'Flip mathematically computes layout deltas and animates them purely via GPU hardware transforms.',
    steps: [
      'const state = Flip.getState(".card")',
      'mutate DOM / toggle layout classes',
      'Flip.from(state, { duration: 0.6, ease: "power2.inOut", absolute: true })',
    ],
  },
]

export function GsapWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How GSAP animation skills combine across web experiences.'
            : 'Cara skill animasi GSAP berkolaborasi dalam pengalaman web nyata.'}
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
