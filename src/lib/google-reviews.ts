import { google } from 'googleapis'
import { getValidAccessToken } from './google-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { generateSocialPosts } from './openai'

// Review data from Google Business Profile API
interface GoogleReview {
  name: string
  reviewId: string
  reviewer: {
    displayName: string
    profilePhotoUrl?: string
  }
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  comment?: string
  reviewReply?: {
    comment: string
    updateTime: string
  }
  createTime: string
  updateTime?: string
}

// Fetch reviews for a specific location
export async function fetchReviewsForLocation(
  googleAccountId: string,
  locationId: string,
  pageSize: number = 50
): Promise<GoogleReview[]> {
  const accessToken = await getValidAccessToken(googleAccountId)
  
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })

  // My Business API endpoint for reviews
  // Base URL: https://mybusiness.googleapis.com/v4
  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationId}/reviews?pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to fetch reviews: ${error}`)
  }

  const data = await response.json()
  return data.reviews || []
}

// Sync reviews for a business profile
export async function syncReviewsForProfile(
  userId: string,
  businessProfileId: string,
  syncType: 'manual' | 'scheduled' | 'webhook' = 'manual'
) {
  // Get business profile
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('business_profiles')
    .select('*')
    .eq('id', businessProfileId)
    .eq('user_id', userId)
    .single()

  if (profileError || !profile) {
    throw new Error('Business profile not found')
  }

  // Create sync log entry
  const { data: syncLog } = await supabaseAdmin
    .from('sync_logs')
    .insert({
      user_id: userId,
      business_profile_id: businessProfileId,
      sync_type: syncType,
      status: 'success',
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  const syncLogId = syncLog?.id

  try {
    // Construct full location ID
    const fullLocationId = profile.google_business_account_id.includes('/locations/')
      ? profile.google_business_account_id
      : `${profile.google_business_account_id}/locations/${profile.location_id}`

    // Fetch reviews from Google
    const reviews = await fetchReviewsForLocation(
      profile.google_account_id,
      fullLocationId
    )

    let newCount = 0
    let processedCount = 0

    // Process each review
    for (const review of reviews) {
      const rating = convertStarRating(review.starRating)
      
      // Check if review already exists
      const { data: existingReview } = await supabaseAdmin
        .from('reviews')
        .select('id, is_processed')
        .eq('google_review_id', review.reviewId)
        .single()

      if (!existingReview) {
        // Insert new review
        const { error: insertError } = await supabaseAdmin
          .from('reviews')
          .insert({
            user_id: userId,
            business_profile_id: businessProfileId,
            google_review_id: review.reviewId,
            reviewer_name: review.reviewer?.displayName || 'Anonymous',
            reviewer_photo_url: review.reviewer?.profilePhotoUrl,
            rating: rating,
            review_text: review.comment || '',
            review_reply: review.reviewReply?.comment,
            review_reply_updated_at: review.reviewReply?.updateTime,
            create_time: review.createTime,
            update_time: review.updateTime,
            is_processed: false,
          })

        if (!insertError) {
          newCount++

          // Auto-generate posts if enabled and rating meets threshold
          await processNewReview(userId, businessProfileId, review.reviewId)
        }
      } else if (!existingReview.is_processed && profile.auto_generate_enabled) {
        // Process existing unprocessed review
        await processNewReview(userId, businessProfileId, review.reviewId)
        processedCount++
      }
    }

    // Update business profile last sync time
    await supabaseAdmin
      .from('business_profiles')
      .update({
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', businessProfileId)

    // Update sync log
    await supabaseAdmin
      .from('sync_logs')
      .update({
        status: 'success',
        reviews_fetched: reviews.length,
        reviews_new: newCount,
        reviews_processed: processedCount,
        completed_at: new Date().toISOString(),
      })
      .eq('id', syncLogId)

    return {
      success: true,
      reviewsFetched: reviews.length,
      reviewsNew: newCount,
      reviewsProcessed: processedCount,
    }
  } catch (error: any) {
    // Update sync log with error
    await supabaseAdmin
      .from('sync_logs')
      .update({
        status: 'error',
        error_message: error.message,
        completed_at: new Date().toISOString(),
      })
      .eq('id', syncLogId)

    throw error
  }
}

// Process a new review (auto-generate posts)
async function processNewReview(
  userId: string,
  businessProfileId: string,
  googleReviewId: string
) {
  try {
    // Get user settings
    const { data: settings } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    // Get the review
    const { data: review } = await supabaseAdmin
      .from('reviews')
      .select(`
        *,
        business_profiles:business_profile_id(business_name)
      `)
      .eq('google_review_id', googleReviewId)
      .single()

    if (!review || !settings) return

    // Check if rating meets threshold for auto-generation
    const threshold = settings.auto_generate_threshold || 4
    if (review.rating < threshold) {
      // Mark as processed but skip generation
      await supabaseAdmin
        .from('reviews')
        .update({
          is_processed: true,
          processed_at: new Date().toISOString(),
        })
        .eq('id', review.id)
      return
    }

    // Get business name
    const businessName = review.business_profiles?.business_name || 'Your Business'

    // Generate social posts
    const posts = await generateSocialPosts({
      reviewText: review.review_text,
      businessName: businessName,
    })

    // Update review with generated posts
    await supabaseAdmin
      .from('reviews')
      .update({
        is_processed: true,
        processed_at: new Date().toISOString(),
        generated_posts: posts,
      })
      .eq('id', review.id)

    // Send notification if enabled
    if (settings.notify_on_post_generated) {
      await sendNotification(userId, review.id, 'posts_generated')
    }
  } catch (error) {
    console.error('Failed to process review:', error)
  }
}

// Convert star rating string to number
function convertStarRating(rating: string): number {
  const ratingMap: Record<string, number> = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
    'FOUR': 4,
    'FIVE': 5,
  }
  return ratingMap[rating] || 0
}

// Get reviews for user
export async function getUserReviews(
  userId: string,
  options: {
    businessProfileId?: string
    isProcessed?: boolean
    limit?: number
    offset?: number
  } = {}
) {
  let query = supabaseAdmin
    .from('reviews')
    .select(`
      *,
      business_profiles:business_profile_id(business_name)
    `)
    .eq('user_id', userId)

  if (options.businessProfileId) {
    query = query.eq('business_profile_id', options.businessProfileId)
  }

  if (options.isProcessed !== undefined) {
    query = query.eq('is_processed', options.isProcessed)
  }

  query = query
    .order('create_time', { ascending: false })
    .limit(options.limit || 50)

  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch reviews: ${error.message}`)
  }

  return data || []
}

