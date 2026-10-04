import type { BilingualString, BilingualList } from '@/types/skill'

// Koleksi: Cloudflare — github.com/cloudflare/skills (+ satu skill dari repo
// terpisah, github.com/cloudflare/security-audit-skill).
// Lisensi upstream: Apache-2.0 untuk cloudflare/skills (LICENSE di root repo +
// plugin.json) dan MIT untuk security-audit-skill. Guide ini hanya
// mendokumentasikan ringkasan; install langsung dari repo upstream.
//
// Sumber: https://github.com/cloudflare/skills (diverifikasi 2026-10-04 pada
// commit 41e0d19; 16 skill, termasuk basin, k2, dan nextjs-on-cloudflare) dan
// https://github.com/cloudflare/security-audit-skill (commit c1c8a8c, HEAD
// upstream saat diverifikasi; 1 skill: security-audit). Total 17 skill.
export const CLOUDFLARE_SOURCE_REPO = 'github.com/cloudflare/skills'
export const CLOUDFLARE_SOURCE_SHA = '41e0d19858946d18af9ee2c2feebbe2e11d829ff'
export const CLOUDFLARE_SOURCE_LICENSE = 'Apache-2.0'
export const CLOUDFLARE_SECURITY_AUDIT_REPO = 'github.com/cloudflare/security-audit-skill'
export const CLOUDFLARE_SECURITY_AUDIT_SHA = 'c1c8a8c1471069fb0e188eeaff69b8e8db6564a8'
export const CLOUDFLARE_SECURITY_AUDIT_LICENSE = 'MIT'

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
  /** Hanya bila skill berasal dari repo lain selain cloudflare/skills. */
  upstream?: { repo: string; sha: string; license: string }
  /** Section khusus unik per skill — hanya dirender bila ada. */
  spotlight?: {
    title: BilingualString
    body: BilingualString
  }
}

