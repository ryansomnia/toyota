import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Article } from "@/models/Articles";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const limit = Number(searchParams.get("limit") || 10);

    const query: any = {
      isActive: true,
    };

    if (type) {
      query.type = type;
    }

    const data = await Article.find(query)
      .sort({
        isFeatured: -1,
        publishedAt: -1,
      })
      .limit(limit);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed fetch articles",
      },
      { status: 500 }
    );
  }
}