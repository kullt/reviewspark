import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRICE_STARTER, STRIPE_PRICE_PRO } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, email } = await request.json();

    if (!priceId || !email) {
      return NextResponse.json(
        { error: "Price ID and email are required" },
        { status: 400 }
      );
    }

    // Validate price ID
    const validPriceIds = [STRIPE_PRICE_STARTER, STRIPE_PRICE_PRO];
    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId || "",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Create checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
