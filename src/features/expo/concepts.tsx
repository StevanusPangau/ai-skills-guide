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
            ? 'Core mental models: universal app targets, Continuous Native Generation, and the EAS cloud services.'
            : 'Model mental inti: target universal app, Continuous Native Generation, dan layanan cloud EAS.'}
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
                <span className="text-[10px] text-muted-foreground">Swift / Xcode</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">CocoaPods & Xcode</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Built into an IPA with Xcode/CocoaPods; EAS Build can compile it in the cloud and manage Apple signing credentials.'
                  : 'Dibangun menjadi IPA dengan Xcode/CocoaPods; EAS Build dapat mengompilasinya di cloud dan mengelola kredensial signing Apple.'}
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
                  ? 'Built into an AAB/APK with Gradle; EAS Build can compile it in the cloud and manage Android keystores.'
                  : 'Dibangun menjadi AAB/APK dengan Gradle; EAS Build dapat mengompilasinya di cloud dan mengelola keystore Android.'}
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
                  ? 'Exports a web bundle (npx expo export -p web) and Expo Router API routes, deployable with EAS Hosting (Cloudflare Workers) or self-hosted.'
                  : 'Mengekspor bundle web (npx expo export -p web) dan API routes Expo Router, bisa di-deploy ke EAS Hosting (Cloudflare Workers) atau self-host.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Continuous Native Prebuild */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Continuous Native Generation (npx expo prebuild)' : 'Continuous Native Generation (npx expo prebuild)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'With Continuous Native Generation, ios/ and android/ are regenerated from app config and config plugins. If the folders are committed, the project is prebuild/bare and native setup differs.'
              : 'Dengan Continuous Native Generation, ios/ dan android/ dihasilkan ulang dari app config dan config plugin. Jika folder itu di-commit, proyeknya prebuild/bare dan setup native-nya berbeda.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded-lg bg-muted/30 p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="border border-border rounded p-2 text-center bg-card flex-1 min-w-[120px]">
                <span className="font-semibold text-foreground block">1. app.json / config</span>
                <span className="text-[10px] text-muted-foreground">Source of native config</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-primary/40 rounded p-2 text-center bg-primary/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-primary block">2. Config Plugins</span>
                <span className="text-[10px] text-muted-foreground">Automated Pod/Gradle Diffs</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-emerald-500/40 rounded p-2 text-center bg-emerald-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">3. Generated ios/ android/</span>
                <span className="text-[10px] text-muted-foreground">Regenerated by prebuild (CNG)</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px] italic">
            {isEn
              ? 'expo-upgrade checks first whether ios/ and android/ exist: without them the project uses CNG and native projects are regenerated at build time, so the prebuild and native-cache steps are skipped.'
              : 'expo-upgrade memeriksa dulu apakah ios/ dan android/ ada: tanpa keduanya proyek memakai CNG dan project native dihasilkan ulang saat build, sehingga langkah prebuild dan pembersihan cache native dilewati.'}
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
                  ? 'Compiles native artifacts in the cloud, manages signing credentials, and can submit to TestFlight and Google Play (eas build --auto-submit or eas submit).'
                  : 'Mengompilasi artifact native di cloud, mengelola kredensial signing, dan dapat submit ke TestFlight & Google Play (eas build --auto-submit atau eas submit).'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>EAS Update & Observe</span>
                <Badge variant="outline" className="font-mono text-[10px]">OTA + Metrics</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'EAS Update ships compatible JS/asset changes over the air (a channel points to a branch; the runtime version is the compatibility boundary). EAS Observe measures startup/navigation performance, and eas-update-insights reads update health (crash rate, launches, payload). Observe has no crash reporting.'
                  : 'EAS Update mengirim perubahan JS/aset yang kompatibel via OTA (channel menunjuk ke branch; runtime version adalah batas kompatibilitas). EAS Observe mengukur performa startup/navigasi, dan eas-update-insights membaca kesehatan update (crash rate, launch, payload). Observe tidak punya crash reporting.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
