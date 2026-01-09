# 🎾 OOMA Padel & Eatery - Sistem Manajemen

![OOMA Padel Banner](public/logohitam.png)

Aplikasi web modern dan komprehensif untuk mengelola operasional OOMA Padel & Eatery. Sistem ini menangani segalanya mulai dari halaman landing publik hingga dashboard admin lengkap untuk mengelola menu, kategori, lapangan padel, dan reservasi.

Dibangun dengan **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Prisma ORM**.

---

## 🚀 Fitur Utama

### 🌍 Antarmuka Publik
- **Landing Page Modern**: Desain responsif yang menampilkan restoran dan lapangan padel.
- **Lihat Menu**: Menampilkan daftar makanan dan minuman yang tersedia.
- **Info & Lokasi**: Integrasi Google Maps dan informasi kontak.

### 🛡️ Dashboard Admin (`/admin`)
Dashboard aman dan terautentikasi untuk staf dan manajemen.

#### 📊 Ringkasan Dashboard
- **Statistik Real-time**: Melihat total menu aktif, kategori, lapangan, dan booking hari ini.
- **Visual Insights**: Ringkasan cepat operasional harian.

#### 🍽️ Manajemen Menu
- **Operasi CRUD Lengkap**: Tambah, Lihat, Edit, dan Hapus item menu.
- **Upload Gambar**: Upload dan preview gambar menu secara lokal (bisa diperluas ke Cloud storage).
- **Filter Canggih**: Filter menu berdasarkan Kategori, Status (Tersedia/Kosong), dan Atribut (Pedas/Rekomendasi Chef).
- **Manajemen Kategori**: Mengatur item menu ke dalam kategori kustom dengan dukungan pengurutan.

#### 🎾 Manajemen Lapangan Padel
- **Kontrol Lapangan**: Mengelola ketersediaan lapangan (Aktif/Maintenance) dan harga per jam.
- **Penjadwal Booking (Scheduler)**:
  - **Kalender Visual**: Tampilan grid interaktif booking per jam dan per lapangan.
  - **Deteksi Bentrok**: Pencegahan otomatis untuk booking yang tumpang tindih.
  - **Kalkulasi Harga**: Estimasi biaya otomatis berdasarkan durasi.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Autentikasi**: [NextAuth.js](https://next-auth.js.org/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)

---

## ⚡ Panduan Instalasi

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal.

### Prasyarat
- Node.js 18+ terinstall
- Database PostgreSQL (lokal atau cloud seperti Neon)

### 1. Clone repository
```bash
git clone https://github.com/username-anda/ooma-padel.git
cd ooma-padel
```

### 2. Install Dependensi
```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di direktori root dan tambahkan konfigurasi berikut:

```env
# Koneksi Database
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# Konfigurasi NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="kunci-rahasia-anda-ganti-ini"

# Kredensial Admin (untuk seed/akses awal)
ADMIN_EMAIL="admin@ooma.com"
ADMIN_PASSWORD="securepassword"
```

### 4. Setup Database
Push schema ke database dan generate Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

(Opsional) Seed database dengan data awal:
```bash
npx prisma db seed
```

### 5. Jalankan Server Development
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.
Akses panel admin di [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 📂 Struktur Proyek

```bash
src/
├── app/
│   ├── (public)/          # Route Publik (Landing page)
│   ├── admin/             # Route Admin (Dashboard, login)
│   │   ├── (authenticated)/ # Route admin yang dilindungi
│   │   │   ├── bookings/  # Halaman scheduler booking
│   │   │   ├── courts/    # Halaman manajemen lapangan
│   │   │   ├── menu/      # Halaman CRUD menu
│   │   │   └── ...
│   ├── api/               # API Route Handlers (Next.js 15)
│   │   ├── bookings/      # Logic CRUD & Cek Bentrok Booking
│   │   ├── menus/         # API Menu
│   │   └── upload/        # Handler upload file
├── components/
│   ├── admin/             # Komponen khusus Admin (Sidebar, dll.)
│   ├── layout/            # Komponen Layout (Header, Footer)
│   └── ui/                # Komponen UI Reusable (Button, Modal, Card)
├── lib/                   # Utilities (Prisma client, Auth options)
└── types/                 # Definisi tipe TypeScript
```

---

## 🔒 Catatan Keamanan & Deployment

- **Penyimpanan Gambar**: Saat ini menggunakan sistem file lokal (`public/uploads`). Untuk produksi (Vercel/Netlify), harap konfigurasikan provider object storage (AWS S3, Vercel Blob, atau Cloudinary) di `src/app/api/upload/route.ts`.
- **Autentikasi**: Pastikan `NEXTAUTH_SECRET` kuat dan rahasia saat di produksi.
- **Database**: Gunakan connection pooler (seperti Supabase Transaction Pooler atau Neon Pooling) untuk performa lebih baik di lingkungan serverless.

---

## 🎨 Tema UI

Antarmuka mengikuti **Identitas Brand OOMA**:
- **Warna Utama**: Terracotta Orange (`#d96435`)
- **Aksen**: Dark Wood (`#4a3f35`)
- **Background**: Soft Sage & Netral

---

© 2026 OOMA Padel & Eatery. Hak Cipta Dilindungi.
