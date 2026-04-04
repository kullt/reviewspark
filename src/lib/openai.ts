import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
});

export async function generatePostFromReview(
  reviewText: string,
  platform: "twitter" | "instagram" | "facebook" | "linkedin",
  author: string
): Promise<string> {
  const platformPrompts = {
    twitter: "Create a concise, engaging tweet (under 280 chars) from this review. Include relevant hashtags.",
    instagram: "Create an engaging Instagram caption from this review. Use emojis and hashtags. Make it visually descriptive.",
    facebook: "Create a friendly Facebook post from this review. Encourage engagement and community discussion.",
    linkedin: "Create a professional LinkedIn post from this review. Focus on business value and credibility.",
  };

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a social media expert. ${platformPrompts[platform]}`,
      },
      {
        role: "user",
        content: `Review by ${author}: "${reviewText}"`,
      },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || "";
}
