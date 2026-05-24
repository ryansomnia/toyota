"use client";

import { useState } from "react";
import Link from "next/link"

const WA = "6282125061466";
const WA_SERVICE = `https://wa.me/${WA}?text=${encodeURIComponent(
  "Halo Toyota 👋 Saya ingin booking service kendaraan Toyota saya. Mohon bantuannya 🙏"
)}`;
const WA_BODY = `https://wa.me/${WA}?text=${encodeURIComponent(
  "Halo Toyota 👋 Saya ingin informasi layanan Body & Paint untuk kendaraan Toyota saya 🙏"
)}`;

// ─── TABS ────────────────────────────────────────────────────────────────────
type Tab = "general" | "body";

// ─── BOOKING FORM STATE ───────────────────────────────────────────────────────
const EMPTY_FORM = {
  nama: "", whatsapp: "", email: "",
  model: "", transmisi: "", nopol: "",
  tipeService: "", tanggal: "", jam: "",
  catatan: "",
};

const CAR_MODELS = [
  "Agya", "Avanza", "Calya", "Veloz", "Innova", "Innova Zenix",
  "Fortuner", "Raize", "Yaris Cross", "Corolla Cross",
  "Rush", "Land Cruiser", "Hiace", "Hilux", "Lainnya",
];

const JAM_OPTIONS = [
  "08.00", "08.30", "09.00", "09.30", "10.00", "10.30",
  "11.00", "11.30", "13.00", "13.30", "14.00", "14.30",
  "15.00",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function PurnaJualClient() {
  const [tab, setTab] = useState<Tab>("general");



  return (
    <main className="min-h-screen bg-zinc-50">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white pt-14 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 10% 50%, #ef4444 0%, transparent 45%), radial-gradient(circle at 90% 20%, #ef4444 0%, transparent 40%)" }} />
        <div className="max-w-5xl mx-auto relative">
          <nav className="flex items-center gap-2 text-[11px] text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-zinc-300">Purna Jual</span>
          </nav>
          <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
            Bengkel Resmi Toyota · Cibubur
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-white leading-tight mb-4">
            Layanan<br />
            <span className="font-black">Purna Jual</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-lg">
            Perawatan dan perbaikan kendaraan Toyota oleh teknisi bersertifikat Toyota.
            Fasilitas standar resmi, pelayanan prima, kepuasan pelanggan adalah prioritas kami.
          </p>
        </div>
      </section>

      {/* ── TAB SWITCHER ────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-0">
            {([
              { id: "general", label: "🔧 General Repair" },
              { id: "body",    label: "🎨 Body & Paint"   },
            ] as { id: Tab; label: string }[]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 sm:flex-none px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
                  tab === t.id
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GENERAL REPAIR TAB
      ══════════════════════════════════════════════════════════════════ */}
      {tab === "general" && (
        <div>
          {/* Intro */}
          <section className="max-w-5xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
                  Bengkel Resmi Toyota
                </p>
                <h2 className="text-3xl font-black text-zinc-900 mb-4 leading-tight">
                  General Repair<br />& Perawatan Berkala
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Bengkel kami buka dari jam 08:00 hingga 17:00, dilengkapi dengan fasilitas
                  standar Toyota yang mengedepankan kepuasan pelanggan. Service Advisor
                  bersertifikat Toyota siap membantu setiap kebutuhan kendaraan Anda.
                </p>
             
              </div>
              <div className="relative h-64 md:h-[340px] overflow-hidden rounded-3xl">
  <img
    src="/images/service.png"
    alt="Bengkel Toyota Cibubur"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/20" />

  <div className="absolute bottom-4 left-4">
    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl">
      <p className="text-white text-xs font-semibold tracking-wide">
        Bengkel Resmi Toyota
      </p>
    </div>
  </div>
</div>
            </div>
          </section>

          {/* Fasilitas */}
          <section className="bg-white py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3 text-center">
                Standar Toyota Authorized Workshop
              </p>
              <h2 className="text-2xl font-black text-zinc-900 text-center mb-10">
                Fasilitas Bengkel Kami
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "🏠",
                    title: "Reception Area Bersih & Nyaman",
                    desc: "Ruang penerimaan ber-AC dengan Service Advisor bersertifikat Toyota yang siap melayani Anda.",
                  },
                  {
                    icon: "🛡️",
                    title: "Standar K3 & Ramah Lingkungan",
                    desc: "Bengkel kami menerapkan standar keselamatan kerja, kesehatan, dan lingkungan secara ketat — mulai dari APD hingga pengolahan limbah.",
                  },
                  {
                    icon: "🔩",
                    title: "Toyota SST & Intelligent Tester",
                    desc: "Dilengkapi Special Service Tools dan alat diagnostik resmi Toyota untuk memastikan perbaikan tepat dan akurat.",
                  },
                  {
                    icon: "☕",
                    title: "Ruang Tunggu Nyaman",
                    desc: "Nikmati welcome drink, snack, sofa relaksasi, televisi, dan buku bacaan sambil menunggu kendaraan Anda selesai.",
                  },
                  {
                    icon: "👨‍🔧",
                    title: "Teknisi Bersertifikat Toyota",
                    desc: "Dari Toyota Technician hingga Master Technician — semua teknisi kami telah mengikuti training berjenjang resmi Toyota.",
                  },
                  {
                    icon: "✅",
                    title: "Fixed Right on The First Time",
                    desc: "Foreman bersertifikat Toyota memastikan setiap pekerjaan selesai dengan benar di kali pertama sebelum kendaraan diserahkan.",
                  },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                    <div className="text-2xl shrink-0 mt-0.5">{f.icon}</div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm mb-1">{f.title}</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Layanan */}
          <section className="max-w-5xl mx-auto px-4 py-14">
            <h2 className="text-2xl font-black text-zinc-900 mb-8 text-center">Layanan yang Tersedia</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { icon: "🔄", label: "Servis Berkala" },
                { icon: "🛢️", label: "Ganti Oli" },
                { icon: "🔋", label: "Aki & Kelistrikan" },
                { icon: "❄️", label: "Servis AC" },
                { icon: "🚗", label: "Tune Up Mesin" },
                { icon: "🔧", label: "Rem & Kopling" },
                { icon: "💨", label: "Ganti Ban & Balancing" },
                { icon: "🔍", label: "Inspeksi Kendaraan" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-zinc-100 rounded-2xl p-4 text-center hover:border-red-200 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-zinc-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Jam Operasional */}
          <section className="bg-zinc-900 text-white py-10 px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
           
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          BODY & PAINT TAB
      ══════════════════════════════════════════════════════════════════ */}
      {tab === "body" && (
        <div>
          {/* Intro */}
          <section className="max-w-5xl mx-auto px-4 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[4px] text-red-500 font-semibold mb-3">
                  Perbaikan Bodi Kendaraan
                </p>
                <h2 className="text-3xl font-black text-zinc-900 mb-4 leading-tight">
                  Body & Paint<br />Toyota Cibubur
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                  Layanan perbaikan dan perawatan bodi kendaraan Toyota dari perbaikan ringan,
                  sedang, hingga berat. Kami memahami bahwa kendaraan Anda bukan sekadar
                  transportasi — ia adalah cerminan kebanggaan yang harus tampil prima.
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Melayani perbaikan asuransi maupun non-asuransi dengan hasil pengecatan
                  yang presisi menggunakan cat berkualitas standar Toyota.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
              
                 
                </div>
              </div>
              <div className="relative h-64 md:h-[340px] overflow-hidden rounded-3xl">
  <img
    src="/images/paint.png"
    alt="Bengkel Toyota Cibubur"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/20" />

  <div className="absolute bottom-4 left-4">
    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl">
      <p className="text-white text-xs font-semibold tracking-wide">
        Bengkel Resmi Toyota
      </p>
    </div>
  </div>
</div>
            </div>
          </section>

          {/* Layanan Body Paint */}
          <section className="bg-white py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-black text-zinc-900 text-center mb-10">Layanan Body & Paint</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    level: "Ringan",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-100 text-green-700",
                    items: ["Perbaikan baret halus", "Pengecatan parsial", "Poles & wax", "Perbaikan dent kecil"],
                  },
                  {
                    level: "Sedang",
                    color: "border-yellow-200 bg-yellow-50",
                    badge: "bg-yellow-100 text-yellow-700",
                    items: ["Perbaikan bodi penyok", "Pengecatan panel", "Perbaikan bumper", "Corrective painting"],
                  },
                  {
                    level: "Berat",
                    color: "border-red-200 bg-red-50",
                    badge: "bg-red-100 text-red-700",
                    items: ["Perbaikan kecelakaan", "Full body repair", "Pengecatan menyeluruh", "Penggantian panel"],
                  },
                ].map((tier) => (
                  <div key={tier.level} className={`border rounded-2xl p-6 ${tier.color}`}>
                    <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${tier.badge}`}>
                      Perbaikan {tier.level}
                    </span>
                    <ul className="space-y-2">
                      {tier.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-zinc-700">
                          <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Keunggulan */}
          <section className="max-w-5xl mx-auto px-4 py-14">
            <h2 className="text-2xl font-black text-zinc-900 text-center mb-8">Mengapa Pilih Kami?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🎯", title: "Hasil Presisi", desc: "Cat sesuai warna asli kendaraan" },
                { icon: "🏆", title: "Teknisi Tersertifikasi", desc: "Terlatih langsung oleh Toyota" },
                { icon: "📋", title: "Melayani Asuransi", desc: "Proses klaim dibantu tim kami" },
                { icon: "⚡", title: "Pengerjaan Cepat", desc: "Estimasi waktu transparan" },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-zinc-100 rounded-2xl p-5 text-center hover:shadow-sm transition-all">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-zinc-900 mb-1">{item.title}</p>
                  <p className="text-[11px] text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          BOOKING FORM (shared untuk keduanya)
      ══════════════════════════════════════════════════════════════════ */}
     
    </main>
  );
}