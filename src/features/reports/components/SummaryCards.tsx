import {
  Banknote,
  ShoppingBag,
  Utensils,
  Calendar
} from 'lucide-react'

interface SummaryData {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  totalBookings: number
  activeMenuItems?: number
}

interface SummaryCardsProps {
  data: SummaryData
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const cards = [
    {
      label: 'Total Pendapatan',
      value: `Rp ${(data.totalRevenue || 0).toLocaleString()}`,
      icon: Banknote,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      label: 'Total Transaksi',
      value: data.totalOrders || 0,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Rata-rata Order',
      value: `Rp ${(data.averageOrderValue || 0).toLocaleString()}`,
      icon: Utensils,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Booking Lapangan',
      value: data.totalBookings,
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-lg ${card.bg}`}>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <div>
            <p className="text-sm text-neutral-500 font-medium">{card.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
