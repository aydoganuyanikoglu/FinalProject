import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string } = await req.json();

    const query = `
      SELECT 
        order_id,
        MIN(created_at) AS order_date,
        SUM(product_price * product_quantity) + 30 AS total_price,
        SUM(product_price * product_quantity) AS product_total_price,
        COUNT(order_id) AS total_items,
        order_status
      FROM 
        orders
      WHERE 
        user_id = $1
      GROUP BY 
        order_id, order_status
      ORDER BY 
        order_date DESC
    `;

    const result = await sql.query(query, [userId]);

    return NextResponse.json(
      { case: "success", orders: result.rows },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error fetching orders:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to fetch orders.",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
