import { NextRequest, NextResponse } from 'next/server'
import { generateSocialPosts } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { reviewText, businessName } = await req.json()

    if (!reviewText || !businessName) {
      return NextResponse.json(
        { error: 'Missing reviewText or businessName' },
        { status: 400 }
      )
    }

    const posts = await generateSocialPosts({ reviewText, businessName })
    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error('Error in generate API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate posts' },
      { status: 500 }
    )
  }
}
