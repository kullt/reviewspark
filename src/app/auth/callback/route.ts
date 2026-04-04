import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    // In production, exchange the code for a session
    // const supabase = createRouteHandlerClient({ cookies });
    // await supabase.auth.exchangeCodeForSession(code);
    
    return NextResponse.redirect(new URL(next, request.url));
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL("/auth/auth-code-error", request.url));
}
