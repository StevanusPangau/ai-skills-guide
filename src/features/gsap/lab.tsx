import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'
import { ScrubSimulator } from './lab-scroll'
import { PositionTimeline } from './lab-timeline'
import { LayoutVsCompositor } from './lab-perf'

function Module({ title, rule, note, children }: { title: string; rule: string; note?: string; children: React.ReactNode }) {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <p className="text-muted-foreground mt-0.5 text-xs">{rule}</p>
        {note ? <p className="text-muted-foreground text-xs italic">{note}</p> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function GsapTimelineLab() {
  return (
    <section id="gsap-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">{m.gsaplab_title()}</h2>
          <Badge variant="secondary" className="font-mono text-xs">
            {m.gsaplab_badge()}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{m.gsaplab_sub()}</p>
      </div>
      <div className="grid gap-6">
        <Module title={m.gsaplab_st_title()} rule={m.gsaplab_st_rule()} note={m.gsaplab_st_sim()}>
          <ScrubSimulator />
        </Module>
        <Module title={m.gsaplab_tl_title()} rule={m.gsaplab_tl_rule()}>
          <PositionTimeline />
        </Module>
        <Module title={m.gsaplab_pf_title()} rule={m.gsaplab_pf_rule()}>
          <LayoutVsCompositor />
        </Module>
      </div>
    </section>
  )
}
