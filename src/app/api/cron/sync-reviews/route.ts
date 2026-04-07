import { NextRequest, NextResponse } from 'next/server'
import { scheduledSync } from '@/lib/google-reviews'

// This endpoint should be called by a cron job every 6 hours
// Configure in vercel.json or use an external cron service

export async function POST(req: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = req.headers.get('authorization')
    const expectedSecret = process.env.CRON_SECRET

    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Run scheduled sync
    await scheduledSync()

    return NextResponse.json({ 
      success: true, 
      message: 'Scheduled sync completed' 
    })
  } catch (error: any) {
    console.error('Scheduled sync error:', error)
    return NextResponse.json(
      { error: error.message || 'Scheduled sync failed' },
      { status: 500 }
    )
  }
}

// Also support GET for simple cron services
export async function GET(req: NextRequest) {
  return POST(req)
}