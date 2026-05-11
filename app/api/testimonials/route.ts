import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, err, Testimonial } from "@/lib/types";

// ─── GET /api/testimonials ───────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const featured = req.nextUrl.searchParams.get("featured");
    const where    = featured ? "WHERE is_featured = 1 AND is_active = 1"
                              : "WHERE is_active = 1";
    const list = await query<Testimonial[]>(
      `SELECT * FROM testimonials ${where} ORDER BY is_featured DESC, created_at DESC LIMIT 20`
    );
    return ok(list);
  } catch (e) {
    console.error("[GET /api/testimonials]", e);
    return err("Gagal mengambil data testimoni", 500);
  }
}
