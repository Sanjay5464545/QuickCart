'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { createClient } from '@/utils/supabase/client'

export function Navbar() {
  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <header className="border-b">
      <div className="container-responsive flex items-center justify-between py-3">
        <Link href="/dashboard" className="font-semibold">Finance Tracker</Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={handleSignOut} className="rounded-md border px-3 py-1.5">Sign out</button>
        </div>
      </div>
    </header>
  )
}