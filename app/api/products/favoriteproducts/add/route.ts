import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, product } = body;

    const query = `
      INSERT INTO favoriteproducts (
        id,
        user_id, 
        name, 
        category, 
        short_description, 
        price, 
        image_url, 
        discount_price, 
        discount_percentage,
        brand
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `;

    await sql.query(query, [
      product.id,
      userId,
      product.name,
      product.category,
      product.short_description,
      product.price,
      product.image_url,
      product.discount_price,
      product.discount_percentage,
      product.brand,
    ]);

    return NextResponse.json(
      { case: "success", message: "Product added to favorites" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to add product",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
