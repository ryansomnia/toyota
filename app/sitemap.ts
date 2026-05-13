import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mobiltoyotacibubur.com/";
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/katalog", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/promo", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/kredit", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/tentang", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/kontak", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.75, changeFrequency: "weekly" as const },
    // Catalog pages
    { url: "/katalog/fortuner-gr-sport", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/katalog/innova-zenix-hybrid", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/katalog/hrv-turbo", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/katalog/pajero-sport", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/katalog/raize-gr-sport", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/katalog/brio-rs", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/katalog/jimny-5door", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/katalog/stargazer-prime", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
