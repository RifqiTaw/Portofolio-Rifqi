# CLAUDE.md

Panduan untuk Claude Code ketika bekerja di repository ini. File ini berisi konteks proyek, konvensi, best practices, dan strategi optimasi yang khusus untuk stack yang sudah terpasang.

---

## 1. Project Overview

**Nama:** Portofolio Rifqi Taufiqurrohman
**Tipe:** Portfolio website (Nuxt 3 fullstack, SSR aktif)
**Deploy target:** Vercel — `https://rifqitaw.vercel.app/`
**Owner:** Rifqi Taufiqurrohman — Frontend Developer @ Telkom Foundation

### Halaman
- `/` — Hero / landing (`pages/index.vue`)
- `/about` — Profile (`pages/about.vue`)
- `/experience` — Riwayat kerja, pakai PrimeVue `Timeline` (`pages/experience.vue`)
- `/project` — Showcase project (`pages/project.vue`)
- `/contact` — Form kontak via EmailJS (`pages/contact.vue`)

### Aset & Branding
- Background gambar global di [layouts/default.vue](layouts/default.vue) (`/images/background.jpg`)
- Warna brand: `#00E5FF` (active link), `#00C6FF` (hover), gradient logo `#005b43 → #2b2c71`
- Font default: Poppins / Roboto / Montserrat (via `@nuxtjs/google-fonts`)

---

## 2. Tech Stack (terpasang persis di [package.json](package.json))

### Framework & Rendering
- **Nuxt 3.13** (`ssr: true`, `compatibilityDate: "2024-04-03"`)
- **Vue 3** (Composition API, `<script setup lang="ts">`)
- **TypeScript 5.5**

### Styling
- **TailwindCSS** via `@nuxtjs/tailwindcss` (config: [tailwind.config.js](tailwind.config.js), CSS: [assets/css/tailwind.css](assets/css/tailwind.css))
- **tailwindcss-animate** — animasi accordion/collapsible (dipakai shadcn-vue)
- **tailwind-merge** + **clsx** — di-wrap oleh helper `cn()` di [lib/utils.ts](lib/utils.ts)
- **class-variance-authority (cva)** — untuk varian komponen shadcn

