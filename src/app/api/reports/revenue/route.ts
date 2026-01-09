import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay, parseISO, eachDayOfInterval, format } from 'date-fns'
import { id } from 'date-fns/locale'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')

    const now = new Date()
    const startDate = startDateParam ? startOfDay(parseISO(startDateParam)) : startOfDay(now)
    const endDate = endDateParam ? endOfDay(parseISO(endDateParam)) : endOfDay(now)

    // Fetch all completed orders in range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: 'COMPLETED'
      },
      select: {
        createdAt: true,
        total: true
      }
    })

    // Generate all dates in interval to ensure chart has 0 values for empty days
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    const chartData = days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd')
      const dayLabel = format(day, 'd MMM', { locale: id })

      // Sum revenue for this day
      const dayRevenue = orders
        .filter(o => format(o.createdAt, 'yyyy-MM-dd') === dayStr)
        .reduce((sum, o) => sum + o.total, 0)

      return {
        date: dayStr,
        name: dayLabel,
        revenue: dayRevenue
      }
    })

    return NextResponse.json(chartData)

  } catch (error) {
    console.error('Revenue Report Error:', error)
    return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 })
  }
}
