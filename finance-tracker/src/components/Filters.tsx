'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const CATEGORIES = ['General', 'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 'Education', 'Shopping', 'Salary', 'Investment']

export default function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const from = params.get('from') || ''
  const to = params.get('to') || ''
  const category = params.get('category') || ''

  function setParam(key: string, value: string) {
    const p = new URLSearchParams(params.toString())
    if (value) p.set(key, value)
    else p.delete(key)
    router.replace(`${pathname}?${p.toString()}`)
  }

  const categoryOptions = useMemo(() => CATEGORIES, [])

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <input type="date" className="rounded-md border px-3 py-2 bg-transparent" value={from} onChange={(e) => setParam('from', e.target.value)} />
      <input type="date" className="rounded-md border px-3 py-2 bg-transparent" value={to} onChange={(e) => setParam('to', e.target.value)} />
      <select className="rounded-md border px-3 py-2 bg-transparent" value={category} onChange={(e) => setParam('category', e.target.value)}>
        <option value="">All categories</option>
        {categoryOptions.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}