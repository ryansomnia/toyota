import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import { ok, err, KreditApplication, withTransaction } from "@/lib/db";

// ─── Hitung cicilan kredit ───────────────────────────────────────
function hitungCicilan(harga: number, dpPersen: number, tenorBulan: number): {
  dpAmount: number;
  pokok: number;
  totalBunga: number;
  total: number;
  cicilan: number;
} {
  const BUNGA_FLAT = 0.09; // 9% per tahun
  const dpAmount   = harga * (dpPersen / 100);
  const pokok      = harga - dpAmount;
  const totalBunga = pokok * BUNGA_FLAT * (tenorBulan / 12);
  const total      = pokok + totalBunga;
  const cicilan    = total / tenorBulan;
  return { dpAmount, pokok, totalBunga, total, cicilan };
}

// ─── GET /api/kredit?harga=500000000&dp=20&tenor=36 ─────────────
// Simulasi kredit tanpa simpan ke DB
export async function GET(req: NextRequest) {
  try {
    const sp     = req.nextUrl.searchParams;
    const harga  = Number(sp.get("harga")  ?? 0);
    const dp     = Number(sp.get("dp")     ?? 20);
    const tenor  = Number(sp.get("tenor")  ?? 36);

    if (harga  <= 0)           return err("Harga tidak valid");
    if (dp < 10 || dp > 90)    return err("DP harus antara 10% – 90%");
    if (![12,24,36,48,60,72,84].includes(tenor))
                               return err("Tenor tidak valid");

    const result = hitungCicilan(harga, dp, tenor);
    return ok({
      harga,
      dp_persen:    dp,
      tenor_bulan:  tenor,
      ...result,
      formatted: {
        harga:        `Rp ${Math.round(harga).toLocaleString("id-ID")}`,
        dp_amount:    `Rp ${Math.round(result.dpAmount).toLocaleString("id-ID")}`,
        pokok:        `Rp ${Math.round(result.pokok).toLocaleString("id-ID")}`,
        total_bunga:  `Rp ${Math.round(result.totalBunga).toLocaleString("id-ID")}`,
        total:        `Rp ${Math.round(result.total).toLocaleString("id-ID")}`,
        cicilan:      `Rp ${Math.round(result.cicilan).toLocaleString("id-ID")}`,
      },
    });
  } catch (e) {
    console.error("[GET /api/kredit]", e);
    return err("Gagal menghitung simulasi kredit", 500);
  }
}

// ─── POST /api/kredit ────────────────────────────────────────────
// Simpan pengajuan kredit + otomatis buat lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nama, phone, email, car_id,
      harga_mobil, dp_persen, tenor_bulan, bank_pilihan,
    } = body;

    // Validation
    if (!nama?.trim())      return err("Nama wajib diisi");
    if (!phone?.trim())     return err("Nomor WhatsApp wajib diisi");
    if (!harga_mobil || harga_mobil <= 0) return err("Harga mobil tidak valid");
    if (!dp_persen || dp_persen < 10)     return err("DP minimal 10%");
    if (!tenor_bulan)                     return err("Tenor wajib dipilih");

    const phoneClean = phone.replace(/\D/g, "");
    const calc       = hitungCicilan(harga_mobil, dp_persen, tenor_bulan);

    // Transaction: buat lead + kredit application sekaligus
    const result = await withTransaction(async (conn) => {
      // 1. Buat lead
      const [leadResult] = await conn.execute<any>(
        `INSERT INTO leads (nama, phone, email, car_id, source, pesan)
         VALUES (?, ?, ?, ?, 'form', ?)`,
        [
          nama.trim(), phoneClean, email?.trim() || null,
          car_id || null,
          `Pengajuan kredit: DP ${dp_persen}%, tenor ${tenor_bulan} bulan`,
        ]
      );

      // 2. Buat kredit application
      const [kreditResult] = await conn.execute<any>(
        `INSERT INTO kredit_applications
           (lead_id, nama, phone, email, car_id, harga_mobil, dp_persen,
            dp_amount, tenor_bulan, cicilan_estimasi, bank_pilihan)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          leadResult.insertId, nama.trim(), phoneClean,
          email?.trim() || null, car_id || null,
          harga_mobil, dp_persen, calc.dpAmount,
          tenor_bulan, calc.cicilan, bank_pilihan || null,
        ]
      );

      return { leadId: leadResult.insertId, kreditId: kreditResult.insertId };
    });

    return ok({
      ...result,
      cicilan_estimasi: calc.cicilan,
      cicilan_formatted: `Rp ${Math.round(calc.cicilan).toLocaleString("id-ID")}`,
      message: "Pengajuan kredit berhasil! Tim kami akan menghubungi kamu dalam 1×24 jam.",
    });
  } catch (e) {
    console.error("[POST /api/kredit]", e);
    return err("Gagal menyimpan pengajuan kredit", 500);
  }
}
