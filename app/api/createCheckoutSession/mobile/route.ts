import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CartProductsType } from "@/lib/types";
import { fetchCartProducts } from "@/lib/data";
import { setOrderTokenCookie } from "@/lib/checkout";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in request body" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const cartItems = await fetchCartProducts(userId);

    const lineItems = cartItems?.map((item: CartProductsType) => {
      const discountPrice = parseFloat(item.discount_price || "0");
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.short_description,
          },
          unit_amount: Math.round(discountPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const orderId = `order_${Date.now()}`;
    await setOrderTokenCookie(orderId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/success?session=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cancel?session=${orderId}`,
      metadata: {
        user_id: userId,
        order_id: orderId,
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 3000,
              currency: "usd",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
    });

    return NextResponse.json(
      { url: session.url },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
