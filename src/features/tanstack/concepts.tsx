import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function TanStackConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'TanStack Ecosystem Architecture & Principles' : 'Arsitektur & Prinsip Ekosistem TanStack'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core mental models: 100% type-safety, headless UI, and framework-agnostic architecture.'
            : 'Model mental inti: 100% type-safety, headless UI tanpa opini markup, dan arsitektur framework-agnostic.'}
        </p>
      </div>

      {/* Model 1: Headless Architecture */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Headless UI Paradigm (Table, Form, Virtual, Ranger)' : 'Paradigma Headless UI (Table, Form, Virtual, Ranger)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'TanStack provides mathematical computation and state logic; you supply the markup and tokens.'
              : 'TanStack menyediakan kalkulasi matematika dan logika state; Anda bebas merancang markup dan token desain.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  STATE & LOGIC
                </Badge>
                <span className="text-[10px] text-muted-foreground">TanStack Core</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Pure Computation</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Sorting, filtering, virtual windowing, schema validation, form arrays, SWR caching.'
                  : 'Sorting, filtering, windowing virtual, validasi skema, array form, caching SWR.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  UI ADAPTERS
                </Badge>
                <span className="text-[10px] text-muted-foreground">React / Solid</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Reactive Hooks</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'useReactTable, useVirtualizer, useForm, useStore, useQuery. Fine-grained subscriptions.'
                  : 'useReactTable, useVirtualizer, useForm, useStore, useQuery. Berlangganan reaktif presisi.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  MARKUP & STYLE
                </Badge>
                <span className="text-[10px] text-muted-foreground">Your Code</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Tailwind / shadcn / CSS</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Zero CSS baggage. 100% design system ownership and custom layout freedom.'
                  : 'Nol beban CSS asing. 100% kepemilikan desain dan kebebasan layout kustom.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Server State vs Client State */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Dichotomy: Server State vs URL State vs Client State' : 'Dikotomi: Server State vs URL State vs Client State'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Choosing the right state layer prevents bugs, keeps links shareable, and eliminates stale data.'
              : 'Memilih lapisan state yang tepat mencegah bug, menjaga tautan tetap shareable, dan menghapus data basi.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-1.5">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-foreground">Server State</span>
                <Badge variant="outline" className="font-mono text-[10px]">TanStack Query</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Asynchronous, lives on the server, shared across users. Requires caching, invalidation, and deduplication.'
                  : 'Asinkron, hidup di server, dibagi ke banyak user. Membutuhkan caching, invalidasi, dan deduplikasi.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-1.5">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-foreground">URL State</span>
                <Badge variant="outline" className="font-mono text-[10px]">TanStack Router</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Search params & path segments. Must survive page refresh and be shareable via copy-paste.'
                  : 'Search params & path URL. Wajib bertahan saat refresh dan bisa dibagikan via copy-paste.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-1.5">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-foreground">Ephemeral Client State</span>
                <Badge variant="outline" className="font-mono text-[10px]">TanStack Store</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Temporary in-memory state: drawer open/close, audio playback scrubber, local drag-and-drop.'
                  : 'State sementara di memori: buka/tutup drawer, scrubber pemutar audio, drag-and-drop lokal.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: TanStack Intent & Package-Bundled Skills */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'TanStack Intent: Skills That Travel with Code' : 'TanStack Intent: Skill yang Berjalan Bersama Kode'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Agent skills are published directly inside npm packages, eliminating stale cursorrules files.'
              : 'Skill agen diterbitkan langsung di dalam paket npm, menghapus file cursorrules usang yang tercecer.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded-lg bg-muted/30 p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="border border-border rounded p-2 text-center bg-card flex-1 min-w-[120px]">
                <span className="font-semibold text-foreground block">1. npm install</span>
                <span className="text-[10px] text-muted-foreground">Library + bundled skills</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-emerald-500/40 rounded p-2 text-center bg-emerald-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">2. intent install</span>
                <span className="text-[10px] text-muted-foreground">Auto-wires agent configs</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-sky-500/40 rounded p-2 text-center bg-sky-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-sky-600 dark:text-sky-400 block">3. npm update</span>
                <span className="text-[10px] text-muted-foreground">Skills update with code</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px] italic">
            {isEn
              ? 'No hunting for third-party prompts. The exact version of the library you run is the exact skill your agent consumes.'
              : 'Tidak perlu mencari prompt pihak ketiga. Versi library yang Anda pasang adalah panduan skill yang persis dikonsumsi agen Anda.'}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
