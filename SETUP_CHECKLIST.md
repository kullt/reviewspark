# ReviewSpark — Setup Checklist for Liam

**Project:** AI Google Review → Social Post Generator  
**Status:** MVP Complete, Ready for Launch  
**Time Required:** ~45 minutes  
**Agent Role:** Everything after this checklist (deploy, operate, iterate)

---

## Phase 1: Stripe Setup (15 minutes)

Stripe handles payments and subscriptions.

### 1. Create Stripe Account
- [ ] Go to https://stripe.com
- [ ] Sign up with your email
- [ ] Complete identity verification (required by law for payments)
- [ ] Navigate to Dashboard

### 2. Create Products & Prices
- [ ] In Stripe Dashboard, go to "Products" → "Add product"
- [ ] **Product 1: Starter Plan**
  - Name: "Starter"
  - Description: "Up to 5 businesses, 20 posts/month"
  - Price: $19.00 / month
  - Click "Save product"
  - **COPY THE PRICE ID** (looks like `price_1ABC...`) — save this somewhere
- [ ] **Product 2: Pro Plan**
  - Name: "Pro"
  - Description: "Unlimited businesses, unlimited posts, priority support"
  - Price: $39.00 / month
  - Click "Save product"
  - **COPY THE PRICE ID** (looks like `price_1XYZ...`) — save this somewhere

### 3. Get API Keys
- [ ] Go to Developers → API keys
- [ ] Copy "Publishable key" (starts with `pk_live_` or `pk_test_`)
- [ ] Click "Reveal" on Secret key, copy it (starts with `sk_live_` or `sk_test_`)
- [ ] Save both keys

---

## Phase 2: Supabase Setup (15 minutes)

Supabase handles database and authentication.

### 1. Create Supabase Project
- [ ] Go to https://supabase.com
- [ ] Sign up with GitHub or email
- [ ] Click "New Project"
- [ ] Name: `reviewspark` (or whatever you prefer)
- [ ] Database password: generate a strong one, save it
- [ ] Region: Choose closest to your users (EU West for Europe)
- [ ] Click "Create new project" (takes ~2 minutes)

### 2. Run Database Schema
- [ ] Once project is ready, click "Table Editor" → "SQL Editor"
- [ ] Click "New query"
- [ ] Open file: `/root/.openclaw/workspace/moneymaker/projects/review-to-post/supabase/schema.sql`
- [ ] Copy entire contents
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Verify tables created: users, businesses, reviews, posts, subscriptions

### 3. Get API Keys
- [ ] Go to Project Settings (gear icon) → API
- [ ] Copy "Project URL" (looks like `https://xxxxx.supabase.co`)
- [ ] Copy "anon public" key (long string)
- [ ] Copy "service_role" secret (click "Reveal")
- [ ] Save all three values

---

## Phase 3: OpenAI Setup (5 minutes)

OpenAI powers the review-to-post generation.

### 1. Get API Key
- [ ] Go to https://platform.openai.com
- [ ] Sign up / log in
- [ ] Go to Settings → API keys
- [ ] Click "Create new secret key"
- [ ] Name: "ReviewSpark Production"
- [ ] Copy the key (starts with `sk-`)
- [ ] Save it immediately (you can't see it again)

### 2. Set Billing (Optional but Recommended)
- [ ] Go to Settings → Billing
- [ ] Add payment method
- [ ] Set usage limits if desired (recommended: $20/month max)

---

## Phase 4: GitHub Repository (5 minutes)

Create a repo for Vercel deployment.

### 1. Create Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `reviewspark`
- [ ] Description: "AI Google Review → Social Post Generator"
- [ ] Make it Private (recommended)
- [ ] Check "Add a README file"
- [ ] Click "Create repository"

### 2. Push Code
The agent will handle this once you provide the keys — or do it manually:
```bash
cd /root/.openclaw/workspace/moneymaker/projects/review-to-post
git init
git add .
git commit -m "Initial MVP"
git remote add origin https://github.com/YOUR_USERNAME/reviewspark.git
git push -u origin main
```

---

## Phase 5: Vercel Deployment (5 minutes)

Vercel hosts the Next.js application.

### 1. Connect Repository
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Click "Add New Project"
- [ ] Import `reviewspark` repository
- [ ] Framework: Next.js (auto-detected)
- [ ] Click "Deploy" (we'll add env vars after)

### 2. Add Environment Variables
- [ ] In Vercel project, go to Settings → Environment Variables
- [ ] Add these variables one by one:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (from Stripe)
STRIPE_SECRET_KEY=sk_live_... (from Stripe)
STRIPE_WEBHOOK_SECRET=whsec_... (we'll get this after first deploy)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service role key)
OPENAI_API_KEY=sk-... (from OpenAI)
```

### 3. Get Stripe Webhook Secret
- [ ] After first deploy, copy your Vercel URL (looks like `reviewspark.vercel.app`)
- [ ] Go to Stripe Dashboard → Developers → Webhooks
- [ ] Click "Add endpoint"
- [ ] Endpoint URL: `https://your-vercel-url.vercel.app/api/stripe/webhook`
- [ ] Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`
- [ ] Click "Add endpoint"
- [ ] Copy "Signing secret" (starts with `whsec_`)
- [ ] Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`
- [ ] Redeploy from Vercel dashboard

---

## You're Done! ✓

**What happens next:**
1. The MoneyMaker agent takes over
2. Monitors Stripe dashboard for signups
3. Responds to customer support (if needed)
4. Tracks metrics and reports revenue
5. Iterates on features based on feedback

**Expected first revenue:** 2-4 weeks after launch (typical SaaS ramp)

**Questions?** Ask the MoneyMaker agent — it has full context on this project.

---

## Quick Reference: Values You Need

Fill this out as you go, then give to the agent:

```
STRIPE_PUBLISHABLE_KEY=pk_live_
STRIPE_SECRET_KEY=sk_live_
STRIPE_STARTER_PRICE_ID=price_
STRIPE_PRO_PRICE_ID=price_

SUPABASE_URL=https://
SUPABASE_ANON_KEY=eyJ
SUPABASE_SERVICE_ROLE_KEY=eyJ

OPENAI_API_KEY=sk-

GITHUB_REPO=https://github.com/YOUR_USERNAME/reviewspark
VERCEL_URL=https://reviewspark.vercel.app (will get after deploy)
```
