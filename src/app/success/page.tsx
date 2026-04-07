import Link from 'next/link'
import { Sparkles, CheckCircle, ArrowRight, Home } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Welcome to Pro!</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Your subscription is now active. Start transforming reviews into social posts!
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8 shadow-sm">
          <h3 className="font-semibold mb-4">What&apos;s included:</h3>
          <ul className="space-y-3 text-left">
            {[
              'Unlimited review conversions',
              'All social platform formats',
              'Priority support',
              'Advanced analytics',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-colors shadow-lg shadow-indigo-500/25"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <Home className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
        </div>
      </header>
    </div>
  )
}
