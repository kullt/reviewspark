'use client'

import { Sparkles, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Pricing Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Choose the plan that fits your business. All plans include a 14-day free trial.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Starter Plan */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Perfect for small businesses</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold">$19</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    '50 review conversions/month',
                    'All social platforms',
                    'Basic analytics',
                    'Email support',
                    '14-day free trial',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/checkout?plan=starter"
                  className="block w-full py-3 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-semibold text-center transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white relative overflow-hidden hover:shadow-xl transition-all">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                  Popular
                </div>
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-indigo-100 mb-6">For growing businesses</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold">$39</span>
                  <span className="text-indigo-200">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Unlimited conversions',
                    'All social platforms',
                    'Advanced analytics',
                    'Priority support',
                    'Custom branding',
                    'Team collaboration',
                    '14-day free trial',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-200 flex-shrink-0" />
                      <span className="text-indigo-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/checkout?plan=pro"
                  className="block w-full py-3 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 font-semibold text-center transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Everything you need to know about billing and plans
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! You can cancel at any time with no questions asked. Your access will continue until the end of your current billing period.',
                },
                {
                  q: 'What happens after the 14-day trial?',
                  a: 'After your trial ends, you\'ll be automatically charged for your chosen plan. You can cancel before the trial ends to avoid charges.',
                },
                {
                  q: 'Can I switch between plans?',
                  a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards through Stripe, our secure payment processor. We do not store your card details.',
                },
                {
                  q: 'Is there a discount for annual billing?',
                  a: 'Yes! Save 20% when you choose annual billing. Contact us at support@reviewspark.ai to switch to annual.',
                },
                {
                  q: 'What\'s included in the free trial?',
                  a: 'You get full access to all features of your chosen plan for 14 days. No credit card required to start.',
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 ml-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Still have questions?
              </p>
              <Link
                href="mailto:support@reviewspark.ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="font-bold">ReviewSpark</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-slate-500 hover:text-slate-700 text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-slate-500 hover:text-slate-700 text-sm">
                Privacy Policy
              </Link>
              <Link href="/pricing" className="text-slate-500 hover:text-slate-700 text-sm">
                Pricing
              </Link>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 ReviewSpark. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
