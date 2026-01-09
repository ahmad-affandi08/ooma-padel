export type PaymentMethod = 'CASH' | 'QRIS' | 'TRANSFER'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  imageUrl?: string | null
  isAvailable: boolean
}

export interface CartItem {
  cartId: string // Unique ID for key in list (handling duplicate items with diff notes)
  menuItem: Product
  quantity: number
  notes?: string
}

export interface OrderSummary {
  subtotal: number
  tax: number
  total: number
}

export interface POSOrderPayload {
  customerName?: string
  paymentMethod: PaymentMethod
  items: {
    menuItemId: string
    quantity: number
    notes?: string
  }[]
  notes?: string
}
