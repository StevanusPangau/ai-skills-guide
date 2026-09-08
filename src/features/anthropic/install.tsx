import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = ['npx skills@latest add anthropics/skills', '# Pilih skill saat prompt (mis. skill-creator, mcp-builder, docx)', '# Install dari upstream Anthropic; gunakan sesuai lisensi masing-masing skill'].join('\n')

export function AnthropicInstall() {
  const isEn = getLocale() === 'en'
  return <section id="installation" className="scroll-mt-20 space-y-8"><div><h2 className="text-2xl font-bold tracking-tight">Installation</h2><p className="mt-2 max-w-2xl text-muted-foreground">{isEn ? 'Install official skills directly from Anthropic’s upstream repository.' : 'Install skill resmi langsung dari repository upstream Anthropic.'}</p></div><Card className="border-primary/40"><CardHeader className="pb-3"><div className="flex flex-wrap items-center gap-3"><CardTitle as="h3" className="text-base">Universal CLI (skills.sh)</CardTitle><Badge>Recommended</Badge></div></CardHeader><CardContent className="space-y-3"><CodeBlock code={INSTALL} shell /><p className="text-sm text-muted-foreground">{isEn ? 'Choose only the skill relevant to your task. The guide is a summary; installation and authoritative terms remain upstream.' : 'Pilih hanya skill yang relevan dengan tugas. Guide ini hanya ringkasan; instalasi dan ketentuan resmi tetap di upstream.'}</p><p className="text-xs text-muted-foreground">Copyright Anthropic PBC. All rights reserved.</p></CardContent></Card></section>
}
