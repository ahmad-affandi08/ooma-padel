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
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: UtensilsCrossed, label: 'Menu', href: '/admin/menu' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: MapPin, label: 'Courts', href: '/admin/courts' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className="fixed left-0 top-0 h-full w-64 bg-white border-r border-sage-200 z-50 lg:translate-x-0 lg:static"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sage-200">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image
                src="/logohitam.png"
                alt="OOMA"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-xs text-sage-600 mt-2">Admin Portal</p>
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
              onClick={() => {/* TODO: Add logout handler */ }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
