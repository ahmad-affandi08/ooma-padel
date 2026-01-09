"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function MenuPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  // Mock data - will be replaced with actual API calls
  const menuItems = [
    {
      id: '1',
      name: 'Cappuccino',
      category: 'Coffee',
      price: 35000,
      isAvailable: true,
      isChefRec: true,
    },
    {
      id: '2',
      name: 'Nasi Goreng Spesial',
      category: 'Kitchen',
      price: 45000,
      isAvailable: true,
      isSpicy: true,
      isChefRec: true,
    },
    {
      id: '3',
      name: 'Smoothie Bowl',
      category: 'Snacks',
      price: 42000,
      isAvailable: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Menu Management</h1>
          <p className="text-neutral-600 mt-1">Manage your menu items and categories</p>
        </div>
        <Button variant="primary" className="sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button variant="ghost" className="sm:w-auto">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-sage-800">{item.name}</h3>
                <p className="text-sm text-neutral-600">{item.category}</p>
              </div>
              <div className="flex gap-1">
                {item.isChefRec && (
                  <span className="px-2 py-1 bg-terracotta-100 text-terracotta-700 text-xs font-medium rounded-full">
                    Chef's Rec
                  </span>
                )}
                {item.isSpicy && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    🌶️ Spicy
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-sage-800">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${item.isAvailable
                    ? 'bg-sage-100 text-sage-700'
                    : 'bg-neutral-100 text-neutral-600'
                  }`}
              >
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-sage-100 flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
