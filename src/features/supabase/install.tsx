import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add supabase/agent-skills',
  '# Pilih skill saat prompt (mis. supabase-postgres-best-practices, supabase)',
  '# Install langsung dari repository resmi Supabase (MIT)',
].join('\n')

export function SupabaseInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official skills directly from Supabase’s upstream repository.'
            : 'Install skill resmi langsung dari repository upstream Supabase.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              Universal CLI (skills.sh)
            </CardTitle>
            <Badge>Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Load supabase-postgres-best-practices before writing SQL or schemas; use supabase when interacting with Auth, Storage, or Edge Functions.'
              : 'Gunakan supabase-postgres-best-practices sebelum menulis SQL atau skema; gunakan supabase saat berinteraksi dengan Auth, Storage, atau Edge Functions.'}
          </p>
          <p className="text-xs text-muted-foreground">Licensed under the MIT License © Supabase.</p>
        </CardContent>
      </Card>
    </section>
  )
}
