import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sortBy = searchParams.get("sortBy");
  const word = searchParams.get("word");

  let query = `SELECT * FROM products WHERE 1=1`;
  const values: any[] = [];

  if (category && category.toLowerCase() !== "all products") {
    query += ` AND category = $${values.length + 1}`;
    values.push(category);
  }

  if (minPrice) {
    query += ` AND discount_price >= $${values.length + 1}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND discount_price <= $${values.length + 1}`;
    values.push(maxPrice);
  }

  if (word) {
    query += ` AND name ILIKE $${values.length + 1}`;
    values.push(`%${word}%`);
  }

  if (sortBy) {
    if (sortBy === "priceAsc") {
      query += ` ORDER BY discount_price ASC`;
    } else if (sortBy === "priceDesc") {
      query += ` ORDER BY discount_price DESC`;
    } else if (sortBy === "nameAsc") {
      query += ` ORDER BY name ASC`;
    } else if (sortBy === "nameDesc") {
      query += ` ORDER BY name DESC`;
    }
  }

  try {
    const result = await sql.query(query, values);
    return NextResponse.json(
      { case: "success", products: result.rows },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching filtered products:", error);
    return NextResponse.json(
      {
        case: "error",
        message: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
