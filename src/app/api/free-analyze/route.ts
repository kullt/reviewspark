import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { review } = await request.json();

    if (!review || typeof review !== "string") {
      return NextResponse.json({ error: "Review is required" }, { status: 400 });
    }

    if (review.length > 2000) {
      return NextResponse.json({ error: "Review too long. Maximum 2000 characters." }, { status: 400 });
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 500 });
    }

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a social media expert who transforms customer reviews into engaging social media posts.

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
- The caption should be 2-3 sentences maximum`
          },
          {
            role: "user",
            content: `Transform this customer review into a social media post:\n\n${review}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", errorText);
      return NextResponse.json({ error: "Failed to analyze review" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }

    // Parse the JSON response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      // If parsing fails, try to extract from the content
      parsed = {
        sentiment: "Positive review",
        keywords: ["great service", "highly recommend"],
        socialPost: content,
        hashtags: "#CustomerLove #FiveStars #HighlyRecommend"
      };
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error("Free analyze error:", error);
    return NextResponse.json({ error: "Failed to analyze review" }, { status: 500 });
  }
}
