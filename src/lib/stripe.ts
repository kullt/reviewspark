import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
});

export const STRIPE_PRICE_STARTER = "price_1TIa1ZDHhvpEegXB96jXHHcs";
export const STRIPE_PRICE_PRO = "price_1TIa1yDHhvpEegXBfjzGOAjN";
