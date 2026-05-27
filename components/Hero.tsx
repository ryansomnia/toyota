// "use client";

// const STATS = [
//   { num: "250+", label: "Unit Ready Stock" },
//   { num: "12+", label: "Tahun Pengalaman" },
//   { num: "1.5k", label: "Happy Clients" },
//   { num: "0%", label: "Bunga Promo" },
// ];

// const WA = "6282125061466";

// export default function Hero() {
//   return (
//     <section
//       id="hero"
//       className="
//         relative overflow-hidden
//         bg-white
//         min-h-screen
//         flex items-center
//       "
//     >
//       {/* BACKGROUND */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-0 w-[45%] h-full bg-zinc-50 skew-x-[-14deg] translate-x-24" />

//         <div className="absolute -bottom-20 left-0 text-[22vw] font-black text-zinc-50 uppercase leading-none">
//           Toyota
//         </div>

//         <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />

//         <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
//       </div>

//       <div
//         className="
//           relative z-10
//           max-w-7xl mx-auto
//           px-6 md:px-10
//           py-24
//           grid lg:grid-cols-2
//           gap-16
//           items-center
//         "
//       >
//         {/* LEFT */}
//         <div>
//           {/* LABEL */}
//           <div className="flex items-center gap-3 mb-7">
//             <span className="w-10 h-[3px] bg-red-600 rounded-full" />

//             <span className="text-[11px] font-black tracking-[4px] uppercase text-red-600">
//               Toyota Authorized Dealer
//             </span>
//           </div>

//           {/* TITLE */}
//           <h1
//             className="
//               text-[52px]
//               sm:text-[68px]
//               lg:text-[92px]
//               font-black
//               leading-[0.88]
//               tracking-[-4px]
//               uppercase
//               text-zinc-900
//               mb-8
//             "
//           >
//             Drive <br />

//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
//               Prestige
//             </span>

//             <br />
//             Everyday.
//           </h1>

//           {/* DESC */}
//           <p
//             className="
//               text-zinc-500
//               text-sm md:text-base
//               leading-relaxed
//               max-w-xl
//               mb-10
//             "
//           >
//             Temukan pengalaman membeli mobil Toyota yang lebih modern,
//             transparan, dan eksklusif dengan promo terbaik serta layanan
//             profesional terpercaya.
//           </p>

//           {/* BUTTON */}
//           <div className="flex flex-wrap gap-4 mb-14">
//             <a
//               href={`https://wa.me/${WA}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="
//                 px-8 py-4
//                 rounded-2xl
//                 bg-zinc-900
//                 text-white
//                 text-[11px]
//                 uppercase
//                 tracking-[2px]
//                 font-black
//                 hover:bg-red-600
//                 transition-all
//                 shadow-xl shadow-black/10
//               "
//             >
//               Konsultasi Sekarang
//             </a>

//             <a
//               href="#katalog"
//               className="
//                 px-8 py-4
//                 rounded-2xl
//                 border border-zinc-200
//                 text-zinc-700
//                 text-[11px]
//                 uppercase
//                 tracking-[2px]
//                 font-black
//                 hover:border-zinc-900
//                 hover:bg-zinc-900
//                 hover:text-white
//                 transition-all
//               "
//             >
//               Lihat Katalog
//             </a>
//           </div>

//           {/* STATS */}
//           <div
//             className="
//               grid grid-cols-2 sm:grid-cols-4
//               gap-6
//               pt-8
//               border-t border-zinc-100
//             "
//           >
//             {STATS.map((s, i) => (
//               <div key={i}>
//                 <p className="text-2xl font-black text-zinc-900">
//                   {s.num}
//                 </p>

//                 <p
//                   className="
//                     text-[10px]
//                     uppercase
//                     tracking-[2px]
//                     font-bold
//                     text-zinc-400
//                     mt-1
//                   "
//                 >
//                   {s.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="relative">
//           {/* CARD */}
//           <div
//             className="
//               relative
//               bg-white
//               rounded-[32px]
//               border border-zinc-100
//               shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]
//               overflow-hidden
//             "
//           >
//             {/* IMAGE BG */}
//             <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white" />

//             {/* FLOAT BADGE */}
//             <div
//               className="
//                 absolute top-5 left-5 z-20
//                 px-4 py-2
//                 rounded-full
//                 bg-red-600
//                 text-white
//                 text-[10px]
//                 uppercase
//                 tracking-[2px]
//                 font-black
//                 shadow-lg
//               "
//             >
//               Best Seller 2026
//             </div>

//             {/* CAR IMAGE */}
//             <div
//               className="
//                 relative z-10
//                 p-8 md:p-12
//                 flex items-center justify-center
//               "
//             >
//               <img
//                 src="/images/hero-car.png"
//                 alt="Toyota Hero"
//                 className="
//                   w-full
//                   object-contain
//                   drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)]
//                   hover:scale-[1.03]
//                   transition-all duration-700
//                 "
//               />
//             </div>

