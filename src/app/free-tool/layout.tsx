import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Review to Social Post Generator | ReviewSpark',
  description: 'Transform any customer review into a ready-to-post social media caption instantly. Free AI-powered tool - no signup required. Try it now!',
  keywords: ['review to social post', 'free review generator', 'google review to instagram', 'customer review social media', 'review marketing tool', 'free social media generator'],
  openGraph: {
    title: 'Free Review to Social Post Generator',
    description: 'Paste any review, get a ready-to-post social caption instantly. Free AI tool.',
    type: 'website',
    url: 'https://review-to-post-tau.vercel.app/free-tool',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Review to Social Post Generator',
    description: 'Paste any review, get a ready-to-post social caption instantly. Free AI tool.',
  },
};

export default function FreeToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
