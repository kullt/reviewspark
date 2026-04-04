import { NextRequest, NextResponse } from "next/server";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "Google Places URL is required" },
        { status: 400 }
      );
    }

    // Extract place ID from URL if possible
    const placeId = extractPlaceId(url);
    
    if (!placeId) {
      return NextResponse.json(
        { error: "Could not extract Place ID from URL. Please provide a valid Google Maps URL." },
        { status: 400 }
      );
    }

    // In production, call Google Places API
    // const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    // );
    // const data = await response.json();
    // const reviews = data.result?.reviews || [];

    // For demo, return mock reviews
    const mockReviews: Review[] = [
      {
        id: "1",
        author: "Sarah Johnson",
        rating: 5,
        text: "Absolutely love this place! The service was incredible and the food was amazing. Will definitely be coming back!",
        date: "2026-03-15",
      },
      {
        id: "2",
        author: "Mike Chen",
        rating: 5,
        text: "Best experience I've had in months. The staff went above and beyond to make our anniversary special.",
        date: "2026-03-10",
      },
      {
        id: "3",
        author: "Emily Davis",
        rating: 4,
        text: "Great quality and fast service. Highly recommend to anyone looking for a reliable option.",
        date: "2026-03-05",
      },
    ];

    return NextResponse.json({ reviews: mockReviews });
  } catch (error) {
    console.error("Scrape reviews error:", error);
    return NextResponse.json(
      { error: "Failed to scrape reviews" },
      { status: 500 }
    );
  }
}

function extractPlaceId(url: string): string | null {
  // Try to extract from various Google Maps URL formats
  const patterns = [
    /[?&]cid=([^&]+)/,
    /[?&]place_id=([^&]+)/,
    /\/place\/[^/]+\/([^/?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // If URL contains a place reference but no explicit ID, return a mock ID for demo
  if (url.includes("google.com/maps") || url.includes("goo.gl/maps")) {
    return "demo-place-id";
  }

  return null;
}
