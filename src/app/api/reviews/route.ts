import { NextRequest, NextResponse } from 'next/server'
import { syncReviewsForProfile, getUserReviews } from '@/lib/google-reviews'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/reviews - Get user's reviews
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

    const { searchParams } = new URL(req.url)
    const businessProfileId = searchParams.get('profileId')
    const isProcessed = searchParams.get('isProcessed')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const reviews = await getUserReviews(userId, {
      businessProfileId: businessProfileId || undefined,
      isProcessed: isProcessed !== null ? isProcessed === 'true' : undefined,
      limit,
      offset,
    })

    return NextResponse.json({ reviews })
  } catch (error: any) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/reviews/sync - Sync reviews for a business profile
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

    const { businessProfileId } = await req.json()

    if (!businessProfileId) {
      return NextResponse.json(
        { error: 'Missing businessProfileId' },
        { status: 400 }
      )
    }

    // Verify the profile belongs to the user
    const { data: profile } = await supabaseAdmin
      .from('business_profiles')
      .select('*')
      .eq('id', businessProfileId)
      .eq('user_id', userId)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Business profile not found' },
        { status: 404 }
      )
    }

    // Sync reviews
    const result = await syncReviewsForProfile(
      userId,
      businessProfileId,
      'manual'
    )

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error syncing reviews:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}