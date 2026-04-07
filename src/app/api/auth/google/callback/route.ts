import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForTokens, getGoogleUserInfo, saveGoogleAccount } from '@/lib/google-auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const state = searchParams.get('state')

    // Parse state
    let redirectAfter = '/dashboard/connections'
    if (state) {
      try {
        const stateData = JSON.parse(Buffer.from(state, 'base64').toString())
        redirectAfter = stateData.redirect || redirectAfter
      } catch (e) {
        console.warn('Failed to parse state:', e)
      }
    }

    // Handle OAuth error
    if (error) {
      console.error('Google OAuth error:', error)
      return NextResponse.redirect(`${redirectAfter}?error=${encodeURIComponent(error)}`)
    }

    if (!code) {
      return NextResponse.redirect(`${redirectAfter}?error=missing_code`)
    }

    // Get the current user session
    // Note: In production, you'd want to validate the session more securely
    // This is a simplified version
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    // Try to get user from cookie/session
    const cookieHeader = req.headers.get('cookie')
    if (cookieHeader) {
      // Extract Supabase auth token from cookies
      const sbAuthCookie = cookieHeader
        .split(';')
        .find(c => c.trim().startsWith('sb-access-token='))
      
      if (sbAuthCookie) {
        const token = sbAuthCookie.split('=')[1]
        // Verify token and get user
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
        if (!authError && user) {
          userId = user.id
        }
      }
    }

    // If no user found, redirect to login
    if (!userId) {
      return NextResponse.redirect(`/login?redirect=${encodeURIComponent(req.url)}`)
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code)

    // Get Google user info
    const googleUserInfo = await getGoogleUserInfo(tokens.accessToken)

    // Save to database
    await saveGoogleAccount(userId, googleUserInfo, tokens)

    // Redirect to success page
    return NextResponse.redirect(`${redirectAfter}?success=connected`)
  } catch (error: any) {
    console.error('Error in Google OAuth callback:', error)
    return NextResponse.redirect(`/dashboard/connections?error=${encodeURIComponent(error.message)}`)
  }
}