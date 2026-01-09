"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Loader2, Trash2, Edit2, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

// Simplified types to avoid importing full Prisma client in client component
interface Category {
  id: string
  name: string
}

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  isAvailable: boolean
  isSpicy: boolean
  isChefRec: boolean
  categoryId: string
  category: Category
}

const defaultFormData = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  imageUrl: '',
  isAvailable: true,
  isSpicy: false,
  isChefRec: false
}

export default function MenuPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Data States
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // UI States
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterAvailability, setFilterAvailability] = useState('all') // all, available, unavailable
  const [filterSpicy, setFilterSpicy] = useState(false)
  const [filterChefRec, setFilterChefRec] = useState(false)

  // Form State
  const [formData, setFormData] = useState(defaultFormData)

  // Auth Check
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  // Fetch Data (Items & Categories)
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [itemsRes, catsRes] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/categories')
      ])

      if (!itemsRes.ok || !catsRes.ok) throw new Error('Gagal mengambil data')

      const itemsData = await itemsRes.json()
      const catsData = await catsRes.json()

      setMenuItems(itemsData)
      setCategories(catsData)
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
    // Set default category if available
    if (categories.length > 0) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }))
    }
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      categoryId: item.categoryId,
      imageUrl: item.imageUrl || '',
      isAvailable: item.isAvailable,
      isSpicy: item.isSpicy,
      isChefRec: item.isChefRec
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return

    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal menghapus')

      // Optimistic update
      setMenuItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Gagal menghapus menu')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const uploadData = new FormData()
    uploadData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || errorData.message || 'Upload gagal')
      }

      const data = await res.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }))
      } else {
        throw new Error(data.message || 'Upload gagal')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(`Gagal mengupload gambar: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu'
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

      await fetchData() // Refresh data
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving item:', error)
      alert(`Gagal menyimpan menu: ${error instanceof Error ? error.message : 'Silakan coba lagi'}`)
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

  // Filter Logic
  const filteredItems = menuItems.filter(item => {
    // 1. Search Text
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.name.toLowerCase().includes(searchTerm.toLowerCase())

    // 2. Category
    const matchesCategory = filterCategory ? item.categoryId === filterCategory : true

    // 3. Availability
    let matchesAvailability = true
    if (filterAvailability === 'available') matchesAvailability = item.isAvailable
    if (filterAvailability === 'unavailable') matchesAvailability = !item.isAvailable

    // 4. Tags
    const matchesSpicy = filterSpicy ? item.isSpicy : true
    const matchesChef = filterChefRec ? item.isChefRec : true

    return matchesSearch && matchesCategory && matchesAvailability && matchesSpicy && matchesChef
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Manajemen Menu</h1>
          <p className="text-neutral-600 mt-1">Kelola {menuItems.length} item menu Anda</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Menu
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className={`sm:w-auto border border-neutral-200 ${isFilterOpen ? 'bg-sage-50 border-sage-200 text-sage-700' : 'bg-white'}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filter
            {(filterCategory || filterAvailability !== 'all' || filterSpicy || filterChefRec) && (
              <span className="ml-2 w-2 h-2 rounded-full bg-sage-500"></span>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Filter Kategori */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">Kategori</label>
              <select
                className="w-full p-2 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-sage-500 outline-none"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">Semua Kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Filter Status */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">Status</label>
              <select
                className="w-full p-2 rounded-lg border border-neutral-200 text-sm focus:ring-2 focus:ring-sage-500 outline-none"
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="available">Tersedia (Ready)</option>
                <option value="unavailable">Kosong (Empty)</option>
              </select>
            </div>

            {/* Filter Tags */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">Atribut</label>
              <div className="flex flex-wrap gap-3 mt-1">
                <label className="flex items-center gap-2 cursor-pointer bg-white border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={filterSpicy}
                    onChange={(e) => setFilterSpicy(e.target.checked)}
                    className="rounded text-sage-600 focus:ring-sage-500 border-gray-300"
                  />
                  <span className="text-sm text-neutral-600">Pedas 🌶️</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-white border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={filterChefRec}
                    onChange={(e) => setFilterChefRec(e.target.checked)}
                    className="rounded text-sage-600 focus:ring-sage-500 border-gray-300"
                  />
                  <span className="text-sm text-neutral-600">Chef's Rec 👨‍🍳</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-sage-100">
          <p className="text-neutral-500">Tidak ada menu yang ditemukan sesuai pencarian.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1 bg-sage-50 text-sage-600 text-xs font-bold rounded-bl-xl border-b border-l border-sage-100 uppercase tracking-wider">
                {item.category?.name || 'Tanpa Kategori'}
              </div>

              {/* Image Preview or Placeholder */}
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center border border-neutral-100">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-neutral-300 flex flex-col items-center gap-2">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}
              </div>

              <div className="mt-2 mb-4">
                <h3 className="text-lg font-bold text-sage-800">{item.name}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2 mt-1 min-h-[2.5rem]">
                  {item.description || "Tidak ada deskripsi"}
                </p>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {item.isChefRec && (
                  <span className="px-2 py-1 bg-terracotta-100 text-terracotta-700 text-xs font-medium rounded-full flex items-center gap-1">
                    👨‍🍳 Chef
                  </span>
                )}
                {item.isSpicy && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full flex items-center gap-1">
                    🌶️ Pedas
                  </span>
                )}
                {!item.isAvailable && (
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs font-medium rounded-full">
                    Kosong
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                <p className="text-xl font-bold text-sage-800">
                  Rp {item.price.toLocaleString('id-ID')}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)} className="text-neutral-500 hover:text-sage-600">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 hover:text-red-700 hover:border-red-200">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Foto Menu (Opsional)</label>
            <div className="flex items-start gap-4">
              {formData.imageUrl ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center bg-neutral-50 text-neutral-400 shrink-0">
                  <span className="text-xs text-center px-2">No Image</span>
                </div>
              )}

              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="block w-full text-sm text-neutral-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-sage-50 file:text-sage-700
                    hover:file:bg-sage-100
                    cursor-pointer"
                />
                <p className="mt-1 text-xs text-neutral-500">
                  {isUploading ? 'Sedang mengupload...' : 'Format JPG, PNG, atau WEBP. Maks 5MB.'}
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Nama Menu"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Contoh: Nasi Goreng Spesial"
          />

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Kategori</label>
            <select
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none transition-all"
              value={formData.categoryId}
              onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              <option value="" disabled>Pilih kategori</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Harga (IDR)"
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="Contoh: 45000"
            />

            {/* Simple Toggle for Availability */}
            <div className="flex flex-col justify-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-5 h-5 text-sage-600 rounded focus:ring-sage-500 border-gray-300"
                />
                <span className="text-sm font-medium text-neutral-700">Tersedia (Ready)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Deskripsi</label>
            <textarea
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none transition-all min-h-[100px]"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan detail menu ini..."
            />
          </div>

          {/* Tags */}
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isSpicy}
                onChange={e => setFormData({ ...formData, isSpicy: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
              />
              <span className="text-sm text-neutral-600">Pedas 🌶️</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isChefRec}
                onChange={e => setFormData({ ...formData, isChefRec: e.target.checked })}
                className="w-4 h-4 text-terracotta-600 rounded focus:ring-terracotta-500 border-gray-300"
              />
              <span className="text-sm text-neutral-600">Rekomendasi Chef 👨‍🍳</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || isUploading}>
              {isSubmitting ? 'Menyimpan...' : (editingItem ? 'Simpan Perubahan' : 'Simpan Menu')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
