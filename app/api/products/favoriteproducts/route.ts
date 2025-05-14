import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const query = `
      SELECT *
      FROM favoriteproducts
      WHERE user_id = $1
      ORDER BY name;
    `;

    const result = await sql.query(query, [userId]);

    return NextResponse.json(
      { case: "success", favorites: result.rows },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch favorite products",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
