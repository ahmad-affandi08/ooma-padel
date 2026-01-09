"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  MapPin,
  Settings,
  LogOut,
  Tags,
  Store,
  PieChart,
  ChefHat
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Store, label: 'Kasir / POS', href: '/admin/pos' },
  { icon: PieChart, label: 'Laporan', href: '/admin/reports' },
  { icon: ChefHat, label: 'Kitchen / Dapur', href: '/admin/kitchen' },
  { icon: UtensilsCrossed, label: 'Menu', href: '/admin/menu' },
  { icon: Tags, label: 'Kategori', href: '/admin/categories' },
  { icon: Calendar, label: 'Booking', href: '/admin/bookings' },
  { icon: MapPin, label: 'Lapangan', href: '/admin/courts' },
  { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-sage-200 z-50 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sage-200">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image
                src="/logohitam.png"
                alt="OOMA"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-sage-100 text-sage-800 font-medium'
                    : 'text-neutral-700 hover:bg-sage-50'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-sage-600' : 'text-neutral-500'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sage-200">
            <button
              onClick={() => {
                // TODO: Add logout handler
                window.location.href = '/api/auth/signout'
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
