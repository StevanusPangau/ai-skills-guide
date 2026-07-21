import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

export function Concepts() {
  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">{m.concepts_title()}</h2>
        <p className="text-muted-foreground mt-1">
          {m.concepts_description()}
        </p>
      </div>

      {/* Deep vs Shallow Modules */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_deep_shallow_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.concepts_deep_shallow_p1()}
          </p>
          <p className="text-sm text-muted-foreground">
            {m.concepts_deep_shallow_p2()}
          </p>
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="border-2 border-emerald-600 rounded p-3 text-center">
              <div className="border-b border-border pb-2 mb-2 font-semibold">
                narrow interface
              </div>
              <div className="h-24 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 rounded">
                deep implementation
              </div>
              <p className="mt-2 text-emerald-700 dark:text-emerald-400 font-semibold">{m.concepts_deep_module()}</p>
            </div>
            <div className="border-2 border-red-500 rounded p-3 text-center">
              <div className="border-b border-border pb-2 mb-2 font-semibold">
                wide interface
              </div>
              <div className="h-8 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded">
                shallow impl
              </div>
              <p className="mt-2 text-red-600 dark:text-red-400 font-semibold">{m.concepts_shallow_module()}</p>
            </div>
          </div>

          {/* Grey Box Modules */}
          <div className="border border-border rounded p-4 mt-4 space-y-2">
            <p className="text-sm font-semibold">{m.concepts_grey_box_title()}</p>
            <p className="text-xs text-muted-foreground">
              {m.concepts_grey_box_description()}
            </p>
            <div className="font-mono text-xs grid grid-cols-3 gap-2 mt-2">
              <div className="border border-emerald-600 rounded p-2 text-center bg-emerald-50 dark:bg-emerald-900/10">
                <span className="font-semibold">You</span>
                <p className="text-muted-foreground mt-1">Design interface</p>
              </div>
              <div className="border border-sky-600 rounded p-2 text-center bg-sky-50 dark:bg-sky-900/10">
                <span className="font-semibold">Tests</span>
                <p className="text-muted-foreground mt-1">Lock behavior</p>
              </div>
              <div className="border border-purple-600 rounded p-2 text-center bg-purple-50 dark:bg-purple-900/10">
                <span className="font-semibold">AI</span>
                <p className="text-muted-foreground mt-1">Implements</p>
              </div>
            </div>
          </div>

          {/* Progressive Disclosure */}
          <div className="border border-border rounded p-4 space-y-2">
            <p className="text-sm font-semibold">{m.concepts_progressive_title()}</p>
            <p className="text-xs text-muted-foreground">
              {m.concepts_progressive_description()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Smart Zone vs Dumb Zone */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_smart_zone_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.concepts_smart_zone_p1()}
          </p>
          {/* Visual progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{m.concepts_smart_zone_start()}</span>
              <span className="font-semibold text-foreground">{m.concepts_smart_zone_limit()}</span>
              <span>{m.concepts_smart_zone_end()}</span>
            </div>
            <div className="h-5 rounded-full bg-secondary overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full" />
              <div className="absolute inset-y-0 left-[12%] w-[88%] bg-gradient-to-r from-amber-400 via-red-400 to-red-600 rounded-r-full opacity-50" />
              <div className="absolute inset-0 flex items-center px-3">
                <div className="w-[12%] text-center text-[10px] font-bold text-white">SMART</div>
              </div>
            </div>
            <div className="flex text-xs gap-4 mt-1">
              <span className="text-emerald-600 dark:text-emerald-400">{m.concepts_smart_zone_good()}</span>
              <span className="text-red-500">{m.concepts_smart_zone_bad()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="border border-border rounded p-3 space-y-1">
              <p className="font-semibold text-foreground">{m.concepts_compact_title()}</p>
              <p className="text-muted-foreground">
                {m.concepts_compact_description()}
              </p>
            </div>
            <div className="border border-border rounded p-3 space-y-1">
              <p className="font-semibold text-foreground">{m.concepts_handoff_title()}</p>
              <p className="text-muted-foreground">
                {m.concepts_handoff_description()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Vertical Slices */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_vertical_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.concepts_vertical_description()}
          </p>

          {/* Bad vs Good comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-red-500/50 rounded p-3 space-y-2">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">{m.concepts_horizontal_bad()}</p>
              <div className="font-mono text-[11px] space-y-1 text-muted-foreground">
                <p>1. Build the schema</p>
                <p>2. Build the API</p>
                <p>3. Build the UI</p>
                <p>4. Add tests</p>
              </div>
              <p className="text-[10px] text-red-500 mt-2">
                {m.concepts_horizontal_note()}
              </p>
            </div>
            <div className="border-2 border-emerald-500/50 rounded p-3 space-y-2">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{m.concepts_vertical_good()}</p>
              <div className="font-mono text-[11px] space-y-1 text-muted-foreground">
                <p>1. User can create simplest thing E2E</p>
                <p>2. User can edit one field E2E</p>
                <p>3. User sees first validation error E2E</p>
              </div>
              <p className="text-[10px] text-emerald-500 mt-2">
                {m.concepts_vertical_note()}
              </p>
            </div>
          </div>

          <div className="font-mono text-xs border border-border rounded p-4">
            <div className="grid grid-cols-4 gap-1 text-center relative">
              <div className="bg-secondary p-2 rounded">UI</div>
              <div className="bg-secondary p-2 rounded">API</div>
              <div className="bg-secondary p-2 rounded">DB</div>
              <div className="bg-secondary p-2 rounded">Test</div>
              {/* Highlight overlay */}
              <div className="absolute inset-0 border-2 border-primary rounded opacity-60 pointer-events-none" />
            </div>
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold">
                {m.concepts_tracer_label()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* AFK vs HITL */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_afk_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.concepts_afk_description()}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-emerald-600/50 rounded p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs bg-emerald-600">{m.concepts_afk_label()}</Badge>
                <span className="text-sm font-semibold">Away From Keyboard</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {m.concepts_afk_text()}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                {m.concepts_afk_quote()}
              </p>
            </div>
            <div className="border border-amber-600/50 rounded p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs bg-amber-600 text-white">{m.concepts_hitl_label()}</Badge>
                <span className="text-sm font-semibold">Human In The Loop</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {m.concepts_hitl_text()}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-mono">
                {m.concepts_hitl_quote()}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            {m.concepts_afk_note()}
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Seams */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_seams_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {m.concepts_seams_description()}
          </p>
          <div className="text-xs border border-border rounded p-3 space-y-2">
            <p className="font-semibold">{m.concepts_seams_vocab()}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
              <span><span className="font-semibold text-foreground">Module:</span> sesuatu dengan interface + implementation</span>
              <span><span className="font-semibold text-foreground">Interface:</span> semua yang caller harus tahu</span>
              <span><span className="font-semibold text-foreground">Depth:</span> leverage dari interface</span>
              <span><span className="font-semibold text-foreground">Seam:</span> tempat behavior bisa vary</span>
              <span><span className="font-semibold text-foreground">Adapter:</span> concrete thing di seam</span>
              <span><span className="font-semibold text-foreground">Locality:</span> related change tetap berdekatan</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Context Hygiene */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_context_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {m.concepts_context_description()}
          </p>
          <div className="text-xs border border-border rounded p-3 space-y-1 text-muted-foreground">
            <p><span className="font-semibold text-foreground">CONTEXT.md:</span> Pure glossary. Bukan spec, scratchpad, atau implementation detail.</p>
            <p><span className="font-semibold text-foreground">ADR (docs/adr/):</span> Sparingly. Hanya 3-syarat decisions. Most sessions = 0 ADRs.</p>
            <p><span className="font-semibold text-foreground">Prototype:</span> Disposable. Capture answer → delete code.</p>
            <p><span className="font-semibold text-foreground">Handoff docs:</span> Temp dir. Disposable working docs, bukan permanent.</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Leading Words */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.concepts_leading_title()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {m.concepts_leading_description()}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
