import SummaryCards from '@/components/SummaryCards'
import Filters from '@/components/Filters'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <TransactionForm />
        </div>
        <div className="md:col-span-2 space-y-4">
          <Filters />
          <TransactionList />
        </div>
      </div>
    </div>
  )
}