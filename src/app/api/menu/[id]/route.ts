import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params
    const id = params.id
    const body = await request.json()

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        categoryId: body.categoryId,
        isSpicy: body.isSpicy,
        isChefRec: body.isChefRec,
        isAvailable: body.isAvailable,
        imageUrl: body.imageUrl
      }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      {
        error: 'Error updating menu item',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params
    const id = params.id
    await prisma.menuItem.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Error deleting menu item' },
      { status: 500 }
    )
  }
}
