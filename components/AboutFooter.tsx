"use client";

import Link from "next/link";

export function ContactSection() {
  return (
    <section
      id="tentang"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-[100px] opacity-40 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200 rounded-full blur-[100px] opacity-40 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT - Narrative & Philosophy */}
        <div className="order-2 lg:order-1">
          <p className="text-[10px] uppercase tracking-[5px] text-red-600 font-black mb-6">
            Legacy of Excellence
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-[#0A0A0A] leading-[1.1] mb-8 tracking-tighter">
            Dedikasi Untuk 
            <br />
            <span className="text-red-600">Kepuasan Anda.</span>
          </h2>

          <div className="space-y-6 text-slate-600 leading-relaxed text-lg max-w-xl">
            <p>
              Berawal dari komitmen untuk memberikan layanan otomotif terbaik, 
              <span className="font-bold text-[#0A0A0A]"> Setia Jaya Toyota Cibubur </span> 
              telah tumbuh menjadi mitra terpercaya bagi ribuan pelanggan di area Bogor dan sekitarnya.
            </p>
            <p>
              Kami tidak hanya sekadar menjual kendaraan; kami memberikan solusi mobilitas yang personal, 
              mulai dari konsultasi unit yang tepat hingga layanan purna jual yang tanpa celah.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { label: "Pengalaman", val: "15+ Thn" },
              { label: "Unit Terkirim", val: "10rb+" },
              { label: "Layanan", val: "24/7" },
              { label: "Kepuasan", val: "99%" },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-red-600 pl-4">
                <div className="text-2xl font-black text-[#0A0A0A]">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Visual Focus & Value Cards */}
        <div className="order-1 lg:order-2">
          <div className="relative">
            {/* Main Featured Card */}
            <div className="rounded-[40px] border border-white bg-white/40 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.08)] p-10 md:p-14 relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 -mr-16 -mt-16 rounded-full" />
                
                <h3 className="text-2xl font-black text-[#0A0A0A] mb-8 tracking-tight">
                    Mengapa Memilih <br/>Setia Jaya?
                </h3>

                <div className="space-y-8">
                    {[
                        { 
                            title: "Proses Cepat & Transparan", 
                            desc: "Administrasi yang efisien tanpa biaya tersembunyi.",
                            icon: "⚡"
                        },
                        { 
                            title: "Pilihan Unit Terlengkap", 
                            desc: "Mulai dari seri Hybrid terbaru hingga varian GR Sport.",
                            icon: "🚗"
                        },
                        { 
                            title: "Promo Eksklusif", 
                            desc: "Penawaran DP rendah dan bunga 0% khusus bulan ini.",
                            icon: "💎"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0A0A0A] mb-1">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Floating Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-3xl -z-0 rotate-12 opacity-10" />
          </div>
        </div>

      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Subtile Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/5">
          
          {/* Brand Identity */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black tracking-tighter mb-6">
              SETIA<span className="text-red-600">JAYA</span>
              <span className="block text-[8px] tracking-[4px] text-slate-500 font-bold uppercase mt-1">ToyotaCibubur</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              Dealer resmi Toyota dengan standar pelayanan internasional. Kami hadir untuk mewujudkan kendaraan impian Anda.
            </p>

            <div className="flex gap-4">
              {["IG", "FB", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-red-600 hover:border-red-600 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {[
            {
              title: "Model Terlaris",
              links: ["Innova Zenix", "Avanza & Veloz", "Fortuner GR", "Raize Sport"],
            },
            {
              title: "Layanan",
              links: ["Simulasi Kredit", "Booking Service", "Trade-in Service", "Test Drive"],
            },
            {
              title: "Perusahaan",
              links: ["Tentang Kami", "Promo Terbaru", "Lokasi Showroom", "Karir"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[3px] font-black text-white mb-8">
                {col.title}
              </h4>

              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-slate-500 text-sm hover:text-red-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Area */}
        <div className="pt-12 flex flex-col md:flex-row gap-6 items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-600">
          <p>© 2026 SETIA JAYA TOYOTA CIBUBUR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}