import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function VercelConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Vercel Architecture & Rules Hierarchy' : 'Arsitektur & Hierarki Aturan Vercel'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core mental models distilled from 70+ impact-ranked rules across React 19, Next.js, and Vercel infrastructure.'
            : 'Model mental inti yang disarikan dari 70+ aturan berperingkat dampak di seluruh React 19, Next.js, dan infrastruktur Vercel.'}
        </p>
      </div>

      {/* Model 1: Rule Impact Hierarchy Matrix */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Impact-Ranked Rule Hierarchy' : 'Hierarki Aturan Berperingkat Dampak'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Agent attention is strictly prioritized: fix execution blockers before micro-optimizations.'
              : 'Perhatian agen diprioritaskan secara ketat: perbaiki blocker eksekusi sebelum mikro-optimasi.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-4 font-mono text-xs">
            <div className="rounded-lg border-2 border-red-500/80 bg-red-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-[10px] uppercase font-bold">
                  CRITICAL
                </Badge>
                <span className="text-[11px] text-muted-foreground">Impact 10/10</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Eliminate Waterfalls</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Sequential awaits in data loaders, missing Promise.all, blocking TTFB.'
                  : 'Await berurutan di data loader, Promise.all terlewat, memblokir TTFB.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-amber-500/80 bg-amber-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] uppercase font-bold">
                  HIGH
                </Badge>
                <span className="text-[11px] text-muted-foreground">Impact 8/10</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Bundle & Composition</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Kill barrel imports, dynamic import heavy dialogs, compound components.'
                  : 'Hapus barrel imports, dynamic import dialog berat, compound components.'}
              </p>
            </div>

            <div className="rounded-lg border border-sky-500/80 bg-sky-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px] uppercase font-bold">
                  MEDIUM
                </Badge>
                <span className="text-[11px] text-muted-foreground">Impact 5/10</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Re-render Hygiene</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Derived state in render, memoize expensive computations, useTransitions.'
                  : 'Derived state saat render, memoize kalkulasi berat, useTransitions.'}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-500/50 bg-zinc-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] uppercase font-bold">
                  LOW
                </Badge>
                <span className="text-[11px] text-muted-foreground">Impact 2/10</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Micro Patterns</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Variable hoisting, inline function allocations, micro styling tweaks.'
                  : 'Variable hoisting, alokasi fungsi inline, penyesuaian styling mikro.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Barrel Exports vs Direct Imports (Visual Box Diagram) */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Barrel Export Tax vs Direct Tree-Shaking' : 'Pajak Barrel Export vs Tree-Shaking Langsung'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Importing from an index.ts barrel forces bundlers to parse thousands of unused modules during build & dev.'
              : 'Mengimpor dari index.ts barrel memaksa bundler mem-parse ribuan modul tak terpakai saat build & dev.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 font-mono text-xs">
            {/* Bad */}
            <div className="border-2 border-destructive/50 rounded-lg p-4 bg-destructive/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-destructive">✕ Barrel Import (Slow / Heavy)</span>
                <span className="text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                  +1.8s Cold Dev
                </span>
              </div>
              <div className="bg-background/80 p-2.5 rounded border border-destructive/30 text-destructive font-mono text-[11px]">
                import &#123; LucideIcon &#125; from &apos;lucide-react&apos;
              </div>
              <div className="h-16 rounded border border-dashed border-destructive/40 flex items-center justify-center text-center p-2 text-muted-foreground text-[11px] font-sans">
                {isEn
                  ? 'Bundler parses 1,400+ icon ASTs just to extract 1 single SVG icon component.'
                  : 'Bundler mem-parse 1.400+ AST icon hanya untuk mengambil 1 komponen icon SVG.'}
              </div>
            </div>

            {/* Good */}
            <div className="border-2 border-emerald-500/50 rounded-lg p-4 bg-emerald-500/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ Deep Subpath or optimizePackageImports
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                  Instant Tree-shake
                </span>
              </div>
              <div className="bg-background/80 p-2.5 rounded border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                import LucideIcon from &apos;lucide-react/dist/esm/icons/check&apos;
              </div>
              <div className="h-16 rounded border border-dashed border-emerald-500/40 flex items-center justify-center text-center p-2 text-muted-foreground text-[11px] font-sans">
                {isEn
                  ? 'Zero AST overhead: only the exact file is resolved and compiled into the bundle.'
                  : 'Nol overhead AST: hanya file yang tepat yang di-resolve dan dikompilasi ke bundle.'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: React 19 Composition with use() and ref */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'React 19 Native Composition Primitives' : 'Primitif Komposisi Asli React 19'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Modern patterns replace boilerplate: ref is a standard prop, use() unwraps promises & context conditionally.'
              : 'Pola modern menggantikan boilerplate: ref adalah prop biasa, use() meng-unwrap promise & context secara kondisional.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">1. ref as Prop</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'forwardRef is obsolete in React 19. Pass ref directly as a typed prop into any functional component.'
                  : 'forwardRef sudah usang di React 19. Oper ref langsung sebagai typed prop ke komponen fungsional apa pun.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">2. use(Context) in Loops</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Unlike useContext(), use() can be called conditionally inside if blocks or loops without breaking hook rules.'
                  : 'Berbeda dari useContext(), use() bisa dipanggil secara kondisional di dalam blok if tanpa melanggar aturan hook.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">3. Server/Client Boundary</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Push "use client" as far down the component tree as possible. Keep data fetching in Server Components.'
                  : 'Dorong "use client" sejauh mungkin ke bawah pohon komponen. Pertahankan fetch data di Server Components.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
