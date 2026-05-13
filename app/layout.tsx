import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://mobiltoyotacibubur.com"),
  title: {
    default: "Toyota Cibubur – Sales Mobil Resmi Cibubur & Bekasi",
    template: "%s | Toyota Cibubur",
  },
  description:
    "Sales mobil resmi terpercaya di Cibubur, Bekasi. Tersedia Toyota, Honda, Mitsubishi, Suzuki & lebih. Proses kredit mudah, DP ringan, konsultasi gratis. Hubungi kami sekarang!",
  keywords: [
    "sales mobil Cibubur",
    "dealer mobil Bekasi",
    "kredit mobil Bekasi",
    "beli mobil Cibubur",
    "Toyota Cibubur",
    "Honda Bekasi",
    "Toyota Cibubur",
    "sales mobil terpercaya",
  ],
  authors: [{ name: "Toyota Cibubur" }],
  creator: "Toyota Cibubur",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mobiltoyotacibubur.com",
    siteName: "Toyota Cibubur",
    title: "Toyota Cibubur – Sales Mobil Resmi Cibubur & Bekasi",
    description:
      "Sales mobil resmi terpercaya di Cibubur, Bekasi. Proses kredit mudah, DP ringan, konsultasi gratis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Toyota Cibubur – Sales Mobil Resmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toyota Cibubur – Sales Mobil Resmi Cibubur & Bekasi",
    description: "Sales mobil terpercaya. Proses kredit mudah, konsultasi gratis.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mobiltoyotacibubur.com",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        {/* JSON-LD Schema – Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Toyota Cibubur",
              description:
                "Sales mobil resmi terpercaya di Cibubur, Bekasi dan sekitarnya.",
              url: "https://mobiltoyotacibubur.com",
              telephone: "+628123456789",
              email: "info@Toyota Cibubur.id",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Raya Otomotif No. 88",
                addressLocality: "Cibubur",
                addressRegion: "Jawa Barat",
                postalCode: "16911",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.4833,
                longitude: 106.8333,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "08:00",
                  closes: "17:00",
                },
              ],
              sameAs: [
                "https://instagram.com/Toyota Cibubur",
                "https://facebook.com/Toyota Cibubur",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "312",
              },
            }),
          }}
        />
      </head>
      <body className="font-body bg-[#0A0A0A] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
