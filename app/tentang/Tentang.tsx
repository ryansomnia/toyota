import { Metadata } from "next";
import Link from "next/link";


import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
export const metadata: Metadata = {
  title: "Tentang Kami – Toyota Cibubur Setiajaya | Dealer Resmi JABODETABEK",
  description:
    "Dealer resmi Toyota melayani wilayah JABODETABEK. Hubungi Daniel Sinaga untuk informasi harga, promo, simulasi kredit, dan test drive Toyota.",
  keywords:
    "dealer toyota jabodetabek, toyota cibubur setiajaya, sales toyota cibubur, showroom toyota bekasi, dealer toyota jakarta",
  alternates: { canonical: "https://mobiltoyotacibubur.com/tentang" },
  openGraph: {
    title: "Tentang Kami – Toyota Cibubur Setiajaya",
    description:
      "Dealer resmi Toyota melayani wilayah JABODETABEK dengan pelayanan profesional dan proses mudah.",
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
      <Link href="/" className="hover:text-zinc-300 transition-colors">
        Beranda
      </Link>

      <span>/</span>

      <span className="text-zinc-300">Tentang</span>
    </nav>

    <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
      Dealer Resmi · JABODETABEK
    </p>

    <h1 className="text-3xl md:text-5xl font-light text-white leading-tight mb-4">
      Tentang
      <br />
      <span className="font-black">Toyota Setiajaya</span>
    </h1>

    <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
      Dealer resmi Toyota yang melayani wilayah JABODETABEK dengan pelayanan
      profesional, harga transparan, proses mudah, serta bantuan pembelian
      mobil Toyota baru untuk pribadi maupun perusahaan.
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
<section className="max-w-6xl mx-auto px-4 py-10 md:py-20">
  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">

    {/* ── SALES CARD ───────────────────────────── */}
    <div className="relative overflow-hidden rounded-[32px] bg-white border border-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 px-8 md:px-10 pt-10 pb-9 text-white overflow-hidden">
        
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative flex items-center gap-5">
          
          {/* Photo */}
          <div className="w-24 h-24 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
            <img
              src="/images/daniel.jpeg"
              alt="Daniel Sinaga"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile */}
          <div>
            <p className="text-[11px] uppercase tracking-[4px] text-red-400 font-semibold mb-2">
              Sales Executive
            </p>

            <h2 className="text-3xl font-black leading-tight">
              Daniel Sinaga
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Toyota Cibubur – Setiajaya
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] text-zinc-200">
                Ready Stock
              </span>

              <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] text-zinc-200">
                Kredit & Cash
              </span>

              <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] text-zinc-200">
                JABODETABEK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="relative px-8 md:px-10 py-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[4px] text-zinc-400 font-semibold">
              Hubungi Langsung
            </p>

            <h3 className="text-lg font-bold text-zinc-900 mt-2">
              Fast Response Contact
            </h3>
          </div>

          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z"
              />
            </svg>
          </div>
        </div>

     {/* Contact Grid */}


    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Phone */}
      <a
        href="tel:082125061466"
        className="group rounded-3xl border border-zinc-200/70 bg-white hover:bg-zinc-50 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div className="flex items-center gap-4">
          
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
            <FaPhone className="w-5 h-5 text-white stroke-[2.5] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-zinc-400 font-medium">
              Telepon
            </p>

            <p className="font-semibold tracking-tight text-zinc-900 text-sm mt-1">
              0821-2506-1466
            </p>
          </div>
        </div>
      </a>

      {/* WhatsApp */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-3xl border border-green-200/60 bg-green-50 hover:bg-green-100/70 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
            <FaWhatsapp className="w-5 h-5 text-white stroke-[2.5] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-zinc-500 font-medium">
              WhatsApp
            </p>

            <p className="font-semibold tracking-tight text-zinc-900 text-sm mt-1">
              Chat Sekarang
            </p>
          </div>
        </div>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/daniel_toyota_cibubur"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-3xl border border-purple-200/60 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 hover:from-pink-100 hover:via-purple-100 hover:to-orange-100 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
            <FaInstagram className="w-5 h-5 text-white stroke-[2.5] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-zinc-500 font-medium">
              Instagram
            </p>

            <p className="font-semibold tracking-tight text-zinc-900 text-sm mt-1">
              @danieltoyotacibubur
            </p>
          </div>
        </div>
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@danieltoyotacibubur"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-3xl border border-zinc-200/70 bg-white hover:bg-zinc-50 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
            <FaTiktok className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-zinc-500 font-medium">
              TikTok
            </p>

            <p className="font-semibold tracking-tight text-zinc-900 text-sm mt-1">
              @danieltoyotacibubur
            </p>
          </div>
        </div>
      </a>
    </div>
      </div>
    </div>

    {/* ── LOCATION CARD ───────────────────────── */}
    <div className="flex flex-col gap-6">

      {/* Address */}
      <div className="bg-white rounded-[32px] border border-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-zinc-100">
          <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
            Lokasi Dealer
          </p>

          <h3 className="text-2xl font-black text-zinc-900 leading-tight">
            Toyota Cibubur Setiajaya
          </h3>

          <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
            Melayani pembelian mobil Toyota area JABODETABEK dengan proses cepat dan terpercaya.
          </p>
        </div>

        {/* Address Content */}
        <div className="px-8 py-6">

          

          {/* Hours */}
          <div >
            <p className="text-[11px] uppercase tracking-[4px] text-zinc-400 font-semibold mb-4">
              Jam Operasional
            </p>

            <div className="space-y-3">
              {[
                { hari: "Senin – Jumat", jam: "08.00 – 17.00 WIB" },
                { hari: "Sabtu", jam: "08.00 – 14.00 WIB" },
                { hari: "Minggu", jam: "08.00 – 17.00 WIB" },
              ].map((row) => (
                <div
                  key={row.hari}
                  className="flex items-center justify-between bg-zinc-50 rounded-xl px-4 py-3"
                >
                  <span className="text-sm text-zinc-600">
                    {row.hari}
                  </span>

                  <span className="text-sm font-bold text-zinc-900">
                    {row.jam}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maps Button */}
        <div className="px-8 pb-8">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4"
              />
            </svg>

            Buka Google Maps
          </a>
        </div>
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