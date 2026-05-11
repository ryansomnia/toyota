# AutoPrima – Next.js Car Sales Website

Website company profile sales mobil yang elegan, SEO-optimized, dan mobile-responsive.

## 🚀 Quick Start

```bash
# 1. Masuk ke folder project
cd autoprima

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
# Buka http://localhost:3000

# 4. Build untuk production
npm run build
npm start
```

## 📁 Struktur Project

```
autoprima/
├── app/
│   ├── layout.tsx          ← Root layout + global metadata + JSON-LD schema
│   ├── page.tsx            ← Homepage
│   ├── globals.css         ← Global styles + design tokens
│   ├── sitemap.ts          ← Auto-generated sitemap.xml
│   ├── robots.ts           ← robots.txt
│   ├── katalog/            ← Halaman katalog
│   ├── promo/              ← Halaman promo
│   ├── kredit/             ← Halaman simulasi kredit
│   ├── tentang/            ← Halaman tentang kami
│   └── kontak/             ← Halaman kontak
├── components/
│   ├── Navbar.tsx          ← Sticky navbar + mobile menu
│   ├── Hero.tsx            ← Hero section dengan parallax
│   ├── Marquee.tsx         ← Ticker/marquee bar
│   ├── CatalogSection.tsx  ← Grid katalog dengan filter
│   ├── Sections.tsx        ← Promo, WhyUs, Testimonial
│   ├── KreditCalc.tsx      ← Kalkulator kredit interaktif
│   ├── ContactFooter.tsx   ← Form kontak + Footer
│   └── ScrollReveal.tsx    ← Scroll animation hook
├── public/
│   └── og-image.jpg        ← ⚠️ Tambahkan gambar 1200×630px
└── ...
```

## 🔧 Konfigurasi Wajib

### 1. Ganti nomor WhatsApp
Cari `6281234567890` di semua file, ganti dengan nomor WA sales:
```
0812-3456-7890 → 08XX-XXXX-XXXX
```

### 2. Ganti domain
Cari `autoprima.id` di semua file, ganti dengan domain kamu.

### 3. Tambahkan OG Image
Buat file `public/og-image.jpg` ukuran 1200×630px berisi logo + tagline.

### 4. Google Search Console
Di `app/layout.tsx`, ganti `YOUR_GOOGLE_VERIFICATION_CODE` dengan kode verifikasi dari Google Search Console.

### 5. Google Analytics (opsional)
Install `@next/third-parties` dan tambahkan:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'
// Di layout.tsx:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

## 🎨 Kustomisasi Warna

Di `app/globals.css`:
```css
:root {
  --gold: #C9973C;        ← Warna aksen utama
  --gold-light: #E8C97A;  ← Warna aksen terang
  --gold-dark: #7A5820;   ← Warna aksen gelap
  --ink: #0A0A0A;         ← Background utama
}
```

## 📦 Menambah Mobil Baru

Edit array `CARS` di `components/CatalogSection.tsx`:
```tsx
{
  id: 9,
  brand: "Daihatsu",
  name: "Rocky",
  type: "SUV",           // SUV | MPV | Sedan | City Car | Pickup
  year: 2024,
  price: 235,            // dalam juta rupiah
  fuel: "Bensin",
  tx: "CVT",
  seats: 5,
  badge: "new",          // new | hot | promo | ""
  emoji: "🚙",
  slug: "daihatsu-rocky"
}
```

## 🌐 Deploy ke Vercel (Gratis!)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Atau push ke GitHub dan connect ke vercel.com
```

## 🔍 SEO Checklist

- [x] Metadata title & description per halaman
- [x] Open Graph tags (Facebook, WhatsApp preview)
- [x] Twitter Card
- [x] JSON-LD Schema (AutoDealer + AggregateRating)
- [x] Sitemap.xml otomatis
- [x] Robots.txt
- [x] Canonical URL
- [x] next/font (zero layout shift)
- [x] next/image (WebP + lazy loading)
- [x] SSG (Static Site Generation) untuk performa max
- [ ] Google Search Console verification (isi kode)
- [ ] Submit sitemap ke Google Search Console
- [ ] Google Business Profile (daftar di maps.google.com/business)
- [ ] Tambah konten blog mingguan (artikel tips beli mobil)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px – 1024px  
- Desktop: > 1024px

## 💡 Tips SEO Tambahan

1. **Daftarkan ke Google Business Profile** – ini WAJIB untuk ranking lokal
2. **Minta review Google** dari setiap pembeli – rating mempengaruhi ranking
3. **Blog rutin** – tulis artikel "Harga Toyota Fortuner Cibinong 2025" dll
4. **Backlink** – minta dicantumkan di forum otomotif, Instagram, dll
5. **Kecepatan** – deploy di Vercel agar Core Web Vitals optimal
