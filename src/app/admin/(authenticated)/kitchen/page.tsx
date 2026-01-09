'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  Loader2,
  Clock,
  CheckCircle2,
  ChefHat,
  Utensils,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Types
type OrderItemStatus = 'PENDING' | 'COOKING' | 'READY' | 'SERVED'

interface OrderItem {
  id: string
  quantity: number
  notes: string | null
  status: OrderItemStatus
  menuItem: {
    name: string
  }
}

interface KitchenOrder {
  id: string
  orderNumber: string
  customerName: string | null
  notes: string | null
  createdAt: string
  items: OrderItem[]
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // --- Data Fetching (Polling) ---
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/kitchen')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Failed to sync kitchen:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000) // Poll every 5s
    return () => clearInterval(interval)
  }, [])

  // --- Handlers ---
  const updateItemStatus = async (itemId: string, currentStatus: OrderItemStatus) => {
    // Logic: Pending -> Cooking -> Ready -> Served
    const nextStatus: Record<OrderItemStatus, OrderItemStatus> = {
      'PENDING': 'COOKING',
      'COOKING': 'READY',
      'READY': 'SERVED',
      'SERVED': 'SERVED'
    }

    const newStatus = nextStatus[currentStatus]

    // Optimistic Update
    setOrders(prev => prev.map(order => ({
      ...order,
      items: order.items.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    })).filter(order => {
      // Filter out order if ALL items are served (cleanup)
      const allServed = order.items.every(i =>
        i.id === itemId ? newStatus === 'SERVED' : i.status === 'SERVED'
      )
      return !allServed
    }))

    // API Call
    try {
      await fetch(`/api/kitchen/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      // Refetch to ensure consistency
      fetchOrders()
    } catch (error) {
      console.error('Update failed', error)
      fetchOrders() // Revert on error
    }
  }

  // --- Render Helpers ---
  const getStatusColor = (status: OrderItemStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-red-100 text-red-700 border-red-200'
      case 'COOKING': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'READY': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-neutral-100 text-neutral-500'
    }
  }

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <ChefHat className="text-orange-600" />
            Kitchen Display System
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Terakhir update: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-sm text-neutral-500 font-medium">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Pending</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Cooking</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> Ready</span>
          </div>
          <Button size="sm" variant="outline" onClick={fetchOrders}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {/* Kanban Grid */}
      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
          <Utensils className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Tidak ada pesanan aktif</p>
          <p className="text-sm">Siap menerima order baru...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto pb-10">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden h-fit">
              {/* Order Header */}
              <div className="bg-neutral-50 p-4 border-b border-neutral-100 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-neutral-800">#{order.orderNumber.split('-')[1]}</h3>
                  <p className="text-sm font-medium text-neutral-600 truncate max-w-[150px]">
                    {order.customerName || 'Guest'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-mono text-neutral-500 bg-white px-2 py-1 rounded border">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: id }).replace('sekitar ', '')}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-2 space-y-2">
                {order.items.filter(i => i.status !== 'SERVED').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => updateItemStatus(item.id, item.status)}
                    className={`
                      p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md active:scale-95
                      flex justify-between items-center group select-none
                      ${getStatusColor(item.status)}
                    `}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg w-6 text-center">{item.quantity}x</span>
                        <span className="font-semibold leading-tight">{item.menuItem.name}</span>
                      </div>
                      {item.notes && (
                        <p className="text-xs mt-1 italic opacity-80 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="ml-2">
                      {item.status === 'PENDING' && <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
                      {item.status === 'COOKING' && <ChefHat className="w-5 h-5 opacity-80" />}
                      {item.status === 'READY' && <CheckCircle2 className="w-6 h-6" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer (Optional: Order notes) */}
              {order.notes && (
                <div className="p-3 bg-yellow-50 text-yellow-800 text-xs border-t border-yellow-100">
                  <span className="font-bold">Note Order:</span> {order.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
