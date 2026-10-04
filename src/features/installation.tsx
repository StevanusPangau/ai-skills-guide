import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

export function Installation() {
  // Plugin (Claude Code, managed) and skills.sh (editable copies) are alternatives:
  // upstream warns that installing both leaves every skill twice.
  const pluginSteps = [
    'claude plugins install mattpocock-skills',
    m.installation_plugin_inside(),
    '/plugin install mattpocock-skills',
  ].join('\n')
  // skills.sh CLI — installs to Claude Code, Codex, OpenCode, Cursor, and more.
  const skillsShSteps = [
    'npx skills@latest add mattpocock/skills',
    m.installation_skills_sh_comment_pick(),
    m.installation_skills_sh_comment_run(),
  ].join('\n')

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.installation_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                {m.installation_plugin_title()}
              </CardTitle>
              <Badge variant="default">{m.installation_plugin_badge()}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={pluginSteps} shell />
            <p className="text-sm text-muted-foreground">
              {m.installation_plugin_note()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                {m.installation_skills_sh_title()}
              </CardTitle>
              <Badge variant="secondary">{m.installation_skills_sh_badge()}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={skillsShSteps} shell />
            <p className="text-sm text-muted-foreground">
              {m.installation_notes_skills_sh()}
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh')}
              >
                skills.sh
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        {m.installation_attribution()}{' '}
        <a
          href="https://github.com/mattpocock/skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Matt Pocock on GitHub')}
        >
          Matt Pocock
        </a>{' '}
        {m.installation_attribution_suffix()}
      </p>
    </section>
  )
}
