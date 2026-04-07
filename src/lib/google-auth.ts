import { google, mybusinessaccountmanagement_v1, mybusinessbusinessinformation_v1, mybusinessnotifications_v1 } from 'googleapis'
import { supabaseAdmin } from '@/lib/supabase'

// OAuth 2.0 client configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'

// Required OAuth scopes for Google Business Profile
export const GOOGLE_OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

// Initialize OAuth2 client
export function getOAuth2Client() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing Google OAuth credentials')
  }

  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  )
}

// Generate OAuth URL for user consent
export function getGoogleAuthUrl(state?: string) {
  const oauth2Client = getOAuth2Client()
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // Required to get refresh token
    scope: GOOGLE_OAUTH_SCOPES,
    include_granted_scopes: true,
    prompt: 'consent', // Force consent screen to get refresh token
    state: state || undefined,
  })
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string) {
  const oauth2Client = getOAuth2Client()
  
  const { tokens } = await oauth2Client.getToken(code)
  
  if (!tokens.access_token || !tokens.refresh_token) {
    throw new Error('Failed to obtain access or refresh token')
  }

  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    scope: tokens.scope,
  }
}

// Refresh access token using refresh token
export async function refreshAccessToken(refreshToken: string) {
  const oauth2Client = getOAuth2Client()
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  
  const { credentials } = await oauth2Client.refreshAccessToken()
  
  return {
    accessToken: credentials.access_token!,
    expiryDate: credentials.expiry_date ? new Date(credentials.expiry_date) : null,
  }
}

// Get user info from Google
export async function getGoogleUserInfo(accessToken: string) {
  const oauth2Client = getOAuth2Client()
  oauth2Client.setCredentials({ access_token: accessToken })
  
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
  const { data } = await oauth2.userinfo.get()
  
  return {
    id: data.id!,
    email: data.email!,
    name: data.name,
    picture: data.picture,
  }
}

// Get valid access token (refresh if needed)
export async function getValidAccessToken(googleAccountId: string) {
  // Get account from database
  const { data: account, error } = await supabaseAdmin
    .from('google_accounts')
    .select('*')
    .eq('id', googleAccountId)
    .single()

  if (error || !account) {
    throw new Error('Google account not found')
  }

  // Check if token is expired or about to expire (within 5 minutes)
  const expiresAt = new Date(account.token_expires_at)
  const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000)

  if (expiresAt <= fiveMinutesFromNow) {
    // Token is expired or about to expire, refresh it
    const { accessToken, expiryDate } = await refreshAccessToken(account.refresh_token)
    
    // Update in database
    const { error: updateError } = await supabaseAdmin
      .from('google_accounts')
      .update({
        access_token: accessToken,
        token_expires_at: expiryDate?.toISOString() || new Date(Date.now() + 3600 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', googleAccountId)

    if (updateError) {
      console.error('Failed to update access token:', updateError)
    }

    return accessToken
  }

  return account.access_token
}

// Save Google account to database
export async function saveGoogleAccount(
  userId: string,
  googleUserInfo: { id: string; email: string; name?: string | null; picture?: string | null },
  tokens: { accessToken: string; refreshToken: string; expiryDate: Date | null; scope?: string | null }
) {
  const { data, error } = await supabaseAdmin
    .from('google_accounts')
    .upsert({
      user_id: userId,
      google_email: googleUserInfo.email,
      google_user_id: googleUserInfo.id,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      token_expires_at: tokens.expiryDate?.toISOString() || new Date(Date.now() + 3600 * 1000).toISOString(),
      scope: tokens.scope || GOOGLE_OAUTH_SCOPES.join(' '),
      is_active: true,
    }, {
      onConflict: 'google_user_id',
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save Google account: ${error.message}`)
  }

  return data
}

// Disconnect Google account
export async function disconnectGoogleAccount(userId: string, googleAccountId: string) {
  // Revoke token with Google
  const { data: account } = await supabaseAdmin
    .from('google_accounts')
    .select('access_token')
    .eq('id', googleAccountId)
    .eq('user_id', userId)
    .single()

  if (account?.access_token) {
    try {
      const oauth2Client = getOAuth2Client()
      await oauth2Client.revokeToken(account.access_token)
    } catch (err) {
      console.warn('Failed to revoke token with Google:', err)
    }
  }

  // Mark as inactive in database
  const { error } = await supabaseAdmin
    .from('google_accounts')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', googleAccountId)
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to disconnect account: ${error.message}`)
  }

  return true
}