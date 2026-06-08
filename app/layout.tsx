"use client"; // 1. DIUBAH MENJADI CLIENT COMPONENT AGAR BISA KLIK

import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

// PENTING: Objek metadata dihapus dari sini karena Client Component tidak bisa mengekspor metadata secara langsung.
// Jika Anda butuh metadata, nanti bisa dipindah ke file page.tsx masing-masing.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // 2. FUNGSI UNTUK MELAPORKAN KONVERSI KE GOOGLE ADS
  const handleWaClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-18172959033/O3BDCO39wa8cELmyxdlD",
        value: 1.0,
        currency: "IDR",
      });
    }
  };

  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Toyota Cibubur",
              url: "https://mobiltoyotacibubur.com",
            }),
          }}
        />
      </head>

      <body className="font-body bg-white text-white antialiased">
        {/* GOOGLE ADS BASE TAG */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18172959033"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18172959033');
          `}
        </Script>

        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="relative w-full overflow-x-hidden bg-white">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />

        {/* GLOBAL EFFECT */}
        <ScrollReveal />

        {/* FLOATING WA - DENGAN TRACKING KONVERSI */}
        <a
          href="https://wa.me/6282125061466?text=Halo%20Toyota%2C%20saya%20ingin%20konsultasi"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWaClick} // 3. PANGGIL FUNGSI TRACKING DI SINI
          className="fixed-wa-mobile flex items-center gap-2 bg-[#25D366] text-white pl-3.5 pr-4 py-2.5 sm:pl-4 sm:pr-5 sm:py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-transform duration-300"
          aria-label="Chat via WhatsApp"
        >
          <svg
            width="18"
            height="18"
            className="sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.946 7.946 0 01-3.786-.964L4.5 19.5l1.617-3.664a7.93 7.93 0 01-1.046-3.948c0-4.411 3.588-7.999 8-7.999s8 3.588 8 8-3.589 7.991-8.042 7.991z" />
          </svg>
          <span className="text-[12px] sm:text-[13px] font-medium tracking-wide">
            Chat Sekarang
          </span>
        </a>
      </body>
    </html>
  );
}