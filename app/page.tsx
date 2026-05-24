import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CatalogSection from "@/components/CatalogSection";
import { PromoSection, WhySection, TestimonialSection } from "@/components/Sections";
// import KreditCalc from "@/components/KreditCalc";
import PromoCarousel from "@/components/PromoCarousel";

// import { Footer } from "@/components/Footer";
// import ScrollReveal from "@/components/ScrollReveal";
import { ProfileSection } from "@/components/ProfilSection";
import { DeliverySection } from "@/components/DeliverSection";

export const metadata: Metadata = {
  title: "Toyota Cibubur – Sales Mobil Dealer Resmi Toyota Daerah Cibubur",

  description:
    "Sales mobil resmi terpercaya di Cibubur dan sekitarnya. Proses kredit mudah, Tersedia berbagai pilihan mobil Toyota populer seperti Toyota Avanza, Innova Zenix, Rush, Raize, Yaris Cross, Fortuner, Hilux, hingga Alphard dengan pilihan tipe lengkap dan harga kompetitif. Hubungi kami sekarang!",

  alternates: {
    canonical: "https://mobiltoyotacibubur.com",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <PromoCarousel />

        <CatalogSection />
        <PromoSection />
        <DeliverySection/>
        {/* <WhySection /> */}
        {/* <KreditCalc /> */}
        
        {/* <TestimonialSection /> */}
        <ProfileSection/>
      
     
      </main>

  
    </>
  );
}
