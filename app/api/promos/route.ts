// ── /app/api/promos/route.ts ─────────────────────────────────────
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Promo } from "@/models/index";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const promos = await Promo.find({
      isActive:  true,
      startDate: { $lte: now },
      endDate:   { $gte: now },
    })
      .populate("carId", "name slug thumbnailUrl")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: promos });
  } catch (error) {
    console.error("[GET /api/promos]", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data promo" },
      { status: 500 }
    );
  }
}
