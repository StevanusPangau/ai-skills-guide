import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function ShadcnConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'shadcn/ui Critical Rules' : 'Critical Rules shadcn/ui'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Three cards drawn from rules/composition.md, rules/styling.md, and rules/forms.md — quote the rule intent, not a fabricated API.'
            : 'Tiga kartu dari rules/composition.md, rules/styling.md, dan rules/forms.md — mengutip intent aturan, bukan API fiktif.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn
              ? 'Composition: use components, not custom markup'
              : 'Composition: pakai komponen, bukan markup kustom'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            rules/composition.md ·{' '}
            {isEn
              ? 'Items always inside their Group; prefer Alert, Empty, Separator, Skeleton, Badge.'
              : 'Item selalu di dalam Group-nya; utamakan Alert, Empty, Separator, Skeleton, Badge.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  GROUP
                </Badge>
                <span className="text-[10px] text-muted-foreground">Items</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">
                SelectItem → SelectGroup
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Never render items directly in the content container. Same for DropdownMenu, Command, Menubar, ContextMenu.'
                  : 'Jangan render item langsung di content container. Sama untuk DropdownMenu, Command, Menubar, ContextMenu.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  OVERLAY
                </Badge>
                <span className="text-[10px] text-muted-foreground">a11y</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">
                DialogTitle required
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Dialog, Sheet, and Drawer always need a Title. Use className="sr-only" if visually hidden.'
                  : 'Dialog, Sheet, dan Drawer selalu butuh Title. Pakai className="sr-only" bila disembunyikan visual.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  REPLACE
                </Badge>
                <span className="text-[10px] text-muted-foreground">markup</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">
                Alert · Empty · Separator
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Callouts use Alert; empty states use Empty; use Separator instead of hr or border-t divs; Skeleton instead of animate-pulse divs.'
                  : 'Callout pakai Alert; empty state pakai Empty; Separator menggantikan hr atau div border-t; Skeleton menggantikan div animate-pulse.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Styling tokens' : 'Token styling'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            rules/styling.md ·{' '}
            {isEn
              ? 'Semantic colors, variants first, className for layout only.'
              : 'Warna semantik, variants dulu, className hanya untuk layout.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2 font-mono">
            <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-destructive">Incorrect</span>
                <Badge variant="outline" className="text-[10px]">
                  raw
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'bg-blue-500, text-gray-600, space-y-4, w-10 h-10, manual dark:bg-gray-950, z-50 on Dialog.'
                  : 'bg-blue-500, text-gray-600, space-y-4, w-10 h-10, dark:bg-gray-950 manual, z-50 pada Dialog.'}
              </p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Correct</span>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px]">
                  tokens
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'bg-primary, text-muted-foreground, flex flex-col gap-4, size-10, semantic tokens for dark mode, overlays own their stacking.'
                  : 'bg-primary, text-muted-foreground, flex flex-col gap-4, size-10, token semantik untuk dark mode, overlay mengatur stacking sendiri.'}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed font-sans">
            {isEn
              ? 'Prefer built-in variants (variant="outline") before custom styles. Use cn() for conditional classes — no manual template-literal ternaries. className is for layout (max-w-md, mx-auto), not for overriding component colors or typography.'
              : 'Utamakan built-in variants (variant="outline") sebelum style kustom. Pakai cn() untuk kelas kondisional — tanpa ternary template literal manual. className untuk layout (max-w-md, mx-auto), bukan menimpa warna atau tipografi komponen.'}
          </p>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Forms: FieldGroup + Field' : 'Forms: FieldGroup + Field'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            rules/forms.md ·{' '}
            {isEn
              ? 'Never raw div with space-y-* for form layout; validation uses data-invalid + aria-invalid.'
              : 'Jangan div mentah dengan space-y-* untuk layout form; validasi memakai data-invalid + aria-invalid.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">FieldGroup + Field</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'FieldLabel + Input inside Field, wrapped by FieldGroup. FieldSet + FieldLegend for related checkboxes/radios. Option sets (2–7) use ToggleGroup — do not loop Button with manual active state.'
                  : 'FieldLabel + Input di dalam Field, dibungkus FieldGroup. FieldSet + FieldLegend untuk checkbox/radio terkait. Set opsi (2–7) pakai ToggleGroup — jangan loop Button dengan active state manual.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">
                data-invalid · aria-invalid
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'data-invalid on Field styles the label/description; aria-invalid on the control styles the input. Same split for data-disabled / disabled. InputGroup requires InputGroupInput or InputGroupTextarea — never raw Input inside InputGroup.'
                  : 'data-invalid pada Field menata label/deskripsi; aria-invalid pada kontrol menata input. Pola sama untuk data-disabled / disabled. InputGroup membutuhkan InputGroupInput atau InputGroupTextarea — jangan Input mentah di dalam InputGroup.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
