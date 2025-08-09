export type Transaction = {
  id: string
  user_id: string
  amount: number
  type: 'income' | 'expense'
  category: string
  note: string | null
  occurred_at: string
  inserted_at: string | null
}