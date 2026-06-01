// app/sitemap.ts
import { MetadataRoute } from "next";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mobiltoyotacibubur.com";

  // Halaman statis
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produk`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/purnaJual`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Halaman dinamis per produk
  try {
    const res = await fetch(`${baseUrl}/api/cars?limit=100`, {
      next: { revalidate: 3600 },
    });
    const { data } = await res.json();

    const productPages: MetadataRoute.Sitemap = (data ?? []).map((car: any) => ({
      url: `${baseUrl}/produk/${car.slug ?? toSlug(car.fullName)}`,
      lastModified: new Date(car.updatedAt ?? Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...productPages];
  } catch {
    return staticPages;
  }
}