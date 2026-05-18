import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Car } from "@/models/Car";
import "@/models/CarCategory";
import { SortOrder } from "mongoose";

// Tambahkan ini agar Next.js tidak coba render halaman ini saat build
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const sp    = req.nextUrl.searchParams;
    const page  = Math.max(1, Number(sp.get("page")  ?? 1));
    const limit = Math.min(50, Number(sp.get("limit") ?? 12));
    const skip  = (page - 1) * limit;

    const filter: Record<string, unknown> = { isActive: true };

    if (sp.get("category"))   filter.categoryId = sp.get("category");
    if (sp.get("label"))      filter.label       = sp.get("label");
    if (sp.get("isNew"))      filter.isNewModel  = true;
    if (sp.get("isFeatured")) filter.isFeatured  = true;

    if (sp.get("minPrice") || sp.get("maxPrice")) {
      filter.startingPrice = {
        ...(sp.get("minPrice") && { $gte: Number(sp.get("minPrice")) }),
        ...(sp.get("maxPrice") && { $lte: Number(sp.get("maxPrice")) }),
      };
    }

    if (sp.get("search")) {
      filter.$text = { $search: sp.get("search") };
    }

    const SORT_MAP: Record<string, Record<string, SortOrder>> = {
      "price-asc":  { startingPrice:  1 },
      "price-desc": { startingPrice: -1 },
      "newest":     { createdAt: -1 },
      "name":       { name: 1 },
      "popular":    { viewCount: -1 },
      "default":    { isFeatured: -1, sortOrder: 1 },
    };
    const sort = SORT_MAP[sp.get("sort") ?? "default"] ?? SORT_MAP["default"];

    const [cars, total] = await Promise.all([
      Car.find(filter)
        .select("name fullName slug label thumbnailUrl startingPrice priceLabel isNewModel isFeatured sortOrder categoryId images variants")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("categoryId", "name slug")
        .lean(),
      Car.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: cars,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[GET /api/cars]", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data mobil" },
      { status: 500 }
    );
  }
}
