"use client";

import { useState, useEffect } from "react";

function fmt(n: number) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function KreditCalc() {
  const [harga, setHarga] = useState(420000000);
  const [dp, setDp] = useState(20);
  const [tenor, setTenor] = useState(36);

  const [result, setResult] = useState({
    cicilan: 0,
    dpAmt: 0,
    pokok: 0,
    total: 0,
  });

  useEffect(() => {
    const dpAmt = harga * (dp / 100);
    const pokok = harga - dpAmt;

    const bunga = 0.09;
    const totalBunga = pokok * bunga * (tenor / 12);

    const total = pokok + totalBunga;
    const cicilan = total / tenor;

    setResult({
      cicilan,
      dpAmt,
      pokok,
      total,
    });
  }, [harga, dp, tenor]);

  const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo AutoPrima 🙏 Saya ingin ajukan kredit mobil.

Harga Mobil: ${fmt(harga)}
DP: ${dp}%
Tenor: ${tenor} bulan
Estimasi Cicilan: ${fmt(result.cicilan)}/bulan

Mohon info lebih lanjut.`
  )}`;

  return (
    <section
      id="kredit"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-start">
        {/* LEFT */}
        <div>
          <p className="text-sm uppercase tracking-[4px] text-red-500 font-semibold mb-4">
            Simulasi Kredit
          </p>

          <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight mb-6">
            Hitung Cicilan
            <br />
            <span className="font-semibold text-red-500">
              Sesuai Budget
            </span>
          </h2>

          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mb-12">
            Simulasikan kredit mobil impianmu dengan mudah. 
            Sesuaikan DP dan tenor untuk menemukan cicilan terbaik.
          </p>

          {/* Features */}
          <div className="space-y-5">
            {[
              {
                title: "Tenor Fleksibel",
                desc: "Mulai 1 hingga 7 tahun sesuai kebutuhan.",
              },
              {
                title: "DP Ringan",
                desc: "Mulai dari 10% dengan approval cepat.",
              },
              {
                title: "15+ Mitra Leasing",
                desc: "Pilihan bunga terbaik dari bank terpercaya.",
              },
              {
                title: "Proses Cepat",
                desc: "Approval hanya dalam hitungan hari kerja.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h4>

                  <p className="text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-7 md:p-9">
            {/* Heading */}
            <div className="mb-8">
              <span className="inline-flex px-4 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4">
                Kalkulator Kredit
              </span>

              <h3 className="text-3xl font-semibold text-slate-900">
                Simulasi Pembayaran
              </h3>
            </div>

            {/* Harga */}
            <div className="mb-7">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Harga Mobil
              </label>

              <input
                type="number"
                value={harga}
                onChange={(e) => setHarga(Number(e.target.value))}
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 text-lg font-medium text-slate-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all"
              />
            </div>

            {/* DP */}
            <div className="mb-7">
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">
                  Uang Muka
                </label>

                <span className="text-red-500 font-semibold">
                  {dp}%
                </span>
              </div>

              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={dp}
                onChange={(e) => setDp(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            {/* Tenor */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">
                  Tenor
                </label>

                <span className="text-red-500 font-semibold">
                  {tenor / 12} Tahun
                </span>
              </div>

              <input
                type="range"
                min={12}
                max={84}
                step={12}
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            {/* Result Card */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-7 text-white mb-7 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-56 h-56 bg-red-400/20 rounded-full blur-3xl" />

              <div className="relative">
                <p className="text-sm uppercase tracking-[3px] text-red-300 mb-3">
                  Estimasi Cicilan
                </p>

                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {fmt(result.cicilan)}
                </div>

                <div className="text-slate-400 mb-7">
                  per bulan
                </div>

                <div className="space-y-3">
                  {[
                    ["DP", fmt(result.dpAmt)],
                    ["Pokok Kredit", fmt(result.pokok)],
                    ["Total Pembayaran", fmt(result.total)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0"
                    >
                      <span className="text-slate-400">
                        {label}
                      </span>

                      <span className="font-semibold">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center gap-3 font-semibold text-lg transition-all shadow-lg shadow-green-200"
            >
              Ajukan via WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            {/* Notes */}
            <p className="text-center text-sm text-slate-400 mt-5">
              *Simulasi bunga flat 9% per tahun
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}