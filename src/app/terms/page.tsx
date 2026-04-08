'use client'

import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 md:p-12 shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Effective Date: April 2025
            </p>

            <div className="prose dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  By accessing or using ReviewSpark (&quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), 
                  you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  ReviewSpark is an AI-powered platform that transforms customer reviews into 
                  social media content. Our Service includes tools for importing reviews, 
                  generating social media posts, and managing content across various platforms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  To use certain features of the Service, you must create an account. You are 
                  responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account. You agree to notify us 
                  immediately of any unauthorized use of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. User Obligations</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Use the Service only for lawful purposes</li>
                  <li>Not interfere with or disrupt the Service or servers</li>
                  <li>Not attempt to gain unauthorized access to any portion of the Service</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not use the Service to generate harmful, misleading, or illegal content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Payment Terms</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Some features of the Service require payment. By selecting a paid plan, you agree to:
                </p>
                <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                  <li>Pay all fees associated with your selected plan</li>
                  <li>Provide valid payment information</li>
                  <li>Accept that fees are non-refundable unless otherwise stated</li>
                  <li>Understand that we may change pricing with 30 days notice</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  All content, features, and functionality of the Service are owned by ReviewSpark 
                  and are protected by international copyright, trademark, and other intellectual 
                  property laws. You retain ownership of content you input into the Service, but 
                  grant us a license to use it solely to provide the Service to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Termination</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  We reserve the right to suspend or terminate your account and access to the Service 
                  at our sole discretion, without notice, for conduct that we believe violates these 
                  Terms or is harmful to other users, us, or third parties, or for any other reason. 
                  You may also terminate your account at any time by contacting us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  To the maximum extent permitted by law, ReviewSpark shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, or any loss of 
                  profits or revenues, whether incurred directly or indirectly, or any loss of data, 
                  use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                  <li>Your use or inability to use the Service</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any interruption or cessation of transmission to or from the Service</li>
                  <li>Any bugs, viruses, or the like that may be transmitted through the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. Disclaimer</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of 
                  any kind, either express or implied. We do not warrant that the Service will be 
                  uninterrupted, timely, secure, or error-free.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of 
                  any material changes by posting the new Terms on this page and updating the 
                  effective date. Your continued use of the Service after such changes constitutes 
                  your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">11. Governing Law</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of 
                  the jurisdiction in which ReviewSpark operates, without regard to its conflict 
                  of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">12. Contact Information</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about these Terms, please contact us at{' '}
                  <a href="mailto:support@reviewspark.app" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    support@reviewspark.app
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="font-bold">ReviewSpark</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/terms" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link href="/pricing" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                Pricing
              </Link>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 ReviewSpark. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
