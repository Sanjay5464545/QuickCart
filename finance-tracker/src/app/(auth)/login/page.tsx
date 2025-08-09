'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else window.location.href = '/dashboard'
  }

  async function handleGoogle() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2 bg-transparent" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border px-3 py-2 bg-transparent" />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button disabled={loading} className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 text-white">{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <button onClick={handleGoogle} className="w-full rounded-md border px-4 py-2">Continue with Google</button>
        <p className="text-sm">Don&apos;t have an account? <Link href="/signup" className="text-blue-600">Sign up</Link></p>
      </div>
    </div>
  )
}