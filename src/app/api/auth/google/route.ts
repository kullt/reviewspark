import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-auth'

export async function GET(req: NextRequest) {
  try {
    // Get the redirect URL from query params (optional)
    const { searchParams } = new URL(req.url)
    const redirectAfter = searchParams.get('redirect') || '/dashboard/connections'
    
    // Create state to pass through OAuth flow
    const state = Buffer.from(JSON.stringify({ redirect: redirectAfter })).toString('base64')
    
    // Generate Google OAuth URL
    const authUrl = getGoogleAuthUrl(state)
    
    return NextResponse.redirect(authUrl)
  } catch (error: any) {
    console.error('Error initiating Google OAuth:', error)
    return NextResponse.redirect(`/dashboard/connections?error=${encodeURIComponent(error.message)}`)
  }
}