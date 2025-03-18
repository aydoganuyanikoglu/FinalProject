import { NextRequest, NextResponse } from "next/server";
import { increaseProductQuantity } from "@/lib/data";

export default async function PUT(req: NextRequest) {
  try {
    const { userId, product } = await req.json();
    if (!userId || !product) {
      return NextResponse.json(
        { message: "User ID and product are required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    await increaseProductQuantity(userId, product);
    return NextResponse.json(
      {
        case: "success",
        message: "Increased quantity!",
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
