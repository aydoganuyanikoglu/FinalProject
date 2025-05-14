import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      reviewId,
      productId,
    }: {
      userId?: string;
      reviewId?: string;
      productId?: string;
    } = await req.json();

    if (!userId || !reviewId || !productId) {
      return NextResponse.json(
        { case: "error", message: "Missing required fields" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const query = `
      DELETE FROM reviews
      WHERE user_id = $1 AND id = $2 AND product_id = $3
    `;

    await sql.query(query, [userId, reviewId, productId]);

    return NextResponse.json(
      { case: "success", message: "Review removed successfully" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error while removing review:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to remove review",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
