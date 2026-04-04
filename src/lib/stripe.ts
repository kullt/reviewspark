import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
});

export const STRIPE_PRICE_STARTER = process.env.STRIPE_PRICE_STARTER_ID || "price_starter";
export const STRIPE_PRICE_PRO = process.env.STRIPE_PRICE_PRO_ID || "price_pro";
