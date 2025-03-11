import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  try {
    const users = await sql`SELECT * FROM users`;
    console.log(users.rows);
    return NextResponse.json(users.rows);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, email, password } = await req.json();

    const query1 = `SELECT * FROM users WHERE email = $1`;
    const result = await sql.query(query1, [email]);

    if (result.rows.length > 0) {
      return NextResponse.json(
        { case: "existondb", message: "User already exists via this email!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query2 = `INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4)`;
    await sql.query(query2, [firstname, lastname, email, hashedPassword]);

    return NextResponse.json(
      { case: "success", message: "Successfully Registered!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        case: "error",
        message: "Internal Server Error!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
