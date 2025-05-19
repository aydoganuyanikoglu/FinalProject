import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { productId }: { productId: string } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { case: "error", message: "Missing productId" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const query = `
      SELECT 
        COUNT(*) AS review_count,
        AVG(rating) AS avg_rating
      FROM reviews
      WHERE product_id = $1
    `;

    const result = await sql.query(query, [productId]);

    return NextResponse.json(
      {
        case: "success",
        reviewCount: parseInt(result.rows[0].review_count, 10),
        avgRating: parseFloat(result.rows[0].avg_rating) || 0,
      },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error fetching review stats:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch review statistics",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
