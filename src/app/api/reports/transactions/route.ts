import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

// API untuk Tabular Data & Export Excel
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')

    const now = new Date()
    const startDate = startDateParam ? startOfDay(parseISO(startDateParam)) : startOfDay(now)
    const endDate = endDateParam ? endOfDay(parseISO(endDateParam)) : endOfDay(now)

    // Fetch orders with items relation
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: 'COMPLETED'
      },
      include: {
        items: {
          include: {
            menuItem: {
              select: { name: true, category: { select: { name: true } } }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Flatten logic bisa dilakukan di sini atau di client. 
    // Kita kirim structure lengkap biarkan client yang formatting untuk excel.
    return NextResponse.json(orders)

  } catch (error) {
    console.error('Transaction Report Error:', error)
    return NextResponse.json({ error: 'Failed to fetch transaction data' }, { status: 500 })
  }
}
