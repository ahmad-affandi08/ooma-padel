'use client'

import { Trash2, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface CartSidebarProps {
  onCheckout: () => void
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, summary, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="h-full bg-white border-l border-neutral-200 flex flex-col items-center justify-center p-8 text-neutral-400">
        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-8 h-8 opacity-50" />
        </div>
        <p className="font-medium text-center">Keranjang masih kosong</p>
        <p className="text-sm mt-2 text-center">Pilih menu di sebelah kiri untuk memulai pesanan.</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-neutral-200 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-orange-50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-orange-700" />
          <h2 className="font-bold text-orange-800">Pesanan ({items.length})</h2>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded"
        >
          Hapus Semua
        </button>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.map((item) => (
          <div key={item.cartId} className="flex gap-3">
            {/* Qty Controls */}
            <div className="flex flex-col items-center justify-between py-1 bg-neutral-50 rounded-lg w-8 h-full min-h-[80px]">
              <button
                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                className="p-1 hover:text-orange-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
            </div>

            {/* Detail */}
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800 line-clamp-2 text-sm">
                {item.menuItem.name}
              </h4>
              <p className="text-orange-600 font-bold text-sm">
                Rp {(item.menuItem.price * item.quantity).toLocaleString()}
              </p>
              {item.notes && (
                <p className="text-xs text-neutral-500 italic mt-1 bg-neutral-50 p-1 rounded">
                  "{item.notes}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-3">
        <div className="space-y-1 text-sm text-neutral-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {summary.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Pajak (10%)</span>
            <span>Rp {summary.tax.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
          <span>Total</span>
          <span>Rp {summary.total.toLocaleString()}</span>
        </div>

        <Button
          className="w-full mt-4"
          size="lg"
          onClick={onCheckout}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Proses Pembayaran
        </Button>
      </div>
    </div >
  )
}
