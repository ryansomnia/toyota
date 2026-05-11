import { NextRequest } from "next/server";
import { query, queryOne } from "@/lib/db";
import { ok, err, Lead } from "@/lib/types";

// ─── POST /api/leads ─────────────────────────────────────────────
// Body: { nama, phone, email?, car_id?, car_interest?, budget_min?,
//         budget_max?, pesan?, source?, utm_source?, utm_medium?, utm_campaign? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, phone, email, car_id, car_interest, budget_min,
            budget_max, pesan, source = "form",
            utm_source, utm_medium, utm_campaign } = body;

    // Validation
    if (!nama?.trim())  return err("Nama wajib diisi");
    if (!phone?.trim()) return err("Nomor WhatsApp wajib diisi");

    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 9 || phoneClean.length > 15)
      return err("Format nomor WhatsApp tidak valid");

    // Cek apakah nomor yang sama sudah submit dalam 10 menit (anti spam)
    const recent = await queryOne<{ id: number }>(
      `SELECT id FROM leads
       WHERE phone = ? AND created_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE)
       LIMIT 1`,
      [phoneClean]
    );
    if (recent) return err("Permintaan terlalu sering. Tunggu beberapa menit.", 429);

    // Insert lead
    const result = await query<{ insertId: number }>(
      `INSERT INTO leads
         (nama, phone, email, car_id, car_interest, budget_min, budget_max,
          pesan, source, utm_source, utm_medium, utm_campaign)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nama.trim(), phoneClean, email?.trim() || null,
        car_id || null, car_interest?.trim() || null,
        budget_min || null, budget_max || null,
        pesan?.trim() || null, source,
        utm_source || null, utm_medium || null, utm_campaign || null,
      ]
    );

    return ok(
      { id: result.insertId, message: "Terima kasih! Kami akan segera menghubungi kamu." },
      undefined
    );
  } catch (e) {
    console.error("[POST /api/leads]", e);
    return err("Gagal menyimpan data. Silakan coba lagi.", 500);
  }
}

// ─── GET /api/leads ──────────────────────────────────────────────
// Untuk admin dashboard (protected – tambahkan auth middleware nanti)
export async function GET(req: NextRequest) {
  try {
    const sp     = req.nextUrl.searchParams;
    const status = sp.get("status");
    const page   = Math.max(1, Number(sp.get("page") ?? 1));
    const limit  = 20;
    const offset = (page - 1) * limit;

    const where  = status ? "WHERE l.status = ?" : "";
    const params = status ? [status, limit, offset] : [limit, offset];

    const leads = await query<Lead[]>(
      `SELECT l.*, c.name AS car_name, c.slug AS car_slug
       FROM leads l
       LEFT JOIN cars c ON l.car_id = c.id
       ${where}
       ORDER BY l.created_at DESC
       LIMIT ? OFFSET ?`,
      params
    );

    return ok(leads);
  } catch (e) {
    console.error("[GET /api/leads]", e);
    return err("Gagal mengambil data lead", 500);
  }
}
