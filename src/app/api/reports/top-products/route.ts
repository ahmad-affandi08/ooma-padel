import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')

    const now = new Date()
    const startDate = startDateParam ? startOfDay(parseISO(startDateParam)) : startOfDay(now)
    const endDate = endDateParam ? endOfDay(parseISO(endDateParam)) : endOfDay(now)

    // Group by MenuItem and Sum Quantity
    const grouped = await prisma.orderItem.groupBy({
      by: ['menuItemId'],
      where: {
        order: {
          createdAt: { gte: startDate, lte: endDate },
          status: 'COMPLETED'
        }
      },
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    })

    // Fetch MenuItem Details
    const itemIds = grouped.map((g: any) => g.menuItemId)
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: itemIds } },
      select: { id: true, name: true, category: { select: { name: true } } }
    })

    // Combine Data
    const result = grouped.map((g: any) => {
      const item = menuItems.find((m: any) => m.id === g.menuItemId)
      return {
        name: item?.name || 'Unknown Item',
        category: item?.category?.name || 'Unknown',
        quantity: g._sum.quantity || 0
      }
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error('Top Products Report Error:', error)
    return NextResponse.json({ error: 'Failed to fetch top products' }, { status: 500 })
  }
}
