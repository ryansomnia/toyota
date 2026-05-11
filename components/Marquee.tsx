"use client";

const TOYOTA_ITEMS = [
  "Toyota Land Cruiser 300",
  "GR Supra",
  "Innova Zenix Hybrid",
  "Fortuner GR Sport",
  "Corolla Cross HEV",
  "Toyota Veloz",
  "Raize GR Sport",
  "Yaris Cross Hybrid",
  "Agya GR Sport",
  "Hilux GR Sport",
  "Promo Bunga 0%",
  "Ready Stock Unit 2024",
  "Free Service & Sparepart",
  "Trade-in Harga Tertinggi",
];

export default function Marquee() {
  return (
    <div className="relative bg-white py-4 overflow-hidden border-y border-gray-100">
      {/* Overlay Fade Effect - Agar teks terlihat muncul/hilang halus di pinggir */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-marquee-infinite">
        {[...TOYOTA_ITEMS, ...TOYOTA_ITEMS].map((item, i) => (
          <span 
            key={i} 
            className="inline-flex items-center gap-4 text-[#0A0A0A] text-[10px] font-black uppercase tracking-[2px] px-10"
          >
            {/* Dot Aksen Merah */}
            <span className="w-1.5 h-1.5 rotate-45 bg-red-600" />
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee-infinite 40s linear infinite;
        }
        /* Berhenti saat hover agar user bisa membaca */
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}