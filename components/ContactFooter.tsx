"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactSection() {
  const [form, setForm] = useState({
    nama: "",
    wa: "",
    mobil: "",
    budget: "",
    pesan: "",
  });

  const handleWA = () => {
    const msg = `Halo AutoPrima 🙏

Saya ingin konsultasi pembelian mobil.

Nama: ${form.nama || "-"}
WhatsApp: ${form.wa || "-"}
Mobil diminati: ${form.mobil || "-"}
Budget: ${form.budget || "-"}
Pesan: ${form.pesan || "-"}`;

    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section
      id="kontak"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-start">
        {/* LEFT */}
        <div>
          <p className="text-sm uppercase tracking-[4px] text-red-500 font-semibold mb-4">
            Hubungi Kami
          </p>

          <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight mb-6">
            Konsultasi Gratis
            <br />
            <span className="font-semibold text-red-500">
              Tanpa Tekanan
            </span>
          </h2>

          <p className="text-lg text-slate-500 leading-relaxed max-w-xl mb-12">
            Kami siap membantu menemukan mobil terbaik sesuai kebutuhan dan budgetmu.
          </p>

          {/* Contact Cards */}
          <div className="space-y-5">
            {[
              {
                icon: "📱",
                title: "WhatsApp",
                val: "0812-3456-7890",
                sub: "Senin–Sabtu · 08.00–17.00",
              },
              {
                icon: "📍",
                title: "Showroom",
                val: "Cibinong, Bogor",
                sub: "Jl. Raya Otomotif No. 88",
              },
              {
                icon: "✉️",
                title: "Email",
                val: "info@autoprima.id",
                sub: "sales@autoprima.id",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl shrink-0">
                    {item.icon}
                  </div>

                  <div>
                    <div className="text-lg font-semibold text-slate-900 mb-1">
                      {item.title}
                    </div>

                    <div className="text-slate-700 font-medium">
                      {item.val}
                    </div>

                    <div className="text-slate-500 text-sm mt-1">
                      {item.sub}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-[36px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-7 md:p-9">
          <div className="mb-8">
            <span className="inline-flex px-4 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4">
              Form Konsultasi
            </span>

            <h3 className="text-3xl font-semibold text-slate-900 mb-2">
              Minta Dihubungi
            </h3>

            <p className="text-slate-500">
              Tim kami akan menghubungi dalam 1×24 jam.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-5">
            {[
              {
                key: "nama",
                label: "Nama Lengkap",
                placeholder: "Masukkan nama lengkap",
              },
              {
                key: "wa",
                label: "Nomor WhatsApp",
                placeholder: "08xxxxxxxxxx",
              },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {f.label}
                </label>

                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [f.key]: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 text-slate-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all"
                />
              </div>
            ))}

            {/* Select Mobil */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Mobil Diminati
              </label>

              <select
                value={form.mobil}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobil: e.target.value,
                  })
                }
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 text-slate-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all"
              >
                <option value="">Pilih mobil...</option>

                {[
                  "Toyota Fortuner",
                  "Toyota Innova Zenix",
                  "Honda HR-V",
                  "Honda Brio",
                  "Pajero Sport",
                  "Suzuki Jimny",
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Budget
              </label>

              <select
                value={form.budget}
                onChange={(e) =>
                  setForm({
                    ...form,
                    budget: e.target.value,
                  })
                }
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 text-slate-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all"
              >
                <option value="">Pilih budget...</option>

                {[
                  "< Rp 200 Juta",
                  "Rp 200 – 350 Juta",
                  "Rp 350 – 500 Juta",
                  "Rp 500 – 700 Juta",
                  "> Rp 700 Juta",
                ].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Pesan Tambahan
              </label>

              <textarea
                rows={4}
                placeholder="Tulis kebutuhan atau pertanyaanmu..."
                value={form.pesan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pesan: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 outline-none resize-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleWA}
              className="group w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center gap-3 font-semibold text-lg transition-all shadow-lg shadow-green-200"
            >
              Kirim via WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-400/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-10">
        {/* Top */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-light tracking-widest mb-5">
              AUTO
              <span className="text-red-400 font-semibold">
                PRIMA
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed mb-6">
              Dealer mobil terpercaya dengan pelayanan premium dan proses cepat.
            </p>

            <div className="flex gap-3">
              {["IG", "FB", "YT", "TK"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 hover:bg-red-400 hover:text-slate-900 transition-all flex items-center justify-center font-medium"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Katalog",
              links: [
                "Toyota Fortuner",
                "Honda HR-V",
                "Innova Zenix",
                "Suzuki Jimny",
              ],
            },
            {
              title: "Layanan",
              links: [
                "Simulasi Kredit",
                "Test Drive",
                "Tukar Tambah",
                "After Sales",
              ],
            },
            {
              title: "Informasi",
              links: [
                "Tentang Kami",
                "Promo",
                "Blog",
                "FAQ",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-lg font-semibold mb-5">
                {col.title}
              </h4>

              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-slate-500">
          <p>
            © 2025 AutoPrima. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}