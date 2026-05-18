export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Car } from "@/models/Car";

// ── GET /api/cars/[slug] ─────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const car = await Car.findOne({ slug: params.slug, isActive: true })
      .populate("categoryId", "name slug")
      .lean();

    if (!car) {
      return NextResponse.json(
        { success: false, error: "Mobil tidak ditemukan" },
        { status: 404 }
      );
    }

    // Increment view count — fire and forget
    Car.updateOne({ slug: params.slug }, { $inc: { viewCount: 1 } }).exec();

    // Related cars — kategori sama, slug berbeda
    const related = await Car.find({
      categoryId: (car as any).categoryId,
      slug: { $ne: params.slug },
      isActive: true,
    })
      .select("name fullName slug thumbnailUrl startingPrice label isNew")
      .limit(4)
      .lean();

    return NextResponse.json({
      success: true,
      data: { ...car, related },
    });
  } catch (error) {
    console.error("[GET /api/cars/[slug]]", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil detail mobil" },
      { status: 500 }
    );
  }
}
