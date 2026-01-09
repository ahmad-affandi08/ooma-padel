import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      include: {
        category: true
      },
      orderBy: [
        { category: { order: 'asc' } },
        { name: 'asc' }
      ]
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Error fetching menu items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Basic validation could be added here

    const newItem = await prisma.menuItem.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        categoryId: body.categoryId,
        isSpicy: body.isSpicy || false,
        isChefRec: body.isChefRec || false,
        isAvailable: body.isAvailable ?? true,
        imageUrl: body.imageUrl || null
      }
    })

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      {
        error: 'Error creating menu item',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
