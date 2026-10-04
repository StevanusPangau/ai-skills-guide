import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx impeccable install',
  '# lalu di dalam alat AI Anda: /impeccable init',
  '# perbarui: npx impeccable update',
].join('\n')

const SUBMODULE = [
  'git submodule add https://github.com/pbakaus/impeccable .impeccable',
  'npx impeccable link --source=.impeccable --providers=claude,cursor',
  '# Claude Code plugin: /plugin marketplace add pbakaus/impeccable',
].join('\n')

const DETECT = [
  'npx impeccable detect src/',
  'npx impeccable detect https://example.com',
  'npx impeccable detect --json .',
].join('\n')

export function ImpeccableInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Impeccable is one skill with 24 commands, installed with its own installer from Paul Bakaus’s repository.'
            : 'Impeccable adalah satu skill dengan 24 command, di-install dengan installer-nya sendiri dari repository Paul Bakaus.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              CLI installer
            </CardTitle>
            <Badge>Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'The installer detects your harness (Claude Code, Cursor, Codex, Copilot, Grok Build, Hermes and more), installs the single impeccable skill into the project or globally, and on supported tools also installs the design hook. Then run /impeccable init once per project: it writes PRODUCT.md only; DESIGN.md comes from document or new-work.'
              : 'Installer mendeteksi harness Anda (Claude Code, Cursor, Codex, Copilot, Grok Build, Hermes, dan lainnya), memasang satu skill impeccable ke proyek atau global, dan pada tool yang didukung juga memasang design hook. Lalu jalankan /impeccable init sekali per proyek: ia hanya menulis PRODUCT.md; DESIGN.md berasal dari document atau new-work.'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Other routes from the upstream README: a git submodule linked with npx impeccable link, plugin installs (e.g. Claude Code marketplace), and manual copy.'
              : 'Jalur lain dari README upstream: git submodule yang di-link dengan npx impeccable link, plugin (mis. marketplace Claude Code), dan salin manual.'}
          </p>
          <CodeBlock code={SUBMODULE} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'The standalone CLI only detects anti-patterns without an AI harness (61 deterministic rules). Commands such as init, audit, critique and live are not CLI verbs: they run inside your AI tool as /impeccable <command>.'
              : 'CLI mandiri hanya mendeteksi anti-pattern tanpa harness AI (61 aturan deterministik). Command seperti init, audit, critique, dan live bukan verb CLI: dijalankan di dalam alat AI Anda sebagai /impeccable <command>.'}
          </p>
          <CodeBlock code={DETECT} shell />
          <p className="text-xs text-muted-foreground">Licensed under the Apache License 2.0 © Paul Bakaus. ios.md/android.md are distilled from MIT-licensed ehmo/platform-design-skills (see NOTICE.md upstream).</p>
        </CardContent>
      </Card>
    </section>
  )
}
