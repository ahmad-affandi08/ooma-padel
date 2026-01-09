'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Plus,
  Loader2,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

// --- Interfaces ---
interface Court {
  id: string
  name: string
  pricePerHour: number
  isActive: boolean
}

interface Booking {
  id: string
  courtId: string
  customerName: string
  customerPhone: string
  date: string
  startTime: number
  endTime: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  notes?: string
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 7) // 07:00 to 23:00

export default function BookingsPage() {
  const { status } = useSession()
  const router = useRouter()

  // Data State
  const [courts, setCourts] = useState<Court[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // UI State
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const defaultForm = {
    courtId: '',
    customerName: '',
    customerPhone: '',
    startTime: '10',
    duration: '1',
    notes: ''
  }
  const [formData, setFormData] = useState(defaultForm)

  // Auth Check
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

  // Fetch Data
  const fetchData = async () => {
    try {
      setIsLoading(true)

      // Load Courts (Once) // Optimization: Should be outside date effect if possible, but keep simple
      const courtsRes = await fetch('/api/courts')
      const courtsData = await courtsRes.json()
      setCourts(courtsData)

      // Load Bookings for Selected Date
      const dateStr = selectedDate.toISOString().split('T')[0]
      const bookRes = await fetch(`/api/bookings?date=${dateStr}`)
      const bookData = await bookRes.json()
      setBookings(bookData)

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') fetchData()
  }, [status, selectedDate]) // Re-fetch when date changes

  // Format Date Helper
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handlers
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        date: selectedDate.toISOString(), // Send ISO date
        startTime: Number(formData.startTime),
        duration: Number(formData.duration)
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || errorData.error || 'Gagal booking')
      }

      await fetchData() // Refresh calendar
      setIsModalOpen(false)
      setFormData(defaultForm) // Reset form
      alert('Booking berhasil dibuat!')
    } catch (error) {
      alert(`Gagal: ${error instanceof Error ? error.message : 'Error unknown'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Batalkan booking ini?')) return
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch (e) {
      alert('Gagal menghapus')
    }
  }

  // --- RENDER HELPERS ---
  const getBookingsForCell = (courtId: string, hour: number) => {
    return bookings.find(b => b.courtId === courtId && b.startTime <= hour && b.endTime > hour)
  }

  if (status === 'loading' || isLoading && courts.length === 0) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-sage-600" /></div>
  }

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-sage-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevDay} className="p-2 hover:bg-neutral-100 rounded-full"><ChevronLeft /></button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-sage-900">{formatDate(selectedDate)}</span>
            <span className="text-xs text-neutral-500">Jadwal Harian</span>
          </div>
          <button onClick={handleNextDay} className="p-2 hover:bg-neutral-100 rounded-full"><ChevronRight /></button>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Booking Baru
        </Button>
      </div>

      {/* Calendar Grid (Scrollable) */}
      <div className="flex-1 bg-white rounded-xl border border-sage-200 overflow-auto shadow-sm relative">
        <div className="min-w-[800px]">
          {/* Header Courts */}
          <div className="flex border-b border-sage-200 sticky top-0 bg-white z-10 shadow-sm">
            <div className="w-20 p-4 border-r border-sage-100 bg-sage-50 text-center font-bold text-sage-700">Jam</div>
            {courts.map(court => (
              <div key={court.id} className="flex-1 p-4 border-r border-sage-100 text-center font-bold text-sage-800 bg-sage-50">
                {court.name}
                <div className="text-xs font-normal text-neutral-500 mt-1">Rp {court.pricePerHour.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {HOURS.map(hour => (
            <div key={hour} className="flex border-b border-neutral-100 h-20">
              {/* Time Column */}
              <div className="w-20 p-2 border-r border-sage-100 text-center text-sm text-neutral-500 font-mono bg-neutral-50/50 flex items-center justify-center">
                {hour}:00
              </div>

              {/* Court Columns */}
              {courts.map(court => {
                const booking = bookings.find(b => b.courtId === court.id && b.startTime === hour)
                // Note: Only render booking div if startTime matches current hour.
                // If it spans multiple hours, height will handle it.

                // Check if this slot is occupied by a booking starting earlier
                const isOccupiedByEarlier = bookings.some(b => b.courtId === court.id && b.startTime < hour && b.endTime > hour)

                if (isOccupiedByEarlier) return <div key={court.id} className="flex-1 border-r border-neutral-50 bg-neutral-50/20" />

                return (
                  <div key={court.id} className="flex-1 border-r border-neutral-100 relative p-1 transition-colors hover:bg-sage-50/30">
                    {booking && (
                      <div
                        className="absolute inset-1 bg-sage-500 text-white rounded-lg p-2 text-xs shadow-md overflow-hidden z-20 cursor-pointer hover:bg-sage-600 transition-colors"
                        style={{ height: `calc(${booking.endTime - booking.startTime}00% - 8px)` }}
                        onClick={() => handleDelete(booking.id)}
                        title="Klik untuk hapus/cancel"
                      >
                        <div className="font-bold truncate flex items-center gap-1">
                          <User className="w-3 h-3" /> {booking.customerName}
                        </div>
                        {booking.customerPhone && (
                          <div className="opacity-90 truncate flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {booking.customerPhone}
                          </div>
                        )}
                        <div className="mt-1 opacity-75">
                          {booking.startTime}:00 - {booking.endTime}:00 ({booking.endTime - booking.startTime} jam)
                        </div>
                      </div>
                    )}
                    {/* Add Button Overlay on Hover (Optional, maybe later) */}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buat Booking Baru"
      >
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nama Customer</label>
            <Input required value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} placeholder="Nama Pemesan" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">No. Telepon (Opsional)</label>
            <Input value={formData.customerPhone} onChange={e => setFormData({ ...formData, customerPhone: e.target.value })} placeholder="08..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Lapangan</label>
              <select
                className="w-full p-2 border rounded-lg"
                required
                value={formData.courtId}
                onChange={e => setFormData({ ...formData, courtId: e.target.value })}
              >
                <option value="">Pilih Lapangan</option>
                {courts.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Tanggal</label>
              <div className="p-2 border rounded-lg bg-neutral-50 text-neutral-500">
                {formatDate(selectedDate)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Jam Mulai</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              >
                {HOURS.map(h => (
                  <option key={h} value={h}>{h}:00</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Durasi (Jam)</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
              >
                <option value="1">1 Jam</option>
                <option value="2">2 Jam</option>
                <option value="3">3 Jam</option>
              </select>
            </div>
          </div>

          {/* Price Calculation Preview */}
          {formData.courtId && (
            <div className="bg-sage-50 p-3 rounded-lg flex justify-between items-center text-sage-800">
              <span className="text-sm font-medium">Total Estimasi</span>
              <span className="font-bold">
                Rp {(
                  (courts.find(c => c.id === formData.courtId)?.pricePerHour || 0) * Number(formData.duration)
                ).toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Simpan Booking'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
