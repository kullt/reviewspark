import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - ReviewSpark | Review Marketing Tips & Strategies',
  description: 'Learn how to turn customer reviews into powerful marketing content. Tips for local businesses on leveraging Google Reviews for social media growth.',
}

const blogPosts = [
  {
    slug: 'turn-google-reviews-into-instagram-posts',
    title: 'How to Turn Google Reviews Into Instagram Posts That Get Engagement',
    excerpt: 'Your best customers are already writing marketing content for you. Learn how to transform 5-star reviews into scroll-stopping Instagram posts.',
    date: '2026-04-06',
    readTime: '5 min',
    category: 'Social Media',
  },
  {
    slug: 'why-5-star-reviews-are-wasted-marketing-gold',
    title: "Why Your 5-Star Reviews Are Wasted Marketing Gold (And How to Fix It)",
    excerpt: 'Most businesses collect reviews but never use them for marketing. Here\'s how to unlock the full value of your customer testimonials.',
    date: '2026-04-06',
    readTime: '4 min',
    category: 'Marketing Strategy',
  },
  {
    slug: 'social-proof-guide-2026',
    title: 'The Complete Guide to Social Proof Marketing for Local Businesses (2026)',
    excerpt: 'Everything you need to know about using customer reviews, testimonials, and social proof to grow your local business.',
    date: '2026-04-06',
    readTime: '8 min',
    category: 'Guides',
  },
  {
    slug: 'restaurant-customer-marketing-automation',
    title: 'Customer Marketing Automation for Restaurants: A Complete Framework',
    excerpt: 'How restaurants can automate review collection, social posting, and customer engagement to fill more tables.',
    date: '2026-04-06',
    readTime: '6 min',
    category: 'Restaurants',
  },
  {
    slug: 'service-business-review-automation',
    title: 'Service Business Review Automation: Get More Reviews, Get More Customers',
    excerpt: 'Plumbers, electricians, and home service businesses: automate your review collection and turn happy customers into your best marketing.',
    date: '2026-04-06',
    readTime: '5 min',
    category: 'Service Business',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <span className="text-white text-lg">✨</span>
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </a>
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Review Marketing <span className="text-indigo-600">Insights</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Learn how to turn your customer reviews into powerful marketing content that drives growth.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-sm">{post.readTime} read</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                    <a 
                      href={`/blog/${post.slug}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-slate-600 line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{post.date}</span>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to turn your reviews into marketing gold?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join businesses using ReviewSpark to automate their review marketing.
          </p>
          <a
            href="/login"
            className="inline-block px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold text-lg hover:bg-indigo-50 transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 ReviewSpark. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
