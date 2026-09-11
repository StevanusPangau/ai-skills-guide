import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function PrismaV7Lab() {
  const isEn = getLocale() === 'en'
  const [version, setVersion] = useState<'v6' | 'v7'>('v7')
  const [dbProvider, setDbProvider] = useState<'postgres' | 'mongodb'>('postgres')

  return (
    <section id="v7-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Prisma 7 Architecture & Decision Lab' : 'Lab Arsitektur & Keputusan Prisma 7'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive exploration of Prisma 7 breaking architectural changes: binary engine removal, mandatory driver adapters, and the terminal v6 MongoDB branch.'
            : 'Eksplorasi interaktif pergeseran arsitektur Prisma 7: penghapusan query engine binary, driver adapter wajib, dan cabang terminal MongoDB di v6.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: v6 vs v7 Architecture Comparison */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn ? '1. Prisma ORM v6 vs v7 Architecture' : '1. Arsitektur Prisma ORM v6 vs v7'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Rule: prisma-upgrade-v7 — driver adapters become mandatory as native binaries are phased out.'
                    : 'Aturan: prisma-upgrade-v7 — driver adapter wajib digunakan seiring dihilangkannya binary native.'}
                </p>
              </div>
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setVersion('v6')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    version === 'v6'
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Prisma v6 (Classic)
                </button>
                <button
                  type="button"
                  onClick={() => setVersion('v7')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    version === 'v7'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Prisma v7 (Modern)
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="border border-border rounded p-2.5 bg-muted/30">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'Query Engine' : 'Engine Kueri'}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {version === 'v6' ? 'Rust C++ Binary (~35MB)' : 'Pure JavaScript Engine'}
                </span>
              </div>
              <div className="border border-border rounded p-2.5 bg-muted/30">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'Database Protocol' : 'Protokol Database'}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {version === 'v6' ? 'Direct Engine Socket' : 'Driver Adapter (pg, neon, d1)'}
                </span>
              </div>
              <div className="border border-border rounded p-2.5 bg-muted/30">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'Configuration' : 'Konfigurasi'}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {version === 'v6' ? 'schema.prisma only' : 'prisma.config.ts'}
                </span>
              </div>
              <div className="border border-border rounded p-2.5 bg-muted/30">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'Edge / Serverless' : 'Kompatibilitas Edge'}
                </span>
                <span
                  className={`text-sm font-bold ${
                    version === 'v7' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'
                  }`}
                >
                  {version === 'v6' ? 'Heavy Cold Start' : 'Zero Binary Cold Start'}
                </span>
              </div>
            </div>

            <pre className="rounded bg-zinc-950 p-3 text-xs font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
              {version === 'v6'
                ? `// schema.prisma (v6)\ngenerator client {\n  provider = "prisma-client-js"\n}\n\n// Instantiation\nimport { PrismaClient } from '@prisma/client'\nconst prisma = new PrismaClient()`
                : `// schema.prisma (v7)\ngenerator client {\n  provider = "prisma-client"\n  output   = "./generated/client"\n}\n\n// Instantiation with Driver Adapter\nimport { Pool } from 'pg'\nimport { PrismaPg } from '@prisma/adapter-pg'\nimport { PrismaClient } from './generated/client'\n\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL })\nconst adapter = new PrismaPg(pool)\nconst prisma = new PrismaClient({ adapter })`}
            </pre>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: MongoDB Terminal Decision */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Database Provider Decision Branch' : '2. Percabangan Keputusan Provider Database'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: prisma-mongodb-upgrade — v6 is the terminal major for MongoDB.'
                  : 'Aturan: prisma-mongodb-upgrade — v6 adalah rilis terminal untuk MongoDB.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setDbProvider('postgres')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    dbProvider === 'postgres'
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  PostgreSQL / MySQL / SQLite
                </button>
                <button
                  type="button"
                  onClick={() => setDbProvider('mongodb')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    dbProvider === 'mongodb'
                      ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  MongoDB
                </button>
              </div>

              {dbProvider === 'postgres' ? (
                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-3 space-y-1.5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    {isEn ? '✓ Direct Prisma 7 Upgrade Supported' : '✓ Upgrade Langsung ke Prisma 7 Didukung'}
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? 'Supported via SQL Driver Adapters (@prisma/adapter-pg, @prisma/adapter-neon, etc.). Unlocks typedSql and zero-binary serverless builds.'
                      : 'Didukung penuh via SQL Driver Adapters. Membuka fitur typedSql dan build serverless tanpa binary berat.'}
                  </p>
                </div>
              ) : (
                <div className="border border-destructive/30 bg-destructive/5 rounded p-3 space-y-1.5">
                  <span className="font-bold text-destructive block">
                    {isEn ? '✕ No Prisma 7 Upgrade Path for MongoDB' : '✕ Tidak Ada Jalur Upgrade Prisma 7 untuk MongoDB'}
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? 'Prisma 7 drops the MongoDB connector entirely. Official options: 1) Stay on Prisma v6 with LTS patches; 2) Migrate toward Prisma Next (Early Access).'
                      : 'Prisma 7 menghentikan konektor MongoDB total. Opsi resmi: 1) Tetap di Prisma v6 dengan patch LTS; 2) Migrasi ke Prisma Next (fase Early Access).'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Module 3: Compute Port Binding */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Prisma Compute Host Binding Invariant' : '3. Invarian Host Binding Prisma Compute'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: prisma-compute — containers must bind to 0.0.0.0 and process.env.PORT.'
                  : 'Aturan: prisma-compute — container wajib mendengarkan 0.0.0.0 dan process.env.PORT.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-destructive/30 bg-destructive/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-destructive block">localhost:3000</span>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn
                      ? 'Listens only on internal loopback. Ingress gateway fails health checks with 502.'
                      : 'Hanya menerima loopback internal. Load balancer gagal health check dan mereturn 502.'}
                  </p>
                </div>
                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    0.0.0.0 : env.PORT
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn
                      ? 'Accepts incoming external bridge traffic. Required for all web server frameworks.'
                      : 'Menerima traffic ingress luar. Wajib untuk seluruh framework di container Compute.'}
                  </p>
                </div>
              </div>
              <pre className="rounded bg-zinc-950 p-2 text-[10px] font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
                {`// Safe server listen\nconst port = Number(process.env.PORT) || 3000\napp.listen(port, "0.0.0.0")`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
