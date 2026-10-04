import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

// Commands copied from the upstream README (obra/superpowers v6.4.2).
// Installation differs by harness; the plugin carries the session-start
// bootstrap that makes skills trigger automatically.
const CLAUDE_CODE = '/plugin install superpowers@claude-plugins-official'
const CURSOR = '/add-plugin superpowers'
const HERMES = 'hermes plugins install obra/superpowers --enable'
const GEMINI = 'gemini extensions install https://github.com/obra/superpowers'
const PI = 'pi install git:github.com/obra/superpowers'
const CODEX_CLI = ['/plugins', '# search "superpowers", then Install Plugin'].join('\n')

export function SuperpowersInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.superpowers_install_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Claude Code
              </CardTitle>
              <Badge variant="default">Upstream</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={CLAUDE_CODE} />
            <p className="text-sm text-muted-foreground">
              {m.superpowers_install_claude_note()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle as="h3" className="text-base">
              {m.superpowers_install_other_title()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Cursor</p>
              <CodeBlock code={CURSOR} />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Hermes Agent</p>
              <CodeBlock code={HERMES} shell />
              <p className="text-xs text-muted-foreground">
                {m.superpowers_install_hermes_note()}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Codex CLI</p>
              <CodeBlock code={CODEX_CLI} />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Gemini CLI</p>
              <CodeBlock code={GEMINI} shell />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Pi</p>
              <CodeBlock code={PI} shell />
            </div>
            <p className="text-sm text-muted-foreground">
              {m.superpowers_install_more_note()}{' '}
              <a
                href="https://github.com/obra/superpowers#installation"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('Superpowers installation README')}
              >
                README
              </a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle as="h3" className="text-base">
              {m.superpowers_install_why_title()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {m.superpowers_install_why_note()}
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        {m.superpowers_install_attribution()}{' '}
        <a
          href="https://github.com/obra/superpowers"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Jesse Vincent on GitHub')}
        >
          Jesse Vincent (@obra)
        </a>{' '}
        {m.superpowers_install_license()}
      </p>
    </section>
  )
}
