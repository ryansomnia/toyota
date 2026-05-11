import { NextRequest } from "next/server";
import pool from "@/lib/db";
import { ok, err, Car } from "@/lib/types";

// ─── GET /api/cars/[slug] ────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Fetch car detail
    const [rows] = await pool.execute<any[]>(
      `SELECT c.*, b.name AS brand_name
       FROM cars c
       JOIN brands b ON c.brand_id = b.id
       WHERE c.slug = ?
       LIMIT 1`,
      [slug]
    );

    if (!rows.length) return err("Mobil tidak ditemukan", 404);

    const car = rows[0] as Car & { color_options: string; features: string };

    // Fetch images
    const [images] = await pool.execute<any[]>(
      `SELECT id, url, alt_text, is_primary, sort_order
       FROM car_images WHERE car_id = ? ORDER BY sort_order ASC`,
      [car.id]
    );

    // Increment view count (fire and forget)
    pool.execute("UPDATE cars SET view_count = view_count + 1 WHERE id = ?", [car.id]);

    // Fetch related cars (same type, excluding current)
    const [related] = await pool.execute<any[]>(
      `SELECT c.id, c.name, c.slug, c.type, c.year, c.price, c.badge, b.name AS brand_name,
              img.url AS primary_image
       FROM cars c
       JOIN brands b ON c.brand_id = b.id
       LEFT JOIN car_images img ON img.car_id = c.id AND img.is_primary = 1
       WHERE c.type = ? AND c.slug != ? AND c.status = 'available'
       ORDER BY c.is_featured DESC, RAND()
       LIMIT 4`,
      [car.type, slug]
    );

    return ok({
      ...car,
      color_options: car.color_options ? JSON.parse(car.color_options) : [],
      features:      car.features      ? JSON.parse(car.features)      : [],
      images,
      related,
    });
  } catch (e) {
    console.error("[GET /api/cars/[slug]]", e);
    return err("Gagal mengambil detail mobil", 500);
  }
}
