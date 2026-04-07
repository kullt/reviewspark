'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Sparkles, Loader2, Star, Copy, Check, RefreshCw, Wand2, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Review {
  id: string
  google_review_id: string
  reviewer_name: string
  reviewer_photo_url?: string
  rating: number
  review_text: string
  review_reply?: string
  create_time: string
  is_processed: boolean
  generated_posts?: Array<{
    platform: string
    content: string
    hashtags: string[]
  }>
  business_profiles: {
    business_name: string
  }
}

export default function ReviewsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<{ reviewId: string; postIndex: number } | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setUser(session.user)
    setLoading(false)
    loadReviews(session.access_token)
  }

  const loadReviews = async (token: string) => {
    try {
      const res = await fetch('/api/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        setReviews(data.reviews || [])
      }
    } catch (err) {
      console.error('Failed to load reviews:', err)
    }
  }

  const handleGenerate = async (reviewId: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    setGeneratingId(reviewId)
    setError('')

    try {
      const res = await fetch('/api/reviews/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ reviewId }),
      })

      if (res.ok) {
        const data = await res.json()
        // Update the review in the list
        setReviews(reviews.map(r => 
          r.id === reviewId 
            ? { ...r, is_processed: true, generated_posts: data.posts }
            : r
        ))
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to generate posts')
      }
    } catch (err) {
      setError('Failed to generate posts')
    } finally {
      setGeneratingId(null)
    }
  }

  const handleCopy = (text: string, reviewId: string, postIndex: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex({ reviewId, postIndex })
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        )
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'from-pink-500 to-purple-500'
      case 'facebook': return 'from-blue-500 to-blue-600'
      case 'twitter': return 'from-sky-500 to-blue-500'
      default: return 'from-indigo-500 to-violet-500'
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link href="/dashboard/connections" className="text-slate-600 hover:text-slate-900">
              Connections
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Google Reviews</h1>
          <Link
            href="/dashboard/connections"
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium transition-all"
          >
            Manage Connections
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <RefreshCw className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No reviews synced yet</p>
            <p className="text-slate-400 mt-2">
              Connect your Google Business Profile and sync reviews to get started
            </p>
            <Link
              href="/dashboard/connections"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold"
            >
              Connect Google Account
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    {review.reviewer_photo_url ? (
                      <img
                        src={review.reviewer_photo_url}
                        alt={review.reviewer_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{review.reviewer_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-slate-400 text-sm">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(review.create_time).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">
                      {review.business_profiles?.business_name}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                  <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                    {review.review_text}
                  </p>
                </div>

                {/* Generated Posts */}
                {review.generated_posts && review.generated_posts.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-slate-500 uppercase tracking-wide">
                      Generated Posts
                    </h4>
                    {review.generated_posts.map((post, postIndex) => (
                      <div
                        key={postIndex}
                        className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/30 dark:to-slate-800 border border-slate-200 dark:border-slate-600"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getPlatformColor(post.platform)} text-white text-sm font-medium`}>
                            {getPlatformIcon(post.platform)}
                            {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                          </div>
                          <button
                            onClick={() => handleCopy(
                              `${post.content}\n\n${post.hashtags.map(h => '#' + h).join(' ')}`,
                              review.id,
                              postIndex
                            )}
                            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 transition-colors"
                          >
                            {copiedIndex?.reviewId === review.id && copiedIndex?.postIndex === postIndex ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap mb-3">
                          {post.content}
                        </p>
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                          {post.hashtags.map(h => '#' + h).join(' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm">
                      {review.is_processed
                        ? 'No posts generated for this review'
                        : 'Posts not yet generated'}
                    </p>
                    <button
                      onClick={() => handleGenerate(review.id)}
                      disabled={generatingId === review.id}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 text-white font-medium transition-all flex items-center gap-2"
                    >
                      {generatingId === review.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          Generate Posts
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}