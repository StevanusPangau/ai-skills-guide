import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  '# Cara yang didokumentasikan repo komunitas (Claude Code plugin marketplace)',
  '/plugin marketplace add tanstack-skills/tanstack-skills',
  '/plugin install tanstack-all@tanstack-skills',
  '',
  '# Via skills.sh (tidak didokumentasikan upstream; pilih skill saat prompt)',
  'npx skills@latest add tanstack-skills/tanstack-skills',
  '',
  '# Resmi dari TanStack: TanStack Intent (npx @tanstack/intent install)',
].join('\n')

export function TanStackInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install community skills from the unaffiliated tanstack-skills/tanstack-skills repository, or use TanStack Intent for TanStack’s own agent skills.'
            : 'Install skill komunitas dari repository tanstack-skills/tanstack-skills (tidak berafiliasi dengan TanStack), atau gunakan TanStack Intent untuk skill agent resmi TanStack.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              Universal CLI (skills.sh & TanStack Intent)
            </CardTitle>
            <Badge>Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'These community skills are not published by TanStack. TanStack Intent (@tanstack/intent) is TanStack’s own mechanism: it packages agent skills alongside npm packages, so skills update as your dependencies update.'
              : 'Skill komunitas ini tidak dirilis oleh TanStack. TanStack Intent (@tanstack/intent) adalah mekanisme resmi TanStack: ia mengemas skill agent bersama paket npm, sehingga skill ikut terbarui saat dependensi Anda di-update.'}
          </p>
          <p className="text-xs text-muted-foreground">Licensed under the MIT License © 2026 tanstack-skills (community repository, not affiliated with TanStack).</p>
        </CardContent>
      </Card>
    </section>
  )
}
