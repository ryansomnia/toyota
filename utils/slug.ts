// utils/slug.ts
export function toSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")        // spasi → strip
      .replace(/[^a-z0-9-]/g, "") // hapus karakter aneh
      // "Toyota Fortuner GR Sport" → "toyota-fortuner-gr-sport"
  }