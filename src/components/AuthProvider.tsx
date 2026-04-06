"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/auth/callback", "/blog", "/cancel", "/success"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change:", event, "Session:", session ? "exists" : "none");

        if (event === "SIGNED_IN" && session) {
          // User just signed in - redirect to dashboard
          // But only if they're not already on a protected route
          if (publicRoutes.includes(pathname)) {
            router.push("/dashboard");
            router.refresh();
          }
        }

        if (event === "SIGNED_OUT") {
          // User signed out - redirect to login if on protected route
          if (!publicRoutes.includes(pathname)) {
            router.push("/login");
            router.refresh();
          }
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  return <>{children}</>;
}
