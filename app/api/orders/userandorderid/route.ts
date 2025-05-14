import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      orderId,
      orderStatus,
    }: {
      userId: string;
      orderId: string;
      orderStatus: string;
    } = await req.json();

    const query = `
      SELECT * 
      FROM orders
      WHERE user_id = $1 AND order_id = $2 AND order_status = $3
    `;

    const result = await sql.query(query, [userId, orderId, orderStatus]);

    return NextResponse.json(
      { case: "success", orderDetails: result.rows },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error while fetching order details:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch order details.",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
