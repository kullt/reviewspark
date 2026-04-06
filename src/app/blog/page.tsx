import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - ReviewSpark | Turn Reviews Into Social Media Gold",
  description: "Expert guides on leveraging customer reviews for social media marketing. Learn how restaurants, fitness businesses, service providers, and salons can turn reviews into engaging content.",
  keywords: ["review marketing", "social media strategy", "customer testimonials", "Google reviews", "social media content"],
  openGraph: {
    title: "ReviewSpark Blog - Expert Marketing Guides",
    description: "Learn how to turn customer reviews into social media content that drives growth",
    type: "website",
  },
};

const posts = [
  {
    slug: "google-reviews-instagram-engagement",
    title: "From Google Reviews to Instagram Engagement: A Small Business Guide",
    excerpt: "Learn how local businesses can transform Google reviews into engaging Instagram content that drives real engagement, builds trust, and attracts new customers.",
    category: "Small Business",
    readTime: "10 min read",
    keywords: ["Google reviews Instagram", "local business social media", "review marketing"],
  },
  {
    slug: "wasted-5-star-reviews",
    title: "Wasted 5-Star Reviews: Why Your Best Customer Praise Never Gets Seen",
    excerpt: "Discover why collecting 5-star reviews is only half the battle. Learn review marketing strategies that amplify social proof and maximize your reputation investment.",
    category: "Strategy",
    readTime: "9 min read",
    keywords: ["5-star reviews", "review marketing", "social proof strategy"],
  },
  {
    slug: "social-proof-marketing-guide-2026",
    title: "Social Proof Marketing Guide 2026: Turn Reviews Into Revenue",
    excerpt: "Master social proof marketing for local businesses in 2026. Learn proven strategies to leverage reviews, testimonials, and user-generated content.",
    category: "2026 Guide",
    readTime: "11 min read",
    keywords: ["social proof marketing", "local business marketing 2026", "review strategy"],
  },
  {
    slug: "restaurant-customer-marketing",
    title: "Restaurant Customer Marketing: The Review-to-Social Playbook",
    excerpt: "Discover 5 proven strategies restaurants use to transform satisfied customers into powerful marketing assets. Drive word-of-mouth, boost reviews, and fill more seats.",
    category: "Restaurants",
    readTime: "10 min read",
    keywords: ["restaurant customer marketing", "restaurant word-of-mouth", "restaurant social media"],
  },
  {
    slug: "service-business-review-automation",
    title: "Service Business Review Automation: From Feedback to Marketing",
    excerpt: "Learn how service businesses can automatically turn Yelp and Google reviews into Instagram content. Save hours, boost engagement, and convert reviews into customers.",
    category: "Service Businesses",
    readTime: "12 min read",
    keywords: ["service business automation", "review to social media", "Yelp to Instagram"],
  },
  {
    slug: "restaurant-reviews-instagram",
    title: "How Restaurants Can Turn 5-Star Reviews Into Instagram Engagement That Drives Reservations",
    excerpt: "Learn proven strategies for restaurants to transform glowing customer reviews into Instagram content that stops the scroll, sparks engagement, and fills tables.",
    category: "Restaurants",
    readTime: "8 min read",
    keywords: ["restaurant Instagram marketing", "restaurant social media strategy", "food business marketing"],
  },
  {
    slug: "fitness-reviews-social-media",
    title: "How Fitness Businesses Can Turn Customer Reviews into Social Media Gold",
    excerpt: "Discover proven strategies for gyms and fitness studios to transform 5-star reviews into engaging social media content that attracts new members and builds community trust.",
    category: "Fitness",
    readTime: "7 min read",
    keywords: ["gym social media marketing", "fitness business reviews", "fitness studio marketing"],
  },
  {
    slug: "service-business-testimonials-tiktok",
    title: "How Service Businesses Can Turn Customer Testimonials Into Viral TikTok and Reels Content",
    excerpt: "Discover proven strategies for service businesses to transform customer testimonials into scroll-stopping TikTok and Instagram Reels content that drives leads and builds trust.",
    category: "Service Businesses",
    readTime: "8 min read",
    keywords: ["service business TikTok marketing", "customer testimonial videos", "TikTok for local business"],
  },
  {
    slug: "salon-reviews-instagram",
    title: "How Hair Salons Can Turn Customer Reviews Into Instagram Content That Books Appointments",
    excerpt: "Learn how hair salons can transform Google reviews into Instagram posts that book appointments. 5 proven formulas + automation tools to save 20+ hours/month on social media.",
    category: "Salons",
    readTime: "7 min read",
    keywords: ["salon Instagram marketing", "hair salon social media", "beauty business marketing"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600">
              ReviewSpark
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Blog
            </Link>
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            ReviewSpark Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Expert guides on turning customer reviews into powerful social media content
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-4 block">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              </Link>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs text-gray-500 dark:text-gray-500"
                  >
                    #{keyword.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Read article
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to turn your reviews into social media gold?
          </h2>
          <p className="mt-4 text-blue-100">
            Join thousands of businesses using ReviewSpark to transform customer reviews into engaging content.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-600 hover:bg-gray-50"
          >
            Start Free Trial
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">ReviewSpark</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 ReviewSpark. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
