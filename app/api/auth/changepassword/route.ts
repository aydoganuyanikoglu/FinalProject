import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      currentPassword,
      newPassword,
    }: {
      userId: string;
      currentPassword: string;
      newPassword: string;
    } = await req.json();

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { case: "error", message: "Missing required fields." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const result = await sql.query(`SELECT password FROM users WHERE id = $1`, [
      userId,
    ]);

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { case: "error", message: "User not found." },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { case: "error", message: "Current password is incorrect." },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);

    if (isNewPasswordSame) {
      return NextResponse.json(
        {
          case: "error",
          message: "New password cannot be the same as the current password.",
        },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql.query(`UPDATE users SET password = $1 WHERE id = $2`, [
      hashedPassword,
      userId,
    ]);

    return NextResponse.json(
      { case: "success", message: "Password updated successfully." },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Change password error:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: error.message || "Failed to update password.",
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
