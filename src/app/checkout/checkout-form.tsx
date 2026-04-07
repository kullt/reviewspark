'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { supabase } from '@/lib/supabase'
import { Sparkles, Loader2, ArrowLeft, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  plan: 'starter' | 'pro'
}

const planDetails = {
  starter: {
    name: 'Starter',
    price: '$19',
    description: 'Perfect for small businesses',
    features: ['50 review conversions/month', 'All social platforms', 'Basic analytics'],
  },
  pro: {
    name: 'Pro',
    price: '$39',
    description: 'For growing businesses',
    features: ['Unlimited conversions', 'All social platforms', 'Advanced analytics', 'Priority support'],
  },
}

function CheckoutFormInner({ plan }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const details = planDetails[plan]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError('')

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    })

    if (submitError) {
      setError(submitError.message || 'Payment failed')
      setIsLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Plan Summary */}
      <div className="lg:order-2">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-300">Selected Plan</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">{details.name}</h2>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-5xl font-bold">{details.price}</span>
            <span className="text-slate-400">/month</span>
          </div>
          <p className="text-slate-300 mb-6">{details.description}</p>
          <ul className="space-y-3">
            {details.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment Form */}
      <div className="lg:order-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h2 className="text-2xl font-bold mb-2">Complete Your Purchase</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Enter your payment details to subscribe
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <button
              type="submit"
              disabled={isLoading || !stripe}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Subscribe for ${details.price}/month`
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutForm({ plan }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            plan,
            userId: session?.user?.id 
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err: any) {
        setError(err.message || 'Failed to initialize checkout')
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [plan])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/" className="text-indigo-600 hover:underline">
            Return home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutFormInner plan={plan} />
        </Elements>
      </main>
    </div>
  )
}
