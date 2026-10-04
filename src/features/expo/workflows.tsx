import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Wf = {
  titleId: string
  titleEn: string
  descId: string
  descEn: string
  whyId: string
  whyEn: string
  steps: string[]
}

const workflows: Wf[] = [
  {
    titleId: 'Membangun Aplikasi Universal dengan Expo Router',
    titleEn: 'Build a Universal App with Expo Router',
    descId: 'Membuat proyek baru, menata folder per expo-project-structure, membangun layar native-feeling, dan menguji.',
    descEn: 'Scaffold a project, lay out folders per expo-project-structure, build native-feeling screens, and test.',
    whyId: 'Setiap file di src/app menjadi rute, jadi komponen dan util dipisah ke folder lain agar tidak tercipta rute tak sengaja.',
    whyEn: 'Every file in src/app becomes a route, so components and utils live in sibling folders to avoid accidental routes.',
    steps: [
      'npx create-expo-app@latest',
      'src/app = routes only (expo-project-structure)',
      'contentInsetAdjustmentBehavior="automatic" (expo-native-ui)',
      'npx expo start (Expo Go first)',
    ],
  },
  {
    titleId: 'Kompilasi Binary Rilis ke App Stores dengan EAS',
    titleEn: 'Ship Production Binaries to Stores via EAS',
    descId: 'Menyiapkan eas.json, membangun profil production, dan submit otomatis ke TestFlight / Google Play.',
    descEn: 'Configure eas.json, build the production profile, and submit automatically to TestFlight / Google Play.',
    whyId: 'EAS mengelola kredensial signing Apple dan Android; build yang sukses belum berarti diterima Apple, jadi cek status submission.',
    whyEn: 'EAS manages Apple and Android signing credentials; a successful build is not Apple acceptance, so verify the submission state.',
    steps: [
      'eas build:configure',
      'eas build -p ios --profile production --auto-submit',
      'eas build -p android --profile production --auto-submit',
      'eas submit:list -p ios --json',
    ],
  },
  {
    titleId: 'Kirim Perbaikan JavaScript via Over-the-Air (OTA)',
    titleEn: 'Ship a JavaScript Fix via Over-the-Air (OTA)',
    descId: 'Memperbaiki bug JavaScript, mempublikasikan update ke channel EAS Update, lalu memeriksa kesehatannya dengan update insights.',
    descEn: 'Fix a JavaScript bug, publish an update to an EAS Update channel, then check its health with update insights.',
    whyId: 'Perubahan JS/aset yang kompatibel dengan runtime version build terpasang bisa dikirim tanpa binary baru; perubahan native tetap butuh build baru.',
    whyEn: 'JS/asset changes compatible with the installed build\'s runtime version ship without a new binary; native changes still need a new build.',
    steps: [
      'fix JavaScript / UI bug',
      'eas update --channel production --message "..." --environment production',
      'eas update:insights <groupId>',
      'eas channel:insights --channel production --runtime-version <v>',
    ],
  },
]

export function ExpoWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How Expo and EAS skills combine across development and mobile release.'
            : 'Cara skill Expo dan EAS berkolaborasi di seluruh siklus pengembangan dan rilis mobile.'}
        </p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {isEn ? wf.titleEn : wf.titleId}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEn ? wf.descEn : wf.descId}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs font-mono whitespace-nowrap">
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 && (
                      <span className="text-muted-foreground text-sm">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 italic">
                <span className="font-semibold not-italic text-foreground">
                  {isEn ? 'Why: ' : 'Mengapa: '}
                </span>
                {isEn ? wf.whyEn : wf.whyId}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
