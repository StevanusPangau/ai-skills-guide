import type { BilingualString, BilingualList } from '@/types/skill'

export const EXPO_SOURCE_REPO = 'github.com/expo/skills'
export const EXPO_SOURCE_SHA = 'main'
export const SOURCE_REPO = EXPO_SOURCE_REPO
export const SOURCE_SHA = EXPO_SOURCE_SHA

export type RichSkill = {
  name: string
  category: string
  invocation: 'user' | 'model'
  description: BilingualString
  detailedDescription: BilingualString
  useWhen: BilingualList
  avoidWhen: BilingualList
  howItWorks: BilingualList
  coreRules: BilingualList
  tips: BilingualList
  pairsWellWith: string[]
  sourcePath: string
  spotlight?: {
    title: BilingualString
    body: BilingualString
  }
}

export const expoSkills: RichSkill[] = [
  {
    name: 'eas-app-stores',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: build binary cloud dan submit otomatis ke Apple App Store dan Google Play Store.',
      en: 'EAS cloud service: cloud binary compilation and automated submission to Apple App Store and Google Play.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: build binary cloud dan submit otomatis ke Apple App Store dan Google Play Store. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: cloud binary compilation and automated submission to Apple App Store and Google Play. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-app-stores di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-app-stores sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-app-stores in an Expo or React Native app.',
        'Configuring and optimizing eas-app-stores functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-app-stores.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-app-stores.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Kompilasi iOS di Cloud Tanpa Mac',
        en: 'Mac-Free Cloud iOS Compilation',
      },
      body: {
        id: 'EAS Build memecahkan hambatan mobile terbesar: kompilasi binary rilis iOS (IPA) dari Windows/Linux via cloud VM Apple milik EAS lengkap dengan signing terkelola.',
        en: 'EAS Build eliminates the local Mac requirement: compile production iOS IPAs directly from Linux/Windows via EAS cloud macOS nodes with managed credentials.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-app-stores/SKILL.md',
  },
  {
    name: 'eas-hosting',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: hosting web performen untuk situs web Expo dan API Routes Expo Router di edge.',
      en: 'EAS cloud service: high-performance web hosting for Expo websites and Expo Router API routes at the edge.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: hosting web performen untuk situs web Expo dan API Routes Expo Router di edge. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: high-performance web hosting for Expo websites and Expo Router API routes at the edge. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-hosting di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-hosting sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-hosting in an Expo or React Native app.',
        'Configuring and optimizing eas-hosting functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-hosting.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-hosting.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Satu Codebase Mobile & Web Hosting',
        en: 'Unified Mobile & Web Hosting',
      },
      body: {
        id: 'EAS Hosting mewujudkan universal app sejati: kode navigasi dan API routes yang sama melayani aplikasi native sekaligus situs web publik tanpa server terpisah.',
        en: 'EAS Hosting realizes universal architecture: identical routing and API endpoints serve native mobile screens and responsive public web apps.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-hosting/SKILL.md',
  },
  {
    name: 'eas-observe',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: observability produksi, pelacakan crash native & JavaScript, dan log error realtime.',
      en: 'EAS cloud service: production observability, native & JavaScript crash tracking, and realtime logs.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: observability produksi, pelacakan crash native & JavaScript, dan log error realtime. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: production observability, native & JavaScript crash tracking, and realtime logs. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-observe di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-observe sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-observe in an Expo or React Native app.',
        'Configuring and optimizing eas-observe functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-observe.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-observe.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Diagnostik Crash Native & JS Terpadu',
        en: 'Unified Native & JS Diagnostics',
      },
      body: {
        id: 'Crash di mobile sering terjadi di layer native C++/Swift yang luput dari error boundary React. EAS Observe menangkap kedua tier secara terpadu.',
        en: 'Mobile crashes frequently occur in native C++/Swift layers invisible to React error boundaries. EAS Observe unifies both failure tiers.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-observe/SKILL.md',
  },
  {
    name: 'eas-simulator',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: menjalankan dan mengontrol aplikasi mobile di simulator iOS & Android remote berbasis cloud.',
      en: 'EAS cloud service: run and control mobile apps on cloud-hosted remote iOS & Android simulators.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: menjalankan dan mengontrol aplikasi mobile di simulator iOS & Android remote berbasis cloud. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: run and control mobile apps on cloud-hosted remote iOS & Android simulators. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-simulator di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-simulator sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-simulator in an Expo or React Native app.',
        'Configuring and optimizing eas-simulator functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-simulator.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-simulator.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Pengujian Mobile Tanpa Beban Lokal',
        en: 'Workstation-Free Mobile Testing',
      },
      body: {
        id: 'Menjalankan emulator lokal memakan puluhan GB RAM. EAS Simulator memindahkan eksekusi ke cloud dengan streaming browser instan.',
        en: 'Running local emulators consumes heavy workstation RAM. EAS Simulator streams cloud-hosted simulator sessions straight to browsers.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-simulator/SKILL.md',
  },
  {
    name: 'eas-update',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: pembaruan over-the-air (OTA) instan untuk perbaikan bug JavaScript tanpa review App Store.',
      en: 'EAS cloud service: instant over-the-air (OTA) JavaScript bug fixes bypassing App Store review cycles.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: pembaruan over-the-air (OTA) instan untuk perbaikan bug JavaScript tanpa review App Store. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: instant over-the-air (OTA) JavaScript bug fixes bypassing App Store review cycles. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-update di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-update sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-update in an Expo or React Native app.',
        'Configuring and optimizing eas-update functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-update.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-update.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Perbaikan Bug Kritis dalam Detik',
        en: 'Instant Critical Hotfixes',
      },
      body: {
        id: 'Menunggu review Apple bisa memakan waktu berhari-hari. EAS Update mengirim bundle JS baru secara OTA seketika saat aplikasi dibuka.',
        en: 'App Store review delays cost days. EAS Update deploys new JS bundles over the air, delivering immediate hotfixes on next launch.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-update/SKILL.md',
  },
  {
    name: 'eas-update-insights',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: memantau kesehatan rilis OTA, tingkat crash, adopsi versi, dan rollback darurat.',
      en: 'EAS cloud service: monitor OTA release health, crash rates, adoption percentages, and emergency rollbacks.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: memantau kesehatan rilis OTA, tingkat crash, adopsi versi, dan rollback darurat. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: monitor OTA release health, crash rates, adoption percentages, and emergency rollbacks. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-update-insights di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-update-insights sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-update-insights in an Expo or React Native app.',
        'Configuring and optimizing eas-update-insights functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-update-insights.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-update-insights.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Rollback Darurat Rilis OTA Berisiko',
        en: 'Emergency Rollback Controls',
      },
      body: {
        id: 'Jika update OTA memicu crash tak terduga, EAS Update Insights menyediakan tombol rollback instan dari dashboard tanpa perlu deploy ulang.',
        en: 'If an OTA update introduces unexpected regressions, EAS Update Insights provides instantaneous cloud rollback controls.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-update-insights/SKILL.md',
  },
  {
    name: 'eas-workflows',
    category: 'eas-cloud',
    invocation: 'model',
    description: {
      id: 'Layanan cloud EAS: otomatisasi pipeline CI/CD mobile berbasis YAML untuk testing, build, dan deployment.',
      en: 'EAS cloud service: YAML-based mobile CI/CD pipeline automation for testing, building, and deployment.',
    },
    detailedDescription: {
      id: 'Layanan cloud EAS: otomatisasi pipeline CI/CD mobile berbasis YAML untuk testing, build, dan deployment. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'EAS cloud service: YAML-based mobile CI/CD pipeline automation for testing, building, and deployment. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan eas-workflows di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas eas-workflows sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to eas-workflows in an Expo or React Native app.',
        'Configuring and optimizing eas-workflows functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk eas-workflows.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for eas-workflows.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'CI/CD Khusus Ekosistem Mobile',
        en: 'Bespoke Mobile CI/CD Pipelines',
      },
      body: {
        id: 'CI/CD umum sering lambat mengelola macOS runner. EAS Workflows dirancang khusus mobile dengan caching pod dan sertifikat terintegrasi.',
        en: 'Generic CI/CD is painful when managing macOS runners. EAS Workflows standardizes native caching and signing vaults natively.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-workflows/SKILL.md',
  },
  {
    name: 'expo-animation',
    category: 'motion-graphics',
    invocation: 'model',
    description: {
      id: 'Membangun animasi performen 60FPS di React Native dan Expo menggunakan React Native Reanimated dan Skia.',
      en: 'Build high-performance 60FPS animations in React Native and Expo using Reanimated and Skia.',
    },
    detailedDescription: {
      id: 'Membangun animasi performen 60FPS di React Native dan Expo menggunakan React Native Reanimated dan Skia. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Build high-performance 60FPS animations in React Native and Expo using Reanimated and Skia. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-animation di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-animation sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-animation in an Expo or React Native app.',
        'Configuring and optimizing expo-animation functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-animation.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-animation.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'UI Thread Worklets Tanpa Lag',
        en: 'UI Thread Worklets: Zero Bridge Lag',
      },
      body: {
        id: 'Reanimated mengkompilasi animasi menjadi worklets yang berjalan langsung di UI thread native pada 60/120FPS tanpa melintasi JS bridge.',
        en: 'Reanimated compiles animations into worklets running directly on the native UI thread at 60/120FPS, bypassing the JS bridge entirely.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-animation/SKILL.md',
  },
  {
    name: 'expo-app-clip',
    category: 'platform-extensions',
    invocation: 'model',
    description: {
      id: 'Menambahkan target iOS App Clip ringan ke aplikasi Expo untuk peluncuran instan tanpa instalasi penuh.',
      en: 'Add an iOS App Clip target to an Expo app for instant app launches without full store installation.',
    },
    detailedDescription: {
      id: 'Menambahkan target iOS App Clip ringan ke aplikasi Expo untuk peluncuran instan tanpa instalasi penuh. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Add an iOS App Clip target to an Expo app for instant app launches without full store installation. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-app-clip di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-app-clip sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-app-clip in an Expo or React Native app.',
        'Configuring and optimizing expo-app-clip functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-app-clip.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-app-clip.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Batas 15MB & Target Khusus',
        en: 'The 15MB Size Ceiling',
      },
      body: {
        id: 'Apple membatasi App Clip di 15MB. Skill ini mengonfigurasi plugin config untuk extension target terpisah dengan bundle JS yang dipangkas agresif.',
        en: 'Apple strictly caps App Clips at 15MB. This skill configures Expo config plugins to generate an isolated extension target.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-app-clip/SKILL.md',
  },
  {
    name: 'expo-brownfield',
    category: 'advanced-framework',
    invocation: 'model',
    description: {
      id: 'Mengintegrasikan Expo dan React Native ke dalam aplikasi native iOS (Swift) dan Android (Kotlin) existing.',
      en: 'Integrate Expo and React Native into an existing native iOS and Android brownfield application.',
    },
    detailedDescription: {
      id: 'Mengintegrasikan Expo dan React Native ke dalam aplikasi native iOS (Swift) dan Android (Kotlin) existing. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Integrate Expo and React Native into an existing native iOS and Android brownfield application. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-brownfield di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-brownfield sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-brownfield in an Expo or React Native app.',
        'Configuring and optimizing expo-brownfield functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-brownfield.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-brownfield.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Adopsi Bertahap Tanpa Rewrite',
        en: 'Progressive Brownfield Adoption',
      },
      body: {
        id: 'Perusahaan besar tidak bisa membuang codebase native yang matang. Pola brownfield menyematkan layar Expo di satu ViewController/Activity native.',
        en: 'Enterprises cannot discard mature native codebases. Brownfield architecture allows teams to ship screens with Expo inside existing native views.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-brownfield/SKILL.md',
  },
  {
    name: 'expo-data-fetching',
    category: 'framework-core',
    invocation: 'model',
    description: {
      id: 'Pola data fetching andal untuk mobile: penanganan offline, siklus foreground/background, dan TanStack Query.',
      en: 'Resilient mobile data fetching: offline handling, app state lifecycles (foreground/background), and TanStack Query.',
    },
    detailedDescription: {
      id: 'Pola data fetching andal untuk mobile: penanganan offline, siklus foreground/background, dan TanStack Query. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Resilient mobile data fetching: offline handling, app state lifecycles (foreground/background), and TanStack Query. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-data-fetching di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-data-fetching sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-data-fetching in an Expo or React Native app.',
        'Configuring and optimizing expo-data-fetching functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-data-fetching.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-data-fetching.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Siklus Foreground / Background Mobile',
        en: 'Mobile Lifecycle Synchronization',
      },
      body: {
        id: 'Di mobile, membiarkan fetch berjalan saat layar mati menguras baterai. Skill ini mengikat focusManager ke AppState agar fetch dijeda di background.',
        en: 'Unmanaged background fetches drain mobile battery. This skill connects TanStack Query focusManager to AppState to pause fetches in background.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-data-fetching/SKILL.md',
  },
  {
    name: 'expo-design-system',
    category: 'design-system',
    invocation: 'model',
    description: {
      id: 'Membangun design system mobile di Expo menggunakan NativeWind (Tailwind CSS) atau StyleSheet terstruktur.',
      en: 'Build and maintain mobile design systems in Expo using NativeWind (Tailwind CSS) or structured StyleSheets.',
    },
    detailedDescription: {
      id: 'Membangun design system mobile di Expo menggunakan NativeWind (Tailwind CSS) atau StyleSheet terstruktur. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Build and maintain mobile design systems in Expo using NativeWind (Tailwind CSS) or structured StyleSheets. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-design-system di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-design-system sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-design-system in an Expo or React Native app.',
        'Configuring and optimizing expo-design-system functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-design-system.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-design-system.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'NativeWind: Tailwind Terkompilasi Native',
        en: 'NativeWind: Native-Compiled Tailwind',
      },
      body: {
        id: 'NativeWind v4 tidak memuat CSS runtime di mobile; class Tailwind dikompilasi menjadi objek StyleSheet native murni saat waktu build.',
        en: 'NativeWind v4 runs zero web CSS engines on device; it compiles Tailwind classes into pure native StyleSheet objects at build time.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-design-system/SKILL.md',
  },
  {
    name: 'expo-dev-client',
    category: 'dev-tooling',
    invocation: 'model',
    description: {
      id: 'Build dan distribusi Expo Development Client lokal: kustomisasi binary native dan integrasi pod kustom.',
      en: 'Build and distribute local Expo Development Clients: native binary customization and custom pods.',
    },
    detailedDescription: {
      id: 'Build dan distribusi Expo Development Client lokal: kustomisasi binary native dan integrasi pod kustom. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Build and distribute local Expo Development Clients: native binary customization and custom pods. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-dev-client di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-dev-client sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-dev-client in an Expo or React Native app.',
        'Configuring and optimizing expo-dev-client functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-dev-client.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-dev-client.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Melampaui Batasan Expo Go',
        en: 'Breaking Beyond Expo Go',
      },
      body: {
        id: 'Expo Go memiliki modul kaku. Dengan expo-dev-client, Anda mendapatkan fleksibilitas penuh React Native murni dengan kenyamanan reload Expo.',
        en: 'Expo Go features a rigid set of pre-bundled modules. With expo-dev-client, you gain the full unconstrained power of bare React Native with instant HMR.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-dev-client/SKILL.md',
  },
  {
    name: 'expo-dom',
    category: 'advanced-framework',
    invocation: 'model',
    description: {
      id: 'Menjalankan kode web (DOM/WebGL/Canvas) di dalam aplikasi native Expo menggunakan komponen Expo DOM.',
      en: 'Run rich web code (DOM/WebGL/Canvas) inside native Expo apps using Expo DOM components.',
    },
    detailedDescription: {
      id: 'Menjalankan kode web (DOM/WebGL/Canvas) di dalam aplikasi native Expo menggunakan komponen Expo DOM. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Run rich web code (DOM/WebGL/Canvas) inside native Expo apps using Expo DOM components. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-dom di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-dom sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-dom in an Expo or React Native app.',
        'Configuring and optimizing expo-dom functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-dom.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-dom.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Direktif \'use dom\' Transparan',
        en: 'The \'use dom\' Directive',
      },
      body: {
        id: 'Fitur \'use dom\' memungkinkan Anda membawa pustaka web kaya (Three.js 3D, D3 charts) ke dalam layar native dengan komunikasi dua arah yang aman.',
        en: 'The \'use dom\' directive embeds rich web ecosystems (Three.js, D3 charts) inside native apps with seamless bidirectional bridge communication.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-dom/SKILL.md',
  },
  {
    name: 'expo-examples',
    category: 'learning-reference',
    invocation: 'model',
    description: {
      id: 'Koleksi proyek contoh resmi Expo: referensi implementasi nyata untuk autentikasi, kamera, maps, dan audio.',
      en: 'Official Expo example projects: practical implementation reference for auth, camera, maps, and audio.',
    },
    detailedDescription: {
      id: 'Koleksi proyek contoh resmi Expo: referensi implementasi nyata untuk autentikasi, kamera, maps, dan audio. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Official Expo example projects: practical implementation reference for auth, camera, maps, and audio. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-examples di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-examples sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-examples in an Expo or React Native app.',
        'Configuring and optimizing expo-examples functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-examples.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-examples.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Resep Resmi Teruji Tim Inti',
        en: 'Verified Official Recipes',
      },
      body: {
        id: 'Daripada mengandalkan tutorial usang pihak ketiga, skill ini mengarahkan agen ke contoh resmi yang selalu diuji di tiap rilis SDK terbaru.',
        en: 'Rather than relying on stale tutorials, this skill points agents to verified official examples continuously tested against modern SDKs.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-examples/SKILL.md',
  },
  {
    name: 'expo-migrate-module',
    category: 'native-development',
    invocation: 'model',
    description: {
      id: 'Migrasi modul native Expo Apple/Swift yang ada dari arsitektur lama ke Expo Modules API modern.',
      en: 'Migrate existing Apple/Swift Expo native modules from legacy architectures to the modern Expo Modules API.',
    },
    detailedDescription: {
      id: 'Migrasi modul native Expo Apple/Swift yang ada dari arsitektur lama ke Expo Modules API modern. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Migrate existing Apple/Swift Expo native modules from legacy architectures to the modern Expo Modules API. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-migrate-module di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-migrate-module sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-migrate-module in an Expo or React Native app.',
        'Configuring and optimizing expo-migrate-module functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-migrate-module.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-migrate-module.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Transisi ke Swift Concurrency',
        en: 'Swift Concurrency Transition',
      },
      body: {
        id: 'Modul lama sering mengalami race condition thread. Migrasi ke ModuleDefinition menyelaraskan kode native dengan Swift Concurrency bawaan.',
        en: 'Legacy modules frequently suffer threading race conditions. Migrating to ModuleDefinition aligns native code with modern Swift Concurrency.',
      },
    },
    sourcePath: 'plugins/expo-experiments/skills/expo-migrate-module/SKILL.md',
  },
  {
    name: 'expo-module',
    category: 'native-development',
    invocation: 'model',
    description: {
      id: 'Panduan membuat Expo Native Module: menulis modul Swift/Kotlin modern dengan Expo Modules API.',
      en: 'Guide to authoring Expo Native Modules: writing modern Swift/Kotlin native modules with the Expo Modules API.',
    },
    detailedDescription: {
      id: 'Panduan membuat Expo Native Module: menulis modul Swift/Kotlin modern dengan Expo Modules API. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Guide to authoring Expo Native Modules: writing modern Swift/Kotlin native modules with the Expo Modules API. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-module di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-module sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-module in an Expo or React Native app.',
        'Configuring and optimizing expo-module functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-module.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-module.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Expo Modules API Deklaratif',
        en: 'Declarative Expo Modules API',
      },
      body: {
        id: 'Lupakan bridging kuno. Expo Modules API memungkinkan deklarasi API native secara ringkas di Swift dan Kotlin dengan output tipe TypeScript otomatis.',
        en: 'Forget legacy bridging. The Expo Modules API lets you define native capabilities declaratively in Swift and Kotlin with automatic TypeScript types.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-module/SKILL.md',
  },
  {
    name: 'expo-native-ui',
    category: 'native-ui',
    invocation: 'model',
    description: {
      id: 'Membangun layar Expo yang terasa native: safe area insets, keyboard handling, haptics, dan status bar.',
      en: 'Build screens that feel native: safe area insets, keyboard handling, haptics, and status bars.',
    },
    detailedDescription: {
      id: 'Membangun layar Expo yang terasa native: safe area insets, keyboard handling, haptics, dan status bar. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Build screens that feel native: safe area insets, keyboard handling, haptics, and status bars. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-native-ui di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-native-ui sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-native-ui in an Expo or React Native app.',
        'Configuring and optimizing expo-native-ui functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-native-ui.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-native-ui.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Presisi Safe Area & Haptics',
        en: 'Safe Area & Haptic Precision',
      },
      body: {
        id: 'Aplikasi mobile yang buruk sering terpotong notch kamera. Skill ini mewajibkan useSafeAreaInsets dan pembungkus keyboard dinamis.',
        en: 'Poor mobile apps clip underneath camera notches. This skill enforces useSafeAreaInsets and responsive keyboard offsets tuned to physical devices.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-native-ui/SKILL.md',
  },
  {
    name: 'expo-overview',
    category: 'framework-core',
    invocation: 'model',
    description: {
      id: 'Router dan titik masuk utama untuk setiap tugas Expo atau EAS: memetakan kebutuhan ke skill spesifik yang tepat.',
      en: 'Entry point and router for every Expo or EAS task: maps requirements to the exact matching skill.',
    },
    detailedDescription: {
      id: 'Router dan titik masuk utama untuk setiap tugas Expo atau EAS: memetakan kebutuhan ke skill spesifik yang tepat. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Entry point and router for every Expo or EAS task: maps requirements to the exact matching skill. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-overview di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-overview sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-overview in an Expo or React Native app.',
        'Configuring and optimizing expo-overview functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-overview.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-overview.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Gerbang Klasifikasi Expo vs EAS',
        en: 'Expo vs EAS Classification Gateway',
      },
      body: {
        id: 'Selalu mulai dari expo-overview untuk memetakan kebutuhan arsitektur sebelum coding, memisahkan fitur OSS lokal dari layanan cloud berbayar.',
        en: 'Always start with expo-overview to map architectural needs before coding, separating local OSS capabilities from cloud services.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-overview/SKILL.md',
  },
  {
    name: 'expo-project-structure',
    category: 'architecture',
    invocation: 'model',
    description: {
      id: 'Struktur folder standar industri untuk aplikasi Expo: app/, components/, hooks/, constants/, dan aset.',
      en: 'Industry-standard project structure for Expo apps: app/, components/, hooks/, constants, and assets.',
    },
    detailedDescription: {
      id: 'Struktur folder standar industri untuk aplikasi Expo: app/, components/, hooks/, constants/, dan aset. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Industry-standard project structure for Expo apps: app/, components/, hooks/, constants, and assets. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-project-structure di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-project-structure sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-project-structure in an Expo or React Native app.',
        'Configuring and optimizing expo-project-structure functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-project-structure.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-project-structure.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Konvensi app/ vs components/',
        en: 'The app/ vs components/ Convention',
      },
      body: {
        id: 'Expo Router membaca tiap file di app/ sebagai rute layar. Skill ini memisahkan navigasi di app/ dari komponen reusable di components/.',
        en: 'Expo Router treats every file inside app/ as a route. This skill strictly isolates routing in app/ from components/.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-project-structure/SKILL.md',
  },
  {
    name: 'expo-router',
    category: 'framework-core',
    invocation: 'model',
    description: {
      id: 'Navigasi dan routing resmi Expo Router: file-based routing, Stack & Tabs, dynamic routes, dan deep linking.',
      en: 'Official Expo Router navigation: file-based routing, Stack & Tabs navigation, dynamic segments, and deep linking.',
    },
    detailedDescription: {
      id: 'Navigasi dan routing resmi Expo Router: file-based routing, Stack & Tabs, dynamic routes, dan deep linking. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Official Expo Router navigation: file-based routing, Stack & Tabs navigation, dynamic segments, and deep linking. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-router di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-router sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-router in an Expo or React Native app.',
        'Configuring and optimizing expo-router functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-router.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-router.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Navigasi Native Sejati Berbasis File',
        en: 'Native File-Based Orchestration',
      },
      body: {
        id: 'Expo Router mengubah struktur app/ menjadi controller navigasi native sejati (UINavigationController & FragmentManager).',
        en: 'Expo Router translates your app/ folder into native navigation controllers (UINavigationController & FragmentManager) with deep linking.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-router/SKILL.md',
  },
  {
    name: 'expo-skill-feedback',
    category: 'tooling',
    invocation: 'model',
    description: {
      id: 'Mengirim umpan balik dan laporan bug resmi ke tim Expo terkait skill agen atau framework Expo.',
      en: 'Submit official feedback and bug reports to the Expo team regarding agent skills or the framework.',
    },
    detailedDescription: {
      id: 'Mengirim umpan balik dan laporan bug resmi ke tim Expo terkait skill agen atau framework Expo. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Submit official feedback and bug reports to the Expo team regarding agent skills or the framework. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-skill-feedback di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-skill-feedback sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-skill-feedback in an Expo or React Native app.',
        'Configuring and optimizing expo-skill-feedback functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-skill-feedback.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-skill-feedback.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Umpan Balik Loop Terbuka',
        en: 'Open Feedback Loop',
      },
      body: {
        id: 'Menjaga kualitas panduan tetap tajam dengan pelaporan langsung ke maintainer resmi saat instruksi tidak lagi sesuai dengan versi SDK terbaru.',
        en: 'Keeps guidance accurate through direct maintainer feedback pipelines whenever instructions diverge from modern SDK realities.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-skill-feedback/SKILL.md',
  },
  {
    name: 'expo-ui',
    category: 'native-ui',
    invocation: 'model',
    description: {
      id: 'Komponen UI native sejati dari paket @expo/ui: tombol, switch, dan sheet berbasis SwiftUI dan Jetpack Compose.',
      en: 'True native UI components with @expo/ui: buttons, switches, and sheets backed by SwiftUI and Jetpack Compose.',
    },
    detailedDescription: {
      id: 'Komponen UI native sejati dari paket @expo/ui: tombol, switch, dan sheet berbasis SwiftUI dan Jetpack Compose. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'True native UI components with @expo/ui: buttons, switches, and sheets backed by SwiftUI and Jetpack Compose. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-ui di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-ui sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-ui in an Expo or React Native app.',
        'Configuring and optimizing expo-ui functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-ui.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-ui.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'SwiftUI & Compose di Bawah Kap',
        en: 'SwiftUI & Compose Under the Hood',
      },
      body: {
        id: '@expo/ui menjembatani JSX langsung ke widget native modern OS. Kontrol menggunakan komponen asli Apple dan Google dengan fisika OS asli.',
        en: '@expo/ui bridges JSX directly to modern OS native widgets. Controls render genuine Apple and Google widgets with native physics.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-ui/SKILL.md',
  },
  {
    name: 'expo-upgrade',
    category: 'maintenance',
    invocation: 'model',
    description: {
      id: 'Panduan upgrade versi Expo SDK dan perbaikan breaking changes dependensi native dengan expo install --fix.',
      en: 'Guidelines for upgrading Expo SDK versions and resolving breaking changes with expo install --fix.',
    },
    detailedDescription: {
      id: 'Panduan upgrade versi Expo SDK dan perbaikan breaking changes dependensi native dengan expo install --fix. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Guidelines for upgrading Expo SDK versions and resolving breaking changes with expo install --fix. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-upgrade di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-upgrade sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-upgrade in an Expo or React Native app.',
        'Configuring and optimizing expo-upgrade functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-upgrade.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-upgrade.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Harmonisasi Versi Dependensi',
        en: 'Dependency Alignment via Fix',
      },
      body: {
        id: 'Memasang package dengan npm biasa sering memicu crash native. Perintah expo install --fix otomatis mencocokkan library ke tabel uji SDK aktif.',
        en: 'Installing libraries with plain npm often causes native crashes. Running expo install --fix pins every package to tested compatibility tables.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-upgrade/SKILL.md',
  },
  {
    name: 'expo-web-to-native',
    category: 'migration',
    invocation: 'model',
    description: {
      id: 'Panduan migrasi aplikasi React Web existing menjadi aplikasi native iOS & Android berbasis Expo.',
      en: 'Migration guide for transitioning an existing React Web application to native iOS & Android via Expo.',
    },
    detailedDescription: {
      id: 'Panduan migrasi aplikasi React Web existing menjadi aplikasi native iOS & Android berbasis Expo. Panduan resmi dari tim Expo untuk alur kerja mobile modern.',
      en: 'Migration guide for transitioning an existing React Web application to native iOS & Android via Expo. Official guide from the Expo team for modern mobile workflows.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas yang berkaitan dengan expo-web-to-native di aplikasi Expo atau React Native.',
        'Mengonfigurasi dan mengoptimasi fungsionalitas expo-web-to-native sesuai standar resmi Expo SDK.',
      ],
      en: [
        'Working on tasks related to expo-web-to-native in an Expo or React Native app.',
        'Configuring and optimizing expo-web-to-native functionality following official Expo SDK standards.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek web murni yang tidak menggunakan ekosistem React Native atau Expo.',
      ],
      en: [
        'Pure web projects that do not touch the React Native or Expo ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi konfigurasi app.json dan dependensi package.json.',
        'Menerapkan pola best-practice resmi Expo untuk expo-web-to-native.',
        'Memverifikasi kompatibilitas dengan Expo SDK aktif.',
      ],
      en: [
        'Agent validates app.json configuration and package.json dependencies.',
        'Applies official Expo best-practice patterns for expo-web-to-native.',
        'Verifies compatibility with the active Expo SDK version.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan npx expo install alih-alih npm/yarn untuk memastikan versi package kompatibel.',
        'Selalu uji perubahan pada minimal satu platform native (iOS simulator atau Android emulator).',
      ],
      en: [
        'Use npx expo install instead of npm/yarn to ensure compatible package versions.',
        'Always verify changes on at least one native platform (iOS simulator or Android emulator).',
      ],
    },
    tips: {
      id: [
        'Jalankan npx expo-doctor untuk mendeteksi masalah konfigurasi umum di proyek Anda.',
      ],
      en: [
        'Run npx expo-doctor to detect common configuration issues in your project.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-router', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Peta Pengganti Web ke Native',
        en: 'Web-to-Native Mapping Matrix',
      },
      body: {
        id: 'Web mengandalkan alur dokumen sementara React Native mengandalkan Flexbox kolom murni. Memahami perbedaan ini mencegah layout kolaps.',
        en: 'The web defaults to document block flows while React Native defaults strictly to Flexbox columns. Respecting this eliminates layout collapse.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-web-to-native/SKILL.md',
  },
]
