import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { case: "error", message: "Missing productId in request body" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const query = `
      SELECT *
      FROM reviews
      WHERE product_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await sql.query(query, [productId]);

    return NextResponse.json(
      { case: "success", reviews: result.rows },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch reviews",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
