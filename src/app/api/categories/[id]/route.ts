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

    // Slug generation update is optional, usually we keep slug stable unless explicitly changed
    // But if name changes, slug MIGHT need update. For now let's keep slug stable or update if provided.

    const updateData: any = {
      name: body.name,
      order: Number(body.order)
    }

    if (body.slug) {
      updateData.slug = body.slug
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      {
        error: 'Error updating category',
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
    await prisma.category.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Error deleting category' },
      { status: 500 }
    )
  }
}
