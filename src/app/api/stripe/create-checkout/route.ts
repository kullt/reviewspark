import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRICE_STARTER, STRIPE_PRICE_PRO } from "@/lib/stripe";

const priceMap: Record<string, string> = {
  starter: STRIPE_PRICE_STARTER,
  pro: STRIPE_PRICE_PRO,
};

export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email } = await request.json();

    if (!plan || !email) {
      return NextResponse.json(
        { error: "Plan and email are required" },
        { status: 400 }
      );
    }

    // Validate plan
    const priceId = priceMap[plan.toLowerCase()];
    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'starter' or 'pro'" },
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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId: userId || "",
        plan: plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Create checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
