import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
export const config = {
  api: {
    bodyParser: false,
  },
};

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
    console.log("Payment succeeded:", session);

    await saveOrderToDatabase(session);
  }

  return new NextResponse("Webhook received successfully", { status: 200 });
}

async function saveOrderToDatabase(session: any) {
  const { id, amount_total, customer_details } = session;

  console.log("Saving order to database:", {
    id,
    amount_total,
    customer_details,
  });
}
