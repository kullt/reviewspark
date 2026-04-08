'use client'

import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Effective Date: April 8, 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              At ReviewSpark, we take your privacy seriously. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our service. 
              By using ReviewSpark, you consent to the practices described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mb-3">2.1 Personal Information</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We may collect personal information that you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>Email address</li>
              <li>Business name</li>
              <li>Billing information (processed by Stripe)</li>
              <li>Google Business Profile information (when connected)</li>
            </ul>

            <h3 className="text-lg font-medium mb-3">2.2 Usage Data</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We automatically collect certain information about your use of the service:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>IP address and browser type</li>
              <li>Pages visited and features used</li>
              <li>Time spent on the platform</li>
              <li>Generated content and review data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>To provide and maintain our service</li>
              <li>To process payments and manage subscriptions</li>
              <li>To generate AI-powered social media content</li>
              <li>To communicate with you about your account</li>
              <li>To improve our platform and user experience</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>Data encrypted in transit (TLS/SSL) and at rest</li>
              <li>Secure cloud infrastructure (Supabase, Vercel)</li>
              <li>Regular security assessments</li>
              <li>Limited staff access to user data</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              However, no method of transmission over the Internet is 100% secure. While we strive 
              to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We use the following third-party services to operate ReviewSpark:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>
                <strong>Stripe</strong> — Payment processing. Subject to{' '}
                <a href="https://stripe.com/privacy" className="text-indigo-600 hover:text-indigo-700">Stripe's Privacy Policy</a>
              </li>
              <li>
                <strong>Supabase</strong> — Database and authentication. Subject to{' '}
                <a href="https://supabase.com/privacy" className="text-indigo-600 hover:text-indigo-700">Supabase's Privacy Policy</a>
              </li>
              <li>
                <strong>OpenAI</strong> — AI content generation. Subject to{' '}
                <a href="https://openai.com/privacy" className="text-indigo-600 hover:text-indigo-700">OpenAI's Privacy Policy</a>
              </li>
              <li>
                <strong>Vercel</strong> — Hosting infrastructure. Subject to{' '}
                <a href="https://vercel.com/legal/privacy-policy" className="text-indigo-600 hover:text-indigo-700">Vercel's Privacy Policy</a>
              </li>
              <li>
                <strong>Google APIs</strong> — Google Business Profile integration. Subject to{' '}
                <a href="https://policies.google.com/privacy" className="text-indigo-600 hover:text-indigo-700">Google's Privacy Policy</a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to certain processing activities</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:support@reviewspark.ai" className="text-indigo-600 hover:text-indigo-700">
                support@reviewspark.ai
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We retain your data for as long as your account is active or as needed to provide 
              services. When you delete your account, we will remove your personal information within 
              30 days, except where retention is required by law or for legitimate business purposes 
              (e.g., financial records).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Cookies and Tracking</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-4">
              <li>Maintain your session and authentication</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns to improve our service</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You can control cookies through your browser settings. Disabling cookies may affect 
              the functionality of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              ReviewSpark is not intended for users under 16 years of age. We do not knowingly 
              collect personal information from children. If you are a parent or guardian and 
              believe your child has provided us with personal information, please contact us 
              immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by email or through the service. Your continued use of ReviewSpark 
              after changes indicates your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please 
              contact us at:
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Email:{' '}
              <a href="mailto:support@reviewspark.ai" className="text-indigo-600 hover:text-indigo-700">
                support@reviewspark.ai
              </a>
            </p>
          </section>
        </div>
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
