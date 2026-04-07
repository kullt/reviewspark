# ReviewSpark

Turn Google Reviews into engaging social media content with AI.

## Features

- 🔄 Transform Google Reviews into social posts
- 🤖 AI-powered content generation (GPT-4)
- 📱 Multi-platform support (Instagram, Facebook, Twitter/X)
- 💾 Save and manage your generation history
- 💳 Secure Stripe payments (Starter $19/mo, Pro $39/mo)
- 🔐 Supabase authentication

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- Stripe (Payments)
- OpenAI (GPT-4)

## Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd reviewspark-app/my-app
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret (for local: stripe listen)
- `STRIPE_PRICE_STARTER_ID` - Stripe price ID for Starter plan
- `STRIPE_PRICE_PRO_ID` - Stripe price ID for Pro plan
- `OPENAI_API_KEY` - OpenAI API key

### 3. Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor to create:
- `generations` table (stores AI generations)
- `subscriptions` table (stores subscription status)
- Row Level Security policies
- Indexes and triggers

### 4. Stripe Setup

1. Create products in Stripe Dashboard:
   - Starter Plan - $19/month
   - Pro Plan - $39/month

2. Copy the Price IDs to your `.env.local`

3. Set up webhook endpoint in Stripe:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 5. Run Locally

```bash
npm run dev
```

App runs at http://localhost:3000

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your hosting platform:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_STARTER_ID=
STRIPE_PRICE_PRO_ID=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── create-payment-intent/route.ts
│   │   └── webhooks/stripe/route.ts
│   ├── checkout/
│   │   ├── page.tsx
│   │   └── checkout-form.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── success/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (Landing)
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   └── openai.ts
└── components/
```

## Testing Stripe Webhooks Locally

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env.local`

## License

MIT
