import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { fetchCartProducts, addOrder } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event;

  try {
    const buf = await req.arrayBuffer();
    const text = new TextDecoder().decode(buf);

    event = stripe.webhooks.constructEvent(
      text,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error("Error verifying webhook signature:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;

    if (!userId) {
      throw new Error("User ID is missing in the session metadata.");
    }
    const cart_items = await fetchCartProducts(userId);
    const orderId = `order_${Date.now()}`;
    await addOrder(userId, orderId, cart_items, session);
  }

  return new NextResponse("Webhook received successfully", { status: 200 });
}
