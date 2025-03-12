import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(_req: NextRequest) {
  try {
    const result = await sql.query(
      `SELECT id, firstname, lastname, email FROM users`
    );

    return NextResponse.json({ users: result.rows }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
