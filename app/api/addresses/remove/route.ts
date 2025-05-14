import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const {
      addressId,
      userId,
    }: {
      addressId: string;
      userId: string;
    } = await req.json();

    const query = `
      DELETE FROM addresses
      WHERE id = $1 AND user_id = $2
    `;

    await sql.query(query, [addressId, userId]);

    return NextResponse.json(
      { case: "success", message: "Address removed successfully" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Error while deleting address:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to remove address",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