export const cloudflareSkills: RichSkill[] = [
{
    name: 'workers-best-practices',
    category: 'workers-platform',
    invocation: 'model',
    description: {
      id: 'Panduan menulis, meninjau, dan mengonfigurasi Cloudflare Workers untuk produksi.',
      en: 'Guidance for writing, reviewing, and configuring production Cloudflare Workers.',
    },
    detailedDescription: {
      id: 'Skill ini memprioritaskan API, tipe, dan konfigurasi yang sesuai versi proyek serta mendorong retrieval dokumentasi Cloudflare. Aktifkan Workers Logs dan Traces dengan observability.enabled serta observability.traces.enabled. Gunakan wrangler types untuk menghasilkan tipe binding, crypto.randomUUID() atau crypto.getRandomValues() untuk token, dan ctx.waitUntil() untuk pekerjaan latar belakang. Detailnya dipecah ke tiga referensi: configuration.md (compatibility date, binding, secret, logs/traces), runtime-patterns.md (streaming, promise lifetime, request state), dan platform-apis.md (signature handler, binding access, serialisasi).',
      en: 'This skill prioritizes project-version APIs, types, and configuration, with Cloudflare documentation retrieval. Enable Workers Logs and Traces using observability.enabled and observability.traces.enabled. Generate binding types with wrangler types, use crypto.randomUUID() or crypto.getRandomValues() for tokens, and attach background work to ctx.waitUntil(). The details live in three references: configuration.md (compatibility dates, bindings, secrets, logs/traces), runtime-patterns.md (streaming, promise lifetime, request state), and platform-apis.md (handler signatures, binding access, serialization).',
    },
    useWhen: {
      id: ['Menulis atau mereview handler Workers.', 'Menyiapkan Worker untuk produksi dan observability.', 'Memeriksa binding, streaming, keamanan, atau umur pekerjaan async.'],
      en: ['Writing or reviewing Workers handlers.', 'Preparing a Worker for production and observability.', 'Checking bindings, streaming, security, or asynchronous-work lifetime.'],
    },
    avoidWhen: { id: ['Fokus utama adalah perintah CLI Wrangler.', 'Fokus utama adalah audit metrik browser.'], en: ['The main focus is Wrangler CLI commands.', 'The main focus is browser performance metrics.'] },
    howItWorks: {
      id: ['Periksa versi terpasang, generated types, dan compatibility settings.', 'Ambil dokumentasi untuk API atau limit yang relevan.', 'Terapkan binding, streaming, error handling, dan async lifetime yang benar.', 'Jalankan type-check atau runtime test yang terdampak.'],
      en: ['Inspect installed versions, generated types, and compatibility settings.', 'Retrieve documentation for relevant APIs or limits.', 'Apply correct binding, streaming, error-handling, and asynchronous-lifetime patterns.', 'Run affected type checks or runtime tests.'],
    },
    coreRules: {
      id: ['Jangan buffer body tak terbatas dengan await response.text().', 'Jangan hardcode secret atau memakai any pada Env/handler.', 'Jangan menyimpan mutable request state di module level.'],
      en: ['Do not buffer unbounded bodies with await response.text().', 'Do not hardcode secrets or use any for Env/handler parameters.', 'Do not keep mutable request state at module scope.'],
    },
    tips: { id: ['Panggil ctx.waitUntil(...) tanpa destructuring method.', 'Gunakan Worker binding alih-alih REST API bila operasi tersedia.', 'Gunakan tanggal hari ini sebagai compatibility date Worker baru; untuk Worker lama, majukan berkala sambil meninjau perubahan dan menjalankan test.'], en: ['Call ctx.waitUntil(...) without destructuring its method.', 'Use a Worker binding instead of the REST API when the operation is available.', 'Use today\'s date as the compatibility date for new Workers; for existing Workers, advance it periodically while reviewing changes and running tests.'] },
    pairsWellWith: ['wrangler', 'cloudflare', 'web-perf'],
    spotlight: {
      title: { id: 'Hindari Tiga Jebakan Workers yang Sering Menyamar sebagai Penanganan Error', en: 'Avoid Three Workers Traps That Masquerade as Error Handling' },
      body: { id: 'Jangan jadikan ctx.passThroughOnException() sebagai penanganan error umum karena kegagalan Worker bisa tersembunyi di origin. Bandingkan rahasia dengan pola Web Crypto, dan di platform class akses binding melalui this.env.X, bukan env.X yang tidak terikat.', en: 'Do not use ctx.passThroughOnException() as general error handling: it can hide Worker failures behind the origin. Compare secrets with a Web Crypto pattern, and in platform classes access bindings through this.env.X rather than an unbound env.X.' },
    },
    sourcePath: 'skills/workers-best-practices/SKILL.md',
  },
  {
    name: 'wrangler',
    category: 'workers-platform',
    invocation: 'model',
    description: {
      id: 'Menjalankan dan mendiagnosis Wrangler serta mengonfigurasi proyek Worker untuk pengembangan lokal, Previews, deployment, dan manajemen resource.',
      en: 'Run and troubleshoot Wrangler while configuring Worker projects for local development, Previews, deployment, and resource management.',
    },
    detailedDescription: {
      id: 'Aturan teratas: jika proyek punya cloudflare.config.ts atau pengguna meminta CLI cf, jangan pakai skill ini; ikuti dokumentasi Cloudflare CLI. Skill ini mewajibkan pemeriksaan package manager, versi Wrangler, scripts, framework, dan config proyek sebelum bertindak. Gunakan wrangler --help, schema lokal node_modules/wrangler/config-schema.json, dan dokumentasi command yang relevan. Untuk perubahan binding TypeScript, jalankan wrangler types; untuk deployment, gunakan build proyek dan wrangler deploy --dry-run bila tersedia (catatan: dry-run tidak memvalidasi resource remote atau runtime). Untuk branch/PR environment ada panduan Workers Previews (butuh Wrangler lokal 4.135.0+), dan sebelum perintah remote skill meminta identifikasi member/API token serta role dan scope paling sempit yang dibutuhkan.',
      en: 'Top rule: if the project has a cloudflare.config.ts file or the user asked for the cf CLI, do not use this skill; follow the Cloudflare CLI documentation instead. This skill requires inspecting the package manager, Wrangler version, scripts, framework, and project config before acting. Use wrangler --help, the local node_modules/wrangler/config-schema.json, and the relevant command documentation. For TypeScript binding changes run wrangler types; for deployments use the project build and wrangler deploy --dry-run when supported (note: dry-run does not validate remote resources or runtime). It also covers Workers Previews for branch/PR environments (requires project-local Wrangler 4.135.0+), and before remote commands it asks you to identify the authenticated member or API token and the narrowest role and scope the operation needs.',
    },
    useWhen: { id: ['Menjalankan lokal atau deploy Worker.', 'Menambah binding, environment, atau konfigurasi Wrangler.', 'Mendiagnosis akun, resource, secret, atau rollback.'], en: ['Running locally or deploying a Worker.', 'Adding bindings, environments, or Wrangler configuration.', 'Diagnosing accounts, resources, secrets, or rollbacks.'] },
    avoidWhen: { id: ['Proyek punya cloudflare.config.ts atau pengguna meminta CLI cf (ikuti dokumentasi cf; jangan jalankan cf dev/build/deploy di proyek yang hanya punya config Wrangler tanpa migrasi).', 'Tidak ada kebutuhan CLI atau konfigurasi Wrangler.', 'Target account/environment belum ditentukan untuk operasi yang mengubah state.'], en: ['The project has cloudflare.config.ts or the user asked for the cf CLI (follow the cf docs; do not run cf dev/build/deploy in a project that has only a Wrangler config without migrating it first).', 'There is no Wrangler CLI or configuration need.', 'The target account/environment is unspecified for a state-changing operation.'] },
    howItWorks: { id: ['Inspeksi versi, scripts, config, dan target environment.', 'Verifikasi flags serta field melalui help dan schema lokal.', 'Ubah source config, jaga secret tetap terlindungi, dan bedakan local dari remote.', 'Regenerasi types lalu validasi dengan build atau dry run.'], en: ['Inspect versions, scripts, config, and target environment.', 'Verify flags and fields through local help and schema.', 'Change source config, protect secrets, and distinguish local from remote.', 'Regenerate types, then validate with the build or dry run.'] },
    coreRules: { id: ['Jalankan versi Wrangler lokal dari package manager proyek.', 'Jangan taruh secret di argumen, source, atau log.', 'Periksa inheritance environment sebelum menambah binding.', 'Sebelum perintah remote, identifikasi member atau API token dan pilih scope paling sempit; login OAuth wrangler tidak mendukung otorisasi granular, jadi pakai API token milik akun bila perlu dan jangan minta nilainya ditempel di chat.'], en: ['Run the project package manager’s local Wrangler version.', 'Keep secrets out of arguments, source, and logs.', 'Check environment inheritance before adding bindings.', 'Before a remote command, identify the member or API token and choose the narrowest scope; the wrangler login OAuth flow does not support granular authorization, so use an account-owned API token when needed and never ask for its value in chat.'] },
    tips: { id: ['Gunakan wrangler.jsonc untuk config baru.', 'Anggap wrangler secret put/delete sebagai deployment langsung.', 'Workers Previews: pakai untuk environment branch/PR di bawah Worker yang sama (Version URL untuk memeriksa satu versi dengan resource produksi, environment Wrangler untuk Worker permanen terpisah). URL Preview bersifat publik kecuali access control dikonfigurasi, dan saat menarget environment Wrangler, beri --env yang sama pada setiap perintah Preview.'], en: ['Prefer wrangler.jsonc for new configuration.', 'Treat wrangler secret put/delete as immediate deployments.', 'Workers Previews: use them for branch/PR environments under the same Worker (Version URLs to inspect one uploaded version with production resources, Wrangler environments for persistent separate Workers). Preview URLs are public unless access controls are configured, and when targeting a Wrangler environment, pass the same --env to every Preview command.'] },
    pairsWellWith: ['workers-best-practices', 'cloudflare'],
    spotlight: {
      title: { id: 'Rahasia Wrangler Bisa Langsung Menjadi Deployment', en: 'Wrangler Secrets Can Deploy Immediately' },
      body: { id: 'Perlakukan wrangler secret put dan secret delete sebagai deployment karena keduanya membuat versi lalu langsung merilisnya. Untuk staging, gunakan workflow wrangler versions secret; pada Cloudflare Vite plugin, pilih environment saat dev atau build dengan CLOUDFLARE_ENV.', en: 'Treat wrangler secret put and secret delete as deployments: they create a version and deploy it immediately. For staging, use the wrangler versions secret workflow; with the Cloudflare Vite plugin, select the environment at dev or build time with CLOUDFLARE_ENV.' },
    },
    sourcePath: 'skills/wrangler/SKILL.md',
  },
  {
    name: 'cloudflare',
    category: 'workers-platform',
    invocation: 'model',
    description: { id: 'Memilih produk Cloudflare yang tepat berdasarkan kebutuhan aplikasi.', en: 'Choose the right Cloudflare product from an application need.' },
    detailedDescription: { id: 'Langkah pertama: jika proyek punya cloudflare.config.ts atau pengguna meminta CLI cf (beta), baca dokumentasi Cloudflare CLI dan jangan muat skill wrangler; panduan produk tetap berlaku. Skill ini memetakan kebutuhan ke produk seperti Workers, Workers Static Assets, R2, D1, Queues, Workflows, Workers for Platforms, serta produk yang lebih baru seperti Basin, K2 Streams, vinext (Next.js), Flue, Artifacts, Dynamic Workers, dan Roles/permissions. Untuk proyek baru, rekomendasikan Workers dan Workers Static Assets; gunakan Pages untuk deployment Pages yang sudah ada. Pilih Workers Cache sebagai default caching aplikasi dan gunakan binding di dalam Worker bila operasi didukung.', en: 'First check: if the project has cloudflare.config.ts or the user asked for the cf CLI (beta), read the Cloudflare CLI documentation and do not load the wrangler skill; the product guidance still applies. This skill maps needs to products such as Workers, Workers Static Assets, R2, D1, Queues, Workflows, Workers for Platforms, plus newer products like Basin, K2 Streams, vinext (Next.js), Flue, Artifacts, Dynamic Workers, and Roles/permissions. For new projects recommend Workers and Workers Static Assets; preserve Pages for existing Pages deployments. Prefer Workers Cache for application caching and bindings inside Workers when the operation is supported.' },
    useWhen: { id: ['Memilih arsitektur atau produk Cloudflare.', 'User menjelaskan kebutuhan tanpa menyebut produk.', 'Mengkombinasikan compute, storage, queues, AI, atau security.'], en: ['Choosing a Cloudflare architecture or product.', 'The user describes a need without naming a product.', 'Combining compute, storage, queues, AI, or security.'] },
    avoidWhen: { id: ['Produk dan arsitektur sudah jelas serta implementasinya membutuhkan skill khusus.'], en: ['The product and architecture are already clear and implementation needs a specialized skill.'] },
    howItWorks: { id: ['Mulai dari tujuan dan kebutuhan data, konsistensi, atau lifecycle.', 'Petakan kebutuhan ke produk yang koheren.', 'Baca referensi produk dan cek availability, limit, pricing, atau migration.', 'Rekomendasikan hanya komponen yang benar-benar diperlukan.'], en: ['Start from goals and data, consistency, or lifecycle needs.', 'Map the need to a coherent product set.', 'Read product references and check availability, limits, pricing, or migration.', 'Recommend only components the behavior actually needs.'] },
    coreRules: { id: ['Jangan menjanjikan limit, harga, atau availability tanpa pengecekan terkini.', 'Gunakan produk sekecil dan sekoheren mungkin.', 'Pilih bindings untuk operasi Worker yang didukung.'], en: ['Do not promise limits, pricing, or availability without current verification.', 'Choose the smallest coherent product combination.', 'Use bindings for supported Worker operations.'] },
    tips: { id: ['Cek dulu apakah proyek memakai cf (cloudflare.config.ts); cf masih beta, jadi ambil dokumentasinya dan gunakan cf cli search "<task>" untuk menemukan perintah, bukan menghafal.', 'Pair R2 dengan D1 bila metadata perlu query SQL.', 'Pair Queues dengan Workflows saat pekerjaan perlu orkestrasi durable multi-step.'], en: ['Check first whether the project uses cf (cloudflare.config.ts); cf is in beta, so retrieve its docs and use cf cli search "<task>" to find a command rather than relying on memory.', 'Pair R2 with D1 when metadata needs SQL queries.', 'Pair Queues with Workflows when work needs durable multi-step orchestration.'] },
    pairsWellWith: ['workers-best-practices', 'wrangler', 'nextjs-on-cloudflare', 'web-perf'],
    spotlight: {
      title: { id: 'Mulai dari Kebutuhan, Bukan Nama Produk', en: 'Start with the Need, Not the Product Name' },
      body: { id: 'Petakan upload ke Workers + R2 + D1 bila metadata perlu dicari; pilih Queues untuk pekerjaan background yang perlu menyerap burst. Gunakan Workflows untuk proses multi-step yang harus retry dan resume, serta Vectorize + Workers AI untuk retrieval semantik yang dikendalikan sendiri.', en: 'Map uploads to Workers + R2 + D1 when searchable metadata is needed; choose Queues for background work that must absorb bursts. Use Workflows for multi-step processes that retry and resume, and Vectorize + Workers AI for retrieval you control end to end.' },
    },
    sourcePath: 'skills/cloudflare/SKILL.md',
  },
  {
    name: 'web-perf',
    category: 'workers-platform',
    invocation: 'model',
    description: { id: 'Mengaudit dan mengoptimalkan loading, interaksi, dan Core Web Vitals memakai Chrome DevTools performance tooling.', en: 'Audit and optimize loading, interaction, and Core Web Vitals with Chrome DevTools performance tooling.' },
    detailedDescription: { id: 'Skill ini memulai dengan verifikasi tool browser/performance dan mengukur trace cold-load menggunakan performance_start_trace(autoStop: true, reload: true). Analisis LCPBreakdown, CLSCulprits, RenderBlocking, dan network requests; cek threshold LCP 2.5s serta INP 200ms sebagai batas baik. Untuk codebase, deteksi bundler dari vite.config.ts atau konfigurasi lain dan periksa tree-shaking, dynamic imports, compression, serta source maps.', en: 'This skill starts by verifying browser/performance tools and measuring a cold-load trace with performance_start_trace(autoStop: true, reload: true). Analyze LCPBreakdown, CLSCulprits, RenderBlocking, and network requests; use 2.5s LCP and 200ms INP as good thresholds. For a codebase, detect the bundler from vite.config.ts or other config and inspect tree-shaking, dynamic imports, compression, and source maps.' },
    useWhen: { id: ['Mengaudit Core Web Vitals atau Lighthouse.', 'Menyelidiki bottleneck network, render, atau bundle.', 'Mengoptimalkan website dengan codebase yang tersedia.'], en: ['Auditing Core Web Vitals or Lighthouse.', 'Investigating network, rendering, or bundle bottlenecks.', 'Optimizing a website with codebase access.'] },
    avoidWhen: { id: ['Tidak tersedia browser/performance tooling dan tidak ada codebase atau network evidence.'], en: ['Browser/performance tooling and codebase or network evidence are unavailable.'] },
    howItWorks: { id: ['Navigate lalu rekam performance trace dengan reload.', 'Analisis insight LCP, CLS, render blocking, dan dependency graph.', 'Daftar request dan detailkan payload, caching, preload, serta chain.', 'Ambil accessibility snapshot dan analisis framework/bundler bila ada source.'], en: ['Navigate, then record a performance trace with reload.', 'Analyze LCP, CLS, render-blocking, and dependency-graph insights.', 'List requests and inspect payloads, caching, preloads, and chains.', 'Take an accessibility snapshot and analyze the framework/bundler when source exists.'] },
    coreRules: { id: ['Verifikasi klaim melalui network, DOM, trace, atau codebase.', 'Prioritaskan isu berdasarkan estimated savings dan lewati dampak 0ms.', 'Sebutkan perbaikan spesifik, bukan nasihat umum.'], en: ['Verify claims through network, DOM, trace, or codebase evidence.', 'Prioritize by estimated savings and skip 0ms-impact issues.', 'Give specific fixes rather than generic advice.'] },
    tips: { id: ['Jika trace gagal, pastikan halaman sudah berhasil dinavigasi.', 'Periksa apakah origin preconnect benar-benar menerima request sebelum menghapusnya.'], en: ['If a trace fails, confirm the page navigated successfully first.', 'Check whether the origin received any requests before removing a preconnect.'] },
    pairsWellWith: ['workers-best-practices', 'cloudflare'],
    spotlight: {
      title: { id: 'Audit Performa dengan Jejak Bukti Berurutan', en: 'Audit Performance Through an Evidence Chain' },
      body: { id: 'Ikuti alur navigate → trace → insight → network → a11y → codebase agar rekomendasi dapat diverifikasi. Hasil akhir harus memuat tabel Core Web Vitals, temuan terurut, dan estimasi dampak; jangan memprioritaskan isu dengan dampak 0 ms.', en: 'Follow navigate → trace → insight → network → a11y → codebase so recommendations are verifiable. The final output must include a Core Web Vitals table, prioritized findings, and estimated impact; do not prioritize issues with 0 ms impact.' },
    },
    sourcePath: 'skills/web-perf/SKILL.md',
  },
{
    name: 'durable-objects', category: 'compute-state', invocation: 'model',
    description: { id: 'Bangun state persisten dan koordinasi kuat di edge Cloudflare.', en: 'Build persistent state and strong coordination at the Cloudflare edge.' },
    detailedDescription: { id: 'Gunakan Durable Objects untuk chat room, inventory, WebSocket, dan state per entitas. Routing deterministik memakai getByName(), storage SQLite memakai ctx.storage.sql.exec(), dan inisialisasi schema memakai blockConcurrencyWhile(). RPC methods, alarm setAlarm(), serta migrasi new_sqlite_classes adalah pola khasnya. Durable Objects tidak punya role atau permission sendiri: akses mengikuti Worker yang mengimplementasikannya, jadi persempit role Workers ke Worker atau produk yang dituju sebelum memberi akses observability atau Data Studio.', en: 'Use Durable Objects for chat rooms, inventory, WebSockets, and per-entity state. Deterministic routing uses getByName(), SQLite uses ctx.storage.sql.exec(), and schema initialization uses blockConcurrencyWhile(). RPC methods, setAlarm(), and new_sqlite_classes migrations are its defining patterns. Durable Objects have no separate roles or permissions: access follows the Worker that implements them, so scope the Workers role to the intended Worker or product before granting observability or Data Studio access.' },
    useWhen: { id: ['Membangun koordinasi stateful per room, user, atau entitas.', 'Membutuhkan strong consistency atau persistent WebSockets.', 'Mengonfigurasi binding, migrasi, RPC, alarm, atau pengujian Durable Objects.'], en: ['Building stateful coordination per room, user, or entity.', 'Needing strong consistency or persistent WebSockets.', 'Configuring bindings, migrations, RPC, alarms, or Durable Object tests.'] },
    avoidWhen: { id: ['Request sepenuhnya stateless atau membutuhkan fan-out global tinggi.'], en: ['Requests are fully stateless or require high global fan-out.'] },
    howItWorks: { id: ['Modelkan satu DO per coordination atom, bukan satu DO global.', 'Tambahkan binding dan migration new_sqlite_classes di Wrangler.', 'Inisialisasi schema di constructor dengan blockConcurrencyWhile(), lalu persist sebelum cache.', 'Akses instance dengan getByName() dan expose RPC/alarm sesuai kebutuhan.'], en: ['Model one DO per coordination atom, not one global DO.', 'Add the binding and new_sqlite_classes migration in Wrangler.', 'Initialize schema in the constructor with blockConcurrencyWhile(), then persist before caching.', 'Access the instance with getByName() and expose RPC/alarm as needed.'] },
    coreRules: { id: ['Gunakan getByName() untuk routing deterministik.', 'Jangan menahan blockConcurrencyWhile() selama fetch atau external I/O.', 'setAlarm() hanya mempertahankan satu alarm dan menggantikan alarm lama.'], en: ['Use getByName() for deterministic routing.', 'Never hold blockConcurrencyWhile() across fetch or external I/O.', 'setAlarm() keeps one alarm and replaces the existing alarm.'] },
    tips: { id: ['Gunakan SQLite synchronous sebagai storage yang direkomendasikan.', 'Baca references/testing.md sebelum memilih setup Vitest.', 'Otorisasi: tidak ada role khusus Durable Objects; ambil panduan otorisasi terbaru sebelum memberi akses observability/Data Studio dan batasi role Workers ke Worker yang dituju.'], en: ['Use synchronous SQLite as the recommended storage.', 'Read references/testing.md before choosing a Vitest setup.', 'Authorization: Durable Objects have no dedicated roles; retrieve the current authorization guidance before granting observability or Data Studio access and scope the Workers role to the intended Worker.'] },
    pairsWellWith: ['agents-sdk', 'sandbox-next'], spotlight: {
      title: { id: 'Pilih Stub Durable Object Sesuai Identitasnya', en: 'Choose the Durable Object Stub for Its Identity Model' },
      body: { id: 'Gunakan getByName untuk routing deterministik, idFromString untuk ID yang sudah tersimpan, dan newUniqueId saat membuat identitas baru yang pemetaannya harus disimpan. Sebelum menulis test, baca testing.md dan uji perilaku koordinasi, persistensi, serta pemulihan—bukan sekadar bentuk API.', en: 'Use getByName for deterministic routing, idFromString for an existing stored ID, and newUniqueId when creating a new identity whose mapping must be persisted. Before writing tests, read testing.md and test coordination, persistence, and recovery behavior—not just API shape.' },
    },
    sourcePath: 'skills/durable-objects/SKILL.md',
  },
  {
    name: 'agents-sdk', category: 'compute-state', invocation: 'model',
    description: { id: 'Bangun agent Cloudflare dengan state persisten, RPC, scheduling, dan workflow durable.', en: 'Build Cloudflare agents with persistent state, RPC, scheduling, and durable workflows.' },
    detailedDescription: { id: 'Agents SDK memakai class Agent<Env, State>, setState(), validateStateChange(), dan @callable() untuk RPC via WebSocket. routeAgentRequest menangani URL /agents/{agent-name}/{instance-name}; API penting lain mencakup schedule(), scheduleEvery(), runWorkflow(), runFiber(), queue(), dan retry(). Konfigurasi memerlukan binding DO, migration SQLite, serta tanpa experimentalDecorators.', en: 'The Agents SDK uses Agent<Env, State>, setState(), validateStateChange(), and @callable() for WebSocket RPC. routeAgentRequest handles /agents/{agent-name}/{instance-name}; other key APIs include schedule(), scheduleEvery(), runWorkflow(), runFiber(), queue(), and retry(). Configuration requires a DO binding, SQLite migration, and no experimentalDecorators.' },
    useWhen: { id: ['Membangun agent stateful atau chat agent.', 'Membutuhkan callable RPC, scheduling, queue, retry, atau durable execution.', 'Mengintegrasikan routing agent, workflow, MCP, atau React client hooks.'], en: ['Building a stateful agent or chat agent.', 'Needing callable RPC, scheduling, queues, retries, or durable execution.', 'Integrating agent routing, workflows, MCP, or React client hooks.'] },
    avoidWhen: { id: ['Aplikasi tidak membutuhkan state atau lifecycle agent.'], en: ['The application needs neither state nor an agent lifecycle.'] },
    howItWorks: { id: ['Verifikasi package agents terpasang dengan npm ls agents.', 'Definisikan Agent<Env, State>, initialState, dan validasi perubahan state.', 'Expose method dengan @callable() dan route request memakai routeAgentRequest.', 'Tambahkan binding/migration lalu pilih schedule, workflow, queue, atau retry.'], en: ['Verify the agents package with npm ls agents.', 'Define Agent<Env, State>, initialState, and state-change validation.', 'Expose methods with @callable() and route requests with routeAgentRequest.', 'Add the binding/migration, then choose scheduling, workflows, queues, or retries.'] },
    coreRules: { id: ['Jangan aktifkan experimentalDecorators karena merusak @callable.', 'Jangan mengedit migration lama; selalu tambah tag baru.', 'Setiap agent class memerlukan binding DO dan migration sendiri.'], en: ['Do not enable experimentalDecorators because it breaks @callable.', 'Never edit old migrations; always add a new tag.', 'Each agent class requires its own DO binding and migration.'] },
    tips: { id: ['Gunakan validateStateChange untuk invariant seperti count tidak negatif.', 'Gunakan runFiber() atau stash() untuk pekerjaan yang bertahan dari eviction.'], en: ['Use validateStateChange for invariants such as non-negative counts.', 'Use runFiber() or stash() for work that survives eviction.'] },
    pairsWellWith: ['durable-objects', 'sandbox-next'], spotlight: {
      title: { id: 'Rutekan Kapabilitas Agent ke Eksekusi yang Tepat', en: 'Route Agent Capabilities to the Right Execution Primitive' },
      body: { id: 'Untuk pekerjaan yang harus bertahan saat DO dieviction, gunakan runFiber dan stash; gunakan queue serta retry untuk pekerjaan antrean yang tahan kegagalan, dan AgentWorkflow untuk orkestrasi multi-step durable. Di client, hubungkan useAgent atau useAgentChat ke routeAgentRequest, lalu gunakan getAgentByName bila routing kustom diperlukan.', en: 'Use runFiber and stash for work that must survive DO eviction; use queue and retry for failure-tolerant queued work, and AgentWorkflow for durable multi-step orchestration. On the client, connect useAgent or useAgentChat to routeAgentRequest, using getAgentByName when custom routing is needed.' },
    },
    sourcePath: 'skills/agents-sdk/SKILL.md',
  },
  {
    name: 'sandbox-next', category: 'compute-state', invocation: 'model',
    description: { id: 'Jalankan lingkungan Linux terisolasi memakai Sandbox SDK @next preview.', en: 'Run isolated Linux environments with the @next preview Sandbox SDK.' },
    detailedDescription: { id: 'Sandbox @next memakai getSandbox() dan sandbox.exec(argv), yang segera mengembalikan process handle. Hasil dikumpulkan dengan output(), logs(), atau waitForExit(); exec tidak memakai implicit shell dan setiap launch independen. Package Worker dan image container harus sama-sama @next, tanpa live secret di sandbox.', en: 'Sandbox @next uses getSandbox() and sandbox.exec(argv), which returns a process handle as soon as the process starts. Collect results with output(), logs(), or waitForExit(); exec has no implicit shell and each launch is independent. The Worker package and container image must both be @next, with no live secrets in the sandbox.' },
    useWhen: { id: ['Membangun project baru di Sandbox 1.0 preview.', 'Menjalankan command argv, menunggu port/log, atau mengelola process handle.', 'Membutuhkan interpreter, terminal, file, mount, backup, atau tunnel pada line preview.'], en: ['Starting a new project on the Sandbox 1.0 preview.', 'Running argv commands or waiting for ports/logs via process handles.', 'Needing interpreter, terminals, files, mounts, backups, or tunnels on the preview line.'] },
    avoidWhen: { id: ['Dependency atau image masih stable; gunakan sandbox-stable.', 'Memigrasikan stable ke @next tanpa permintaan eksplisit.'], en: ['The dependency or image is stable; use sandbox-stable.', 'Migrating stable to @next without an explicit request.'] },
    howItWorks: { id: ['Pastikan dependency dan image memakai @next.', 'Dapatkan sandbox dengan getSandbox(env.Sandbox, id).', 'Panggil exec dengan argv list dan cwd/env eksplisit.', 'Ambil output atau tunggu readiness; kill process bila perlu.'], en: ['Confirm the dependency and image use @next.', 'Get the sandbox with getSandbox(env.Sandbox, id).', 'Call exec with an argv list and explicit cwd/env.', 'Collect output or await readiness; kill the process when needed.'] },
    coreRules: { id: ['Jangan menganggap exec selesai; handle harus diikuti output() atau waitForExit().', 'Shell syntax harus eksplisit melalui /bin/bash -lc.', 'Jangan campur package dan image stable dengan @next.'], en: ['Do not treat exec as finished; follow the handle with output() or waitForExit().', 'Shell syntax must be explicit via /bin/bash -lc.', 'Never mix stable package/image with @next.'] },
    tips: { id: ['Simpan argv, cwd, env, dan app state untuk pekerjaan yang survive replace.', 'Gunakan type @next terpasang dan preview docs sebelum implementasi.'], en: ['Store argv, cwd, env, and app state for work that must survive replacement.', 'Use installed @next types and preview docs before implementation.'] },
    pairsWellWith: ['agents-sdk', 'sandbox-stable'], spotlight: {
      title: { id: 'Sandbox Preview Dimulai dari Gate Package dan Image', en: 'Sandbox Preview Starts with a Package-and-Image Gate' },
      body: { id: 'Pastikan dependency memakai @cloudflare/sandbox@next dan image memakai lini yang sama seperti cloudflare/sandbox:next; jangan mencampur stable dan preview. Karena ID proses tidak bertahan saat container diganti, simpan argv, cwd, env, dan application state untuk durability—bukan hanya process ID.', en: 'Confirm the dependency uses @cloudflare/sandbox@next and the image uses the same line, such as cloudflare/sandbox:next; never mix stable and preview. Because process IDs do not survive container replacement, persist argv, cwd, env, and application state for durability—not just a process ID.' },
    },
    sourcePath: 'skills/sandbox-next/SKILL.md',
  },
  {
    name: 'sandbox-stable', category: 'compute-state', invocation: 'model',
    description: { id: 'Kelola aplikasi Cloudflare Sandbox existing pada package stable dengan command completion dan session (proyek baru disarankan mulai di @next).', en: 'Maintain existing Cloudflare Sandbox apps on the stable package with command completion and sessions (new projects should start on @next).' },
    detailedDescription: { id: 'Sandbox stable memakai sandbox.exec(command string) yang selesai setelah command berakhir dan mengembalikan stdout, stderr, exitCode, serta success. Pekerjaan panjang memakai startProcess atau execStream, sedangkan sessions mempertahankan cwd dan environment. Jangan menerapkan argv/process.output() preview, dan pastikan package serta image stable cocok.', en: 'Stable Sandbox uses sandbox.exec(command string), which resolves after completion and returns stdout, stderr, exitCode, and success. Long-running work uses startProcess or execStream, while sessions preserve cwd and environment. Do not apply preview argv/process.output() APIs, and keep the package and image on the matching stable line.' },
    useWhen: { id: ['Memelihara app dengan dependency @cloudflare/sandbox default.', 'Menjalankan command string yang harus selesai atau memakai session.', 'Menggunakan process streaming, terminal stable, tunnel, mount, atau cleanup deprecation.'], en: ['Maintaining an app using the default @cloudflare/sandbox dependency.', 'Running completing command strings or preserving state with sessions.', 'Using stable streaming processes, terminals, tunnels, mounts, or deprecation cleanup.'] },
    avoidWhen: { id: ['App memakai @cloudflare/sandbox@next atau image next.', 'Porting ke preview tanpa sandbox-migrate-to-next.'], en: ['The app uses @cloudflare/sandbox@next or a next image.', 'Porting to preview without sandbox-migrate-to-next.'] },
    howItWorks: { id: ['Pastikan dependency dan image berada pada stable line.', 'Gunakan getSandbox() lalu await sandbox.exec(command string).', 'Untuk pekerjaan panjang pilih startProcess/execStream; gunakan session bila state shell harus bertahan.', 'Periksa deprecation guide sebelum memakai transport atau helper lama.'], en: ['Confirm the dependency and image are on the stable line.', 'Use getSandbox() then await sandbox.exec(command string).', 'For long work choose startProcess/execStream; use a session when shell state must persist.', 'Check the deprecation guide before using legacy transports or helpers.'] },
    coreRules: { id: ['Jangan memakai argv dan output() milik @next pada package stable.', 'Jangan mencampur package stable dengan image @next.', 'Simpan live credentials di Worker, bukan environment sandbox.'], en: ['Do not use @next argv and output() APIs on stable.', 'Never mix the stable package with an @next image.', 'Keep live credentials in the Worker, not sandbox environment.'] },
    tips: { id: ['Gunakan session untuk mempertahankan directory dan environment antar-command.', 'Gunakan RPC transport untuk tunnel atau streaming besar.'], en: ['Use a session to preserve directory and environment across commands.', 'Prefer RPC transport for tunnels or large/binary streaming.'] },
    pairsWellWith: ['agents-sdk', 'sandbox-next'], spotlight: {
      title: { id: 'Bedakan Firewall API Preview dari Cleanup Stable', en: 'Separate Preview API Firewalls from Stable Cleanup' },
      body: { id: 'Jika dependency dan image masih stable, jangan menerapkan API preview; gunakan sandbox-next hanya setelah lini @next terkonfirmasi. Untuk aplikasi stable, bersihkan API deprecated melalui jalur deprecation guide tanpa memaksa migrasi ke preview.', en: 'When the dependency and image are stable, do not apply preview APIs; use sandbox-next only after the @next line is confirmed. For stable applications, clean up deprecated APIs through the deprecation-guide path without forcing a preview migration.' },
    },
    sourcePath: 'skills/sandbox-stable/SKILL.md',
  },
{
    name: 'sandbox-migrate-to-next',
    category: 'compute-state',
    invocation: 'model',
    description: {
      id: 'Panduan migrasi Cloudflare Sandbox stabil ke SDK 1.0 preview.',
      en: 'Guide for migrating Cloudflare Sandbox from stable to the SDK 1.0 preview.',
    },
    detailedDescription: {
      id: 'Skill ini memindahkan package ke @cloudflare/sandbox@next dan image ke cloudflare/sandbox:next. Ia mengganti exec berbasis string dengan argv dan process handle, memakai output serta waitForPort, dan memindahkan terminal ke createTerminal/connect. Cutover produksi memakai --containers-rollout=immediate setelah persetujuan user; bridge self-deployed tetap stable.',
      en: 'This skill moves the package to @cloudflare/sandbox@next and the image to cloudflare/sandbox:next. It replaces string-based exec with argv and process handles, using output and waitForPort, and moves terminals to createTerminal/connect. Production cutover uses --containers-rollout=immediate after user approval; a self-deployed bridge stays on stable.',
    },
    useWhen: {
      id: ['Memigrasikan aplikasi Sandbox yang masih memakai SDK stable.', 'Menghapus transport, session, atau API proses lama saat pindah ke @next.', 'Menyiapkan cutover produksi Sandbox 1.0 preview dengan validasi.'],
      en: ['Migrating a Sandbox app that still uses the stable SDK.', 'Removing legacy transport, session, or process APIs while moving to @next.', 'Preparing and validating a Sandbox 1.0 preview production cutover.'],
    },
    avoidWhen: { id: ['Proyek baru yang seharusnya memakai sandbox-next.', 'Pekerjaan harian pada SDK stable atau cutover produksi tanpa persetujuan pengguna.'], en: ['New projects that should use sandbox-next.', 'Day-to-day stable work or production cutover without user approval.'] },
    howItWorks: {
      id: ['Audit API lama dan kumpulkan keputusan cutover, Python image, serta bridge.', 'Samakan package Worker dan image container pada lini @next.', 'Ubah exec menjadi argv/handle, terminal menjadi createTerminal, dan interpreter menjadi sandbox.interpreter.', 'Validasi typecheck, smoke test, API lama, secrets, lalu deploy immediate bila disetujui.'],
      en: ['Audit removed APIs and clarify cutover, Python image, and bridge decisions.', 'Align the Worker package and container image on the same @next line.', 'Change exec to argv/handles, terminals to createTerminal, and interpreter usage to sandbox.interpreter.', 'Validate types, smoke tests, removed APIs, secrets, then deploy immediate if approved.'],
    },
    coreRules: { id: ['Package Worker dan image harus berada pada lini @next yang sama.', 'await sandbox.exec hanya memulai proses; tunggu output atau lifecycle handle.', 'Jangan memakai implicit shell, stdin process, gitCheckout, atau rollout gradual.'], en: ['The Worker package and image must use the same @next line.', 'await sandbox.exec starts a process; wait for output or handle lifecycle explicitly.', 'Do not use an implicit shell, process stdin, gitCheckout, or gradual rollout.'] },
    tips: { id: ['Gunakan image -python hanya bila interpreter Python diperlukan.', 'Gunakan sandbox ID terpisah untuk isolasi pengguna dan hapus session API.'], en: ['Use the -python image only when the Python interpreter is needed.', 'Use separate sandbox IDs for user isolation and remove session APIs.'] },
    pairsWellWith: ['sandbox-next', 'sandbox-stable'],
    spotlight: {
      title: { id: 'Migrasi Sandbox Memerlukan Peta Pengganti dan Gate Validasi', en: 'Sandbox Migration Needs a Replacement Map and Validation Gate' },
      body: { id: 'Ganti exec berbasis string dengan argv, sessions dengan cwd/env per launch, dan terminal lama dengan createTerminal. Setelah upgrade package dan image, validasi dengan grep API yang dihapus, smoke test argv exec + output, lalu uji proses panjang atau terminal bila dipakai.', en: 'Replace string-based exec with argv, sessions with cwd/env per launch, and the old terminal API with createTerminal. After upgrading the package and image, validate with a grep for removed APIs, an argv exec + output smoke test, then exercise long processes or terminals when used.' },
    },
    sourcePath: 'skills/sandbox-migrate-to-next/SKILL.md',
  },
  {
    name: 'cloudflare-one',
    category: 'security-access',
    invocation: 'model',
    description: { id: 'Pola desain dan operasi Cloudflare One Zero Trust yang aman dan berbasis dokumentasi terkini.', en: 'Documentation-first patterns for safe Cloudflare One Zero Trust operations.' },
    detailedDescription: { id: 'Skill ini mencakup Access, Gateway, WARP, Tunnel/Mesh, DLP, CASB, device posture, dan Cloudflare WAN. Ia menekankan reusable policy API /access/policies, verifikasi schema terkini, serta pemisahan Access Groups dari grup IdP/SCIM. Split Tunnel harus selaras dua arah dengan route, sedangkan TLS inspection memerlukan root CA dan pengecualian Do Not Inspect.', en: 'This skill covers Access, Gateway, WARP, Tunnel/Mesh, DLP, CASB, device posture, and Cloudflare WAN. It emphasizes the reusable policy API at /access/policies, current schema verification, and separating Access Groups from IdP/SCIM groups. Split Tunnel entries must align bidirectionally with routes, while TLS inspection requires a root CA and Do Not Inspect exceptions.' },
    useWhen: { id: ['Merancang atau meninjau arsitektur Cloudflare One.', 'Mengonfigurasi Access, Gateway, Tunnel, WARP, TLS, DLP, atau posture.', 'Menelusuri kegagalan akses, routing, DNS, atau policy lewat logs.'], en: ['Designing or reviewing Cloudflare One architecture.', 'Configuring Access, Gateway, Tunnel, WARP, TLS, DLP, or posture.', 'Troubleshooting access, routing, DNS, or policy failures through logs.'] },
    avoidWhen: { id: ['Migrasi dari vendor VPN/SWG/SASE yang membutuhkan mapping sumber lengkap; gunakan skill migrasi.'], en: ['Migrating from a VPN/SWG/SASE vendor where source-to-target mapping is required; use the migration skill.'] },
    howItWorks: { id: ['Klasifikasikan permintaan dan kumpulkan konteks akun, identitas, traffic path, serta blast radius.', 'Ambil dokumentasi/schema terkini dan inspeksi resource yang ada.', 'Susun perubahan dengan prerequisite, validasi, rollback, dan pilot terbatas.', 'Verifikasi policy, route, DNS, logs, TLS/DLP, serta hasil end-to-end sebelum rollout.'], en: ['Classify the request and gather account, identity, traffic-path, and blast-radius context.', 'Retrieve current documentation/schema and inspect existing resources.', 'Propose changes with prerequisites, validation, rollback, and a scoped pilot.', 'Verify policies, routes, DNS, logs, TLS/DLP, and end-to-end results before rollout.'] },
    coreRules: { id: ['Jangan menebak category ID, application ID, field wirefilter, atau request body API.', 'Mulai dari policy disabled atau pilot; jangan mengaktifkan policy produksi luas tanpa persetujuan.', 'Access default-deny dan private hostname membutuhkan route serta resolusi DNS eksplisit.'], en: ['Never guess category IDs, application IDs, wirefilter fields, or API request bodies.', 'Start disabled or with a pilot; never broadly enable production policy without approval.', 'Access is default-deny, and private hostnames require explicit routes and DNS resolution.'] },
    tips: { id: ['Gunakan Gateway activity logs dan Access audit logs sebagai bukti troubleshooting.', 'Untuk device client, bedakan enrollment rules dari device profiles dan ingat first-match precedence.'], en: ['Use Gateway activity logs and Access audit logs as troubleshooting evidence.', 'For the device client, distinguish enrollment rules from device profiles and remember first-match precedence.'] },
    pairsWellWith: ['cloudflare-one-migrations', 'turnstile-spin'],
    spotlight: {
      title: { id: 'Buat Tabel Keputusan Device Sebelum Mengatur Split Tunnel', en: 'Build the Device Decision Table Before Split Tunneling' },
      body: { id: 'Gunakan Include untuk VPN replacement saja atau coexistence, Exclude untuk SWG dan kombinasi VPN + SWG, serta DNS-only untuk filtering DNS tanpa proxy traffic. Buktikan keputusan dengan Gateway logs, Access audit logs, dan DEX—masing-masing menunjukkan policy traffic, autentikasi aplikasi, dan kesehatan konektivitas perangkat.', en: 'Use Include for VPN replacement alone or coexistence, Exclude for SWG and VPN + SWG, and DNS-only for filtering DNS without proxying traffic. Prove the decision with Gateway logs, Access audit logs, and DEX, which respectively show traffic policy, application authentication, and device connectivity health.' },
    },
    sourcePath: 'skills/cloudflare-one/SKILL.md',
  },
  {
    name: 'cloudflare-one-migrations',
    category: 'security-access',
    invocation: 'model',
    description: { id: 'Rencana migrasi VPN, SWG, atau SASE ke Cloudflare One dengan mapping dan rollout terukur.', en: 'Measured migration planning from VPN, SWG, or SASE to Cloudflare One.' },
    detailedDescription: { id: 'Skill ini meminta export terstruktur dan inventory identities, apps, connectors, routes, lists, policy, hit counts, serta logging sebelum mapping. ZPA dipetakan terpisah menjadi Access apps, Tunnel routes, DNS, dan reusable policies; ZIA biasanya menjadi Gateway traffic policies/lists. Setiap rule harus punya target Cloudflare atau baris Not Migrated beserta alasan dan dampak keamanan.', en: 'This skill requires structured exports and an inventory of identities, apps, connectors, routes, lists, policies, hit counts, and logging before mapping. ZPA is split into Access apps, Tunnel routes, DNS, and reusable policies; ZIA usually maps to Gateway traffic policies and lists. Every rule must have a Cloudflare target or a Not Migrated row with its reason and security impact.' },
    useWhen: { id: ['Memigrasikan Zscaler ZIA/ZPA, Palo Alto, VPN, SWG, atau SD-WAN.', 'Membangun mapping object, dependency, parity gap, dan keputusan manual.', 'Menyiapkan pilot, parallel run, validasi, dan rollback migrasi.'], en: ['Migrating Zscaler ZIA/ZPA, Palo Alto, VPN, SWG, or SD-WAN.', 'Building object, dependency, parity-gap, and manual-decision mappings.', 'Preparing migration pilots, parallel runs, validation, and rollback.'] },
    avoidWhen: { id: ['Konfigurasi Cloudflare One baru tanpa source stack atau kebutuhan mapping; gunakan cloudflare-one.'], en: ['A new Cloudflare One configuration without a source stack or mapping need; use cloudflare-one.'] },
    howItWorks: { id: ['Identifikasi source stack dan minta export/log terstruktur.', 'Inventarisasi object, dependency, hit count, identity, route, TLS, DLP, dan exceptions.', 'Petakan target, confidence, prerequisite, partial mapping, serta Not Migrated.', 'Stage dengan prefix, disabled/audit mode, pilot kecil, perbandingan logs, dan rollback eksplisit.'], en: ['Identify the source stack and request structured exports/logs.', 'Inventory objects, dependencies, hit counts, identity, routes, TLS, DLP, and exceptions.', 'Map targets with confidence, prerequisites, partial mappings, and Not Migrated items.', 'Stage with a prefix, disabled/audit mode, a small pilot, log comparison, and explicit rollback.'] },
    coreRules: { id: ['Jangan memaksa mapping 1:1; pertahankan intent, urutan, hit counts, dan tandai partial/unsupported.', 'Buat identity/SCIM, connectors, routes/DNS, lists, bypasses, lalu apps dan policies sesuai dependency.', 'Jangan membuat broad allow-all catchall untuk menutupi gap.'], en: ['Do not force 1:1 mappings; preserve intent, order, and hit counts while flagging partial/unsupported items.', 'Create identity/SCIM, connectors, routes/DNS, lists, and bypasses before apps and policies as dependencies require.', 'Never create a broad allow-all catchall to hide a gap.'] },
    tips: { id: ['Untuk ZPA, satu Tunnel per connector group dan replica cloudflared mengikuti jumlah instance.', 'Validasi group pilot setelah SCIM sync dan re-authentication; hitung object Cloudflare terhadap source.'], en: ['For ZPA, use one Tunnel per connector group and match cloudflared replicas to instance count.', 'Validate pilot groups after SCIM sync and re-authentication; compare Cloudflare object counts with the source.'] },
    pairsWellWith: ['cloudflare-one', 'sandbox-migrate-to-next'],
    spotlight: {
      title: { id: 'Migration Assessment Harus Menghitung Setiap Rule', en: 'A Migration Assessment Must Account for Every Rule' },
      body: { id: 'Deliverable assessment perlu kolom source object, target Cloudflare, confidence, prerequisite, gap, dan keputusan manual; setiap rule harus bermuara pada mapping atau baris Not Migrated. Untuk ZPA, buat satu Cloudflare Tunnel per connector group dan samakan jumlah replica dengan instance connector, karena status operasional bukan alasan mengubah topologi.', en: 'The assessment deliverable needs columns for source object, Cloudflare target, confidence, prerequisite, gap, and manual decision; every rule must end in a mapping or a Not Migrated row. For ZPA, create one Cloudflare Tunnel per connector group and match replica count to connector instances, because operational status is not a reason to change topology.' },
    },
    sourcePath: 'skills/cloudflare-one-migrations/SKILL.md',
  },
{
    name: 'turnstile-spin',
    category: 'security-access',
    invocation: 'model',
    description: {
      id: 'Integrasi verifikasi bot Cloudflare Turnstile end-to-end untuk frontend dan backend yang sudah ada.',
      en: 'End-to-end Cloudflare Turnstile bot-verification integration for an existing frontend and backend.',
    },
    detailedDescription: {
      id: 'Skill ini memasang widget Turnstile dan memvalidasi token di backend melalui https://challenges.cloudflare.com/turnstile/v0/siteverify. Handler wajib memeriksa success, action, dan hostname, sementara token cf-turnstile-response bersifat sekali pakai. Alur juga mencakup auth-probe.sh, validasi secret melalui stdin, serta larangan menaruh secret di chat, argumen, log, atau file sementara.',
      en: 'This skill embeds Turnstile and validates tokens server-side through https://challenges.cloudflare.com/turnstile/v0/siteverify. Handlers must check success, action, and hostname, while each cf-turnstile-response token is single-use. The flow includes auth-probe.sh, stdin-only secret validation, and strict prohibitions on exposing secrets in chat, arguments, logs, or temporary files.',
    },
    useWhen: {
      id: ['Memasang Turnstile pada signup, login, contact form, atau endpoint yang dipicu pengguna.', 'Memigrasikan reCAPTCHA atau hCaptcha ke Cloudflare Turnstile.', 'Memperbaiki integrasi yang memerlukan siteverify di backend.'],
      en: ['Adding Turnstile to a signup, login, contact form, or user-triggered endpoint.', 'Migrating reCAPTCHA or hCaptcha to Cloudflare Turnstile.', 'Repairing an integration that requires backend siteverify.'],
    },
    avoidWhen: {
      id: ['Tugas Cloudflare yang tidak berkaitan dengan Turnstile.', 'Tidak ada backend handler yang dapat menjalankan siteverify.'],
      en: ['Cloudflare tasks unrelated to Turnstile.', 'There is no backend handler where siteverify can run.'],
    },
    howItWorks: {
      id: ['Periksa autentikasi dan pindai frontend, backend, serta CAPTCHA yang sudah ada.', 'Sematkan script dan widget dengan action pada permukaan yang disetujui.', 'Panggil siteverify dari handler yang ada, fail closed, dan pertahankan logika handler.', 'Validasi domain/widget serta uji token baru dan penolakan replay.'],
      en: ['Check authentication and scan the existing frontend, backend, and CAPTCHA.', 'Embed the script and an action-tagged widget on approved surfaces.', 'Call siteverify from the existing handler, fail closed, and preserve its logic.', 'Validate the widget domains and test a fresh token plus replay rejection.'],
    },
    coreRules: {
      id: ['Siteverify selalu berjalan di backend, bukan browser.', 'Terima hanya success === true dengan action dan hostname yang diizinkan.', 'Jangan meminta atau mengekspos secret; gunakan secret store dan stdin.'],
      en: ['Siteverify always runs in the backend, never in the browser.', 'Accept only success === true with the expected action and allowed hostname.', 'Never request or expose the secret; use a secret store and stdin.'],
    },
    tips: {
      id: ['Reset widget yang tetap berada di halaman setelah percobaan submit.', 'Untuk production, jangan masukkan localhost atau 127.0.0.1 ke allowlist hostname backend.'],
      en: ['Reset a widget that remains on the page after a submission attempt.', 'For production, never include localhost or 127.0.0.1 in the backend hostname allowlist.'],
    },
    pairsWellWith: ['cloudflare-one', 'workers-best-practices'],
    spotlight: {
      title: { id: 'Turnstile Wizard Menjaga Probe, Konfirmasi, Diff, dan Replay', en: 'The Turnstile Wizard Guards Probe, Confirmation, Diff, and Replay' },
      body: { id: 'Jalankan alur probe → confirm → diff → validasi fresh token + replay agar integrasi tidak berhenti pada widget yang tampak terpasang. Jika widget dan sitekey sudah ada, jangan recreate; gunakan existing-widget flow dan pertahankan sitekey yang diberikan.', en: 'Follow probe → confirm → diff → fresh-token validation + replay so the integration does not stop at an apparently installed widget. If a widget and sitekey already exist, do not recreate them; use the existing-widget flow and preserve the supplied sitekey.' },
    },
    sourcePath: 'skills/turnstile-spin/SKILL.md',
  },
  {
    name: 'cloudflare-email-service',
    category: 'messaging',
    invocation: 'model',
    description: {
      id: 'Panduan implementasi dan troubleshooting Cloudflare Email Sending serta Email Routing.',
      en: 'Implementation and troubleshooting guidance for Cloudflare Email Sending and Email Routing.',
    },
    detailedDescription: {
      id: 'Skill ini memilih Workers binding send_email untuk Worker dan REST API Bearer token untuk aplikasi eksternal, serta memakai email() untuk email masuk. Sebelum coding, periksa domain dengan npx wrangler email sending list, binding send_email di wrangler.jsonc, dan postal-mime bila parsing diperlukan. Aturan khasnya mencakup buffering message.raw sekali saja, menyediakan html dan text, memakai address/reply_to pada REST API, dan hanya mengirim email transaksional.',
      en: 'This skill selects the send_email Workers binding for Workers, a Bearer-token REST API for external apps, and email() for inbound mail. Before coding, check the domain with npx wrangler email sending list, the send_email binding in wrangler.jsonc, and postal-mime when parsing is needed. Distinct rules include buffering message.raw once, providing both html and text, using address/reply_to in the REST API, and limiting the service to transactional email.',
    },
    useWhen: {
      id: ['Mengirim email transaksional dari Cloudflare Worker atau Agents SDK.', 'Mengirim email dari aplikasi eksternal melalui REST API.', 'Menerima, mem-parsing, meneruskan, atau membalas email dengan Email Routing.'],
      en: ['Sending transactional email from a Cloudflare Worker or Agents SDK.', 'Sending email from an external application through the REST API.', 'Receiving, parsing, forwarding, or replying to email with Email Routing.'],
    },
    avoidWhen: {
      id: ['Mengirim newsletter atau kampanye marketing/bulk.', 'Domain pengirim belum di-onboard atau tujuan forwarding belum terverifikasi.'],
      en: ['Sending newsletters or marketing/bulk campaigns.', 'The sender domain is not onboarded or a forwarding destination is unverified.'],
    },
    howItWorks: {
      id: ['Verifikasi domain, binding, dan dependency sesuai skenario.', 'Pilih Workers binding, Agents SDK, REST API, atau routing handler yang tepat.', 'Ikuti schema, recipient, attachment, header, dan error handling dari referensi resmi.', 'Uji dengan alamat nyata yang dikendalikan dan periksa deliverability/authentication.'],
      en: ['Verify the domain, binding, and dependency for the scenario.', 'Choose the appropriate Workers binding, Agents SDK, REST API, or routing handler.', 'Follow the official references for schemas, recipients, attachments, headers, and errors.', 'Test with real addresses you control and check deliverability/authentication.'],
    },
    coreRules: {
      id: ['Domain pengirim harus sudah onboarded dan from memakai domain tersebut.', 'Gunakan html dan text, buffer message.raw sebelum membaca atau memprosesnya lagi.', 'Simpan token di environment/secrets, bukan source code.'],
      en: ['The sender domain must be onboarded and from must use that domain.', 'Provide html and text, and buffer message.raw before any further processing.', 'Keep tokens in environment variables or secrets, never source code.'],
    },
    tips: {
      id: ['REST memakai from.address dan reply_to; Workers memakai from.email dan replyTo.', 'Verifikasi SPF/DKIM/DMARC dan gunakan suppression/bounce guidance untuk deliverability.'],
      en: ['REST uses from.address and reply_to; Workers uses from.email and replyTo.', 'Verify SPF/DKIM/DMARC and follow suppression/bounce guidance for deliverability.'],
    },
    pairsWellWith: ['workers-best-practices', 'agents-sdk'],
    spotlight: {
      title: { id: 'Pilih Jalur Email dari Skenario dan Tutup Checklist Deliverability', en: 'Choose the Email Path by Scenario and Close the Deliverability Checklist' },
      body: { id: 'Gunakan binding Worker untuk pengiriman, onEmail() + replyToEmail() untuk Agent, REST API untuk aplikasi eksternal, dan email() untuk inbound routing. Sebelum produksi, cek domain serta binding, lalu pastikan SPF, DKIM, DMARC, dan suppression ditangani agar pengiriman transaksional tidak merusak reputasi.', en: 'Use the Worker binding for sending, onEmail() + replyToEmail() for an Agent, the REST API for external applications, and email() for inbound routing. Before production, check the domain and binding, then address SPF, DKIM, DMARC, and suppression so transactional delivery does not damage sender reputation.' },
    },
    sourcePath: 'skills/cloudflare-email-service/SKILL.md',
  },
  {
    name: 'nextjs-on-cloudflare',
    category: 'workers-platform',
    invocation: 'model',
    description: {
      id: 'Membangun, memigrasikan, dan men-deploy aplikasi Next.js di Cloudflare Workers dengan vinext.',
      en: 'Build, migrate, and deploy Next.js apps on Cloudflare Workers with vinext.',
    },
    detailedDescription: {
      id: 'Skill ini menetapkan vinext (bukan OpenNext) sebagai default untuk proyek Next.js baru di Cloudflare Workers, sesuai panduan Next.js Cloudflare. vinext mengimplementasikan ulang API Next.js di atas Vite: App Router, Pages Router, React Server Components, import next/* yang didukung, HMR Vite, dan eksekusi lokal di workerd dengan akses binding Cloudflare. Untuk setup, migrasi, atau deployment, skill ini meminta memasang skill upstream vinext (npx skills add cloudflare/vinext) bila belum ada, lalu mengikuti SKILL.md yang relevan.',
      en: 'This skill makes vinext (not OpenNext) the default for new Next.js projects on Cloudflare Workers, matching the Cloudflare Next.js guide. vinext reimplements the Next.js API surface on Vite: App Router, Pages Router, React Server Components, supported next/* imports, Vite HMR, and local execution in workerd with access to Cloudflare bindings. For setup, migration, or deployment it asks you to install vinext\'s upstream skills (npx skills add cloudflare/vinext) if missing, then follow the applicable SKILL.md.',
    },
    useWhen: {
      id: ['Memulai proyek Next.js baru di Cloudflare.', 'Memindahkan aplikasi Next.js yang ada ke Workers.', 'Memilih antara vinext dan OpenNext, atau menyiapkan vinext untuk Workers.'],
      en: ['Starting a new Next.js project on Cloudflare.', 'Moving an existing Next.js app to Workers.', 'Choosing between vinext and OpenNext, or setting up vinext for Workers.'],
    },
    avoidWhen: {
      id: ['Pemeliharaan yang tidak terkait pada setup OpenNext yang sudah ada: pertahankan setup tersebut.', 'Pengguna secara eksplisit memilih pendekatan lain.'],
      en: ['Unrelated maintenance on an existing OpenNext setup: preserve it.', 'The user explicitly chose a different approach.'],
    },
    howItWorks: {
      id: ['Periksa apakah skill upstream vinext sudah tersedia; jika belum, pasang dengan npx skills add cloudflare/vinext.', 'Proyek baru: ikuti setup new-project vinext dengan create-vinext-app target Cloudflare.', 'Proyek Next.js yang ada: ikuti skill upstream migrate-to-vinext, termasuk compatibility check, dengan Cloudflare sebagai target deployment.', 'Untuk pengembangan dan deployment, ikuti dokumentasi integrasi Workers vinext terbaru.'],
      en: ['Check whether vinext\'s upstream skills are available; if not, install them with npx skills add cloudflare/vinext.', 'New project: follow vinext\'s new-project setup with create-vinext-app targeting Cloudflare.', 'Existing Next.js project: follow the upstream migrate-to-vinext skill, including its compatibility check, with Cloudflare as the deployment target.', 'For development and deployment, follow the current vinext Workers integration docs.'],
    },
    coreRules: {
      id: ['Gunakan vinext, bukan OpenNext, untuk proyek Next.js baru di Workers.', 'Pertahankan setup OpenNext yang sudah ada saat pemeliharaan yang tidak terkait, dan hormati pilihan eksplisit pengguna.', 'Jangan menerapkan skill migrasi upstream pada direktori kosong; skill itu butuh proyek Next.js yang sudah ada.'],
      en: ['Use vinext rather than OpenNext for new Next.js projects on Workers.', 'Preserve existing OpenNext setups during unrelated maintenance and respect explicit user choices.', 'Do not apply the upstream migration skill to an empty directory; it requires an existing Next.js project.'],
    },
    tips: {
      id: ['Cek kompatibilitas fitur yang dibutuhkan aplikasi; jangan berasumsi paritas penuh dengan Next.js.', 'Jika instalasi skill tidak memungkinkan, baca langsung SKILL.md upstream dan referensinya.'],
      en: ['Check compatibility for the features the application needs; do not assume complete Next.js parity.', 'If installing the skills is unavailable, read the upstream SKILL.md and its references directly.'],
    },
    pairsWellWith: ['cloudflare', 'wrangler', 'workers-best-practices'],
    spotlight: {
      title: { id: 'Skill Ini Mendelegasikan ke Skill Upstream vinext', en: 'This Skill Delegates to vinext\'s Own Skills' },
      body: { id: 'nextjs-on-cloudflare sengaja tipis: ia memilih jalur (vinext untuk proyek baru, migrate-to-vinext untuk proyek yang ada) lalu menyerahkan langkah detail ke skill di repo cloudflare/vinext. Pastikan skill upstream itu terpasang sebelum setup, migrasi, atau deployment.', en: 'nextjs-on-cloudflare is intentionally thin: it picks the path (vinext for new projects, migrate-to-vinext for existing ones) and hands the detailed steps to the skills in the cloudflare/vinext repo. Make sure those upstream skills are installed before setup, migration, or deployment.' },
    },
    sourcePath: 'skills/nextjs-on-cloudflare/SKILL.md',
  },
  {
    name: 'basin',
    category: 'data-streaming',
    invocation: 'model',
    description: {
      id: 'Membangun dan men-troubleshoot alur analitik Cloudflare Basin: Basin Pipelines, Basin Catalog, dan Basin SQL.',
      en: 'Build and troubleshoot Cloudflare Basin analytics workflows with Basin Pipelines, Basin Catalog, and Basin SQL.',
    },
    detailedDescription: {
      id: 'Basin menyerap dan mentransformasi event, mengelola tabel Apache Iceberg di R2, dan mengkuerinya dengan SQL terdistribusi. Cloudflare Data Platform kini bernama Basin; Pipelines, R2 Data Catalog, dan R2 SQL menjadi Basin Pipelines, Basin Catalog, dan Basin SQL. Resource dan konfigurasi lama tetap berjalan, begitu juga perintah wrangler pipelines, wrangler r2 bucket catalog, dan wrangler r2 sql. Alur umumnya: Basin Pipelines, lalu tabel Basin Catalog di R2, lalu Basin SQL atau engine eksternal yang kompatibel. Skill ini juga dipakai untuk permintaan yang masih memakai nama lama (Data Platform, Pipelines, R2 Data Catalog, R2 SQL).',
      en: 'Basin ingests and transforms events, manages Apache Iceberg tables in R2, and queries them with distributed SQL. Cloudflare Data Platform is now Basin; Pipelines, R2 Data Catalog, and R2 SQL are now Basin Pipelines, Basin Catalog, and Basin SQL. Existing resources and configurations keep working, as do wrangler pipelines, wrangler r2 bucket catalog, and wrangler r2 sql. The typical flow is Basin Pipelines, then Basin Catalog tables in R2, then Basin SQL or a compatible external engine. The skill is also used for requests that still use the former names (Data Platform, Pipelines, R2 Data Catalog, R2 SQL).',
    },
    useWhen: {
      id: ['Mengalirkan data streaming ke tabel Iceberg di R2.', 'Mengelola katalog Iceberg, pemeliharaan tabel, atau akses engine.', 'Mengkueri tabel Iceberg dengan SQL analitik, atau permintaan yang memakai nama lama Pipelines / R2 Data Catalog / R2 SQL.'],
      en: ['Streaming data into Iceberg tables in R2.', 'Managing Iceberg catalogs, table maintenance, or engine access.', 'Querying Iceberg tables with analytical SQL, or requests that use the old Pipelines / R2 Data Catalog / R2 SQL names.'],
    },
    avoidWhen: {
      id: ['Kebutuhan hanya log durable dengan consumer independen tanpa tabel analitik (lihat k2).', 'Pemrosesan job asinkron biasa (pertimbangkan Queues).'],
      en: ['You only need a durable log with independent consumers and no analytical tables (see k2).', 'Ordinary asynchronous job processing (consider Queues).'],
    },
    howItWorks: {
      id: ['Pilih workflow: Pipelines untuk menerima event dan mengirim ke R2, Catalog untuk metadata dan maintenance Iceberg, SQL untuk kueri analitik.', 'Ambil dokumentasi terbaru, terutama untuk limit, harga, permission, dan sintaks CLI, sebelum mengimplementasikan perubahan.', 'Mulai dari panduan getting started Basin untuk setup end-to-end.', 'Cek versi Wrangler terpasang dan halaman referensi terbaru sebelum menjalankan perintah, karena migrasi nama masih berjalan.'],
      en: ['Pick the workflow: Pipelines to receive events and deliver to R2, Catalog for Iceberg metadata and maintenance, SQL for analytical queries.', 'Retrieve current docs, especially for limits, pricing, permissions, and CLI syntax, before implementing changes.', 'Start from the Basin getting started guide for an end-to-end setup.', 'Check the installed Wrangler version and current reference pages before running commands, because the rename migration is ongoing.'],
    },
    coreRules: {
      id: ['Gunakan nama dan URL dokumentasi Basin yang baru pada panduan baru; pengenal API dan nama metrik lama mungkin masih memakai istilah lama.', 'Ambil dokumentasi terkini sebelum menyebut limit, harga, permission, atau sintaks CLI.', 'Famili perintah Wrangler Basin masih diusulkan (wrangler basin pipelines/catalog/sql); verifikasi terhadap versi Wrangler terpasang.'],
      en: ['Use the new Basin names and documentation URLs in new guidance; legacy API identifiers and metric names may still use the old terms.', 'Retrieve current docs before stating limits, pricing, permissions, or CLI syntax.', 'The Basin Wrangler command families are still proposed (wrangler basin pipelines/catalog/sql); verify against the installed Wrangler version.'],
    },
    tips: {
      id: ['Basin SQL memakai WRANGLER_BASIN_SQL_AUTH_TOKEN, dan jalur REST kuerinya adalah /basin-sql/query/{BUCKET}.', 'Sumber menyebut halaman dokumentasi baru masih dalam PR yang terbuka; bila URL belum terbit, pakai halaman yang diusulkan di PR tersebut.'],
      en: ['Basin SQL uses WRANGLER_BASIN_SQL_AUTH_TOKEN, and its REST query path is /basin-sql/query/{BUCKET}.', 'The source notes the new documentation pages are still in an open PR; if the URLs are not yet published, use the pages proposed in that PR.'],
    },
    pairsWellWith: ['k2', 'cloudflare', 'wrangler'],
    spotlight: {
      title: { id: 'Rebrand Data Platform menjadi Basin', en: 'Data Platform Is Now Basin' },
      body: { id: 'Pipelines menjadi Basin Pipelines, R2 Data Catalog menjadi Basin Catalog, dan R2 SQL menjadi Basin SQL. Karena migrasi masih berjalan, skill ini meminta Anda memverifikasi perintah dan dokumentasi terhadap versi Wrangler dan halaman referensi saat ini.', en: 'Pipelines becomes Basin Pipelines, R2 Data Catalog becomes Basin Catalog, and R2 SQL becomes Basin SQL. Because the migration is ongoing, the skill asks you to verify commands and documentation against the current Wrangler version and reference pages.' },
    },
    sourcePath: 'skills/basin/SKILL.md',
  },
  {
    name: 'k2',
    category: 'data-streaming',
    invocation: 'model',
    description: {
      id: 'Membangun dan men-troubleshoot log durable Cloudflare K2 / K2 Streams: setup stream, produce, retention, dan consume.',
      en: 'Build and troubleshoot Cloudflare K2 or K2 Streams durable logs: stream setup, producing, retention, and consuming.',
    },
    detailedDescription: {
      id: 'K2 adalah log durable untuk memisahkan producer dan consumer event. Skill ini memakai dokumentasi sebagai sumber kebenaran: untuk setup stream, produce dari Workers atau HTTP, konfigurasi retention dan input, serta consume lewat subscription, ambil halaman dokumentasi yang sesuai (Get started, Concepts, Configuration, Produce, Consume, Limits) sebelum memberi instruksi, kode, limit, availability, permission, atau detail API. Untuk transformasi SQL dan pengiriman ke tabel Iceberg R2 pakai skill basin; untuk pemrosesan task, pertimbangkan Queues.',
      en: 'K2 is a durable log for decoupling event producers and consumers. The skill treats the docs as the source of truth: for stream setup, producing from Workers or HTTP, configuring retention and inputs, and consuming through subscriptions, retrieve the matching docs page (Get started, Concepts, Configuration, Produce, Consume, Limits) before giving instructions, code, limits, availability, permissions, or API details. For SQL transformation and delivery to R2 Iceberg tables use the basin skill; for task processing, consider Queues.',
    },
    useWhen: {
      id: ['Membuat stream K2 dan mencobanya.', 'Memproduksi record dari Workers atau HTTP.', 'Mengonfigurasi retention, input, autentikasi, atau CORS, dan mengonsumsi lewat subscription.'],
      en: ['Creating a K2 stream and trying it.', 'Producing records from Workers or HTTP.', 'Configuring retention, inputs, authentication, or CORS, and consuming through subscriptions.'],
    },
    avoidWhen: {
      id: ['Transformasi SQL dan pengiriman ke tabel Iceberg di R2 (gunakan basin).', 'Pemrosesan task biasa (pertimbangkan Queues).'],
      en: ['SQL transformation and delivery to R2 Iceberg tables (use basin).', 'Ordinary task processing (consider Queues).'],
    },
    howItWorks: {
      id: ['Mulai dari ikhtisar K2 lalu ambil halaman dokumentasi yang cocok dengan tugas.', 'Buat stream dan konfigurasikan input, autentikasi, CORS, serta retention.', 'Produce record dari HTTP atau binding Worker, perhatikan encoding, error, dan retry.', 'Consume lewat subscription dengan memperhatikan lease, acknowledgement, dan retry.'],
      en: ['Start from the K2 overview, then retrieve the docs page that matches the task.', 'Create a stream and configure inputs, authentication, CORS, and retention.', 'Produce records over HTTP or a Worker binding, watching encoding, errors, and retries.', 'Consume through subscriptions, minding leases, acknowledgements, and retries.'],
    },
    coreRules: {
      id: ['Dokumentasi adalah sumber kebenaran di atas skill ini; ambil halaman yang cocok untuk setiap tugas dan pakai contoh terkininya.', 'Untuk pertanyaan kapasitas atau biaya, cek limit dan harga yang dipublikasikan sebelum menyebut angka.', 'Nyatakan bila detail harga atau availability yang diminta belum dipublikasikan.'],
      en: ['The docs are the source of truth over this skill; retrieve the matching page for each task and use its current examples.', 'For capacity or cost questions, check current limits and any published pricing before quoting values.', 'State when a requested pricing or availability detail is not yet published.'],
    },
    tips: {
      id: ['Sumber menyebut halaman dokumentasi K2 masih dalam PR cloudflare-docs yang terbuka; bila URL publik belum terbit, pakai halaman yang diusulkan di PR tersebut.'],
      en: ['The source notes the K2 docs are still in an open cloudflare-docs PR; if the public URLs are not yet published, use the pages proposed in that PR.'],
    },
    pairsWellWith: ['basin', 'workers-best-practices'],
    spotlight: {
      title: { id: 'Produce dan Consume Terpisah', en: 'Producers and Consumers Are Decoupled' },
      body: { id: 'K2 memisahkan produser dan konsumer lewat log durable: produce dari HTTP atau Worker, konsumsi lewat subscription dengan lease dan acknowledgement. Karena detail API dan limit bisa berubah, selalu ambil halaman Produce, Consume, dan Limits yang terbaru.', en: 'K2 decouples producers and consumers through a durable log: produce over HTTP or from a Worker, consume through subscriptions with leases and acknowledgements. Because API details and limits can change, always retrieve the latest Produce, Consume, and Limits pages.' },
    },
    sourcePath: 'skills/k2/SKILL.md',
  },
  {
    name: 'security-audit',
    category: 'security-access',
    invocation: 'model',
    description: {
      id: 'Panduan keamanan dan review kerentanan berbasis sumber untuk codebase, API, service, CLI, library, dan daemon; audit penuh enam fase hanya dijalankan atas permintaan eksplisit.',
      en: 'Security guidance and source-first vulnerability review for codebases, APIs, services, CLI tools, libraries, and daemons; the full six-phase audit runs only on explicit request.',
    },
    detailedDescription: {
      id: 'Skill defensif dan source-first ini mencari kerentanan yang benar-benar melanggar trust boundary, lalu memberi pemilik kode bukti sumber, reproduksi yang aman, prioritas, dan perbaikan terkecil yang efektif. Kandidat tanpa principal, resource, atau hasil keamanan yang konkret bukan temuan terkonfirmasi.\n\nAda dua mode: guidance mode (default) untuk pertanyaan keamanan, review terfokus, dan triase; serta full audit mode untuk permintaan audit atau pen-test eksplisit, review menyeluruh end-to-end, atau permintaan artefak laporan. Memuat skill ini tidak pernah mengotorisasi workflow penuh atau pembuatan file.\n\nSkill ini ada di repo terpisah (cloudflare/security-audit-skill, MIT), bukan di cloudflare/skills, dan merupakan titik awal single-repo dari harness penemuan kerentanan yang dijelaskan Cloudflare di tulisan "Build your own vulnerability harness".',
      en: 'This defensive, source-first skill looks for vulnerabilities that violate a real trust boundary, then gives code owners the source evidence, a safe reproduction, a priority, and the smallest effective fix. A candidate without a concrete affected principal, resource, or security outcome is not a confirmed finding.\n\nIt has two modes: guidance mode (the default) for security questions, focused reviews, and triage; and full audit mode for an explicit audit or pen-test request, a comprehensive end-to-end review, or requested report artifacts. Loading the skill never authorizes the full workflow or file creation.\n\nIt lives in a separate repository (cloudflare/security-audit-skill, MIT), not in cloudflare/skills, and is the single-repo starting point of the vulnerability-discovery harness Cloudflare describes in "Build your own vulnerability harness".',
    },
    useWhen: {
      id: [
        'Menjawab pertanyaan keamanan, melakukan review keamanan terfokus, atau melakukan triase satu temuan tertentu.',
        'Menjalankan audit keamanan atau pen-test codebase penuh, review menyeluruh end-to-end, atau menghasilkan artefak laporan.',
        'Vulnerability research yang butuh bukti sumber dan reproduksi lokal yang aman dan terbatas.',
      ],
      en: [
        'Answering security questions, doing a focused security review, or triaging a specific finding.',
        'Running a full security audit or pen test of a codebase, a comprehensive end-to-end review, or producing report artifacts.',
        'Vulnerability research that needs source evidence and a safe, bounded local reproduction.',
      ],
    },
    avoidWhen: {
      id: [
        'Permintaan tanpa konteks keamanan sama sekali.',
        'Memprobe endpoint yang sudah di-deploy, infrastruktur bersama, identitas produksi, atau control plane live: skill ini source-first dan hanya lokal.',
        'Pekerjaan ofensif yang butuh persistence atau concealment: skill berhenti di efek lokal minimum yang membuktikan sebuah cacat.',
      ],
      en: [
        'Requests with no security context at all.',
        'Probing deployed endpoints, shared infrastructure, production identities, or live control planes: the skill is source-first and local-only.',
        'Offensive work that needs persistence or concealment: the skill stops at the minimum local effect that proves a defect.',
      ],
    },
    howItWorks: {
      id: [
        'Tentukan mode: guidance untuk pertanyaan dan review terfokus, audit penuh hanya atas permintaan audit atau pen-test eksplisit. Bila ambigu, ajukan satu pertanyaan fokus sebelum membuat file.',
        'Reconnaissance: petakan arsitektur, trust boundary, permukaan input, run sebelumnya, dan coverage ledger yang deterministik (architecture.md, coverage-ledger.json).',
        'Hunting berbasis coverage: hunter terisolasi mengambil unit dari ledger dan mengembalikan kandidat terstruktur; coverage critic mencari celah per gelombang.',
        'Validasi kandidat: setiap kandidat unik diberikan ke verifier baru yang mencoba membantahnya.',
        'Output terstruktur: record confirmed, needs_validation, dan rejected ditulis ke findings.json dan divalidasi dengan report-schema.json (validate-findings.cjs dan validate-coverage-ledger.cjs).',
        'Verifikasi record independen oleh agent baru, lalu laporan netral-target: REPORT.md, FINDINGS-DETAIL.md, dan NEEDS-VALIDATION.md.',
      ],
      en: [
        'Decide the mode: guidance for questions and focused reviews, full audit only for an explicit audit or pen-test request. If it could mean either, ask one focused question before creating files.',
        'Reconnaissance: map architecture, trust boundaries, input surfaces, prior runs, and a deterministic coverage ledger (architecture.md, coverage-ledger.json).',
        'Coverage-led hunting: isolated hunters take ledger units and return structured candidates; coverage critics look for gaps wave by wave.',
        'Candidate validation: every unique candidate goes to a fresh verifier that tries to disprove it.',
        'Structured output: confirmed, needs_validation, and rejected records go to findings.json and are validated against report-schema.json (validate-findings.cjs and validate-coverage-ledger.cjs).',
        'Independent record verification by fresh agents, then a target-neutral report: REPORT.md, FINDINGS-DETAIL.md, and NEEDS-VALIDATION.md.',
      ],
    },
    coreRules: {
      id: [
        'Setiap kandidat wajib menyebut principal ber-trust lebih rendah, input atau aksi yang diterima, kontrol yang dimaksud, boundary yang dilintasi, dan hasil konkret yang teramati; best practice yang kurang, crash parser generik, atau self-impact bukan temuan.',
        'Inspeksi sumber bersifat read-only. Kode yang dikontrol target hanya dijalankan di sandbox yang ditegakkan OS (tanpa jaringan eksternal, environment allowlist, target read-only, batas resource rendah); bila ada kontrol yang tidak terpenuhi, laporkan needs_validation, jangan dieksekusi.',
        'Hanya record confirmed yang diberi severity; needs_validation menyebut fakta tepat yang belum diketahui dan tidak punya severity.',
        'Pakai principal, fixture, dan secret dummy; jangan memprobe endpoint yang sudah di-deploy atau infrastruktur bersama.',
        'Hanya parent yang menulis file run bersama; tiap agent bekerja di direktori scratch sendiri, dan audit hanya menjelaskan perbaikan, tidak pernah memodifikasi source target.',
      ],
      en: [
        'Every candidate must name the lower-trust principal, the accepted input or action, the intended control, the crossed boundary, and a concrete observed result; a missing best practice, a generic parser crash, or self-impact is not a finding.',
        'Source inspection is read-only. Target-controlled code runs only in an OS-enforced sandbox (no external network, an allowlisted environment, a read-only target, low resource limits); if any control is missing, report needs_validation instead of executing.',
        'Only confirmed records get a severity; needs_validation names the exact missing fact and has none.',
        'Use dummy principals, fixtures, and secrets; never probe deployed endpoints or shared infrastructure.',
        'Only the parent writes the shared run files; each agent works in its own scratch directory, and the audit describes fixes but never modifies the target source.',
      ],
    },
    tips: {
      id: [
        'Pilih profile: quick untuk pass singkat berbatas, standard (default), deep untuk target besar atau berisiko tinggi; run yang scoped atau quick selalu menyatakan dirinya cakupan parsial.',
        'Untuk target besar, set budget (jumlah maksimum pemanggilan agent): workflow mencadangkan panggilan critic dan validasi sebelum hunting, dan menandai run incomplete alih-alih melampaui budget.',
        'Run berulang bersifat aditif: ledger dan findings sebelumnya mengarahkan run berikutnya ke celah dan source yang berubah. Di pengujian upstream, satu run menemukan sekitar separuh dari total temuan run berulang.',
        'Butuh Node.js untuk validator tanpa dependency; tambahkan companion domain (web/auth, cloud, AI/LLM, supply chain, dan lainnya) yang sesuai dengan target.',
      ],
      en: [
        'Pick a profile: quick for a bounded first look, standard (the default), deep for large or high-stakes targets; a scoped or quick run always presents itself as partial coverage.',
        'For large targets, set a budget (a maximum number of agent invocations): the workflow reserves critic and validation calls before hunting and marks the run incomplete rather than overspending.',
        'Repeated runs are additive: prior ledgers and findings steer later runs to gaps and changed source. In the upstream tests, a single run found roughly half of what repeated runs found in total.',
        'It needs Node.js for the zero-dependency validators; add the domain companions (web/auth, cloud, AI/LLM, supply chain, and more) that match the target.',
      ],
    },
    pairsWellWith: ['workers-best-practices', 'cloudflare-one'],
    spotlight: {
      title: { id: 'Tanpa Trust Boundary, Bukan Temuan', en: 'No Trust Boundary, No Finding' },
      body: {
        id: 'Disiplin inti skill ini: kandidat kerentanan harus menyebut principal ber-trust rendah, kontrol yang dilintasi, dan hasil keamanan yang teramati, bukan sekadar praktik yang kurang.\n\nSeverity dikalibrasi dengan jangkar: critical bila aktor tanpa autentikasi mendapat code execution, akses penuh data store, atau pengambilalihan akun sembarang; high bila sebuah kontrol keamanan eksplisit dikalahkan sepenuhnya dengan konsekuensi nyata; medium bila pelanggaran boundary nyata tetapi terbatas. Bila dampak konkretnya tidak bisa disebut, severity lebih rendah dari yang terasa.\n\nMode penuh menambah infrastruktur anti-hand-waving: coverage ledger, verifikasi independen per temuan, dan budget gate agar audit tidak diam-diam menipiskan buktinya.',
        en: 'The core discipline: a vulnerability candidate must name the lower-trust principal, the control crossed, and the observed security outcome, not merely a missing practice.\n\nSeverity is calibrated with anchors: critical when an unauthenticated actor gains code execution, full data-store access, or takeover of arbitrary accounts; high when an explicit security control is fully defeated with real consequences; medium for a real but limited boundary violation. If you cannot state the concrete damage, the severity is lower than it feels.\n\nFull mode adds anti-hand-waving infrastructure: a coverage ledger, independent per-finding verification, and a budget gate so an audit never quietly thins its evidence.',
      },
    },
    sourcePath: 'skills/security-audit/SKILL.md',
    upstream: {
      repo: CLOUDFLARE_SECURITY_AUDIT_REPO,
      sha: CLOUDFLARE_SECURITY_AUDIT_SHA,
      license: CLOUDFLARE_SECURITY_AUDIT_LICENSE,
    },
  },
]
export const CLOUDFLARE_SKILL_COUNT = 17
