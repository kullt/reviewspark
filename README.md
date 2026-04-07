# ReviewSpark - FULL AUTOMATION

Turn Google Reviews into engaging social media content with AI. **Now with full automation!**

## 🚀 What's New - Full Automation

ReviewSpark now supports **complete hands-off automation**:

1. ✅ **Google OAuth Integration** - One-click connect your Google account
2. ✅ **Google Business Profile API** - Automatically sync reviews from your business
3. ✅ **Background Monitoring** - Scheduled sync checks for new reviews
4. ✅ **Auto-Generate Posts** - AI automatically generates social posts for new reviews
5. ✅ **Review Management** - View all synced reviews and generated posts in one place

## Features

### Manual Mode (Original)
- 🔄 Transform pasted Google Reviews into social posts
- 🤖 AI-powered content generation (GPT-4)
- 📱 Multi-platform support (Instagram, Facebook, Twitter/X)

### New Automation Mode
- 🔗 **Google OAuth** - Securely connect your Google account
- 🏪 **Business Profile Sync** - Import all your Google Business locations
- ⭐ **Auto Review Sync** - Automatically fetch new reviews (scheduled or manual)
- 🤖 **Auto-Generate** - AI instantly creates posts for new 4-5 star reviews
- 📊 **Review Dashboard** - View all synced reviews and generated content
- ⚙️ **Settings** - Configure auto-sync, thresholds, and notifications

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- Stripe (Payments)
- OpenAI (GPT-4)
- **Google APIs (NEW)**
  - Google OAuth 2.0
  - Google Business Profile API

## Google Business Profile API Setup

**IMPORTANT:** The Google Business Profile API requires approval from Google.

### Prerequisites
1. You need a **verified Google Business Profile** (active for 60+ days)
2. You need a **Google Cloud Console project** with an Organization account
3. You must apply for API access through Google's GBP API contact form

### Step-by-Step Setup

#### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Note the **Project Number** (you'll need this for the API application)

#### 2. Configure OAuth Consent Screen
1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" (or "Internal" if you have a Google Workspace)
3. Fill in required fields:
   - App name: "ReviewSpark"
   - User support email: your email
   - Developer contact email: your email
4. Add scopes:
   - `https://www.googleapis.com/auth/business.manage`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
5. Add test users (for development)

#### 3. Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: "Web application"
4. Name: "ReviewSpark Web Client"
5. Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback`
7. Click "Create" and copy the **Client ID** and **Client Secret**

#### 4. Request API Access (CRITICAL)
1. Go to [GBP API Contact Form](https://support.google.com/business/contact/api_default)
2. Select "Application for Basic API Access"
3. Provide:
   - Project Number from your Google Cloud project
   - Business information
   - Website URL
   - Use case description
4. Submit and wait for approval (can take several days)

#### 5. Enable APIs
Once approved, enable these APIs in Google Cloud Console:
- My Business Account Management API
- My Business Business Information API
- My Business Verifications API

### Environment Variables

Add these to your `.env.local`:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

For production:
```env
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
```

## Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd reviewspark-app/my-app
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in ALL credentials:

```bash
cp .env.example .env.local
```

**Required variables:**
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Stripe: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- OpenAI: `OPENAI_API_KEY`
- **Google (NEW)**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`

### 3. Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL editor to create:
- `generations` table (manual generations)
- `subscriptions` table (subscription status)
- **NEW**: `google_accounts` table (OAuth tokens)
- **NEW**: `business_profiles` table (connected businesses)
- **NEW**: `reviews` table (synced reviews)
- **NEW**: `sync_logs` table (sync history)
- **NEW**: `user_settings` table (automation preferences)
- Row Level Security policies
- Indexes and triggers

### 4. Run Locally

```bash
npm run dev
```

App runs at http://localhost:3000

## How It Works

### User Flow
1. User signs up/logs in
2. User clicks "Connect Google Account" in Dashboard
3. User grants permission via Google OAuth
4. User selects which Business Profiles to connect
5. System automatically syncs reviews
6. For new reviews meeting the threshold (default 4+ stars), AI generates social posts
7. User receives notification and can view/copy posts

### API Flow
1. **OAuth**: User authenticates → Code exchanged for tokens → Stored in DB
2. **Token Refresh**: Before API calls, check expiry → Refresh if needed
3. **Sync**: Call Google Business Profile API → Fetch reviews → Store new ones
4. **Auto-Generate**: New review detected → AI generates posts → Store results
5. **Notification**: Send email/push when posts ready

