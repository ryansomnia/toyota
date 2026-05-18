export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { CarCategory } from "@/models/CarCategory";

export async function GET() {
  try {
    await connectDB();
    const categories = await CarCategory.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .lean();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("[GET /api/categories]", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil kategori" },
      { status: 500 }
    );
  }
}
