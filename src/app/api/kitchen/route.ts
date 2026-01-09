import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch orders that have at least one item NOT served yet
    // And are COMPLETED (meaning paid/confirmed)
    const orders = await prisma.order.findMany({
      where: {
        status: 'COMPLETED',
        items: {
          some: {
            status: {
              not: 'SERVED'
            }
          }
        }
      },
      include: {
        items: {
          include: {
            menuItem: true
          },
          orderBy: {
            // Keep items in order? or group by status?
            // Usually just list them.
            menuItem: { name: 'asc' }
          }
        }
      },
      orderBy: {
        createdAt: 'asc' // Oldest orders first (FIFO)
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('KDS Fetch Error:', error)
    return NextResponse.json({ error: 'Failed to fetch kitchen orders' }, { status: 500 })
  }
}
