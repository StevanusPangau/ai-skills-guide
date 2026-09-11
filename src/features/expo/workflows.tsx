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
    descId: 'Membuat proyek baru, mengatur struktur app/, memasang safe area insets, dan menguji di simulator.',
    descEn: 'Scaffold project, configure app/ folder structure, apply safe area insets, and test on simulators.',
    whyId: 'Memisahkan rute navigasi dari komponen reusable mencegah terciptanya rute layar palsu di Expo Router.',
    whyEn: 'Isolating navigation routes from components prevents unintentional screen routes in Expo Router.',
    steps: [
      'npx create-expo-app@latest',
      'setup app/ and components/ structure',
      'wrap with SafeAreaProvider & insets',
      'npx expo run:ios or run:android',
    ],
  },
  {
    titleId: 'Kompilasi Binary Rilis ke App Stores dengan EAS',
    titleEn: 'Ship Production Binaries to Stores via EAS',
    descId: 'Menyiapkan eas.json, mengelola kredensial penandatanganan, dan submit otomatis ke TestFlight.',
    descEn: 'Configure eas.json, manage cloud signing keys, and submit automatically to TestFlight.',
    whyId: 'EAS mengotomatisasi sertifikat Apple dan keystore Android, menghilangkan risiko salah tanda binary rilis.',
    whyEn: 'EAS automates Apple provisioning and Android keystores, eliminating binary signing failures.',
    steps: [
      'eas build:configure',
      'eas build --platform all --profile production',
      'eas submit --platform ios --auto',
      'eas submit --platform android --auto',
    ],
  },
  {
    titleId: 'Rilis Perbaikan Bug Cepat via Over-the-Air (OTA)',
    titleEn: 'Instant Emergency Hotfix via Over-the-Air (OTA)',
    descId: 'Memperbaiki bug JavaScript, mempublikasikan update ke EAS Update, dan memantau crash rate di Observe.',
    descEn: 'Fix JavaScript bug, publish update to EAS Update channel, and monitor crash telemetry in Observe.',
    whyId: 'Perbaikan bug darurat tidak boleh menunggu 48 jam review store — OTA mengirim perbaikan seketika.',
    whyEn: 'Critical bug fixes cannot wait 48 hours for store reviews — OTA updates deploy in seconds.',
    steps: [
      'fix JavaScript / UI bug',
      'eas update --branch production',
      'monitor EAS Update Insights for crash spikes',
      'instant rollback if anomalies occur',
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
