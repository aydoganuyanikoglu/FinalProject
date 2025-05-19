import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      productName,
    }: {
      userId: string;
      productName: string;
    } = await req.json();

    if (!userId || !productName) {
      return NextResponse.json(
        { case: "error", message: "Missing userId or productName" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const query = `
      SELECT *
      FROM orders
      WHERE user_id = $1 AND product_name = $2
    `;

    const result = await sql.query(query, [userId, productName]);

    return NextResponse.json(
      {
        case: "success",
        isPurchased: result.rows.length > 0,
      },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error checking product in orders:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to check product in orders.",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
