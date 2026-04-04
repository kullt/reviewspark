"use client";

import { useState } from "react";

interface GeneratedPost {
  id: string;
  platform: string;
  content: string;
}

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    
    try {
      // Step 1: Scrape reviews
      const scrapeRes = await fetch("/api/scrape-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      if (!scrapeRes.ok) throw new Error("Failed to fetch reviews");
      const { reviews } = await scrapeRes.json();
      
      // Step 2: Generate posts
      const generateRes = await fetch("/api/generate-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: reviews.slice(0, 3) }), // Top 3 reviews
      });
      
      if (!generateRes.ok) throw new Error("Failed to generate posts");
      const { posts } = await generateRes.json();
      setPosts(posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">
        Enter your Google Business Profile URL to generate social media posts from your reviews.
      </p>

      {/* Input Section */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Google Places URL
        </label>
        <div className="mt-2 flex gap-3">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://maps.google.com/?cid=..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !url}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Posts"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Results Section */}
      {posts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Generated Posts ({posts.length})
          </h2>
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {post.platform}
                  </span>
                  <button
                    onClick={() => copyToClipboard(post.content)}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-3 text-gray-800 dark:text-gray-200">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && !loading && (
        <div className="mt-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">No posts yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter your Google Places URL above to get started.
          </p>
        </div>
      )}
    </div>
  );
}
