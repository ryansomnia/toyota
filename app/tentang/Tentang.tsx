import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami – Toyota Cibubur Setiajaya | Dealer Resmi",
  description:
    "Dealer resmi Toyota di Cibubur & Bekasi. Hubungi sales kami Daniel Sinaga untuk informasi harga, promo, dan test drive. Lokasi di Jl. Alternative Cibubur No. 42, Jatisampurna.",
  keywords:
    "dealer toyota cibubur, toyota setiajaya cibubur, sales toyota cibubur, showroom toyota bekasi, jl alternative cibubur",
  alternates: { canonical: "https://mobiltoyotacibubur.com/tentang" },
  openGraph: {
    title: "Tentang Kami – Toyota Cibubur Setiajaya",
    description: "Dealer resmi Toyota di Cibubur & Bekasi. Sales siap bantu, lokasi mudah dijangkau.",
    url: "https://mobiltoyotacibubur.com/tentang",
    siteName: "Toyota Cibubur – Setiajaya",
    locale: "id_ID",
    type: "website",
  },
};

const WA_LINK =
  "https://wa.me/6282125061466?text=Halo%20*Toyota%20Cibubur%20Setiajaya*%2C%20saya%20telah%20mengunjungi%20mobiltoyotacibubur.com%20dan%20saya%20ingin%20informasi%20lengkap%20mengenai%20Mobil%20Toyota";
const MAPS_LINK =
  "https://www.google.com/maps/place/TOYOTA+CIBUBUR+SETIAJAYA/@-6.37603,106.9125277,17z/data=!4m8!1m2!2m1!1stoyota+cibubur!3m4!1s0x2e699312a7311949:0xf6ce1d1230a9e039!8m2!3d-6.3756939!4d106.9126897";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-zinc-50">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white pt-14 pb-16 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, #ef4444 0%, transparent 45%), radial-gradient(circle at 85% 20%, #ef4444 0%, transparent 40%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-zinc-300">Tentang</span>
          </nav>

          <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
            Dealer Resmi · Cibubur & Bekasi dan Sekitarnya
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-white leading-tight mb-4">
            Tentang<br />
            <span className="font-black">Toyota Setiajaya</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-lg">
            Dealer resmi Toyota yang melayani wilayah Cibubur, Bekasi, dan sekitarnya.
            Sales berpengalaman, harga transparan, proses mudah.
          </p>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="bg-red-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
 { number: "250+", label: "Unit Ready Stock" },
 { number: "20+", label: "Tahun Pengalaman" },
 { number: "1.5k", label: "Happy Clients" },
 { number: "15+", label: "Mitra Bank " },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-black">{s.number}</p>
              <p className="text-red-200 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SALES PROFILE + KONTAK ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Sales Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 px-8 pt-10 pb-8 text-white relative">
              {/* Avatar placeholder */}
            {/* Profile Photo */}
<div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 mb-4 shadow-lg">
  <img
    src="/images/daniel.jpeg"
    alt="Daniel Sinaga"
    className="w-full h-full object-cover"
  />
</div>
              <p className="text-[10px] uppercase tracking-[3px] text-red-400 font-semibold mb-1">
                Sales Executive
              </p>
              <h2 className="text-2xl font-black text-white">Daniel Sinaga</h2>
              <p className="text-zinc-400 text-xs mt-1">Toyota Cibubur – Setiajaya</p>
            </div>

            <div className="px-8 py-6 space-y-4">
              <p className="text-[10px] uppercase tracking-[3px] text-zinc-400 font-semibold">
                Hubungi Langsung
              </p>

              {/* Telepon */}
              <a
                href="tel:082125061466"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-200 group-hover:bg-zinc-300 flex items-center justify-center transition-colors shrink-0">
                  <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Telepon</p>
                  <p className="text-sm font-bold text-zinc-900">0821-2075-1946</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.946 7.946 0 01-3.786-.964L4.5 19.5l1.617-3.664a7.93 7.93 0 01-1.046-3.948c0-4.411 3.588-7.999 8-7.999s8 3.588 8 8-3.589 7.991-8.042 7.991z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">WhatsApp</p>
                  <p className="text-sm font-bold text-zinc-900">0821-2075-1946</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/toyotacibubur.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Instagram</p>
                  <p className="text-sm font-bold text-zinc-900">@toyotacibubur.id</p>
                </div>
              </a>
            </div>
          </div>

          {/* Lokasi Card */}
          <div className="flex flex-col gap-6">

            {/* Alamat */}
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
              {/* <p className="text-[10px] uppercase tracking-[3px] text-zinc-400 font-semibold mb-5">
                Lokasi Dealer
              </p> */}
              <div className="flex gap-4 items-start mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm leading-snug">
                    Jl. Alternative Cibubur No. 42
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">Jatisampurna, Bekasi</p>
                </div>
              </div>

              {/* Jam operasional */}
              <div className="border-t border-zinc-50 pt-5 space-y-2">
                <p className="text-[10px] uppercase tracking-[3px] text-zinc-400 font-semibold mb-3">
                  Jam Operasional
                </p>
                {[
                  { hari: "Senin – Jumat", jam: "08.00 – 17.00 WIB" },
                  { hari: "Sabtu",         jam: "08.00 – 15.00 WIB" },
                  { hari: "Minggu",        jam: "Tutup"              },
                ].map((row) => (
                  <div key={row.hari} className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">{row.hari}</span>
                    <span className={`font-semibold ${row.jam === "Tutup" ? "text-red-400" : "text-zinc-900"}`}>
                      {row.jam}
                    </span>
                  </div>
                ))}
              </div>

              {/* <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Buka di Google Maps
              </a> */}
            </div>

            {/* Embedded map */}
            <div className="rounded-3xl overflow-hidden border border-zinc-100 shadow-sm" style={{ height: 220 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3!2d106.9125277!3d-6.37603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699312a7311949%3A0xf6ce1d1230a9e039!2sTOYOTA%20CIBUBUR%20SETIAJAYA!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Toyota Cibubur Setiajaya"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-14 px-4 text-center">
        <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
          Siap Membantu
        </p>
        <h2 className="text-2xl md:text-3xl font-black mb-2">
          Ada yang ingin ditanyakan?
        </h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
          Daniel siap bantu kamu dari pemilihan model, simulasi kredit, hingga test drive — gratis tanpa tekanan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white font-black px-8 py-4 rounded-full transition-colors shadow-lg shadow-green-900/20 text-sm uppercase tracking-widest"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.946 7.946 0 01-3.786-.964L4.5 19.5l1.617-3.664a7.93 7.93 0 01-1.046-3.948c0-4.411 3.588-7.999 8-7.999s8 3.588 8 8-3.589 7.991-8.042 7.991z"/>
            </svg>
            Chat WhatsApp
          </a>
          
        </div>
      </section>
    </main>
  );
}