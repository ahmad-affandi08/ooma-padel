"use client"

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Bell, User } from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { data: session } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-sage-200 px-4 lg:px-6 h-16 flex items-center justify-between">
      {/* Left: Mobile Menu + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-sage-50 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-sage-700" />
        </button>
        <h1 className="text-lg font-semibold text-sage-800 hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Right: Notifications + User Menu */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-sage-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-sage-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-sage-50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-sage-700" />
            </div>
            <span className="text-sm font-medium text-sage-800 hidden sm:block">
              {session?.user?.name || 'Admin'}
            </span>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-sage-200 py-2 z-20">
                <div className="px-4 py-2 border-b border-sage-100">
                  <p className="text-sm font-medium text-sage-800">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-neutral-600">
                    {session?.user?.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
