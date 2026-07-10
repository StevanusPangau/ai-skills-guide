import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { davidondrejSkills } from '@/data/davidondrej-skills'
import { m } from '@/paraglide/messages.js'

const firstWave = davidondrejSkills.filter((s) => s.bundleStatus === 'first-wave')

const HERMES_STEPS = [
  'hermes skills tap add StevanusPangau/ai-skills-guide',
  'hermes skills browse --source github',
  'hermes skills install StevanusPangau/ai-skills-guide/skills/davidondrej/thinking-and-docs/brain-to-docs',
].join('\n')

const HERMES_ALT = `# ~/.hermes/config.yaml
skills:
  external_dirs:
    - ~/Development/Project/Tools/ai-skills-guide/skills/davidondrej`

// Upstream via skills.sh — install full davidondrej/skills for non-Hermes agents.
const SKILLS_SH_STEPS = [
  'npx skills@latest add davidondrej/skills',
  '# Pilih skill di prompt; cek prasyarat & agent target sebelum install massal',
].join('\n')

export function DavidInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.david_install_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.david_install_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <CardTitle className="text-base">Hermes Agent</CardTitle>
              <Badge variant="default">Available</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={HERMES_STEPS} shell />
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">{m.installation_alt_label()}</p>
              <CodeBlock code={HERMES_ALT} />
            </div>
            <p className="text-sm text-muted-foreground">
              {m.david_install_notes_hermes()}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {firstWave.map((s) => (
                <span
                  key={s.name}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  /{s.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="text-base">
                Claude Code · Codex · OpenCode · Cursor
              </CardTitle>
              <Badge variant="default">skills.sh</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              {m.david_install_notes_skills_sh()}
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/davidondrej/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                skills.sh/davidondrej/skills
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{m.installation_attribution()}</strong>{' '}
            <a
              href="https://github.com/davidondrej/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              davidondrej/skills
            </a>{' '}
            {m.david_install_attribution_suffix()}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
