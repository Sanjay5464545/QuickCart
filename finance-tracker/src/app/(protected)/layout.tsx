import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Navbar } from '@/components/Navbar'

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container-responsive flex-1 py-6">{children}</main>
    </div>
  )
}