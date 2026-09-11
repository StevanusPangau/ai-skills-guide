import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function ExpoConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Expo & EAS Architecture & Principles' : 'Arsitektur & Prinsip Expo & EAS'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core mental models: universal app architecture, managed cloud pipelines, and the prebuild engine.'
            : 'Model mental inti: arsitektur universal app, pipeline cloud terkelola, dan engine prebuild kontinu.'}
        </p>
      </div>

      {/* Model 1: Universal App Model */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Universal Architecture Matrix' : 'Matriks Arsitektur Universal App'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'One unified TypeScript codebase compiling to native binaries and web applications.'
              : 'Satu basis kode TypeScript terpadu yang dikompilasi ke binary native dan aplikasi web.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  IOS RUNTIME
                </Badge>
                <span className="text-[10px] text-muted-foreground">Swift / UIKit</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">CocoaPods & Xcode</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Compiles to IPA binary with native UINavigationController and Apple App Store signing.'
                  : 'Dikompilasi ke binary IPA dengan controller navigasi native dan sertifikat Apple.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  ANDROID RUNTIME
                </Badge>
                <span className="text-[10px] text-muted-foreground">Kotlin / Gradle</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Android Gradle & AAB</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Compiles to AAB format with native Android Fragment stacks and Play Store Keystore.'
                  : 'Dikompilasi ke format AAB dengan navigasi Fragment dan keystore Google Play.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  WEB RUNTIME
                </Badge>
                <span className="text-[10px] text-muted-foreground">Metro / Static</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Universal PWA & API</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Compiles to static responsive web HTML with serverless API Routes via EAS Hosting.'
                  : 'Dikompilasi ke HTML web responsif dengan API Routes serverless via EAS Hosting.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Continuous Native Prebuild */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Continuous Native Prebuild (npx expo prebuild)' : 'Continuous Native Prebuild (npx expo prebuild)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Never edit ios/ and android/ folders directly. Config plugins generate native files ephemerally.'
              : 'Dilarang mengedit folder ios/ dan android/ secara manual. Plugin konfigurasi menghasilkannya secara ephemeral.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded-lg bg-muted/30 p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="border border-border rounded p-2 text-center bg-card flex-1 min-w-[120px]">
                <span className="font-semibold text-foreground block">1. app.json / config</span>
                <span className="text-[10px] text-muted-foreground">Single Source of Truth</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-primary/40 rounded p-2 text-center bg-primary/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-primary block">2. Config Plugins</span>
                <span className="text-[10px] text-muted-foreground">Automated Pod/Gradle Diffs</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-emerald-500/40 rounded p-2 text-center bg-emerald-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">3. Ephemeral ios/ android/</span>
                <span className="text-[10px] text-muted-foreground">Always Cleanly Re-creatable</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px] italic">
            {isEn
              ? 'By keeping native folders gitignored and generating them via prebuild, your codebase upgrades smoothly across SDK versions with zero manual Xcode project merge conflicts.'
              : 'Dengan meng-git-ignore folder native dan menghasilkannya via prebuild, pembaruan SDK Expo berlangsung mulus tanpa konflik merge project Xcode yang menyiksa.'}
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: EAS Cloud Pipeline */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'EAS Cloud Architecture Lifecycle' : 'Siklus Hidup Arsitektur Cloud EAS'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Complete cloud services: Build, Submit, Update, Observe, and Hosting.'
              : 'Layanan cloud terpadu: Build, Submit, Update, Observe, dan Hosting.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>EAS Build & Submit</span>
                <Badge variant="outline" className="font-mono text-[10px]">Cloud Hardware</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Compiles native artifacts on dedicated cloud runners, orchestrates app store certs, and uploads directly to TestFlight & Google Play.'
                  : 'Mengkompilasi artifact native di cloud, mengelola sertifikat app store, dan mengunggah langsung ke TestFlight & Google Play.'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>EAS Update & Observe</span>
                <Badge variant="outline" className="font-mono text-[10px]">Zero Review</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Distributes instant OTA bug fixes to production devices, streams real-time crash logs, and offers instant rollback gates.'
                  : 'Mendistribusikan perbaikan bug OTA instan ke ponsel user, streaming log crash realtime, dan menyediakan tombol rollback instan.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
