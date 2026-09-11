import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type WorkloadKey = 'stateless' | 'stateful' | 'agent' | 'sandbox' | 'bot'

export function CloudflareEdgeMatrix() {
  const isEn = getLocale() === 'en'
  const [workload, setWorkload] = useState<WorkloadKey>('stateful')
  const [bindingMode, setBindingMode] = useState<'binding' | 'rest'>('binding')
  const [sandboxLine, setSandboxLine] = useState<'stable' | 'next'>('next')

  const workloads = {
    stateful: {
      titleId: 'Multiplayer Real-time & Sinkronisasi State',
      titleEn: 'Real-time Multiplayer & State Sync',
      primitive: 'Durable Objects (DO)',
      skill: '/durable-objects',
      wranglerExample: '[[durable_objects.bindings]]\nname = "CHAT_ROOM"\nclass_name = "ChatRoom"',
      latency: '~0.8ms (in-memory actor)',
      whyId: 'Durable Objects menjamin single-point-of-coordination global dengan penyimpanan SQLite lokal per instance.',
      whyEn: 'Durable Objects provide a guaranteed single point of coordination globally with co-located SQLite storage.',
    },
    stateless: {
      titleId: 'API & Webhook Berkecepatan Tinggi',
      titleEn: 'High-Throughput API & Webhooks',
      primitive: 'Workers Core (V8 Isolates)',
      skill: '/workers-best-practices',
      wranglerExample: 'name = "api-gateway"\nmain = "src/index.ts"\ncompatibility_date = "2026-03-01"',
      latency: '0ms cold start (< 5ms P95)',
      whyId: 'V8 isolates berjalan dalam proses bersama tanpa virtual machine startup delay. Ideal untuk event routing.',
      whyEn: 'V8 isolates run within shared processes without VM startup latency. Ideal for event routing.',
    },
    agent: {
      titleId: 'Siklus Nalar Multi-Turn AI Agent',
      titleEn: 'Multi-Turn AI Agent Reasoning Loop',
      primitive: 'Cloudflare Agents SDK',
      skill: '/agents-sdk',
      wranglerExample: 'import { Agent } from "@cloudflare/agents"\nexport class ResearchAgent extends Agent<Env> {}',
      latency: '~2ms actor state hop',
      whyId: 'Menyediakan state machine persisten, integrasi MCP tools, dan streaming LLM native di edge.',
      whyEn: 'Provides persistent actor state machines, MCP tool integration, and native edge LLM streaming.',
    },
    sandbox: {
      titleId: 'Eksekusi Kode Untrusted & Sandbox Runner',
      titleEn: 'Untrusted Code Execution & Sandbox Runner',
      primitive: 'Cloudflare Sandbox (@next)',
      skill: '/sandbox-next',
      wranglerExample: '[[containers]]\nname = "code-runner"\nimage = "cloudflare/sandbox-runtime:latest"',
      latency: '~45ms container boot',
      whyId: 'Eksekusi kode bebas di MicroVM terisolasi dengan kontrol jaringan ketat dan argv streaming terstruktur.',
      whyEn: 'Arbitrary code execution in isolated MicroVMs with strict egress controls and structured argv streaming.',
    },
    bot: {
      titleId: 'Proteksi Form Publik & Anti-Bot',
      titleEn: 'Public Form Protection & Anti-Bot',
      primitive: 'Turnstile + Workers Backend',
      skill: '/turnstile-spin',
      wranglerExample: 'const outcome = await siteverify(token, secretKey, { action, hostname })',
      latency: '~15ms edge siteverify',
      whyId: 'Fail-closed verification di backend: selalu verifikasi success === true, action, dan allowed hostname.',
      whyEn: 'Fail-closed backend verification: always confirm success === true, action, and allowed hostname.',
    },
  }

  const currentWl = workloads[workload]

  return (
    <section id="edge-matrix" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Edge Runtime & Binding Matrix' : 'Matriks Runtime & Binding Cloudflare'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive decision engine for Cloudflare primitives: select the right compute architecture, compare direct in-memory bindings vs REST, and inspect Sandbox package lines.'
            : 'Engine keputusan interaktif untuk primitif Cloudflare: pilih arsitektur compute yang tepat, bandingkan binding in-memory vs REST, dan periksa lini package Sandbox.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: Architecture Decision Engine */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              {isEn ? '1. Edge Architecture & Primitive Decision Engine' : '1. Mesin Keputusan Arsitektur Edge & Primitif'}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {isEn
                ? 'Select your application workload to discover the recommended Cloudflare edge primitive and binding.'
                : 'Pilih jenis beban kerja aplikasi Anda untuk menemukan primitif edge dan binding Cloudflare yang direkomendasikan.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Workload Buttons */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['stateful', 'Multiplayer & State', 'Multiplayer & State'],
                  ['stateless', 'Stateless API / Webhook', 'Stateless API / Webhook'],
                  ['agent', 'AI Agent Loop', 'Loop AI Agent'],
                  ['sandbox', 'Sandboxed Code Runner', 'Eksekusi Kode Sandbox'],
                  ['bot', 'Anti-Bot / Form Security', 'Anti-Bot / Keamanan Form'],
                ] as const
              ).map(([key, enLabel, idLabel]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setWorkload(key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors border ${
                    workload === key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? enLabel : idLabel}
                </button>
              ))}
            </div>

            {/* Architecture Result Card */}
            <div className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                    {isEn ? 'RECOMMENDED PRIMITIVE' : 'PRIMITIF DIREKOMENDASIKAN'}
                  </span>
                  <div className="text-base font-bold text-foreground font-mono">
                    {currentWl.primitive}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {currentWl.latency}
                  </Badge>
                  <Badge className="bg-primary/20 text-primary border border-primary/30 font-mono text-xs">
                    {currentWl.skill}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 text-xs">
                <div className="space-y-1.5">
                  <span className="font-semibold text-foreground">
                    {isEn ? 'Architecture Rationale: ' : 'Alasan Arsitektur: '}
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn ? currentWl.whyEn : currentWl.whyId}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-semibold text-foreground font-mono text-[11px]">
                    wrangler.jsonc / Code Config:
                  </span>
                  <pre className="rounded bg-zinc-950 p-2.5 text-[11px] font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
                    {currentWl.wranglerExample}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 in 2 Columns */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Direct In-Memory Bindings vs REST */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Direct Bindings vs Public REST Latency' : '2. Latensi Direct Binding vs REST Publik'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Cloudflare Workers access internal resources in-process, bypassing the public internet.'
                  : 'Cloudflare Workers mengakses resource internal in-process, mem-bypass internet publik.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setBindingMode('binding')}
                  className={`flex-1 py-1 text-xs font-mono font-bold rounded transition-colors ${
                    bindingMode === 'binding'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Direct Binding (Native)' : 'Direct Binding (Asli)'}
                </button>
                <button
                  type="button"
                  onClick={() => setBindingMode('rest')}
                  className={`flex-1 py-1 text-xs font-mono font-bold rounded transition-colors ${
                    bindingMode === 'rest'
                      ? 'bg-destructive/20 text-destructive'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Public REST API (HTTP)' : 'Public REST API (HTTP)'}
                </button>
              </div>

              {/* Latency Comparison Card */}
              <div className="rounded-lg bg-muted/30 p-3 border border-border space-y-3 text-xs">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-muted-foreground">
                    {isEn ? 'Round-trip Latency:' : 'Latensi Round-trip:'}
                  </span>
                  <span
                    className={`text-base font-bold ${
                      bindingMode === 'binding'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-destructive'
                    }`}
                  >
                    {bindingMode === 'binding' ? '1.4 ms' : '118.0 ms'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        bindingMode === 'binding' ? 'bg-emerald-500 w-[3%]' : 'bg-destructive w-[100%]'
                      }`}
                    />
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground leading-relaxed">
                  {bindingMode === 'binding' ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {isEn
                        ? '✓ Zero TCP handshake, zero TLS negotiation, zero DNS resolution. Hyperdrive runs in-process.'
                        : '✓ Nol handshake TCP, nol negosiasi TLS, nol resolusi DNS. Hyperdrive berjalan in-process.'}
                    </span>
                  ) : (
                    <span className="text-destructive font-semibold">
                      {isEn
                        ? '✕ Traverses public internet: DNS (12ms) + TLS (38ms) + Network routing (45ms) + Auth (23ms).'
                        : '✕ Melintasi internet publik: DNS (12ms) + TLS (38ms) + Routing jaringan (45ms) + Auth (23ms).'}
                    </span>
                  )}
                </div>

                <pre className="rounded bg-zinc-950 p-2 text-[11px] font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
                  {bindingMode === 'binding'
                    ? '// Worker binding\nconst user = await env.DB.prepare(\n  "SELECT * FROM users WHERE id = ?"\n).bind(id).first()'
                    : '// Public REST call\nconst res = await fetch(\n  "https://api.cloudflare.com/client/v4/...",\n  { headers: { Authorization: `Bearer ${TOKEN}` } }\n)'}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: Sandbox Package Line Incompatibility */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Sandbox Package Line Dichotomy' : '3. Dikotomi Lini Package Sandbox'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Stable and @next are incompatible lineages: never mix packages and images.'
                  : 'Lini stable dan @next tidak saling kompatibel: dilarang mencampur package dan image.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setSandboxLine('stable')}
                  className={`flex-1 py-1 text-xs font-mono font-bold rounded transition-colors ${
                    sandboxLine === 'stable'
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  stable (@cloudflare/sandbox)
                </button>
                <button
                  type="button"
                  onClick={() => setSandboxLine('next')}
                  className={`flex-1 py-1 text-xs font-mono font-bold rounded transition-colors ${
                    sandboxLine === 'next'
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  @next (@cloudflare/sandbox@next)
                </button>
              </div>

              <div className="rounded-lg bg-card border border-border p-3 space-y-2 text-xs">
                {sandboxLine === 'stable' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="font-mono text-[10px]">Lini Lama / Stable</Badge>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-semibold">Maintenance Mode</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {isEn
                        ? 'Uses shell execution strings (exec("npm test")), session IDs, and poll-based status. Only for existing apps; do not start greenfield projects here.'
                        : 'Memakai string eksekusi shell (exec("npm test")), session ID, dan polling status. Hanya untuk aplikasi lama; proyek baru dilarang mulai di sini.'}
                    </p>
                    <pre className="rounded bg-muted p-2 font-mono text-[10px] text-foreground">
                      {'const session = await sandbox.getSession(id)\nawait session.exec("ls -la")'}
                    </pre>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono text-[10px]">
                        Lini Modern / @next
                      </Badge>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Recommended</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {isEn
                        ? 'Uses structured argv arrays (startProcess(["npm", "test"])), streaming process handles, and explicit exit codes. Required for all new agent workflows.'
                        : 'Memakai array argv terstruktur (startProcess(["npm", "test"])), handle proses streaming, dan exit code eksplisit. Wajib untuk semua workflow agen baru.'}
                    </p>
                    <pre className="rounded bg-muted p-2 font-mono text-[10px] text-foreground">
                      {'const proc = await sandbox.startProcess(["ls", "-la"])\nfor await (const chunk of proc.stdout) { ... }'}
                    </pre>
                  </div>
                )}

                <div className="border-t border-border pt-2 text-[10px] text-muted-foreground">
                  <strong className="text-foreground">{isEn ? 'Cutover Gate: ' : 'Pintu Cutover: '}</strong>
                  {isEn
                    ? 'Production migration requires explicit user confirmation before applying --containers-rollout=immediate.'
                    : 'Migrasi produksi mewajibkan persetujuan eksplisit user sebelum menerapkan --containers-rollout=immediate.'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
