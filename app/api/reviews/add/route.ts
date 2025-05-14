import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { isProductInOrder } from "@/lib/data";
import { fetchReviews } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const {
      values,
      userId,
      userName,
      productId,
      productName,
    }: {
      values: {
        rating: number;
        title: string;
        review: string;
      };
      userId: string;
      userName: string;
      productId: string;
      productName?: string;
    } = await req.json();

    const hasPurchased = await isProductInOrder(userId, productName || "");
    if (!hasPurchased) {
      return NextResponse.json(
        { case: "error", message: "Only purchased products can be reviewed." },
        { status: 403, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const reviews = await fetchReviews(productId);
    const isReviewedBefore = reviews?.some(
      (review) => review.user_id === userId
    );
    if (isReviewedBefore) {
      return NextResponse.json(
        { case: "error", message: "You have already reviewed this product." },
        { status: 409, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const query = `
      INSERT INTO reviews (
        user_id, 
        product_id, 
        user_name, 
        rating, 
        review_title, 
        review
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await sql.query(query, [
      userId,
      productId,
      userName,
      values.rating,
      values.title,
      values.review,
    ]);

    return NextResponse.json(
      { case: "success", message: "Review added successfully!" },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Failed to add comment:", error.message);
    return NextResponse.json(
      {
        case: "error",
        message: "Failed to add review",
        details: error.message,
      },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
