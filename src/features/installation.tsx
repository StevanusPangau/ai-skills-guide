import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

const agents = [
  {
    name: 'Hermes Agent',
    status: 'available' as const,
    method: 'tap',
    steps: [
      'hermes skills tap add StevanusPangau/ai-skills-guide',
      'hermes skills browse --source github',
      'hermes skills install StevanusPangau/ai-skills-guide/skills/hermes/engineering/tdd',
    ],
    altMethod: {
      get label() { return m.installation_alt_label() },
      code: `# ~/.hermes/config.yaml
skills:
  external_dirs:
    - ~/Development/Project/Tools/ai-skills-guide/skills/hermes`,
    },
    get notes() { return m.installation_notes_hermes() },
  },
  {
    name: 'Claude Code',
    status: 'available' as const,
    method: 'native',
    steps: [
      'npx skills@latest add mattpocock/skills',
      '# Pilih skills yang diinginkan, pastikan pilih /setup-matt-pocock-skills',
      '# Jalankan /setup-matt-pocock-skills di agent untuk konfigurasi awal',
    ],
    get notes() { return m.installation_notes_claude() },
  },
  {
    name: 'OpenAI Codex',
    status: 'planned' as const,
    method: 'TBD',
    steps: [],
    get notes() { return m.installation_notes_codex() },
  },
  {
    name: 'OpenCode',
    status: 'planned' as const,
    method: 'TBD',
    steps: [],
    get notes() { return m.installation_notes_opencode() },
  },
]

export function Installation() {
  return (
    <section id="installation" className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{m.installation_title()}</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {m.installation_description()}
        </p>
      </div>

      <div className="grid gap-4">
        {agents.map((agent) => (
          <Card key={agent.name} className={agent.status === 'available' ? 'border-primary/40' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <CardTitle className="text-base">{agent.name}</CardTitle>
                <Badge variant={agent.status === 'available' ? 'default' : 'secondary'}>
                  {agent.status === 'available' ? 'Available' : 'Planned'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {agent.steps.length > 0 && (
                <div className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed overflow-x-auto">
                  {agent.steps.map((step, i) => (
                    <div key={i} className={step.startsWith('#') ? 'text-muted-foreground' : ''}>
                      {step.startsWith('#') ? step : <><span className="text-muted-foreground select-none">$ </span>{step}</>}
                    </div>
                  ))}
                </div>
              )}

              {agent.altMethod && (
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">{agent.altMethod.label}</p>
                  <div className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
                    {agent.altMethod.code}
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground">{agent.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{m.installation_attribution()}</strong>{' '}
            <a
              href="https://github.com/mattpocock/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              mattpocock/skills
            </a>{' '}
            {m.installation_attribution_suffix()}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
