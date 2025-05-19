import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { productId }: { productId: string } = await req.json();

    const query = `
      SELECT * FROM products
      WHERE id = $1
    `;

    const result = await sql.query(query, [productId]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { case: "error", message: "Product not found" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    return NextResponse.json(
      { case: "success", product: result.rows[0] },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Database Error:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch product",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
