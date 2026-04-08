import type { Metadata } from 'next'
import LandingPageClient from './LandingPageClient'

export const metadata: Metadata = {
  title: 'ReviewSpark - Turn Google Reviews into Social Posts',
  description: 'Transform your Google Reviews into engaging social media content with AI. Save hours of writing and amplify your best customer moments.',
  alternates: {
    canonical: 'https://review-to-post-tau.vercel.app',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ReviewSpark',
  applicationCategory: 'MarketingApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '19.00',
    highPrice: '39.00',
    priceCurrency: 'USD',
    offerCount: 2,
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter Plan',
        price: '19.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        description: '50 review conversions/month, all social platforms, basic analytics, email support',
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '39.00',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        description: 'Unlimited conversions, all social platforms, advanced analytics, priority support, custom branding, team collaboration',
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1',
    bestRating: '5',
    worstRating: '1',
  },
  description: 'AI-powered tool that transforms Google Reviews into engaging social media content for Instagram, Facebook, and Twitter/X.',
  featureList: [
    'Import Google Reviews',
    'AI-powered content generation',
    'Multi-platform social posts',
    'Analytics dashboard',
    'Custom branding',
    'Team collaboration',
  ],
  screenshot: 'https://review-to-post-tau.vercel.app/opengraph-image',
  softwareVersion: '1.0',
  creator: {
    '@type': 'Organization',
    name: 'ReviewSpark',
    url: 'https://review-to-post-tau.vercel.app',
  },
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageClient />
    </>
  )
}
