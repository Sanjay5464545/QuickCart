'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Transaction } from '@/types'
import { formatCurrency } from '@/lib/utils'

export default function TransactionList() {
  const params = useSearchParams()
  const [rows, setRows] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const from = params.get('from')
  const to = params.get('to')
  const category = params.get('category')

  useEffect(() => {
    let active = true
    setLoading(true)
    const supabase = createClient()
    ;(async () => {
      let query = supabase.from('transactions').select('*').order('occurred_at', { ascending: false })
      if (from) query = query.gte('occurred_at', from)
      if (to) query = query.lte('occurred_at', to)
      if (category) query = query.eq('category', category)
      const { data } = await query
      if (active && data) setRows(data as Transaction[])
      if (active) setLoading(false)
    })()
    return () => { active = false }
  }, [from, to, category])

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('transactions').delete().eq('id', id)
    setRows(prev => prev.filter(r => r.id !== id))
  }

  async function handleSave(row: Transaction) {
    const supabase = createClient()
    const { id, ...rest } = row
    await supabase.from('transactions').update(rest).eq('id', id)
  }

  if (loading) return <div className="rounded-lg border p-4">Loading…</div>

  return (
    <div className="rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Category</th>
            <th className="text-right p-3">Amount</th>
            <th className="text-left p-3">Notes</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <EditableRow key={r.id} row={r} onDelete={handleDelete} onSave={handleSave} />
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="p-3 text-center text-gray-500">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function EditableRow({ row, onDelete, onSave }: { row: Transaction; onDelete: (id: string) => void; onSave: (row: Transaction) => void }) {
  const [edit, setEdit] = useState(false)
  const [draft, setDraft] = useState<Transaction>(row)

  useEffect(() => setDraft(row), [row])

  function onChange<K extends keyof Transaction>(key: K, value: Transaction[K]) {
    setDraft({ ...draft, [key]: value })
  }

  async function save() {
    await onSave(draft)
    setEdit(false)
  }

  return (
    <tr className="border-t">
      <td className="p-3">
        {edit ? (
          <input type="date" value={draft.occurred_at.slice(0,10)} onChange={(e) => onChange('occurred_at', e.target.value as any)} className="rounded-md border px-2 py-1 bg-transparent" />
        ) : (
          new Date(draft.occurred_at).toLocaleDateString()
        )}
      </td>
      <td className="p-3">
        {edit ? (
          <select value={draft.type} onChange={(e) => onChange('type', e.target.value as any)} className="rounded-md border px-2 py-1 bg-transparent">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        ) : (
          draft.type
        )}
      </td>
      <td className="p-3">
        {edit ? (
          <input value={draft.category} onChange={(e) => onChange('category', e.target.value as any)} className="rounded-md border px-2 py-1 bg-transparent" />
        ) : (
          draft.category
        )}
      </td>
      <td className="p-3 text-right">
        {edit ? (
          <input inputMode="decimal" value={draft.amount as any} onChange={(e) => onChange('amount', Number(e.target.value) as any)} className="w-24 text-right rounded-md border px-2 py-1 bg-transparent" />
        ) : (
          formatCurrency(Number(draft.amount))
        )}
      </td>
      <td className="p-3">
        {edit ? (
          <input value={draft.note || ''} onChange={(e) => onChange('note', e.target.value as any)} className="w-full rounded-md border px-2 py-1 bg-transparent" />
        ) : (
          draft.note || '-'
        )}
      </td>
      <td className="p-3 text-right">
        {edit ? (
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEdit(false)} className="rounded-md border px-2 py-1">Cancel</button>
            <button onClick={save} className="rounded-md bg-blue-600 text-white px-2 py-1">Save</button>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEdit(true)} className="rounded-md border px-2 py-1">Edit</button>
            <button onClick={() => onDelete(row.id)} className="rounded-md border px-2 py-1">Delete</button>
          </div>
        )}
      </td>
    </tr>
  )
}