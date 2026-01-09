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

    const updatedCourt = await prisma.court.update({
      where: { id },
      data: {
        name: body.name,
        pricePerHour: Number(body.pricePerHour),
        isActive: body.isActive
      }
    })

    return NextResponse.json(updatedCourt)
  } catch (error) {
    console.error('Error updating court:', error)
    return NextResponse.json(
      {
        error: 'Error updating court',
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
    await prisma.court.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting court:', error)
    return NextResponse.json(
      { error: 'Error deleting court' },
      { status: 500 }
    )
  }
}
