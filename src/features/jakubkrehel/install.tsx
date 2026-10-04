import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

export function JakubInstall() {
  const pluginSteps = [
    '/plugin marketplace add jakubkrehel/skills',
    m.jakub_install_plugin_comment(),
    '/plugin install interfaces@interfaces',
  ].join('\n')
  const skillsShSteps = [
    'npx skills@latest add jakubkrehel/skills',
    m.jakub_install_comment_pick(),
    m.jakub_install_comment_run(),
  ].join('\n')

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.jakub_install_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                {m.jakub_install_plugin_title()}
              </CardTitle>
              <Badge variant="default">{m.jakub_install_plugin_badge()}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={pluginSteps} shell />
            <p className="text-sm text-muted-foreground">
              {m.jakub_install_plugin_note()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Universal CLI (skills.sh)
              </CardTitle>
              <Badge variant="secondary">{m.jakub_install_cli_badge()}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={skillsShSteps} shell />
            <p className="text-sm text-muted-foreground">
              {m.jakub_install_cli_note()}
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/jakubkrehel/skills"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh/jakubkrehel/skills')}
              >
                skills.sh/jakubkrehel/skills
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        {m.jakub_install_attr_prefix()}{' '}
        <a
          href="https://github.com/jakubkrehel/skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Jakub Krehel on GitHub')}
        >
          Jakub Krehel
        </a>{' '}
        {m.jakub_install_attr_mid()}{' '}
        <a
          href="https://interfaces.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('interfaces.dev')}
        >
          interfaces.dev
        </a>.
      </p>
    </section>
  )
}
