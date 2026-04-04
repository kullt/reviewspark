import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Post {
  id: string;
  platform: string;
  content: string;
  reviewId: string;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
});

export async function POST(request: NextRequest) {
  try {
    const { reviews } = await request.json();

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return NextResponse.json(
        { error: "Reviews array is required" },
        { status: 400 }
      );
    }

    const posts: Post[] = [];
    const platforms = ["Twitter/X", "Instagram", "Facebook", "LinkedIn"];

    // For each review, generate posts for different platforms
    for (const review of reviews.slice(0, 3)) {
      // In production, use actual OpenAI API
      // const completion = await openai.chat.completions.create({
      //   model: "gpt-4",
      //   messages: [
      //     {
      //       role: "system",
      //       content: `You are a social media expert. Create engaging posts based on customer reviews.`,
      //     },
      //     {
      //       role: "user",
      //       content: `Review: "${review.text}" - Create a ${platform} post that captures the essence of this review.`,
      //     },
      //   ],
      // });

      // For demo, generate mock posts
      for (const platform of platforms) {
        let content = "";
        
        switch (platform) {
          case "Twitter/X":
            content = `"${review.text.substring(0, 100)}${review.text.length > 100 ? '...' : ''}" - Thanks ${review.author}! 🙏 #CustomerLove #FiveStars`;
            break;
          case "Instagram":
            content = `✨ When our customers speak, we listen! 

"${review.text.substring(0, 150)}${review.text.length > 150 ? '...' : ''}"

- ${review.author}

Thank you for choosing us! 💙 #CustomerReview #Grateful #QualityService`;
            break;
          case "Facebook":
            content = `We're thrilled to share this amazing review from ${review.author}!

"${review.text}"

⭐ ${review.rating}/5 stars

Thank you for your kind words and support. It's customers like you that make our work so rewarding!`;
            break;
          case "LinkedIn":
            content = `Customer feedback drives our continuous improvement. We're proud to share this testimonial from ${review.author}:

"${review.text}"

Delivering exceptional service remains our top priority. #CustomerExperience #Quality`;
            break;
        }

        posts.push({
          id: `${review.id}-${platform}`,
          platform,
          content,
          reviewId: review.id,
        });
      }
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Generate posts error:", error);
    return NextResponse.json(
      { error: "Failed to generate posts" },
      { status: 500 }
    );
  }
}
