import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/user/settings - Get user settings
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

    const { data: settings, error } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      throw new Error(`Failed to fetch settings: ${error.message}`)
    }

    // Return default settings if none exist
    return NextResponse.json({
      settings: settings || {
        email_notifications: true,
        notify_on_new_review: true,
        notify_on_post_generated: true,
        auto_generate_threshold: 4,
        preferred_platforms: ['instagram', 'facebook', 'twitter'],
      },
    })
  } catch (error: any) {
    console.error('Error fetching user settings:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/user/settings - Create or update user settings
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
      emailNotifications,
      notifyOnNewReview,
      notifyOnPostGenerated,
      autoGenerateThreshold,
      preferredPlatforms,
    } = await req.json()

    const { data: settings, error } = await supabaseAdmin
      .from('user_settings')
      .upsert(
        {
          user_id: userId,
          email_notifications: emailNotifications,
          notify_on_new_review: notifyOnNewReview,
          notify_on_post_generated: notifyOnPostGenerated,
          auto_generate_threshold: autoGenerateThreshold,
          preferred_platforms: preferredPlatforms,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to save settings: ${error.message}`)
    }

    return NextResponse.json({ settings })
  } catch (error: any) {
    console.error('Error saving user settings:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}