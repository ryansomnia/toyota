"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Beranda", targetId: "hero" }, 
   { label: "Katalog", targetId: "katalog" },
  { label: "Promo", targetId: "promo" },

  { label: "Hubu", targetId: "tentang" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  // Fungsi untuk Smooth Scroll
  const scrollToSection = (id: string) => {
    setMenuOpen(false); // Tutup menu mobile jika sedang terbuka
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Sesuaikan dengan tinggi navbar Anda
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const waLink = "https://wa.me/6281234567890";

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0A0A0A] px-6 md:px-12 py-2.5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6 text-white/60 text-[10px] uppercase tracking-[1.5px] font-medium overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            Cibubur, Bogor
          </span>
          <span className="hidden sm:flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Mon–Sat 08.00–17.00
          </span>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-white/40 text-[10px] hidden md:block tracking-widest font-bold">TOYOTA SETIA JAYA</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-3"
            : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-1 text-left"
          >
            <div className="flex flex-col leading-none">
                <span className="text-[#0A0A0A] font-black text-2xl tracking-tighter group-hover:text-red-600 transition-colors">
                    TOYOTA<span className="text-red-600 group-hover:text-[#0A0A0A]">CIBUBUR</span>
                </span>
                <span className="text-[8px] tracking-[4px] text-gray-400 font-bold uppercase">SetiaJaya</span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.targetId)}
                className="px-5 py-2 text-[12px] uppercase tracking-wider font-black text-[#1A1A1A] hover:text-red-600 transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-1/2"></span>
              </button>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-[#0A0A0A] text-white px-8 py-3.5 rounded-sm text-[11px] font-black uppercase tracking-[2px] transition-all"
            >
              <span className="relative z-10">Konsultasi</span>
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-[#0A0A0A] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#0A0A0A] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#0A0A0A] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-0 bg-white z-[60] transition-all duration-500 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <span className="text-black font-black text-xl tracking-tighter">SETIA<span className="text-red-600">JAYA</span></span>
                <button onClick={() => setMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-5 py-2.5 rounded-full">Tutup</button>
            </div>
            <div className="px-10 py-16 space-y-10">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => scrollToSection(item.targetId)}
                        className="block w-full text-left text-4xl font-black uppercase tracking-tighter text-[#0A0A0A] active:text-red-600"
                    >
                        {item.label}
                    </button>
                ))}
                
                <div className="pt-12">
                    <a href={waLink} className="block w-full bg-red-600 text-white text-center py-6 rounded-sm font-black uppercase tracking-widest text-sm shadow-2xl shadow-red-200">
                        Chat Sales Sekarang
                    </a>
                </div>
            </div>
        </div>
      </nav>
    </>
  );
}