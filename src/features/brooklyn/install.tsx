import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

// Upstream README: give the agent the repo URL and ask it to copy each
// skills/<name>/ directory as a complete unit.
const AGENT_PROMPT = [
  'https://github.com/OutThisLife/brooklyn-skills',
  '',
  'Install the pr-triage and pr-ready skills from this repository.',
].join('\n')

// Upstream README: Hermes Agent can point at a checkout instead of copying.
const HERMES_YAML = [
  '# ~/.hermes/config.yaml',
  'skills:',
  '  external_dirs:',
  '    - ~/path/to/brooklyn-skills/skills',
].join('\n')

const SKILLS_SH_STEPS = 'npx skills@latest add OutThisLife/brooklyn-skills'

export function BrooklynInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.brooklyn_install_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                {m.brooklyn_install_agent_title()}
              </CardTitle>
              <Badge variant="default">Upstream</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={AGENT_PROMPT} />
            <p className="text-sm text-muted-foreground">
              {m.brooklyn_install_agent_note()}
            </p>
            <p className="text-sm text-muted-foreground">
              {m.brooklyn_install_triage_note()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle as="h3" className="text-base">
              {m.brooklyn_install_hermes_title()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={HERMES_YAML} />
            <p className="text-sm text-muted-foreground">
              {m.brooklyn_install_hermes_note()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle as="h3" className="text-base">
              {m.brooklyn_install_skills_sh_title()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              {m.brooklyn_install_skills_sh_note()}
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
        {m.brooklyn_install_attribution()}{' '}
        <a
          href="https://github.com/OutThisLife/brooklyn-skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Brooklyn on GitHub')}
        >
          Brooklyn
        </a>{' '}
        {m.brooklyn_install_license()}{' '}
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
    </section>
  )
}
