'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Transaction } from '@/types'
import { formatCurrency } from '@/lib/utils'

export default function SummaryCards() {
  const [rows, setRows] = useState<Transaction[]>([])

  useEffect(() => {
    let active = true
    const supabase = createClient()
    ;(async () => {
      const { data } = await supabase.from('transactions').select('*').order('occurred_at', { ascending: false }).limit(500)
      if (active && data) setRows(data as Transaction[])
    })()
    return () => { active = false }
  }, [])

  const { income, expense, balance } = useMemo(() => {
    const income = rows.filter(r => r.type === 'income').reduce((s, r) => s + Number(r.amount), 0)
    const expense = rows.filter(r => r.type === 'expense').reduce((s, r) => s + Number(r.amount), 0)
    return { income, expense, balance: income - expense }
  }, [rows])

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card title="Total Balance" value={formatCurrency(balance)} />
      <Card title="Total Income" value={formatCurrency(income)} />
      <Card title="Total Expense" value={formatCurrency(expense)} />
    </div>
  )
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  )
}