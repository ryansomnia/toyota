import { Metadata } from "next";
import Link from "next/link"
import PurnaJualClient from "./PurnaJualClient";

export const metadata: Metadata = {
  title: "Purna Jual Toyota Cibubur – Service, General Repair & Body Paint",
  description:
    "Layanan purna jual resmi Toyota di Cibubur & Bekasi. General repair, body & paint, servis berkala oleh teknisi bersertifikat Toyota. Booking service online mudah & cepat.",
  keywords:
    "service toyota cibubur, bengkel toyota cibubur, body paint toyota cibubur, general repair toyota bekasi, booking service toyota cibubur",
  alternates: { canonical: "https://mobiltoyotacibubur.com/purna-jual" },
  openGraph: {
    title: "Purna Jual Toyota Cibubur – Service & Body Paint",
    description:
      "Servis Toyota di bengkel resmi Cibubur. Teknisi bersertifikat, fasilitas standar Toyota, booking online mudah.",
    url: "https://mobiltoyotacibubur.com/purna-jual",
    siteName: "Toyota Cibubur – Setiajaya",
    locale: "id_ID",
    type: "website",
  },
};

export default function PurnaJualPage() {
  return <PurnaJualClient />;
}