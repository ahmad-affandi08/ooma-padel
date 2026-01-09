import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      },
      take: 50 // Limit history
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, paymentMethod, customerName, notes } = body

    // DEBUG: Check if prisma.order exists
    console.log('Debbuging Prisma Instance:', {
      keys: Object.keys(prisma),
      hasOrder: 'order' in prisma,
      hasOrderItem: 'orderItem' in prisma
    })

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // 1. Fetch current prices
    const itemIds = items.map((i: any) => i.menuItemId)
    const dbItems = await prisma.menuItem.findMany({
      where: { id: { in: itemIds } }
    })

    // 2. Calculate Totals (Server Side Validation)
    let subtotal = 0
    const orderItemsData = []

    for (const item of items) {
      const dbItem = dbItems.find(d => d.id === item.menuItemId)
      if (!dbItem) continue // Skip invalid items

      const price = dbItem.price
      const quantity = item.quantity
      const totalItemPrice = price * quantity

      subtotal += totalItemPrice

      orderItemsData.push({
        menuItemId: item.menuItemId,
        quantity: quantity,
        price: price, // Store snapshot price
        notes: item.notes
      })
    }

    const tax = Math.round(subtotal * 0.1) // 10% Tax
    const total = subtotal + tax

    // 3. Generate Order Number
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const orderNumber = `ORD-${dateStr}-${randomSuffix}`

    // 4. Create Transaction
    const order = await prisma.order.create({
      data: {
        orderNumber,
        subtotal,
        tax,
        total,
        paymentMethod,
        customerName,
        notes,
        status: 'COMPLETED', // Assume paid immediately for POS
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Order Error:', error)
    return NextResponse.json({ error: 'Transaction failed', details: String(error) }, { status: 500 })
  }
}
