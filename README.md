# ReviewSpark - AI Google Review → Social Post Generator

**ReviewSpark** is a Micro-SaaS that automatically turns your best Google reviews into engaging social media posts using AI.

## Features

- 🔄 **Auto-import reviews** from Google Business Profile
- 🤖 **AI-powered post generation** for Twitter/X, Instagram, Facebook, LinkedIn
- 💳 **Stripe subscriptions** ($19 Starter / $39 Pro)
- 📊 **Dashboard** for managing reviews and generated posts
- 🔐 **Authentication** with Supabase Auth
- 📱 **Responsive design** with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** Stripe
- **AI:** OpenAI GPT-4
- **Deployment:** Vercel

## Quick Start

### 1. Clone & Install
```bash
cd /root/.openclaw/workspace/moneymaker/projects/review-to-post
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_PRICE_STARTER_ID` - Stripe price ID for Starter plan
- `STRIPE_PRICE_PRO_ID` - Stripe price ID for Pro plan
- `OPENAI_API_KEY` - OpenAI API key
- `GOOGLE_PLACES_API_KEY` - (Optional) Google Places API key

### 3. Set Up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the SQL Editor
3. Copy your project URL and API keys to `.env.local`

### 4. Set Up Stripe
1. Create an account at [stripe.com](https://stripe.com)
2. Create two products:
   - **Starter** - $19/month (100 posts/month)
   - **Pro** - $39/month (unlimited posts)
3. Copy price IDs to `.env.local`
4. Set up webhook endpoint: `/api/stripe/webhook`

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/         # Landing page
│   ├── (dashboard)/         # Dashboard pages
│   ├── api/                 # API routes
│   │   ├── scrape-reviews/  # Google Places integration
│   │   ├── generate-posts/  # OpenAI integration
│   │   └── stripe/          # Payment handling
│   ├── auth/callback/       # OAuth callback
│   ├── login/               # Login page
│   └── signup/              # Signup page
├── lib/
│   ├── openai.ts            # OpenAI client
│   ├── stripe.ts            # Stripe client
│   └── supabase/            # Supabase clients
├── components/              # React components
└── middleware.ts            # Auth middleware

supabase/
└── schema.sql               # Database schema
```

## API Routes

- `POST /api/scrape-reviews` - Fetch reviews from Google Places
- `POST /api/generate-posts` - Generate social posts with AI
- `POST /api/stripe/create-checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks
- `POST /api/stripe/portal` - Create billing portal session

## Pricing Tiers

| Feature | Free | Starter ($19/mo) | Pro ($39/mo) |
|---------|------|------------------|--------------|
| Posts/month | 10 | 100 | Unlimited |
| Business locations | 1 | 1 | Unlimited |
| Platforms | All | All | All |
| Support | Email | Email | Priority + Slack |

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Manual
```bash
npm run build
npm start
```

## Roadmap

- [ ] Scheduled posting to social platforms
- [ ] Direct API integrations (Twitter, Instagram, etc.)
- [ ] Review sentiment analysis
- [ ] Post performance analytics
- [ ] Team/agency accounts

## License

MIT License - Build your own Micro-SaaS!

---

Built autonomously by MoneyMaker Agent 🤖
