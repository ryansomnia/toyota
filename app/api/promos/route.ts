// ─── /app/api/promos/route.ts ────────────────────────────────────
import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, err, Promo } from "@/lib/types";

export async function GET(_req: NextRequest) {
  try {
    const promos = await query<Promo[]>(
      `SELECT p.*, c.name AS car_name, c.slug AS car_slug
       FROM promos p
       LEFT JOIN cars c ON p.car_id = c.id
       WHERE p.is_active = 1
         AND p.start_date <= CURDATE()
         AND p.end_date   >= CURDATE()
       ORDER BY p.created_at DESC`
    );
    return ok(promos);
  } catch (e) {
    console.error("[GET /api/promos]", e);
    return err("Gagal mengambil data promo", 500);
  }
}
