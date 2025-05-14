import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { case: "error", message: "Missing userId in request body" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const query = `
      SELECT id
      FROM favoriteproducts
      WHERE user_id = $1
    `;

    const result = await sql.query(query, [userId]);

    return NextResponse.json(
      { case: "success", favoriteProductIds: result.rows.map((row) => row.id) },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Failed to fetch favorite product IDs:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch favorite product IDs",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
