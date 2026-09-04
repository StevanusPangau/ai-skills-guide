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

const HERMES_STEPS = [
  '# Install langsung skill ke Hermes Agent via GitHub repo:',
  'hermes skills install https://github.com/OutThisLife/brooklyn-skills/tree/main/skills/cpr',
  'hermes skills install https://github.com/OutThisLife/brooklyn-skills/tree/main/skills/babysit',
  'hermes skills install https://github.com/OutThisLife/brooklyn-skills/tree/main/skills/no-tropes',
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
                Claude Code · Cursor · Codex · OpenCode
              </CardTitle>
              <Badge variant="default">skills.sh</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              Install langsung dari repository resmi Brooklyn menggunakan CLI skills.sh interaktif.
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

        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Hermes Agent
              </CardTitle>
              <Badge variant="secondary">On-Demand</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={HERMES_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              Hermes Agent memuat skill secara modular ke dalam memori atau mengunduh folder skill langsung ke <code className="font-mono text-xs">~/.hermes/skills/</code>.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">
              {m.installation_attribution()}
            </strong>{' '}
            Semua 21 skill autonomous engineering diciptakan oleh{' '}
            <strong className="text-foreground">Brooklyn (@imbabybrooklyn)</strong>. Memanfaatkan database anti-trope dari{' '}
            <a
              href="https://tropes.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className={externalTextLinkClass}
              aria-label={externalLinkAriaLabel('tropes.fyi')}
            >
              tropes.fyi
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
