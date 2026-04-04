"use client";

import { useState } from "react";

interface PricingButtonProps {
  priceId: string;
  email?: string;
  userId?: string;
  children: React.ReactNode;
  className?: string;
}

export function PricingButton({
  priceId,
  email,
  userId,
  children,
  className = "",
}: PricingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, email, userId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
