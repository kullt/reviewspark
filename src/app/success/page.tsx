import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Thank you for subscribing!
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Your subscription is now active. You can start creating amazing social
          media posts from your Google reviews right away.
        </p>
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
