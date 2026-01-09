'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  ShoppingBag,
  TrendingUp,
  Utensils,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [stats, setStats] = useState({
    menuCount: 0,
    categoryCount: 0,
    courtCount: 0,
    bookingsToday: 0
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }

    if (status === 'authenticated') {
      const fetchStats = async () => {
        try {
          // Parallel fetching for performance
          const [menuRes, catRes, courtRes, bookingRes] = await Promise.all([
            fetch('/api/menu'),
            fetch('/api/categories'),
            fetch('/api/courts'),
            fetch(`/api/bookings?date=${new Date().toISOString().split('T')[0]}`)
          ])

          const menus = await menuRes.json()
          const categories = await catRes.json()
          const courts = await courtRes.json()
          const bookings = await bookingRes.json()

          setStats({
            menuCount: Array.isArray(menus) ? menus.length : 0,
            categoryCount: Array.isArray(categories) ? categories.length : 0,
            courtCount: Array.isArray(courts) ? courts.filter((c: any) => c.isActive).length : 0,
            bookingsToday: Array.isArray(bookings) ? bookings.length : 0
          })

        } catch (e) {
          console.error('Failed to load dashboard stats', e)
        }
      }
      fetchStats()
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-sage-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Menu',
      value: stats.menuCount.toString(),
      label: 'Item aktif',
      icon: Utensils,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Total Kategori',
      value: stats.categoryCount.toString(),
      label: 'Kategori menu',
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Booking Hari Ini',
      value: stats.bookingsToday.toString(),
      label: 'Reservasi',
      icon: Calendar,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Lapangan Aktif',
      value: stats.courtCount.toString(),
      label: 'Siap digunakan',
      icon: MapPin,
      color: 'bg-purple-50 text-purple-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">
            Selamat Datang, {session?.user?.name || 'Admin'}! 👋
          </h1>
          <p className="text-neutral-600 mt-2">
            Berikut ringkasan operasional OOMA Padel & Eatery hari ini.
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-sm font-medium text-sage-600 bg-sage-50 px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-neutral-800">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {stat.label}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <h3 className="font-bold text-lg text-sage-800 mb-4">Aktivitas Terbaru</h3>
          <div className="flex flex-col items-center justify-center h-48 text-neutral-400 text-sm border-2 border-dashed border-neutral-100 rounded-xl bg-neutral-50/50">
            Belum ada aktivitas tercatat
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <h3 className="font-bold text-lg text-sage-800 mb-4">Grafik Penjualan</h3>
          <div className="flex flex-col items-center justify-center h-48 text-neutral-400 text-sm border-2 border-dashed border-neutral-100 rounded-xl bg-neutral-50/50">
            Grafik akan muncul setelah ada data transaksi
          </div>
        </div>
      </div>
    </div>
  )
}
