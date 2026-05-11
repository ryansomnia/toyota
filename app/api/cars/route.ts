import { NextRequest } from "next/server";
import pool, { query } from "@/lib/db";
import { ok, err, parsePagination, Car } from "@/lib/types";

// ─── GET /api/cars ───────────────────────────────────────────────
// Query params:
//   type, brand, min_price, max_price, year, fuel, tx,
//   featured, status, search, page, limit, sort
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const { limit, offset, page } = parsePagination(sp);

    // Build WHERE clauses dynamically
    const conditions: string[] = ["c.status != 'sold'"];
    const params: any[] = [];
    if (sp.get("type"))      { conditions.push("c.type = ?");               params.push(sp.get("type")); }
    if (sp.get("brand"))     { conditions.push("b.name = ?");               params.push(sp.get("brand")); }
    if (sp.get("min_price")) { conditions.push("c.price >= ?");             params.push(Number(sp.get("min_price"))); }
    if (sp.get("max_price")) { conditions.push("c.price <= ?");             params.push(Number(sp.get("max_price"))); }
    if (sp.get("year"))      { conditions.push("c.year = ?");               params.push(Number(sp.get("year"))); }
    if (sp.get("fuel"))      { conditions.push("c.fuel = ?");               params.push(sp.get("fuel")); }
    if (sp.get("tx"))        { conditions.push("c.transmission = ?");       params.push(sp.get("tx")); }
    if (sp.get("badge"))     { conditions.push("c.badge = ?");              params.push(sp.get("badge")); }
    if (sp.get("featured"))  { conditions.push("c.is_featured = 1"); }
    if (sp.get("status"))    { conditions.push("c.status = ?");             params.push(sp.get("status")); }

    if (sp.get("search")) {
      conditions.push("MATCH(c.name, c.description) AGAINST(? IN BOOLEAN MODE)");
      params.push(`${sp.get("search")}*`);
    }

    // Sort
    const SORT_MAP: Record<string, string> = {
      "price-asc":  "c.price ASC",
      "price-desc": "c.price DESC",
      "newest":     "c.year DESC, c.created_at DESC",
      "name":       "c.name ASC",
      "popular":    "c.view_count DESC",
      "default":    "c.is_featured DESC, c.created_at DESC",
    };
    const orderBy = SORT_MAP[sp.get("sort") ?? "default"] ?? SORT_MAP["default"];

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    // Count total
    const [countRows] = await pool.execute<any[]>(
      `SELECT COUNT(*) as total FROM cars c JOIN brands b ON c.brand_id = b.id ${where}`,
      params as any[] // Tambahkan 'as any[]' di sini
    );
    const total = countRows[0].total as number;

    // Fetch cars with primary image
    const sql = `
      SELECT
        c.*,
        b.name            AS brand_name,
        img.url           AS primary_image
      FROM cars c
      JOIN brands b ON c.brand_id = b.id
      LEFT JOIN car_images img ON img.car_id = c.id AND img.is_primary = 1
      ${where}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

// 1. Pastikan konversi ke integer dilakukan tepat sebelum query
const finalLimit = parseInt(String(limit), 10) || 10;
const finalOffset = parseInt(String(offset), 10) || 0;

// 2. Gunakan variabel yang sudah di-parse tersebut
const cars = await query<Car[]>(sql, [...params, finalLimit, finalOffset]);
    const parsed = cars.map((car) => ({
      ...car,
      color_options: car.color_options ? JSON.parse(car.color_options as unknown as string) : [],
      features:      car.features      ? JSON.parse(car.features      as unknown as string) : [],
    }));

    return ok(parsed, {
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (e) {
    console.error("[GET /api/cars]", e);
    return err("Gagal mengambil data mobil", 500);
  }
}
