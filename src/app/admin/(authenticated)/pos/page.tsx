'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { CartProvider, useCart } from '@/features/pos/context/CartContext'
import { ProductCard } from '@/features/pos/components/ProductCard'
import { CartSidebar } from '@/features/pos/components/CartSidebar'
import { CheckoutModal } from '@/features/pos/components/CheckoutModal'
import { Product, POSOrderPayload } from '@/features/pos/types'
import { Input } from '@/components/ui/Input'
import { Search, Loader2, UtensilsCrossed } from 'lucide-react'

// Wrapper Component
export default function POSPage() {
  return (
    <CartProvider>
      <POSContent />
    </CartProvider>
  )
}

// Inner Component containing logic
function POSContent() {
  // Data State
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  // Cart Integration
  const { addItem, summary, clearCart, items } = useCart()

  // Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Fetch Data
  useEffect(() => {
    const loadIds = async () => {
      setIsLoading(true)
      try {
        // Fetch Menu & Categories in parallel
        const [menuRes, catRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/categories')
        ])

        const menuData = await menuRes.json()
        const catData = await catRes.json()

        // Map API response to Product type
        const mappedProducts: Product[] = Array.isArray(menuData)
          ? menuData.filter((m: any) => m.isAvailable).map((m: any) => ({
            id: m.id,
            name: m.name,
            price: m.price,
            category: m.category?.name || 'Lainnya',
            imageUrl: m.imageUrl,
            isAvailable: m.isAvailable
          }))
          : []

        setProducts(mappedProducts)
        setCategories(Array.isArray(catData) ? catData : [])

      } catch (e) {
        console.error('Failed to load POS data', e)
      } finally {
        setIsLoading(false)
      }
    }
    loadIds()
  }, [])

  // Filtering Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Checkout Handler
  const handleCheckout = async (payload: { customerName: string, paymentMethod: any, notes: string }) => {
    // Validate inputs
    if (!payload.customerName.trim()) {
      toast.error('Nama pelanggan harus diisi')
      return
    }

    const orderPayload: POSOrderPayload = {
      customerName: payload.customerName,
      paymentMethod: payload.paymentMethod,
      items: items.map(i => ({
        menuItemId: i.menuItem.id,
        quantity: i.quantity,
        notes: i.notes
      })),
      notes: payload.notes
    }

    const promise = async () => {
      const res = await fetch('/api/pos/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || errorData.error || 'Gagal membuat pesanan')
      }

      const data = await res.json()
      clearCart()
      setIsCheckoutOpen(false)
      return `Pesanan #${data.orderNo} berhasil dibuat!`
    }

    toast.promise(promise, {
      loading: 'Memproses pesanan...',
      success: (msg) => msg,
      error: (err) => `Gagal: ${err.message}`
    })
  }

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-orange-600" /></div>
  }

  return (
    <div className="flex h-[calc(100vh-100px)] -m-6 overflow-hidden">
      {/* Negative margin to counteract page padding if needed, assuming admin layout adds padding */}

      {/* LEFT: Product Grid */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/50">
        {/* Top Bar: Search & Filter */}
        <div className="p-4 bg-white border-b border-neutral-200 shadow-sm z-10">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                placeholder="Cari menu..."
                className="pl-10 bg-neutral-100 border-transparent focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'ALL'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                }`}
            >
              Semua Menu
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.name
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={(p) => addItem(p)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <UtensilsCrossed className="w-12 h-12 mb-2 opacity-20" />
              <p>Tidak ada menu yang ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Cart Sidebar */}
      <div className="w-[380px] shrink-0 z-20 shadow-2xl">
        <CartSidebar onCheckout={() => setIsCheckoutOpen(true)} />
      </div>

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleCheckout}
        summary={summary}
      />
    </div>
  )
}
