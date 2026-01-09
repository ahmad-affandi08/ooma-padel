"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  UtensilsCrossed,
  Calendar,
  MapPin,
  TrendingUp,
} from 'lucide-react'

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sage-600">Loading...</div>
      </div>
    )
  }

  const stats = [
    {
      icon: Calendar,
      label: 'Bookings Hari Ini',
      value: '12',
      change: '+3 dari kemarin',
      color: 'bg-sage-100 text-sage-700',
    },
    {
      icon: UtensilsCrossed,
      label: 'Menu Items',
      value: '48',
      change: '5 categories',
      color: 'bg-terracotta-100 text-terracotta-700',
    },
    {
      icon: MapPin,
      label: 'Active Courts',
      value: '2',
      change: 'All operational',
      color: 'bg-sand-200 text-sand-800',
    },
    {
      icon: TrendingUp,
      label: 'Revenue (MTD)',
      value: 'Rp 45.2M',
      change: '+12% vs last month',
      color: 'bg-sage-100 text-sage-700',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-sage-800 mb-2">
          Welcome back, {session?.user?.name || 'Admin'}!
        </h1>
        <p className="text-neutral-600">
          Here's what's happening with OOMA Padel & Eatery today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-sage-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-neutral-700 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-neutral-500">{stat.change}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
        >
          <h2 className="text-xl font-bold text-sage-800 mb-4">
            Recent Bookings
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-sand-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sage-800">Court {i}</p>
                  <p className="text-sm text-neutral-600">
                    {10 + i}:00 - {12 + i}:00
                  </p>
                </div>
                <span className="px-3 py-1 bg-sage-100 text-sage-700 text-xs font-medium rounded-full">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
        >
          <h2 className="text-xl font-bold text-sage-800 mb-4">
            Popular Menu Items
          </h2>
          <div className="space-y-3">
            {['Cappuccino', 'Nasi Goreng Spesial', 'Smoothie Bowl'].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-sand-50 rounded-lg"
              >
                <p className="font-medium text-sage-800">{item}</p>
                <span className="text-sm text-neutral-600">{45 - i * 5} orders</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
