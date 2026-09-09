import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocale } from '@/paraglide/runtime.js'

const concepts = [
  ['Progressive disclosure', 'Progressive disclosure', 'Mulai dari ringkasan SKILL.md, lalu baca referensi hanya saat dibutuhkan agar context tetap efisien.', 'Start with the SKILL.md summary, then read references only when needed to keep context efficient.', 'skill-creator'],
  ['Struktur modular', 'Modular structure', 'SKILL.md mendefinisikan workflow; references menyimpan pengetahuan detail; scripts menangani operasi deterministik.', 'SKILL.md defines the workflow; references hold deep knowledge; scripts handle deterministic operations.', 'SKILL.md + references + scripts'],
  ['Loop eval dan benchmark', 'Eval and benchmark loop', 'skill-creator menguji skill dengan evaluasi, membandingkan hasil, lalu mengiterasi instruksi berdasarkan bukti.', 'skill-creator tests skills with evaluations, compares results, and iterates instructions from evidence.', 'skill-creator'],
  ['Trigger-first reference', 'Trigger-first reference', 'claude-api dipilih saat tugas membutuhkan integrasi API Claude; trigger yang jelas mencegah penggunaan yang keliru.', 'Use claude-api when a task needs Claude API integration; clear triggers prevent misuse.', 'claude-api'],
]

export function AnthropicConcepts() {
  const isEn = getLocale() === 'en'
  return <section id="concepts" className="scroll-mt-20 space-y-6"><div><h2 className="text-2xl font-bold tracking-tight">{isEn ? 'How Anthropic skills work' : 'Cara kerja skill Anthropic'}</h2><p className="mt-1 text-sm text-muted-foreground">{isEn ? 'Patterns shared by the official collection.' : 'Pola yang digunakan koleksi resmi.'}</p></div><div className="grid gap-4 md:grid-cols-2">{concepts.map(([id, enTitle, idText, enText, badge]) => <Card key={id}><CardHeader className="pb-2"><div className="flex items-center justify-between gap-2"><CardTitle className="text-base">{isEn ? enTitle : id}</CardTitle><Badge variant="outline" className="font-mono text-[11px]">/{badge}</Badge></div></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">{isEn ? enText : idText}</p></CardContent></Card>)}</div></section>
}
