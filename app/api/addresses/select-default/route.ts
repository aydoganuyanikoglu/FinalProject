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

    const resetQuery = `
      UPDATE addresses
      SET "default" = FALSE
      WHERE user_id = $1
    `;
    await sql.query(resetQuery, [userId]);

    const updateQuery = `
      UPDATE addresses
      SET "default" = TRUE
      WHERE id = $1 AND user_id = $2
    `;
    await sql.query(updateQuery, [addressId, userId]);

    return NextResponse.json(
      { case: "success", message: "Default address updated successfully!" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Failed to update default address:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Could not update default address",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
