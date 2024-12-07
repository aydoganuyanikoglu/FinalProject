"use server";
import { sql } from "@vercel/postgres";
import { typeUsers, Productstype, CartProductsType } from "./types";

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
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProductsByCategory(
  category: String
): Promise<Productstype[]> {
  try {
    const query = `SELECT * FROM products
    WHERE category = $1`;
    const result = await sql.query(query, [category]);
    return result.rows as Productstype[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products");
  }
}

export const fetchCartProducts = async (
  userId: String
): Promise<CartProductsType[]> => {
  try {
    const query = `
      SELECT id, quantity, name, category, short_description, price, image_url,discount_price, discount_percentage, brand
      FROM cart
      WHERE user_id = $1
      ORDER BY name;
    `;
    const result = await sql.query(query, [userId]);
    return result.rows as CartProductsType[];
  } catch (error: any) {
    console.error("Failed to fetch card products:", error.message);
    return [];
  }
};

export const decreaseProductQuantity = async (
  userId: string,
  product: CartProductsType
): Promise<void> => {
  try {
    const result = await sql.query(
      "SELECT quantity FROM cart WHERE user_id = $1 AND name = $2",
      [userId, product.name]
    );
    if (result.rows.length > 0) {
      const currentQuantity = result.rows[0].quantity;

      if (currentQuantity > 1) {
        await sql.query(
          "UPDATE cart SET quantity = quantity - 1 WHERE user_id = $1 AND name = $2",
          [userId, product.name]
        );
      } else {
        await sql.query("DELETE FROM cart WHERE user_id = $1 AND name = $2", [
          userId,
          product.name,
        ]);
      }
    }
  } catch (error) {
    console.error("Failed to decrease product quantity:", error);
    throw new Error("Failed to decrease product quantity");
  }
};

export const increaseProductQuantity = async (
  userId: string,
  product: CartProductsType
): Promise<void> => {
  try {
    await sql.query(
      "UPDATE cart SET quantity = quantity + 1 WHERE user_id = $1 AND name = $2",
      [userId, product.name]
    );
  } catch (error) {
    console.error("Failed to increase product quantity:", error);
    throw new Error("Failed to increase product quantity");
  }
};

export const deleteProductsFromCard = async (userId: string): Promise<void> => {
  try {
    const query = `
      DELETE FROM cart
      WHERE user_id = $1;
    `;
    await sql.query(query, [userId]);
  } catch (error) {
    console.error("Failed to delete all products", error);
    throw new Error("Failed to delete all products");
  }
};

export const deleteSelectedProductsFromCard = async (
  userId: string,
  product: CartProductsType
): Promise<void> => {
  try {
    const query = `
      DELETE FROM cart
      WHERE user_id = $1 AND name = $2;
    `;
    await sql.query(query, [userId, product.name]);
    console.log("Selected product deleted from cart successfully");
  } catch (error) {
    console.error("Failed to delete selected product", error);
    throw new Error("Failed to delete selected product");
  }
};

export const fetchCartTotalPrice = async (userId: string): Promise<number> => {
  try {
    const query = `
      SELECT 
        SUM(quantity * price) AS total_price
      FROM 
        cart
      WHERE 
        user_id = $1;
    `;
    const result = await sql.query(query, [userId]);
    return result.rows[0].total_price || 0;
  } catch (error: any) {
    console.error("Failed to fetch total price:", error.message);
    return 0;
  }
};

export const fetchTotalQuantity = async (userId: string): Promise<number> => {
  try {
    const query = `
      SELECT 
        SUM(quantity) AS total_quantity
      FROM 
        cart
      WHERE 
        user_id = $1;
    `;
    const result = await sql.query(query, [userId]);
    return result.rows[0].total_quantity || 0;
  } catch (error: any) {
    console.error("Failed to fetch total quantity:", error.message);
    return 0;
  }
};

export async function addToCart(
  userId: string,
  product: Productstype
): Promise<void> {
  try {
    const query = `
      INSERT INTO cart (
        user_id, 
        quantity,
        id, 
        name, 
        category, 
        short_description, 
        price, 
        image_url, 
        discount_price, 
        discount_percentage,
        brand
      )
      VALUES ($1,1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (user_id, id)
      DO UPDATE SET 
        quantity = cart.quantity + 1,
        updated_at = NOW();
    `;
    await sql.query(query, [
      userId,
      product.id,
      product.name,
      product.category,
      product.short_description,
      product.price,
      product.image_url,
      product.discount_price,
      product.discount_percentage,
      product.brand,
    ]);
    console.log("Product added to cart successfully");
  } catch (error: any) {
    console.error("Failed to add product to cart:", error.message);
  }
}
