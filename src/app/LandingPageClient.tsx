'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, Star, Zap, Shield, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function LandingPageClient() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </div>
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

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Review to Social Media Converter
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Turn Your <span className="gradient-text">Google Reviews</span>
            <br /> Into Social Gold
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Transform authentic customer reviews into engaging social media content with AI. 
            Save hours of writing and amplify your best customer moments.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-lg transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Three simple steps to turn reviews into social content
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Import Reviews',
                description: 'Paste your Google review URL or text directly into our dashboard.',
              },
              {
                icon: Sparkles,
                title: 'AI Magic',
                description: 'Our AI analyzes the review and generates platform-specific posts instantly.',
              },
              {
                icon: Zap,
                title: 'Share Everywhere',
                description: 'Get ready-to-post content for Instagram, Facebook, and Twitter/X.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Choose the plan that fits your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Perfect for small businesses</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  '50 review conversions/month',
                  'All social platforms',
                  'Basic analytics',
                  'Email support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/checkout?plan=starter"
                className="block w-full py-3 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 font-semibold text-center transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-indigo-100 mb-6">For growing businesses</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$39</span>
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
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-200" />
                    <span className="text-indigo-100">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/checkout?plan=pro"
                className="block w-full py-3 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 font-semibold text-center transition-colors"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
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