### Component Libraries
- **shadcn-nuxt** — komponen di [components/ui/](components/ui/) (`badge`, `button`, `card`, `toast`, `toggle`). Style: `default`, baseColor: `neutral`, CSS variables ON. Alias: `@/components`, `@/lib/utils`.
- **radix-vue** — primitive headless yang dipakai shadcn-vue
- **PrimeVue 4.1** + **@primevue/themes (Aura)** — dipakai untuk `Timeline` di experience. Plugin di [plugins/primevue.ts](plugins/primevue.ts). Theme prefix `p`, dark selector `system`.
- **primeicons** — di-import di [layouts/default.vue](layouts/default.vue#L24) (sudah di-CSS Nuxt config juga — duplikasi, lihat §6)

### Icons
- **@nuxt/icon** + **nuxt-icon** + **lucide-vue-next** — pakai `<Icon name="mdi:github" />` (lihat [components/Header.vue:80](components/Header.vue#L80))

### Media & SEO
- **@nuxt/image** — `<NuxtImg>` untuk optimisasi gambar otomatis
- **@nuxtjs/google-fonts** — font self-hosted otomatis, `display: swap`
- **@nuxtjs/sitemap** — generate `/sitemap.xml`, routes manual di [nuxt.config.ts:43-46](nuxt.config.ts#L43-L46)

### Animation & Form
- **GSAP 3.12** — animasi (loading screen, hero, navbar, scroll indicator)
- **emailjs-com** — kirim email dari form `/contact`

---

## 3. Struktur Direktori

```
Portofolio-Rifqi/
├── app.vue                 # Root: <NuxtLayout><NuxtPage/></NuxtLayout>
├── nuxt.config.ts          # Modul, head meta, sitemap, primevue, shadcn
├── tailwind.config.js      # CommonJS, darkMode class, CSS vars
├── components.json         # Config shadcn-vue
├── tsconfig.json           # Extends .nuxt/tsconfig.json
├── assets/css/tailwind.css # @tailwind directives + CSS variables
├── components/
│   ├── Header.vue          # Navbar (router-link, GSAP)
│   ├── Footer.vue
│   └── ui/                 # shadcn components (auto-imported)
├── layouts/default.vue     # Loading screen + scroll indicator + Header/Footer
├── pages/                  # File-based routing
├── plugins/primevue.ts     # Daftarkan komponen PrimeVue global
├── lib/utils.ts            # cn() helper
├── public/                 # Aset statis (favicon, robots.txt)
├── static/                 # ⚠️ Custom dir (dir.static), lihat §6
└── server/                 # Hanya tsconfig.json — belum ada API route
```

---

## 4. Konvensi Coding

### Vue / Nuxt
- **Selalu pakai `<script setup lang="ts">`** — sudah konsisten di seluruh proyek
- **Auto-import Nuxt aktif** — tidak perlu `import { ref, onMounted } from 'vue'` (lihat [pages/index.vue](pages/index.vue) sebagai contoh yang benar; [layouts/default.vue:25](layouts/default.vue#L25) masih import manual — bisa disederhanakan)
- **Komponen di `components/`** otomatis ter-register — jangan import manual (`Header`, `Footer`, `Icon`, `NuxtImg` semua auto)
- **Hindari `<router-link>`** — pakai `<NuxtLink>` (idiomatic Nuxt 3, support prefetch). [Header.vue](components/Header.vue) saat ini pakai `<router-link>` — kandidat refactor
- **Typing `ref`** — hindari `ref<any>(null)`. Pakai `ref<HTMLElement | null>(null)` untuk template ref

### Tailwind (fokus utama)
- **Pakai `cn()` dari [lib/utils.ts](lib/utils.ts)** ketika menggabungkan class kondisional — bukan template string. Contoh refactor untuk [Header.vue:21-24](components/Header.vue#L21-L24):
  ```vue
  <NuxtLink
    to="/"
    :class="cn('px-3 py-2 text-sm font-medium', isActive('/') ? 'text-[#00E5FF]' : 'text-white hover:text-[#00C6FF]')"
  >
  ```
- **Pakai CSS variables yang sudah didefinisikan** di [tailwind.css](assets/css/tailwind.css) — `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, dll. Jangan hardcode `bg-gray-900 bg-opacity-60` kalau ada token semantik.
- **Brand color sebaiknya ditambah ke `tailwind.config.js`**, bukan ditulis arbitrary `text-[#00E5FF]` berulang. Tambah:
  ```js
  // tailwind.config.js → theme.extend.colors
  brand: {
    DEFAULT: "#00E5FF",
    hover: "#00C6FF",
    gradientFrom: "#005b43",
    gradientTo: "#2b2c71",
  }
  ```
  lalu pakai `text-brand`, `hover:text-brand-hover`.
- **Hindari `bg-opacity-*`** (deprecated di Tailwind v3 modern) — pakai opacity modifier: `bg-gray-900/60` bukan `bg-gray-900 bg-opacity-60`.
- **Ordering class**: layout → box-model → typography → visual → state. Konsisten = lebih mudah dibaca.
- **`<style scoped>` minimal** — kalau bisa pakai Tailwind, jangan tulis CSS scoped. Saat ini [layouts/default.vue:83-147](layouts/default.vue#L83-L147) punya banyak scoped CSS yang sebagian bisa dipindah ke Tailwind (border, border-radius, positioning).
- **Container plugin sudah aktif** (`center: true`, padding `2rem`, max `2xl: 1400px`) — pakai `class="container"` daripada `max-w-7xl mx-auto`.

### File Naming
- Components: `PascalCase.vue`
- Pages: `kebab-case.vue` atau `index.vue`
- Composables (kalau dibuat nanti): `useXxx.ts` di `composables/`

---

## 5. Best Practices per Stack

### 5.1 Nuxt 3
- **SEO per page** — pakai `useHead()` / `useSeoMeta()` di tiap page, jangan andalkan global head di `nuxt.config.ts` saja. Contoh untuk `/about`:
  ```ts
  useSeoMeta({
    title: 'About — Rifqi Taufiqurrohman',
    description: '...',
    ogImage: '/images/foto-fullbody.jpg',
  })
  ```
- **Data fetching** — pakai `useFetch` / `useAsyncData` (caching + SSR friendly), bukan `fetch()` raw di `onMounted`.
- **Sitemap routes hardcoded** ([nuxt.config.ts:45](nuxt.config.ts#L45)) — kalau halaman bertambah, mudah lupa. Pertimbangkan auto-discover dari `pages/`.

### 5.2 TailwindCSS — Optimisasi Bundle
- **Purge sudah otomatis** via `@nuxtjs/tailwindcss` (scan `components/`, `pages/`, `layouts/`, `app.vue`). Tapi `safelist: ["dark"]` di [tailwind.config.js:6](tailwind.config.js#L6) — ini OK karena dark class ditoggle via JS.
- **Hindari dynamic class** seperti `text-[${color}]` — Tailwind tidak bisa deteksi. Pakai safelist atau switch statement dengan class lengkap.
- **CSS variables sudah dipakai untuk theming** — pertahankan pola ini. Untuk dark mode, cukup toggle class `dark` di `<html>`.

### 5.3 PrimeVue
- **Plugin saat ini hanya register `Timeline`** ([plugins/primevue.ts](plugins/primevue.ts)) — bagus, hindari register semua komponen (bloat).
- **Cara modern di Nuxt module `@primevue/nuxt-module`** sudah aktif di [nuxt.config.ts:33](nuxt.config.ts#L33) — sebenarnya module sudah meng-handle PrimeVue setup. **Plugin manual di [plugins/primevue.ts](plugins/primevue.ts) berpotensi duplikat config**. Verifikasi: kalau Timeline bisa dipakai tanpa plugin, hapus plugin tersebut.
- **CSS layer aktifkan kalau ada konflik** — sekarang `cssLayer: false` ([nuxt.config.ts:65](nuxt.config.ts#L65)). Set ke `true` kalau Tailwind & PrimeVue ada konflik specificity.

### 5.4 shadcn-vue
- **Tambah komponen via CLI**: `npx shadcn-vue@latest add <component>` — jangan tulis tangan.
- **Edit langsung di `components/ui/`** — itu memang prinsip shadcn (owned code, bukan dep).
- **Pakai `cn()` di setiap props `class`** supaya class user bisa override default.

### 5.5 GSAP
- **Bersihkan animation di `onUnmounted`** — sekarang [layouts/default.vue:34](layouts/default.vue#L34) bikin infinite tween (`repeat: -1`) tanpa cleanup. Pattern aman:
  ```ts
  let tween: gsap.core.Tween
  onMounted(() => { tween = gsap.to(...) })
  onUnmounted(() => tween?.kill())
  ```
- **Pakai `gsap.context()` di Vue 3** untuk auto-scope & cleanup:
  ```ts
  const ctx = gsap.context(() => { /* animations */ }, root.value)
  onUnmounted(() => ctx.revert())
  ```
- **Loading screen di layout** ([layouts/default.vue:30-80](layouts/default.vue#L30-L80)) jalan di **setiap navigasi** karena layout di-mount ulang. Kalau hanya ingin di first load, simpan flag di `useState` Nuxt (shared SSR state) atau pindah ke `app.vue`.

### 5.6 @nuxt/image
- **Selalu pakai `<NuxtImg>`** bukan `<img>` untuk asset di `/public` atau `/static` — auto generate WebP, lazy load, sizing.
- **Tambah `width` & `height`** untuk hindari CLS:
  ```vue
  <NuxtImg src="/images/foto-fullbody.jpg" width="600" height="800" loading="lazy" />
  ```
- **`format` & `quality`**: `<NuxtImg format="webp" quality="80" />` untuk kontrol bundle.
- **Provider** belum di-set — untuk Vercel, pertimbangkan `provider: 'vercel'` di `image:` config supaya ikut CDN Vercel.

### 5.7 EmailJS (di `/contact`)
- **JANGAN expose private key** di client. EmailJS public key OK di client, tapi service-id & template-id sebaiknya lewat `useRuntimeConfig().public`.
- **Tambah rate limiting client-side** (debounce submit) + validasi minimal sebelum kirim.
- **`emailjs-com` deprecated** — paket baru adalah `@emailjs/browser`. Migrasi direkomendasikan.

---

## 6. Issues & Quick Wins yang Bisa Dioptimasi

Berikut hal-hal konkret yang ditemukan saat audit awal — bisa dipakai sebagai backlog perbaikan:

1. **`dir: { static: "static" }`** di [nuxt.config.ts:30-32](nuxt.config.ts#L30-L32) **tapi `public/` juga ada**. Nuxt 3 default-nya `public/`. Memakai keduanya membingungkan. Konsolidasikan ke `public/`.
2. **`primeicons/primeicons.css` di-import 2x**: lewat `css: []` di [nuxt.config.ts:33](nuxt.config.ts#L33) dan lewat `import` di [layouts/default.vue:24](layouts/default.vue#L24). Hapus salah satu.
3. **Plugin PrimeVue manual** ([plugins/primevue.ts](plugins/primevue.ts)) kemungkinan duplikat dengan `@primevue/nuxt-module`. Lihat §5.3.
4. **`<router-link>` → `<NuxtLink>`** di [Header.vue](components/Header.vue) (×5). NuxtLink kasih prefetch + lebih idiomatic.
5. **5 link navigasi diulang** di [Header.vue:18-71](components/Header.vue#L18-L71) — refactor jadi `v-for` dengan array `[{to, label}]`.
6. **Background image scoped di layout** ([layouts/default.vue:114-123](layouts/default.vue#L114-L123)) — bisa jadi `body` global di `tailwind.css` atau utility class `bg-hero`.
7. **Subheadline pakai `ref` dua kali** ([pages/index.vue:47, 52](pages/index.vue#L47)) — satu ref hanya ke-bind ke elemen terakhir. Bug halus.
8. **Scrollbar `width: 0`** di [tailwind.css:74](assets/css/tailwind.css#L74) — efektif menyembunyikan scrollbar. Disengaja? Kalau ya, OK; kalau tidak, hapus.
9. **`bg-opacity-60` deprecated syntax** — pakai `bg-gray-900/60`.
10. **GSAP infinite tween** di [layouts/default.vue:70-79](layouts/default.vue#L70-L79) tanpa cleanup — leak di SPA navigation.
11. **`devtools: { enabled: false }`** — pertimbangkan `true` selama development.
12. **Belum ada `composables/`** — kalau ada logic GSAP / EmailJS yang dipakai ulang, extract ke `useLoadingAnimation()`, `useContactForm()`.
13. **Belum ada `.env` / `runtimeConfig`** — EmailJS keys hardcoded di `/contact` (perlu cek). Pindah ke runtime config.
14. **`server/` kosong** — kalau perlu API (contact form server-side, dynamic OG image), pakai `server/api/*.ts`.

---

## 7. Perintah yang Sering Dipakai

```bash
npm run dev         # Dev server (http://localhost:3000)
npm run build       # SSR build untuk Vercel
npm run generate    # Static generate (kalau mau SSG)
npm run preview     # Preview hasil build lokal
npx shadcn-vue@latest add <component>   # Tambah komponen shadcn baru
```

---

## 8. Aturan untuk Claude Code

Ketika memodifikasi proyek ini:

1. **Selalu pakai `cn()`** dari `@/lib/utils` untuk merge class — JANGAN concat string biasa.
2. **Selalu pakai `<NuxtImg>`** untuk gambar, bukan `<img>`.
3. **Selalu pakai `<NuxtLink>`** untuk navigasi internal, bukan `<router-link>` atau `<a href="/...">`.
4. **Pakai CSS variables** (`bg-background`, `text-foreground`, dst) bukan warna hardcoded — kecuali brand color yang harus konsisten.
5. **Hindari menulis ulang komponen shadcn** — modifikasi langsung file di `components/ui/<name>/`.
6. **Untuk dark mode** — toggle class `dark` di root, jangan bikin sistem theme baru.
7. **GSAP** — selalu cleanup di `onUnmounted` atau pakai `gsap.context()`.
8. **TypeScript** — type template ref dengan benar (`ref<HTMLDivElement | null>(null)`), jangan `ref<any>`.
9. **Tambah halaman baru** → update `sitemap.routes` di [nuxt.config.ts](nuxt.config.ts) & tambah `useSeoMeta()` di page tersebut.
10. **Komponen di `components/`** auto-import — jangan tulis `import` manual.
11. **Sebelum bikin file baru di `static/`** — pakai `public/` (lihat issue #1).
12. **Setiap perubahan UI** wajib dicek di mode mobile (Header punya `hidden md:flex` tapi tidak ada hamburger menu — kandidat tambahan).

---

## 9. Roadmap Sederhana (Saran)

- [ ] Mobile menu (hamburger) untuk Header
- [ ] Dark/Light toggle dengan `useColorMode` (`@nuxtjs/color-mode`)
- [ ] Pindah EmailJS ke `server/api/contact.post.ts` untuk hide credentials
- [ ] Tambah `composables/useGsapContext.ts`
- [ ] Ganti `emailjs-com` → `@emailjs/browser`
- [ ] Tambah Lighthouse CI / `@nuxt/eslint`
- [ ] Open Graph image dinamis via `nuxt-og-image`
