import { NextResponse, NextRequest } from "next/server";
import { deleteSelectedProductsFromCard } from "@/lib/data";

export async function DELETE(req: NextRequest) {
  try {
    const { userId, product } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    await deleteSelectedProductsFromCard(userId, product);
    return NextResponse.json(
      {
        case: "success",
        message: "Product removed from cart successfully!",
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
