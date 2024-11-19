"use server";
import { sql } from "@vercel/postgres";
import { typeUsers, Productstype } from "./types";

export async function fetchUsers(): Promise<void> {
  try {
    const data = await sql<typeUsers>`SELECT * FROM users`;
    console.log(data.rows);
    return;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProducts(): Promise<Productstype[]> {
  try {
    const data = await sql<Productstype>`SELECT * FROM products`;
    console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products");
  }
}
