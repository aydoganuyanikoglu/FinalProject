import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(_req: NextRequest) {
  try {
    const data = await sql`SELECT DISTINCT brand FROM products`;

    const brands = data.rows.map((row) => row.brand);

    return NextResponse.json(
      { case: "success", brands },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error fetching brands:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch brands",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
