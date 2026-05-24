import Link from "next/link";

const PROMOS = [
  {
    icon: "💰",
    title: "Cashback Puluhan Juta",
    desc: "Khusus pembelian unit tertentu bulan ini",
  },

  {
    icon: "🛡️",
    title: "Free Asuransi All-Risk",
    desc: "Proteksi penuh kendaraan barumu gratis",
  },
  {
    icon: "🔄",
    title: "Trade-In",
    desc: "Layanan Tukar tambah untuk merk mobil apapun",
  },
];

const WHY = [
  {
    icon: "🏆",
    num: "12+",
    title: "Tahun Pengalaman",
    desc: "Lebih dari satu dekade melayani ribuan keluarga.",
  },
  {
    icon: "🏦",
    num: "15+",
    title: "Mitra Bank",
    desc: "Bunga kompetitif dan approval lebih cepat.",
  },
  {
    icon: "⚡",
    num: "1×24j",
    title: "Respons Cepat",
    desc: "Customer support aktif setiap hari kerja.",
  },
  {
    icon: "🚗",
    num: "250+",
    title: "Unit Ready",
    desc: "Pilihan mobil baru & bekas berkualitas.",
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote:
      "Pelayanannya luar biasa cepat dan transparan. Saya sangat puas dengan proses pembeliannya.",
    name: "Budi Raharjo",
    city: "Bogor",
    car: "Toyota Fortuner",
    initial: "BR",
  },
  {
    stars: 5,
    quote:
      "Dealer paling responsif yang pernah saya temui. Harga terbaik dan proses mudah.",
    name: "Siti Maryam",
    city: "Depok",
    car: "Honda HR-V",
    initial: "SM",
  },
  {
    stars: 5,
    quote:
      "Sudah dua kali beli mobil di sini dan selalu puas. Highly recommended!",
    name: "Ahmad Hidayat",
    city: "Bekasi",
    car: "Innova Zenix",
    initial: "AH",
  },
];

export function PromoSection() {
  return (
    <section
      id="promo"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 blur-3xl opacity-30 rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-100 blur-3xl opacity-30 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-14">
          <p className="text-sm uppercase tracking-[4px] text-red-500 font-semibold mb-4">
            Penawaran Eksklusif
          </p>

          <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight">
            Promo Mobil
            <br />
            <span className="font-semibold text-red-500">
              Terbaik Bulan Ini
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Big Promo */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">
            <div className="absolute right-0 top-0 w-72 h-72 bg-red-400/20 blur-3xl rounded-full" />

            <div className="relative z-10">
              <span className="inline-flex bg-red-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                🔥 Promo Terbaru
              </span>

              <h3 className="text-4xl md:text-5xl font-light leading-tight mb-6">
                DP Ringan
                <br />
                Cicilan Mulai
                <br />
                <span className="font-semibold text-red-400">
                  2 Jutaan
                </span>
              </h3>

              <p className="text-slate-300 leading-relaxed max-w-lg mb-8">
                Kemudahan memiliki mobil impian dengan tenor fleksibel,
                approval cepat, dan bunga kompetitif.
              </p>

              <Link
  href="https://wa.me/6282125061466?text=Halo%20Toyota%2C%20saya%20ingin%20tanya%20promo"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 bg-red-400 hover:bg-red-300 text-slate-900 px-7 py-4 rounded-2xl font-semibold transition-all hover:gap-4"
>
  Tanya Promo
  <span>→</span>
</Link>
            </div>
          </div>

          {/* Promo List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {PROMOS.map((p) => (
              <div
                key={p.title}
                className="group bg-white/70 backdrop-blur-xl border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
                    {p.icon}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-red-500 transition-colors">
                      {p.title}
                    </h4>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// export function WhySection() {
//   return (
//     <section className="py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <p className="text-sm uppercase tracking-[4px] text-red-500 font-semibold mb-4">
//             Mengapa Memilih Kami
//           </p>

//           <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight">
//             Dipercaya
//             <br />
//             <span className="font-semibold text-red-500">
//               Ribuan Keluarga
//             </span>
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
//           {WHY.map((w) => (
//             <div
//               key={w.title}
//               className="group rounded-[28px] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
//             >
//               <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl mb-6">
//                 {w.icon}
//               </div>

//               <div className="text-5xl font-bold text-slate-900 mb-3">
//                 {w.num}
//               </div>

//               <h3 className="text-xl font-semibold text-slate-900 mb-3">
//                 {w.title}
//               </h3>

//               <p className="text-slate-500 leading-relaxed">
//                 {w.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export function TestimonialSection() {
//   return (
//     <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <p className="text-sm uppercase tracking-[4px] text-red-500 font-semibold mb-4">
//             Testimoni Pelanggan
//           </p>

//           <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight">
//             Cerita Mereka
//             <br />
//             <span className="font-semibold text-red-500">
//               Tentang Kami
//             </span>
//           </h2>
//         </div>

//         {/* Cards */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {TESTIMONIALS.map((t) => (
//             <div
//               key={t.name}
//               className="group bg-white rounded-[30px] p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
//             >
//               {/* Stars */}
//               <div className="flex gap-1 text-red-400 text-lg mb-6">
//                 {"★".repeat(t.stars)}
//               </div>

//               {/* Quote */}
//               <blockquote className="text-slate-600 leading-relaxed mb-8 text-[15px]">
//                 "{t.quote}"
//               </blockquote>

//               {/* User */}
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-orange-400 text-white flex items-center justify-center font-semibold">
//                   {t.initial}
//                 </div>

//                 <div>
//                   <div className="font-semibold text-slate-900">
//                     {t.name}
//                   </div>

//                   <div className="text-sm text-slate-500">
//                     {t.city} · {t.car}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }