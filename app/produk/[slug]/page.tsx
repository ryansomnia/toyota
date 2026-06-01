import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProdukClient from "../ProdukClient";
import { toSlug } from "@/utils/slug";

// Ambil satu mobil berdasarkan slug
async function getCarBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cars?slug=${slug}`, {
      next: { revalidate: 3600 },
    });
    const { data } = await res.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

// Generate semua slug saat build (Static Generation)
export async function generateStaticParams() {
    
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cars?limit=100`);
  const { data } = await res.json();
  
  return (data ?? []).map((car: any) => ({
    slug: toSlug(car.fullName), // pastikan field slug ada di API kamu
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const car = await getCarBySlug(params.slug);
  if (!car) return {};

  return {
    title: `${car.fullName} Cibubur – Harga & Promo Terbaru 2024`,
    description: `Beli ${car.fullName} di dealer resmi Toyota Cibubur. Harga OTR terbaik, DP ringan, cicilan mulai 2 jutaan. Hubungi kami sekarang!`,
    alternates: { canonical: `https://mobiltoyotacibubur.com/produk/${car.slug}` },
  };
}

export default async function ProdukDetailPage({ params }: { params: { slug: string } }) {
  const [car, allCars, cats] = await Promise.all([
    getCarBySlug(params.slug),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars?limit=100`).then(r => r.json()).then(r => r.data ?? []),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`).then(r => r.json()).then(r => r.data ?? []),
  ]);

  if (!car) notFound();

  // Buka katalog dengan modal langsung terbuka untuk mobil ini
  return <ProdukClient initialCars={allCars} initialCats={cats} initialModal={car} />;
}