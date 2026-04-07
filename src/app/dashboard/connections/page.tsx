'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Sparkles, Loader2, Link2, Check, X, Store, RefreshCw, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface GoogleAccount {
  id: string
  google_email: string
  created_at: string
}

interface BusinessProfile {
  id: string
  business_name: string
  address?: string
  phone?: string
  auto_sync_enabled: boolean
  auto_generate_enabled: boolean
  last_sync_at?: string
  google_accounts: {
    google_email: string
  }
}

export default function ConnectionsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState<GoogleAccount[]>([])
  const [profiles, setProfiles] = useState<BusinessProfile[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    // Check for success/error from OAuth callback
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'connected') {
      setSuccess('Google account connected successfully!')
      // Clear the query param
      window.history.replaceState({}, '', window.location.pathname)
      // Refresh data
      loadData()
    }
    if (params.get('error')) {
      setError(params.get('error') || 'Connection failed')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setUser(session.user)
    setLoading(false)
    loadData()
  }

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      // Load connected accounts
      const accountsRes = await fetch('/api/google/accounts', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (accountsRes.ok) {
        const accountsData = await accountsRes.json()
        setAccounts(accountsData.accounts || [])
      }

      // Load business profiles
      const profilesRes = await fetch('/api/google/business-profile', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (profilesRes.ok) {
        const profilesData = await profilesRes.json()
        setProfiles(profilesData.profiles || [])
      }
    } catch (err) {
      console.error('Failed to load data:', err)
    }
  }

  const handleConnectGoogle = () => {
    setIsConnecting(true)
    // Redirect to Google OAuth
    window.location.href = '/api/auth/google?redirect=/dashboard/connections'
  }

  const handleDisconnect = async (accountId: string) => {
    if (!confirm('Are you sure you want to disconnect this account?')) return

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const res = await fetch(`/api/google/accounts?id=${accountId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      })

      if (res.ok) {
        setAccounts(accounts.filter(a => a.id !== accountId))
        setSuccess('Account disconnected successfully')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to disconnect account')
      }
    } catch (err) {
      setError('Failed to disconnect account')
    }
  }

  const handleSyncNow = async (profileId: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ businessProfileId: profileId }),
      })

      if (res.ok) {
        const result = await res.json()
        setSuccess(`Synced ${result.reviewsNew} new reviews`)
        loadData()
      } else {
        const data = await res.json()
        setError(data.error || 'Sync failed')
      }
    } catch (err) {
      setError('Failed to sync reviews')
    }
  }

  const toggleAutoSync = async (profile: BusinessProfile) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const res = await fetch('/api/google/business-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          profileId: profile.id,
          autoSyncEnabled: !profile.auto_sync_enabled,
          autoGenerateEnabled: profile.auto_generate_enabled,
        }),
      })

      if (res.ok) {
        loadData()
      }
    } catch (err) {
      setError('Failed to update settings')
    }
  }

  const toggleAutoGenerate = async (profile: BusinessProfile) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const res = await fetch('/api/google/business-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          profileId: profile.id,
          autoSyncEnabled: profile.auto_sync_enabled,
          autoGenerateEnabled: !profile.auto_generate_enabled,
        }),
      })

      if (res.ok) {
        loadData()
      }
    } catch (err) {
      setError('Failed to update settings')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">ReviewSpark</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link href="/dashboard/reviews" className="text-slate-600 hover:text-slate-900">
              Reviews
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8">Google Business Profile Connections</h1>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Google Accounts Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Connected Google Accounts</h2>
              <p className="text-slate-500 text-sm mt-1">
                Connect your Google account to automatically sync reviews
              </p>
            </div>
            <button
              onClick={handleConnectGoogle}
              disabled={isConnecting}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 text-white font-medium transition-all flex items-center gap-2"
            >
              {isConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Connect Google
            </button>
          </div>

          {accounts.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              <Link2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No accounts connected yet</p>
              <p className="text-slate-400 text-sm mt-1">
                Click Connect Google to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{account.google_email}</p>
                      <p className="text-slate-500 text-sm">
                        Connected {new Date(account.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDisconnect(account.id)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 transition-colors"
                    title="Disconnect"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Business Profiles Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Business Profiles</h2>
              <p className="text-slate-500 text-sm mt-1">
                Manage your connected Google Business Profiles
              </p>
            </div>
          </div>

          {profiles.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No business profiles connected</p>
              <p className="text-slate-400 text-sm mt-1">
                Connect a Google account to add your business profiles
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                        <Store className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium">{profile.business_name}</p>
                        <p className="text-slate-500 text-sm">
                          via {profile.google_accounts?.google_email}
                        </p>
                        {profile.last_sync_at && (
                          <p className="text-slate-400 text-xs mt-1">
                            Last synced: {new Date(profile.last_sync_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSyncNow(profile.id)}
                      className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 transition-colors"
                      title="Sync now"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.auto_sync_enabled}
                        onChange={() => toggleAutoSync(profile)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-600">Auto-sync</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.auto_generate_enabled}
                        onChange={() => toggleAutoGenerate(profile)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-600">Auto-generate posts</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}