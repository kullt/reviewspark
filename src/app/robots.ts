import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://reviewspark.vercel.app'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/', '/dashboard/', '/success/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
