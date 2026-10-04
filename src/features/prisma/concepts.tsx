import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function PrismaConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Prisma ORM Architecture & Mental Models' : 'Arsitektur ORM & Model Mental Prisma'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Key principles: driver adapter boundaries, migration safety discipline, and nested writes with explicit transactions.'
            : 'Prinsip kunci: protokol batas driver adapter, disiplin keamanan migrasi, dan nested writes dengan transaksi eksplisit.'}
        </p>
      </div>

      {/* Model 1: Driver Adapter Protocol Boundary */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The SQL Driver Adapter Protocol Boundary' : 'Protokol Batas SQL Driver Adapter'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'In Prisma 7, SQL providers reach the database through a driver adapter.'
              : 'Di Prisma 7, provider SQL mengakses database lewat driver adapter.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  LAYER 1: TS CLIENT
                </Badge>
                <span className="text-[10px] text-muted-foreground">Type Safety</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Generated PrismaClient</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Type-safe client generated from your schema; queries are handed to the adapter.'
                  : 'Client bertipe kuat yang dihasilkan dari schema; kueri diteruskan ke adapter.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  LAYER 2: ADAPTER
                </Badge>
                <span className="text-[10px] text-muted-foreground">Protocol</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">SqlDriverAdapter Contract</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Runs parameterized queries, owns the transaction lifecycle and optional savepoints, preserves native database errors.'
                  : 'Menjalankan kueri berparameter, memegang siklus transaksi dan savepoint opsional, mempreservasi error database asli.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  LAYER 3: DRIVER
                </Badge>
                <span className="text-[10px] text-muted-foreground">I/O Socket</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Native Node/Edge Driver</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'The underlying driver, e.g. pg (via @prisma/adapter-pg), Neon (@prisma/adapter-neon), or Cloudflare D1 (@prisma/adapter-d1).'
                  : 'Driver di bawahnya, mis. pg (via @prisma/adapter-pg), Neon (@prisma/adapter-neon), atau Cloudflare D1 (@prisma/adapter-d1).'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: CI/CD Migration Safety */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Migration Discipline: Development vs Production' : 'Disiplin Migrasi: Development vs Production'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Never use interactive commands in headless deployment pipelines.'
              : 'Dilarang menggunakan perintah interaktif pada pipeline deployment otomatis.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2 font-mono">
            <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">prisma migrate dev</span>
                <Badge variant="outline" className="text-[10px]">Development Only</Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Interactive prompt: detects schema drift, prompts for shadow database resets, generates new migration files. Fails or hangs inside automated CI.'
                  : 'Prompt interaktif: mendeteksi drift skema, meminta konfirmasi reset shadow database, membuat file migrasi baru. Gagal atau macet di dalam CI otomatis.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-3 bg-emerald-500/5 border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">prisma migrate deploy</span>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px]">Production CI/CD</Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Headless & non-interactive: applies all pending migration files strictly in sequence. Fails closed with non-zero exit code on syntax or schema errors.'
                  : 'Non-interaktif: menerapkan seluruh file migrasi yang tertunda secara urut. Berhenti aman (fail-closed) dengan exit code non-zero jika terjadi error.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: Nested Writes */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Nested Writes and Explicit Transactions' : 'Nested Writes dan Transaksi Eksplisit'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Create related records in one call, and reach for $transaction when you need explicit control.'
              : 'Buat record relasional dalam satu panggilan, dan gunakan $transaction bila butuh kontrol eksplisit.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">Nested Writes</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'create / connect / connectOrCreate inside data: { posts: { create: [...] } } persist a record together with its relations in a single client call.'
                  : 'create / connect / connectOrCreate di dalam data: { posts: { create: [...] } } menyimpan record beserta relasinya dalam satu panggilan client.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">Interactive $transaction</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Use prisma.$transaction(async (tx) => { ... }) when a later step depends on an earlier one, with isolation level and timeout options.'
                  : 'Gunakan prisma.$transaction(async (tx) => { ... }) saat langkah berikutnya bergantung pada langkah sebelumnya, dengan opsi isolation level dan timeout.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
