import { NextRequest, NextResponse } from 'next/server'
import { saveBusinessProfile } from '@/lib/google-business'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/google/business-profile - Save a business profile
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

    const {
      googleAccountId,
      locationId,
      businessAccountId,
      businessName,
      address,
      phone,
      website,
      placeId,
    } = await req.json()

    if (!googleAccountId || !locationId || !businessName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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

    // Save the business profile
    const profile = await saveBusinessProfile(userId, googleAccountId, {
      id: locationId,
      businessAccountId,
      name: businessName,
      address,
      phone,
      website,
      placeId,
    })

    return NextResponse.json({ profile })
  } catch (error: any) {
    console.error('Error saving business profile:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/google/business-profile - Get user's saved business profiles
export async function GET(req: NextRequest) {
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

    const { data: profiles, error } = await supabaseAdmin
      .from('business_profiles')
      .select(`
        *,
        google_accounts:google_account_id(google_email)
      `)
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`)
    }

    return NextResponse.json({ profiles: profiles || [] })
  } catch (error: any) {
    console.error('Error fetching business profiles:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/google/business-profile - Update business profile settings
export async function PATCH(req: NextRequest) {
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

    const { profileId, autoSyncEnabled, autoGenerateEnabled } = await req.json()

    if (!profileId) {
      return NextResponse.json({ error: 'Missing profileId' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('business_profiles')
      .update({
        auto_sync_enabled: autoSyncEnabled,
        auto_generate_enabled: autoGenerateEnabled,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating business profile:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/google/business-profile - Remove a business profile
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
    const profileId = searchParams.get('id')

    if (!profileId) {
      return NextResponse.json({ error: 'Missing profile ID' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('business_profiles')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', profileId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to remove profile: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error removing business profile:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}