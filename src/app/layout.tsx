import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ReviewSpark - Turn Google Reviews into Social Posts',
  description:
    'Transform your Google Reviews into engaging social media content with AI. Save hours of writing and amplify your best customer moments. Try free today.',
  keywords: [
    'Google Reviews',
    'Social Media',
    'AI Content Generator',
    'Marketing Automation',
    'Review Management',
    'Social Media Marketing',
    'Local Business Marketing',
    'Review Marketing',
    'Content Repurposing',
    'AI Marketing Tool',
    'Small Business Marketing',
    'Instagram Marketing',
    'Facebook Marketing',
    'Twitter Marketing',
    'Customer Reviews',
    'Online Reputation',
    'Review to Post',
    'Social Media Content',
  ],
  openGraph: {
    title: 'ReviewSpark - Turn Google Reviews into Social Posts',
    description: 'Transform your Google Reviews into engaging social media content with AI. Save hours of writing and amplify your best customer moments.',
    url: 'https://reviewspark.vercel.app',
    siteName: 'ReviewSpark',
    images: [
      {
        url: 'https://reviewspark.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReviewSpark - AI-Powered Review to Social Media Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReviewSpark - Turn Google Reviews into Social Posts',
    description: 'Transform your Google Reviews into engaging social media content with AI. Save hours of writing.',
    images: ['https://reviewspark.vercel.app/og-image.png'],
    creator: '@reviewspark',
  },
  alternates: {
    canonical: 'https://reviewspark.vercel.app',
  },
  authors: [{ name: 'ReviewSpark' }],
  creator: 'ReviewSpark',
  publisher: 'ReviewSpark',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Marketing Software',
  classification: 'SaaS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {children}
      </body>
    </html>
  )
}
