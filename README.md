# Portfolio — Full-Stack Developer

Portofolio personal minimalis: Next.js (App Router), TypeScript, Tailwind CSS v4, Poppins, dan Lucide React.
Sidebar kiri, routing multi-halaman, Dark Mode sebagai default, dan toggle Light/Dark yang tersimpan di `localStorage`.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

Pemeriksaan sebelum deploy:

```bash
npm run typecheck  # TypeScript
npm run lint       # ESLint (eslint-config-next)
npm run build      # production build
npm start
```

Butuh Node.js 20.9 atau lebih baru. `next build` mengunduh Poppins dari Google Fonts satu kali saat build, jadi pastikan ada koneksi internet.

## Yang perlu diganti

| Apa | File |
| --- | --- |
| Nama, jabatan, foto profil, email, URL situs, link sosial | `lib/site.ts` |
| Services (6 kartu), Tools, Experience di halaman About | `lib/site.ts` |
| Daftar proyek + penjelasan lengkap (yang ada sekarang hanya placeholder) | `lib/projects.ts` |
| Teks halaman Home / Projects / Contact | `app/*/page.tsx` |
| Warna tema | `app/globals.css` (bagian *Semantic theme tokens*) |

### Foto profil
1. Simpan foto persegi (minimal 400×400) ke `public/`, misalnya `public/profile.jpg`.
2. Di `lib/site.ts`, isi `avatar: "/profile.jpg"`.
Jika `avatar` kosong, sidebar menampilkan inisial nama.

### Gambar proyek
1. Simpan gambar ke `public/projects/`, misalnya `public/projects/ledger.jpg` (ukuran ideal 1600×1000, rasio 16:10).
2. Di `lib/projects.ts`, isi `image: "/projects/ledger.jpg"`.
3. Screenshot tambahan untuk halaman detail: `gallery: ["/projects/ledger-2.jpg", ...]`.

Setiap proyek otomatis punya halaman detail di `/projects/<slug>` berisi Overview, Highlights, Stack,
tautan Live demo / Source code, galeri, dan link ke proyek berikutnya.

- `summary` = keterangan singkat di bawah gambar; `overview` = penjelasan lengkap (satu string per paragraf).
- Dua proyek pertama dengan `featured: true` tampil di Home.
- `liveUrl`, `sourceUrl`, `highlights`, `role`, `gallery` bersifat opsional.
- Bagian **Experience** di About otomatis disembunyikan jika `experience` dikosongkan (`[]`).

## Struktur

```
app/
  layout.tsx            Font Poppins, metadata, ThemeProvider, sidebar bersama
  globals.css           Token warna (dark/light), base styles, reduced motion
  page.tsx              /          Home
  projects/page.tsx     /projects  Projects (grid kartu bergambar)
  projects/[slug]/      /projects/<slug>  Detail proyek
  about/page.tsx        /about     About
  contact/page.tsx      /contact   Contact
  not-found.tsx         404
components/
  sidebar/              Sidebar desktop, drawer mobile, profil, navigasi, footer
  theme/                Script anti-flash, store tema, provider, toggle
  icons/brand-icons.tsx Ikon LinkedIn / Instagram / GitHub bergaya Lucide
  projects/             Kartu proyek & gambar cover
  service-card.tsx, page-header.tsx, text-link.tsx, social-links.tsx, site-footer.tsx
public/
  projects/             Taruh gambar proyek di sini
lib/
  site.ts               Konfigurasi profil
  projects.ts           Data proyek
  navigation.ts         Item menu & deteksi route aktif
```

## Cara kerja tema

1. `components/theme/theme-script.tsx` berjalan di `<head>` sebelum halaman dirender, membaca `localStorage`
   (kunci `theme`) dan memasang `data-theme` pada `<html>`. Urutannya: pilihan tersimpan → preferensi sistem
   (hanya jika sistem memakai mode terang) → dark. Ini mencegah kedipan tema yang salah.
2. Semua warna komponen berasal dari token CSS (`--background`, `--sidebar`, `--foreground`, `--muted`,
   `--accent`, `--border`) yang nilainya berganti menurut `data-theme`, jadi seluruh UI ikut berubah sekaligus.
3. `ThemeProvider` membaca tema lewat `useSyncExternalStore` dengan snapshot server `null`, sehingga tidak ada
   hydration mismatch. Ikon matahari/bulan pada tombol dipilih lewat CSS sehingga sudah benar sebelum hydration.
4. Pilihan pengguna tersimpan di `localStorage` dan disinkronkan antar-tab.

## Catatan

- Lucide tidak lagi menyediakan logo merek, jadi ikon sosial dibuat sebagai SVG dengan gaya garis yang sama
  (`components/icons/brand-icons.tsx`).
- Halaman Contact sengaja tidak memakai form karena belum ada backend pengirim; kontak lewat `mailto:` dan tautan sosial.
- Breakpoint sidebar permanen: `lg` (1024px). Di bawahnya sidebar menjadi drawer dengan tombol hamburger,
  bisa ditutup dengan Escape, klik di luar, atau memilih halaman.
