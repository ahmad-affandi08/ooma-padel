import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        // Return all categories, let frontend handle empty ones if needed
        // or re-enable filter if strictly required later
      },
      include: {
        items: {
          orderBy: {
            name: 'asc'
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Public Menu API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
