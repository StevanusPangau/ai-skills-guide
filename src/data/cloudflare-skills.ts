import type { RichSkill } from '@/data/vercel-skills'

// Koleksi: Cloudflare — github.com/cloudflare/skills (+ github.com/cloudflare/security-audit-skill).
// Lisensi upstream: Apache-2.0 (cloudflare/skills) dan MIT (security-audit-skill). Guide ini hanya
// mendokumentasikan ringkasan; install langsung dari repo upstream.
//
// Sumber: https://github.com/cloudflare/skills dan https://github.com/cloudflare/security-audit-skill.
export const CLOUDFLARE_SOURCE_REPO = 'github.com/cloudflare/skills'
export const CLOUDFLARE_SOURCE_SHA = 'b052c32bab7dd493513260228a36c88294f343f1'
export const CLOUDFLARE_SOURCE_LICENSE = 'Apache-2.0'
export const CLOUDFLARE_SECURITY_AUDIT_REPO = 'github.com/cloudflare/security-audit-skill'
export const CLOUDFLARE_SECURITY_AUDIT_SHA = 'c1c8a8c1471069fb0e188eeaff69b8e8db6564a8'
export const CLOUDFLARE_SECURITY_AUDIT_LICENSE = 'MIT'

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
      id: 'Skill ini memprioritaskan API, tipe, dan konfigurasi yang sesuai versi proyek serta mendorong retrieval dokumentasi Cloudflare. Aktifkan Workers Logs dan Traces dengan observability.enabled serta observability.traces.enabled. Gunakan wrangler types untuk menghasilkan tipe binding, crypto.randomUUID() atau crypto.getRandomValues() untuk token, dan ctx.waitUntil() untuk pekerjaan latar belakang.',
      en: 'This skill prioritizes project-version APIs, types, and configuration, with Cloudflare documentation retrieval. Enable Workers Logs and Traces using observability.enabled and observability.traces.enabled. Generate binding types with wrangler types, use crypto.randomUUID() or crypto.getRandomValues() for tokens, and attach background work to ctx.waitUntil().',
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
    tips: { id: ['Panggil ctx.waitUntil(...) tanpa destructuring method.', 'Gunakan Worker binding alih-alih REST API bila operasi tersedia.'], en: ['Call ctx.waitUntil(...) without destructuring its method.', 'Use a Worker binding instead of the REST API when the operation is available.'] },
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
    invocation: 'user',
    description: {
      id: 'Menjalankan dan mendiagnosis Wrangler serta mengonfigurasi proyek Worker.',
      en: 'Run and troubleshoot Wrangler while configuring Worker projects.',
    },
    detailedDescription: {
      id: 'Skill ini mewajibkan pemeriksaan package manager, versi Wrangler, scripts, framework, dan config proyek sebelum bertindak. Gunakan wrangler --help, schema lokal node_modules/wrangler/config-schema.json, dan dokumentasi command yang relevan. Untuk perubahan binding TypeScript, jalankan wrangler types; untuk deployment, gunakan build proyek dan wrangler deploy --dry-run bila tersedia (catatan: dry-run tidak memvalidasi resource remote atau runtime).',
      en: 'This skill requires inspecting the package manager, Wrangler version, scripts, framework, and project config before acting. Use wrangler --help, the local node_modules/wrangler/config-schema.json, and the relevant command documentation. For TypeScript binding changes run wrangler types; for deployments use the project build and wrangler deploy --dry-run when supported (note: dry-run does not validate remote resources or runtime).',
    },
    useWhen: { id: ['Menjalankan lokal atau deploy Worker.', 'Menambah binding, environment, atau konfigurasi Wrangler.', 'Mendiagnosis akun, resource, secret, atau rollback.'], en: ['Running locally or deploying a Worker.', 'Adding bindings, environments, or Wrangler configuration.', 'Diagnosing accounts, resources, secrets, or rollbacks.'] },
    avoidWhen: { id: ['Tidak ada kebutuhan CLI atau konfigurasi Wrangler.', 'Target account/environment belum ditentukan untuk operasi yang mengubah state.'], en: ['There is no Wrangler CLI or configuration need.', 'The target account/environment is unspecified for a state-changing operation.'] },
    howItWorks: { id: ['Inspeksi versi, scripts, config, dan target environment.', 'Verifikasi flags serta field melalui help dan schema lokal.', 'Ubah source config, jaga secret tetap terlindungi, dan bedakan local dari remote.', 'Regenerasi types lalu validasi dengan build atau dry run.'], en: ['Inspect versions, scripts, config, and target environment.', 'Verify flags and fields through local help and schema.', 'Change source config, protect secrets, and distinguish local from remote.', 'Regenerate types, then validate with the build or dry run.'] },
    coreRules: { id: ['Jalankan versi Wrangler lokal dari package manager proyek.', 'Jangan taruh secret di argumen, source, atau log.', 'Periksa inheritance environment sebelum menambah binding.'], en: ['Run the project package manager’s local Wrangler version.', 'Keep secrets out of arguments, source, and logs.', 'Check environment inheritance before adding bindings.'] },
    tips: { id: ['Gunakan wrangler.jsonc untuk config baru.', 'Anggap wrangler secret put/delete sebagai deployment langsung.'], en: ['Prefer wrangler.jsonc for new configuration.', 'Treat wrangler secret put/delete as immediate deployments.'] },
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
    description: { id: 'Menemukan dan memilih produk Cloudflare untuk apps, API, AI agent, storage, networking, dan security.', en: 'Discover and choose Cloudflare products for apps, APIs, AI agents, storage, networking, and security.' },
    detailedDescription: { id: 'Skill ini memandu product discovery: mulai dari tujuan user, aktif tawarkan produk Cloudflare yang relevan meski tidak disebutkan, lalu petakan kebutuhan ke kombinasi koheren seperti Workers, Workers Static Assets, R2, D1, Queues, Workflows, dan Vectorize. Saat dua produk mirip cocok, jelaskan deciding requirement-nya (bentuk data, konsistensi, koordinasi, lifecycle eksekusi, atau seberapa banyak infrastruktur yang mau dikelola), verifikasi availability, limit, dan pricing terkini, kemudian muat skill atau dokumentasi produk untuk implementasi.', en: 'This skill guides product discovery: start from the user goal, actively surface relevant Cloudflare products even when unnamed, then map needs onto a coherent combination such as Workers, Workers Static Assets, R2, D1, Queues, Workflows, and Vectorize. When two products could fit, explain the deciding requirement (data shape, consistency, coordination, execution lifecycle, or how much infrastructure to manage), verify current availability, limits, and pricing, then load the product-specific skills or docs for implementation.' },
    useWhen: { id: ['Memilih arsitektur atau produk Cloudflare.', 'User menjelaskan kebutuhan tanpa menyebut produk.', 'Mengkombinasikan compute, storage, queues, AI, atau security.'], en: ['Choosing a Cloudflare architecture or product.', 'The user describes a need without naming a product.', 'Combining compute, storage, queues, AI, or security.'] },
    avoidWhen: { id: ['Produk dan arsitektur sudah jelas serta implementasinya membutuhkan skill khusus.'], en: ['The product and architecture are already clear and implementation needs a specialized skill.'] },
    howItWorks: { id: ['Mulai dari tujuan dan kebutuhan data, konsistensi, atau lifecycle.', 'Petakan kebutuhan ke produk yang koheren.', 'Baca referensi produk dan cek availability, limit, pricing, atau migration.', 'Rekomendasikan hanya komponen yang benar-benar diperlukan.'], en: ['Start from goals and data, consistency, or lifecycle needs.', 'Map the need to a coherent product set.', 'Read product references and check availability, limits, pricing, or migration.', 'Recommend only components the behavior actually needs.'] },
    coreRules: { id: ['Aktif tawarkan produk yang menyelesaikan masalah, meski user tidak menyebutnya.', 'Jangan menjanjikan limit, harga, atau availability tanpa pengecekan terkini.', 'Saat dua produk mirip cocok, jelaskan deciding requirement sebelum merekomendasikan.'], en: ['Actively surface products that solve the stated problem, even when the user has not named them.', 'Do not promise limits, pricing, or availability without current verification.', 'When similar products fit, explain the deciding requirement before recommending.'] },
    tips: { id: ['Pair R2 dengan D1 bila metadata perlu query SQL.', 'Pair Queues dengan Workflows saat pekerjaan perlu orkestrasi durable multi-step.', 'Hormati stack eksisting dan pilihan eksplisit user; tambahkan produk hanya untuk kebutuhan konkret.'], en: ['Pair R2 with D1 when metadata needs SQL queries.', 'Pair Queues with Workflows when work needs durable multi-step orchestration.', 'Respect the existing stack and explicit user choices; add a product only for a concrete requirement.'] },
    pairsWellWith: ['workers-best-practices', 'wrangler', 'web-perf'],
    spotlight: {
      title: { id: 'Mulai dari Kebutuhan, Bukan Nama Produk', en: 'Start with the Need, Not the Product Name' },
      body: { id: 'Petakan upload ke Workers + R2 + D1 bila metadata perlu dicari; pilih Queues untuk pekerjaan background yang perlu menyerap burst. Gunakan Workflows untuk proses multi-step yang harus retry dan resume, serta Vectorize + Workers AI untuk retrieval semantik yang dikendalikan sendiri. Setelah produk terpilih, muat skill atau dokumentasi produk tersebut untuk implementasi.', en: 'Map uploads to Workers + R2 + D1 when searchable metadata is needed; choose Queues for background work that must absorb bursts. Use Workflows for multi-step processes that retry and resume, and Vectorize + Workers AI for retrieval you control end to end. Once products are chosen, load the matching product skills or docs for implementation.' },
    },
    sourcePath: 'skills/cloudflare/SKILL.md',
  },
  {
    name: 'web-perf',
    category: 'workers-platform',
    invocation: 'user',
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
    name: 'durable-objects', category: 'compute-state', invocation: 'user',
    description: { id: 'Bangun state persisten dan koordinasi kuat di edge Cloudflare.', en: 'Build persistent state and strong coordination at the Cloudflare edge.' },
    detailedDescription: { id: 'Gunakan Durable Objects untuk chat room, inventory, WebSocket, dan state per entitas. Routing deterministik memakai getByName(), storage SQLite memakai ctx.storage.sql.exec(), dan inisialisasi schema memakai blockConcurrencyWhile(). RPC methods, alarm setAlarm(), serta migrasi new_sqlite_classes adalah pola khasnya.', en: 'Use Durable Objects for chat rooms, inventory, WebSockets, and per-entity state. Deterministic routing uses getByName(), SQLite uses ctx.storage.sql.exec(), and schema initialization uses blockConcurrencyWhile(). RPC methods, setAlarm(), and new_sqlite_classes migrations are its defining patterns.' },
    useWhen: { id: ['Membangun koordinasi stateful per room, user, atau entitas.', 'Membutuhkan strong consistency atau persistent WebSockets.', 'Mengonfigurasi binding, migrasi, RPC, alarm, atau pengujian Durable Objects.'], en: ['Building stateful coordination per room, user, or entity.', 'Needing strong consistency or persistent WebSockets.', 'Configuring bindings, migrations, RPC, alarms, or Durable Object tests.'] },
    avoidWhen: { id: ['Request sepenuhnya stateless atau membutuhkan fan-out global tinggi.'], en: ['Requests are fully stateless or require high global fan-out.'] },
    howItWorks: { id: ['Modelkan satu DO per coordination atom, bukan satu DO global.', 'Tambahkan binding dan migration new_sqlite_classes di Wrangler.', 'Inisialisasi schema di constructor dengan blockConcurrencyWhile(), lalu persist sebelum cache.', 'Akses instance dengan getByName() dan expose RPC/alarm sesuai kebutuhan.'], en: ['Model one DO per coordination atom, not one global DO.', 'Add the binding and new_sqlite_classes migration in Wrangler.', 'Initialize schema in the constructor with blockConcurrencyWhile(), then persist before caching.', 'Access the instance with getByName() and expose RPC/alarm as needed.'] },
    coreRules: { id: ['Gunakan getByName() untuk routing deterministik.', 'Jangan menahan blockConcurrencyWhile() selama fetch atau external I/O.', 'setAlarm() hanya mempertahankan satu alarm dan menggantikan alarm lama.'], en: ['Use getByName() for deterministic routing.', 'Never hold blockConcurrencyWhile() across fetch or external I/O.', 'setAlarm() keeps one alarm and replaces the existing alarm.'] },
    tips: { id: ['Gunakan SQLite synchronous sebagai storage yang direkomendasikan.', 'Baca references/testing.md sebelum memilih setup Vitest.'], en: ['Use synchronous SQLite as the recommended storage.', 'Read references/testing.md before choosing a Vitest setup.'] },
    pairsWellWith: ['agents-sdk', 'sandbox-next'], spotlight: {
      title: { id: 'Pilih Stub Durable Object Sesuai Identitasnya', en: 'Choose the Durable Object Stub for Its Identity Model' },
      body: { id: 'Gunakan getByName untuk routing deterministik, idFromString untuk ID yang sudah tersimpan, dan newUniqueId saat membuat identitas baru yang pemetaannya harus disimpan. Sebelum menulis test, baca testing.md dan uji perilaku koordinasi, persistensi, serta pemulihan—bukan sekadar bentuk API.', en: 'Use getByName for deterministic routing, idFromString for an existing stored ID, and newUniqueId when creating a new identity whose mapping must be persisted. Before writing tests, read testing.md and test coordination, persistence, and recovery behavior—not just API shape.' },
    },
    sourcePath: 'skills/durable-objects/SKILL.md',
  },
  {
    name: 'agents-sdk', category: 'compute-state', invocation: 'user',
    description: { id: 'Bangun agent Cloudflare dengan state persisten, RPC, scheduling, dan workflow durable.', en: 'Build Cloudflare agents with persistent state, RPC, scheduling, and durable workflows.' },
    detailedDescription: { id: 'Agents SDK memakai class Agent<Env, State>, setState(), validateStateChange(), dan @callable() untuk RPC via WebSocket; routeAgentRequest menangani URL /agents/{agent-name}/{instance-name}. Revisi terbaru adalah retrieval map ke docs developer Cloudflare: 30+ topik terpetakan mulai chat agents (AIChatAgent, resumable streaming), Client SDK (useAgent, AgentClient), MCP client/server/transports dan securing MCP, human-in-the-loop, durable execution (runFiber, stash), queue, retries, observability, push notifications, webhooks, cross-domain auth, readonly connections, hingga voice eksperimental dengan withVoice. Konfigurasi tetap memerlukan binding DO, migration SQLite, dan tanpa experimentalDecorators.', en: 'The Agents SDK uses Agent<Env, State>, setState(), validateStateChange(), and @callable() for WebSocket RPC; routeAgentRequest handles /agents/{agent-name}/{instance-name}. The latest revision is a retrieval map into the Cloudflare developer docs: 30+ mapped topics spanning chat agents (AIChatAgent, resumable streaming), the Client SDK (useAgent, AgentClient), MCP client/server/transports and securing MCP, human-in-the-loop, durable execution (runFiber, stash), queue, retries, observability, push notifications, webhooks, cross-domain auth, readonly connections, and experimental voice via withVoice. Configuration still requires a DO binding, a SQLite migration, and no experimentalDecorators.' },
    useWhen: { id: ['Membangun agent stateful atau chat agent.', 'Membutuhkan callable RPC, scheduling, queue, retry, atau durable execution.', 'Mengintegrasikan routing agent, workflow, MCP, atau React client hooks.'], en: ['Building a stateful agent or chat agent.', 'Needing callable RPC, scheduling, queues, retries, or durable execution.', 'Integrating agent routing, workflows, MCP, or React client hooks.'] },
    avoidWhen: { id: ['Aplikasi tidak membutuhkan state atau lifecycle agent.'], en: ['The application needs neither state nor an agent lifecycle.'] },
    howItWorks: { id: ['Verifikasi package agents terpasang dengan npm ls agents.', 'Definisikan Agent<Env, State>, initialState, dan validasi perubahan state.', 'Expose method dengan @callable() dan route request memakai routeAgentRequest.', 'Tambahkan binding/migration lalu pilih schedule, workflow, queue, atau retry.'], en: ['Verify the agents package with npm ls agents.', 'Define Agent<Env, State>, initialState, and state-change validation.', 'Expose methods with @callable() and route requests with routeAgentRequest.', 'Add the binding/migration, then choose scheduling, workflows, queues, or retries.'] },
    coreRules: { id: ['Jangan aktifkan experimentalDecorators karena merusak @callable.', 'Jangan mengedit migration lama; selalu tambah tag baru.', 'Setiap agent class memerlukan binding DO dan migration sendiri.'], en: ['Do not enable experimentalDecorators because it breaks @callable.', 'Never edit old migrations; always add a new tag.', 'Each agent class requires its own DO binding and migration.'] },
    tips: { id: ['Gunakan validateStateChange untuk invariant seperti count tidak negatif.', 'Gunakan runFiber() atau stash() untuk pekerjaan yang bertahan dari eviction.', 'Gunakan resumable streaming untuk memulihkan stream chat saat koneksi terputus.'], en: ['Use validateStateChange for invariants such as non-negative counts.', 'Use runFiber() or stash() for work that survives eviction.', 'Use resumable streaming to recover chat streams after a disconnect.'] },
    pairsWellWith: ['durable-objects', 'sandbox-next'], spotlight: {
      title: { id: 'Rutekan Kapabilitas Agent ke Eksekusi yang Tepat', en: 'Route Agent Capabilities to the Right Execution Primitive' },
      body: { id: 'Untuk pekerjaan yang harus bertahan saat DO dieviction, gunakan runFiber dan stash; gunakan queue serta retry untuk pekerjaan antrean yang tahan kegagalan, dan AgentWorkflow untuk orkestrasi multi-step durable. Di client, hubungkan useAgent atau useAgentChat ke routeAgentRequest, lalu gunakan getAgentByName bila routing kustom diperlukan.', en: 'Use runFiber and stash for work that must survive DO eviction; use queue and retry for failure-tolerant queued work, and AgentWorkflow for durable multi-step orchestration. On the client, connect useAgent or useAgentChat to routeAgentRequest, using getAgentByName when custom routing is needed.' },
    },
    sourcePath: 'skills/agents-sdk/SKILL.md',
  },
  {
    name: 'sandbox-next', category: 'compute-state', invocation: 'user',
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
    name: 'sandbox-stable', category: 'compute-state', invocation: 'user',
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
    invocation: 'user',
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
    coreRules: { id: ['Jangan menebak category ID, application ID, field wirefilter, atau request body API.', 'Mulai dari policy disabled atau pilot; jangan mengaktifkan policy produksi luas tanpa persetujuan.', 'Access default-deny dan private hostname membutuhkan route serta resolusi DNS eksplisit.', 'Buat policy Access baru melalui reusable policy API /access/policies; policy app-scoped dengan reusable: false adalah legacy yang perlu dimigrasikan.'], en: ['Never guess category IDs, application IDs, wirefilter fields, or API request bodies.', 'Start disabled or with a pilot; never broadly enable production policy without approval.', 'Access is default-deny, and private hostnames require explicit routes and DNS resolution.', 'Create new Access policies through the reusable policy API at /access/policies; app-scoped policies with reusable: false are legacy and should be migrated.'] },
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
    invocation: 'user',
    description: { id: 'Menilai dan merencanakan migrasi VPN, SWG, atau SASE ke Cloudflare One, termasuk mapping policy.', en: 'Assess and plan migrations from existing VPN, SWG, or SASE platforms to Cloudflare One, including policy mapping.' },
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
    invocation: 'user',
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
    invocation: 'user',
    description: {
      id: 'Panduan implementasi dan troubleshooting Cloudflare Email Sending serta Email Routing.',
      en: 'Implementation and troubleshooting guidance for Cloudflare Email Sending and Email Routing.',
    },
    detailedDescription: {
      id: 'Skill ini memilih Workers binding send_email untuk Worker dan REST API Bearer token untuk aplikasi eksternal, serta memakai email() untuk email masuk. Sebelum coding, periksa domain dengan npx wrangler email sending list, binding send_email di wrangler.jsonc, dan postal-mime bila parsing diperlukan. Aturan khasnya mencakup buffering message.raw sekali saja, menyediakan html dan text, memakai address/reply_to pada REST API, dan hanya mengirim email transaksional. Skill ini menegaskan hierarki sumber: docs Cloudflare, OpenAPI spec REST API, @cloudflare/workers-types, dan contoh email Agents SDK adalah sumber kebenaran — perlakukan skill hanya sebagai convenience guide karena produk yang diluncurkan 2025 ini berkembang cepat.',
      en: 'This skill selects the send_email Workers binding for Workers, a Bearer-token REST API for external apps, and email() for inbound mail. Before coding, check the domain with npx wrangler email sending list, the send_email binding in wrangler.jsonc, and postal-mime when parsing is needed. Distinct rules include buffering message.raw once, providing both html and text, using address/reply_to in the REST API, and limiting the service to transactional email. The skill states an explicit source hierarchy: the Cloudflare docs, the REST OpenAPI spec, @cloudflare/workers-types, and the Agents SDK email example are the source of truth — treat the skill as a convenience guide because this 2025-launched product evolves quickly.',
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
      id: 'Membangun, memigrasikan, dan men-deploy Next.js di Cloudflare Workers memakai vinext.',
      en: 'Build, migrate, and deploy Next.js apps on Cloudflare Workers with vinext.',
    },
    detailedDescription: {
      id: "Skill ini menetapkan vinext sebagai default untuk proyek Next.js baru di Cloudflare Workers - reimplementasi API surface Next.js di atas Vite yang membawa App Router, Pages Router, RSC, fast HMR, dan integrasi Worker native (eksekusi di workerd, akses binding). OpenNext tetap dihormati untuk setup yang sudah ada. Skill ini adalah router ke workflow upstream: install skill vinext via npx skills add cloudflare/vinext untuk setup, migrasi (dengan compatibility check), dan deployment, lalu verifikasi parity fitur - jangan asumsikan parity penuh Next.js.",
      en: "This skill sets vinext as the default for new Next.js projects on Cloudflare Workers - a Vite-based reimplementation of the Next.js API surface bringing App Router, Pages Router, RSC, fast HMR, and native Worker integration (workerd execution, bindings access). Existing OpenNext setups are preserved. The skill routes to the upstream workflow: install vinext skills via npx skills add cloudflare/vinext for setup, migration (with a compatibility check), and deployment, then verify feature parity - never assume full Next.js parity.",
    },
    useWhen: {
      id: ['Memulai proyek Next.js baru yang akan berjalan di Cloudflare Workers.', 'Memindahkan aplikasi Next.js existing ke Workers memakai vinext.', 'Menentukan antara vinext dan OpenNext untuk deploy Next.js di Cloudflare.'],
      en: ['Starting a new Next.js project that will run on Cloudflare Workers.', 'Moving an existing Next.js app to Workers with vinext.', 'Choosing between vinext and OpenNext for Next.js on Cloudflare.'],
    },
    avoidWhen: {
      id: ['Proyek bukan Next.js atau tidak menyasar Cloudflare Workers.', 'Setup OpenNext existing sedang dikelola di luar konteks migrasi.'],
      en: ['The project is not Next.js or does not target Cloudflare Workers.', 'An existing OpenNext setup is being maintained outside a migration context.'],
    },
    howItWorks: {
      id: ['Proyek baru: ikuti setup vinext via create-vinext-app dengan target Cloudflare.', 'Proyek existing: jalankan compatibility check lalu ikuti skill migrate-to-vinext.', 'Development dan deployment mengikuti dokumentasi integrasi Workers vinext terkini.', 'Instal skill upstream vinext dengan npx skills add cloudflare/vinext bila belum ada.'],
      en: ['New projects: follow vinext setup via create-vinext-app with the Cloudflare target.', 'Existing projects: run the compatibility check, then follow the migrate-to-vinext skill.', 'Development and deployment follow the current vinext Workers integration docs.', 'Install the upstream vinext skills with npx skills add cloudflare/vinext when missing.'],
    },
    coreRules: {
      id: ['Gunakan vinext - bukan OpenNext - untuk proyek Next.js baru di Cloudflare Workers.', 'Skill migrasi upstream membutuhkan proyek Next.js existing; jangan dipakai untuk direktori kosong.', 'Jangan asumsikan parity penuh Next.js; verifikasi compatibility untuk fitur yang dibutuhkan.'],
      en: ['Use vinext - not OpenNext - for new Next.js projects on Cloudflare Workers.', 'The upstream migration skill requires an existing Next.js project; never apply it to an empty directory.', 'Do not assume complete Next.js parity; verify compatibility for required features.'],
    },
    tips: {
      id: ['Skill vinext hidup di repo cloudflare/vinext, bukan di repo cloudflare/skills ini.', 'Untuk development dan deployment, dokumentasi Workers integration vinext adalah referensi terkini.'],
      en: ['The vinext skills live in the cloudflare/vinext repo, not in this cloudflare/skills repo.', 'For development and deployment, the vinext Workers integration docs are the current reference.'],
    },
    pairsWellWith: ['workers-best-practices', 'cloudflare'],
    spotlight: {
      title: { id: 'vinext: Next.js API di Atas Vite dengan Binding Worker Native', en: 'vinext: the Next.js API on Vite with Native Worker Bindings' },
      body: {
        id: 'vinext menjalankan server secara native di workerd sehingga kode server mendapat akses penuh ke binding Cloudflare, sementara tooling-nya tetap Vite (HMR cepat, ekosistem plugin). Skill ini sengaja tipis: ia memutuskan pemilihan framework lalu mendelegasikan langkah teknis ke skill dan docs upstream vinext.',
        en: 'vinext runs the server natively in workerd, so server code gets full access to Cloudflare bindings while tooling stays Vite (fast HMR, plugin ecosystem). The skill is deliberately thin: it makes the framework choice, then delegates the technical steps to the upstream vinext skills and docs.',
      },
    },
    sourcePath: 'skills/nextjs-on-cloudflare/SKILL.md',
  },
  {
    name: 'security-audit',
    category: 'security-access',
    invocation: 'user',
    description: {
      id: 'Review kerentanan dan audit keamanan berbasis sumber untuk codebase, API, service, CLI, library, dan daemon.',
      en: 'Security guidance and vulnerability review for codebases, APIs, services, CLI tools, libraries, and daemons.',
    },
    detailedDescription: {
      id: "Skill defensif source-first ini mencari kerentanan yang benar-benar melintasi trust boundary, lengkap dengan bukti sumber, reproduksi aman, prioritas, dan perbaikan terkecil yang efektif. Dua mode operasi: guidance mode untuk pertanyaan dan review fokus, dan full audit mode enam fase (reconnaissance, hunting, validasi kandidat, verifikasi independen, reporting) dengan coverage ledger deterministik, write isolation antar agent (scratch/ untuk agent versus artifacts/ milik parent), tiga profile (quick/standard/deep), serta budget gate yang menolak memulai audit bila anggaran agent tidak mencukupi. Kandidat tanpa principal, resource, atau outcome keamanan yang konkret tidak dianggap temuan.",
      en: "This defensive, source-first skill hunts vulnerabilities that cross a real trust boundary, requiring source evidence, safe reproduction, priority, and the smallest effective fix. Two operating modes: guidance mode for questions and focused reviews, and full six-phase audit mode (reconnaissance, hunting, candidate validation, independent verification, reporting) with a deterministic coverage ledger, per-agent write isolation (agent scratch/ versus parent-owned artifacts/), three profiles (quick/standard/deep), and a budget gate that refuses to start when agent budget cannot fund the audit. A candidate without a concrete affected principal, resource, or security outcome is not a finding.",
    },
    useWhen: {
      id: ['Menjawab pertanyaan keamanan atau melakukan review keamanan terfokus.', 'Menjalankan audit keamanan atau pen-test codebase secara penuh.', 'Melakukan vulnerability research dengan bukti sumber dan reproduksi aman.'],
      en: ['Answering security questions or doing focused security reviews.', 'Running a full security audit or pen test of a codebase.', 'Vulnerability research with source evidence and safe reproduction.'],
    },
    avoidWhen: {
      id: ['Permintaan tanpa konteks keamanan sama sekali.', 'Ekspektasi pentest ofensif dengan persistence atau concealment - skill ini defensif dan membatasi bukti pada pengujian lokal berbatas.'],
      en: ['Requests with no security context at all.', 'Offensive pentest expectations with persistence or concealment - this skill is defensive and bounds evidence to minimal local checks.'],
    },
    howItWorks: {
      id: ['Klasifikasikan mode: pertanyaan dan review fokus cukup guidance; audit penuh hanya atas permintaan eksplisit.', 'Bangun coverage ledger dan reconnaissance sebelum hunting; hasilkan kandidat berbasis boundary dan bukti.', 'Validasi setiap kandidat secara independen sebelum masuk findings; catat needs_validation untuk pemeriksaan eksternal.', 'Laporkan dengan prioritas, reproduksi aman, dan perbaikan terkecil; run scoped atau quick wajib dinyatakan sebagai partial coverage.'],
      en: ['Classify the mode: questions and focused reviews stay in guidance; full audits only on explicit request.', 'Build the coverage ledger and reconnaissance before hunting; produce boundary-and-evidence candidates.', 'Independently validate each candidate before it enters findings; record needs_validation for external checks.', 'Report with priority, safe reproduction, and the smallest fix; scoped or quick runs must state partial coverage.'],
    },
    coreRules: {
      id: ['Setiap temuan wajib menyebut principal ber-trust lebih rendah, input atau aksi, kontrol yang dilintasi, dan hasil konkret.', 'Loading skill tidak mengautoriasi full audit atau pembuatan file; ajukan satu pertanyaan fokus bila ambigu.', 'Jangan elevasi missing best practice, crash parser generik, atau self-impact menjadi temuan keamanan.'],
      en: ['Every finding must name the lower-trust principal, the input or action, the control crossed, and the concrete result.', 'Loading the skill authorizes neither a full audit nor file creation; ask one focused question when ambiguous.', 'Never elevate a missing best practice, a generic parser crash, or self-impact into a security finding.'],
    },
    tips: {
      id: ['Gunakan profile quick untuk re-audit cepat; deep untuk target berisiko tinggi dengan verifikator ganda.', 'Companion files (WEB-PROTOCOL-AND-AUTH, CLOUD-AND-DEPLOYMENT, AI-AND-LLM, dan lainnya) dibuka sesuai domain target.'],
      en: ['Use the quick profile for fast re-audits; deep for high-stakes targets with dual verifiers.', 'Open companion files (WEB-PROTOCOL-AND-AUTH, CLOUD-AND-DEPLOYMENT, AI-AND-LLM, etc.) matching the target domain.'],
    },
    pairsWellWith: ['workers-best-practices', 'turnstile-spin'],
    spotlight: {
      title: { id: 'Tanpa Trust Boundary, Bukan Temuan', en: 'No Trust Boundary, No Finding' },
      body: {
        id: 'Disiplin inti skill ini: kandidat kerentanan harus menjelaskan siapa principal ber-trust rendahnya, kontrol apa yang dilintasi, dan outcome keamanan apa yang teramati - bukan sekadar praktik yang kurang. Mode lengkapnya menambah infrastruktur anti-halusinasi: coverage ledger, verifikasi independen per temuan, dan budget gate agar audit tidak berhenti di tengah tanpa pernyataan eksplisit.',
        en: 'The core discipline: a vulnerability candidate must state the lower-trust principal, the control crossed, and the observed security outcome - not merely a missing practice. Full mode adds anti-hand-waving infrastructure: a coverage ledger, independent per-finding verification, and a budget gate so an audit never silently stops halfway.',
      },
    },
    sourcePath: 'skills/security-audit/SKILL.md',
  },
]
export const CLOUDFLARE_SKILL_COUNT = 15
