import { Metadata } from "next";
import TentangPage from "./Tentang";

export const metadata: Metadata = {
  title: "Tentang Toyota Cibubur 2026 – Harga & Spesifikasi Lengkap",
  description:
    "Katalog lengkap mobil Toyota di Cibubur & Bekasi. Fortuner, Innova Zenix Hybrid, Raize GR Sport, Yaris Cross, dan lainnya. Harga OTR terbaru, spesifikasi detail, dan konsultasi gratis.",
  keywords:
    "katalog toyota cibubur, harga toyota cibubur 2026, toyota fortuner cibubur, innova zenix cibubur, raize gr sport cibubur, dealer toyota cibubur bekasi",
  alternates: { canonical: "https://mobiltoyotacibubur/tentang" },
  openGraph: {
    title: "Tentang Toyota Cibubur 2026 – Harga & Spesifikasi Lengkap",
    description:
      "Katalog mobil Toyota terlengkap di Cibubur. Harga OTR transparan, cicilan mudah, konsultasi gratis.",
    url: "https://mobiltoyotacibubur/tentang",
    siteName: "Toyota Cibubur – Setiajaya",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://mobiltoyotacibubur.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Toyota Cibubur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Toyota Cibubur 2026",
    description: "Katalog lengkap Toyota Cibubur. Harga OTR transparan.",
    images: ["https://mobiltoyotacibubur.com/og-image.jpg"],
  },
};

export default function Tentang() {
  
  return <TentangPage />;
}