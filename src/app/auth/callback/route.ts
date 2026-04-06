import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    // The Supabase client will automatically exchange the code for a session
    // when the user is redirected back to the application
    // The session is stored in cookies by the Supabase auth helper
    return NextResponse.redirect(new URL(next, request.url));
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL("/auth/auth-code-error", request.url));
}
