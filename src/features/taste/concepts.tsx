import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

const bans = [
  ['Eyebrow', m.taste_ban_eyebrow],
  ['01 / 02 / 03', m.taste_ban_index],
  ['Hairline', m.taste_ban_hairline],
  ['Gradient', m.taste_ban_gradient],
  ['Resting shadow', m.taste_ban_shadow],
  ['Glass', m.taste_ban_glass],
] as const

const picks = [
  ['design-taste-frontend', m.taste_pick_default],
  ['redesign-existing-projects', m.taste_pick_redesign],
  ['minimalist-ui', m.taste_pick_minimal],
  ['high-end-visual-design', m.taste_pick_highend],
  ['industrial-brutalist-ui', m.taste_pick_brutalist],
  ['imagegen-* / brandkit', m.taste_pick_image],
] as const

export function TasteConcepts() {
  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.taste_concepts_title()}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{m.taste_concepts_lead()}</p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{m.taste_draw_title()}</CardTitle>
          <p className="text-xs text-muted-foreground">{m.taste_draw_lead()}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 text-xs md:grid-cols-2">
            <div className="space-y-2 rounded-lg border border-primary/40 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">draw.mjs</span>
                <Badge variant="outline" className="text-[10px]">3 of 20</Badge>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{m.taste_draw_body()}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-success/40 bg-success/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-success">inspect.mjs</span>
                <Badge variant="outline" className="text-[10px] text-success">1440 / 768 / 390</Badge>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{m.taste_inspect_body()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{m.taste_bans_title()}</CardTitle>
          <p className="text-xs text-muted-foreground">{m.taste_bans_lead()}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {bans.map(([name, text]) => (
              <div key={name} className="space-y-1 rounded border border-border bg-muted/20 p-3">
                <span className="block text-xs font-medium text-foreground">{name}</span>
                <p className="text-[11px] text-muted-foreground">{text()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{m.taste_picks_title()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-xs sm:grid-cols-2">
            {picks.map(([name, text]) => (
              <div key={name} className="space-y-1 rounded border border-border bg-muted/20 p-3">
                <span className="block font-medium text-foreground">{name}</span>
                <p className="text-[11px] text-muted-foreground">{text()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
