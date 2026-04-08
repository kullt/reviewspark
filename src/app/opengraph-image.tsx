import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ReviewSpark - Turn Google Reviews into Social Posts'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          padding: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }}
        />
        
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
              fontSize: '30px',
            }}
          >
            ✨
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            ReviewSpark
          </span>
        </div>
        
        {/* Main headline */}
        <div
          style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          Turn Google Reviews into Social Posts
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '40px',
            maxWidth: '800px',
          }}
        >
          AI-powered content that saves hours of writing
        </div>
        
        {/* Pricing badges */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              padding: '15px 30px',
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.2)',
              fontSize: '18px',
              color: 'white',
            }}
          >
            $19/mo Starter
          </div>
          <div
            style={{
              padding: '15px 30px',
              borderRadius: '30px',
              background: 'white',
              fontSize: '18px',
              fontWeight: '600',
              color: '#4f46e5',
            }}
          >
            $39/mo Pro
          </div>
        </div>
        
        {/* CTA */}
        <div
          style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Start Free Trial → reviewspark.vercel.app
        </div>
        
        {/* Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '60px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          © 2026 ReviewSpark
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
