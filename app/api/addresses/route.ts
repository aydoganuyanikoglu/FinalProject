import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string } = await req.json();

    const query = `
      SELECT * FROM addresses
      WHERE user_id = $1
      ORDER BY created_at
    `;

    const result = await sql.query(query, [userId]);

    return NextResponse.json(
      { case: "success", addresses: result.rows },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Database Error:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch addresses",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
