import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
          <svg
            className="h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Payment cancelled
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          No worries! You can try again whenever you&apos;re ready. Your account
          hasn&apos;t been charged.
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/#pricing"
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Back to Pricing
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
