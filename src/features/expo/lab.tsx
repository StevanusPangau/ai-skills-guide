import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function ExpoNativeLab() {
  const isEn = getLocale() === 'en'
  const [insetsActive, setInsetsActive] = useState<boolean>(true)
  const [updateTier, setUpdateTier] = useState<'js' | 'native'>('js')

  return (
    <section id="native-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Native UI & OTA Updates Lab' : 'Lab UI Native & Update OTA Expo'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive demo of safe-area handling and the OTA update vs new native build decision.'
            : 'Demo interaktif penanganan safe area dan keputusan antara update OTA vs build native baru.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: Safe Area & Screen Anatomy */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn
                    ? '1. Safe Area: Dynamic Island vs Screen Clipping'
                    : '1. Safe Area: Dynamic Island vs Terpotong Notch'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Rule (expo-native-ui): prefer contentInsetAdjustmentBehavior="automatic" over SafeAreaView; always account for top and bottom insets.'
                    : 'Aturan (expo-native-ui): utamakan contentInsetAdjustmentBehavior="automatic" daripada SafeAreaView; selalu hitung inset atas dan bawah.'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInsetsActive(!insetsActive)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-colors ${
                    insetsActive
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-destructive bg-destructive/10 text-destructive'
                  }`}
                >
                  SafeArea: {insetsActive ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Virtual Phone Mockup */}
              <div className="mx-auto w-[240px] h-[340px] rounded-[36px] border-4 border-zinc-800 bg-zinc-950 p-2 relative flex flex-col justify-between overflow-hidden shadow-xl">
                {/* Dynamic Island Pill */}
                <div className="w-20 h-5 bg-black rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="size-2 rounded-full bg-zinc-800 mr-2" />
                  <div className="size-2 rounded-full bg-zinc-900" />
                </div>

                {/* Simulated Screen Content */}
                <div
                  className={`flex-1 rounded-[26px] bg-card border border-border p-3 flex flex-col justify-between transition-all ${
                    insetsActive ? 'pt-10 pb-4' : 'pt-2 pb-1'
                  }`}
                >
                  <div className="space-y-1">
                    <div
                      className={`text-xs font-bold ${
                        !insetsActive ? 'text-destructive bg-destructive/20 rounded p-1' : 'text-foreground'
                      }`}
                    >
                      {!insetsActive
                        ? (isEn ? '✕ Title clipped by notch!' : '✕ Judul tertutup Dynamic Island!')
                        : (isEn ? '✓ Protected Header' : '✓ Header Aman')}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {isEn ? 'Body content renders cleanly.' : 'Konten utama tampil rapi.'}
                    </div>
                  </div>

                  <div className="rounded bg-primary text-primary-foreground text-[10px] font-bold text-center py-1.5">
                    Action Button
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="space-y-2 flex flex-col justify-center">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {isEn ? 'Recommended Implementation:' : 'Implementasi yang Direkomendasikan:'}
                </span>
                <pre className="rounded bg-zinc-950 p-3 text-xs font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
                  {`export default function Screen() {\n  return (\n    <ScrollView contentInsetAdjustmentBehavior="automatic">\n      <Header />\n      <Body />\n    </ScrollView>\n  )\n}\n// Title lives in the Stack header (Stack.Title),\n// not in a custom Text on the page.`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: OTA vs Native Binary Decision Tree */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. OTA Hotfix vs Store Binary Decision' : '2. Keputusan Rilis OTA vs Binary Store'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule (eas-update): native code or config changes need a new build; compatible JS/asset changes can ship as an update.'
                  : 'Aturan (eas-update): perubahan kode/config native butuh build baru; perubahan JS/aset yang kompatibel bisa dikirim sebagai update.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setUpdateTier('js')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    updateTier === 'js'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  JS & Assets Fix
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateTier('native')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    updateTier === 'native'
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Native Pod / Gradle Fix
                </button>
              </div>

              {updateTier === 'js' ? (
                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-3 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                      EAS Update (Over-the-Air)
                    </span>
                    <Badge variant="outline" className="font-mono text-[10px]">runtime match</Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    {isEn
                      ? 'Delivers JavaScript and asset changes without a new native binary, to builds whose platform, runtime version and channel match. Release builds may need up to two cold launches to show it.'
                      : 'Mengirim perubahan JavaScript dan aset tanpa binary native baru, ke build yang platform, runtime version, dan channel-nya cocok. Build rilis mungkin butuh hingga dua cold launch untuk menampilkannya.'}
                  </p>
                  <pre className="rounded bg-zinc-950 p-2 font-mono text-[10px] text-zinc-200">
                    eas update --channel production --message "Fix checkout button" --environment production
                  </pre>
                </div>
              ) : (
                <div className="border border-primary/30 bg-primary/5 rounded p-3 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary block">
                      EAS Build & EAS Submit
                    </span>
                    <Badge variant="outline" className="font-mono text-[10px]">new build</Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    {isEn
                      ? 'Native code or native configuration changes (including SDK upgrades) require compiling a new build; then submit it to the stores.'
                      : 'Perubahan kode atau konfigurasi native (termasuk upgrade SDK) wajib mengompilasi build baru; lalu submit ke store.'}
                  </p>
                  <pre className="rounded bg-zinc-950 p-2 font-mono text-[10px] text-zinc-200">
                    eas build --profile production --auto-submit
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Module 3: @expo/ui Native Control Pipeline */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. @expo/ui True Native Rendering' : '3. Rendering Native Sejati @expo/ui'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Real SwiftUI on iOS and Jetpack Compose on Android, wrapped in Host (universal layer needs SDK 56+).'
                  : 'SwiftUI asli di iOS dan Jetpack Compose di Android, dibungkus Host (lapisan universal butuh SDK 56+).'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-border rounded p-2.5 bg-muted/20 space-y-1">
                  <span className="font-bold text-foreground block">iOS Target</span>
                  <p className="text-[11px] text-muted-foreground">
                    @expo/ui/swift-ui: komponen SwiftUI asli (mis. BottomSheet, Picker, Switch), iOS saja.
                  </p>
                </div>
                <div className="border border-border rounded p-2.5 bg-muted/20 space-y-1">
                  <span className="font-bold text-foreground block">Android Target</span>
                  <p className="text-[11px] text-muted-foreground">
                    @expo/ui/jetpack-compose: komponen Jetpack Compose asli, Android saja.
                  </p>
                </div>
              </div>
              <div className="rounded bg-muted/40 p-2 text-[11px] text-muted-foreground border-l-2 border-primary/50">
                <strong className="text-foreground">{isEn ? 'Universal first: ' : 'Universal dulu: '}</strong>
                {isEn
                  ? 'Components from the @expo/ui root run on iOS, Android and web from one tree; use the platform-specific layers only when a component is missing.'
                  : 'Komponen dari root @expo/ui berjalan di iOS, Android, dan web dari satu tree; pakai lapisan platform-spesifik hanya bila komponen belum ada.'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
