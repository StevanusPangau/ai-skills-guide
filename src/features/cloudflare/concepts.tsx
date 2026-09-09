import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocale } from '@/paraglide/runtime.js'

const concepts = [
  ['Retrieval over pre-training', 'Retrieval over pre-training', 'API Workers berubah cepat; skill memaksa agent mengambil dokumentasi dan schema terkini sebelum menulis kode, bukan mengandalkan hafalan model.', 'Workers APIs change fast; skills force the agent to retrieve current docs and schemas before writing code instead of relying on model memory.', 'workers-best-practices'],
  ['Bindings, bukan REST', 'Bindings over REST', 'Di dalam Worker, operasi storage, AI, dan email lewat binding langsung — lebih cepat dan aman daripada memanggil REST API publik.', 'Inside a Worker, storage, AI, and email go through direct bindings — faster and safer than calling the public REST API.', 'cloudflare'],
  ['Package line stabil vs @next', 'Stable vs @next package line', 'Sandbox punya dua lini inkompatibel: stable (command string, session) dan @next (argv, process handle). Jangan campur package dan image beda lini.', 'Sandbox has two incompatible lines: stable (command strings, sessions) and @next (argv, process handles). Never mix packages and images across lines.', 'sandbox-next'],
  ['Docs-first Zero Trust', 'Docs-first Zero Trust', 'Perubahan Cloudflare One selalu diawali klasifikasi blast radius, verifikasi schema terkini, pilot terbatas, dan rollback eksplisit — tanpa menebak ID atau field API.', 'Cloudflare One changes always start with blast-radius classification, current-schema verification, a scoped pilot, and explicit rollback — never guessing API IDs or fields.', 'cloudflare-one'],
]

export function CloudflareConcepts() {
  const isEn = getLocale() === 'en'
  return <section id="concepts" className="scroll-mt-20 space-y-6"><div><h2 className="text-2xl font-bold tracking-tight">{isEn ? 'How Cloudflare skills work' : 'Cara kerja skill Cloudflare'}</h2><p className="mt-1 text-sm text-muted-foreground">{isEn ? 'Patterns shared by the official collection.' : 'Pola yang digunakan koleksi resmi.'}</p></div><div className="grid gap-4 md:grid-cols-2">{concepts.map(([id, enTitle, idText, enText, badge]) => <Card key={id}><CardHeader className="pb-2"><div className="flex items-center justify-between gap-2"><CardTitle className="text-base">{isEn ? enTitle : id}</CardTitle><Badge variant="outline" className="font-mono text-[11px]">/{badge}</Badge></div></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">{isEn ? enText : idText}</p></CardContent></Card>)}</div></section>
}
