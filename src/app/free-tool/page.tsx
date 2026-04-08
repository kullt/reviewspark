"use client";

import { useState } from "react";
import Link from "next/link";

export default function FreeReviewTool() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    sentiment: string;
    keywords: string[];
    socialPost: string;
    hashtags: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function analyzeReview() {
    if (!review.trim()) {
      setError("Please paste a review to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/free-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to analyze review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">ReviewSpark</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Full Access
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Free Review to Social Post Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Paste any customer review and instantly get a ready-to-post social media caption.
            Try it free — no signup required.
          </p>
        </div>

        {/* Tool */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paste your customer review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Example: 'Absolutely amazing experience! Dr. Smith was so thorough and explained everything clearly. The staff was friendly and wait time was minimal. Highly recommend this dental office to anyone looking for quality care!'"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={analyzeReview}
            disabled={loading || !review.trim()}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              "Generate Social Post →"
            )}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* Sentiment */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">
                  Sentiment Analysis
                </h3>
                <p className="text-green-700 dark:text-green-400">{result.sentiment}</p>
              </div>

              {/* Keywords */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Key Phrases Extracted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-800 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Post */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  🎯 Your Ready-to-Post Social Caption
                </h3>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line text-lg">
                  {result.socialPost}
                </p>
              </div>

              {/* Hashtags */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Suggested Hashtags
                </h3>
                <p className="text-blue-600 dark:text-blue-400">{result.hashtags}</p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Want More Social Posts?
                </h3>
                <p className="text-blue-100 mb-4">
                  Get unlimited AI-generated posts from all your reviews for just $19/month
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Start Free Trial →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How This Free Review Tool Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-400">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">1. Paste Review</h3>
              <p className="text-sm">Copy any Google, Yelp, or Facebook review and paste it above.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">2. AI Analysis</h3>
              <p className="text-sm">Our AI extracts sentiment, keywords, and creates engaging social copy.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">3. Post & Share</h3>
              <p className="text-sm">Copy the result to Instagram, Facebook, or Twitter. It's ready to post!</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Is this really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Yes! You can generate one social post per review for free. For unlimited posts and advanced features, try our Pro plan.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                What types of reviews work best?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Any positive customer review works great! Google reviews, Yelp reviews, Facebook recommendations — all formats are supported.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Can I edit the generated post?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Absolutely! The output is yours to customize. Add emojis, adjust the tone, or add your own branding.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © 2026 ReviewSpark. 
          <Link href="/terms" className="ml-2 hover:text-gray-700 dark:hover:text-gray-300">Terms</Link>
          {" • "}
          <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
