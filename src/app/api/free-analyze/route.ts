import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a social media expert who transforms customer reviews into engaging social media posts.

Your task is to:
1. Analyze the sentiment of the review (brief summary)
2. Extract 3-5 key phrases or highlights from the review
3. Create ONE engaging social media caption (2-3 sentences, conversational tone, includes key benefit)
4. Suggest 5-7 relevant hashtags

Respond in JSON format:
{
  "sentiment": "Brief sentiment summary (1-2 sentences)",
  "keywords": ["key phrase 1", "key phrase 2", "key phrase 3"],
  "socialPost": "The caption text (no hashtags, just the post content)",
  "hashtags": "#hashtag1 #hashtag2 #hashtag3"
}

Rules:
- Keep the caption authentic and engaging, not salesy
- Preserve specific details from the review (names, services, outcomes)
- Make it sound like something a business owner would naturally post
- The caption should be 2-3 sentences maximum`;

async function tryOpenAI(review: string): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { success: false, error: "No OpenAI API key" };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Transform this customer review into a social media post:\n\n${review}` }
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", errorText);
      return { success: false, error: errorText };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return { success: false, error: "No content" };

    return { success: true, data: content };
  } catch (error) {
    console.error("OpenAI exception:", error);
    return { success: false, error: String(error) };
  }
}

async function tryFireworks(review: string): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) return { success: false, error: "No Fireworks API key" };

  try {
    // Using Fireworks AI with Llama 3.1 8B (fast and free tier available)
    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Transform this customer review into a social media post:\n\n${review}` }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Fireworks error:", errorText);
      return { success: false, error: errorText };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return { success: false, error: "No content" };

    return { success: true, data: content };
  } catch (error) {
    console.error("Fireworks exception:", error);
    return { success: false, error: String(error) };
  }
}

function parseResult(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    // Try to extract JSON from the content
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // Fall through to default
      }
    }
    // Default fallback
    return {
      sentiment: "Positive review",
      keywords: ["great service", "highly recommend"],
      socialPost: content.substring(0, 200),
      hashtags: "#CustomerLove #FiveStars #HighlyRecommend"
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { review } = await request.json();

    if (!review || typeof review !== "string") {
      return NextResponse.json({ error: "Review is required" }, { status: 400 });
    }

    if (review.length > 2000) {
      return NextResponse.json({ error: "Review too long. Maximum 2000 characters." }, { status: 400 });
    }

    // Try OpenAI first, fall back to Fireworks AI
    let result = await tryOpenAI(review);
    
    if (!result.success) {
      console.log("OpenAI failed, trying Fireworks AI fallback...");
      result = await tryFireworks(review);
    }

    if (!result.success || !result.data) {
      return NextResponse.json({ error: "Service temporarily unavailable. Please try again later." }, { status: 500 });
    }

    const parsed = parseResult(String(result.data));
    return NextResponse.json(parsed);

  } catch (error) {
    console.error("Free analyze error:", error);
    return NextResponse.json({ error: "Failed to analyze review" }, { status: 500 });
  }
}
