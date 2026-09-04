import type { BilingualString, BilingualList } from '@/types/skill'

export const JAKUBKREHEL_SOURCE_REPO = 'github.com/jakubkrehel/skills'
export const JAKUBKREHEL_SOURCE_SHA = '95318db9bfd1ee852ef713b19036c07aa22a7f5a'
export const SOURCE_REPO = JAKUBKREHEL_SOURCE_REPO
export const SOURCE_SHA = JAKUBKREHEL_SOURCE_SHA

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
}

export const jakubkrehelSkills: RichSkill[] = [
  {
    name: "better-accessibility",
    category: "accessibility",
    invocation: "model",
    description: {
      id: "Audit dan terapkan standar aksesibilitas web (a11y) berbasis elemen HTML natif dan kontras terukur.",
      en: "Audit and apply web accessibility standards based on native HTML elements and verified contrast.",
    },
    detailedDescription: {
      id: "better-accessibility membantu proyek kamu mematuhi standar aksesibilitas web tanpa over-engineering ARIA. Skill ini memprioritaskan semantik HTML natif (<button>, <a href>), visibilitas fokus keyboard yang jelas via :focus-visible, dan verifikasi alur menggunakan keyboard sebelum screen-reader.",
      en: "better-accessibility helps your project comply with web accessibility standards without ARIA over-engineering. It prioritizes native HTML semantics (<button>, <a href>), visible keyboard focus rings via :focus-visible, and verification through keyboard navigation before screen-reader checks.",
    },
    useWhen: {
      id: ["Audit kepatuhan aksesibilitas pada komponen antarmuka web.", "Memastikan navigasi keyboard dan cincin fokus bekerja dengan benar.", "Mengukur kontras warna teks terhadap latar belakang."],
      en: ["Auditing accessibility compliance on web UI components.", "Ensuring keyboard navigation and focus rings work reliably.", "Measuring text contrast against actual background colors."],
    },
    avoidWhen: {
      id: ["Komponen masih dalam tahap wireframe kasar tanpa tata letak final."],
      en: ["Component is still in rough wireframing without settled layout."],
    },
    howItWorks: {
      id: ["Inspeksi elemen interaktif dan pastikan memakai tag semantik natif.", "Verifikasi cincin fokus :focus-visible saat navigasi keyboard.", "Ukur rasio kontras teks (minimal 4.5:1 untuk teks normal).", "Uji navigasi tanpa mouse untuk memastikan semua kontrol dapat diakses."],
      en: ["Inspect interactive elements and ensure native semantic tags are used.", "Verify visible focus rings via :focus-visible during keyboard navigation.", "Measure text contrast ratio (at least 4.5:1 for normal text).", "Test navigation without a mouse to ensure all controls are reachable."],
    },
    coreRules: {
      id: ["Gunakan <button> untuk aksi dan <a href> untuk navigasi.", "Jangan gunakan outline: none tanpa pengganti cincin fokus yang jelas.", "Pastikan target sentuh minimal 44x44px."],
      en: ["Use <button> for actions and <a href> for navigation.", "Never use outline: none without an explicit visible replacement.", "Ensure touch target size is at least 44x44px."],
    },
    tips: {
      id: ["Lakukan pengujian keyboard-only terlebih dahulu sebelum screen-reader.", "Hapus ARIA yang membingungkan daripada menambahkannya secara berlebihan."],
      en: ["Perform keyboard-only testing before screen-reader passes.", "Prefer removing redundant ARIA over adding complex custom roles."],
    },
    pairsWellWith: ["better-colors", "better-layout", "better-interface"],
    sourcePath: "skills/better-accessibility/SKILL.md",
  },
  {
    name: "better-colors",
    category: "color",
    invocation: "model",
    description: {
      id: "Bangun sistem palet warna terstruktur, token semantik, dan verifikasi kontras APCA/WCAG.",
      en: "Build structured color ramps, semantic tokens, and verified APCA/WCAG contrast.",
    },
    detailedDescription: {
      id: "better-colors mengorganisir warna sebagai sistem peran terstruktur, bukan sekadar nilai acak. Setiap step pada rampa warna (50\u2013950) memiliki fungsi spesifik (background, border, text). Mengutamakan ruang warna OKLCH untuk interpolasi gradasi yang seragam tanpa titik tengah kusam.",
      en: "better-colors structures color as a role-based system rather than scattered values. Every step in a ramp has a distinct purpose (surface, border, text). Leverages OKLCH for uniform perceptual lightness across gradients without muddy midpoints.",
    },
    useWhen: {
      id: ["Menyusun atau merapikan sistem token warna proyek.", "Memilih rampa warna yang konsisten untuk mode terang dan gelap.", "Memverifikasi nilai kontras teks secara matematis dan terukur."],
      en: ["Structuring or refactoring project color tokens.", "Selecting consistent ramps for light and dark modes.", "Measuring text contrast mathematically against backgrounds."],
    },
    avoidWhen: {
      id: ["Menentukan warna hanya berdasarkan perkiraan mata tanpa verifikasi nilai."],
      en: ["Picking colors solely by eye without measuring contrast."],
    },
    howItWorks: {
      id: ["Petakan peran semantik: surface, border, text, dan accent.", "Susun rampa warna dengan perbedaan lightness perseptual yang teratur.", "Gunakan interpolasi in oklch untuk gradasi warna yang cerah.", "Ukur kontras setiap kombinasi teks dan background."],
      en: ["Map semantic roles: surface, border, text, and accent.", "Structure ramps with even perceptual lightness steps.", "Use in oklch interpolation for vivid gradients without gray midpoints.", "Measure contrast for all text-on-background pairings."],
    },
    coreRules: {
      id: ["Jangan laporkan nilai kontras yang tidak diukur secara nyata.", "Gunakan token semantik proyek daripada nilai hex acak."],
      en: ["Never report a contrast value you did not measure.", "Use semantic tokens rather than arbitrary scattered hex codes."],
    },
    tips: {
      id: ["Gunakan interpolasi OKLCH agar warna tengah gradasi tidak redup.", "Pastikan kontras teks body minimal 4.5:1 (WCAG AA)."],
      en: ["Use OKLCH interpolation to keep gradient midpoints vivid.", "Ensure body text contrast meets at least 4.5:1 (WCAG AA)."],
    },
    pairsWellWith: ["better-accessibility", "better-ui", "better-interface"],
    sourcePath: "skills/better-colors/SKILL.md",
  },
  {
    name: "better-interface",
    category: "visual",
    invocation: "user",
    description: {
      id: "Meta-review menyeluruh yang mengorkestrasikan seluruh disiplin better-* dalam satu laporan.",
      en: "Holistic cross-discipline review orchestrating all better-* skills into a single report.",
    },
    detailedDescription: {
      id: "better-interface menggabungkan audit tata letak, tipografi, warna, interaksi, dan aksesibilitas menjadi satu laporan prioritas. Bertindak sebagai konduktor orkestrasi yang mengumpulkan bukti konkret dan memberikan peringkat temuan (High, Medium, Low) tanpa menduplikasi aturan masing-masing domain.",
      en: "better-interface consolidates layout, typography, color, interaction, and accessibility audits into a single prioritized report. It acts as an orchestrator collecting concrete evidence and ranking findings (High, Medium, Low) without overriding domain rules.",
    },
    useWhen: {
      id: ["Audit menyeluruh kualitas antarmuka pada satu layar atau alur penuh.", "Menemukan inkonsistensi desain sebelum rilis fitur ke produksi.", "Mendapatkan laporan terstruktur dengan prioritas perbaikan yang jelas."],
      en: ["Comprehensive interface quality audit across a screen or flow.", "Catching design inconsistencies before shipping features to production.", "Obtaining a structured report prioritized by user impact."],
    },
    avoidWhen: {
      id: ["Review hanya pada git diff uncommitted kecil; gunakan /interface-review."],
      en: ["Small git diff reviews; use /interface-review instead."],
    },
    howItWorks: {
      id: ["Tentukan cakupan layar atau alur yang akan diperiksa.", "Delegasikan audit ke masing-masing disiplin (a11y, layout, typography, UI).", "Kumpulkan temuan dan verifikasi dengan bukti nyata.", "Urutkan temuan berdasarkan tingkat keparahan (High, Medium, Low)."],
      en: ["Resolve the target screen or user flow scope.", "Route audits to domain skills (a11y, layout, typography, UI polish).", "Collect evidence backed by actual DOM and rendered output.", "Rank findings by severity (High, Medium, Low)."],
    },
    coreRules: {
      id: ["Laporan berbasis bukti nyata, bukan sekadar selera pribadi.", "Batasi laporan maksimal 15 temuan prioritas teratas."],
      en: ["Reports must be grounded in concrete evidence, not subjective taste.", "Cap output to at most 15 top-priority findings."],
    },
    tips: {
      id: ["Fokuskan audit pada alur utama pengguna sebelum halaman sekunder.", "Periksa juga state kosong (zero state) dan state loading."],
      en: ["Focus audits on primary user journeys before secondary pages.", "Inspect zero states and loading states alongside happy paths."],
    },
    pairsWellWith: ["interface-review", "better-ui", "better-layout"],
    sourcePath: "skills/better-interface/SKILL.md",
  },
  {
    name: "better-layout",
    category: "visual",
    invocation: "model",
    description: {
      id: "Penyusunan hierarki spasial, alignment, pengelompokan spasi, dan adaptasi responsif/RTL.",
      en: "Spatial hierarchy, alignment, spacing-first grouping, and responsive/RTL layout.",
    },
    detailedDescription: {
      id: "better-layout membangun struktur visual menggunakan ruang (spasi) alih-alih garis pembatas tebal. Rasio jarak antar-grup dirancang minimal 2\u00d7 jarak dalam grup. Menggunakan CSS logical properties agar tata letak adaptif terhadap arah teks LTR dan RTL secara mulus.",
      en: "better-layout structures visual hierarchy using whitespace before divider lines. Enforces an inter-group spacing ratio at least 2x the intra-group gap. Employs CSS logical properties to ensure seamless LTR and RTL adaptability.",
    },
    useWhen: {
      id: ["Merapikan spasi, margin, dan padding antar-elemen komponen.", "Mengurangi ketergantungan berlebih pada garis pembatas (border).", "Membuat tata letak yang adaptif terhadap konten panjang dan arah RTL."],
      en: ["Organizing spacing, margins, and padding across components.", "Reducing over-reliance on heavy divider border lines.", "Building layouts that gracefully adapt to long text and RTL reading."],
    },
    avoidWhen: {
      id: ["Penyesuaian ukuran teks mikro; gunakan /better-typography."],
      en: ["Micro text sizing and truncation; use /better-typography."],
    },
    howItWorks: {
      id: ["Bagi konten ke dalam kelompok logis berbasis kedekatan spasi.", "Terapkan aturan jarak: spasi antar-grup minimal 2\u00d7 spasi dalam-grup.", "Sejajarkan elemen ke tepi batas (edge) bersama.", "Gunakan CSS logical properties untuk arah perataan teks."],
      en: ["Divide content into logical groups using spatial proximity.", "Apply the spacing rule: inter-group gap >= 2x intra-group gap.", "Align elements along consistent shared visual edges.", "Adopt CSS logical properties for direction-sensitive spacing."],
    },
    coreRules: {
      id: ["Gunakan spasi terlebih dahulu untuk mengelompokkan, garis pembatas terakhir.", "Pertahankan batas visual yang konsisten di seluruh breakpoint."],
      en: ["Group with whitespace first; divider lines are a last resort.", "Maintain consistent alignment edges across breakpoints."],
    },
    tips: {
      id: ["Jika tata letak terasa berantakan, periksa apakah ada terlalu banyak garis pembatas.", "Gunakan gap flex/grid sistematis sesuai skala token proyek."],
      en: ["If a layout feels noisy, check if there are too many separator lines.", "Rely on systematic flex/grid gap tokens rather than ad-hoc margins."],
    },
    pairsWellWith: ["better-ui", "better-typography", "better-interface"],
    sourcePath: "skills/better-layout/SKILL.md",
  },
  {
    name: "better-typography",
    category: "typography",
    invocation: "model",
    description: {
      id: "Penyempurnaan skala font, tabular numbers, text-wrap modern, dan OpenType features.",
      en: "Type scale refinement, tabular figures, modern text wrapping, and OpenType features.",
    },
    detailedDescription: {
      id: "better-typography mengedepankan kontrol ritme dan keterbacaan tipografi. Menerapkan text-wrap: balance pada judul dan pretty pada paragraf. Mewajibkan font-variant-numeric: tabular-nums pada data numerik dinamis agar layout tidak bergetar saat angka berubah.",
      en: "better-typography emphasizes typographic rhythm and readability. Applies text-wrap: balance on headings and pretty on prose. Mandates tabular numbers on dynamic numeric figures to eliminate layout jitter.",
    },
    useWhen: {
      id: ["Mengatur hierarki ukuran font dan panjang baris membaca (measure).", "Mencegah kata menggantung (widows) pada judul dan deskripsi.", "Memastikan angka pada tabel atau counter tidak bergetar saat bertambah."],
      en: ["Configuring type scales, line heights, and comfortable measure.", "Preventing orphan words (widows) on headings and descriptions.", "Locking number widths on tables and counters to prevent layout jitter."],
    },
    avoidWhen: {
      id: ["Penyusunan kata dan nada pesan produk; gunakan /better-writing."],
      en: ["Copywriting tone and voice; use /better-writing."],
    },
    howItWorks: {
      id: ["Terapkan text-wrap: balance pada judul utama.", "Terapkan text-wrap: pretty pada paragraf deskripsi untuk mencegah widow.", "Aktifkan font-variant-numeric: tabular-nums pada angka dinamis.", "Batasi panjang baris paragraf antara 45 hingga 75 karakter."],
      en: ["Apply text-wrap: balance on primary headings.", "Apply text-wrap: pretty on description paragraphs to avoid orphans.", "Enable font-variant-numeric: tabular-nums on dynamic counters and tables.", "Constrain body line lengths between 45 and 75 characters."],
    },
    coreRules: {
      id: ["Gunakan format font .woff2 untuk kompresi maksimal di web.", "Gunakan properti CSS standar daripada font-feature-settings mentah."],
      en: ["Serve .woff2 font files for optimal web compression.", "Use standard CSS properties over raw font-feature-settings tags."],
    },
    tips: {
      id: ["Periksa tipografi pada ukuran layar sempit dengan teks nyata.", "Gunakan font variable untuk fleksibilitas bobot tanpa overhead biner."],
      en: ["Inspect typography on mobile widths using real content strings.", "Leverage variable fonts for flexible weights without extra HTTP requests."],
    },
    pairsWellWith: ["better-writing", "better-layout", "better-interface"],
    sourcePath: "skills/better-typography/SKILL.md",
  },
  {
    name: "better-ui",
    category: "visual",
    invocation: "model",
    description: {
      id: "Polesan detail mikro antarmuka: concentric border radius, optical alignment, dan surface depth.",
      en: "Micro-interaction polish: concentric border radius, optical alignment, and surface depth.",
    },
    detailedDescription: {
      id: "better-ui merajut kumpulan detail mikro menjadi tampilan antarmuka berkelas tinggi. Menerapkan rumus radius sepusat (R_in = R_out - P) untuk kontainer bersarang, offset optis (+2px) untuk ikon asimetris, dan bayangan berlapis transparan alih-alih border kaku.",
      en: "better-ui compounds micro-details into high-taste polish. Enforces concentric corner radii (R_inner = R_outer - Padding), optical nudges for asymmetric elements, and layered elevation shadows over harsh divider borders.",
    },
    useWhen: {
      id: ["Menyempurnakan sudut lengkung pada kartu, badge, dan modal bersarang.", "Memperbaiki posisi ikon di dalam tombol yang tampak miring secara visual.", "Memberikan kedalaman permukaan yang elegan menggunakan bayangan berlapis."],
      en: ["Refining corner curves on nested cards, badges, and modals.", "Correcting off-center icons inside buttons that look visually skewed.", "Adding subtle surface depth using layered transparent box-shadows."],
    },
    avoidWhen: {
      id: ["Membuat animasi berdurasi panjang (>300ms) untuk interaksi rutin."],
      en: ["Adding long animations (>300ms) to frequent routine actions."],
    },
    howItWorks: {
      id: ["Hitung border radius elemen dalam: R_inner = R_outer - padding.", "Beri offset optis manual (+1\u20132px) pada ikon berbentuk segitiga atau asimetris.", "Gunakan bayangan transparan berlapis untuk elevasi kartu.", "Pastikan animasi mikro berlangsung cepat dan dapat diinterupsi."],
      en: ["Calculate inner border radius: R_inner = R_outer - padding.", "Apply manual optical nudges (+1-2px) to asymmetric or play icons.", "Layer multiple subtle box-shadows to establish elevation depth.", "Ensure micro-interactions are fast and interruptible."],
    },
    coreRules: {
      id: ["Radius dalam wajib sepusat dengan radius pembungkus luarnya.", "Perlambat animasi hingga 10% kecepatan untuk mendeteksi cacat mikro."],
      en: ["Inner radii must remain concentric with outer container radii.", "Slow down animations to 10% speed during review to spot micro-glitches."],
    },
    tips: {
      id: ["Hindari border seragam 1px jika bayangan halus sudah cukup memberi kontras.", "Periksa tampilan pada monitor resolusi standar dan retina."],
      en: ["Avoid harsh 1px borders when subtle shadows provide cleaner depth.", "Verify rendering on standard-DPI and high-DPI displays."],
    },
    pairsWellWith: ["better-layout", "better-colors", "better-interface"],
    sourcePath: "skills/better-ui/SKILL.md",
  },
  {
    name: "better-writing",
    category: "engineering",
    invocation: "model",
    description: {
      id: "Penyempurnaan copy teks produk agar ringkas, jelas, konsisten, dan bebas dari kebingungan.",
      en: "Refines product copy for clarity, consistency, and human brevity.",
    },
    detailedDescription: {
      id: "better-writing memastikan komunikasi antarmuka ringkas, jelas, dan manusiawi. Memastikan istilah yang sama dipakai konsisten di seluruh aplikasi, menyapa pengguna secara langsung, serta menyesuaikan nada bicara (tenang saat error, serius saat data loss, hangat saat onboarding).",
      en: "better-writing ensures interface copy is brief, clear, and human. Keeps UI terminology unified across views, addresses the user directly, and adapts tone to context stakes (calm in errors, serious in data loss, warm in empty states).",
    },
    useWhen: {
      id: ["Menulis pesan error yang memberikan solusi alih-alih menyalahkan pengguna.", "Menjaga konsistensi nama tombol, menu, dan label di seluruh produk.", "Menghilangkan teks pengisi (filler) yang membuat antarmuka ramai."],
      en: ["Crafting solution-oriented error messages that guide the user.", "Standardizing button, menu, and label terminology across features.", "Eliminating fluff copy that crowds interface surfaces."],
    },
    avoidWhen: {
      id: ["Menulis humor atau lelucon pada pesan error atau dialog destruktif."],
      en: ["Injecting playful humor into error alerts or destructive dialogs."],
    },
    howItWorks: {
      id: ["Periksa istilah yang sudah digunakan di area antarmuka sekitar.", "Tulis pesan error yang menjelaskan apa yang terjadi dan langkah solusinya.", "Gunakan kata kerja aktif dan kalimat langsung yang singkat.", "Sesuaikan nada bicara dengan tingkat risiko aksi pengguna."],
      en: ["Audit terminology established across surrounding screens.", "Write error copy explaining what happened and the exact next step.", "Use direct active verbs and concise sentences.", "Calibrate tone to the stakes of the user's action."],
    },
    coreRules: {
      id: ["Pesan error terbaik adalah antarmuka yang dirancang agar error tidak terjadi.", "Konsistensi mengalahkan variasi kata yang dibuat-buat."],
      en: ["The best error message is an interface redesigned so errors cannot occur.", "Consistency beats artificial vocabulary variation."],
    },
    tips: {
      id: ["Baca copy teks dengan suara keras untuk memastikan terdengar natural.", "Pastikan teks tombol dialog mencerminkan aksi persis (misal: 'Hapus Proyek')."],
      en: ["Read copy aloud to confirm it sounds natural and conversational.", "Ensure confirmation dialog buttons name the exact verb ('Delete Project')."],
    },
    pairsWellWith: ["better-typography", "better-interface", "better-accessibility"],
    sourcePath: "skills/better-writing/SKILL.md",
  },
  {
    name: "break",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Stress-test komponen UI pada sandbox terisolasi dengan data skenario ekstrim.",
      en: "Stress tests UI components on an isolated sandbox against extreme edge-case data.",
    },
    detailedDescription: {
      id: "break merender satu komponen dalam berbagai kondisi batas yang mungkin terjadi di produksi: teks super panjang, string multibahasa, state kosong, overflow kontainer, dan format tak biasa untuk membuktikan ketahanan antarmuka sebelum digabungkan ke cabang utama.",
      en: "break renders an isolated component under worst-case production scenarios: ultra-long strings, localized text expansion, zero states, and container constraints to verify robustness before merging.",
    },
    useWhen: {
      id: ["Menguji ketahanan komponen sebelum digabungkan ke aplikasi utama.", "Melihat bagaimana komponen menangani teks 100 karakter atau teks ekspansif.", "Memastikan layout tidak rusak saat gambar gagal dimuat atau data bernilai null."],
      en: ["Stress-testing component resilience before merging into the main app.", "Validating behavior against 100-character names or expanded German text.", "Ensuring layouts don't break when images fail or values return null."],
    },
    avoidWhen: {
      id: ["Menguji seluruh halaman aplikasi sekaligus; fokus pada satu komponen spesifik."],
      en: ["Testing entire complex pages at once; scope to single components."],
    },
    howItWorks: {
      id: ["Pilih satu komponen target yang ingin diuji batasnya.", "Buat halaman preview sementara dengan berbagai variasi props ekstrim.", "Render komponen berdampingan dalam state kosong, loading, dan data masif.", "Identifikasi elemen yang meluap (overflow), terpotong janggal, atau tumpang tindih."],
      en: ["Target a single component for edge-case stress testing.", "Construct a temporary sandbox rendering extreme prop variations.", "Display states side by side: empty, loading, long-string, and missing data.", "Flag text overflows, awkward truncation, or broken wrapping."],
    },
    coreRules: {
      id: ["Fokus pada pengamatan visual nyata, bukan sekadar asumsi kode.", "Uji hanya properti yang benar-benar dapat berubah di produksi."],
      en: ["Focus on visual observation rather than code assumptions.", "Stress only properties that vary dynamically in production."],
    },
    tips: {
      id: ["Gunakan teks aksara non-Latin dan emoji untuk menguji wrapping.", "Periksa komponen pada kontainer tersempit yang didukung."],
      en: ["Use non-Latin scripts and emoji strings to stress test wrapping.", "Test components within the narrowest supported parent container."],
    },
    pairsWellWith: ["better-ui", "better-layout", "interface-review"],
    sourcePath: "skills/break/SKILL.md",
  },
  {
    name: "explain-interface",
    category: "engineering",
    invocation: "model",
    description: {
      id: "Analisis teknis bagaimana sebuah elemen antarmuka atau efek visual dibangun di web.",
      en: "Technical breakdown of how a web interface or visual effect was engineered.",
    },
    detailedDescription: {
      id: "explain-interface membedah tumpukan layer CSS, token, shader canvas, atau teknik rendering yang membentuk sebuah efek antarmuka. Bertujuan mengedukasi dan merekonstruksi arsitektur visual secara faktual tanpa menghakimi selera desain.",
      en: "explain-interface deconstructs the stack of CSS layers, design tokens, canvas shaders, or rendering techniques behind a visual effect. Focuses on factual technical explanation rather than subjective critique.",
    },
    useWhen: {
      id: ["Mencari tahu teknik CSS di balik efek animasi atau gradasi situs inspiratif.", "Memahami struktur tumpukan layer pada komponen antarmuka yang kompleks.", "Mendapatkan rekomendasi kode untuk mereproduksi efek serupa di proyek sendiri."],
      en: ["Investigating CSS techniques behind inspiring animations or gradients.", "Understanding layer stacking order in complex UI components.", "Getting actionable recipes to reproduce effects cleanly in your stack."],
    },
    avoidWhen: {
      id: ["Melakukan review kualitas kode internal; gunakan /interface-review."],
      en: ["Performing internal code review passes; use /interface-review."],
    },
    howItWorks: {
      id: ["Inspeksi elemen target melalui DOM browser atau dokumen sumber.", "Uraikan tumpukan layer visual berdasarkan urutan rendering.", "Identifikasi properti kunci: filter, mix-blend-mode, transform, atau shader.", "Jelaskan kontribusi masing-masing layer terhadap hasil akhir efek."],
      en: ["Inspect the target element via live browser DOM or source files.", "Dissect visual layers by paint order from background to foreground.", "Pinpoint key properties: filters, blend modes, transforms, or shaders.", "Explain the exact contribution of each layer to the final effect."],
    },
    coreRules: {
      id: ["Jelaskan fakta implementasi teknis tanpa menghakimi selera desain.", "Batasi penjelasan pada efek spesifik yang ditanyakan."],
      en: ["Explain technical implementation facts without subjective aesthetic judgment.", "Scope answers strictly to the specific requested effect."],
    },
    tips: {
      id: ["Matikan layer CSS satu per satu di devtools untuk memahami perannya.", "Periksa apakah efek menggunakan akselerasi GPU (transform, opacity)."],
      en: ["Toggle CSS declarations one by one in devtools to isolate roles.", "Check whether effects leverage GPU acceleration (transform, opacity)."],
    },
    pairsWellWith: ["better-ui", "variant", "better-interface"],
    sourcePath: "skills/explain-interface/SKILL.md",
  },
  {
    name: "interface-review",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Review desain antarmuka berbasis perubahan git diff uncommitted atau Pull Request.",
      en: "Diff-scoped design review of uncommitted git changes or pull requests.",
    },
    detailedDescription: {
      id: "interface-review menilai apakah perubahan terbaru pada diff git meningkatkan kualitas antarmuka atau justru memicu regresi. Mengisolasi file yang disentuh, membandingkan before dan after, serta mengklasifikasikan temuan berdasarkan dampak terhadap pengguna.",
      en: "interface-review evaluates whether recent git diff changes improved or degraded the interface. Scopes strictly to touched files and classifies findings by user impact rather than auditing the whole untouched codebase.",
    },
    useWhen: {
      id: ["Meninjau git diff perubahan UI sebelum membuat commit atau membuka PR.", "Memastikan kode baru tidak merusak konsistensi desain yang sudah ada.", "Mendapatkan feedback terfokus hanya pada baris kode yang diubah."],
      en: ["Reviewing uncommitted UI diffs before creating commits or PRs.", "Verifying that new code does not introduce design regressions.", "Obtaining focused feedback restricted strictly to modified files."],
    },
    avoidWhen: {
      id: ["Audit menyeluruh seluruh repository tanpa ada perubahan; gunakan /better-interface."],
      en: ["Auditing untouched repositories with clean trees; use /better-interface."],
    },
    howItWorks: {
      id: ["Tentukan cakupan diff: uncommitted changes atau range commit PR.", "Periksa kedua sisi diff (before dan after) pada file yang dimodifikasi.", "Evaluasi dampak perubahan terhadap layout, warna, a11y, dan tipografi.", "Klasifikasikan temuan menjadi isu akibat perubahan vs isu pre-existing."],
      en: ["Determine diff scope: uncommitted working tree or PR commit range.", "Inspect both sides of the diff (before vs after) on touched surfaces.", "Evaluate impacts across layout, typography, colors, and accessibility.", "Distinguish regressions caused by this change from pre-existing issues."],
    },
    coreRules: {
      id: ["Fokuskan review pada apa yang diubah oleh PR/commit ini.", "Beri prioritas tinggi pada isu yang merusak alur tugas pengguna."],
      en: ["Scope feedback strictly to code touched by this change.", "Give highest priority to issues blocking primary user workflows."],
    },
    tips: {
      id: ["Jalankan review ini di akhir setiap task sebelum memanggil /cpr.", "Pastikan seluruh string baru sudah didaftarkan di katalog terjemahan."],
      en: ["Run this review at the end of each task before calling /cpr.", "Ensure all newly added user-facing strings are registered in i18n catalogs."],
    },
    pairsWellWith: ["better-interface", "clean", "cpr"],
    sourcePath: "skills/interface-review/SKILL.md",
  },
  {
    name: "variant",
    category: "visual",
    invocation: "user",
    description: {
      id: "Eksplorasi dan pembuatan 3 alternatif desain yang berbeda secara terarah untuk dipilih.",
      en: "Explores and generates 3 intentionally distinct UI design variants.",
    },
    detailedDescription: {
      id: "variant membangun tiga variasi konkret dari satu komponen UI dengan memvariasikan satu sumbu utama (struktur, densitas, atau penekanan visual). Diletakkan dalam pemilih interaktif sehingga tim dapat membandingkan langsung dan memilih opsi terbaik.",
      en: "variant generates three purposeful design directions for a single component along one primary axis (layout structure, visual density, or color emphasis), allowing teams to switch and evaluate candidates live.",
    },
    useWhen: {
      id: ["Mencari alternatif desain terbaik untuk komponen penting sebelum finalisasi.", "Mengeksplorasi trade-off antara tata letak padat (dense) vs lapang (spacious).", "Menyajikan pilihan konkret yang dapat dicoba langsung di halaman nyata."],
      en: ["Exploring alternative directions for key components before finalizing.", "Evaluating trade-offs between dense productivity vs spacious layouts.", "Providing interactive options directly toggleable inside the running app."],
    },
    avoidWhen: {
      id: ["Membuat variasi yang hanya berbeda warna aksen tanpa perubahan struktur nyata."],
      en: ["Producing variants that only swap colors without meaningful design changes."],
    },
    howItWorks: {
      id: ["Pilih satu sumbu variasi utama: struktur, densitas, atau hierarki.", "Bangun 3 variasi independen yang mewakili titik berbeda pada sumbu tersebut.", "Tempatkan ketiga variasi di balik tombol pemilih (picker) di halaman kerja.", "Uji fungsionalitas dan pilih varian yang paling sesuai kebutuhan."],
      en: ["Select one primary variation axis: structure, density, or hierarchy.", "Implement 3 distinct candidates positioned along that chosen axis.", "Expose candidates behind a lightweight live preview switcher.", "Evaluate ergonomics and select the winning variant."],
    },
    coreRules: {
      id: ["Variasikan satu sumbu utama saja agar perbandingan bermakna.", "Semua varian wajib memenuhi standar aksesibilitas dan kontras."],
      en: ["Vary one primary axis at a time so comparisons remain meaningful.", "Every candidate variant must pass baseline accessibility gates."],
    },
    tips: {
      id: ["Gunakan variasi densitas untuk aplikasi dashboard dan alat profesional.", "Hapus kode varian yang tidak terpilih setelah keputusan diambil."],
      en: ["Leverage density variations when designing data-dense dashboards.", "Clean up unselected variant code branches once a choice is locked."],
    },
    pairsWellWith: ["better-ui", "better-layout", "explain-interface"],
    sourcePath: "skills/variant/SKILL.md",
  },
]
