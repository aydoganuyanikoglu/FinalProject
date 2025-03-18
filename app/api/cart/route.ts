import { NextResponse, NextRequest } from "next/server";
import {
  addToCart,
  deleteProductsFromCard,
  fetchCartProducts,
} from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { userId, product } = await req.json();
    if (!userId || !product) {
      return NextResponse.json(
        { message: "User ID and product are required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    await addToCart(userId, product);
    return NextResponse.json(
      {
        case: "success",
        message: "Adding to cart is successfull!",
      },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { case: "Error", error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    await deleteProductsFromCard(userId);
    return NextResponse.json(
      {
        case: "success",
        message: "Cart cleared successfully!",
      },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { case: "error", message: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    const products = await fetchCartProducts(userId);
    return NextResponse.json(
      {
        case: "success",
        message: "Cart products fetched successfully!",
        products: products,
      },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { case: "error", message: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
