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
  metadataBase: new URL("https://autoprima.id"),
  title: {
    default: "AutoPrima – Sales Mobil Resmi Cibinong & Bogor",
    template: "%s | AutoPrima",
  },
  description:
    "Sales mobil resmi terpercaya di Cibinong, Bogor. Tersedia Toyota, Honda, Mitsubishi, Suzuki & lebih. Proses kredit mudah, DP ringan, konsultasi gratis. Hubungi kami sekarang!",
  keywords: [
    "sales mobil Cibinong",
    "dealer mobil Bogor",
    "kredit mobil Bogor",
    "beli mobil Cibinong",
    "Toyota Cibinong",
    "Honda Bogor",
    "AutoPrima",
    "sales mobil terpercaya",
  ],
  authors: [{ name: "AutoPrima" }],
  creator: "AutoPrima",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://autoprima.id",
    siteName: "AutoPrima",
    title: "AutoPrima – Sales Mobil Resmi Cibinong & Bogor",
    description:
      "Sales mobil resmi terpercaya di Cibinong, Bogor. Proses kredit mudah, DP ringan, konsultasi gratis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoPrima – Sales Mobil Resmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoPrima – Sales Mobil Resmi Cibinong & Bogor",
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
    canonical: "https://autoprima.id",
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
              name: "AutoPrima",
              description:
                "Sales mobil resmi terpercaya di Cibinong, Bogor dan sekitarnya.",
              url: "https://autoprima.id",
              telephone: "+628123456789",
              email: "info@autoprima.id",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Raya Otomotif No. 88",
                addressLocality: "Cibinong",
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
                "https://instagram.com/autoprima",
                "https://facebook.com/autoprima",
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
