"use server";
import { sql } from "@vercel/postgres";
import {
  typeUsers,
  Productstype,
  CartProductsType,
  FavoriteProductsType,
  ReviewsType,
  CommentType,
  BrandsType,
  Productstype2,
  addressesType,
} from "./types";
import { verifySession } from "@/auth/session";

export const getFilteredProducts = async (filters: {
  category?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  sortBy?: string | null;
  word?: string | null;
}): Promise<Productstype[]> => {
  const values: any[] = [];

  let query = `SELECT * FROM products WHERE 1=1`;

  if (filters.category && filters.category.toLowerCase() !== "all products") {
    query += ` AND category = $${values.length + 1}`;
    values.push(filters.category);
  }

  if (filters.minPrice) {
    query += ` AND price >= $${values.length + 1}`;
    values.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    query += ` AND price <= $${values.length + 1}`;
    values.push(filters.maxPrice);
  }

  if (filters.word) {
    query += ` AND name ILIKE $${values.length + 1}`;
    values.push(`%${filters.word}%`);
  }

  if (filters.sortBy) {
    if (filters.sortBy === "priceAsc") {
      query += ` ORDER BY price ASC`;
    } else if (filters.sortBy === "priceDesc") {
      query += ` ORDER BY price DESC`;
    } else if (filters.sortBy === "nameAsc") {
      query += ` ORDER BY name ASC`;
    } else if (filters.sortBy === "nameDesc") {
      query += ` ORDER BY name DESC`;
    }
  }

  try {
    const result = await sql.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Database query failed", error);
    throw error;
  }
};

export const fetchCookie = async (): Promise<string | undefined> => {
  try {
    const sessionData = await verifySession();
    return sessionData?.id;
  } catch (error) {
    console.error("Fetcing cookie error:", error);
  }
};

