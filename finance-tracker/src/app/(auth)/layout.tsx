import { ReactNode } from 'react'
import { Navbar } from '@/components/Navbar'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container-responsive flex-1 flex items-center justify-center py-10">{children}</main>
    </div>
  )
}