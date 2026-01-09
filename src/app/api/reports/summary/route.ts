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

    // Parallel fetching
    const [ordersAgg, bookingsCount, itemsCount] = await Promise.all([
      prisma.order.aggregate({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          status: 'COMPLETED'
        },
        _sum: { total: true },
        _count: { id: true }
      }),
      prisma.booking.count({
        where: {
          date: { gte: startDate, lte: endDate },
          status: { not: 'CANCELLED' }
        }
      }),
      prisma.menuItem.count({
        where: { isAvailable: true }
      })
    ])

    const totalRevenue = ordersAgg._sum.total || 0
    const totalOrders = ordersAgg._count.id || 0
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalBookings: bookingsCount,
      averageOrderValue,
      activeMenuItems: itemsCount
    })

  } catch (error) {
    console.error('Report Summary Error:', error)
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 })
  }
}
