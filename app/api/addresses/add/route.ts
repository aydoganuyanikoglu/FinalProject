import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const {
      values,
      userId,
    }: {
      values: {
        name: string;
        phone: string;
        city: string;
        district: string;
        neighborhood: string;
        postalcode: string;
        addresstitle: string;
        address: string;
      };
      userId: string;
    } = await req.json();

    const query = `
      INSERT INTO addresses (
        user_id,
        name,
        phone,
        city,
        district,
        neighborhood,
        postalcode,
        addresstitle,
        address
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    await sql.query(query, [
      userId,
      values.name,
      values.phone,
      values.city,
      values.district,
      values.neighborhood,
      values.postalcode,
      values.addresstitle,
      values.address,
    ]);

    return NextResponse.json(
      { case: "success", message: "Address added successfully!" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Failed to add address:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to add address",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
