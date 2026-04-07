import { NextRequest, NextResponse } from 'next/server'
import { generateSocialPosts } from '@/lib/openai'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/reviews/generate - Generate posts for a specific review
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

    const { reviewId } = await req.json()

    if (!reviewId) {
      return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 })
    }

    // Get the review
    const { data: review, error: reviewError } = await supabaseAdmin
      .from('reviews')
      .select(`
        *,
        business_profiles:business_profile_id(business_name)
      `)
      .eq('id', reviewId)
      .eq('user_id', userId)
      .single()

    if (reviewError || !review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Check subscription status
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (!subscription) {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      )
    }

    // Get user's generations count this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: generationCount } = await supabaseAdmin
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString())

    // Check plan limits
    const planLimits: Record<string, number> = {
      starter: 50,
      pro: 999999, // Unlimited
    }

    const limit = planLimits[subscription.plan] || 50
    if (generationCount && generationCount >= limit && subscription.plan !== 'pro') {
      return NextResponse.json(
        { error: 'Monthly generation limit reached. Upgrade to Pro for unlimited.' },
        { status: 403 }
      )
    }

    // Generate posts
    const businessName = review.business_profiles?.business_name || 'Your Business'
    const posts = await generateSocialPosts({
      reviewText: review.review_text,
      businessName: businessName,
    })

    // Update review with generated posts
    const { error: updateError } = await supabaseAdmin
      .from('reviews')
      .update({
        is_processed: true,
        processed_at: new Date().toISOString(),
        generated_posts: posts,
      })
      .eq('id', reviewId)

    if (updateError) {
      throw new Error(`Failed to update review: ${updateError.message}`)
    }

    // Also save to generations table for tracking
    await supabaseAdmin.from('generations').insert({
      user_id: userId,
      business_name: businessName,
      review_text: review.review_text,
      posts: posts,
    })

    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error('Error generating posts for review:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}