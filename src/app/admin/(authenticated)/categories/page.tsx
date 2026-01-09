'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Loader2, Trash2, Edit2, X, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface Category {
  id: string
  name: string
  slug: string
  order: number
}

const defaultFormData = {
  name: '',
  order: 0
}

export default function CategoriesPage() {
  const { status } = useSession()
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingItem, setEditingItem] = useState<Category | null>(null)

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
      const res = await fetch('/api/categories')
      if (!res.ok) throw new Error('Gagal mengambil data')
      const data = await res.json()
      setCategories(data)
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
    setFormData({ ...defaultFormData, order: categories.length + 1 })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item: Category) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      order: item.order
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kategori ini? Item menu di dalamnya juga akan terhapus atau kehilangan kategori.')) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal menghapus')
      setCategories(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Gagal menghapus kategori')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = editingItem ? `/api/categories/${editingItem.id}` : '/api/categories'
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
      console.error('Error saving category:', error)
      alert(`Gagal menyimpan kategori: ${error instanceof Error ? error.message : 'Error'}`)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Kategori Menu</h1>
          <p className="text-neutral-600 mt-1">Atur pengelompokan menu Anda</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          <Plus className="w-5 h-5 mr-2" />
          Tambah Kategori
        </Button>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm border border-sage-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sage-50 border-b border-sage-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-sage-700 uppercase tracking-wider w-20">Urutan</th>
                <th className="px-6 py-4 text-xs font-semibold text-sage-700 uppercase tracking-wider">Nama Kategori</th>
                <th className="px-6 py-4 text-xs font-semibold text-sage-700 uppercase tracking-wider">Slug (URL)</th>
                <th className="px-6 py-4 text-xs font-semibold text-sage-700 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-neutral-600 font-mono">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-sm font-bold">
                      {cat.order}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sage-900">{cat.name}</span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 text-sm font-mono">
                    /{cat.slug}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-2 text-neutral-400 hover:text-sage-600 hover:bg-sage-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-400">
                    Belum ada kategori. Silakan tambah baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Kategori' : 'Tambah Kategori'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nama Kategori</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Kitchen, Coffee, Snacks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Urutan Tampilan</label>
            <Input
              type="number"
              required
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
            <p className="text-xs text-neutral-500 mt-1">Angka lebih kecil tampil lebih dulu.</p>
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
                'Simpan Kategori'
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
