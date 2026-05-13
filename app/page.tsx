import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CatalogSection from "@/components/CatalogSection";
import { PromoSection, WhySection, TestimonialSection } from "@/components/Sections";
import KreditCalc from "@/components/KreditCalc";
import { ContactSection, Footer } from "@/components/AboutFooter";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Toyota Cibubur – Sales Mobil Resmi Cibinong & Bogor",
  description:
    "Sales mobil resmi terpercaya di Cibinong, Bogor. Tersedia Toyota, Honda, Mitsubishi dan lebih. Proses kredit mudah, DP ringan mulai 10%. Hubungi kami sekarang!",
  alternates: { canonical: "https://mobiltoyotacibubur.com" },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <CatalogSection />
        <PromoSection />
        <WhySection />
        {/* <KreditCalc /> */}
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollReveal />

      {/* Floating WA button */}
      <a
        href="https://wa.me/6282125061466?text=Halo%Toyota%2C%20saya%20ingin%20konsultasi%20%F0%9F%99%8F"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
        aria-label="Chat via WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.946 7.946 0 01-3.786-.964L4.5 19.5l1.617-3.664a7.93 7.93 0 01-1.046-3.948c0-4.411 3.588-7.999 8-7.999s8 3.588 8 8-3.589 7.991-8.042 7.991z"/>
        </svg>
        <span className="text-[13px] font-medium">Chat Sekarang</span>
      </a>
    </>
  );
}
