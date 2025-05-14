import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    const query = `
      DELETE FROM favoriteproducts
      WHERE user_id = $1 AND id = $2
    `;

    await sql.query(query, [userId, productId]);

    return NextResponse.json(
      { case: "success", message: "Product removed from favorites" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to remove product",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
