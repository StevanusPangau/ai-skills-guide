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
              ? 'The 8 categories of react-best-practices are ordered by impact: fix waterfalls and bundle size before micro-optimizations. Composition patterns are a separate skill.'
              : '8 kategori react-best-practices diurutkan berdasarkan dampak: perbaiki waterfall dan bundle size sebelum mikro-optimasi. Composition patterns adalah skill terpisah.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-4 font-mono text-xs">
            <div className="rounded-lg border-2 border-red-500/80 bg-red-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-[10px] uppercase font-bold">
                  CRITICAL
                </Badge>
                <span className="text-[11px] text-muted-foreground">react-best-practices #1</span>
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
                <Badge variant="destructive" className="text-[10px] uppercase font-bold">
                  CRITICAL
                </Badge>
                <span className="text-[11px] text-muted-foreground">react-best-practices #2</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Bundle Size Optimization</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Avoid barrel imports, dynamically import heavy components, defer non-critical third-party libraries.'
                  : 'Hindari barrel imports, dynamic import komponen berat, tunda library pihak ketiga non-kritis.'}
              </p>
            </div>

            <div className="rounded-lg border border-sky-500/80 bg-sky-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] uppercase font-bold">
                  HIGH
                </Badge>
                <span className="text-[11px] text-muted-foreground">react-best-practices #3</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Server-Side Performance</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Authenticate Server Actions, per-request React.cache(), LRU across requests, after() for non-blocking work.'
                  : 'Autentikasi Server Actions, React.cache() per-request, LRU lintas request, after() untuk pekerjaan non-blocking.'}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-500/50 bg-zinc-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] uppercase font-bold">
                  MEDIUM / LOW
                </Badge>
                <span className="text-[11px] text-muted-foreground">#4 - #8</span>
              </div>
              <p className="font-semibold text-foreground text-xs">Client, Re-render, Rendering, JS, Advanced</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Client data fetching (MEDIUM-HIGH), re-render and rendering (MEDIUM), JavaScript performance (LOW-MEDIUM), advanced patterns (LOW).'
                  : 'Client data fetching (MEDIUM-HIGH), re-render dan rendering (MEDIUM), JavaScript performance (LOW-MEDIUM), advanced patterns (LOW).'}
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
                  ~2.8s extra dev
                </span>
              </div>
              <div className="bg-background/80 p-2.5 rounded border border-destructive/30 text-destructive font-mono text-[11px]">
                import &#123; LucideIcon &#125; from &apos;lucide-react&apos;
              </div>
              <div className="h-16 rounded border border-dashed border-destructive/40 flex items-center justify-center text-center p-2 text-muted-foreground text-[11px] font-sans">
                {isEn
                  ? 'Per the source, lucide-react loads 1,583 modules (~2.8s extra in dev, 200-800ms on every cold start) for a few icons.'
                  : 'Menurut sumber, lucide-react memuat 1.583 modul (~2,8 dtk ekstra di dev, 200-800 ms di setiap cold start) hanya untuk beberapa icon.'}
              </div>
            </div>

            {/* Good */}
            <div className="border-2 border-emerald-500/50 rounded-lg p-4 bg-emerald-500/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ optimizePackageImports or Direct Import
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                  Fewer modules
                </span>
              </div>
              <div className="bg-background/80 p-2.5 rounded border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                // next.config.js: experimental.optimizePackageImports
              </div>
              <div className="h-16 rounded border border-dashed border-emerald-500/40 flex items-center justify-center text-center p-2 text-muted-foreground text-[11px] font-sans">
                {isEn
                  ? 'Prefer optimizePackageImports (Next.js 13.5+). Caution: lucide-react deep paths ship no .d.ts and resolve to implicit any.'
                  : 'Utamakan optimizePackageImports (Next.js 13.5+). Perhatian: deep path lucide-react tidak punya .d.ts sehingga menjadi implicit any.'}
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
              <div className="font-semibold text-foreground font-mono">2. use() vs useContext()</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'use() replaces useContext() in React 19 and, unlike useContext(), can be called conditionally.'
                  : 'use() menggantikan useContext() di React 19 dan, berbeda dari useContext(), bisa dipanggil secara kondisional.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">3. Skip on React 18</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'The react19-no-forwardref rule is React 19+ only: skip it if the project is on React 18 or earlier.'
                  : 'Aturan react19-no-forwardref hanya untuk React 19+: lewati jika proyek memakai React 18 atau lebih lama.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
