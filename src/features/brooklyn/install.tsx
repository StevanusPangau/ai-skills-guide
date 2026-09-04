import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

const SKILLS_SH_STEPS = [
  'npx skills@latest add OutThisLife/brooklyn-skills',
  '# Pilih skill di prompt (misal: /cpr, /babysit, /work, /no-tropes, dll.)',
  '# Gunakan /work untuk mulai tugas di git worktree terisolasi',
].join('\n')

export function BrooklynInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Gunakan skill Brooklyn untuk mempercepat siklus Pull Request, menjaga kebersihan diff dan git worktree, memantau CI secara mandiri, serta memangkas kata-kata klise AI.
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Universal CLI (skills.sh)
              </CardTitle>
              <Badge variant="default">Recommended</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              Install langsung dari repository resmi Brooklyn menggunakan CLI skills.sh interaktif untuk Claude Code, Cursor, Codex, OpenCode, dan agent lainnya.
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/OutThisLife/brooklyn-skills"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh/OutThisLife/brooklyn-skills')}
              >
                skills.sh/OutThisLife/brooklyn-skills
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        Skills diadaptasi dari{' '}
        <a
          href="https://github.com/OutThisLife/brooklyn-skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Brooklyn on GitHub')}
        >
          Brooklyn
        </a>{' '}
        (MIT License). Basis data deteksi klise AI terintegrasi dari{' '}
        <a
          href="https://tropes.fyi"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('tropes.fyi')}
        >
          tropes.fyi
        </a>.
      </p>
    </section>
  )
}
