import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  _req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const result = await sql.query(
      `SELECT id, firstname, lastname, email FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
