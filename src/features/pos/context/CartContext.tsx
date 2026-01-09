'use client'

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { CartItem, Product, OrderSummary } from '../types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, notes?: string) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
  summary: OrderSummary
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, notes?: string) => {
    setItems((prev) => {
      // Check if same item with same existing notes exists
      const existingParams = prev.find(
        (item) => item.menuItem.id === product.id && item.notes === notes
      )

      if (existingParams) {
        return prev.map((item) =>
          item.cartId === existingParams.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // Add new item
      return [
        ...prev,
        {
          cartId: Math.random().toString(36).substr(2, 9),
          menuItem: product,
          quantity: 1,
          notes,
        },
      ]
    })
  }

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }

  const updateQuantity = (cartId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const clearCart = () => setItems([])

  const summary = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    )
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax

    return { subtotal, tax, total }
  }, [items])

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, summary }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
