'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { ImagePreview } from '@/components/ui/ImagePreview'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string | null
  isChefRec: boolean
  isSpicy: boolean
  isAvailable: boolean
}

interface Category {
  id: string
  name: string
  items: MenuItem[]
}

export function PublicMenuSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu/public')

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          console.error('API Error Response:', errorData)
          throw new Error(errorData.details || errorData.error || 'Failed to fetch menu')
        }

        const data = await res.json()

        if (Array.isArray(data)) {
          setCategories(data)
          if (data.length > 0) setActiveCategory(data[0].id)
        } else {
          console.error('Menu data is not an array:', data)
          setCategories([])
        }
      } catch (error) {
        console.error('Failed to load menu', error)
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
      </div>
    )
  }

  if (!Array.isArray(categories) || categories.length === 0) return null

  const activeItems = categories.find(c => c.id === activeCategory)?.items || []

  return (
    <div className="space-y-12">
      {/* Category Tabs - Clean and Modern */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              px-5 md:px-7 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base
              ${activeCategory === category.id
                ? 'bg-gradient-to-b from-secondary-200 to-secondary-300 text-primary-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.2)] scale-105 border-2 border-secondary-400 transform translate-y-[-2px]'
                : 'bg-white text-neutral-600 hover:bg-secondary-50 border border-white/50 shadow-md hover:shadow-lg'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Grid - Modern & Responsive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeItems.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg">Belum ada menu di kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {activeItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`
                    group bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200
                    hover:shadow-lg hover:border-orange-300 transition-all duration-300
                    ${!item.isAvailable ? 'opacity-60' : ''}
                  `}
                >
                  {/* Image Section */}
                  <div className="relative h-48 md:h-56 bg-neutral-100 overflow-hidden">
                    <ImagePreview
                      src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"}
                      alt={item.name}
                      className={`w-full h-full ${!item.isAvailable ? 'grayscale' : ''}`}
                    />

                    {/* Badges Overlay */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                      {item.isChefRec && item.isAvailable && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-600 text-white text-xs font-bold rounded-md shadow-lg">
                          ⭐ Recommended
                        </span>
                      )}
                      {item.isSpicy && item.isAvailable && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-md shadow-lg">
                          🌶️ Spicy
                        </span>
                      )}
                    </div>

                    {/* Sold Out Overlay */}
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                        <span className="text-white font-bold text-lg uppercase border-2 border-white px-4 py-2 rounded-lg">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 md:p-5">
                    {/* Title */}
                    <h3 className={`
                      font-playfair text-xl md:text-2xl font-bold mb-2 leading-tight
                      ${item.isAvailable ? 'text-neutral-800' : 'text-neutral-500'}
                    `}>
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Price */}
                    <div className={`
                      text-2xl font-bold
                      ${item.isAvailable
                        ? 'text-orange-600'
                        : 'text-neutral-400 line-through decoration-2'
                      }
                    `}>
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
