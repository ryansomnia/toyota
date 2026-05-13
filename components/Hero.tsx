"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STATS = [
  { num: "250+", label: "Unit Ready Stock" },
  { num: "12+", label: "Tahun Pengalaman" },
  { num: "1.5k", label: "Happy Clients" },
  { num: "0%", label: "Bunga Promo" },
];

const FEATURED_CARS = [
  { 
    brand: "TOYOTA", 
    name: "Fortuner GR Sport", 
    price: "Rp 680 Jt", 
    tag: "Hot Deal",
    emoji: "🏎️",
    specs: ["Diesel 2.8L", "4x4 Drive", "Luxury Interior"]
  },
  { 
    brand: "HONDA", 
    name: "Civic Type R", 
    price: "Rp 1.39 M", 
    tag: "Legendary",
    emoji: "🏎️",
    specs: ["Track Ready", "Manual 6-Speed", "VTEC Turbo"]
  },
  { 
    brand: "HYUNDAI", 
    name: "Ioniq 5 Electric", 
    price: "Rp 780 Jt", 
    tag: "Future Tech",
    emoji: "⚡",
    specs: ["Zero Emission", "Fast Charge", "Smart Sense"]
  },
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FEATURED_CARS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const waLink = "https://wa.me/6282125061466";

  return (
    <section
      ref={containerRef}
       id="hero"
      className=" relative min-h-[90vh] flex items-center overflow-hidden bg-white text-[#0A0A0A]"
    >
      {/* Background Decor - Subtle & Clean */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FBFBFB] skew-x-[-12deg] translate-x-20" />
        <div className="absolute -bottom-10 -left-10 text-[22vw] font-black text-gray-50 select-none leading-none uppercase">
          Setiajaya
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[3px] bg-red-600"></span>
            <span className="text-red-600 text-[11px] font-black uppercase tracking-[4px]">Dealer Terpercaya</span>
          </div>

          <h1 className="text-[54px] md:text-[80px] font-black leading-[0.9] tracking-[-3px] mb-8 uppercase text-[#0A0A0A]">
            Find Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
              Ultimate
            </span> <br />
            Machine.
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed mb-10 font-medium">
            Pengalaman membeli mobil yang transparan dan eksklusif. Temukan unit impian Anda dengan layanan purna jual terbaik di kelasnya.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            {/* <Link
              href="/katalog"
              className="bg-[#0A0A0A] text-white px-10 py-4 text-[11px] font-black uppercase tracking-[2px] hover:bg-red-600 transition-all duration-300 shadow-xl shadow-black/10"
            >
              Lihat Katalog
            </Link> */}
            <a
              href={waLink}
              className="group border-2 border-[#0A0A0A] px-10 py-[14px] text-[11px] font-black uppercase tracking-[2px] hover:bg-[#0A0A0A] hover:text-white transition-all flex items-center gap-2"
            >
              Konsultasi Gratis 24/7
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-t border-gray-100 w-full">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-black text-[#0A0A0A]">{s.num}</span>
                <span className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT - CAROUSEL (White Theme) */}
        <div className="relative">
          {/* Main Card */}
          <div className="relative z-20 bg-white p-2 rounded-2xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-50">
            <div className="bg-[#FDFDFD] rounded-xl p-8 md:p-12 overflow-hidden relative">
              
              <div className="relative min-h-[380px] flex flex-col">
                {FEATURED_CARS.map((car, idx) => (
                  <div 
                    key={idx}
                    className={`transition-all duration-700 ease-in-out absolute inset-0 flex flex-col ${
                      activeIdx === idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-red-600 text-[10px] font-black tracking-[3px] uppercase mb-1">{car.brand}</p>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0A0A0A] leading-tight">{car.name}</h3>
                      </div>
                      <span className="bg-red-600/10 text-red-600 text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest border border-red-600/20">
                        {car.tag}
                      </span>
                    </div>

                    <div className="flex-1 flex justify-center items-center py-4">
                      <span className="text-[140px] leading-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] select-none">
                        {car.emoji}
                      </span>
                    </div>

                    <div className="flex justify-between items-end border-t border-gray-100 pt-8 mt-auto">
                      <div>
                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Harga OTR</p>
                        <p className="text-3xl font-black text-[#0A0A0A]">{car.price}</p>
                      </div>
                      <div className="hidden md:flex flex-col gap-1 items-end text-right">
                        {car.specs.map((s, i) => (
                          <span key={i} className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-0 left-0 w-full flex gap-1 px-1">
                {FEATURED_CARS.map((_, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className="h-1.5 flex-1 bg-gray-100 cursor-pointer relative overflow-hidden transition-all"
                  >
                    {activeIdx === idx && (
                      <div className="absolute inset-0 bg-red-600 origin-left animate-progress" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Aesthetic Back-Layer */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -right-6 w-full h-full border-2 border-gray-100 rounded-2xl -z-10" />
        </div>

      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 5s linear infinite;
        }
      `}</style>
    </section>
  );
}