export async function fetchUsers(): Promise<typeUsers[]> {
  try {
    const data = await sql<typeUsers>`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function fetchAddresses(
  userId: string
): Promise<addressesType[] | undefined> {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
    const query = `SELECT * FROM addresses
    WHERE user_id = $1`;
    const result = await sql.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch addresses");
  }
}

export const addAddressToDatabase = async (
  values: addressesType,
  userId: string
): Promise<void> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
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

    console.log("Address added successfully!");
  } catch (error: any) {
    console.error("Failed to add address:", error.message);
    throw new Error("Failed to add address");
  }
};

export const removeAddressFromDb = async (addressId: string): Promise<void> => {
  try {
    const query1 = `
      DELETE FROM addresses
      WHERE id = $1
    `;
    await sql.query(query1, [addressId]);
  } catch (error) {
    console.error("Error while deleting an address", error);
  }
};

export async function deleteUser(userId: string): Promise<void> {
  const isAdmin = userId === "5672046636";
  if (isAdmin) {
    console.log("You can not delete an admin accout!");
    return;
  }
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
    const query1 = `
      DELETE FROM users
      WHERE id = $1
    `;
    await sql.query(query1, [userId]);
  } catch (error) {
    console.error("Error while deleting a user", error);
  }
}

export async function fetchUserById(email: string): Promise<typeUsers> {
  try {
    const query = `SELECT * FROM users
    WHERE email = $1`;
    const result = await sql.query(query, [email]);
    return result.rows[0] as typeUsers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function fetchProductById(
  productId: string
): Promise<Productstype> {
  try {
    const query = `SELECT * FROM products
    WHERE id = $1`;
    const result = await sql.query(query, [productId]);
    return result.rows[0] as Productstype;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product");
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

export async function fetchBrands(): Promise<BrandsType[]> {
  try {
    const data = await sql<BrandsType>`SELECT DISTINCT brand FROM products`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch brands");
  }
}

export const fetchFavoriteProducts = async (
  userId: String
): Promise<FavoriteProductsType[] | undefined> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
    const query = `
      SELECT *
      FROM favoriteproducts
      WHERE user_id = $1
      ORDER BY name;
    `;
    const result = await sql.query(query, [userId]);
    return result.rows as FavoriteProductsType[];
  } catch (error: any) {
    console.error("Failed to fetch card products:", error.message);
    return [];
  }
};

export const fetchReviews = async (
  productId: String
): Promise<ReviewsType[]> => {
  try {
    const query = `
      SELECT *
      FROM reviews
      WHERE product_id = $1
      ORDER BY created_at;
    `;
    const result = await sql.query(query, [productId]);
    return result.rows as ReviewsType[];
  } catch (error: any) {
    console.error("Failed to fetch reviews:", error.message);
    return [];
  }
};

export async function fetchReviewStatsByProductId(
  productId: string
): Promise<{ reviewCount: number; avgRating: number }> {
  try {
    const query = `
      SELECT 
        COUNT(*) AS review_count,
        AVG(rating) AS avg_rating
      FROM reviews
      WHERE product_id = $1
    `;
    const result = await sql.query(query, [productId]);

    return {
      reviewCount: parseInt(result.rows[0].review_count, 10),
      avgRating: parseFloat(result.rows[0].avg_rating) || 0,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch review statistics");
  }
}

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const query1 = `
      DELETE FROM products
      WHERE id = $1
    `;
    const query2 = `
      DELETE FROM favoriteproducts
      WHERE id = $1
    `;
    const query3 = `
      DELETE FROM cart
      WHERE id = $1
    `;
    await sql.query(query1, [productId]);
    await sql.query(query2, [productId]);
    await sql.query(query3, [productId]);
    console.log("Product removed successfully");
  } catch (error: any) {
    console.error("Failed to delete product:", error.message);
  }
};

export const addProductToDatabase = async (
  values: Productstype2
): Promise<void> => {
  try {
    const query = `
      INSERT INTO products (
        name, 
        category, 
        short_description, 
        long_description, 
        price, 
        image_url, 
        discount_percentage, 
        discount_start_date, 
        discount_end_date, 
        brand
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    await sql.query(query, [
      values.name,
      values.category,
      values.short_description,
      values.long_description,
      values.price,
      values.image_url,
      values.discount_percentage,
      values.discount_start_date,
      values.discount_end_date,
      values.brand,
    ]);
    console.log("Product added successfully!");
  } catch (error: any) {
    console.error("Failed to add product:", error.message);
  }
};

export const addReview = async (
  values: CommentType,
  userId: string,
  userName: string,
  productId: string
): Promise<void> => {
  const reviews = await fetchReviews(productId);
  const isReviewedBefore = reviews?.some((review) => review.user_id === userId);
  if (isReviewedBefore) {
    return;
  }
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
    const query = `
      INSERT INTO reviews (
        user_id, 
        product_id, 
        user_name, 
        rating, 
        review_title, 
        review
      )
      VALUES ($1,$2,$3,$4,$5,$6)
    `;
    await sql.query(query, [
      userId,
      productId,
      userName,
      values.rating,
      values.title,
      values.review,
    ]);
    console.log("Comment added successfully!");
  } catch (error: any) {
    console.error("Failed to add comment:", error.message);
  }
};

export const addToFavoriteProducts = async (
  userId: string,
  product: Productstype
): Promise<void> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
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
    console.log("Product added to favorites successfully");
  } catch (error: any) {
    console.error("Failed to add product to favorites:", error.message);
  }
};

export const removeFromFavoriteProducts = async (
  userId: string,
  productId: string
): Promise<void> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
    const query = `
      DELETE FROM favoriteproducts
      WHERE user_id = $1 AND id = $2
    `;
    await sql.query(query, [userId, productId]);
    console.log("Product removed from favorites successfully");
  } catch (error: any) {
    console.error("Failed to remove product from favorites:", error.message);
  }
};

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
): Promise<CartProductsType[] | undefined> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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

export const fetchCartTotalPrice = async (
  userId: string
): Promise<number | undefined> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
  try {
    const query = `
      SELECT 
        SUM(quantity * discount_price) AS total_price
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

export const fetchTotalQuantity = async (
  userId: string
): Promise<number | undefined> => {
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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
  const id = await fetchCookie();
  if (id !== userId) {
    console.log("You dont have a permission!");
    return;
  }
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
