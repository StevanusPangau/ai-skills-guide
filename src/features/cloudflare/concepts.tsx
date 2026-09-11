import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function CloudflareConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Cloudflare Edge Architecture & Mental Models' : 'Arsitektur Edge & Model Mental Cloudflare'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core infrastructure principles: retrieval-over-pre-training, direct bindings, and fail-closed edge security.'
            : 'Prinsip infrastruktur inti: retrieval-over-pre-training, direct binding in-process, dan keamanan edge fail-closed.'}
        </p>
      </div>

      {/* Model 1: Edge Compute Hierarchy (V8 Isolates vs Containers) */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Edge Compute Hierarchy: Isolates to MicroVMs' : 'Hierarki Compute Edge: Dari Isolate ke MicroVM'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Choose the execution boundary that matches your safety and state requirements.'
              : 'Pilih batas eksekusi yang sesuai dengan kebutuhan keamanan dan manajemen state Anda.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  ISOLATES
                </Badge>
                <span className="text-[10px] text-muted-foreground">&lt; 5ms boot</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Workers Core</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Stateless, zero cold start, shared process memory isolation. Pure TypeScript/JS.'
                  : 'Stateless, nol cold start, isolasi memori proses bersama. Murni TypeScript/JS.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  STATEFUL
                </Badge>
                <span className="text-[10px] text-muted-foreground">Actor Model</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Durable Objects</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Co-located SQLite storage, single-point global coordination, WebSocket hubs.'
                  : 'Penyimpanan SQLite lokal, koordinasi global titik tunggal, hub WebSocket.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  CONTAINER
                </Badge>
                <span className="text-[10px] text-muted-foreground">MicroVM</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Cloudflare Sandbox</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Arbitrary binaries (Python, Node, Bash) with strict network egress guardrails.'
                  : 'Biner bebas (Python, Node, Bash) dengan batas egress jaringan yang ketat.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Retrieval Over Pre-training Diagram */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Principle: Retrieval Over Pre-Training' : 'Prinsip: Retrieval Mengalahkan Pre-Training'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Cloudflare APIs and Wrangler config evolve rapidly. Models must pull live schemas before generating code.'
              : 'API Cloudflare dan konfigurasi Wrangler berkembang pesat. Model wajib mengambil skema mutakhir sebelum menulis kode.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded-lg bg-muted/30 p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="border border-border rounded p-2 text-center bg-card flex-1 min-w-[120px]">
                <span className="font-semibold text-foreground block">1. Task Arrives</span>
                <span className="text-[10px] text-muted-foreground">e.g. D1 + Vectorize</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-amber-500/40 rounded p-2 text-center bg-amber-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-amber-600 dark:text-amber-400 block">2. Fetch Docs / Types</span>
                <span className="text-[10px] text-muted-foreground">wrangler types + schemas</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-emerald-500/40 rounded p-2 text-center bg-emerald-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">3. Accurate Coding</span>
                <span className="text-[10px] text-muted-foreground">Zero stale API hallucination</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-sky-500/40 rounded p-2 text-center bg-sky-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-sky-600 dark:text-sky-400 block">4. Deploy Verification</span>
                <span className="text-[10px] text-muted-foreground">wrangler deploy</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px] italic">
            {isEn
              ? 'Never trust model memory for wrangler.toml/wrangler.jsonc syntax — always verify against current schemas.'
              : 'Dilarang mempercayai ingatan model untuk sintaks wrangler.toml/wrangler.jsonc — selalu verifikasi dengan skema terkini.'}
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: Fail-Closed Security Boundary */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Fail-Closed Edge Security Boundaries' : 'Batas Keamanan Edge Fail-Closed'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Zero Trust and Turnstile verifications run backend-side: fail closed on missing tokens or unexpected actions.'
              : 'Verifikasi Zero Trust dan Turnstile berjalan di sisi backend: fail-closed jika token hilang atau action tidak sesuai.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>Turnstile Verification</span>
                <Badge variant="outline" className="font-mono text-[10px]">/turnstile-spin</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'siteverify must be called server-side. Validate success === true, verify hostname matches your domain, and verify the action string to prevent token reuse.'
                  : 'siteverify wajib dipanggil server-side. Validasi success === true, pastikan hostname cocok dengan domain Anda, dan cek string action untuk mencegah pemakaian ulang token.'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>Cloudflare One Access</span>
                <Badge variant="outline" className="font-mono text-[10px]">/cloudflare-one</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Audit blast radius before modifying access rules. Always establish rollback routes before touching enterprise split tunnel configurations.'
                  : 'Audit blast radius sebelum mengubah aturan akses. Selalu siapkan rute rollback sebelum menyentuh konfigurasi enterprise split tunnel.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
