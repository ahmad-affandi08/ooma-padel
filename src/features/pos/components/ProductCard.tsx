import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Product } from '../types'
import { Button } from '@/components/ui/Button'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
      onClick={() => onAdd(product)}
    >
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-300">
            <span className="text-xs">No Image</span>
          </div>
        )}

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white rounded-full p-2 text-orange-600 shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-neural-800 line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-orange-600 font-bold mt-auto">
          Rp {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
