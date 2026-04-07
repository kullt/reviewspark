import 'server-only'

import OpenAI from 'openai'

let openai: OpenAI | null = null

function getOpenAI() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openai
}

export interface GenerateSocialPostsParams {
  reviewText: string
  businessName: string
}

export interface SocialPost {
  platform: 'instagram' | 'facebook' | 'twitter'
  content: string
  hashtags: string[]
}

export async function generateSocialPosts({
  reviewText,
  businessName,
}: GenerateSocialPostsParams): Promise<SocialPost[]> {
  const client = getOpenAI()
  if (!client) {
    throw new Error('OpenAI API key not configured')
  }

  const prompt = `Transform this Google review into engaging social media posts for different platforms.

Business: ${businessName}
Review: ${reviewText}

Generate 3 posts formatted as JSON:
1. Instagram - visual, emoji-rich, with relevant hashtags
2. Facebook - community-focused, conversational
3. Twitter/X - concise, punchy, under 280 characters

Return ONLY a JSON array in this exact format:
[
  {
    "platform": "instagram",
    "content": "post text here",
    "hashtags": ["hashtag1", "hashtag2"]
  },
  {
    "platform": "facebook",
    "content": "post text here",
    "hashtags": ["hashtag1", "hashtag2"]
  },
  {
    "platform": "twitter",
    "content": "post text here",
    "hashtags": ["hashtag1", "hashtag2"]
  }
]`

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a social media expert who transforms customer reviews into engaging posts. Always return valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content || '[]'
    const posts = JSON.parse(content)
    return posts
  } catch (error) {
    console.error('Error generating social posts:', error)
    throw new Error('Failed to generate social media posts')
  }
}
