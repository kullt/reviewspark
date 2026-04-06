"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { handleAuthError } from "@/lib/auth-errors";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Log to both console and debug state
  const log = (msg: string) => {
    console.log(`[LoginPage] ${msg}`);
    setDebugInfo(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Mark as client-side mounted to ensure hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check Supabase on mount
  useEffect(() => {
    log("Component mounted");
    log(`Supabase client: ${!!supabase ? "OK" : "MISSING"}`);
    log(`Supabase auth: ${!!supabase?.auth ? "OK" : "MISSING"}`);
  }, []);

  // Add Shift+D keyboard handler for debug panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDebug(prev => !prev);
        log("Debug panel toggled via Shift+D");
      }
      if (e.key === 'Escape' && showDebug) {
        setShowDebug(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDebug]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    log("=== LOGIN ATTEMPT STARTED ===");
    log(`Email provided: ${email ? "YES" : "NO"}`);
    log(`Password provided: ${password ? "YES (hidden)" : "NO"}`);
    
    setLoading(true);
    setError("");

    try {
      log("Calling supabase.auth.signInWithPassword...");
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      log(`Auth response received`);
      log(`Auth error: ${authError ? "YES - " + authError.message : "NO"}`);
      log(`Session: ${data?.session ? "PRESENT" : "MISSING"}`);
      log(`User: ${data?.user ? "PRESENT" : "MISSING"}`);

      if (authError) {
        log(`Login failed: ${authError.message}`);
        setError(handleAuthError(authError));
        setLoading(false);
        return;
      }

      if (!data?.session) {
        log("ERROR: No session returned despite no error");
        setError("Login succeeded but no session was created. Please try again.");
        setLoading(false);
        return;
      }

      log("Login successful! Redirecting to dashboard...");
      // Redirect to dashboard on success using Next.js router
      router.push("/dashboard");
    } catch (err) {
      log(`EXCEPTION caught: ${err instanceof Error ? err.message : "Unknown error"}`);
      console.error("Login error:", err);
      setError(handleAuthError(err));
      setLoading(false);
    }
  };

  // Debug panel for troubleshooting
  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-xl font-bold text-white">R</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to ReviewSpark
            </h2>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to ReviewSpark
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-lg border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-lg border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={() => setError("")}
              type="error"
            />
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        {/* Debug Panel - Hidden by default, press Shift+D to show */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-gray-400 hover:text-gray-600 mt-4"
          >
            {showDebug ? "Hide Debug Info" : "Show Debug Info (Shift+D)"}
          </button>
        </div>
        
        {showDebug && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono">
            <p className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Debug Console:</p>
            {debugInfo.length === 0 ? (
              <p className="text-gray-500">No debug info yet. Try clicking Sign in.</p>
            ) : (
              debugInfo.map((msg, i) => (
                <div key={i} className="text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 py-1 last:border-0">
                  {msg}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
