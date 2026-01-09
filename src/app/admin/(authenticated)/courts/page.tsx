'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Plus,
  Loader2,
  Trash2,
  Edit2,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface Court {
  id: string
  name: string
  pricePerHour: number
  isActive: boolean
}

const defaultFormData = {
  name: '',
  pricePerHour: '',
  isActive: true
}

export default function CourtsPage() {
  const { status } = useSession()
  const router = useRouter()

  const [courts, setCourts] = useState<Court[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingItem, setEditingItem] = useState<Court | null>(null)

  // Form State
  const [formData, setFormData] = useState(defaultFormData)

  // Auth Check
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  // Fetch Data
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/courts')
      if (!res.ok) throw new Error('Gagal mengambil data')
      const data = await res.json()
      setCourts(data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData()
    }
  }, [status])

  // Handlers
  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData(defaultFormData)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item: Court) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      pricePerHour: item.pricePerHour.toString(),
      isActive: item.isActive
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus lapangan ini? Data booking terkait mungkin akan error.')) return

    try {
      const res = await fetch(`/api/courts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal menghapus')
      setCourts(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Gagal menghapus lapangan')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = editingItem ? `/api/courts/${editingItem.id}` : '/api/courts'
      const method = editingItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || errorData.error || 'Gagal menyimpan')
      }

      await fetchData()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving court:', error)
      alert(`Gagal menyimpan lapangan: ${error instanceof Error ? error.message : 'Error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-sage-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Manajemen Lapangan</h1>
          <p className="text-neutral-600 mt-1">Kelola data lapangan dan harga sewa</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Lapangan
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court.id} className="bg-white rounded-xl shadow-sm border border-sage-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-sage-50 rounded-lg text-sage-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${court.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {court.isActive ? 'Aktif' : 'Maintenance'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-sage-900 mb-2">{court.name}</h3>
              <p className="text-2xl font-bold text-sage-600">
                Rp {court.pricePerHour.toLocaleString()}
                <span className="text-sm font-normal text-neutral-500 ml-1">/ jam</span>
              </p>

              <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-neutral-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(court)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  onClick={() => handleDelete(court.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State Add Button */}
        {courts.length === 0 && (
          <div
            onClick={handleOpenAdd}
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-sage-200 rounded-xl bg-sage-50/50 hover:bg-sage-50 hover:border-sage-300 cursor-pointer transition-colors min-h-[200px]"
          >
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
              <Plus className="w-8 h-8 text-sage-400" />
            </div>
            <p className="font-medium text-sage-600">Tambah Lapangan Pertama</p>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Lapangan' : 'Tambah Lapangan'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nama Lapangan</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Court 1 (Indoor)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Harga per Jam (IDR)</label>
            <Input
              type="number"
              required
              value={formData.pricePerHour}
              onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
              placeholder="Contoh: 150000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${formData.isActive
                  ? 'bg-green-50 border-green-200 text-green-700 ring-1 ring-green-500'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}>
                <input
                  type="radio"
                  className="hidden"
                  checked={formData.isActive}
                  onChange={() => setFormData({ ...formData, isActive: true })}
                />
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="font-medium">Aktif</span>
              </label>

              <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${!formData.isActive
                  ? 'bg-red-50 border-red-200 text-red-700 ring-1 ring-red-500'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}>
                <input
                  type="radio"
                  className="hidden"
                  checked={!formData.isActive}
                  onChange={() => setFormData({ ...formData, isActive: false })}
                />
                <XCircle className="w-4 h-4 mr-2" />
                <span className="font-medium">Maintenance</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Lapangan'
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