## Scheduled Sync (Production)

For production, set up a scheduled job to sync reviews periodically:

### Option 1: Vercel Cron (Recommended for Vercel deployments)
Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-reviews",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

### Option 2: External Cron Service
Use a service like:
- GitHub Actions (scheduled workflows)
- EasyCron
- Cron-job.org

Call the sync endpoint every 6 hours:
```bash
curl -X POST https://yourdomain.com/api/cron/sync-reviews \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Option 3: Background Worker
For high-volume scenarios, use a background worker with:
- Bull/Redis queue
- AWS Lambda scheduled events
- Google Cloud Scheduler

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import in Vercel
3. Add environment variables in Vercel dashboard (including Google OAuth)
4. Update Google OAuth redirect URI to production URL
5. Deploy!

### Important: Production OAuth Setup

Before going live:
1. Change OAuth consent screen from "Testing" to "In production"
2. Update redirect URIs in Google Cloud Console
3. Add your production domain to authorized origins
4. Submit for verification if requesting sensitive scopes

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/google/route.ts           # Initiate OAuth
│   │   ├── auth/google/callback/route.ts  # OAuth callback
│   │   ├── cron/sync-reviews/route.ts   # Scheduled sync
│   │   ├── google/
│   │   │   ├── accounts/route.ts         # Get/manage accounts
│   │   │   └── business-profile/route.ts # Get/manage profiles
│   │   ├── reviews/
│   │   │   ├── route.ts                  # Get reviews, manual sync
│   │   │   └── generate/route.ts         # Generate posts for review
│   │   ├── user/settings/route.ts        # User automation settings
│   │   ├── create-payment-intent/route.ts
│   │   ├── generate/route.ts             # Manual generation
│   │   └── webhooks/stripe/route.ts
│   ├── dashboard/
│   │   ├── page.tsx                      # Main dashboard
│   │   ├── connections/page.tsx          # Google connections
│   │   └── reviews/page.tsx              # Review management
│   └── ...
├── lib/
│   ├── google-auth.ts                    # OAuth & token management
│   ├── google-business.ts                # Business Profile API
│   ├── google-reviews.ts                 # Reviews API & sync
│   ├── supabase.ts
│   ├── stripe.ts
│   └── openai.ts
└── ...
```

## API Endpoints

### Google OAuth
- `GET /api/auth/google` - Start OAuth flow
- `GET /api/auth/google/callback` - OAuth callback

### Google Accounts
- `GET /api/google/accounts` - List connected accounts
- `POST /api/google/accounts` - Refresh and get locations
- `DELETE /api/google/accounts?id=xxx` - Disconnect account

### Business Profiles
- `GET /api/google/business-profile` - List saved profiles
- `POST /api/google/business-profile` - Save a profile
- `PATCH /api/google/business-profile` - Update settings
- `DELETE /api/google/business-profile?id=xxx` - Remove profile

### Reviews
- `GET /api/reviews` - List synced reviews
- `POST /api/reviews` - Manual sync for a profile
- `POST /api/reviews/generate` - Generate posts for review

### User Settings
- `GET /api/user/settings` - Get automation settings
- `POST /api/user/settings` - Update settings

## Security Considerations

1. **Token Storage**: Refresh tokens are encrypted at rest in Supabase
2. **RLS**: Row Level Security ensures users only access their own data
3. **Scope**: Only request minimum necessary OAuth scopes
4. **HTTPS**: Always use HTTPS in production for OAuth redirects
5. **Token Expiry**: Access tokens auto-refresh before expiry

## Troubleshooting

### OAuth Issues
- **"Invalid redirect URI"**: Check GOOGLE_REDIRECT_URI matches exactly in Google Cloud Console
- **"Access denied"**: User clicked cancel or app is in testing mode
- **No refresh token**: Ensure `prompt: 'consent'` is set in auth URL

### API Issues
- **"Request had insufficient authentication scopes"**: API access not yet approved by Google
- **"Location not found"**: Business Profile may not be verified or active
- **Quota exceeded**: Check Google Cloud Console quotas

### Sync Issues
- **No reviews appearing**: Check sync logs in database
- **Old reviews not importing**: API may only return reviews from last 2 years
- **Duplicate reviews**: Check google_review_id unique constraint

## License

MIT