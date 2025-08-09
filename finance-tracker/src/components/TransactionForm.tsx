'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['General', 'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 'Education', 'Shopping', 'Salary', 'Investment']

export default function TransactionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('General')
  const [note, setNote] = useState('')
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0,10))
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const amt = Number(amount)
    if (Number.isNaN(amt) || amt <= 0) {
      setError('Enter a valid amount')
      setLoading(false)
      return
    }
    const supabase = createClient()
    const { error } = await supabase.from('transactions').insert({ amount: amt, type, category, note, occurred_at: date })
    setLoading(false)
    if (error) setError(error.message)
    else {
      setAmount('')
      setNote('')
      router.refresh()
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold mb-3">Add Transaction</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="0.00" className="w-full rounded-md border px-3 py-2 bg-transparent" />
          </div>
          <div>
            <label className="block text-sm mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full rounded-md border px-3 py-2 bg-transparent">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border px-3 py-2 bg-transparent">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-md border px-3 py-2 bg-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Notes</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" className="w-full rounded-md border px-3 py-2 bg-transparent" />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button disabled={loading} className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 text-white">{loading ? 'Saving…' : 'Add'}</button>
      </form>
    </div>
  )
}