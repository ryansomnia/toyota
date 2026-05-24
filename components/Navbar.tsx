"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Beranda", href: "/"        },
  { label: "Produk",  href: "/produk"  },
    { label: "Purna Jual",   href: "/purnaJual"   },
    // { label: "Tukar Tambah",   href: "/tukartambah"   },

  { label: "Tentang", href: "/tentang" },
];

const WA_LINK = "https://wa.me/6282125061466";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0A0A0A] px-6 md:px-12 py-2.5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6 text-white/60 text-[10px] uppercase tracking-[1.5px] font-medium">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            Cibubur, Bogor
          </span>
          <span className="hidden sm:flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Everyday 08:00–16:00
          </span>
        </div>
        <span className="text-white/40 text-[10px] hidden md:block tracking-widest font-bold">
        AUTHORIZED DEALER
        </span>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-3" : "bg-white py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="text-[#0A0A0A] font-black text-2xl tracking-tighter group-hover:text-red-600 transition-colors">
              TOYOTA<span className="text-red-600 group-hover:text-[#0A0A0A]">CIBUBUR</span>
            </span>
            <span className="text-[8px] tracking-[4px] text-gray-400 font-bold uppercase">SetiaJaya</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-5 py-2 text-[12px] uppercase tracking-wider font-black transition-all duration-300 group ${
                  isActive(item.href) ? "text-red-600" : "text-[#1A1A1A] hover:text-red-600"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-red-600 transition-all duration-300 ${
                  isActive(item.href) ? "w-1/2" : "w-0 group-hover:w-1/2"
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block group relative overflow-hidden bg-[#0A0A0A] text-white px-8 py-3.5 rounded-sm text-[11px] font-black uppercase tracking-[2px]"
          >
            <span className="relative z-10">Konsultasi</span>
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            <span className={`block w-6 h-0.5 bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 top-0 bg-white z-[60] transition-all duration-500 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <span className="text-black font-black text-xl tracking-tighter">
              SETIA<span className="text-red-600">JAYA</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-5 py-2.5 rounded-full"
            >
              Tutup
            </button>
          </div>

          <div className="px-10 py-16 space-y-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-4xl font-black uppercase tracking-tighter transition-colors ${
                  isActive(item.href) ? "text-red-600" : "text-[#0A0A0A]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-12">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-red-600 text-white text-center py-6 rounded-sm font-black uppercase tracking-widest text-sm shadow-2xl shadow-red-200"
              >
                Chat Sales Sekarang
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}