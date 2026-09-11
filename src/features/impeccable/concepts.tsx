import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function ImpeccableConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Impeccable Design System Architecture' : 'Arsitektur Sistem Desain Impeccable'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core mental models: the dual spec files, human-grade microcopy, and sub-pixel craft floor.'
            : 'Model mental inti: file spesifikasi ganda PRODUCT/DESIGN, mikrokopi manusiawi, dan standar craft sub-piksel.'}
        </p>
      </div>

      {/* Model 1: Dual Spec Architecture */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Dual Spec Architecture: PRODUCT.md & DESIGN.md' : 'Arsitektur Spesifikasi Ganda: PRODUCT.md & DESIGN.md'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Agents must understand the product intention before writing visual tokens.'
              : 'Agen coding wajib memahami tujuan produk sebelum menulis token visual.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 font-mono text-xs">
            <div className="rounded-lg border-2 border-primary/50 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">PRODUCT.md</span>
                <Badge variant="outline" className="text-[10px]">Strategic Layer</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isEn
                  ? 'Defines user personas, brand character, problem statements, and core design invariants. Prevents the AI from hallucinating out-of-character features.'
                  : 'Mendefinisikan persona pengguna, karakter brand, masalah inti, dan batasan produk. Mencegah AI mengarang fitur di luar kepribadian brand.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-500/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">DESIGN.md</span>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px]">Visual Tokens</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isEn
                  ? 'Follows Google Stitch format: exact hex color codes, typography scales, border radii, shadows, and component patterns. Consumed deterministically by coding agents.'
                  : 'Mengikuti format Google Stitch: kode warna hex presisi, skala font, radius sudut, bayangan, dan pola komponen. Dibaca deterministik oleh agen coding.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Craft Floor Invariant */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Craft Floor Invariant' : 'Invarian Batas Bawah Kualitas (Craft Floor)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Interfaces must satisfy basic engineering and design hygiene before adding delight.'
              : 'Antarmuka harus memenuhi standar dasar rekayasa dan desain sebelum menambahkan animasi pemanis.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 sm:grid-cols-3 font-mono">
            <div className="border border-border rounded p-3 bg-muted/20 space-y-1">
              <span className="font-bold text-foreground block">1. Contrast & Readability</span>
              <p className="text-[11px] text-muted-foreground font-sans">
                Minimal kontras rasio 4.5:1 untuk teks biasa dan 3:1 untuk teks besar sesuai standar WCAG AA/AAA.
              </p>
            </div>
            <div className="border border-border rounded p-3 bg-muted/20 space-y-1">
              <span className="font-bold text-foreground block">2. Touch Targets</span>
              <p className="text-[11px] text-muted-foreground font-sans">
                Area sentuh interaktif pada mobile tidak boleh lebih kecil dari 44x44 piksel fisik.
              </p>
            </div>
            <div className="border border-border rounded p-3 bg-muted/20 space-y-1">
              <span className="font-bold text-foreground block">3. Zero Layout Shift</span>
              <p className="text-[11px] text-muted-foreground font-sans">
                Setiap gambar, font, dan iframe wajib mereservasi ruang agar halaman tidak melompat (CLS 0).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: Anti-AI Slop Manifesto */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Anti-AI Slop Manifesto' : 'Manifesto Anti-AI Slop'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Reject generic gray cards, weak contrast, meaningless floating orbs, and hollow AI buzzwords.'
              : 'Tolak kartu abu-abu tanpa kontras, bola-bola neon melayang tanpa arti, dan jargon kosong AI.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded bg-muted/40 p-3 text-muted-foreground leading-relaxed border-l-2 border-primary/50">
            <strong className="text-foreground">{isEn ? 'Core Tenet: ' : 'Prinsip Inti: '}</strong>
            {isEn
              ? 'AI coding agents naturally produce the median of internet code: bland gray cards, low contrast, washed out text, and verbose marketing copy. Impeccable forces the agent to make opinionated aesthetic choices, apply intentional typography, and preserve authentic human personality.'
              : 'Agen coding AI secara alami menghasilkan rata-rata dari kode internet: kartu abu-abu membosankan, kontras rendah, teks pudar, dan mikrokopi berbunga-bunga. Impeccable memaksa agen membuat keputusan estetika yang berani, menerapkan tipografi terarah, dan menjaga karakter kepribadian manusiawi.'}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
