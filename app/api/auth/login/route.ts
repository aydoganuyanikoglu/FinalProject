import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { typeUsers } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const query1 = `SELECT * FROM users WHERE email = $1`;
    const result1 = await sql.query(query1, [email]);
    if (result1.rows.length === 0) {
      return NextResponse.json(
        { case: "notfound", message: "User not found!" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    const user = result1.rows[0] as typeUsers;
    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return NextResponse.json(
        { case: "wrongpassword", message: "Incorrect password!" },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const token = jwt.sign(
      { ...user, password: undefined },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json(
      {
        case: "success",
        message: "Login successful!",
        token,
      },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        case: "error",
        message: "Internal Server Error!",
        error: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
