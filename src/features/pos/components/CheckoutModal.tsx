'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PaymentMethod, OrderSummary } from '../types'
import { Loader2, Banknote, QrCode, Smartphone } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (payload: { customerName: string, paymentMethod: PaymentMethod, notes: string }) => Promise<void>
  summary: OrderSummary
}

export function CheckoutModal({ isOpen, onClose, onConfirm, summary }: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      await onConfirm({ customerName, paymentMethod, notes })
    } finally {
      setIsProcessing(false)
    }
  }

  const reset = () => {
    setCustomerName('')
    setNotes('')
    setPaymentMethod('CASH')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={reset} title="Konfirmasi Pembayaran">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Total Display */}
        <div className="bg-orange-50 p-6 rounded-xl text-center">
          <p className="text-sm text-neutral-500 mb-1">Total Tagihan</p>
          <p className="text-4xl font-bold text-orange-700">Rp {summary.total.toLocaleString()}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nama Pelanggan (Opsional)</label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Meja 5 / Bpk. Budi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Metode Pembayaran</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'CASH', label: 'Tunai', icon: Banknote },
                { id: 'QRIS', label: 'QRIS', icon: QrCode },
                { id: 'TRANSFER', label: 'Transfer', icon: Smartphone }
              ].map((method) => {
                const Icon = method.icon
                const formattedId = method.id as PaymentMethod
                const isSelected = paymentMethod === formattedId
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(formattedId)}
                    className={`cursor-pointer rounded-lg border p-3 flex flex-col items-center gap-2 transition-all ${isSelected
                      ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-semibold">{method.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Catatan Tambahan (Opsional)</label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan untuk pesanan ini..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-neutral-100">
          <Button type="button" variant="outline" onClick={reset} disabled={isProcessing} className="flex-1">
            Batal
          </Button>
          <Button type="submit" disabled={isProcessing} className="flex-[2]">
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Memproses...
              </>
            ) : 'Bayar Sekarang'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
