import { MetadataRoute } from "next";

const BASE_URL = "https://mobiltoyotacibubur.com";

// Slug semua model Toyota — update jika ada model baru
const CAR_SLUGS = [
  // SUV
  "fortuner",
  "rush-gr-sport",
  "raize-gr",
  "yaris-cross-hev",
  "corolla-cross-hev",
  "land-cruiser",
  // MPV
  "innova-zenix-hev",
  "innova-zenix",
  "innova-reborn",
  "veloz-hev",
  "avanza",
  "calya",
  "voxy",
  "alphard-hev",
  "vellfire-hev",
  // Hatchback
  "agya",
  "gr-yaris",
  "gr-corolla",
  // Sedan
  "camry-hev",
  "corolla-altis-hev-gr-sport",
  "vios",
  "gr-86",
  "gr-supra",
  // Commercial
  "hiace-premio",
  "hiace-commuter",
  "hilux-rangga",
  "hilux-d-cab",
  "hilux-s-cab",
  "dyna",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ─────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/produk`,
      lastModified: now,
      changeFrequency: "daily",      // harga & stok sering berubah
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/purnaJual`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tentang`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Dynamic: halaman detail per model ────────────────────────
  const carPages: MetadataRoute.Sitemap = CAR_SLUGS.map((slug) => ({
    url: `${BASE_URL}/produk/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...carPages];
}