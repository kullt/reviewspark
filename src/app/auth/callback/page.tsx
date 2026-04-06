"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase client with detectSessionInUrl: true automatically
        // detects the access_token in the URL hash and sets the session
        // We just need to wait for the auth state change

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setError("Failed to authenticate. Please try signing in again.");
          return;
        }

        if (session) {
          // User is authenticated, redirect to dashboard
          router.push("/dashboard");
          router.refresh();
        } else {
          // No session yet, wait a bit and check again
          // The Supabase client may still be processing the hash
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
              if (event === "SIGNED_IN" && newSession) {
                router.push("/dashboard");
                router.refresh();
              }
            }
          );

          // Cleanup subscription on unmount
          return () => {
            subscription.unsubscribe();
          };
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("An unexpected error occurred. Please try signing in again.");
      }
    };

    handleAuthCallback();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
            <span className="text-xl font-bold text-white">✕</span>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {error}
          </p>
          <a
            href="/login"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          Completing sign in...
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please wait while we verify your account.
        </p>
      </div>
    </div>
  );
}
