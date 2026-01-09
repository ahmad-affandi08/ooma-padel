import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface TransactionTableProps {
  data: any[]
}

export function TransactionTable({ data }: TransactionTableProps) {
  // Safe check if data is an array
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-8 text-center text-neutral-500 bg-white rounded-xl border border-neutral-100">
        Tidak ada data transaksi diperiode ini atau terjadi kesalahan memuat data.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-200">
            <tr>
              <th className="p-4">No. Order</th>
              <th className="p-4">Waktu</th>
              <th className="p-4">Pelanggan</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Metode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 font-mono text-xs text-neutral-500">
                  {order.orderNumber}
                </td>
                <td className="p-4 text-neutral-700">
                  {format(new Date(order.createdAt), 'dd MMM HH:mm', { locale: id })}
                </td>
                <td className="p-4 font-medium text-neutral-900">
                  {order.customerName || '-'}
                </td>
                <td className="p-4 text-neutral-600 max-w-xs">
                  <div className="flex flex-col gap-1">
                    {order.items.map((item: any, idx: number) => (
                      <span key={idx} className="text-xs">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 font-bold text-neutral-900">
                  Rp {order.total.toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${order.paymentMethod === 'CASH'
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : order.paymentMethod === 'QRIS'
                      ? 'bg-blue-50 text-blue-700 border-blue-100'
                      : 'bg-purple-50 text-purple-700 border-purple-100'
                    }`}>
                    {order.paymentMethod}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
