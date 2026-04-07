import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

let stripe: Stripe | null = null
function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil',
    })
  }
  return stripe
}

const priceIds: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER_ID || '',
  pro: process.env.STRIPE_PRICE_PRO_ID || '',
}

export async function POST(req: NextRequest) {
  try {
    const stripeClient = getStripe()
    if (!stripeClient) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      )
    }

    const { plan, userId } = await req.json()

    if (!plan || !priceIds[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    const priceId = priceIds[plan]
    const amount = plan === 'starter' ? 1900 : 3900

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId || 'anonymous',
        plan,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
