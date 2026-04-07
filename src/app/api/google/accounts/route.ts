import { NextRequest, NextResponse } from 'next/server'
import { getBusinessAccounts, getAllBusinessLocations, saveBusinessProfile } from '@/lib/google-business'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/google/accounts - Get user's connected Google accounts
export async function GET(req: NextRequest) {
  try {
    // Get user from auth header or cookie
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
      if (!error && user) {
        userId = user.id
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's Google accounts
    const { data: accounts, error } = await supabaseAdmin
      .from('google_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch accounts: ${error.message}`)
    }

    return NextResponse.json({ accounts: accounts || [] })
  } catch (error: any) {
    console.error('Error fetching Google accounts:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/google/accounts - Refresh accounts and fetch available locations
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
      if (!error && user) {
        userId = user.id
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { googleAccountId } = await req.json()

    if (!googleAccountId) {
      return NextResponse.json({ error: 'Missing googleAccountId' }, { status: 400 })
    }

    // Verify the account belongs to the user
    const { data: account } = await supabaseAdmin
      .from('google_accounts')
      .select('*')
      .eq('id', googleAccountId)
      .eq('user_id', userId)
      .single()

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    // Fetch available locations from Google
    const locations = await getAllBusinessLocations(googleAccountId)

    return NextResponse.json({ locations })
  } catch (error: any) {
    console.error('Error fetching locations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/google/accounts - Disconnect a Google account
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
      if (!error && user) {
        userId = user.id
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const accountId = searchParams.get('id')

    if (!accountId) {
      return NextResponse.json({ error: 'Missing account ID' }, { status: 400 })
    }

    // Mark account as inactive
    const { error } = await supabaseAdmin
      .from('google_accounts')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', accountId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to disconnect account: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error disconnecting account:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}