//             {/* FLOATING CARD */}
//             <div
//               className="
//                 absolute bottom-5 left-5
//                 bg-white/90 backdrop-blur
//                 border border-zinc-100
//                 rounded-2xl
//                 px-5 py-4
//                 shadow-xl
//               "
//             >
//               <p className="text-[10px] uppercase tracking-[2px] text-zinc-400 font-bold mb-1">
//                 Promo Bulan Ini
//               </p>

//               <p className="text-lg font-black text-zinc-900">
//                 DP Mulai 20 Jutaan
//               </p>
//             </div>
//           </div>

//           {/* DECOR */}
//           <div className="absolute -top-6 -right-6 w-full h-full border-2 border-zinc-100 rounded-[32px] -z-10" />

//           <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-red-500/10 rounded-full blur-3xl -z-10" />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STATS = [
  { num: "250+", label: "Unit Ready Stock" },
  { num: "20+", label: "Tahun Pengalaman" },
  { num: "1.5k", label: "Happy Clients" },
  { num: "15+", label: "Mitra Bank " },
];

const WA = "6282125061466";

function fmt(v?: number) {
  if (!v) return "Hubungi Kami";

  return (
    "Rp " +
    Number(v).toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    })
  );
}

export default function Hero() {
  const [cars, setCars] = useState<any[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars?limit=5");

        const json = await res.json();

        const featured =
          json?.data?.filter((c: any) => c.isFeatured) || [];

        setCars(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (!cars.length) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % cars.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [cars]);

  const activeCar = cars?.[activeIdx];

  return (
    <section
      id="hero"
      className="
        relative
        min-h-[100svh] md:min-h-screen
        overflow-hidden
        bg-black
      "
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        {!loading && activeCar?.thumbnailUrl ? (
          <img
            src={activeCar.thumbnailUrl}
            alt={activeCar.fullName}
            className="
              w-full
              h-full
              object-cover
              scale-110
              opacity-40
              transition-all
              duration-1000
            "
          />
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/90
            via-black/70
            to-black/40
          "
        />

        {/* BOTTOM FADE */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-60
            bg-gradient-to-t
            from-black
            to-transparent
          "
        />
      </div>

      {/* MAIN */}
      <div
        className="
          relative z-10
          max-w-7xl
          mx-auto
          px-6 md:px-10
        min-h-[100svh] md:min-h-screen
          grid
          lg:grid-cols-2
          gap-10
          items-center
          py-24
        "
      >
        {/* LEFT */}
        <div>
          {/* LABEL */}
          <div className="flex items-center gap-3 mb-7">
            <span className="w-12 h-[2px] bg-red-500" />

            <span
              className="
                text-white/90
                text-[11px]
                font-black
                uppercase
                tracking-[4px]
              "
            >
              Authorized Toyota Dealer
            </span>
          </div>

          {/* TITLE */}
          <h1
            className="
              text-white
              font-black
              uppercase
              leading-[0.9]
              tracking-[-3px]
              text-[50px]
              sm:text-[72px]
              md:text-[92px]
            "
          >
            LET'S
         
            <br />

            <span className="text-red-500">
            GO 
            </span>

            <br />
             BEYOND.
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              mt-7
              text-white/70
              text-sm
              md:text-lg
              leading-relaxed
              max-w-xl
              
            "
          >
            Mobil Toyota Bukan Hanya Sekedar Kendaraan, Oleh Sebab Itu Toyota Selalu Berinofasi Lebih dari 30 Tahun Untuk Masyarakat Indonesia Tidak Hanya Menciptakan Produk Tapi Untuk Investasi Kenyamanan dan Keamanan Untuk Setiap Perjalanan Keluarga di Indonesia .

          </p>

          {/* BUTTON */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-14
                px-8
                rounded-full
                bg-red-600
                hover:bg-red-700
                transition-all
                text-white
                font-black
                uppercase
                tracking-[2px]
                text-[11px]
                inline-flex
                items-center
                justify-center
                shadow-[0_20px_40px_rgba(220,38,38,0.35)]
              "
            >
              Konsultasi Sekarang
            </a>

            <Link
              href="/produk"
              className="
                h-14
                px-8
                rounded-full
                border
                border-white/20
                bg-white/10
                backdrop-blur-md
                hover:bg-white/20
                transition-all
                text-white
                font-black
                uppercase
                tracking-[2px]
                text-[11px]
                inline-flex
                items-center
                justify-center
              "
            >
              Lihat Produk
            </Link>
          </div>

          {/* STATS */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-4
              mt-16
            "
          >
            {STATS.map((item, i) => (
              <div
                key={i}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  backdrop-blur-md
                  p-5
                "
              >
                <p className="text-white text-2xl font-black">
                  {item.num}
                </p>

                <p
                  className="
                    text-white/60
                    text-[10px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    mt-1
                  "
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

     
      </div>
    </section>
  );
}