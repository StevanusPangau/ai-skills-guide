import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function NeonConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Neon routing & branch mental models' : 'Model mental routing & branch Neon'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Parent vs child skill routing, branches that carry data with the database, and when pooled vs direct connections apply.'
            : 'Routing skill induk vs anak, branch yang membawa data bersama database, dan kapan koneksi pooled vs direct dipakai.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Parent vs child skill routing' : 'Routing skill induk vs anak'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Start at `neon` for new backends; hand off when a child skill owns the task.'
              : 'Mulai di `neon` untuk backend baru; serahkan ke child skill saat tugas sudah spesifik.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 font-mono">
            <div className="rounded-lg border-2 border-primary/50 bg-primary/5 p-3 space-y-1.5">
              <Badge className="text-[10px]">neon</Badge>
              <p className="font-semibold text-foreground font-sans text-xs">
                {isEn ? 'Parent overview' : 'Overview induk'}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Lakebase Postgres plus Auth, Object Storage, Functions, AI Gateway, Realtime. New backends start here.'
                  : 'Lakebase Postgres plus Auth, Object Storage, Functions, AI Gateway, Realtime. Backend baru mulai di sini.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <Badge variant="secondary" className="text-[10px]">
                neon-postgres
              </Badge>
              <p className="font-semibold text-foreground font-sans text-xs">
                {isEn ? 'Existing DATABASE_URL / SQL' : 'DATABASE_URL / SQL yang sudah ada'}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Wins for an existing DATABASE_URL, SQL, schema, inspect, or search.'
                  : 'Menang untuk DATABASE_URL yang sudah ada, SQL, schema, inspect, atau search.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <Badge variant="secondary" className="text-[10px]">
                neon-auth
              </Badge>
              <p className="font-semibold text-foreground font-sans text-xs">
                {isEn ? 'Identity routing' : 'Routing identitas'}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Managed Better Auth by default when there is no existing identity; keep a working IdP.'
                  : 'Managed Better Auth sebagai default tanpa identitas; pertahankan IdP yang sudah bekerja.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <Badge variant="secondary" className="text-[10px]">
                neon-realtime
              </Badge>
              <p className="font-semibold text-foreground font-sans text-xs">
                {isEn ? 'Live SQL queries' : 'Live SQL queries'}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Live queries over database rows. Presence, typing, or LLM streams → neon-functions.'
                  : 'Live queries atas baris database. Presence, typing, atau LLM streams → neon-functions.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5 sm:col-span-2 lg:col-span-2">
              <Badge variant="outline" className="text-[10px]">
                platform
              </Badge>
              <p className="font-semibold text-foreground font-sans text-xs">
                {isEn
                  ? 'Object Storage · AI Gateway · Functions · Branches · Egress'
                  : 'Object Storage · AI Gateway · Functions · Branches · Egress'}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'S3-compatible storage that branches with the database; one-credential LLM gateway; long-running Node.js HTTP with DATABASE_URL injected; branch-type decisions; egress diagnosis via pg_stat_statements.'
                  : 'Storage S3-compatible yang branch bersama database; LLM gateway satu kredensial; Node.js HTTP jangka panjang dengan DATABASE_URL di-inject; keputusan tipe branch; diagnosa egress via pg_stat_statements.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Branch-with-data' : 'Branch-with-data'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'A Neon branch is an isolated copy-on-write clone — Postgres rows and paired primitives stay aligned.'
              : 'Branch Neon adalah clone copy-on-write terisolasi — baris Postgres dan primitif terkait tetap selaras.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground">Lakebase Postgres</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Shares data with its parent until writes diverge; deltas are stored independently.'
                  : 'Berbagi data dengan parent sampai write membuat diverge; delta disimpan terpisah.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground">Object Storage</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'S3-compatible buckets and objects fork with the branch, so file keys in rows stay valid.'
                  : 'Bucket dan object S3-compatible ikut branch, sehingga key file di baris tetap valid.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground">Auth · Functions · AI</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Managed Auth state, function URLs, and the AI Gateway endpoint are branch-scoped with the same lineage.'
                  : 'State Managed Auth, URL function, dan endpoint AI Gateway bersifat branch-scoped dengan lineage yang sama.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Pooled vs direct connections' : 'Koneksi pooled vs direct'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'From neon-postgres: pick the connection type from the workload, not habit.'
              : 'Dari neon-postgres: pilih tipe koneksi dari workload, bukan kebiasaan.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2 font-mono">
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Pooled (-pooler)</span>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px]">
                  App traffic
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Web applications and serverless functions. Prefer pooled DATABASE_URL for application traffic.'
                  : 'Web applications dan serverless functions. Prefer pooled DATABASE_URL untuk traffic aplikasi.'}
              </p>
            </div>
            <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-foreground">Direct</span>
                <Badge variant="outline" className="text-[10px]">
                  Migrations / admin
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Schema migrations, pg_dump / pg_restore, logical replication, long-running analytics with temp tables, admin SET/session state, LISTEN / NOTIFY. Hostname must not include -pooler.'
                  : 'Schema migrations, pg_dump / pg_restore, logical replication, analytics panjang dengan temp tables, admin SET/session state, LISTEN / NOTIFY. Hostname tidak boleh mengandung -pooler.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