// Mark review as notification sent
export async function markNotificationSent(reviewId: string) {
  const { error } = await supabaseAdmin
    .from('reviews')
    .update({
      notification_sent: true,
      notification_sent_at: new Date().toISOString(),
    })
    .eq('id', reviewId)

  if (error) {
    console.error('Failed to mark notification sent:', error)
  }
}

// Placeholder for notification function
async function sendNotification(
  userId: string,
  reviewId: string,
  type: 'new_review' | 'posts_generated'
) {
  // This would integrate with your notification system
  // (email, push notification, in-app notification, etc.)
  console.log(`[Notification] ${type} for review ${reviewId} to user ${userId}`)
}

// Scheduled sync function (to be called by cron job or scheduled task)
export async function scheduledSync() {
  console.log('[Scheduled Sync] Starting automatic review sync...')
  
  // Get all active business profiles with auto_sync enabled
  const { data: profiles, error } = await supabaseAdmin
    .from('business_profiles')
    .select('*')
    .eq('is_active', true)
    .eq('auto_sync_enabled', true)

  if (error) {
    console.error('[Scheduled Sync] Failed to fetch profiles:', error)
    return
  }

  console.log(`[Scheduled Sync] Found ${profiles?.length || 0} profiles to sync`)

  for (const profile of profiles || []) {
    try {
      await syncReviewsForProfile(
        profile.user_id,
        profile.id,
        'scheduled'
      )
      console.log(`[Scheduled Sync] Successfully synced profile ${profile.id}`)
    } catch (err) {
      console.error(`[Scheduled Sync] Failed to sync profile ${profile.id}:`, err)
    }
  }

  console.log('[Scheduled Sync] Completed')
}